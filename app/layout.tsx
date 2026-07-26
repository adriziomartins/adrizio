import type { Metadata } from 'next'
import './globals.css'

const siteUrl = new URL('https://www.adrizio.com.br')

const siteTitle = 'ADRIZIO | Imóveis na Orla de Fortaleza'

const siteDescription =
  'Imóveis para comprar, alugar e investir na Orla de Fortaleza com Adrizio Martins, corretor de imóveis CRECI 25015F.'

export const metadata: Metadata = {
  metadataBase: siteUrl,

  title: {
    default: siteTitle,
    template: '%s | ADRIZIO',
  },

  description: siteDescription,

  applicationName: 'ADRIZIO',

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: 'ADRIZIO',
    title: siteTitle,
    description: siteDescription,
  },

  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/opengraph-image'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" className="font-sans">
      <body>{children}</body>
    </html>
  )
}
