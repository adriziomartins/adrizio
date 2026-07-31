const GTM_ID_PATTERN = /^GTM-[A-Z0-9]+$/i

function getGoogleTagManagerId(): string | undefined {
  const value = process.env.NEXT_PUBLIC_GTM_ID?.trim()

  if (!value) {
    return undefined
  }

  if (!GTM_ID_PATTERN.test(value)) {
    console.warn('NEXT_PUBLIC_GTM_ID foi ignorado porque não possui o formato GTM-XXXXXXX.')

    return undefined
  }

  return value.toUpperCase()
}

export const analyticsConfig = {
  googleTagManagerId: getGoogleTagManagerId(),
}
