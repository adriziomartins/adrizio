import type { Metadata } from 'next'

import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description:
    'Informações sobre privacidade, tratamento de dados e tecnologias utilizadas no Site Adrizio.',
  alternates: {
    canonical: '/privacidade',
  },
}

const sections = [
  {
    title: '1. Identificação',
    content:
      'O Site Adrizio é uma plataforma imobiliária operada por Adrizio Martins, corretor de imóveis inscrito no CRECI-CE sob o número 25015F.',
  },
  {
    title: '2. Dados tratados',
    content:
      'Nesta etapa do projeto, o site não possui cadastro, login ou formulário destinado ao envio direto de dados pessoais. O contato comercial ocorre por canais externos escolhidos pelo próprio usuário, como o WhatsApp.',
  },
  {
    title: '3. Métricas e publicidade',
    content:
      'Tecnologias analíticas e de marketing poderão ser utilizadas para compreender a navegação, medir campanhas e melhorar a experiência. Esses recursos permanecerão condicionados às preferências registradas pelo usuário.',
  },
  {
    title: '4. Armazenamento necessário',
    content:
      'O site pode utilizar armazenamento local estritamente necessário para registrar as preferências de privacidade. Essa informação evita que a escolha seja solicitada novamente a cada página acessada.',
  },
  {
    title: '5. Compartilhamento',
    content:
      'Dados poderão ser processados por fornecedores tecnológicos somente quando os respectivos serviços estiverem habilitados e conforme as finalidades informadas. Nenhum dado pessoal deve ser comercializado pelo Site Adrizio.',
  },
  {
    title: '6. Direitos do titular',
    content:
      'O titular poderá solicitar informações, correção, eliminação ou esclarecimentos sobre o tratamento de seus dados, observadas as hipóteses e limitações previstas na legislação aplicável.',
  },
  {
    title: '7. Preferências',
    content:
      'As categorias opcionais podem ser aceitas, recusadas ou alteradas a qualquer momento por meio do botão Privacidade exibido no site.',
  },
  {
    title: '8. Contato',
    content:
      'Solicitações relacionadas à privacidade podem ser encaminhadas pelos canais oficiais disponíveis na página de contato do Site Adrizio.',
  },
]

export default function PrivacyPage() {
  return (
    <>
      <a
        href="#conteudo-principal"
        className="fixed -top-20 left-4 z-[110] rounded-md bg-[#D4AF37] px-4 py-3 font-semibold text-zinc-950 focus:top-4 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-950"
      >
        Pular para o conteúdo principal
      </a>

      <Navbar />

      <main
        id="conteudo-principal"
        tabIndex={-1}
        className="min-h-screen bg-zinc-950 px-4 py-16 focus:outline-none sm:px-6 lg:px-8 lg:py-24"
      >
        <article className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
            Governança de dados
          </p>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Política de Privacidade
          </h1>

          <p className="mt-6 text-base leading-8 text-zinc-400">
            Esta política descreve a fundação atual de privacidade do Site Adrizio. O documento será
            atualizado quando novos formulários, integrações, fornecedores ou operações de
            tratamento forem incorporados.
          </p>

          <p className="mt-4 text-sm text-zinc-500">Última atualização: 30 de julho de 2026.</p>

          <div className="mt-12 space-y-5">
            {sections.map((section) => (
              <section
                key={section.title}
                className="rounded-3xl border border-white/10 bg-zinc-900/50 p-6 sm:p-8"
              >
                <h2 className="text-xl font-semibold text-white">{section.title}</h2>

                <p className="mt-4 text-sm leading-8 text-zinc-400 sm:text-base">
                  {section.content}
                </p>
              </section>
            ))}
          </div>
        </article>
      </main>

      <Footer />
    </>
  )
}
