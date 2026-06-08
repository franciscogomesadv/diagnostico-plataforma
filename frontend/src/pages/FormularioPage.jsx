import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import questoesData from '../data/questoes.json'

const LogoFGA = () => (
  <img
    src="/logo-fga.png"
    alt="Francisco Gomes Advocacia"
    className="w-20 h-20 object-contain"
  />
)

const Secao = ({ titulo, numero }) => (
  <div className="mt-10 mb-6 pt-6 border-t border-[#F0EDE8]">
    <h2 className="text-xl font-serif font-[400] text-[#1B2A4A]">{numero} — {titulo}</h2>
  </div>
)

const PerguntaAberta = ({ id, titulo, descricao, placeholder, valor, onChange, respondida }) => (
  <div className="border-l-4 border-[#1B2A4A] pl-4 mb-6">
    <h3 className="font-serif font-[400] text-lg text-[#1B2A4A]">[{id}] {titulo}</h3>
    {descricao && <p className="text-sm text-[#4a4a4a] mb-3 mt-1">{descricao}</p>}
    <input
      type="text"
      value={valor || ''}
      onChange={(e) => onChange(id, e.target.value)}
      placeholder={placeholder || ''}
      className="w-full px-4 py-2 border border-[#E0DDD8] rounded-[8px] mt-2 bg-[#F9F8F5] focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent font-serif font-[300]"
    />
    <p className="text-xs text-[#8a8a8a] mt-1">{respondida ? '✓ Respondido' : '⊘ Não respondido'}</p>
  </div>
)

const PerguntaNumero = ({ id, titulo, descricao, valor, onChange, respondida }) => (
  <div className="border-l-4 border-[#1B2A4A] pl-4 mb-6">
    <h3 className="font-serif font-[400] text-lg text-[#1B2A4A]">[{id}] {titulo}</h3>
    {descricao && <p className="text-sm text-[#4a4a4a] mb-3 mt-1">{descricao}</p>}
    <input
      type="number"
      value={valor || ''}
      onChange={(e) => onChange(id, e.target.value)}
      placeholder=""
      className="w-full px-4 py-2 border border-[#E0DDD8] rounded-[8px] mt-2 bg-[#F9F8F5] focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent font-serif font-[300]"
    />
    <p className="text-xs text-[#8a8a8a] mt-1">{respondida ? '✓ Respondido' : '⊘ Não respondido'}</p>
  </div>
)

const PerguntaRadio = ({ id, titulo, descricao, opcoes, valor, onChange, respondida }) => (
  <div className="border-l-4 border-[#1B2A4A] pl-4 mb-6">
    <h3 className="font-serif font-[400] text-lg text-[#1B2A4A]">[{id}] {titulo}</h3>
    {descricao && <p className="text-sm text-[#4a4a4a] mb-3 mt-1">{descricao}</p>}
    <div className="space-y-2 mt-3">
      {opcoes.map(opt => (
        <label key={opt} className="flex items-center cursor-pointer">
          <input
            type="radio"
            name={id}
            value={opt}
            checked={valor === opt}
            onChange={(e) => onChange(id, e.target.value)}
            className="w-4 h-4 accent-[#C9A84C]"
          />
          <span className="ml-2 text-[#1B2A4A] font-serif font-[300]">{opt}</span>
        </label>
      ))}
    </div>
    <p className="text-xs text-[#8a8a8a] mt-1">{respondida ? '✓ Respondido' : '⊘ Não respondido'}</p>
  </div>
)

const PerguntaEscolha = ({ id, titulo, descricao, opcoes, valor, onChange, respondida }) => (
  <div className="border-l-4 border-[#1B2A4A] pl-4 mb-6">
    <h3 className="font-serif font-[400] text-lg text-[#1B2A4A]">[{id}] {titulo}</h3>
    {descricao && <p className="text-sm text-[#4a4a4a] mb-3 mt-1">{descricao}</p>}
    <select
      value={valor || ''}
      onChange={(e) => onChange(id, e.target.value)}
      className="w-full px-4 py-2 border border-[#E0DDD8] rounded-[8px] mt-2 bg-[#F9F8F5] focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent font-serif font-[300]"
    >
      <option value="">Selecione...</option>
      {opcoes.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    <p className="text-xs text-[#8a8a8a] mt-1">{respondida ? '✓ Respondido' : '⊘ Não respondido'}</p>
  </div>
)

const PerguntaMultipla = ({ id, titulo, descricao, opcoes, valor, onChange, respondida }) => (
  <div className="border-l-4 border-[#1B2A4A] pl-4 mb-6">
    <h3 className="font-serif font-[400] text-lg text-[#1B2A4A]">[{id}] {titulo}</h3>
    {descricao && <p className="text-sm text-[#4a4a4a] mb-3 mt-1">{descricao}</p>}
    <div className="space-y-2 mt-3">
      {(opcoes || []).map(opt => (
        <label key={opt} className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            value={opt}
            checked={(valor || []).includes(opt)}
            onChange={(e) => {
              const novoValor = (valor || []).includes(opt)
                ? (valor || []).filter(v => v !== opt)
                : [...(valor || []), opt]
              onChange(id, novoValor)
            }}
            className="w-4 h-4 accent-[#C9A84C]"
          />
          <span className="ml-2 text-[#1B2A4A] font-serif font-[300]">{opt}</span>
        </label>
      ))}
    </div>
    <p className="text-xs text-[#8a8a8a] mt-1">{respondida ? '✓ Respondido' : '⊘ Não respondido'}</p>
  </div>
)

const PerguntaData = ({ id, titulo, descricao, valor, onChange, respondida }) => (
  <div className="border-l-4 border-[#1B2A4A] pl-4 mb-6">
    <h3 className="font-serif font-[400] text-lg text-[#1B2A4A]">[{id}] {titulo}</h3>
    {descricao && <p className="text-sm text-[#4a4a4a] mb-3 mt-1">{descricao}</p>}
    <input
      type="date"
      value={valor || ''}
      onChange={(e) => onChange(id, e.target.value)}
      className="w-full px-4 py-2 border border-[#E0DDD8] rounded-[8px] mt-2 bg-[#F9F8F5] focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent font-serif font-[300]"
    />
    <p className="text-xs text-[#8a8a8a] mt-1">{respondida ? '✓ Respondido' : '⊘ Não respondido'}</p>
  </div>
)

const PerguntaMatriz = ({ id, titulo, descricao, linhas, valor, onChange, respondida }) => (
  <div className="border-l-4 border-[#1B2A4A] pl-4 mb-6">
    <h3 className="font-serif font-[400] text-lg text-[#1B2A4A]">[{id}] {titulo}</h3>
    {descricao && <p className="text-sm text-[#4a4a4a] mb-3 mt-1">{descricao}</p>}
    <div className="overflow-x-auto mt-3">
      <table className="w-full border-collapse">
        <tbody>
          {linhas.map(linha => (
            <tr key={linha}>
              <td className="border border-[#E0DDD8] px-4 py-3 bg-[#F9F8F5] font-serif font-[300] text-[#1B2A4A]">{linha}</td>
              <td className="border border-[#E0DDD8] px-4 py-3">
                <input
                  type="number"
                  min="0"
                  value={(valor && valor[linha]) || ''}
                  onChange={(e) => onChange(id, { ...(valor || {}), [linha]: e.target.value })}
                  placeholder="0"
                  className="w-full px-2 py-1 border border-[#E0DDD8] rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A84C] font-serif font-[300]"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-xs text-[#8a8a8a] mt-1">{respondida ? '✓ Respondido' : '⊘ Não respondido'}</p>
  </div>
)

const PerguntaEscala = ({ id, titulo, descricao, escala, valor, onChange, respondida }) => (
  <div className="border-l-4 border-[#1B2A4A] pl-4 mb-6">
    <h3 className="font-serif font-[400] text-lg text-[#1B2A4A]">[{id}] {titulo}</h3>
    {descricao && <p className="text-sm text-[#4a4a4a] mb-3 mt-1">{descricao}</p>}
    <div className="flex gap-2 mt-3">
      {escala.map(val => (
        <button
          key={val}
          onClick={() => onChange(id, val)}
          className={`w-10 h-10 rounded-[6px] font-serif font-[400] transition-all ${
            valor === val
              ? 'bg-[#C9A84C] text-white'
              : 'bg-[#F9F8F5] text-[#1B2A4A] border border-[#E0DDD8] hover:border-[#C9A84C]'
          }`}
        >
          {val}
        </button>
      ))}
    </div>
    <p className="text-xs text-[#8a8a8a] mt-1">{respondida ? '✓ Respondido' : '⊘ Não respondido'}</p>
  </div>
)

export default function FormularioPage() {
  const { diagnosticoId } = useParams()
  const [diagnostico, setDiagnostico] = useState(null)
  const [respostas, setRespostas] = useState({})
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const secoes = questoesData.bloco_0.secoes

  useEffect(() => {
    carregarDiagnostico()
  }, [diagnosticoId])

  const carregarDiagnostico = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/diagnosticos/${diagnosticoId}`)
      const data = await response.json()
      setDiagnostico(data.diagnostico)
      setRespostas({})
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSalvarResposta = async (perguntaId, valor) => {
    setRespostas(prev => ({ ...prev, [perguntaId]: valor }))

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/respostas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          diagnostico_id: diagnosticoId,
          pergunta_id: perguntaId,
          resposta_valor: Array.isArray(valor) ? JSON.stringify(valor) : valor,
          tipo_pergunta: 'aberta'
        })
      })
    } catch (err) {
      console.error(err)
    }
  }

  const renderPergunta = (pergunta) => {
    const { id, titulo, descricao, tipo, placeholder, opcoes, linhas, escala } = pergunta
    const valor = respostas[id]
    const respondida = valor !== undefined && valor !== null && valor !== '' && (Array.isArray(valor) ? valor.length > 0 : true)

    switch (tipo) {
      case 'aberta':
        return (
          <PerguntaAberta
            key={id}
            id={id}
            titulo={titulo}
            descricao={descricao}
            placeholder={placeholder}
            valor={valor}
            onChange={handleSalvarResposta}
            respondida={respondida}
          />
        )
      case 'numero':
        return (
          <PerguntaNumero
            key={id}
            id={id}
            titulo={titulo}
            descricao={descricao}
            valor={valor}
            onChange={handleSalvarResposta}
            respondida={respondida}
          />
        )
      case 'escolha':
        return (
          <PerguntaEscolha
            key={id}
            id={id}
            titulo={titulo}
            descricao={descricao}
            opcoes={opcoes}
            valor={valor}
            onChange={handleSalvarResposta}
            respondida={respondida}
          />
        )
      case 'sim_nao':
        return (
          <PerguntaRadio
            key={id}
            id={id}
            titulo={titulo}
            descricao={descricao}
            opcoes={['Sim', 'Não']}
            valor={valor}
            onChange={handleSalvarResposta}
            respondida={respondida}
          />
        )
      case 'multipla':
        return (
          <PerguntaMultipla
            key={id}
            id={id}
            titulo={titulo}
            descricao={descricao}
            opcoes={opcoes}
            valor={valor}
            onChange={handleSalvarResposta}
            respondida={respondida}
          />
        )
      case 'data':
        return (
          <PerguntaData
            key={id}
            id={id}
            titulo={titulo}
            descricao={descricao}
            valor={valor}
            onChange={handleSalvarResposta}
            respondida={respondida}
          />
        )
      case 'matriz':
        return (
          <PerguntaMatriz
            key={id}
            id={id}
            titulo={titulo}
            descricao={descricao}
            linhas={linhas}
            valor={valor}
            onChange={handleSalvarResposta}
            respondida={respondida}
          />
        )
      case 'escala':
        return (
          <PerguntaEscala
            key={id}
            id={id}
            titulo={titulo}
            descricao={descricao}
            escala={escala}
            valor={valor}
            onChange={handleSalvarResposta}
            respondida={respondida}
          />
        )
      default:
        return null
    }
  }

  if (loading) return <div className="flex justify-center items-center min-h-screen font-serif text-[#4a4a4a]">Carregando...</div>

  const totalPerguntas = secoes.reduce((sum, s) => sum + s.perguntas.length, 0)
  const respondidas = Object.keys(respostas).filter(key => {
    const valor = respostas[key]
    return valor !== undefined && valor !== null && valor !== '' && (Array.isArray(valor) ? valor.length > 0 : true)
  }).length
  const progresso = totalPerguntas > 0 ? Math.round((respondidas / totalPerguntas) * 100) : 0

  return (
    <div className="bg-[#FDFCFB] min-h-screen">
      {/* HEADER */}
      <header className="bg-gradient-to-b from-white to-[#F9F8F5] py-16 border-b border-[#F0EDE8]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="opacity-80 hover:opacity-100 transition-opacity mb-8 flex justify-center">
            <LogoFGA />
          </div>
          <h1 className="text-4xl font-serif font-[400] text-[#1B2A4A]">Francisco Gomes</h1>
          <p className="text-xs uppercase tracking-widest text-[#8a8a8a] mt-3 font-sans font-[300]">Advocacia • OAB/SP 363.517</p>
        </div>
      </header>

      {/* CONTAINER */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* PROGRESS CARD */}
        <div className="bg-white bg-opacity-70 backdrop-blur-[12px] border border-[#E0DDD8] border-opacity-60 rounded-[12px] p-8 mb-10 shadow-sm hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-serif font-[400] text-[#1B2A4A]">Questionário - Bloco 0</h2>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-transparent text-[#1B2A4A] text-sm uppercase font-sans font-[400] tracking-wider border border-[#F0EDE8] rounded-[8px] hover:bg-[#F9F8F5] transition-all"
            >
              ← Voltar
            </button>
          </div>

          <div className="mb-4">
            <div className="w-full h-2 bg-[#F0EDE8] rounded-full overflow-hidden">
              <div className="h-full bg-[#C9A84C] transition-all" style={{ width: `${progresso}%` }}></div>
            </div>
          </div>
          <p className="text-xs text-[#8a8a8a] font-serif">Progresso: {progresso}% ({respondidas}/{totalPerguntas} perguntas)</p>
        </div>

        {/* PERGUNTAS */}
        <div className="bg-white bg-opacity-70 backdrop-blur-[12px] border border-[#E0DDD8] border-opacity-60 rounded-[12px] p-8 shadow-sm">
          {secoes.map(secao => (
            <div key={secao.numero}>
              <Secao titulo={secao.titulo} numero={secao.numero} />
              {secao.perguntas.map(pergunta => renderPergunta(pergunta))}
            </div>
          ))}
        </div>

        {/* BOTÕES */}
        <div className="mt-10 flex gap-4 mb-10">
          <button
            onClick={() => navigate('/')}
            className="flex-1 px-4 py-3 bg-[#1B2A4A] text-white rounded-[8px] font-sans font-[500] uppercase text-sm tracking-wider hover:bg-[#0F1929] transition-all"
          >
            ◀ ANTERIOR
          </button>
          <button
            onClick={() => navigate(`/diagnostico/${diagnosticoId}/seletor`)}
            className="flex-1 px-4 py-3 bg-[#C9A84C] text-white rounded-[8px] font-sans font-[500] uppercase text-sm tracking-wider hover:bg-[#B8971F] transition-all"
          >
            PRÓXIMO ▶
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 px-4 py-3 bg-[#F0EDE8] text-[#1B2A4A] rounded-[8px] font-sans font-[500] uppercase text-sm tracking-wider hover:bg-[#E0DDD8] transition-all"
          >
            SALVAR & SAIR
          </button>
        </div>
      </div>
    </div>
  )
}
