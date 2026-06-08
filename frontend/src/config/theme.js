export const theme = {
  colors: {
    marinho: '#1B2A4A',
    ambar: '#C9A84C',
    ambarSuave: '#E8C96A',
    texto: '#0F0F0F',
    textoMuted: '#4a4a4a',
    metadata: '#8a8a8a',
    fundoCaixa: '#F9F8F5',
    fundo: '#FDFCFB',
    separador: '#F0EDE8',
    branco: '#ffffff',
    border: '#E0DDD8'
  },

  fonts: {
    serif: "'Source Serif 4', Georgia, serif",
    display: "'Playfair Display', Georgia, serif",
    sans: "'Inter', sans-serif"
  },

  borderRadius: {
    sm: '6px',
    md: '8px',
    lg: '12px'
  },

  shadows: {
    sm: '0 2px 12px rgba(27, 42, 74, 0.04)',
    md: '0 4px 16px rgba(27, 42, 74, 0.06)',
    lg: '0 8px 24px rgba(27, 42, 74, 0.08)',
    hover: '0 8px 24px rgba(27, 42, 74, 0.08)'
  }
}

export const modulos = [
  {
    id: 'bloco-0',
    titulo: 'Bloco 0 - Core',
    descricao: 'Fundação única para os 3 documentos',
    progresso: 5,
    rota: '/diagnostico/:id',
    documentos: ['COD', 'REG', 'POL']
  },
  {
    id: 'codigo',
    titulo: 'Código de Conduta',
    descricao: 'Princípios, ética e identidade',
    perguntas: 26,
    progresso: 0,
    rota: '/diagnostico/:id/codigo',
    documentos: ['COD']
  },
  {
    id: 'regimento',
    titulo: 'Regimento Interno',
    descricao: 'Regras operacionais e disciplinares',
    perguntas: 38,
    progresso: 0,
    rota: '/diagnostico/:id/regimento',
    documentos: ['REG']
  },
  {
    id: 'politicas',
    titulo: 'Políticas Internas',
    descricao: 'Gestão de risco e processos',
    perguntas: 13,
    progresso: 0,
    rota: '/diagnostico/:id/politicas',
    documentos: ['POL']
  }
]
