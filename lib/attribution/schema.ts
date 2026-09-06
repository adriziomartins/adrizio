import { z } from 'zod'

import { ATTRIBUTION_LIMITS } from '@/lib/attribution/constants'
import {
  normalizeHostname,
  sanitizeAttributionValue,
  sanitizeLandingPath,
} from '@/lib/attribution/sanitize'

import type { LeadAttribution } from '@/types/attribution'

function attributionValueSchema(maxLength: number, normalizeCase = false) {
  return z
    .string()
    .max(maxLength)
    .superRefine((value, context) => {
      if (!sanitizeAttributionValue(value, maxLength)) {
        context.addIssue({
          code: 'custom',
          message: 'Valor de atribuição inválido.',
        })
      }
    })
    .transform((value) => {
      const sanitized = sanitizeAttributionValue(value, maxLength)!

      return normalizeCase ? sanitized.toLowerCase() : sanitized
    })
}

const attributionTouchSchema = z
  .object({
    capturedAt: z
      .string()
      .refine((value) => Number.isFinite(Date.parse(value)), 'Data de atribuição inválida.'),

    landingPath: z
      .string()
      .max(ATTRIBUTION_LIMITS.landingPath)
      .refine(
        (value) =>
          value.startsWith('/') &&
          !value.includes('?') &&
          !value.includes('#') &&
          sanitizeLandingPath(value) === value,
        'Caminho de entrada inválido.',
      ),

    referrerHost: z
      .string()
      .max(ATTRIBUTION_LIMITS.referrerHost)
      .transform(normalizeHostname)
      .refine(
        (value) => value.length > 0 && /^[a-z0-9.-]+$/.test(value),
        'Origem externa inválida.',
      )
      .optional(),

    utmSource: attributionValueSchema(ATTRIBUTION_LIMITS.utmSource, true).optional(),

    utmMedium: attributionValueSchema(ATTRIBUTION_LIMITS.utmMedium, true).optional(),

    utmCampaign: attributionValueSchema(ATTRIBUTION_LIMITS.utmCampaign).optional(),

    utmContent: attributionValueSchema(ATTRIBUTION_LIMITS.utmContent).optional(),

    utmTerm: attributionValueSchema(ATTRIBUTION_LIMITS.utmTerm).optional(),
  })
  .strict()

const leadAttributionSchema = z
  .object({
    firstTouch: attributionTouchSchema,
    lastTouch: attributionTouchSchema,
  })
  .strict()

export function parseLeadAttribution(value: unknown): LeadAttribution | undefined {
  const result = leadAttributionSchema.safeParse(value)

  return result.success ? result.data : undefined
}
