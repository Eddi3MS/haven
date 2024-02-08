# Haven

## Proposta

- Encontrar imóveis para comprar ou alugar
    - filtrar por tipo (venda | aluguel)
    - filtrar pela quantidade de quartos, banheiros
    - filtrar pelo preço (maior que X, menor que Y)
- Anunciar os seus imoveis
    - formulario captando informações relevantes como:
        - localização, area total, area construida, quartos, banheiros, garagem
        - fotos do imovel: até 5.
- Anuncio deve passar por aprovação do administrador para evitar problemas
- Anuncio incluirá contato direto do vendedor (telefone)

### Setup .env file

```js
DATABASE_URL=
DIRECT_URL=

AUTH_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

RESEND_API_KEY=

NEXT_PUBLIC_APP_URL=
```

### Setup Prisma

```shell
npx prisma generate
npx prisma db push
```
