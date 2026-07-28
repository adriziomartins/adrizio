import { ImageResponse } from 'next/og'

export const alt = 'ADRIZIO — Imóveis na Orla de Fortaleza com Adrizio Martins, CRECI 25015F'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background:
          'radial-gradient(circle at 85% 15%, rgba(212,175,55,0.22), transparent 30%), linear-gradient(135deg, #18181b 0%, #09090b 55%, #000000 100%)',
        padding: '64px 72px',
        color: '#ffffff',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: '0.24em',
            color: '#D4AF37',
          }}
        >
          ADRIZIO
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 18,
            fontSize: 18,
            letterSpacing: '0.14em',
            color: '#d4d4d8',
          }}
        >
          ESPECIALISTA NA ORLA
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 900,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 64,
            lineHeight: 1.05,
            fontWeight: 700,
            letterSpacing: '-0.035em',
          }}
        >
          Imóveis na Orla de Fortaleza
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 26,
            fontSize: 25,
            color: '#d4d4d8',
          }}
        >
          Comprar · Alugar · Investir
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          borderTop: '1px solid rgba(255,255,255,0.15)',
          paddingTop: 28,
          fontSize: 18,
          color: '#d4d4d8',
        }}
      >
        <div style={{ display: 'flex' }}>Adrizio Martins · Corretor de Imóveis · CRECI 25015F</div>

        <div
          style={{
            display: 'flex',
            color: '#D4AF37',
            fontWeight: 700,
          }}
        >
          adrizio.com.br
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  )
}
