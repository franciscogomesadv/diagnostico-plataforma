# 🚀 Onboarding para Desenvolvedores — Plataforma de Diagnóstico

**Bem-vindo!** Este documento é seu guia completo para entender, rodar e contribuir ao sistema.

---

## 📌 O QUE É ESTE SISTEMA?

Uma **plataforma web profissional** que ajuda empresas a:
1. Diagnosticar maturidade de governança documental
2. Gerar 3 documentos de compliance automaticamente:
   - **Código de Conduta e Ética**
   - **Regimento Interno**
   - **Políticas Internas** (LGPD, Home Office, Segurança, Assédio)

**Baseado em:** Método S.A.I.F.E. (Triângulo de Ouro da Compliance Trabalhista)

---

## 🏗️ ARQUITETURA DE ALTO NÍVEL

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React 18 + Vite)               │
│  Hospedado: Vercel                                          │
│  URL: https://diagnostico-plataforma.vercel.app            │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTPS REST API
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              BACKEND (Node.js + Express)                    │
│  Hospedado: Render                                          │
│  URL: https://diagnostico-backend-cwrj.onrender.com        │
│                                                              │
│  ├─ /api/auth             (Login + JWT)                    │
│  ├─ /api/clientes         (CRUD clientes)                  │
│  ├─ /api/diagnosticos     (CRUD diagnósticos)              │
│  ├─ /api/respostas        (Salvar/carregar respostas)      │
│  ├─ /api/compartilhado    (Links com token 48h)            │
│  └─ /api/geradores        (Gerar documentos .docx)         │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 ESTRUTURA DE PASTAS

```
diagnostico-plataforma/
│
├── frontend/                              # React 18 + Vite
│   ├── src/
│   │   ├── pages/                        # Páginas (componentes de rota)
│   │   │   ├── LoginPage.jsx             # Tela de login
│   │   │   ├── DashboardPage.jsx         # Dashboard com diagnósticos
│   │   │   ├── FormularioPage.jsx        # Formulário base (Bloco 0)
│   │   │   ├── ModuloCodePage.jsx        # Módulo: Código de Conduta
│   │   │   ├── ModuloRegimentoPage.jsx   # Módulo: Regimento Interno
│   │   │   ├── ModuloPoliticasPage.jsx   # Módulo: Políticas Internas
│   │   │   ├── ModuloSelectorPage.jsx    # Seletor de módulos
│   │   │   ├── ResponderDiagnosticoPage.jsx # Página pública (cliente)
│   │   │   └── RelatorioPage.jsx         # Relatório + exports
│   │   │
│   │   ├── components/
│   │   │   └── Header.jsx                # Header com logout
│   │   │
│   │   ├── App.jsx                       # Definição de rotas
│   │   ├── main.jsx                      # Entrada React
│   │   ├── index.css                     # Tailwind CSS
│   │   └── vite.config.js
│   │
│   ├── public/
│   │   └── logo-fga.png                  # Logo Francisco Gomes
│   │
│   ├── .env.production                   # Vars de produção
│   ├── package.json
│   └── vercel.json                       # Config SPA (rewrites)
│
├── backend/                               # Node.js + Express
│   ├── server.js                         # App Express principal
│   │
│   ├── routes/
│   │   ├── auth.js                       # POST /login, POST /verify
│   │   ├── clientes.js                   # GET/POST/PUT clientes
│   │   ├── diagnosticos.js               # GET/POST/PUT diagnósticos
│   │   ├── respostas.js                  # GET/POST respostas
│   │   ├── compartilhado.js              # Tokens compartilhados (48h)
│   │   └── geradores.js                  # POST /gerar documento
│   │
│   ├── utils/
│   │   └── gerador-documentos.js         # Motor de geração (CORE)
│   │       ├─ gerarCodigoCoduta()        # Gera Código
│   │       ├─ gerarRegimentoInterno()    # Gera Regimento
│   │       └─ gerarPoliticasInternas()   # Gera Políticas
│   │
│   ├── controllers/                      # (Opcional) lógica de negócio
│   ├── .env                              # Vars de desenvolvimento
│   ├── .env.example                      # Template
│   ├── package.json
│   └── package-lock.json
│
├── DOCUMENTAÇÃO/
│   ├── README.md                         # Quick start
│   ├── ONBOARDING_DESENVOLVEDOR.md       # Este arquivo
│   ├── ARQUITETURA.md                    # Arquitetura antiga (desatualizado)
│   ├── DOCUMENTO_MOTOR_GERACAO.md        # Especificação do motor
│   ├── DEPLOY.md                         # Deploy + vars de ambiente
│   ├── STATUS.md                         # Status do projeto
│   ├── CHECKLIST.md                      # Checklist de features
│   └── TESTE_RAPIDO.md                   # Testes manuais
│
├── .git/                                 # Repositório Git
├── .gitignore
└── package.json                          # Root (scripts)
```

---

## 🔑 FLUXO PRINCIPAL DE USO

```
1. USUÁRIO ACESSA: https://diagnostico-plataforma.vercel.app
   ↓
2. LOGIN PAGE
   - Email: frangomes@claraassociados.com
   - Sem senha (mock auth)
   - Sistema gera JWT token → localStorage
   ↓
3. DASHBOARD PAGE (/dashboard)
   - Lista clientes
   - Lista diagnósticos por cliente
   - Botões:
     • 🔗 Gerar link compartilhado (token 48h)
     • 📄 Gerar documentos (Código, Regimento, Políticas)
     • 📊 Continuar formulário
     • 📈 Ver relatório
   ↓
4. FORMULÁRIO PAGE (/diagnostico/:diagnosticoId)
   - Bloco 0: 51 perguntas de identificação
   - Respostas salvas em tempo real via API
   ↓
5. SELETOR DE MÓDULOS (/diagnostico/:diagnosticoId/seletor)
   - Escolhe qual documento gerar
   ↓
6. MÓDULOS (26q + 38q + 13+q)
   - Perguntas específicas para cada documento
   - Respostas salvas via API
   ↓
7. RELATÓRIO PAGE (/relatorio/:diagnosticoId)
   - Gráficos de maturidade e risco
   - Botões:
     • 📥 Exportar JSON
     • 📝 Exportar Markdown
   ↓
8. GERAR DOCUMENTOS (via Dashboard)
   - POST /api/geradores/gerar/:diagnosticoId
   - Retorna: Código + Regimento + Políticas
   - Downloads em .docx
```

---

## 🔐 AUTENTICAÇÃO

**Tipo:** JWT Token (Mock Auth)

**Fluxo:**
```javascript
// 1. Login
POST /api/auth/login
{
  email: "frangomes@claraassociados.com",
  name: "frangomes",
  googleId: "mock-google-id-123"
}

Resposta:
{
  success: true,
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  user: { email, name, googleId }
}

// 2. Frontend salva token
localStorage.setItem('token', data.token)

// 3. Requisições futuras
Authorization: Bearer <token>

// 4. Verify (opcional)
POST /api/auth/verify + Bearer token
```

**Usuários autorizados:**
- Arquivo: `backend/routes/auth.js`
- Array: `allowedEmails = ['frangomes@claraassociados.com']`
- Para adicionar novo user: editar array + redeploy

---

## 🔗 ENDPOINTS PRINCIPAIS

### Auth
```javascript
POST /api/auth/login              // Login (mock email)
POST /api/auth/verify             // Validar token JWT
```

### Clientes
```javascript
GET    /api/clientes              // Listar clientes
POST   /api/clientes              // Criar cliente
GET    /api/clientes/:id          // Detalhes cliente
PUT    /api/clientes/:id          // Atualizar cliente
```

### Diagnósticos
```javascript
GET    /api/diagnosticos/:id                      // Detalhes
POST   /api/diagnosticos                          // Criar novo
PUT    /api/diagnosticos/:id                      // Atualizar progresso
GET    /api/diagnosticos/cliente/:cliente_id      // Listar por cliente
```

### Respostas
```javascript
GET    /api/respostas/diagnostico/:diagnostico_id  // Carregar respostas
POST   /api/respostas                              // Salvar 1 resposta
POST   /api/respostas/batch/salvar                 // Salvar múltiplas
```

### Compartilhamento (Links 48h)
```javascript
POST   /api/compartilhado/gerar-link               // Gera token
GET    /api/compartilhado/validar/:token           // Valida token
POST   /api/compartilhado/salvar-resposta/:token   // Resposta do cliente
```

### Geradores (Documentos)
```javascript
POST   /api/geradores/gerar/:diagnosticoId        // Gera 3 docs
GET    /api/geradores/download/:id/codigo         // Download .docx
GET    /api/geradores/download/:id/regimento
GET    /api/geradores/download/:id/politicas
```

---

## 🎨 DESIGN SYSTEM (FGA)

**Cores:**
- Marinho: `#1B2A4A` (dark backgrounds, primary buttons)
- Âmbar: `#C9A84C` (accents, secondary buttons)
- Off-white: `#FDFCFB` (page background)
- Borders: `#E0DDD8` (light borders)
- Text: `#1B2A4A` (main), `#8a8a8a` (secondary), `#4a4a4a` (body)

**Tipografia:**
- Serif: `Playfair Display` (headings) + `Source Serif` (body)
- Sans: `Inter` (UI elements)

**Componentes:**
- Glassmorphism: `bg-white bg-opacity-70 backdrop-blur-[12px]`
- Border radius: `rounded-[8px]` (consistente)
- Shadows: `shadow-sm` (sutis), `shadow-lg` (hover)
- Spacing: Tailwind classes

---

## 🚀 SETUP LOCAL (5 minutos)

### 1. Clone o repositório
```bash
git clone https://github.com/franciscogomesadv/diagnostico-plataforma.git
cd diagnostico-plataforma
```

### 2. Backend
```bash
cd backend
npm install

# Criar .env
cat > .env << EOF
PORT=5000
NODE_ENV=development
JWT_SECRET=super-secret-dev-key
FRONTEND_URL=http://localhost:3000
EOF

npm run dev  # Roda em http://localhost:5000
```

### 3. Frontend (novo terminal)
```bash
cd frontend
npm install

# Criar .env
cat > .env << EOF
VITE_API_URL=http://localhost:5000
EOF

npm run dev  # Roda em http://localhost:3000
```

### 4. Acessar
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000/health
- **Email:** `frangomes@claraassociados.com`

---

## 🔧 COMO MODIFICAR / CONTRIBUIR

### Adicionar novo endpoint
```javascript
// backend/routes/novo.js
import express from 'express'
const router = express.Router()

router.post('/novo', (req, res) => {
  // lógica
  res.json({ success: true })
})

export default router

// Depois: adicionar em server.js
import novoRoutes from './routes/novo.js'
app.use('/api/novo', novoRoutes)
```

### Adicionar nova página
```javascript
// frontend/src/pages/NovaPage.jsx
import { useState, useEffect } from 'react'

export default function NovaPage() {
  return (
    <div className="bg-[#FDFCFB] min-h-screen">
      {/* Usar classes Tailwind + cores FGA */}
    </div>
  )
}

// Depois: adicionar em App.jsx
import NovaPage from './pages/NovaPage'
// <Route path="/nova" element={<NovaPage />} />
```

### Modificar motor de geração
```javascript
// backend/utils/gerador-documentos.js
// Modificar função gerarCodigoCoduta() para customizar
// Seções, conteúdo, estrutura dos documentos

// Depois: fazer redeploy
git add -A
git commit -m "Custom: melhorias no motor de geração"
git push origin main
```

---

## 🚢 DEPLOY

### Frontend (Vercel)
```bash
# Automático: push para main → Vercel auto-deploya
# URL de produção: https://diagnostico-plataforma.vercel.app

# Variáveis de ambiente (Vercel settings):
VITE_API_URL=https://diagnostico-backend-cwrj.onrender.com
```

### Backend (Render)
```bash
# Automático: push para main → Render auto-deploya
# URL de produção: https://diagnostico-backend-cwrj.onrender.com

# Variáveis de ambiente (Render settings):
PORT=10000
NODE_ENV=production
JWT_SECRET=<secret-key-long>
FRONTEND_URL=https://diagnostico-plataforma.vercel.app
```

---

## 📊 O MOTOR DE GERAÇÃO (Core do Sistema)

**Arquivo:** `backend/utils/gerador-documentos.js`

Três funções principais:

### 1. `gerarCodigoCoduta(dados)`
Recebe JSON com dados da empresa, retorna .docx com:
- Mensagem de Lideran­ça
- Propósito e Valores
- Princípios Éticos
- Diretrizes de Conduta
- Canal de Denúncia
- Responsabilidades
- Consequências
- Termo de Compromisso

### 2. `gerarRegimentoInterno(dados)`
Gera .docx com:
- Admissão e Contrato
- Jornada de Trabalho
- Direitos, Deveres, Proibições
- Ausências e Atrasos
- Férias
- Penalidades
- Disposições Gerais
- Termo de Ciência

### 3. `gerarPoliticasInternas(dados)`
Gera .docx com:
- Política de LGPD
- Política de Home Office
- Política de Segurança
- Política de Assédio

**Como customizar:**
- Editar templates de texto dentro das funções
- Adicionar lógica condicional baseada em `dados.porte`, `dados.setor`, etc.
- Integrar com API de IA (future: GPT para gerar conteúdo dinâmico)

---

## 🧪 TESTES MANUAIS

### Testar login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "frangomes@claraassociados.com",
    "name": "frangomes",
    "googleId": "test-123"
  }'
```

### Testar geração de documentos
```bash
curl -X POST http://localhost:5000/api/geradores/gerar/DG-001 \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

### Testar link compartilhado
```bash
# Gerar link
curl -X POST http://localhost:5000/api/compartilhado/gerar-link \
  -H "Authorization: Bearer <token>" \
  -d '{"diagnostico_id":"DG-001"}'

# Validar
curl http://localhost:5000/api/compartilhado/validar/<token>
```

---

## 📚 DOCUMENTOS COMPLEMENTARES

| Arquivo | Conteúdo |
|---------|----------|
| **README.md** | Quick start + estrutura básica |
| **DOCUMENTO_MOTOR_GERACAO.md** | Especificação do motor de geração |
| **DEPLOY.md** | Vars de ambiente, deployment |
| **STATUS.md** | O que está feito, o que falta |
| **CHECKLIST.md** | Features a implementar |
| **TESTE_RAPIDO.md** | Testes manuais |

---

## 🆘 FAQ

**P: Preciso de uma conta Google?**
R: Não. É mock auth. Use o email `frangomes@claraassociados.com` sem senha.

**P: Onde os dados são salvos?**
R: Mock (memória). Para produção: integrar Google Sheets ou PostgreSQL.

**P: Como adicionar um novo usuário autorizado?**
R: `backend/routes/auth.js` → array `allowedEmails`

**P: Os documentos gerados estão muito genéricos, como melhorar?**
R: Editar `gerador-documentos.js` ou integrar com IA (GPT).

**P: Como customizar cores/design?**
R: Classes Tailwind nos componentes React + arquivo tema.

**P: O sistema suporta múltiplos idiomas?**
R: Não no momento. Pronto para i18n (estrutura preparada).

---

## 🎯 PRÓXIMOS PASSOS (Roadmap)

- [ ] Integração com Google Sheets API (data persistence)
- [ ] Motor de IA para geração dinâmica de conteúdo
- [ ] Perguntas condicionais (if/then)
- [ ] Validação de respostas
- [ ] Dashboard de métricas
- [ ] Suporte a múltiplas línguas (i18n)
- [ ] Autenticação Google OAuth real
- [ ] Migração para PostgreSQL
- [ ] Suporte a upload de documentos
- [ ] Versionamento de documentos

---

## 📞 CONTATO

**Desenvolvido para:** Clara Associados / Francisco Gomes Advocacia  
**Responsável:** [Seu nome aqui]  
**Última atualização:** 10 de junho de 2026

---

**Bem-vindo ao time! 🚀**

Se tiver dúvidas, explore os arquivos de documentação ou rode o sistema localmente.
Bom coding! 💻
