import {
  ATTRIBUTION_LIMITS,
  ATTRIBUTION_RETENTION_MS,
  ATTRIBUTION_VERSION,
} from '@/lib/attribution/constants'
import {
  getExternalReferrerHost,
  sanitizeAttributionValue,
  sanitizeLandingPath,
} from '@/lib/attribution/sanitize'

import type { AttributionState, AttributionTouch } from '@/types/attribution'

interface AttributionVisit {
  url: URL
  referrer?: string
  capturedAt?: string
}

function readCampaignParameters(url: URL) {
  return {
    utmSource: sanitizeAttributionValue(
      url.searchParams.get('utm_source'),
      ATTRIBUTION_LIMITS.utmSource,
    )?.toLowerCase(),
    utmMedium: sanitizeAttributionValue(
      url.searchParams.get('utm_medium'),
      ATTRIBUTION_LIMITS.utmMedium,
    )?.toLowerCase(),
    utmCampaign: sanitizeAttributionValue(
      url.searchParams.get('utm_campaign'),
      ATTRIBUTION_LIMITS.utmCampaign,
    ),
    utmContent: sanitizeAttributionValue(
      url.searchParams.get('utm_content'),
      ATTRIBUTION_LIMITS.utmContent,
    ),
    utmTerm: sanitizeAttributionValue(url.searchParams.get('utm_term'), ATTRIBUTION_LIMITS.utmTerm),
  }
}

function hasCampaignParameters(campaign: ReturnType<typeof readCampaignParameters>): boolean {
  return Object.values(campaign).some(Boolean)
}

export function createAttributionTouch({
  url,
  referrer,
  capturedAt = new Date().toISOString(),
}: AttributionVisit): AttributionTouch {
  const campaign = readCampaignParameters(url)

  return {
    capturedAt,
    landingPath: sanitizeLandingPath(url.pathname),
    referrerHost: getExternalReferrerHost(referrer, url.hostname),
    ...campaign,
  }
}

export function isAttributableVisit({
  url,
  referrer,
}: Pick<AttributionVisit, 'url' | 'referrer'>): boolean {
  const campaign = readCampaignParameters(url)
  const externalReferrerHost = getExternalReferrerHost(referrer, url.hostname)

  return hasCampaignParameters(campaign) || Boolean(externalReferrerHost)
}

export function createInitialAttributionState(touch: AttributionTouch): AttributionState {
  const capturedAtMilliseconds = Date.parse(touch.capturedAt)

  const baseTimestamp = Number.isFinite(capturedAtMilliseconds)
    ? capturedAtMilliseconds
    : Date.now()

  return {
    version: ATTRIBUTION_VERSION,
    expiresAt: new Date(baseTimestamp + ATTRIBUTION_RETENTION_MS).toISOString(),
    firstTouch: touch,
    lastTouch: touch,
  }
}

export function applyAttributionVisit(
  previousState: AttributionState | null,
  visit: AttributionVisit,
): AttributionState {
  const touch = createAttributionTouch(visit)

  if (!previousState) {
    return createInitialAttributionState(touch)
  }

  // Navegação interna e retorno direto não substituem a última
  // origem comercial conhecida.
  if (!isAttributableVisit(visit)) {
    return previousState
  }

  return {
    ...previousState,
    lastTouch: touch,
  }
}
