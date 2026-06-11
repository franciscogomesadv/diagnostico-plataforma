# 🗺️ Guia Visual — Estrutura Completa do Sistema

## 📊 Diagrama de Camadas

```
┌──────────────────────────────────────────────────────────────────┐
│                         USUÁRIO FINAL                            │
│          (Browser: Chrome, Firefox, Safari, etc.)                │
└────────────────────────────┬─────────────────────────────────────┘
                             │ HTTPS
                             ↓
┌──────────────────────────────────────────────────────────────────┐
│                   CAMADA APRESENTAÇÃO                            │
│               (Frontend React 18 + Vite + Tailwind)              │
│                                                                  │
│  Hospedagem: Vercel (vercel.app)                                │
│  URL: https://diagnostico-plataforma.vercel.app                 │
│                                                                  │
│  ├─ pages/              [7 páginas de rota]                     │
│  │  ├─ LoginPage        [Login mock]                            │
│  │  ├─ DashboardPage    [Cliente + diagnósticos]                │
│  │  ├─ FormularioPage   [Bloco 0: 51 perguntas]                │
│  │  ├─ ModuloCodePage   [26 perguntas: Código]                 │
│  │  ├─ ModuloRegimentoPage [38 perguntas: Regimento]           │
│  │  ├─ ModuloPoliticasPage [13+ perguntas: Políticas]          │
│  │  ├─ ResponderDiagnosticoPage [Página pública com token]     │
│  │  └─ RelatorioPage    [Gráficos + exports]                   │
│  │                                                               │
│  ├─ components/         [Header.jsx]                            │
│  ├─ App.jsx             [Router principal]                      │
│  └─ main.jsx            [Entrada React]                         │
│                                                                  │
│  Design: FGA Premium (Tailwind)                                 │
│  - Marinho #1B2A4A                                              │
│  - Âmbar #C9A84C                                                │
│  - Glassmorphism + Shadows sutis                                │
└────────────────────────────┬─────────────────────────────────────┘
                             │ REST API
                             │ JSON + Bearer Token (JWT)
                             ↓
┌──────────────────────────────────────────────────────────────────┐
│                   CAMADA APLICAÇÃO                               │
│              (Backend Node.js + Express + docx)                  │
│                                                                  │
│  Hospedagem: Render (render.com)                                │
│  URL: https://diagnostico-backend-cwrj.onrender.com             │
│                                                                  │
│  ├─ /api/auth/                                                  │
│  │  ├─ POST /login              [JWT mock]                      │
│  │  └─ POST /verify             [Valida token]                  │
│  │                                                               │
│  ├─ /api/clientes/                                              │
│  │  ├─ GET                       [Lista clientes]               │
│  │  ├─ POST                      [Cria cliente]                 │
│  │  ├─ GET /:id                  [Detalhes]                     │
│  │  └─ PUT /:id                  [Atualiza]                     │
│  │                                                               │
│  ├─ /api/diagnosticos/                                          │
│  │  ├─ GET /:id                  [Detalhes diagnóstico]         │
│  │  ├─ POST                      [Cria novo]                    │
│  │  ├─ PUT /:id                  [Atualiza progresso]           │
│  │  └─ GET /cliente/:id          [Listar por cliente]           │
│  │                                                               │
│  ├─ /api/respostas/                                             │
│  │  ├─ GET /diagnostico/:id      [Carrega respostas]            │
│  │  ├─ POST                      [Salva 1 resposta]             │
│  │  └─ POST /batch/salvar        [Salva múltiplas]              │
│  │                                                               │
│  ├─ /api/compartilhado/                                         │
│  │  ├─ POST /gerar-link          [Token 48h]                    │
│  │  ├─ GET /validar/:token       [Valida token]                 │
│  │  └─ POST /salvar-resposta/:token [Cliente responde]          │
│  │                                                               │
│  └─ /api/geradores/              [⭐ MOTOR DE GERAÇÃO]           │
│     ├─ POST /gerar/:id           [Gera 3 documentos]            │
│     ├─ GET /download/:id/codigo  [Download .docx Código]        │
│     ├─ GET /download/:id/regimento [Download .docx Regimento]   │
│     └─ GET /download/:id/politicas [Download .docx Políticas]   │
│                                                                  │
│  utils/                                                         │
│  └─ gerador-documentos.js        [⭐ CORE DO SISTEMA]            │
│     ├─ gerarCodigoCoduta()       [Gera Código]                  │
│     ├─ gerarRegimentoInterno()   [Gera Regimento]               │
│     └─ gerarPoliticasInternas()  [Gera Políticas]               │
│                                                                  │
│  Armazenamento: MOCK (memória)                                  │
│  Próximo: Google Sheets → PostgreSQL                            │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             ↓
┌──────────────────────────────────────────────────────────────────┐
│                   CAMADA DADOS                                   │
│                                                                  │
│  DESENVOLVIMENTO: Mock (memória)                                │
│  ├─ Clientes: array em memória                                  │
│  ├─ Diagnósticos: array em memória                              │
│  ├─ Respostas: array em memória                                 │
│  └─ Tokens: array em memória                                    │
│                                                                  │
│  PRODUÇÃO (Future):                                             │
│  ├─ Opção 1: Google Sheets API                                  │
│  ├─ Opção 2: PostgreSQL em Railway                              │
│  └─ Opção 3: Supabase (PostgreSQL + Auth)                       │
│                                                                  │
│  ARQUIVOS GERADOS:                                              │
│  └─ .docx (Word)     ← gerado dinamicamente via docx lib        │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Fluxo de Dados Completo

```
┌─────────────────────────────────────────────────────────────────┐
│                    USUARIO FAZ LOGIN                             │
│         Email: frangomes@claraassociados.com                    │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ↓
                [POST /api/auth/login]
                           │
                ┌──────────┴──────────┐
                │                     │
         [Backend verifica       [se OK:
          email permitido]       gera JWT]
                │                     │
                └──────────┬──────────┘
                           │
                           ↓
          [localStorage.setItem('token')]
                           │
                           ↓
            ┌──────────────────────────┐
            │  DASHBOARD CARREGADO     │
            │  ├─ Clientes             │
            │  ├─ Diagnósticos         │
            │  └─ Ações disponíveis    │
            └──────────────────────────┘
                           │
            ┌──────────────┴──────────────┐
            │                             │
            ↓                             ↓
    [Clica 📄 Gerar           [Clica 🔗 Gerar
     Documentos]               Link Compartilhado]
            │                             │
            ↓                             ↓
  [POST /geradores/gerar/:id]  [POST /compartilhado/gerar-link]
            │                             │
      ┌─────┼──────────────────────┬─────┘
      │     │                      │
      ↓     ↓                      ↓
  Motor de Geração           Gera Token Único
      │                      (crypto.randomBytes)
  ┌───┴───────────────────┐         │
  │                       │         ↓
  ├─ Análise dados        │    Token válido 48h
  │  (porte, setor)       │         │
  │                       │         ↓
  ├─ Gera Código          │    Retorna JSON:
  │  (estrutura + texto)  │    {
  │                       │      token: "...",
  ├─ Gera Regimento       │      link: "https://...responder/token",
  │  (estrutura + texto)  │      mensagem_whatsapp: "..."
  │                       │    }
  └─ Gera Políticas   ────┘         │
      (LGPD, Home Office)           ↓
      │                      [Modal mostra link]
      │                      [Cliente copia msg
      ↓                       e envia no WhatsApp]
  [3 buffers .docx]               │
      │                           ↓
      ↓                    Cliente clica link
  Retorna JSON:            [GET /responder/:token]
  {                               │
    documentos: {                 ↓
      codigo: {...},      [ResponderDiagnosticoPage
      regimento: {...},    carrega - sem login]
      politicas: {...}            │
    }                             ↓
  }                       Cliente preenche
      │                   [51 perguntas]
      ↓                           │
  [Modal mostra               ↓ (auto-save)
   3 downloads]    [POST /compartilhado/salvar-resposta/:token]
      │                        │
      ├─ Código (50KB)        ↓
      ├─ Regimento (65KB)  Salva em memória
      └─ Políticas (45KB)  (ou Google Sheets)
                               │
                               ↓
                   [Você vê no Dashboard
                    as respostas do cliente]
```

---

## 📁 Onde Cada Coisa Está

### ❓ Perguntas e Estrutura
```
frontend/
├─ src/pages/FormularioPage.jsx      [51 perguntas: Bloco 0]
├─ src/pages/ModuloCodePage.jsx      [26 perguntas: Código]
├─ src/pages/ModuloRegimentoPage.jsx [38 perguntas: Regimento]
└─ src/pages/ModuloPoliticasPage.jsx [13+ perguntas: Políticas]
```

### 🎨 Design & Cores
```
frontend/
├─ src/pages/*.jsx          [Tailwind classes: #1B2A4A, #C9A84C]
├─ src/index.css            [@tailwind directives]
└─ public/logo-fga.png      [Logo]
```

### 🔐 Autenticação
```
backend/routes/auth.js      [POST /login, POST /verify]
└─ allowedEmails = ['frangomes@claraassociados.com']
```

### 📊 Geração de Documentos
```
backend/utils/gerador-documentos.js
├─ gerarCodigoCoduta(dados)
├─ gerarRegimentoInterno(dados)
└─ gerarPoliticasInternas(dados)
```

### 🔗 Links Compartilhados
```
backend/routes/compartilhado.js
├─ POST /gerar-link         [Cria token 48h]
├─ GET /validar/:token      [Valida]
└─ POST /salvar-resposta/:token [Cliente responde]
```

### 📡 APIs
```
backend/routes/*.js
├─ auth.js              [/api/auth/*]
├─ clientes.js          [/api/clientes/*]
├─ diagnosticos.js      [/api/diagnosticos/*]
├─ respostas.js         [/api/respostas/*]
├─ compartilhado.js     [/api/compartilhado/*]
└─ geradores.js         [/api/geradores/*]
```

### 📝 Documentação
```
ONBOARDING_DESENVOLVEDOR.md ← 🟢 START HERE
DOCUMENTO_MOTOR_GERACAO.md   ← Motor de geração
DEPLOY.md                    ← Deploy + vars
README.md                    ← Quick start
ARQUITETURA.md              ← Arquitetura (old)
GUIA_VISUAL.md              ← Este arquivo
```

---

## 🔄 Ciclo de Vida de Um Diagnóstico

```
STATUS          AÇÃO                          PÁGINA
─────────────────────────────────────────────────────

Criado      →   Preencher Bloco 0            FormularioPage
            →   (51 perguntas)               (progresso 0-50%)

Em Curso    →   Escolher módulo              ModuloSelectorPage
            →   (Código/Regimento/Políticas)

Em Curso    →   Preencher módulo             ModuloCodePage
            →   (26/38/13+ perguntas)        ModuloRegimentoPage
            →   (progresso 50-100%)          ModuloPoliticasPage

Completo    →   Ver Relatório                RelatorioPage
            →   (gráficos, status, recomendações)
            →   (exportar JSON/MD)

            →   Gerar Documentos             DashboardPage
            →   (Código + Regimento + Políticas)
            →   (.docx downloads)
```

---

## 🧪 Pontos de Teste Principais

```
┌─ Auth
│  ├─ Login com email autorizado ✓
│  ├─ Login com email não autorizado ✗
│  └─ Token salvo em localStorage ✓
│
├─ Dashboard
│  ├─ Clientes carregam ✓
│  ├─ Diagnósticos carregam ✓
│  ├─ Botão 🔗 gera link 48h ✓
│  └─ Botão 📄 gera documentos ✓
│
├─ Formulários
│  ├─ Respostas salvas via API ✓
│  ├─ Progresso atualiza ✓
│  ├─ Navegação anterior/próximo ✓
│  └─ Validação de obrigatórias ✓
│
├─ Links Compartilhados
│  ├─ Token válido por 48h ✓
│  ├─ Página pública carrega (sem login) ✓
│  ├─ Cliente preenche respostas ✓
│  ├─ Respostas salvas com token ✓
│  └─ Link expirado mostra erro ✓
│
├─ Geração de Documentos
│  ├─ 3 documentos .docx gerados ✓
│  ├─ Estrutura correta ✓
│  ├─ Conteúdo específico da empresa ✓
│  └─ Downloads funcionam ✓
│
└─ Relatório
   ├─ Gráficos renderizam ✓
   ├─ Export JSON funciona ✓
   ├─ Export MD funciona ✓
   └─ Dados corretos ✓
```

---

## 🚀 Deploy Pipeline

```
┌──────────────────────┐
│  git push main       │
│  (seu código)        │
└──────────┬───────────┘
           │
    ┌──────┴──────────────────────┐
    │                             │
    ↓                             ↓
[GITHUB WEBHOOK]        [GITHUB WEBHOOK]
    │                             │
    ↓                             ↓
[VERCEL BUILD]          [RENDER BUILD]
Frontend                Backend
    │                             │
    └─ npm run build              │
    └─ Deploy /dist        └─ npm install
    └─ Cache bust                 └─ npm start
    │                             │
    ↓                             ↓
[LIVE]                   [LIVE]
https://diagnostico-    https://diagnostico-
plataforma.vercel.app   backend-cwrj.onrender.com
```

---

## 📈 Escalabilidade (Future)

```
Current (Mock):
└─ Tudo em memória
   └─ Reinicia com redeploy
   └─ Sem persistência

Next (Google Sheets):
├─ Dados em Google Sheets
├─ Fácil integração
└─ Ideal para MVP

Future (PostgreSQL):
├─ Banco de dados real
├─ Railway.app ou Supabase
├─ Escalável
└─ Ideal para produção
```

---

**Essa estrutura permite que um novo dev entenda o sistema em 15 minutos!** 🚀
