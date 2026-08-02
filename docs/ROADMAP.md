# ADRIZIO — Roadmap Técnico

Atualizado em 2 de agosto de 2026.

## Estado atual

A fundação analítica foi concluída na branch `feature/analytics-foundation`.

Validações concluídas:

- formatação;
- ESLint;
- TypeScript;
- build de produção;
- geração das 29 páginas;
- sincronização entre branch local e remota.

## P4.5 — Fundação analítica

Status: **concluída tecnicamente**.

### P4.5.1 — Contrato de eventos

Status: concluído.

- contrato TypeScript centralizado;
- tipagem de `source_page`, `contact_intent` e status dos imóveis;
- tipagem compatível com eventos ADRIZIO e entradas internas do Google Tag Manager.

### P4.5.2 — Privacidade e consentimento

Status: concluído.

- preferências necessárias, analíticas e de marketing;
- armazenamento local versionado;
- interface para aceitar, recusar e personalizar;
- bloqueio dos eventos sem consentimento analítico.

### P4.5.3 — Carregamento condicional do GTM

Status: concluído na aplicação.

- validação de `NEXT_PUBLIC_GTM_ID`;
- ausência de carregamento sem ID válido;
- ausência de carregamento sem consentimento opcional;
- arquivo `.env.example` versionado.

### P4.5.4 — Pesquisa, filtros e WhatsApp

Status: concluído.

Eventos:

- `property_search`;
- `property_filter`;
- `whatsapp_click`.

### P4.5.5 — Contato e avaliação

Status: concluído.

Eventos:

- `contact_start`;
- `valuation_start`.

### P4.5.6 — Visualização de páginas dinâmicas

Status: concluído.

Eventos:

- `view_property`;
- `view_neighborhood`.

Foi incluída proteção por chave de evento para evitar duplicidade e permitir navegação entre slugs diferentes.

### P4.5.7 — Jornadas comerciais

Status: concluído.

Eventos:

- `buy_lead`;
- `rent_lead`;
- `investment_lead`.

Links internos representam avanço de jornada. A abertura do WhatsApp permanece registrada exclusivamente como `whatsapp_click`.

### P4.5.8 — Auditoria e endurecimento

Status: concluído.

- auditoria de dados pessoais;
- centralização do envio para a `dataLayer`;
- documentação dos testes manuais;
- revisão da tipagem;
- proteção contra duplicidade;
- pipeline completo aprovado.

## Pendências externas de implantação

A fundação está pronta no código, mas a ativação em produção depende de:

- criação do container real no Google Tag Manager;
- configuração das tags e acionadores;
- regras de consentimento para cada tag;
- tratamento de revogação de consentimento no container;
- configuração da variável `NEXT_PUBLIC_GTM_ID` no ambiente de implantação;
- testes em modo Preview/Tag Assistant;
- validação em produção sem coleta de dados pessoais.

## Próxima etapa

1. fechar documentalmente a branch `feature/analytics-foundation`;
2. verificar se `main` é ancestral da branch;
3. preparar a integração com `main`;
4. executar nova validação após a integração;
5. criar e configurar o container GTM em uma etapa separada de implantação.
