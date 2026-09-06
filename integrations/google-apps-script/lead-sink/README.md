# ADRIZIO — Lead Sink

Integração Google Apps Script responsável pela persistência operacional dos leads do ADRIZIO em Google Sheets.

## Arquitetura

```text
LeadCaptureForm
      ↓
POST /api/leads
      ↓
validação server-side
      ↓
Google Apps Script Web App
      ↓
Google Sheets — aba Leads
      ↓
confirmação do submissionId
      ↓
HTTP 201 no ADRIZIO
```

O navegador não envia leads diretamente ao Apps Script. A comunicação ocorre server-to-server pelo endpoint `/api/leads`.

## Segurança

O Apps Script recebe um objeto com:

```json
{
  "secret": "<server-only>",
  "payload": {}
}
```

O segredo é comparado com a Script Property:

```text
ADRIZIO_LEAD_WEBHOOK_SECRET
```

O ADRIZIO utiliza no servidor:

```text
LEAD_WEBHOOK_URL
LEAD_WEBHOOK_SECRET
```

Nenhum valor de segredo deve ser versionado.

## Script Properties

O projeto Apps Script requer:

```text
ADRIZIO_SPREADSHEET_ID
ADRIZIO_LEAD_WEBHOOK_SECRET
```

`setupSpreadsheetBinding()` registra o ID da planilha vinculada.

## Planilha

A aba operacional deve se chamar:

```text
Leads
```

O contrato possui 27 colunas:

```text
A   submission_id
B   created_at
C   name
D   phone
E   email
F   lead_type
G   message
H   source_page
I   property_slug
J   privacy_notice_version
K   privacy_acknowledged_at

L   first_touch_at
M   first_landing_path
N   first_referrer_host
O   first_utm_source
P   first_utm_medium
Q   first_utm_campaign
R   first_utm_content
S   first_utm_term

T   last_touch_at
U   last_landing_path
V   last_referrer_host
W   last_utm_source
X   last_utm_medium
Y   last_utm_campaign
Z   last_utm_content
AA  last_utm_term
```

`setupAttributionHeaders()` adiciona as 16 colunas de Attribution v1 após o contrato base.

A função valida previamente as 11 colunas existentes e interrompe a operação se encontrar conteúdo inesperado no intervalo destinado à atribuição.

## Attribution v1

A atribuição operacional contém:

```text
firstTouch
lastTouch
```

Cada touch pode conter:

```text
capturedAt
landingPath
referrerHost
utmSource
utmMedium
utmCampaign
utmContent
utmTerm
```

Attribution é opcional. Leads sem atribuição continuam válidos e são persistidos com as colunas L:AA vazias.

A sanitização e a validação completas são realizadas previamente pelo servidor ADRIZIO.

## Idempotência

`submission_id` é a chave de idempotência.

Antes de gravar uma nova linha, o Apps Script procura o UUID na coluna A.

Se já existir, retorna:

```json
{
  "ok": true,
  "submissionId": "<mesmo UUID>",
  "duplicate": true
}
```

e nenhuma segunda linha é criada.

Um `ScriptLock` protege a verificação e a gravação contra execuções concorrentes.

## Confirmação de persistência

Após uma persistência bem-sucedida, o Apps Script retorna:

```json
{
  "ok": true,
  "submissionId": "<UUID>"
}
```

O endpoint `/api/leads` somente retorna HTTP 201 quando `ok` é `true` e o `submissionId` retornado corresponde exatamente ao UUID enviado.

## Implantação

O Apps Script é publicado como Web App:

```text
Executar como: Eu
Acesso: Qualquer pessoa
```

O endpoint operacional utiliza a URL `/exec`.

Após modificar `Code.gs`, deve-se atualizar a implantação existente para uma nova versão do Apps Script, preservando a URL operacional.

## Política de segredos

Nunca versionar:

- `ADRIZIO_LEAD_WEBHOOK_SECRET`;
- `LEAD_WEBHOOK_SECRET`;
- `.env.local`;
- credenciais privadas;
- dados pessoais reais de leads.

A URL pública do Web App não substitui a autenticação server-to-server.

## Histórico

### v1.0

- autenticação por segredo;
- persistência em Google Sheets;
- confirmação por `submissionId`;
- idempotência;
- `ScriptLock`.

### v1.1 — Attribution

- contrato expandido para 27 colunas;
- `firstTouch`;
- `lastTouch`;
- UTMs operacionais;
- referrer externo;
- landing path;
- compatibilidade com leads sem attribution.
