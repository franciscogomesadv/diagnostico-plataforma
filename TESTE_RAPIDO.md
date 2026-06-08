# 🧪 Guia Rápido de Testes

## ⚡ Start Rápido

### 1. Iniciar Backend
```bash
cd C:\Users\Cliente\Documents\Zoom\diagnostico-plataforma\backend
npm install  # se necessário
npm start
# Deve exibir: "Servidor rodando em http://localhost:5000"
```

### 2. Iniciar Frontend
```bash
cd C:\Users\Cliente\Documents\Zoom\diagnostico-plataforma\frontend
npm run dev
# Deve exibir: "Local: http://localhost:3000"
```

### 3. Acessar Platform
```
http://localhost:3000
```

---

## 📝 Cenário de Teste 1: Fluxo Completo

### Step 1: Login
- Email: `frangomes@claraassociados.com`
- Click "Entrar"
- ✅ Deve redirecionar para Dashboard

### Step 2: Dashboard
- Click em um diagnóstico existente (ex: "Diagnóstico 1")
- Ou crie um novo
- ✅ Deve entrar em FormularioPage

### Step 3: Bloco 0 (51 perguntas)
- **Seção 0.1** (Identificação)
  - Digite "Empresa Test" em "Razão social"
  - Digite "Test" em "Nome fantasia"
  - Digite "12.345.678/0001-90" em "CNPJ"
  - Selecione "LTDA" em "Natureza jurídica"
  - ✅ Cada campo deve salvar auto (console sem erros)

- **Seção 0.3** (Pessoal)
  - Digite "50" em "Nº total de pessoas"
  - ✅ Progresso deve aumentar

- **Qualquer outra seção**
  - Preencha pelo menos uma pergunta por seção
  - ✅ Status "✓ Respondido" deve aparecer

### Step 4: Botão Próximo
- Click "PRÓXIMO ▶"
- ✅ Deve ir para ModuloSelectorPage

### Step 5: Seletor de Módulos
- Veja 3 cards: Código, Regimento, Políticas
- Click no card "Código de Conduta"
- ✅ Deve entrar em ModuloCodePage

### Step 6: Módulo A (26 perguntas)
- **Seção A.1** (Identidade)
  - Preencha "Missão"
  - ✅ Auto-salva
- **Qualquer seção**
  - Preencha campo
  - Progresso deve estar >5%

### Step 7: Próximo Módulo
- Click "PRÓXIMO ▶"
- ✅ Deve ir para ModuloRegimentoPage

### Step 8: Módulo B (38 perguntas)
- **Seção B.2** (Jornada)
  - Digite "8" em "Jornada diária"
  - Selecione "Eletrônico" em "Controle de ponto"
  - ✅ Auto-salva

---

## 🎨 Cenário de Teste 2: Visual & Design

### Logo FGA
- [ ] Logo 80px visível no header
- [ ] Logo é a imagem real (não genérico SVG)
- [ ] Hover → opacidade aumenta

### Cores
- [ ] Header: branco degradando para off-white
- [ ] Cards: glassmorphic (translúcido com blur)
- [ ] Botões: Marinho (Anterior) / Âmbar (Próximo) / Cinza (Sair)

### Tipografia
- [ ] Títulos: Playfair Display (elegante)
- [ ] Corpo: Source Serif 4 (fino, 300-400)
- [ ] Botões: Inter (moderno, 500)

### Responsividade
- [ ] Desktop (1920px) — cards lado a lado
- [ ] Tablet (768px) — stack vertical
- [ ] Mobile (375px) — inputs 100% width

---

## 💾 Cenário de Teste 3: Persistência

### Antes
```
localStorage = { token: "jwt..." }
Recarrega página (F5)
```

### Depois
- [ ] Token ainda lá
- [ ] Permaneça logado
- [ ] Dados do diagnóstico ainda aparecem

### API Calls
Abra DevTools → Network → limpe e preencha um campo
- [ ] POST /api/respostas com `{diagnostico_id, pergunta_id, resposta_valor}`
- [ ] Response: 200 OK

---

## ⚠️ Testes de Erro

### Campo Obrigatório Vazio
- Click "PRÓXIMO ▶" sem preencher nada
- ✅ Deve permitir avançar (ou avisar status não respondido)

### Network Error
- Desative WiFi/internet
- Preencha campo
- ✅ Erro deve ser logado no console
- ✅ Interface não deve ficar travada

### Token Expirado
- Delete localStorage token
- Recarregue página
- ✅ Deve redirecionar para /login

---

## 📊 Checklist Técnico

- [ ] Build sem erros: `npm run build`
- [ ] Dev server sem warnings: `npm run dev`
- [ ] Backend responds: `curl http://localhost:5000`
- [ ] CORS working: requisições cross-origin OK
- [ ] Bundle size: < 200KB gzip
- [ ] Lighthouse: 90+ score

---

## 🚨 Red Flags

❌ Se ver qualquer destes, há problema:
- Erro branco no console
- Botão Próximo não funciona
- Dados não salvam (requisição POST falha)
- Logo não renderiza
- Cores muito diferentes (Tailwind não compilou)
- Mobile com scroll horizontal

---

## ✅ Sucesso Completo

Se passou em todos os testes acima:

🎉 **Plataforma Funcional!**

Próximo: Aguarde conclusão ModuloPoliticasPage, depois:
1. Deploy Vercel (frontend)
2. Deploy Railway (backend)
3. Integrar Google Sheets
4. Gerar documentos DOCX

---

**Tempo estimado de teste: 15-20 minutos**

*Última atualização: 2026-06-07*
