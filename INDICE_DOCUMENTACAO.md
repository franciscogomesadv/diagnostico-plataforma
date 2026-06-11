# 📚 Índice Completo de Documentação

## 🎯 Para Cada Tipo de Pessoa

### 👨‍💼 **Executivo / Product Owner**
**Quer saber:** O que é e como funciona?
- Comece com: **[GUIA_VISUAL.md](GUIA_VISUAL.md)** - Diagramas visuais
- Depois: **[STATUS.md](STATUS.md)** - O que está feito
- Finalize: **[CHECKLIST.md](CHECKLIST.md)** - Próximas features

### 👨‍💻 **Desenvolvedor Novo**
**Quer entender o sistema e começar a codar**
1. **[ONBOARDING_DESENVOLVEDOR.md](ONBOARDING_DESENVOLVEDOR.md)** ← START HERE
2. **[GUIA_VISUAL.md](GUIA_VISUAL.md)** - Entender arquitetura
3. **[README.md](README.md)** - Setup local em 5 min
4. **[DOCUMENTO_MOTOR_GERACAO.md](DOCUMENTO_MOTOR_GERACAO.md)** - Entender o motor

### 🚀 **DevOps / Engenheiro de Infraestrutura**
**Quer fazer deploy e gerenciar vars**
- **[DEPLOY.md](DEPLOY.md)** - Vars de ambiente, CI/CD
- Verificar: `frontend/vercel.json` e `backend/.env.example`

### 👨‍🎨 **Designer**
**Quer entender design system e cores**
- **[GUIA_VISUAL.md](GUIA_VISUAL.md)** - Seção "Design System"
- Explorar: `frontend/src/pages/` - Ver Tailwind classes
- Referência: FGA colors (#1B2A4A, #C9A84C)

### 🧪 **QA / Tester**
**Quer saber o que testar**
- **[TESTE_RAPIDO.md](TESTE_RAPIDO.md)** - Testes manuais
- **[GUIA_VISUAL.md](GUIA_VISUAL.md)** - Seção "Pontos de Teste"

---

## 📖 Documentação por Tópico

### Sistema & Arquitetura
| Arquivo | Tamanho | Conteúdo |
|---------|--------|----------|
| **ONBOARDING_DESENVOLVEDOR.md** | 527 linhas | 🟢 LEITURA OBRIGATÓRIA - Tudo em um só lugar |
| **GUIA_VISUAL.md** | 382 linhas | Diagramas visuais (camadas, fluxos, deploy) |
| **ARQUITETURA.md** | 231 linhas | Arquitetura antiga (⚠️ parcialmente desatualizado) |
| **README.md** | 169 linhas | Quick start + endpoints |

### Motor de Geração (Core)
| Arquivo | Tamanho | Conteúdo |
|---------|--------|----------|
| **DOCUMENTO_MOTOR_GERACAO.md** | 500+ linhas | Estrutura dos 3 documentos (Código, Regimento, Políticas) |
| **backend/utils/gerador-documentos.js** | 700+ linhas | Código-fonte do motor |

### Operacional
| Arquivo | Tamanho | Conteúdo |
|---------|--------|----------|
| **DEPLOY.md** | 92 linhas | Deployment (Vercel + Render), vars de ambiente |
| **STATUS.md** | 187 linhas | O que está feito, o que falta, bugs conhecidos |
| **CHECKLIST.md** | 230 linhas | Features a implementar (roadmap) |
| **TESTE_RAPIDO.md** | 186 linhas | Testes manuais e reprodução de bugs |

---

## 🗂️ Localização Rápida

### Preciso... | Procure em...
-----------|---
Entender o sistema | `ONBOARDING_DESENVOLVEDOR.md` (tudo aqui!)
Ver diagramas | `GUIA_VISUAL.md`
Rodar localmente | `README.md` ou `ONBOARDING` seção "SETUP LOCAL"
Fazer deploy | `DEPLOY.md`
Entender o motor de geração | `DOCUMENTO_MOTOR_GERACAO.md`
Ver estrutura de código | `ONBOARDING` seção "ESTRUTURA DE PASTAS"
Testar o sistema | `TESTE_RAPIDO.md` ou `GUIA_VISUAL.md` (Test Points)
Ver endpoints | `README.md` ou `ONBOARDING` seção "ENDPOINTS"
Customizar documento | `backend/utils/gerador-documentos.js`
Adicionar novo endpoint | `ONBOARDING` seção "COMO CONTRIBUIR"
Mudar cores/design | Ver Tailwind classes em `frontend/src/pages/*.jsx`
Saber que bugs existem | `STATUS.md` (Known Issues)
Ver roadmap | `CHECKLIST.md` ou `ONBOARDING` (Roadmap)

---

## 📊 Tamanho Total da Documentação

```
ONBOARDING_DESENVOLVEDOR.md    527 linhas  ⭐ Principal
GUIA_VISUAL.md                 382 linhas
DOCUMENTO_MOTOR_GERACAO.md     500+ linhas
DEPLOY.md                       92 linhas
STATUS.md                      187 linhas
CHECKLIST.md                   230 linhas
TESTE_RAPIDO.md                186 linhas
ARQUITETURA.md                 231 linhas  (old)
README.md                      169 linhas
─────────────────────────────────────────
TOTAL                         ~2,500 linhas

+ 1,000+ linhas de código comentado
+ 700+ linhas motor gerador
─────────────────────────────────────────
TOTAL GERAL: ~4,200 linhas de docs + código
```

---

## 🎯 Fluxo Recomendado

### **Semana 1: Onboarding**
```
Day 1: Ler ONBOARDING_DESENVOLVEDOR.md (2h)
Day 2: Ler GUIA_VISUAL.md (1h)
Day 3: Setup local + testar (1h)
Day 4: Explorar código-fonte (2h)
Day 5: Tentar fazer um pequeno change (1h)
```

### **Semana 2: Profundo**
```
Day 1: Ler DOCUMENTO_MOTOR_GERACAO.md (2h)
Day 2: Estudar gerador-documentos.js (3h)
Day 3: Ler DEPLOY.md (1h)
Day 4: Ler STATUS.md + CHECKLIST.md (1h)
Day 5: Planejar primeira feature (2h)
```

---

## 💡 Dicas de Leitura

### 🟢 **Leitura Obrigatória**
- [ ] `ONBOARDING_DESENVOLVEDOR.md` - Tem TUDO
- [ ] `GUIA_VISUAL.md` - Pra entender visualmente

### 🟡 **Leitura Recomendada**
- [ ] `DOCUMENTO_MOTOR_GERACAO.md` - Se vai mexer no motor
- [ ] `DEPLOY.md` - Se vai fazer deploy

### 🔵 **Leitura Opcional**
- [ ] `STATUS.md` - Ver o que falta
- [ ] `CHECKLIST.md` - Ideias de features
- [ ] `TESTE_RAPIDO.md` - Se vai testar

### ⚪ **Referência (Consulta Rápida)**
- [ ] `README.md` - Quick start rápido
- [ ] `ARQUITETURA.md` - Visão geral (⚠️ old)

---

## 🔗 Links Internos Rápidos

**Dentro de ONBOARDING_DESENVOLVEDOR.md:**
- [O QUE É ESTE SISTEMA?](#-o-que-é-este-sistema) - Visão geral
- [ARQUITETURA DE ALTO NÍVEL](#-arquitetura-de-alto-nível) - Diagrama
- [FLUXO PRINCIPAL DE USO](#-fluxo-principal-de-uso) - 8 passos
- [AUTENTICAÇÃO](#-autenticação) - JWT mock
- [ENDPOINTS PRINCIPAIS](#-endpoints-principais) - API reference
- [SETUP LOCAL](#-setup-local-5-minutos) - Instruções
- [COMO MODIFICAR / CONTRIBUIR](#-como-modificar--contribuir) - How-to
- [DEPLOY](#-deploy) - Prod deployment
- [O MOTOR DE GERAÇÃO](#-o-motor-de-geração-core-do-sistema) - Core
- [FAQ](#-faq) - Perguntas comuns

**Dentro de GUIA_VISUAL.md:**
- [DIAGRAMA DE CAMADAS](#-diagrama-de-camadas) - 7 layers
- [FLUXO DE DADOS COMPLETO](#-fluxo-de-dados-completo) - Visual
- [ONDE CADA COISA ESTÁ](#-onde-cada-coisa-está) - File index
- [CICLO DE VIDA](#-ciclo-de-vida-de-um-diagnóstico) - Estados
- [PONTOS DE TESTE](#-pontos-de-teste-principais) - Checklist
- [DEPLOY PIPELINE](#-deploy-pipeline) - CI/CD

---

## 🚨 Erros Comuns & Soluções

### ❌ "Não entendo a arquitetura"
→ Leia `GUIA_VISUAL.md` seção "Diagrama de Camadas"

### ❌ "Não sei rodar localmente"
→ Leia `README.md` ou `ONBOARDING` seção "SETUP LOCAL"

### ❌ "Não sei como o motor funciona"
→ Leia `DOCUMENTO_MOTOR_GERACAO.md` + `backend/utils/gerador-documentos.js`

### ❌ "Não consigo fazer deploy"
→ Leia `DEPLOY.md`

### ❌ "Quero adicionar um novo endpoint"
→ Leia `ONBOARDING` seção "COMO MODIFICAR"

### ❌ "Não sei o que testar"
→ Leia `GUIA_VISUAL.md` seção "PONTOS DE TESTE"

---

## 📞 Quando Procurar Documentação vs. Código

| Situação | Procure em |
|----------|-----------|
| Entender visão geral | `ONBOARDING_DESENVOLVEDOR.md` |
| Ver diagramas | `GUIA_VISUAL.md` |
| Entender um endpoint específico | `README.md` |
| Customizar documento | `backend/utils/gerador-documentos.js` |
| Adicionar nova página | `frontend/src/pages/` (exemplo) |
| Entender fluxo de dados | `GUIA_VISUAL.md` |
| Saber vars de ambiente | `DEPLOY.md` |
| Testar feature | `TESTE_RAPIDO.md` |

---

## 🎯 Próxima Leitura?

**Se você é:**
- 👨‍💼 **Executivo**: Leia `GUIA_VISUAL.md` (15 min) → `STATUS.md` (10 min)
- 👨‍💻 **Dev novo**: Leia `ONBOARDING_DESENVOLVEDOR.md` (45 min) → `GUIA_VISUAL.md` (15 min) → Setup local (5 min)
- 🚀 **DevOps**: Leia `DEPLOY.md` (10 min) → Configurar Vercel + Render
- 🧪 **QA**: Leia `TESTE_RAPIDO.md` (10 min) → Testar sistema

---

**Última atualização:** 10 de junho de 2026

**Status:** ✅ Documentação completa e integrada

**Próximo:** Versão 2.0 da documentação = integração com banco de dados real
