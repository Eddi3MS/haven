# Haven

## Proposta

- Encontrar imóveis para comprar ou alugar
    - filtrar por tipo (venda | aluguel)
    - filtrar pela quantidade de quartos, banheiros
- Anunciar os seus imoveis
    - formulario captando informações relevantes como:
        - localização, area total, area construida, quartos, banheiros
        - fotos do imovel: até 5.
- Anuncio deve passar por aprovação do administrador para evitar problemas
- Anuncio incluirá contato direto do vendedor (telefone)

# Haven Imóveis

![image](https://github.com/Eddi3MS/haven/assets/75024157/7dda6b6f-2629-414a-9c65-3834af4d8465)

# Criar um anuncio:

![image](https://github.com/Eddi3MS/haven/assets/75024157/cb046d93-1516-4285-a5b1-233360e33468)

# Anuncios passam por avaliação

![image](https://github.com/Eddi3MS/haven/assets/75024157/a5066ba6-fdb2-4097-b82b-06441d98bde4)
![image](https://github.com/Eddi3MS/haven/assets/75024157/06de7b1a-0747-44cd-b8db-c6bd97679e21)

# Após aprovados, anuncios sao dispostos em uma lista, podendo ser aplicados filtros para uma busca mais assertiva

![image](https://github.com/Eddi3MS/haven/assets/75024157/b43723b2-3478-4666-af46-758932932c85)
![image](https://github.com/Eddi3MS/haven/assets/75024157/6f691afe-66c6-48c8-aa32-1f426c091a5e)

# Entrando em um anuncio especifico, será disposto todos os dados e o telefone de contato do anunciante

![image](https://github.com/Eddi3MS/haven/assets/75024157/337e4700-2ae2-487c-802a-d3d1d098dec3)


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
