# ADRIZIO — Contrato de Analytics

## Objetivo

A camada analítica registra interações relevantes do portal ADRIZIO sem enviar dados pessoais.

## Princípios

- Não enviar nome, telefone, e-mail, CPF, documentos ou mensagens.
- Não enviar texto livre digitado pelo visitante.
- Usar somente valores controlados pelo sistema.
- Identificar imóveis demonstrativos como `demonstrative`.
- O site deve funcionar normalmente sem GTM.
- Scripts externos dependem de consentimento válido.

## Arquitetura

- `types/analytics.ts`: contrato dos eventos.
- `types/data-layer.d.ts`: declaração de `window.dataLayer`.
- `lib/analytics.ts`: normalização e envio para a `dataLayer`.
- `config/analytics.ts`: validação do ID do GTM.
- `google-tag-manager-loader.tsx`: carregamento condicional.
- `tracked-property-form.tsx`: buscas e filtros.
- `tracked-whatsapp-link.tsx`: cliques no WhatsApp.
- `tracked-internal-link.tsx`: jornadas internas.

## Configuração

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

Sem essa variável, o Google Tag Manager não é carregado.

IDs que não correspondam ao formato `GTM-XXXXXXX` são ignorados.

## Eventos implementados

### `property_search`

Busca iniciada na Home.

Parâmetros:

- `source_page`
- `purpose`
- `modality`
- `neighborhood`
- `property_type`
- `price_range`
- `bedrooms`

### `property_filter`

Aplicação de filtros na página de imóveis.

Utiliza os mesmos parâmetros de `property_search`.

### `contact_start`

Início de uma jornada interna de contato.

Parâmetros:

- `source_page`
- `contact_intent`

### `whatsapp_click`

Clique que abre o WhatsApp.

Parâmetros:

- `source_page`
- `contact_intent`
- `destination: "whatsapp"`
- `property_slug`, quando aplicável
- `property_status`, quando aplicável

### `valuation_start`

Início da jornada de avaliação de imóvel.

Parâmetros:

- `source_page`

### `view_property`

Visualização de uma página de imóvel.

Parâmetros:

- `source_page`;
- `property_slug`;
- `property_status`;
- `property_purpose`;
- `neighborhood`.

### `view_neighborhood`

Visualização de uma página de bairro ou região.

Parâmetros:

- `source_page`;
- `neighborhood_slug`.

## Eventos planejados

Os eventos abaixo existem no contrato TypeScript, mas ainda não possuem disparos confirmados:

- `buy_lead`
- `rent_lead`
- `investment_lead`

Eles não devem ser tratados como implementados até existirem pontos reais de disparo.

## Valores de `source_page`

- `home`
- `properties`
- `property-details`
- `buy`
- `rent`
- `long-term-rent`
- `short-term-rent`
- `investment`
- `neighborhood`
- `contact`
- `about`
- `blog`
- `blog-post`

## Valores de `contact_intent`

- `general`
- `buy`
- `rent`
- `investment`
- `valuation`
- `real-properties`

## Consentimento

A política adotada é o bloqueio prévio de eventos analíticos.

O comportamento é:

- `trackAnalyticsEvent()` consulta as preferências armazenadas;
- eventos internos só entram na `window.dataLayer` quando `analytics` está como `granted`;
- sem consentimento analítico, o evento é descartado;
- eventos recusados não ficam acumulados para processamento posterior;
- a navegação e as funções essenciais continuam funcionando normalmente.

O GTM é carregado quando:

- existe um ID válido;
- o visitante concedeu consentimento analítico ou de marketing.

O consentimento de marketing pode autorizar o carregamento do container, mas não autoriza os eventos analíticos internos da ADRIZIO.

### Pendência de produção

O container GTM deverá possuir regras próprias de consentimento para cada tag.

Nenhuma tag analítica deverá disparar quando `analytics` estiver negado, e nenhuma tag de publicidade deverá disparar quando `marketing` estiver negado.

## Dados proibidos

Nunca enviar:

- nome;
- telefone;
- e-mail;
- CPF ou RG;
- mensagens do WhatsApp;
- conteúdo livre de formulários;
- endereço residencial completo;
- dados financeiros pessoais;
- documentos;
- parâmetros de URL contendo dados pessoais.

## Critérios de aceite

- formatação, lint, TypeScript e build aprovados;
- GTM ausente sem consentimento;
- GTM ausente sem ID válido;
- eventos sem dados pessoais;
- parâmetros conforme contrato;
- imóveis demonstrativos identificados corretamente;
- ausência de eventos duplicados;
- eventos bloqueados quando o consentimento analítico estiver negado;
- ausência de processamento retroativo de eventos;
- regras de consentimento do container GTM documentadas;
- testes manuais concluídos.
