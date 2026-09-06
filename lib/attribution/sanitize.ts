import { ATTRIBUTION_LIMITS } from '@/lib/attribution/constants'

const EMAIL_LIKE_PATTERN = /\b[^\s@]+@[^\s@]+\.[^\s@]+\b/i
const PHONE_LIKE_PATTERN = /^[+()\d\s.-]+$/

function stripControlCharacters(value: string): string {
  return Array.from(value)
    .filter((character) => {
      const code = character.charCodeAt(0)

      return code >= 32 && code !== 127
    })
    .join('')
}

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function looksLikeSensitiveContact(value: string): boolean {
  if (EMAIL_LIKE_PATTERN.test(value)) {
    return true
  }

  const digitCount = value.replace(/\D/g, '').length

  return digitCount >= 8 && PHONE_LIKE_PATTERN.test(value)
}

export function sanitizeAttributionValue(
  value: string | null | undefined,
  maxLength: number,
): string | undefined {
  if (!value) {
    return undefined
  }

  const sanitized = normalizeWhitespace(stripControlCharacters(value))

  if (!sanitized || looksLikeSensitiveContact(sanitized)) {
    return undefined
  }

  return sanitized.slice(0, maxLength)
}

export function sanitizeLandingPath(pathname: string): string {
  const sanitized = stripControlCharacters(pathname).split(/[?#]/, 1)[0].trim()

  if (!sanitized || !sanitized.startsWith('/') || looksLikeSensitiveContact(sanitized)) {
    return '/'
  }

  return sanitized.slice(0, ATTRIBUTION_LIMITS.landingPath)
}

export function normalizeHostname(hostname: string): string {
  return hostname
    .trim()
    .toLowerCase()
    .replace(/^www\./, '')
    .slice(0, ATTRIBUTION_LIMITS.referrerHost)
}

export function getExternalReferrerHost(
  referrer: string | undefined,
  currentHostname: string,
): string | undefined {
  if (!referrer) {
    return undefined
  }

  try {
    const referrerUrl = new URL(referrer)

    const referrerHost = normalizeHostname(referrerUrl.hostname)
    const currentHost = normalizeHostname(currentHostname)

    if (!referrerHost || referrerHost === currentHost) {
      return undefined
    }

    return referrerHost
  } catch {
    return undefined
  }
}
