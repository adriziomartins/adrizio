const ADRIZIO_SHEET_NAME = 'Leads'

const ADRIZIO_SPREADSHEET_ID_PROPERTY = 'ADRIZIO_SPREADSHEET_ID'

const ADRIZIO_WEBHOOK_SECRET_PROPERTY = 'ADRIZIO_LEAD_WEBHOOK_SECRET'

const ADRIZIO_BASE_HEADERS = [
  'submission_id',
  'created_at',
  'name',
  'phone',
  'email',
  'lead_type',
  'message',
  'source_page',
  'property_slug',
  'privacy_notice_version',
  'privacy_acknowledged_at',
]

const ADRIZIO_ATTRIBUTION_HEADERS = [
  'first_touch_at',
  'first_landing_path',
  'first_referrer_host',
  'first_utm_source',
  'first_utm_medium',
  'first_utm_campaign',
  'first_utm_content',
  'first_utm_term',
  'last_touch_at',
  'last_landing_path',
  'last_referrer_host',
  'last_utm_source',
  'last_utm_medium',
  'last_utm_campaign',
  'last_utm_content',
  'last_utm_term',
]

const ADRIZIO_HEADERS = ADRIZIO_BASE_HEADERS.concat(ADRIZIO_ATTRIBUTION_HEADERS)

function setupSpreadsheetBinding() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()

  if (!spreadsheet) {
    throw new Error('Abra este projeto a partir da planilha ADRIZIO antes de executar o setup.')
  }

  PropertiesService.getScriptProperties().setProperty(
    ADRIZIO_SPREADSHEET_ID_PROPERTY,
    spreadsheet.getId(),
  )
}

function setupAttributionHeaders() {
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty(
    ADRIZIO_SPREADSHEET_ID_PROPERTY,
  )

  if (!spreadsheetId) {
    throw new Error('ADRIZIO_SPREADSHEET_ID não configurado.')
  }

  const spreadsheet = SpreadsheetApp.openById(spreadsheetId)
  const sheet = spreadsheet.getSheetByName(ADRIZIO_SHEET_NAME)

  if (!sheet) {
    throw new Error('A aba Leads não foi encontrada.')
  }

  validateBaseHeaders_(sheet)

  const startColumn = ADRIZIO_BASE_HEADERS.length + 1

  const range = sheet.getRange(1, startColumn, 1, ADRIZIO_ATTRIBUTION_HEADERS.length)

  const existing = range.getDisplayValues()[0]

  const hasUnexpectedValue = existing.some(
    (value, index) => value !== '' && value !== ADRIZIO_ATTRIBUTION_HEADERS[index],
  )

  if (hasUnexpectedValue) {
    throw new Error('Existem colunas ocupadas onde os cabeçalhos de atribuição seriam criados.')
  }

  range.setValues([ADRIZIO_ATTRIBUTION_HEADERS])

  SpreadsheetApp.flush()
}

function doPost(e) {
  try {
    const request = parseRequest_(e)

    if (!request) {
      return jsonResponse_({
        ok: false,
        message: 'Invalid request.',
      })
    }

    const configuredSecret = PropertiesService.getScriptProperties().getProperty(
      ADRIZIO_WEBHOOK_SECRET_PROPERTY,
    )

    if (!configuredSecret || !safeEqual_(request.secret, configuredSecret)) {
      return jsonResponse_({
        ok: false,
        message: 'Unauthorized.',
      })
    }

    const payload = request.payload

    if (!isValidPayload_(payload)) {
      return jsonResponse_({
        ok: false,
        message: 'Invalid payload.',
      })
    }

    const spreadsheetId = PropertiesService.getScriptProperties().getProperty(
      ADRIZIO_SPREADSHEET_ID_PROPERTY,
    )

    if (!spreadsheetId) {
      throw new Error('ADRIZIO_SPREADSHEET_ID não configurado.')
    }

    const spreadsheet = SpreadsheetApp.openById(spreadsheetId)
    const sheet = spreadsheet.getSheetByName(ADRIZIO_SHEET_NAME)

    if (!sheet) {
      throw new Error('A aba Leads não foi encontrada.')
    }

    validateHeaders_(sheet)

    const lock = LockService.getScriptLock()

    if (!lock.tryLock(5000)) {
      throw new Error('Não foi possível obter lock para persistência.')
    }

    try {
      if (submissionExists_(sheet, payload.submissionId)) {
        return jsonResponse_({
          ok: true,
          submissionId: payload.submissionId,
          duplicate: true,
        })
      }

      appendLead_(sheet, payload)

      SpreadsheetApp.flush()
    } finally {
      lock.releaseLock()
    }

    return jsonResponse_({
      ok: true,
      submissionId: payload.submissionId,
    })
  } catch (error) {
    console.error(error)

    return jsonResponse_({
      ok: false,
      message: 'Persistence failed.',
    })
  }
}

function parseRequest_(e) {
  if (!e || !e.postData || typeof e.postData.contents !== 'string') {
    return null
  }

  try {
    const parsed = JSON.parse(e.postData.contents)

    if (!parsed || typeof parsed !== 'object') {
      return null
    }

    return parsed
  } catch {
    return null
  }
}

function isValidPayload_(payload) {
  if (!payload || typeof payload !== 'object') {
    return false
  }

  if (
    !isNonEmptyString_(payload.submissionId) ||
    !isNonEmptyString_(payload.createdAt) ||
    !isNonEmptyString_(payload.name) ||
    !isNonEmptyString_(payload.phone) ||
    !isNonEmptyString_(payload.leadType) ||
    !isNonEmptyString_(payload.sourcePage) ||
    !isNonEmptyString_(payload.privacyNoticeVersion) ||
    !isNonEmptyString_(payload.privacyAcknowledgedAt)
  ) {
    return false
  }

  if (payload.attribution !== undefined && !isValidAttribution_(payload.attribution)) {
    return false
  }

  return true
}

function isValidAttribution_(attribution) {
  if (!attribution || typeof attribution !== 'object') {
    return false
  }

  return (
    isValidAttributionTouch_(attribution.firstTouch) &&
    isValidAttributionTouch_(attribution.lastTouch)
  )
}

function isValidAttributionTouch_(touch) {
  if (!touch || typeof touch !== 'object') {
    return false
  }

  return (
    isNonEmptyString_(touch.capturedAt) &&
    isNonEmptyString_(touch.landingPath) &&
    isOptionalString_(touch.referrerHost) &&
    isOptionalString_(touch.utmSource) &&
    isOptionalString_(touch.utmMedium) &&
    isOptionalString_(touch.utmCampaign) &&
    isOptionalString_(touch.utmContent) &&
    isOptionalString_(touch.utmTerm)
  )
}

function appendLead_(sheet, payload) {
  const attribution = payload.attribution || {}
  const firstTouch = attribution.firstTouch || {}
  const lastTouch = attribution.lastTouch || {}

  const row = [
    payload.submissionId,
    payload.createdAt,
    payload.name,
    payload.phone,
    payload.email || '',
    payload.leadType,
    payload.message || '',
    payload.sourcePage,
    payload.propertySlug || '',
    payload.privacyNoticeVersion,
    payload.privacyAcknowledgedAt,

    firstTouch.capturedAt || '',
    firstTouch.landingPath || '',
    firstTouch.referrerHost || '',
    firstTouch.utmSource || '',
    firstTouch.utmMedium || '',
    firstTouch.utmCampaign || '',
    firstTouch.utmContent || '',
    firstTouch.utmTerm || '',

    lastTouch.capturedAt || '',
    lastTouch.landingPath || '',
    lastTouch.referrerHost || '',
    lastTouch.utmSource || '',
    lastTouch.utmMedium || '',
    lastTouch.utmCampaign || '',
    lastTouch.utmContent || '',
    lastTouch.utmTerm || '',
  ]

  const targetRow = sheet.getLastRow() + 1

  const range = sheet.getRange(targetRow, 1, 1, ADRIZIO_HEADERS.length)

  range.setNumberFormat('@')
  range.setValues([row])
}

function submissionExists_(sheet, submissionId) {
  const lastRow = sheet.getLastRow()

  if (lastRow < 2) {
    return false
  }

  const result = sheet
    .getRange(2, 1, lastRow - 1, 1)
    .createTextFinder(submissionId)
    .matchEntireCell(true)
    .findNext()

  return Boolean(result)
}

function validateBaseHeaders_(sheet) {
  const headers = sheet.getRange(1, 1, 1, ADRIZIO_BASE_HEADERS.length).getDisplayValues()[0]

  const matches = ADRIZIO_BASE_HEADERS.every((header, index) => headers[index] === header)

  if (!matches) {
    throw new Error('Os cabeçalhos base da aba Leads não correspondem ao contrato ADRIZIO.')
  }
}

function validateHeaders_(sheet) {
  const headers = sheet.getRange(1, 1, 1, ADRIZIO_HEADERS.length).getDisplayValues()[0]

  const matches = ADRIZIO_HEADERS.every((header, index) => headers[index] === header)

  if (!matches) {
    throw new Error('Os cabeçalhos da aba Leads não correspondem ao contrato ADRIZIO.')
  }
}

function isNonEmptyString_(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function isOptionalString_(value) {
  return value === undefined || typeof value === 'string'
}

function safeEqual_(left, right) {
  if (typeof left !== 'string' || typeof right !== 'string' || left.length !== right.length) {
    return false
  }

  let difference = 0

  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index)
  }

  return difference === 0
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  )
}
