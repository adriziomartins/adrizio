import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

import { cn } from '@/lib/utils'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'ADRIZIO',
  description: 'Especialista em imóveis na Orla de Fortaleza',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" className={cn('font-sans', inter.variable)}>
      <body>{children}</body>
    </html>
  )
}
