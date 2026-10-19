# Fase 2 — Registro de entrega e transição

## Situação

Implementação entregue; aceite visual final pendente.

Versão de referência: `4d61c49` (PR #10).
O responsável confirmou a implantação dessa versão como Concluído / Atual na Hostinger.
Essa confirmação não substitui a revisão visual no computador e no celular.

## Entregas e evidências

- Portal com catálogo, páginas de imóveis, bairros, blog e contato.
- Beach Class Fortaleza divulgado para até seis hóspedes, mediante confirmação da unidade e das camas (PR #9).
- Catálogo geral com todas as finalidades na entrada; filtros explícitos preservados (PR #10).
- Conteúdos demonstrativos identificados, excluídos do sitemap e com noindex.
- Captura pelo formulário, validação na API e persistência via Apps Script em Google Sheets.
- Teste de produção com mensagem de sucesso e linha gravada, incluindo firstTouch, lastTouch e UTMs, informado pelo responsável.
- Check completo do PR #10 aprovado no terminal do responsável: formatação, lint, TypeScript e build.
- Zero vulnerabilidades no último npm audit informado durante a atualização de dependências; não representa uma auditoria contínua.
- CRM inicial em planilha com etapa, próxima ação e prazo; cadastro de contatos externos ao site ainda requer adaptação.

## Operação técnica

Aplicação Next.js hospedada na Hostinger com Node 24.x.
O build usa `next build --webpack` e configuração `next.config.mjs`.
O ambiente da Hostinger apresentou incompatibilidade do SWC nativo com GLIBC.
O build com Webpack concluiu usando o fallback WASM; os avisos registrados não impediram aquela implantação.

O navegador envia a solicitação para `POST /api/leads`.
O servidor encaminha ao Apps Script e exige confirmação do mesmo submissionId para responder HTTP 201.
O n8n expirado foi substituído nesse fluxo.

Variáveis do servidor:

- `LEAD_WEBHOOK_URL`: implantação operacional do Apps Script, terminada em /exec.
- `LEAD_WEBHOOK_SECRET`: segredo compartilhado com o Apps Script.

Script Properties:

- `ADRIZIO_SPREADSHEET_ID`.
- `ADRIZIO_LEAD_WEBHOOK_SECRET`.

Não versionar valores de segredos, arquivos de ambiente nem dados pessoais de leads.
Preservar a aba Leads e seu contrato de 27 colunas.
A idempotência do sink vale para o mesmo submission_id; não comprova deduplicação entre envios independentes do formulário.

Contrato, preparação da planilha e atualização da implantação:
[README do Lead Sink](../integrations/google-apps-script/lead-sink/README.md).

## Aceite visual pendente

Executar no computador e no celular, registrando resultado e versão:

- [ ] Menu abre, fecha e permite navegar.
- [ ] /imoveis inicia com Todas as finalidades e inclui o Beach Class.
- [ ] Comprar filtra os resultados.
- [ ] Limpar filtros retorna ao catálogo completo.
- [ ] Página do Beach Class mostra até seis hóspedes e condições de confirmação.
- [ ] Fotos carregam sem quebra de layout.
- [ ] Botão de WhatsApp abre o contato e a mensagem esperados.
- [ ] Formulário apresenta validação e feedback legíveis.

O teste de persistência já informado é evidência histórica; repetir somente se houver mudança no fluxo ou falha observada.
Não marcar a Fase 2 como integralmente encerrada antes de registrar o aceite acima.

## Transição para a Fase 3

A modelagem pode começar enquanto o aceite visual é concluído.
Não depende de pagamento de cliente nem da chegada de leads reais pelo site.

Escopo inicial proposto:

1. Modelar empreendimentos, unidades/imóveis, imagens, leads, atribuição e histórico de atendimento.
2. Distinguir anúncio agregado de temporada da unidade efetivamente confirmada.
3. Prever terreno como tipo de imóvel, com área e atributos próprios, sem exigir quartos ou banheiros.
4. Identificar origem Site e WhatsApp sem inventar consentimentos ou atribuição de contatos externos.
5. Definir hospedagem PostgreSQL, ambientes separados, acesso e backup.
6. Implementar Prisma, migrações e seed fictício.
7. Integrar progressivamente a API, com plano de retorno e verificação de perdas e duplicações.

Manter o Apps Script operacional até a transição ser validada.
Login e telas de gestão pertencem à Fase 4.
Este documento não afirma que PostgreSQL, Prisma ou painel administrativo já estejam implementados.
