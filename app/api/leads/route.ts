import { randomUUID } from 'node:crypto'

import { NextResponse } from 'next/server'

import { parseLeadAttribution } from '@/lib/attribution/schema'
import { LEAD_PRIVACY_NOTICE_VERSION } from '@/lib/lead/privacy'
import { leadCaptureSchema } from '@/lib/lead/schema'
import type { LeadAttribution } from '@/types/attribution'
import type { LeadSourcePage, LeadType } from '@/types/lead'

const MAX_REQUEST_BYTES = 10_000
const WEBHOOK_TIMEOUT_MS = 8_000

type LeadWebhookPayload = {
  submissionId: string
  name: string
  phone: string
  email?: string
  leadType: LeadType
  message?: string
  sourcePage: LeadSourcePage
  propertySlug?: string
  attribution?: LeadAttribution
  privacyNoticeVersion: string
  privacyAcknowledgedAt: string
  createdAt: string
}

function jsonError(status: number, message: string) {
  return NextResponse.json(
    {
      ok: false,
      message,
    },
    { status },
  )
}

function isValidWebhookConfirmation(value: unknown, submissionId: string): boolean {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const confirmation = value as Record<string, unknown>

  return confirmation.ok === true && confirmation.submissionId === submissionId
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') ?? '0')

  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return jsonError(413, 'Solicitação muito grande.')
  }

  let body: unknown

  try {
    body = await request.json()
  } catch {
    return jsonError(400, 'Corpo da solicitação inválido.')
  }

  const parsed = leadCaptureSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Revise os dados informados.',
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      },
      { status: 422 },
    )
  }

  const input = parsed.data
  const attribution = parseLeadAttribution(input.attribution)

  // Honeypot: bots recebem resposta neutra sem gerar lead.
  if (input.website) {
    return NextResponse.json(
      {
        ok: true,
      },
      { status: 202 },
    )
  }

  const webhookUrl = process.env.LEAD_WEBHOOK_URL?.trim()
  const webhookSecret = process.env.LEAD_WEBHOOK_SECRET?.trim()

  if (!webhookUrl || !webhookSecret) {
    return jsonError(503, 'O canal de recebimento de contatos está temporariamente indisponível.')
  }

  const now = new Date().toISOString()
  const submissionId = randomUUID()

  const webhookPayload: LeadWebhookPayload = {
    submissionId,
    name: input.name,
    phone: input.phone,
    email: input.email,
    leadType: input.leadType,
    message: input.message,
    sourcePage: input.sourcePage,
    propertySlug: input.propertySlug,
    attribution,
    privacyNoticeVersion: LEAD_PRIVACY_NOTICE_VERSION,
    privacyAcknowledgedAt: now,
    createdAt: now,
  }

  let webhookResponse: Response

  try {
    webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        secret: webhookSecret,
        payload: webhookPayload,
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    })
  } catch {
    return jsonError(502, 'Não foi possível encaminhar o contato. Tente novamente.')
  }

  if (!webhookResponse.ok) {
    return jsonError(502, 'O canal de atendimento não confirmou o recebimento.')
  }

  let webhookConfirmation: unknown

  try {
    webhookConfirmation = await webhookResponse.json()
  } catch {
    return jsonError(502, 'O canal de atendimento retornou uma confirmação inválida.')
  }

  if (!isValidWebhookConfirmation(webhookConfirmation, submissionId)) {
    return jsonError(502, 'O canal de atendimento retornou uma confirmação inválida.')
  }

  return NextResponse.json(
    {
      ok: true,
      submissionId,
    },
    { status: 201 },
  )
}
