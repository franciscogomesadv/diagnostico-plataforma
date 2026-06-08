import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ProgressoCard from '../components/ProgressoCard'

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
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-[#E0DDD8] rounded-[8px] mt-2 bg-[#F9F8F5] focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent font-serif font-[300]"
    />
    <p className="text-xs text-[#8a8a8a] mt-1">{respondida ? '✓ Respondido' : '⊘ Não respondido'}</p>
  </div>
)

const PerguntaRadio = ({ id, titulo, descricao, opcoes, valor, onChange }) => (
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

const MatrizImpactoProb = ({ valor, onChange }) => (
  <div className="border-l-4 border-[#1B2A4A] pl-4 mb-6">
    <h3 className="font-serif font-[400] text-lg text-[#1B2A4A]">[C.1.2] Matriz Impacto × Probabilidade</h3>
    <p className="text-sm text-[#4a4a4a] mb-3 mt-1">Classifique cada risco na matriz abaixo</p>

    <div className="overflow-x-auto mt-4">
      <table className="w-full border border-[#E0DDD8]">
        <thead>
          <tr className="bg-[#F9F8F5]">
            <th className="border border-[#E0DDD8] px-4 py-2 text-left font-serif text-sm text-[#1B2A4A]">Risco</th>
            <th className="border border-[#E0DDD8] px-4 py-2 text-center font-serif text-sm text-[#1B2A4A]">Baixa</th>
            <th className="border border-[#E0DDD8] px-4 py-2 text-center font-serif text-sm text-[#1B2A4A]">Média</th>
            <th className="border border-[#E0DDD8] px-4 py-2 text-center font-serif text-sm text-[#1B2A4A]">Alta</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map(i => (
            <tr key={i}>
              <td className="border border-[#E0DDD8] px-4 py-2 font-serif text-sm text-[#4a4a4a]">Risco {i}</td>
              {['Baixa', 'Média', 'Alta'].map(nivel => (
                <td key={nivel} className="border border-[#E0DDD8] px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#C9A84C]"
                    onChange={(e) => {
                      const newMatriz = { ...valor, [`risco_${i}_${nivel.toLowerCase()}`]: e.target.checked }
                      onChange(newMatriz)
                    }}
                    checked={valor?.[`risco_${i}_${nivel.toLowerCase()}`] || false}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-xs text-[#8a8a8a] mt-2">Deixe vazio para auto-preenchimento automático</p>
  </div>
)

const SelectorPoliticas = ({ politicas, selecionadas, onChange }) => (
  <div className="border-l-4 border-[#1B2A4A] pl-4 mb-6">
    <h3 className="font-serif font-[400] text-lg text-[#1B2A4A]">[C.1.4] Selecione Políticas a Criar</h3>
    <p className="text-sm text-[#4a4a4a] mb-3 mt-1">Escolha quais políticas serão abrangidas no diagnóstico</p>

    <div className="grid grid-cols-2 gap-3 mt-4">
      {politicas.map(pol => (
        <label key={pol} className="flex items-start cursor-pointer p-3 border border-[#E0DDD8] rounded-[8px] hover:bg-[#F9F8F5] transition-colors">
          <input
            type="checkbox"
            checked={selecionadas.includes(pol)}
            onChange={(e) => {
              if (e.target.checked) {
                onChange([...selecionadas, pol])
              } else {
                onChange(selecionadas.filter(p => p !== pol))
              }
            }}
            className="w-4 h-4 mt-0.5 accent-[#C9A84C] flex-shrink-0"
          />
          <span className="ml-2 text-[#1B2A4A] font-serif font-[300] text-sm">{pol}</span>
        </label>
      ))}
    </div>
  </div>
)

const FormPoliticaUniversal = ({ politica, respostas, onAlterar, onRemover }) => {
  const campos = [
    { id: 'objetivo', titulo: 'Objetivo', descricao: 'Qual é o objetivo desta política?' },
    { id: 'abrangencia', titulo: 'Abrangência', descricao: 'Quem está abrangido? (tipos de colaborador)' },
    { id: 'definicoes', titulo: 'Definições', descricao: 'Conceitos-chave desta política' },
    { id: 'procedimentos', titulo: 'Procedimentos', descricao: 'Passos para seguir/implementar' },
    { id: 'fazer', titulo: 'O que fazer', descricao: 'Comportamentos esperados (do)' },
    { id: 'nao_fazer', titulo: 'O que NÃO fazer', descricao: 'Comportamentos proibidos (don\'t)' },
    { id: 'responsaveis', titulo: 'Responsáveis', descricao: 'Quem é responsável pela implementação?' },
    { id: 'consequencia', titulo: 'Consequências', descricao: 'Qual é a consequência do descumprimento?' },
    { id: 'base_legal', titulo: 'Base legal', descricao: 'Legislação aplicável' },
    { id: 'kpis', titulo: 'KPIs', descricao: 'Indicadores de cumprimento' },
    { id: 'vigencia', titulo: 'Vigência', descricao: 'Data de vigência e revisão prevista' }
  ]

  return (
    <div className="border border-[#E0DDD8] rounded-[12px] p-6 mb-6 bg-[#FDFCFB]">
      <div className="flex justify-between items-start mb-6">
        <h4 className="text-lg font-serif font-[400] text-[#1B2A4A]">{politica}</h4>
        <button
          onClick={() => onRemover(politica)}
          className="text-sm px-3 py-1 bg-transparent text-[#C9A84C] border border-[#C9A84C] rounded-[6px] hover:bg-[#C9A84C] hover:text-white transition-all"
        >
          Remover
        </button>
      </div>

      {campos.map((campo, idx) => (
        <PerguntaAberta
          key={campo.id}
          id={`${politica}_${campo.id}`}
          titulo={`C.2.${idx + 1} ${campo.titulo}`}
          descricao={campo.descricao}
          placeholder=""
          valor={respostas[`${politica}_${campo.id}`] || ''}
          onChange={(id, valor) => onAlterar(politica, campo.id, valor)}
          respondida={!!respostas[`${politica}_${campo.id}`]}
        />
      ))}
    </div>
  )
}

export default function ModuloPoliticasPage() {
  const { diagnosticoId } = useParams()
  const navigate = useNavigate()
  const [respostas, setRespostas] = useState({})
  const [loading, setLoading] = useState(true)
  const [etapa, setEtapa] = useState('C1') // 'C1' ou 'C2'
  const [politicasSelecionadas, setPoliticasSelecionadas] = useState([])
  const [riscosListados, setRiscosListados] = useState('')
  const [matrizRisco, setMatrizRisco] = useState({})

  const catalogoPoliticas = [
    'LGPD',
    'Assédio',
    'Home Office',
    'TI/Segurança',
    'Brindes',
    'Anticorrupção',
    'Conflito Interesse',
    'Reembolso',
    'SST',
    'Diversidade',
    'Canal Denúncias',
    'Viagens'
  ]

  useEffect(() => {
    carregarDados()
  }, [diagnosticoId])

  const carregarDados = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/diagnosticos/${diagnosticoId}/modulo-politicas`)
      const data = await response.json()
      if (data.respostas) {
        setRespostas(data.respostas)
        setRiscosListados(data.respostas['C.1.1'] || '')
        setMatrizRisco(data.respostas['C.1.2'] || {})
        setPoliticasSelecionadas(data.respostas['C.1.4'] ? data.respostas['C.1.4'].split(',') : [])
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const salvarResposta = async (perguntaId, valor) => {
    const novasRespostas = { ...respostas, [perguntaId]: valor }
    setRespostas(novasRespostas)

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/respostas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          diagnostico_id: diagnosticoId,
          pergunta_id: perguntaId,
          resposta_valor: valor,
          tipo_pergunta: 'modulo_politicas'
        })
      })
    } catch (err) {
      console.error(err)
    }
  }

  const handleAlterarRisco = (valor) => {
    setRiscosListados(valor)
    salvarResposta('C.1.1', valor)
  }

  const handleAlterarMatriz = (novaMatriz) => {
    setMatrizRisco(novaMatriz)
    salvarResposta('C.1.2', JSON.stringify(novaMatriz))
  }

  const handleSelecionarPoliticas = (politicas) => {
    setPoliticasSelecionadas(politicas)
    salvarResposta('C.1.4', politicas.join(','))
  }

  const handleAlterarPolitica = (politica, campo, valor) => {
    const key = `${politica}_${campo}`
    salvarResposta(key, valor)
  }

  const handleRemoverPolitica = (politica) => {
    const novasSelecionadas = politicasSelecionadas.filter(p => p !== politica)
    handleSelecionarPoliticas(novasSelecionadas)
    // Limpar respostas da política removida
    const novasRespostas = { ...respostas }
    Object.keys(novasRespostas).forEach(key => {
      if (key.startsWith(`${politica}_`)) {
        delete novasRespostas[key]
      }
    })
    setRespostas(novasRespostas)
  }

  const prosseguirParaC2 = () => {
    if (riscosListados.trim() === '' || politicasSelecionadas.length === 0) {
      alert('Por favor, preencha todos os campos obrigatórios da seção C.1')
      return
    }
    setEtapa('C2')
  }

  const voltarParaC1 = () => {
    setEtapa('C1')
  }

  const finalizarModulo = async () => {
    const totalPoliticas = politicasSelecionadas.length
    let respuestasPreenchidas = 0

    politicasSelecionadas.forEach(politica => {
      const camposUniversais = ['objetivo', 'abrangencia', 'definicoes', 'procedimentos', 'fazer', 'nao_fazer', 'responsaveis', 'consequencia', 'base_legal', 'kpis', 'vigencia']
      camposUniversais.forEach(campo => {
        if (respostas[`${politica}_${campo}`]) {
          respuestasPreenchidas++
        }
      })
    })

    const progresoC2 = totalPoliticas > 0 ? Math.round((respuestasPreenchidas / (totalPoliticas * 11)) * 100) : 0

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/diagnosticos/${diagnosticoId}/progresso`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modulo: 'politicas',
          progresso: 60 + progresoC2 * 0.4
        })
      })
    } catch (err) {
      console.error(err)
    }

    navigate(`/relatorio/${diagnosticoId}`)
  }

  if (loading) return <div className="flex justify-center items-center min-h-screen font-serif text-[#4a4a4a]">Carregando...</div>

  const progresso = etapa === 'C1' ? 30 : 60

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
        <ProgressoCard
          titulo={`Módulo C - Políticas Internas${etapa === 'C1' ? ' (Mapeamento de Risco)' : ' (Formulários Universais)'}`}
          progresso={progresso}
          diagnosticoId={diagnosticoId}
        />

        {/* CONTEÚDO */}
        <div className="bg-white bg-opacity-70 backdrop-blur-[12px] border border-[#E0DDD8] border-opacity-60 rounded-[12px] p-8 shadow-sm">

          {etapa === 'C1' ? (
            <>
              {/* SEÇÃO C.1: MAPEAMENTO DE RISCO */}
              <Secao titulo="Mapeamento de Risco" numero="C.1" />

              <PerguntaAberta
                id="C.1.1"
                titulo="Liste riscos detectados"
                descricao="Com base no Bloco 0.7, liste os riscos críticos para Políticas Internas (herda respostas de 0.7.6)"
                placeholder="Ex: Risco 1, Risco 2, Risco 3..."
                valor={riscosListados}
                onChange={handleAlterarRisco}
                respondida={!!riscosListados}
              />

              <MatrizImpactoProb
                valor={matrizRisco}
                onChange={handleAlterarMatriz}
              />

              <div className="border-l-4 border-[#1B2A4A] pl-4 mb-6">
                <h3 className="font-serif font-[400] text-lg text-[#1B2A4A]">[C.1.3] Ranquemento Automático</h3>
                <p className="text-sm text-[#4a4a4a] mb-3 mt-1">Sistema identifica automaticamente políticas prioritárias baseado nos riscos acima</p>
                <div className="mt-4 p-4 bg-[#F9F8F5] border border-[#E0DDD8] rounded-[8px]">
                  <p className="font-serif font-[400] text-sm text-[#1B2A4A] mb-2">Políticas sugeridas:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-[#4a4a4a] font-serif font-[300]">
                    <li>Assédio (detectado risco de assédio)</li>
                    <li>Conflito Interesse (relevância alta)</li>
                    <li>LGPD (se empresa lida com dados)</li>
                    <li>TI/Segurança (proteção de dados)</li>
                  </ul>
                </div>
              </div>

              <SelectorPoliticas
                politicas={catalogoPoliticas}
                selecionadas={politicasSelecionadas}
                onChange={handleSelecionarPoliticas}
              />

              <p className="text-sm text-[#8a8a8a] mt-4 p-4 bg-[#F9F8F5] border-l-4 border-[#C9A84C] rounded-[4px]">
                Total de políticas selecionadas: <strong>{politicasSelecionadas.length}/12</strong>
              </p>
            </>
          ) : (
            <>
              {/* SEÇÃO C.2: FORMULÁRIOS UNIVERSAIS */}
              <Secao titulo="Formulários Universais por Política" numero="C.2" />

              {politicasSelecionadas.length === 0 ? (
                <div className="p-6 bg-[#F9F8F5] border border-[#E0DDD8] rounded-[8px] text-center">
                  <p className="font-serif font-[400] text-[#1B2A4A]">Nenhuma política selecionada.</p>
                  <p className="text-sm text-[#8a8a8a] mt-2">Volte para C.1 e selecione pelo menos uma política para continuar.</p>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-[#8a8a8a] mb-6">Preencha os formulários abaixo com informações específicas para cada política. Campos não preenchidos estarão em branco na versão final.</p>
                  {politicasSelecionadas.map(politica => (
                    <FormPoliticaUniversal
                      key={politica}
                      politica={politica}
                      respostas={respostas}
                      onAlterar={handleAlterarPolitica}
                      onRemover={handleRemoverPolitica}
                    />
                  ))}
                </div>
              )}
            </>
          )}

        </div>

        {/* BOTÕES */}
        <div className="mt-10 flex gap-4 mb-10">
          {etapa === 'C1' ? (
            <>
              <button
                onClick={() => navigate(`/diagnostico/${diagnosticoId}/regimento`)}
                className="flex-1 px-4 py-3 bg-[#1B2A4A] text-white rounded-[8px] font-sans font-[500] uppercase text-sm tracking-wider hover:bg-[#0F1929] transition-all"
              >
                ◀ ANTERIOR
              </button>
              <button
                onClick={prosseguirParaC2}
                disabled={!riscosListados.trim() || politicasSelecionadas.length === 0}
                className="flex-1 px-4 py-3 bg-[#C9A84C] text-white rounded-[8px] font-sans font-[500] uppercase text-sm tracking-wider hover:bg-[#B8971F] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                PROSSEGUIR PARA C.2 ▶
              </button>
            </>
          ) : (
            <>
              <button
                onClick={voltarParaC1}
                className="flex-1 px-4 py-3 bg-[#1B2A4A] text-white rounded-[8px] font-sans font-[500] uppercase text-sm tracking-wider hover:bg-[#0F1929] transition-all"
              >
                ◀ VOLTAR PARA C.1
              </button>
              <button
                onClick={finalizarModulo}
                className="flex-1 px-4 py-3 bg-[#C9A84C] text-white rounded-[8px] font-sans font-[500] uppercase text-sm tracking-wider hover:bg-[#B8971F] transition-all"
              >
                FINALIZAR MÓDULO ▶
              </button>
            </>
          )}
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
