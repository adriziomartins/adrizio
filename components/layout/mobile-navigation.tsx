'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface NavigationItem {
  label: string
  href: string
}

interface MobileNavigationProps {
  navigation: readonly NavigationItem[]
  contactUrl: string
}

export function MobileNavigation({ navigation, contactUrl }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  function closeMenu() {
    setIsOpen(false)
  }

  useEffect(() => {
    if (!isOpen) {
      return
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') {
        return
      }

      setIsOpen(false)

      requestAnimationFrame(() => {
        triggerRef.current?.focus()
      })
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-panel"
        onClick={() => setIsOpen((currentState) => !currentState)}
        className="inline-flex size-10 items-center justify-center rounded-md text-zinc-100 transition-colors hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
      >
        {isOpen ? (
          <svg
            viewBox="0 0 24 24"
            className="size-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="size-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M4 6h16" />
            <path d="M4 12h16" />
            <path d="M4 18h16" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div
          id="mobile-navigation-panel"
          className="absolute inset-x-0 top-full border-b border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/40 lg:hidden"
        >
          <div className="border-b border-zinc-800 px-6 py-5">
            <p className="text-base font-semibold tracking-[0.22em] text-[#D4AF37]">ADRIZIO</p>

            <p className="mt-2 text-xs tracking-wider text-zinc-400">CRECI 25015F</p>
          </div>

          <nav className="mx-auto flex max-w-7xl flex-col gap-1 p-6" aria-label="Navegação mobile">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-base font-medium text-zinc-200 transition-colors hover:bg-zinc-900 hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href={contactUrl}
              onClick={closeMenu}
              className="mt-5 flex min-h-11 items-center justify-center rounded-full bg-[#D4AF37] px-5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-[#E5C45A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              Fale Conosco
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
