import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function ResponderDiagnosticoPage() {
  const { token } = useParams()
  const navigate = useNavigate()

  const [perguntas, setPerguntas] = useState([])
  const [respostas, setRespostas] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [diagnostico_id, setDiagnosticoId] = useState(null)
  const [expira_em, setExpiraEm] = useState(null)

  useEffect(() => {
    validarToken()
  }, [token])

  const validarToken = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/compartilhado/validar/${token}`
      )

      if (!response.ok) {
        if (response.status === 410) {
          setError('Este link expirou. Solicite um novo link ao responsável.')
        } else if (response.status === 404) {
          setError('Link não encontrado ou inválido.')
        } else {
          setError('Erro ao validar o link.')
        }
        setLoading(false)
        return
      }

      const data = await response.json()
      setDiagnosticoId(data.diagnostico_id)
      setPerguntas(data.perguntas)
      setExpiraEm(data.expira_em)

      // Inicializar respostas vazias
      const respostasIniciais = {}
      data.perguntas.forEach(p => {
        respostasIniciais[p.id] = ''
      })
      setRespostas(respostasIniciais)
    } catch (err) {
      setError('Erro ao conectar com servidor')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleRespostaChange = (pergunta_id, valor) => {
    setRespostas(prev => ({
      ...prev,
      [pergunta_id]: valor
    }))
  }

  const handleEnviar = async (e) => {
    e.preventDefault()
    setEnviando(true)

    try {
      // Salvar cada resposta
      for (const [pergunta_id, resposta_valor] of Object.entries(respostas)) {
        if (resposta_valor.trim()) {
          await fetch(
            `${import.meta.env.VITE_API_URL}/api/compartilhado/salvar-resposta/${token}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                pergunta_id,
                resposta_valor,
                observacoes: ''
              })
            }
          )
        }
      }

      // Também salvar via endpoint de respostas normal (para integração)
      const respostasArray = Object.entries(respostas).map(([pergunta_id, resposta_valor]) => ({
        diagnostico_id,
        pergunta_id,
        resposta_valor,
        respondente: 'Cliente via Link Compartilhado'
      }))

      await fetch(`${import.meta.env.VITE_API_URL}/api/respostas/batch/salvar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ respostas_array: respostasArray })
      })

      setEnviado(true)
    } catch (err) {
      setError('Erro ao enviar respostas')
      console.error(err)
    } finally {
      setEnviando(false)
    }
  }

  const formatarData = (data) => {
    return new Date(data).toLocaleString('pt-BR')
  }

  const agruparPorBlocoECategoria = () => {
    const grupos = {}
    perguntas.forEach(pergunta => {
      const chave = `${pergunta.bloco}-${pergunta.categoria}`
      if (!grupos[chave]) {
        grupos[chave] = { bloco: pergunta.bloco, categoria: pergunta.categoria, perguntas: [] }
      }
      grupos[chave].perguntas.push(pergunta)
    })
    return Object.values(grupos).sort((a, b) => a.bloco - b.bloco)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#FDFCFB] font-serif text-[#4a4a4a]">
        Carregando formulário...
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FDFCFB] p-4">
        <div className="bg-white bg-opacity-70 backdrop-blur-[12px] border border-[#E0DDD8] border-opacity-60 rounded-[12px] shadow-sm p-12 max-w-md w-full text-center">
          <div className="mb-6">
            <img src="/logo-fga.png" alt="Francisco Gomes Advocacia" className="w-16 h-16 object-contain mx-auto mb-6 opacity-90" />
            <h2 className="text-2xl font-serif font-[400] text-[#1B2A4A]">Francisco Gomes <span className="text-[#C9A84C]">Advocacia</span></h2>
          </div>
          <div className="bg-[#F9F0EE] border-l-2 border-[#9B5A4A] text-[#9B5A4A] px-4 py-3 rounded-[8px] text-sm font-serif">
            {error}
          </div>
          <button
            onClick={() => navigate('/')}
            className="mt-8 w-full bg-[#1B2A4A] text-white py-3 rounded-[8px] font-sans font-[500] text-xs uppercase tracking-wider hover:bg-[#0F1929] transition-all"
          >
            Voltar
          </button>
        </div>
      </div>
    )
  }

  if (enviado) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FDFCFB] p-4">
        <div className="bg-white bg-opacity-70 backdrop-blur-[12px] border border-[#E0DDD8] border-opacity-60 rounded-[12px] shadow-sm p-12 max-w-md w-full text-center">
          <div className="mb-6">
            <img src="/logo-fga.png" alt="Francisco Gomes Advocacia" className="w-16 h-16 object-contain mx-auto mb-6 opacity-90" />
            <h2 className="text-2xl font-serif font-[400] text-[#1B2A4A]">Francisco Gomes <span className="text-[#C9A84C]">Advocacia</span></h2>
          </div>
          <div className="bg-[#EEF5E9] border-l-2 border-[#6B9E5F] text-[#4A6D40] px-4 py-3 rounded-[8px] text-sm font-serif mb-6">
            ✓ Respostas enviadas com sucesso!
          </div>
          <p className="text-[#8a8a8a] font-serif font-[300] mb-6">
            Obrigado por completar o questionário. Suas respostas foram registradas.
          </p>
          <p className="text-[11px] text-[#8a8a8a] font-sans">
            Você pode fechar esta página.
          </p>
        </div>
      </div>
    )
  }

  const grupos = agruparPorBlocoECategoria()

  return (
    <div className="bg-[#FDFCFB] min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <img src="/logo-fga.png" alt="Francisco Gomes Advocacia" className="w-16 h-16 object-contain mx-auto mb-6 opacity-90" />
          <h1 className="text-3xl font-serif font-[400] text-[#1B2A4A] mb-2">
            Francisco Gomes <span className="text-[#C9A84C]">Advocacia</span>
          </h1>
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#C9A84C] font-sans font-[400] mb-6">
            Diagnóstico de Governança
          </p>
          <p className="text-sm text-[#8a8a8a] font-serif font-[300]">
            Preencha o formulário abaixo. <strong>Válido até {formatarData(expira_em)}</strong>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleEnviar} className="space-y-8">
          {grupos.map((grupo, idx) => (
            <div key={idx} className="bg-white bg-opacity-70 backdrop-blur-[12px] border border-[#E0DDD8] border-opacity-60 rounded-[12px] p-8 shadow-sm">
              <div className="mb-6 pb-4 border-b border-[#F0EDE8]">
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#C9A84C] font-sans font-[400] mb-2">
                  Bloco {grupo.bloco}
                </p>
                <h3 className="text-xl font-serif font-[400] text-[#1B2A4A]">
                  {grupo.categoria}
                </h3>
              </div>

              <div className="space-y-6">
                {grupo.perguntas.map((pergunta) => (
                  <div key={pergunta.id}>
                    <label className="block text-sm font-serif font-[400] text-[#1B2A4A] mb-3">
                      {pergunta.titulo}
                      {pergunta.obrigatoria && <span className="text-[#9B5A4A] ml-1">*</span>}
                    </label>

                    {pergunta.tipo === 'aberta' && (
                      <textarea
                        value={respostas[pergunta.id] || ''}
                        onChange={(e) => handleRespostaChange(pergunta.id, e.target.value)}
                        placeholder="Sua resposta..."
                        className="w-full px-4 py-3 border border-[#E0DDD8] rounded-[8px] bg-[#F9F8F5] focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent font-serif font-[300] resize-none"
                        rows="4"
                        required={pergunta.obrigatoria}
                      />
                    )}

                    {pergunta.tipo === 'multipla_escolha' && (
                      <div className="space-y-2">
                        {pergunta.opcoes.map((opcao, i) => (
                          <label key={i} className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name={pergunta.id}
                              value={opcao}
                              checked={respostas[pergunta.id] === opcao}
                              onChange={(e) => handleRespostaChange(pergunta.id, e.target.value)}
                              className="w-4 h-4 accent-[#C9A84C]"
                              required={pergunta.obrigatoria}
                            />
                            <span className="font-serif font-[300] text-[#4a4a4a]">{opcao}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Submit Button */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={enviando}
              className="flex-1 bg-[#1B2A4A] text-white py-3 rounded-[8px] font-sans font-[500] text-xs uppercase tracking-wider hover:bg-[#0F1929] disabled:opacity-50 transition-all shadow-sm hover:shadow-md"
            >
              {enviando ? 'Enviando...' : 'Enviar Respostas'}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-[#F0EDE8] text-center">
          <p className="text-xs text-[#8a8a8a] font-serif font-[300]">
            Francisco Gomes Advocacia © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  )
}
