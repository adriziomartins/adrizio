'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Settings2, X } from 'lucide-react'

import {
  DEFAULT_CONSENT_PREFERENCES,
  readConsentPreferences,
  saveConsentPreferences,
} from '@/lib/consent'

export function ConsentManager() {
  const [isHydrated, setIsHydrated] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const [hasStoredPreferences, setHasStoredPreferences] = useState(false)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const storedPreferences = readConsentPreferences()

      if (storedPreferences) {
        setAnalytics(storedPreferences.analytics === 'granted')
        setMarketing(storedPreferences.marketing === 'granted')
        setHasStoredPreferences(true)
      } else {
        setIsOpen(true)
      }

      setIsHydrated(true)
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [])

  function acceptAll() {
    saveConsentPreferences({
      analytics: 'granted',
      marketing: 'granted',
    })

    setAnalytics(true)
    setMarketing(true)
    setHasStoredPreferences(true)
    setIsOpen(false)
    setShowSettings(false)
  }

  function rejectOptional() {
    saveConsentPreferences({
      analytics: DEFAULT_CONSENT_PREFERENCES.analytics,
      marketing: DEFAULT_CONSENT_PREFERENCES.marketing,
    })

    setAnalytics(false)
    setMarketing(false)
    setHasStoredPreferences(true)
    setIsOpen(false)
    setShowSettings(false)
  }

  function saveCustomPreferences() {
    saveConsentPreferences({
      analytics: analytics ? 'granted' : 'denied',
      marketing: marketing ? 'granted' : 'denied',
    })

    setHasStoredPreferences(true)
    setIsOpen(false)
    setShowSettings(false)
  }

  function openPreferences() {
    const storedPreferences = readConsentPreferences()

    if (storedPreferences) {
      setAnalytics(storedPreferences.analytics === 'granted')
      setMarketing(storedPreferences.marketing === 'granted')
      setHasStoredPreferences(true)
    }

    setShowSettings(true)
    setIsOpen(true)
  }

  if (!isHydrated) {
    return null
  }

  return (
    <>
      {!isOpen ? (
        <button
          type="button"
          onClick={openPreferences}
          className="fixed bottom-4 left-4 z-[90] inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 bg-zinc-950/95 px-4 text-xs font-medium text-zinc-300 shadow-xl backdrop-blur transition-colors hover:border-[#D4AF37]/50 hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          aria-label="Abrir preferências de privacidade"
        >
          <Settings2 className="size-4" aria-hidden="true" />
          Privacidade
        </button>
      ) : null}

      {isOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-end bg-black/65 p-4 sm:items-center sm:justify-center"
          role="presentation"
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="consent-title"
            aria-describedby="consent-description"
            className="w-full max-w-2xl rounded-3xl border border-white/15 bg-zinc-950 p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                  Privacidade
                </p>

                <h2 id="consent-title" className="mt-3 text-2xl font-semibold text-white">
                  Suas preferências de dados
                </h2>
              </div>

              {hasStoredPreferences ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false)
                    setShowSettings(false)
                  }}
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-zinc-300 transition-colors hover:border-[#D4AF37]/50 hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  aria-label="Fechar preferências"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              ) : null}
            </div>

            <p id="consent-description" className="mt-5 text-sm leading-7 text-zinc-400">
              Utilizamos armazenamento estritamente necessário para registrar sua escolha. Recursos
              analíticos e de marketing somente poderão ser ativados conforme sua autorização.
            </p>

            {showSettings ? (
              <div className="mt-7 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <h3 className="font-semibold text-white">Necessários</h3>
                      <p className="mt-2 text-sm leading-6 text-zinc-400">
                        Mantêm funções essenciais e registram sua preferência de privacidade.
                      </p>
                    </div>

                    <span className="text-xs font-semibold uppercase tracking-wide text-[#D4AF37]">
                      Sempre ativos
                    </span>
                  </div>
                </div>

                <label className="flex cursor-pointer items-start justify-between gap-5 rounded-2xl border border-white/10 bg-zinc-900/60 p-5">
                  <span>
                    <span className="font-semibold text-white">Analíticos</span>
                    <span className="mt-2 block text-sm leading-6 text-zinc-400">
                      Permitem compreender uso, navegação e desempenho do site.
                    </span>
                  </span>

                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(event) => setAnalytics(event.target.checked)}
                    className="mt-1 size-5 accent-[#D4AF37]"
                  />
                </label>

                <label className="flex cursor-pointer items-start justify-between gap-5 rounded-2xl border border-white/10 bg-zinc-900/60 p-5">
                  <span>
                    <span className="font-semibold text-white">Marketing</span>
                    <span className="mt-2 block text-sm leading-6 text-zinc-400">
                      Poderão medir campanhas e conversões em plataformas de publicidade.
                    </span>
                  </span>

                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(event) => setMarketing(event.target.checked)}
                    className="mt-1 size-5 accent-[#D4AF37]"
                  />
                </label>
              </div>
            ) : null}

            <p className="mt-6 text-xs leading-6 text-zinc-500">
              Consulte a{' '}
              <Link
                href="/privacidade"
                className="font-medium text-zinc-300 underline decoration-zinc-600 underline-offset-4 hover:text-[#D4AF37]"
              >
                Política de Privacidade
              </Link>
              .
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {showSettings ? (
                <>
                  <button
                    type="button"
                    onClick={rejectOptional}
                    className="min-h-12 rounded-full border border-white/15 px-5 text-sm font-semibold text-white transition-colors hover:border-[#D4AF37]/60 hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  >
                    Recusar opcionais
                  </button>

                  <button
                    type="button"
                    onClick={saveCustomPreferences}
                    className="min-h-12 rounded-full border border-[#D4AF37]/50 px-5 text-sm font-semibold text-[#D4AF37] transition-colors hover:bg-[#D4AF37]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  >
                    Salvar preferências
                  </button>

                  <button
                    type="button"
                    onClick={acceptAll}
                    className="min-h-12 rounded-full bg-[#D4AF37] px-5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-[#E5C45A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  >
                    Aceitar todos
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={rejectOptional}
                    className="min-h-12 rounded-full border border-white/15 px-5 text-sm font-semibold text-white transition-colors hover:border-[#D4AF37]/60 hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  >
                    Recusar opcionais
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowSettings(true)}
                    className="min-h-12 rounded-full border border-[#D4AF37]/50 px-5 text-sm font-semibold text-[#D4AF37] transition-colors hover:bg-[#D4AF37]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  >
                    Personalizar
                  </button>

                  <button
                    type="button"
                    onClick={acceptAll}
                    className="min-h-12 rounded-full bg-[#D4AF37] px-5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-[#E5C45A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  >
                    Aceitar opcionais
                  </button>
                </>
              )}
            </div>
          </section>
        </div>
      ) : null}
    </>
  )
}
