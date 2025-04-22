# Haven

## 🏡 Proposta

- **Busca de imóveis para compra ou aluguel**

  - Filtros disponíveis:
    - Tipo: `venda` | `aluguel`
    - Quantidade de quartos
    - Quantidade de banheiros

- **Cadastro de novos imóveis**

  - Formulário com os seguintes campos obrigatórios:
    - Localização (endereço ou cidade/bairro)
    - Área total (m²)
    - Área construída (m²)
    - Número de quartos
    - Número de banheiros
    - Upload de até 5 fotos

- **Moderação de anúncios**

  - Todos os anúncios devem ser aprovados manualmente por um administrador antes de serem exibidos publicamente

- **Contato direto com o anunciante**
  - Cada anúncio incluirá o número de telefone do proprietário ou responsável pelo imóvel, permitindo negociação direta

## 🧱 Tech Stack

- **Next.js**  
  Framework React full-stack com renderização SSR/SSG e otimizações de performance.

- **React**  
  Biblioteca principal para construção da interface do usuário.

- **Tailwind CSS**  
  Estilização utilitária com animações (`tailwindcss-animate`), merge de classes (`tailwind-merge`) e condicionais (`clsx`).

- **Radix UI + Shadcn**  
  Componentes acessíveis e low-level como Avatar, Dialog, Tooltip, Select, etc.

- **React Hook Form + Zod**  
  Gerenciamento de formulários leve e performático, e validação de tipagem.

- **NextAuth.js**  
  Autenticação via OAuth (login social).

- **NeonDB (PostgreSQL)**  
  Banco de dados relacional moderno baseado em Postgres, com suporte a branching e escalabilidade.

- **Prisma ORM**  
  ORM moderno e tipado com geração de queries SQL automáticas, migrations e integração com TypeScript.

- **Cloudinary**  
  Plataforma de gerenciamento e entrega otimizada de imagens.

- **Resend**  
  API moderna para envio de emails transacionais.

- **React Email**  
  Framework para criar templates de e-mail com componentes React, estilizados com Tailwind.

- **Zustand**  
  Gerenciamento de estado global simples e performático.

- **Chart.js + react-chartjs-2**  
  Visualização de dados com gráficos responsivos.

- **Embla Carousel**  
  Slider/carrossel acessível e mobile-friendly.

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
