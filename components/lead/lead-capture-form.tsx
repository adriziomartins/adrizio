'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Send } from 'lucide-react'

import { trackAnalyticsEvent } from '@/lib/analytics'
import { readAttributionState } from '@/lib/attribution/storage'
import type { LeadAttribution } from '@/types/attribution'
import type { LeadType } from '@/types/lead'

const leadTypeOptions: Array<{ value: LeadType; label: string }> = [
  { value: 'general', label: 'Atendimento geral' },
  { value: 'buy', label: 'Comprar um imóvel' },
  { value: 'rent', label: 'Alugar um imóvel' },
  { value: 'investment', label: 'Investir em imóveis' },
  { value: 'valuation', label: 'Avaliar meu imóvel' },
]

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

type LeadApiResponse = {
  ok?: boolean
  message?: string
  submissionId?: string
  issues?: Array<{
    path: string
    message: string
  }>
}

const fieldClassName =
  'mt-2 h-12 w-full rounded-xl border border-white/10 bg-zinc-950 px-4 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-[#D4AF37]/70 focus:ring-1 focus:ring-[#D4AF37]/40'

export function LeadCaptureForm() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [feedbackMessage, setFeedbackMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (submitState === 'submitting') {
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)
    const leadType = String(formData.get('leadType') ?? '') as LeadType
    const attributionState = readAttributionState()

    const attribution: LeadAttribution | undefined = attributionState
      ? {
          firstTouch: attributionState.firstTouch,
          lastTouch: attributionState.lastTouch,
        }
      : undefined

    const payload = {
      name: String(formData.get('name') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      email: String(formData.get('email') ?? ''),
      leadType,
      message: String(formData.get('message') ?? ''),
      privacyNoticeAcknowledged: formData.get('privacyNoticeAcknowledged') === 'on',
      sourcePage: 'contact' as const,
      attribution,
      website: String(formData.get('website') ?? ''),
    }

    setSubmitState('submitting')
    setFeedbackMessage('')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      let responseData: LeadApiResponse = {}

      try {
        responseData = (await response.json()) as LeadApiResponse
      } catch {
        responseData = {}
      }

      if (!response.ok) {
        const validationMessage = responseData.issues?.[0]?.message

        setSubmitState('error')
        setFeedbackMessage(
          validationMessage ??
            responseData.message ??
            'Não foi possível enviar o contato. Revise os dados e tente novamente.',
        )

        return
      }

      form.reset()
      setSubmitState('success')
      setFeedbackMessage(
        'Contato enviado com sucesso. Sua solicitação foi registrada para atendimento.',
      )

      // O honeypot recebe 202 de forma neutra e nunca gera evento de lead.
      if (response.status !== 201) {
        return
      }

      trackAnalyticsEvent({
        event: 'generate_lead',
        source_page: 'contact',
        contact_intent: leadType,
        contact_channel: 'form',
      })
    } catch {
      setSubmitState('error')
      setFeedbackMessage(
        'Não foi possível conectar ao canal de atendimento. Tente novamente em instantes.',
      )
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6 sm:p-8"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-name" className="text-sm font-medium text-zinc-200">
            Nome
          </label>

          <input
            id="lead-name"
            name="name"
            type="text"
            autoComplete="name"
            minLength={2}
            maxLength={120}
            required
            className={fieldClassName}
          />
        </div>

        <div>
          <label htmlFor="lead-phone" className="text-sm font-medium text-zinc-200">
            Telefone
          </label>

          <input
            id="lead-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            minLength={8}
            maxLength={20}
            required
            className={fieldClassName}
          />
        </div>

        <div>
          <label htmlFor="lead-email" className="text-sm font-medium text-zinc-200">
            E-mail <span className="text-zinc-500">(opcional)</span>
          </label>

          <input
            id="lead-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            className={fieldClassName}
          />
        </div>

        <div>
          <label htmlFor="lead-type" className="text-sm font-medium text-zinc-200">
            Objetivo
          </label>

          <select
            id="lead-type"
            name="leadType"
            defaultValue=""
            required
            className={fieldClassName}
          >
            <option value="" disabled>
              Selecione uma opção
            </option>

            {leadTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="lead-message" className="text-sm font-medium text-zinc-200">
          Mensagem <span className="text-zinc-500">(opcional)</span>
        </label>

        <textarea
          id="lead-message"
          name="message"
          rows={5}
          maxLength={2000}
          className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm leading-7 text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-[#D4AF37]/70 focus:ring-1 focus:ring-[#D4AF37]/40"
          placeholder="Conte brevemente o que você procura, localização, faixa de valor ou outras informações relevantes."
        />
      </div>

      <div
        className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="lead-website">Website</label>
        <input id="lead-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-zinc-400">
        <input
          name="privacyNoticeAcknowledged"
          type="checkbox"
          required
          className="mt-1 size-4 shrink-0 accent-[#D4AF37]"
        />

        <span>
          Li e estou ciente da{' '}
          <Link
            href="/privacidade"
            className="font-medium text-[#D4AF37] underline decoration-[#D4AF37]/40 underline-offset-4 hover:decoration-[#D4AF37]"
          >
            Política de Privacidade
          </Link>{' '}
          aplicável aos dados enviados neste contato.
        </span>
      </label>

      <button
        type="submit"
        disabled={submitState === 'submitting'}
        className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-6 text-sm font-semibold text-zinc-950 transition-colors hover:bg-[#E5C45A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        <Send className="size-4" aria-hidden="true" />

        {submitState === 'submitting' ? 'Enviando...' : 'Enviar contato'}
      </button>

      {feedbackMessage ? (
        <p
          role={submitState === 'error' ? 'alert' : 'status'}
          aria-live="polite"
          className={`mt-5 text-sm leading-6 ${
            submitState === 'error' ? 'text-red-300' : 'text-emerald-300'
          }`}
        >
          {feedbackMessage}
        </p>
      ) : null}
    </form>
  )
}
