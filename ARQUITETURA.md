# Arquitetura - Plataforma de Diagnóstico de Governança

## 📊 Visão Geral

Plataforma para geração de 3 documentos de governança corporativa:
1. **Código de Conduta** (26 perguntas)
2. **Regimento Interno** (38 perguntas)  
3. **Políticas Internas** (13+ perguntas)

Baseado em **Bloco 0 compartilhado** (51 perguntas) que alimenta todos 3 documentos.

---

## 🏗️ Estrutura de Arquivos

```
frontend/src/
├── pages/
│   ├── LoginPage.jsx              # Login (email mock)
│   ├── DashboardPage.jsx          # Lista clientes + diagnosticos
│   ├── FormularioPage.jsx         # Bloco 0 (51 perguntas) ✓
│   ├── ModuloCodePage.jsx         # Módulo A (26 perguntas) ✓
│   ├── ModuloRegimentoPage.jsx    # Módulo B (38 perguntas) 🔄
│   ├── ModuloPoliticasPage.jsx    # Módulo C (13+ perguntas) 🔄
│   ├── ModuloSelectorPage.jsx     # Seletor de módulos
│   ├── RelatorioPage.jsx          # Dashboard de resultados
│
├── components/
│   ├── Header.jsx                 # Logo + user menu
│   ├── QuestionarioHeader.jsx     # Header reutilizável
│   ├── ProgressoCard.jsx          # Barra progresso
│   ├── BotoesNavegacao.jsx        # Botões padronizados
│   ├── ContainerPrincipal.jsx     # Containers reutilizáveis
│   ├── SelectorModulos.jsx        # Card de seleção de módulos
│
├── hooks/
│   ├── useDiagnostico.js          # Hook para carregar/salvar diagnóstico
│
├── data/
│   ├── questoes.json              # 51 perguntas Bloco 0
│   ├── modulos.json               # Estrutura A, B, C
│
├── config/
│   ├── theme.js                   # Cores, fonts, constants
│
├── utils/
│   ├── calcularProgresso.js       # Funções de cálculo
│
├── App.jsx                         # Rotas
└── main.jsx
```

---

## 🔄 Fluxo de Navegação

```
Login
  ↓
Dashboard (escolhe cliente + diagnóstico)
  ↓
FormularioPage - Bloco 0 (51 perguntas)
  ↓
ModuloSelectorPage (escolhe qual documento criar)
  ├→ ModuloCodePage (26q)
  ├→ ModuloRegimentoPage (38q)
  └→ ModuloPoliticasPage (13+q)
  ↓
RelatorioPage (consolida respostas)
```

---

## 📋 Estrutura de Perguntas

### Bloco 0 (Core - 51q)
- **0.1** Identificação jurídica (8q)
- **0.2** Atividade econômica (7q)
- **0.3** Dimensão/pessoal (8q)
- **0.4** Marco legal (6q)
- **0.5** Maturidade documental (8q)
- **0.6** Cultura/liderança (8q)
- **0.7** Histórico/risco (6q)

### Módulo A - Código (26q)
- **A.1** Identidade (3q)
- **A.2** Stakeholders (3q)
- **A.3** Compromissos (6q)
- **A.4** Temas éticos (6q)
- **A.5** Governança (5q)
- **A.6** Ciclo de vida (3q)

### Módulo B - Regimento (38q)
- **B.1** Admissão (3q)
- **B.2** Jornada (8q)
- **B.3** Direitos/deveres (4q)
- **B.4** Ausências (4q)
- **B.5** Ativos/segurança (5q)
- **B.6** SST (5q)
- **B.7** Regime disciplinar (3q)
- **B.8** Módulos específicos (3q)
- **B.9** Encerramento (3q)

### Módulo C - Políticas (13+q)
- **C.1** Mapeamento de risco (4q)
- **C.2** Universal por política (10q/política)

---

## 🎨 Design System

**Cores FGA:**
- Marinho: `#1B2A4A` (headers, botões primários)
- Âmbar: `#C9A84C` (accents, botão próximo)
- Cinza claro: `#F0EDE8` (borders, botão sair)
- Fundo: `#FDFCFB` (off-white)

**Tipografia:**
- Display: Playfair Display 400-500 (headers)
- Body: Source Serif 4 300-400 (texto principal)
- UI: Inter 300-400 (botões, labels)

**Espaçamento:**
- Border radius: 8-12px (sem cantos retos)
- Shadows: 0 2px 12px até 0 8px 24px (sutis)
- Backdrop filter: blur(12px) + rgba opacity (glassmorphism)

---

## 💾 Tipos de Pergunta

| Tipo | Componente | Exemplo |
|---|---|---|
| Aberta | PerguntaAberta | Razão social |
| Número | PerguntaNumero | Headcount |
| Data | PerguntaData | Data constituição |
| Sim/Não | PerguntaRadio | Tem filiais? |
| Escolha | PerguntaEscolha | Porte (dropdown) |
| Múltipla | PerguntaMultipla | Setores (checkboxes) |
| Matriz | PerguntaMatriz | Quebra por vínculo |
| Escala | PerguntaEscala | Comunicação ética (1-5) |

---

## 🔐 Autenticação

- Token JWT no localStorage
- Email mock: `frangomes@claraassociados.com`
- Todas as rotas de formulário exigem autenticação

---

## 📡 API Backend

**Endpoints utilizados:**

```
POST   /api/auth/login                     # Gera token
POST   /api/auth/verify                    # Valida token
GET    /api/diagnosticos/:id               # Carrega diagnóstico
POST   /api/diagnosticos                   # Cria novo
GET    /api/respostas/diagnostico/:id      # Carrega respostas
POST   /api/respostas                      # Salva resposta individual
POST   /api/respostas/batch/salvar         # Salva múltiplas
```

---

## 🚀 Próximos Passos

1. ✅ FormularioPage (Bloco 0) - Completo
2. ✅ ModuloCodePage - Completo
3. 🔄 ModuloRegimentoPage - Em progresso
4. 🔄 ModuloPoliticasPage - Em progresso
5. ⏳ Integração com Google Sheets API
6. ⏳ Exportação MD + DOCX
7. ⏳ Dashboard de Relatórios

---

## 🎯 Padrões de Código

### Hook Custom
```jsx
const { diagnostico, respostas, loading, salvarResposta } = useDiagnostico(id)
```

### Componente Página
```jsx
export default function ModuloPage() {
  return (
    <ContainerPrincipal>
      <QuestionarioHeader título="..." />
      <ContainerCenter>
        <ProgressoCard progresso={50} />
        <ConteudoCard>
          {/* Perguntas */}
        </ConteudoCard>
        <BotoesNavegacao />
      </ContainerCenter>
    </ContainerPrincipal>
  )
}
```

### Salvar Resposta
```jsx
const handleSalvarResposta = async (perguntaId, valor) => {
  setRespostas(prev => ({ ...prev, [perguntaId]: valor }))
  await salvarResposta(perguntaId, valor)
}
```

---

## 📝 Status

| Item | Status |
|---|---|
| FormularioPage (51q) | ✅ Completo |
| ModuloCodePage (26q) | ✅ Completo |
| ModuloRegimentoPage (38q) | 🔄 Em progresso |
| ModuloPoliticasPage (13+q) | 🔄 Em progresso |
| App.jsx rotas | ✅ Atualizado |
| Componentes reutilizáveis | ✅ Criados |
| Theme/Design | ✅ Definido |
| Hooks | ✅ Criados |

---

*Última atualização: 2026-06-07*
