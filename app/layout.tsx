import type { Metadata } from 'next'

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
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
