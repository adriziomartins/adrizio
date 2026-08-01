# ADRIZIO — Testes Manuais de Analytics

## Preparação

Execute:

```bash
npm run dev
```

Abra o site em uma janela anônima e mantenha abertas as áreas:

```text
DevTools → Console
DevTools → Network
DevTools → Application → Local Storage
```

## Comandos de inspeção

Visualizar a `dataLayer`:

```js
window.dataLayer
```

Visualizar eventos:

```js
window.dataLayer?.filter((item) => item?.event)
```

Visualizar o último evento:

```js
window.dataLayer?.at(-1)
```

Contar eventos:

```js
window.dataLayer?.reduce((result, item) => {
  const name = item?.event ?? 'sem_evento'
  result[name] = (result[name] ?? 0) + 1
  return result
}, {})
```

Limpar durante testes locais:

```js
window.dataLayer = []
```

Verificar se o GTM foi carregado:

```js
Boolean(document.querySelector('script[src*="googletagmanager.com"]'))
```

Listar recursos do GTM:

```js
performance
  .getEntriesByType('resource')
  .filter((entry) => entry.name.includes('googletagmanager'))
  .map((entry) => entry.name)
```

## Cenário 1 — primeira visita

1. Limpar o armazenamento do domínio.
2. Recarregar a página.
3. Confirmar a apresentação do modal.
4. Não conceder consentimento.
5. Confirmar que o GTM não foi carregado.

Esperado:

```js
false
```

## Cenário 2 — recusar opcionais

1. Selecionar “Recusar opcionais”.
2. Navegar pelo site.
3. Realizar uma busca.
4. Abrir um CTA interno.
5. Confirmar que o GTM permanece ausente.

Registrar separadamente se eventos aparecerem na `dataLayer`, pois esse é o comportamento arquitetural que ainda será revisado.

## Cenário 3 — aceitar opcionais

Este cenário exige um container GTM real de teste.

1. Limpar o armazenamento.
2. Recarregar.
3. Aceitar opcionais.
4. Confirmar o carregamento do GTM.
5. Verificar a aba Network.
6. Executar as jornadas instrumentadas.

Esperado:

- GTM carregado uma única vez;
- eventos com parâmetros corretos;
- nenhum dado pessoal.

## Consentimento personalizado

Testar:

| Analytics | Marketing | Comportamento atual |
| --------- | --------- | ------------------- |
| negado    | negado    | GTM ausente         |
| concedido | negado    | GTM carregado       |
| negado    | concedido | GTM carregado       |
| concedido | concedido | GTM carregado       |

A combinação `analytics: denied` e `marketing: granted` precisa ser revisada antes da produção.

## Testes dos eventos

### `property_search`

1. Acessar a Home.
2. Preencher e enviar a busca.
3. Inspecionar o último evento.

Esperado:

```js
{
  event: 'property_search',
  source_page: 'home',
  purpose: '...'
}
```

### `property_filter`

1. Acessar `/imoveis`.
2. Aplicar filtros.
3. Inspecionar a `dataLayer`.

Esperado:

```js
{
  event: 'property_filter',
  source_page: 'properties',
  purpose: '...'
}
```

### `contact_start`

Testar:

- navbar desktop;
- navbar mobile;
- CTA final da Home;
- CTA de artigo do blog.

Esperado:

```js
{
  event: 'contact_start',
  source_page: '...',
  contact_intent: 'general'
}
```

### `valuation_start`

Testar:

- CTA final da Home;
- CTA em `/imoveis`.

Esperado:

```js
{
  event: 'valuation_start',
  source_page: 'home'
}
```

ou:

```js
{
  event: 'valuation_start',
  source_page: 'properties'
}
```

### `whatsapp_click`

Testar CTAs de:

- contato geral;
- compra;
- locação;
- investimento;
- avaliação;
- detalhe de imóvel.

Esperado:

```js
{
  event: 'whatsapp_click',
  source_page: '...',
  contact_intent: '...',
  destination: 'whatsapp'
}
```

Em páginas de imóvel:

```js
{
  property_slug: '...',
  property_status: 'real'
}
```

ou:

```js
{
  property_slug: '...',
  property_status: 'demonstrative'
}
```

## Auditoria de dados pessoais

Execute:

```js
JSON.stringify(window.dataLayer ?? [])
```

Confirme que não existem:

- nomes;
- telefones;
- e-mails;
- mensagens;
- documentos;
- endereços completos;
- textos livres.

## Aprovação

- modal funciona na primeira visita;
- preferências permanecem salvas;
- GTM não carrega sem autorização;
- GTM não carrega sem ID válido;
- eventos possuem nomes corretos;
- parâmetros estão normalizados;
- não existem dados pessoais;
- não existem eventos duplicados;
- não existem erros no console;
- o site funciona com analytics desativado.
