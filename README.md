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

## Criar um anuncio:

![image](https://github.com/Eddi3MS/haven/assets/75024157/2184161d-0b06-4394-bca7-b04c727e9340)

## Anuncios passam por avaliação

![image](https://github.com/Eddi3MS/haven/assets/75024157/c540034e-7182-4616-8be8-c2f29867293c)

## Após aprovados, anuncios sao dispostos em uma lista, podendo ser aplicados filtros para uma busca mais assertiva

![image](https://github.com/Eddi3MS/haven/assets/75024157/2ebfbd7d-7f97-43f5-b132-c4374a3cdbb1)
![image](https://github.com/Eddi3MS/haven/assets/75024157/6f691afe-66c6-48c8-aa32-1f426c091a5e)

## Entrando em um anuncio especifico, será disposto todos os dados e o telefone de contato do anunciante

![image](https://github.com/Eddi3MS/haven/assets/75024157/1d9d42ef-9518-4a8c-b1c7-08b4a3412f7c)

## Quem anuncia tem uma tela para editar, excluir ou visualizar seus anuncios

![image](https://github.com/Eddi3MS/haven/assets/75024157/37e2bc75-5ad6-4a02-9c12-bb77c1977e58)

## Charts para o admin controlar dados dos anuncios

![image](https://github.com/Eddi3MS/haven/assets/75024157/025873c9-44e2-48ea-bc52-f31d4e12c4dc)

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
