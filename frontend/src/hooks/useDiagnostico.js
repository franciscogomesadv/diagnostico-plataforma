import { useState, useCallback } from 'react'

export function useDiagnostico(diagnosticoId) {
  const [diagnostico, setDiagnostico] = useState(null)
  const [respostas, setRespostas] = useState({})
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)

  const carregarDiagnostico = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/diagnosticos/${diagnosticoId}`)
      if (!response.ok) throw new Error('Falha ao carregar diagnóstico')
      const data = await response.json()
      setDiagnostico(data.diagnostico)
      setRespostas({})
    } catch (err) {
      setErro(err.message)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [diagnosticoId])

  const carregarRespostas = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/respostas/diagnostico/${diagnosticoId}`)
      if (!response.ok) throw new Error('Falha ao carregar respostas')
      const data = await response.json()
      const respostasMap = {}
      data.respostas?.forEach(r => {
        respostasMap[r.pergunta_id] = r.resposta_valor
      })
      setRespostas(respostasMap)
    } catch (err) {
      console.error(err)
    }
  }, [diagnosticoId])

  const salvarResposta = useCallback(async (perguntaId, valor) => {
    setRespostas(prev => ({ ...prev, [perguntaId]: valor }))

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/respostas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          diagnostico_id: diagnosticoId,
          pergunta_id: perguntaId,
          resposta_valor: valor,
          tipo_pergunta: 'aberta'
        })
      })
      if (!response.ok) throw new Error('Falha ao salvar resposta')
    } catch (err) {
      console.error('Erro ao salvar resposta:', err)
    }
  }, [diagnosticoId])

  return {
    diagnostico,
    respostas,
    loading,
    erro,
    carregarDiagnostico,
    carregarRespostas,
    salvarResposta
  }
}
