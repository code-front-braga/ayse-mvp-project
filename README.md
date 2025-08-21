<div style="display: flex; flex-wrap: wrap; justify-content: center;">
<img src='/public/print-overview.png' alt='Visão Geral Dashboard' />
<img src='/public/print-history.png' alt='Histórico de Compras' />
<img src='/public/print-new-purchase.png' alt='Nova Compra' />
<img src='/public/print-config.png' alt='Configurações' />
<img src='/public/print-sign-in.png' alt='Página de Login' />
<img src='/public/print-sign-up.png' alt='Página de Cadastro' />
</div>

🛒 **Ayse - Sistema de Gerenciamento de Compras**
Um sistema completo e intuitivo para gerenciar suas compras de supermercado, com controle detalhado de produtos, categorias e gastos mensais.

✨ **Visão Geral**
O Ayse é uma aplicação web moderna desenvolvida para ajudar você a organizar e controlar suas compras de supermercado. Com uma interface responsiva e funcionalidades robustas, você pode cadastrar compras, adicionar produtos, acompanhar gastos e visualizar relatórios detalhados de seus hábitos de consumo.

🌟 **Funcionalidades**

- **Autenticação Segura**: Sistema de login e cadastro com Better-auth
- **Dashboard Interativo**: Visão geral com gráficos e estatísticas de gastos
- **Gerenciamento de Compras**: Cadastro completo de compras por supermercado
- **Controle de Produtos**: Adicione produtos com categoria, preço e quantidade
- **Histórico Detalhado**: Visualize todas suas compras com filtros e busca
- **Status de Compras**: Controle o status (Em Processo, Concluída, Cancelada)
- **Relatórios Visuais**: Gráficos de gastos mensais usando Recharts
- **Configurações de Perfil**: Gerencie sua conta, senha e imagem de perfil
- **Design Responsivo**: Interface adaptável para desktop, tablet e mobile
- **Exportação PDF**: Gere relatórios em PDF das suas compras

🛠️ **Tecnologias Utilizadas**

- **Next.js 15** (App Router): Framework React para aplicações web full-stack
- **React 19**: Biblioteca JavaScript para construção de interfaces
- **TypeScript**: Superset do JavaScript com tipagem estática
- **Better-auth**: Solução moderna de autenticação para Next.js
- **Prisma ORM**: ORM moderno para interação com banco de dados
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional
- **Tailwind CSS**: Framework CSS utility-first para estilização
- **shadcn/ui**: Biblioteca de componentes UI moderna e acessível
- **Tanstack Table**: Biblioteca para tabelas avançadas com React
- **React Hook Form**: Gerenciamento eficiente de formulários
- **Zod**: Validação de esquemas de dados
- **Recharts**: Biblioteca para gráficos e visualizações
- **React Number Format**: Formatação de números e máscaras
- **Sonner**: Sistema de notificações toast
- **jsPDF**: Geração de documentos PDF
- **Lucide React**: Ícones SVG modernos

🚀 **Como Rodar Localmente**
Siga os passos abaixo para configurar e executar o projeto:

**1. Clone o repositório**

```bash
git clone [URL_DO_REPOSITORIO]
cd mvp-ayse
```

**2. Instale as dependências**

```bash
pnpm install
```

**3. Configuração das Variáveis de Ambiente**
Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/ayse_db"

# Better-auth
BETTER_AUTH_SECRET="seu_secret_muito_longo_e_aleatorio"
BETTER_AUTH_URL="http://localhost:3000"

# Pinata (para upload de imagens)
PINATA_API_KEY="sua_chave_api_pinata"
PINATA_API_SECRET="seu_secreto_api_pinata"
PINATA_JWT="seu_jwt_pinata"

# Google
GOOGLE_CLIENT_ID="seu_client_id_google"
GOOGLE_CLIENT_SECRET="seu_client_secret_google"
```

**4. Configurar o Banco de Dados**
Certifique-se de que o PostgreSQL esteja rodando e execute:

```bash
pnpm prisma generate
pnpm prisma db push
```

**5. Executar a Aplicação**

```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:3000`

🎯 **Funcionalidades Principais**

**Dashboard Overview**
- Cards com estatísticas de gastos
- Gráfico de gastos mensais
- Tabela com últimas compras
- Estado vazio para novos usuários

**Gerenciamento de Compras**
- Criação de nova compra por supermercado
- Adição de produtos com detalhes completos
- Controle de status da compra
- Visualização detalhada de cada compra

**Histórico e Relatórios**
- Lista completa de todas as compras
- Filtros por status e busca por texto
- Paginação para grandes volumes de dados
- Exportação de relatórios em PDF

**Configurações**
- Atualização de perfil e foto
- Alteração de senha
- Exclusão de conta

🔒 **Segurança**
- Autenticação com Better-auth
- Validação de dados com Zod
- Proteção de rotas
- Sanitização de inputs
- Controle de acesso por usuário

📱 **Responsividade**
- Design mobile-first
- Componentes adaptativos
- Navegação otimizada para touch
- Tabelas responsivas com scroll horizontal

🚀 **Deploy**
O projeto está configurado para deploy em plataformas como Vercel:

```bash
pnpm build
```

Certifique-se de configurar as variáveis de ambiente na plataforma de deploy.

📄 **Licença**
Este projeto está licenciado sob a licença MIT.
