# Changelog

As alterações relevantes do projeto ADRIZIO são registradas neste arquivo.

## [Não publicado]

### Adicionado

- primeiro anúncio real do catálogo: Beach Class Fortaleza para curta temporada;
- galeria autorizada de uma unidade de referência do empreendimento;
- suporte a preço sob consulta, capacidade de hóspedes, endereço e condições de hospedagem;
- mensagem específica de consulta de disponibilidade pelo WhatsApp;
- anúncios reais de curta temporada na página dedicada à modalidade;
- rotas de imóveis reais no sitemap;
- contrato TypeScript para eventos analíticos;
- gerenciador de consentimento de privacidade;
- carregamento condicional do Google Tag Manager;
- rastreamento das pesquisas e filtros de imóveis;
- rastreamento dos cliques para WhatsApp;
- rastreamento das jornadas de contato e avaliação;
- rastreamento das páginas de imóveis e bairros;
- rastreamento das jornadas de compra, locação e investimento;
- documentação dos testes manuais;
- arquivo `.env.example` para configuração do GTM.

### Alterado

- demonstrativo do Meireles substituído pelo anúncio real do Beach Class Fortaleza;
- cards e páginas de imóveis passam a exibir fotografias quando disponíveis;
- avisos do catálogo passam a diferenciar anúncios reais de conteúdos demonstrativos;
- tipagem de `window.dataLayer` ampliada para eventos ADRIZIO e entradas do GTM;
- links comerciais internos passaram a emitir eventos de intenção;
- documentação passou a registrar parâmetros permitidos e dados proibidos.

### Corrigido

- prevenção de eventos duplicados em páginas dinâmicas;
- navegação entre slugs diferentes passa a registrar o evento correspondente;
- eventos são descartados sem consentimento analítico;
- IDs inválidos do Google Tag Manager são ignorados;
- valores analíticos são normalizados antes do envio.

### Privacidade

- eventos não devem transportar nome, telefone, e-mail, documento, mensagem, endereço completo ou texto livre;
- o site permanece funcional com analytics desativado;
- a ativação em produção depende das regras de consentimento do container real.

## [2026-08-02] — Fundação analítica concluída

- pipeline aprovado com Prettier, ESLint, TypeScript e build;
- 29 páginas validadas;
- branch `feature/analytics-foundation` sincronizada com o repositório remoto;
- implantação do container real mantida como etapa externa posterior.
