# Publicação da casa do Pirambu

Referência: PIR-VEN-01. Valor informado: R$ 350.000. Publicação autorizada pelo usuário em 18/10/2026, mantendo explícita a pendência documental.

O anúncio informa registro de uso ainda não conferido, natureza e condições de transferência a esclarecer e financiamento não confirmado. Não afirma propriedade plena ou regularização concluída.

## Implantação

1. Atualizar o projeto com esta alteração e concluir o deploy na Hostinger, incluindo as sete imagens em `public/images/properties/casa-pirambu`.
2. Verificar que `https://adrizio.com.br/images/properties/casa-pirambu/fachada.png` responde antes de inserir o registro no banco.
3. No checkout atualizado que já tenha a conexão de produção configurada, gerar o cliente Prisma e simular a inserção:

```bash
npx prisma generate
node --import tsx scripts/bootstrap-production-catalog.ts --code PIR-VEN-01
```

O plano deve indicar `regions=1`, `properties=1`, `media=7` e `property=PIR-VEN-01`. A simulação não escreve no banco.

4. Aplicar somente este imóvel:

```bash
PRODUCTION_CATALOG_BOOTSTRAP=CONFIRM node --import tsx scripts/bootstrap-production-catalog.ts --code PIR-VEN-01 --apply
```

O script usa `DATABASE_URL` já configurada no ambiente ou em `.env`, mantém as verificações existentes do destino de produção e executa os upserts em transação. Não colar credenciais em mensagens ou logs. O seletor por código evita atualizar o Beach Class e regiões não relacionadas. Repetir o comando atualiza o mesmo código, sem criar duplicata.

5. Se o deploy usa `CATALOG_SOURCE=database`, aguardar até 300 segundos para revalidação do catálogo e conferir:

- `/imoveis/casa-venda-pirambu-fortaleza-vista-mar`;
- `/comprar?bairro=pirambu&tipo=casa`;
- `/api/properties/casa-venda-pirambu-fortaleza-vista-mar`;
- fotos, preço, informações documentais e mensagem do WhatsApp.

Com `CATALOG_SOURCE=static`, o anúncio é disponibilizado pelo deploy do catálogo estático. Não trocar a fonte do catálogo apenas para publicar este imóvel.

## Manutenção

Após obter os documentos, atualizar a descrição, a primeira seção de detalhes e o texto de contato em `data/casa-pirambu.ts`; fazer novo deploy e aplicar o mesmo comando por código se o catálogo estiver no banco. Não substituir a pendência por “regularizado” sem conferência.
