# ADR-2026-11-10 — Separação comercial: Alugar e Locações

- **Data:** 10/11/2026
- **Status:** Proposta implementada em branch; validação e aprovação de publicação pendentes
- **Escopo:** ADRIZIO, Fase 2 — Portal Imobiliário
- **Decisão:** duas jornadas comerciais independentes; domínio de dados compartilhado

## Contexto

O portal agrupava moradia residencial e estadias por curta temporada sob `/alugar`. A modalidade já existe no Prisma (`RentalModality.LONG_TERM` e `RentalModality.SHORT_STAY`), mas o menu e os fluxos ainda não a separavam.

## Decisão

1. `/alugar`: exclusivamente locação residencial de longa temporada.
2. `/locacoes`: exclusivamente curta temporada e hospedagens por períodos.
3. `/avaliar-imovel`: página própria, mantendo `/#avaliar` como seção existente da Home.
4. Navegação: Comprar | Alugar | Locações | Investir | Avaliar Imóvel | Sobre Nós | Blog.
5. `/imoveis` permanece como catálogo geral, com `finalidade=alugar` para `LONG_TERM` e `finalidade=locacoes` para `SHORT_STAY`.
6. URLs legadas `/alugar/longa-temporada` e `/alugar/curta-temporada` redirecionam permanentemente para `/alugar` e `/locacoes`.
7. Busca legada explicitamente marcada como `finalidade=alugar&modalidade=curta-temporada` continua retornando estadias, mas não deve ser gerada pelas novas interfaces.
8. O formulário de curta temporada coleta no navegador datas, quantidade de hóspedes e região e abre um texto pré-preenchido no WhatsApp. Não confirma reserva e não registra lead no banco.
9. Turismo, passeios, transfers e serviços de parceiros permanecem planejados, sem aparecer no menu nesta entrega.
10. O banco e o enum Prisma existentes serão preservados; **nenhuma migration** é necessária.

## Compatibilidade e riscos

- Conferir registros com `purpose=RENT` e `rentalModality=NULL`. Sem classificação eles não aparecerão nas duas jornadas. Corrigir cadastros com base na modalidade contratual real antes de publicar.
- Verificar links para `/alugar/curta-temporada` em campanhas, WhatsApp, redes sociais e conteúdos do Blog.
- URLs de detalhe permanecem em `/imoveis/[slug]`; `/locacoes/[slug]` e páginas de região são evolução futura, condicionada à modelagem e ao SEO.
- A disponibilidade de curta temporada não é integrada em tempo real. O WhatsApp recebe apenas uma solicitação de cotação, sujeita à confirmação manual.
- Revisar privacidade, eventos e atribuição no Google Tag Manager antes da ativação em produção.
- Preservar o anúncio PIR-VEN-01 de venda e as demais propriedades publicadas.

## Critérios de aceite antes de merge

- [ ] `npm run format:check`
- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm test`
- [ ] `npm run build`
- [ ] Header e menu mobile com sete links funcionais
- [ ] Alugar exibe apenas `LONG_TERM`
- [ ] Locações exibe apenas `SHORT_STAY`
- [ ] Formulário cria WhatsApp com datas e hóspedes corretos
- [ ] URLs antigas redirecionam corretamente
- [ ] Sitemap e tags canonical corretos
- [ ] Testes de navegação, acessibilidade e responsividade
- [ ] Auditoria de imóveis sem modalidade
- [ ] Aprovação para publicação em produção

## Próximas evoluções planejadas

`/locacoes/imoveis`, `/locacoes/fortaleza`, bairros da Orla e `/locacoes/[slug]` com oferta/URL canônica de hospedagem; precificação por período, disponibilidade, regras das unidades, confirmação e futura integração de reservas.

Turismo, Passeios e Serviços continuam fora da Fase 2 atual.
