# 🚀 DEPLOY ONLINE — 3 Passos

Seu código está **100% pronto**. Siga estes 3 passos para colocar online:

---

## **Passo 1: Criar repositório GitHub** (5 min)

### Opção A: Via Git (recomendado)
```bash
cd C:\Users\Cliente\Documents\Zoom\diagnostico-plataforma

git init
git add .
git commit -m "Initial commit: Diagnóstico plataforma pronta"

# Crie um repo em github.com, depois:
git branch -M main
git remote add origin https://github.com/seu-usuario/diagnostico-plataforma.git
git push -u origin main
```

### Opção B: Upload manual
Vá em [github.com/new](https://github.com/new):
1. Nome: `diagnostico-plataforma`
2. Clique "Create repository"
3. Siga os comandos que aparecem

---

## **Passo 2: Deploy Frontend (Vercel)** — 2 min

1. Vá em [vercel.com](https://vercel.com)
2. Clique "New Project"
3. Selecione seu repo `diagnostico-plataforma`
4. Framework: **Next.js** (Vercel vai detectar)
5. Na aba "Environment Variables":
   - `VITE_API_URL` = `https://diagnostico-backend.railway.app` (depois de fazer Passo 3)
6. Clique "Deploy"

**URL do frontend:** `https://diagnostico-plataforma.vercel.app`

---

## **Passo 3: Deploy Backend (Railway)** — 3 min

1. Vá em [railway.app](https://railway.app)
2. Clique "New Project"
3. Selecione "Deploy from GitHub"
4. Conecte seu GitHub e selecione `diagnostico-plataforma`
5. Railway vai detectar Node.js automaticamente
6. Variables (copie do seu `backend/.env`):
   - `PORT` = `5000`
   - `JWT_SECRET` = seu-valor-aqui
   - `NODE_ENV` = `production`
   - `FRONTEND_URL` = `https://diagnostico-plataforma.vercel.app`

7. Clique "Deploy"

**URL do backend:** `https://diagnostico-backend.railway.app`

---

## **Passo 4: Atualizar Frontend com URL do Backend**

Após Railway gerar URL:

1. Na Vercel, vá em "Settings" → "Environment Variables"
2. Atualize: `VITE_API_URL` = URL gerada pelo Railway
3. Clique "Redeploy"

---

## ✅ Pronto!

- **Frontend (público):** `https://diagnostico-plataforma.vercel.app`
- **Backend (API):** `https://diagnostico-backend.railway.app`

Login teste: `frangomes@claraassociados.com`

**Custo mensal:**
- Vercel: **Grátis** (hobby tier)
- Railway: **~$5** (free tier + payment after $5/mês)

---

## 📝 Próximas fases (depois de validar com cliente)

1. **Integração Google Sheets** → dados reais
2. **Google OAuth real** → login seguro
3. **Migração para PostgreSQL** → escalar
4. **Exportação PDF** → relatórios
