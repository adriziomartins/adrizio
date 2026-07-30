# ADRIZIO — Contrato de Analytics

## Princípios

- Nenhum dado pessoal deve ser enviado para a dataLayer.
- Não enviar nome, telefone, e-mail, mensagem, documento ou endereço completo.
- Os eventos devem utilizar somente valores controlados pelo sistema.
- Scripts de marketing dependem de consentimento válido.
- Imóveis demonstrativos devem ser identificados como `demonstrative`.

## Eventos

### property_search

Busca iniciada na Home.

Parâmetros:

- source_page
- purpose
- modality
- neighborhood
- property_type
- price_range
- bedrooms

### property_filter

Filtros aplicados na página de imóveis.

### view_property

Visualização de uma página de imóvel.

Parâmetros:

- property_slug
- property_status
- property_purpose
- neighborhood

### view_neighborhood

Visualização de uma página de bairro ou região.

### contact_start

Início de uma jornada de contato.

### whatsapp_click

Clique que abre o WhatsApp.

Parâmetros:

- contact_intent
- source_page
- destination
- property_slug, quando aplicável
- property_status, quando aplicável

### valuation_start

Início da jornada de avaliação de imóvel.

### buy_lead

Intenção comercial de compra.

### rent_lead

Intenção comercial de locação.

### investment_lead

Intenção comercial de investimento.

## Dados proibidos

- nome;
- telefone;
- e-mail;
- CPF;
- mensagem do WhatsApp;
- endereço residencial;
- dados financeiros pessoais;
- qualquer texto digitado livremente pelo usuário.
