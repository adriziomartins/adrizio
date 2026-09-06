import { z } from 'zod'

import { LEAD_SOURCE_PAGES, LEAD_TYPES } from '@/types/lead'

function emptyStringToUndefined(value: unknown): unknown {
  if (typeof value === 'string' && value.trim() === '') {
    return undefined
  }

  return value
}

export const leadCaptureSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Informe seu nome.')
    .max(120, 'O nome deve ter no máximo 120 caracteres.'),

  phone: z
    .string()
    .trim()
    .min(8, 'Informe um telefone válido.')
    .max(20, 'O telefone deve ter no máximo 20 caracteres.')
    .regex(/^[0-9+\s().-]+$/, 'O telefone contém caracteres inválidos.'),

  email: z.preprocess(
    emptyStringToUndefined,
    z
      .string()
      .trim()
      .email('Informe um e-mail válido.')
      .max(254, 'O e-mail deve ter no máximo 254 caracteres.')
      .optional(),
  ),

  leadType: z.enum(LEAD_TYPES),

  message: z.preprocess(
    emptyStringToUndefined,
    z.string().trim().max(2000, 'A mensagem deve ter no máximo 2000 caracteres.').optional(),
  ),

  privacyNoticeAcknowledged: z
    .boolean()
    .refine(
      (value) => value === true,
      'É necessário confirmar a ciência da Política de Privacidade para enviar o contato.',
    ),

  sourcePage: z.enum(LEAD_SOURCE_PAGES),

  propertySlug: z.preprocess(
    emptyStringToUndefined,
    z.string().trim().max(160, 'O identificador do imóvel é inválido.').optional(),
  ),

  // Metadado auxiliar. A validação específica ocorre separadamente
  // para que atribuição inválida nunca impeça o envio do lead.
  attribution: z.unknown().optional(),

  // Honeypot antispam. Usuários reais não devem preencher este campo.
  website: z.preprocess(emptyStringToUndefined, z.string().trim().max(200).optional()),
})

export type LeadCaptureInput = z.infer<typeof leadCaptureSchema>
