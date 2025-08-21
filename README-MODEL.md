<div style="display: flex; flex-wrap: wrap; justify-content: center;">
<img src='/public/preview-desktop.png' alt='Página inicial Desktop' />
<img src='/public/signin-desktop.png' alt='Página de login desktop' />
<img src='/public/signup-desktop.png' alt='Página de cadastro desktop' />
<img src='/public/preview-mobile.png' alt='Página inicial mobile' />
<img src='/public/signin-mobile.png' alt='Página de login mobile' />
<img src='/public/signup-mobile.png' alt='Página de cadastro mobile' />
</div>

🚀 Template de Autenticação de Usuários Completo
Um template robusto e responsivo para autenticação de usuários, ideal para iniciar seus projetos Next.js com um sistema de login e cadastro seguro e funcional.

✨ Visão Geral
Este projeto é um ponto de partida completo para integrar autenticação em sua aplicação Next.js. Ele oferece fluxos de login e cadastro por credenciais, além de integração com provedores de autenticação social populares como Google e GitHub. A interface é totalmente responsiva, garantindo uma ótima experiência em qualquer dispositivo.

[Deploy]('https://auth-template-zeta.vercel.app/auth')

🌟 Funcionalidades
Autenticação por Credenciais: Cadastro e Login utilizando e-mail e senha.
Login Social Integrado:
Autenticação via Google OAuth.
Autenticação via GitHub OAuth.
Telas Dedicadas: Páginas de Login e Cadastro com layouts intuitivos.
Design Responsivo: Interface adaptável a diferentes tamanhos de tela (desktop, tablet, mobile).
Validação de Formulários: Utiliza Zod para validação robusta dos dados de entrada.
Gerenciamento de Senhas: Armazenamento seguro de senhas com bcrypt-ts.
Gerenciamento de Sessão: Controle de sessão via JWT (JSON Web Tokens) com NextAuth.js.
🛠️ Tecnologias Utilizadas
Next.js 14+ (App Router): Framework React para aplicações web full-stack, com foco em performance.
React: Biblioteca JavaScript para construção de interfaces de usuário.
TypeScript: Superset do JavaScript que adiciona tipagem estática.
NextAuth.js (Auth.js): Solução de autenticação flexível e segura para Next.js.
Prisma ORM: ORM moderno e amigável para bancos de dados, facilitando a interação com o PostgreSQL.
PostgreSQL: Sistema de gerenciamento de banco de dados relacional (você pode adaptar para SQLite para desenvolvimento local se preferir).
Tailwind CSS: Framework CSS utility-first para estilização rápida e responsiva.
Zod: Biblioteca de validação de esquemas para dados.
bcrypt-ts: Biblioteca para hashing de senhas.
React Hook Form: Para gerenciamento eficiente de formulários.
Sonner: Para notificações (toasts) amigáveis ao usuário.
React Icons: Para ícones escaláveis e personalizáveis.
🚀 Como Rodar Localmente
Siga os passos abaixo para configurar e rodar o projeto em sua máquina:

1. Clone o repositório

```Bash
git clone [git@github.com:code-front-braga/auth-template.git]
```

2. Instale as dependências

```Bash
pnpm install
```

3. Configurações de Variáveis de Ambiente
   Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

## Database

DATABASE_URL="...url gerada..."

## NextAuth.js

AUTH_SECRET="SEGREDO_DE_SESSAO_BEM_LONGO_E_ALEATORIO" # Gerar com: openssl rand -base64 32

## Google OAuth

AUTH_GOOGLE_ID="SEU_GOOGLE_CLIENT_ID"
AUTH_GOOGLE_SECRET="SEU_GOOGLE_CLIENT_SECRET"

## GitHub OAuth

AUTH_GITHUB_ID="SEU_GITHUB_CLIENT_ID"
AUTH_GITHUB_SECRET="SEU_GITHUB_CLIENT_SECRET"

Certifique-se de configurar suas credenciais OAuth do Google e GitHub nos respectivos portais de desenvolvedor e obter os IDs e Segredos de Cliente.
No GitHub OAuth App, adicione http://localhost:3000/api/auth/callback/github como "Authorization callback URL(s)".
No Google Cloud Console (APIs & Services > Credentials), adicione http://localhost:3000/api/auth/callback/google como "Authorized redirect URIs" para seu ID de cliente Web.

4. Configurar o Banco de Dados (Prisma)
Certifique-se de que seu banco de dados PostgreSQL esteja rodando (ou SQLite, se estiver usando dev.db).
Execute as migrações do Prisma para criar as tabelas no seu DB:

```Bash
pnpm prisma db push
ou
npx prisma db push
```

(Opcional) Gere o cliente Prisma:

```Bash
pnpm prisma generate
ou
npx prisma generate
```

5. Rodar a Aplicação
```Bash
pnpm dev
ou
npm run dev
```

O aplicativo estará disponível em http://localhost:3000.

📄 Licença
Este projeto está licenciado sob a licença MIT License.
