export function calcularProgressoBloco0(respostas) {
  // Bloco 0 tem 51 perguntas
  const totalPerguntas = 51
  const respostasPreenchidas = Object.keys(respostas).filter(
    key => respostas[key] && respostas[key].toString().trim() !== ''
  ).length

  return Math.round((respostasPreenchidas / totalPerguntas) * 100)
}

export function calcularProgressoModulo(respostas, totalPerguntas) {
  const respostasPreenchidas = Object.keys(respostas).filter(
    key => respostas[key] && respostas[key].toString().trim() !== ''
  ).length

  return Math.round((respostasPreenchidas / totalPerguntas) * 100)
}

export function calcularProgressoTotal(modulos) {
  // modulos = { bloco0: 51, codigo: 26, regimento: 38, politicas: 13 }
  const total = Object.values(modulos).reduce((a, b) => a + b, 0)
  const preenchidas = Object.entries(modulos).reduce((acc, [modulo, quantidade]) => {
    // Lógica para contar respostas preenchidas por módulo
    return acc + quantidade // Simplificado - seria feito via backend em produção
  }, 0)

  return Math.round((preenchidas / total) * 100)
}
