import type { BlogPost } from '@/types/blog-post'

export const blogPosts: BlogPost[] = [
  {
    id: 'guia-meireles',
    slug: 'guia-imobiliario-meireles-fortaleza',
    category: 'Bairros',
    title: 'Meireles: um guia para entender uma das regiões mais valorizadas de Fortaleza',
    excerpt:
      'Localização, estilo de vida, perfil imobiliário e os principais fatores a observar antes de comprar, morar ou investir no Meireles.',
    status: 'planned',
  },
  {
    id: 'comprar-orla',
    slug: 'comprar-imovel-orla-fortaleza',
    category: 'Compra',
    title: 'O que analisar antes de comprar um imóvel na Orla de Fortaleza',
    excerpt:
      'Um roteiro prático sobre localização, condomínio, documentação, liquidez e outros critérios relevantes antes de tomar uma decisão.',
    status: 'planned',
  },
  {
    id: 'investimento-imobiliario',
    slug: 'investimento-imobiliario-fortaleza',
    category: 'Investimento',
    title: 'Imóvel para morar ou investir: como pensar essa decisão',
    excerpt:
      'Objetivo, horizonte de tempo, geração de renda, valorização e uso pessoal exigem critérios diferentes na escolha de um imóvel.',
    status: 'planned',
  },
]
