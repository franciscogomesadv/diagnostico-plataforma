# 📊 Plataforma de Diagnóstico — Governança Documental

Sistema integrado para diagnóstico e geração de documentos de governança trabalhista (Código de Conduta, Regimento Interno, Políticas Internas).

## 🚀 Quick Start

### Pré-requisitos
- Node.js 16+
- npm ou yarn

### 1. Instalar dependências

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

### 2. Configurar variáveis de ambiente

**Backend** (criar `backend/.env`):
```
PORT=5000
NODE_ENV=development
GOOGLE_CLIENT_ID=your_id_here
GOOGLE_CLIENT_SECRET=your_secret_here
JWT_SECRET=super-secret-key-change-this
FRONTEND_URL=http://localhost:3000
```

**Frontend** (criar `frontend/.env`):
```
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_id_here
```

### 3. Rodar

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
# Backend rodando em http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
# Frontend rodando em http://localhost:3000
```

### 4. Acessar
Abra [http://localhost:3000](http://localhost:3000) no navegador.

**Email de teste:** `frangomes@claraassociados.com`

---

## 📁 Estrutura do Projeto

```
diagnostico-plataforma/
├── backend/
│   ├── server.js                 # Express app
│   ├── package.json
│   ├── .env.example
│   ├── routes/
│   │   ├── auth.js              # Autenticação + JWT
│   │   ├── clientes.js          # CRUD clientes
│   │   ├── diagnosticos.js      # CRUD diagnósticos
│   │   └── respostas.js         # Salvar/carregar respostas
│   └── utils/                   # Utilitários
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx             # Entrada React
│   │   ├── App.jsx              # Router principal
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx        # Tela 1: Login
│   │   │   ├── DashboardPage.jsx    # Tela 2: Dashboard de clientes
│   │   │   ├── FormularioPage.jsx   # Tela 3: Formulário
│   │   │   └── RelatorioPage.jsx    # Tela 6: Relatório
│   │   ├── components/
│   │   │   └── Header.jsx          # Header com logout
│   │   └── utils/
│   ├── vite.config.js
│   ├── package.json
│   └── .env.example
│
└── README.md
```

---

## 🔑 Fluxo de Uso

1. **Login** → Email autorizado (Google OAuth mock)
2. **Dashboard** → Lista de clientes e diagnósticos
3. **Novo Diagnóstico** → Cria novo para um cliente
4. **Formulário** → Preenche Bloco 0 (51 perguntas) + Módulos A/B/C
5. **Relatório** → Visualiza gráficos, matriz de risco, recomendações
6. **Exportar** → JSON + MD + PDF (em progresso)

---

## 🔄 Integração Google Sheets (Próxima Fase)

Atualmente, os dados são salvos em **memória** (mock). Para integrar com Google Sheets:

1. Criar credenciais Google Sheets API
2. Instalar `google-spreadsheet` (já no package.json)
3. Criar arquivo `backend/utils/sheetsClient.js`
4. Substituir `routes/respostas.js` para usar Sheets ao invés de mock data

**Quando estiver validado com clientes, migraremos para PostgreSQL + Railway.**

---

## 📝 API Endpoints

### Auth
- `POST /api/auth/login` — Login com Google
- `POST /api/auth/verify` — Validar JWT token

### Clientes
- `GET /api/clientes` — Listar clientes
- `POST /api/clientes` — Criar novo cliente
- `GET /api/clientes/:id` — Detalhes do cliente
- `PUT /api/clientes/:id` — Atualizar cliente
- `DELETE /api/clientes/:id` — Deletar cliente

### Diagnósticos
- `GET /api/diagnosticos/cliente/:cliente_id` — Diagnósticos de um cliente
- `POST /api/diagnosticos` — Criar novo diagnóstico
- `GET /api/diagnosticos/:id` — Detalhes diagnóstico
- `PUT /api/diagnosticos/:id` — Atualizar progresso

### Respostas
- `GET /api/respostas/diagnostico/:diagnostico_id` — Respostas de um diagnóstico
- `POST /api/respostas` — Salvar uma resposta
- `POST /api/respostas/batch/salvar` — Salvar múltiplas respostas

---

## 🎯 Próximos Passos

- [ ] Integração Google Sheets API
- [ ] Lógica condicional de perguntas (gatilhos)
- [ ] Validação de respostas
- [ ] Exportação JSON + MD
- [ ] Dashboard com gráficos dinâmicos
- [ ] Autenticação Google OAuth real
- [ ] Teste com clientes reais
- [ ] Migração para Railway + PostgreSQL

---

## 📧 Contato

Clara Associados — Plataforma de Diagnóstico Governança
Desenvolvido com ❤️ para modernizar compliance trabalhista.
