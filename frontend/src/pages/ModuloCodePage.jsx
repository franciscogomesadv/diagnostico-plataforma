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

export default function ModuloCodePage() {
  const { diagnosticoId } = useParams()
  const [respostas, setRespostas] = useState({})
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Dados das 6 seções do Módulo A (Código de Conduta)
  const secoes = {
    'A.1': {
      titulo: 'Identidade',
      perguntas: [
        {
          id: 'A.1.1',
          titulo: 'Missão institucional',
          descricao: 'Qual é a missão principal da organização?',
          tipo: 'aberta',
          placeholder: 'Ex: Garantir a ética nos processos jurídicos...'
        },
        {
          id: 'A.1.2',
          titulo: 'Valores fundamentais',
          descricao: 'Quais são os 3-5 valores que guiam a organização?',
          tipo: 'aberta',
          placeholder: 'Ex: Integridade, Transparência, Responsabilidade...'
        },
        {
          id: 'A.1.3',
          titulo: 'Visão de futuro',
          descricao: 'Qual é a aspiração de longo prazo?',
          tipo: 'aberta',
          placeholder: 'Ex: Ser referência em compliance jurídico...'
        }
      ]
    },
    'A.2': {
      titulo: 'Stakeholders e dilemas éticos',
      perguntas: [
        {
          id: 'A.2.1',
          titulo: 'Principais stakeholders internos',
          descricao: 'Quem são os atores-chave dentro da organização?',
          tipo: 'aberta',
          placeholder: 'Ex: Sócios, Advogados, Administrativos...'
        },
        {
          id: 'A.2.2',
          titulo: 'Principais stakeholders externos',
          descricao: 'Quem são os atores-chave fora da organização?',
          tipo: 'aberta',
          placeholder: 'Ex: Clientes, Tribunais, Órgãos reguladores...'
        },
        {
          id: 'A.2.3',
          titulo: 'Conflitos de interesse recorrentes',
          descricao: 'Descreva os dilemas éticos mais frequentes enfrentados',
          tipo: 'aberta',
          placeholder: 'Ex: Interesse comercial vs. interesse do cliente...'
        }
      ]
    },
    'A.3': {
      titulo: 'Compromissos éticos',
      perguntas: [
        {
          id: 'A.3.1',
          titulo: 'Compromisso com integridade',
          descricao: 'Como a organização garante práticas íntegras?',
          tipo: 'aberta',
          placeholder: 'Ex: Auditorias, Treinamentos, Políticas claras...'
        },
        {
          id: 'A.3.2',
          titulo: 'Compromisso com transparência',
          descricao: 'Como se comunica com stakeholders?',
          tipo: 'aberta',
          placeholder: 'Ex: Relatórios periódicos, Feedback loops...'
        },
        {
          id: 'A.3.3',
          titulo: 'Compromisso com responsabilidade social',
          descricao: 'Qual é o impacto social desejado?',
          tipo: 'aberta',
          placeholder: 'Ex: Acesso à justiça, Comunidades vulneráveis...'
        },
        {
          id: 'A.3.4',
          titulo: 'Compromisso com confidencialidade',
          descricao: 'Como protege dados sensíveis de clientes?',
          tipo: 'aberta',
          placeholder: 'Ex: Criptografia, NDAs, Políticas de acesso...'
        },
        {
          id: 'A.3.5',
          titulo: 'Compromisso com legalidade',
          descricao: 'Como garante conformidade regulatória?',
          tipo: 'aberta',
          placeholder: 'Ex: Compliance team, Revisão legal contínua...'
        },
        {
          id: 'A.3.6',
          titulo: 'Compromisso com diversidade e inclusão',
          descricao: 'Como promove igualdade dentro da organização?',
          tipo: 'aberta',
          placeholder: 'Ex: Políticas de recrutamento, Programas de mentoria...'
        }
      ]
    },
    'A.4': {
      titulo: 'Temas éticos prioritários',
      perguntas: [
        {
          id: 'A.4.1',
          titulo: 'Conflito de interesse',
          descricao: 'Como o código aborda conflitos de interesse?',
          tipo: 'aberta',
          placeholder: 'Ex: Declaração obrigatória, Recusa de casos...'
        },
        {
          id: 'A.4.2',
          titulo: 'Sigilo profissional',
          descricao: 'Como garante o sigilo entre advogado e cliente?',
          tipo: 'aberta',
          placeholder: 'Ex: Proteção legal, Termos de confidencialidade...'
        },
        {
          id: 'A.4.3',
          titulo: 'Honestidade e fraude',
          descricao: 'Como previne desonestidade e fraude?',
          tipo: 'aberta',
          placeholder: 'Ex: Verificações, Auditorias, Denúncias...'
        },
        {
          id: 'A.4.4',
          titulo: 'Assédio moral e sexual',
          descricao: 'Como protege contra assédio no ambiente?',
          tipo: 'aberta',
          placeholder: 'Ex: Canais de denúncia, Investigação imparcial...'
        },
        {
          id: 'A.4.5',
          titulo: 'Discriminação',
          descricao: 'Como evita discriminação por raça, gênero, etc?',
          tipo: 'aberta',
          placeholder: 'Ex: Políticas inclusivas, Treinamentos...'
        },
        {
          id: 'A.4.6',
          titulo: 'Corrupção e suborno',
          descricao: 'Como previne corrupção e suborno?',
          tipo: 'aberta',
          placeholder: 'Ex: Política anti-corrupção, Monitoramento...'
        }
      ]
    },
    'A.5': {
      titulo: 'Governança',
      perguntas: [
        {
          id: 'A.5.1',
          titulo: 'Responsável pela aprovação',
          descricao: 'Quem aprova o código de conduta?',
          tipo: 'aberta',
          placeholder: 'Ex: Conselho de Administração, Sócios...'
        },
        {
          id: 'A.5.2',
          titulo: 'Responsável pela comunicação',
          descricao: 'Quem comunica e divulga o código?',
          tipo: 'aberta',
          placeholder: 'Ex: Departamento de RH, Compliance...'
        },
        {
          id: 'A.5.3',
          titulo: 'Responsável pelo monitoramento',
          descricao: 'Quem monitora conformidade ao código?',
          tipo: 'aberta',
          placeholder: 'Ex: Comitê de Ética, Auditor interno...'
        },
        {
          id: 'A.5.4',
          titulo: 'Responsável pela disciplina',
          descricao: 'Quem aplica sanções por violações?',
          tipo: 'aberta',
          placeholder: 'Ex: Conselho Disciplinar, RH...'
        },
        {
          id: 'A.5.5',
          titulo: 'Frequência de revisão',
          descricao: 'Com que frequência o código é revisado?',
          tipo: 'escolha',
          opcoes: ['Anualmente', 'A cada 2 anos', 'A cada 3 anos', 'Conforme necessidade', 'Nunca foi revisado']
        }
      ]
    },
    'A.6': {
      titulo: 'Ciclo de vida do código',
      perguntas: [
        {
          id: 'A.6.1',
          titulo: 'Data de criação',
          descricao: 'Quando o código foi criado?',
          tipo: 'aberta',
          placeholder: 'Ex: Janeiro de 2020'
        },
        {
          id: 'A.6.2',
          titulo: 'Data da última revisão',
          descricao: 'Quando foi revisado pela última vez?',
          tipo: 'aberta',
          placeholder: 'Ex: Junho de 2024'
        },
        {
          id: 'A.6.3',
          titulo: 'Status de implementação',
          descricao: 'Qual é o status atual?',
          tipo: 'escolha',
          opcoes: ['Não existe ainda', 'Em desenvolvimento', 'Recém-aprovado', 'Implementado', 'Em revisão']
        }
      ]
    }
  }

  useEffect(() => {
    carregarRespostas()
  }, [diagnosticoId])

  const carregarRespostas = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/respostas/diagnostico/${diagnosticoId}`)
      const data = await response.json()

      if (data.success && data.respostas) {
        const respostasMap = {}
        data.respostas
          .filter(r => r.pergunta_id && r.pergunta_id.startsWith('A.'))
          .forEach(r => {
            respostasMap[r.pergunta_id] = r.resposta_valor
          })
        setRespostas(respostasMap)
      }
    } catch (err) {
      console.error('Erro ao carregar respostas:', err)
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
          resposta_valor: valor,
          tipo_pergunta: 'aberta'
        })
      })
    } catch (err) {
      console.error('Erro ao salvar resposta:', err)
    }
  }

  const handleSalvarSair = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/respostas/batch/salvar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          respostas_array: Object.entries(respostas).map(([pergunta_id, resposta_valor]) => ({
            diagnostico_id: diagnosticoId,
            pergunta_id,
            resposta_valor,
            tipo_pergunta: 'aberta'
          }))
        })
      })
    } catch (err) {
      console.error('Erro ao salvar e sair:', err)
    } finally {
      navigate('/')
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen font-serif text-[#4a4a4a]">Carregando...</div>
  }

  // Calcular progresso: 26 perguntas = ~50%
  const totalPerguntas = 26
  const perguntasRespondidas = Object.values(respostas).filter(v => v && v.toString().trim() !== '').length
  const progresso = Math.round((perguntasRespondidas / totalPerguntas) * 50)

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
            <h2 className="text-xl font-serif font-[400] text-[#1B2A4A]">Módulo A — Código de Conduta</h2>
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
          <p className="text-xs text-[#8a8a8a] font-serif">Progresso: {progresso}% ({perguntasRespondidas}/{totalPerguntas} respondidas)</p>
        </div>

        {/* PERGUNTAS */}
        <div className="bg-white bg-opacity-70 backdrop-blur-[12px] border border-[#E0DDD8] border-opacity-60 rounded-[12px] p-8 shadow-sm">

          {/* Seção A.1 */}
          <Secao titulo={secoes['A.1'].titulo} numero="A.1" />
          {secoes['A.1'].perguntas.map(p => (
            <PerguntaAberta
              key={p.id}
              id={p.id}
              titulo={p.titulo}
              descricao={p.descricao}
              placeholder={p.placeholder}
              valor={respostas[p.id]}
              onChange={handleSalvarResposta}
              respondida={!!respostas[p.id]}
            />
          ))}

          {/* Seção A.2 */}
          <Secao titulo={secoes['A.2'].titulo} numero="A.2" />
          {secoes['A.2'].perguntas.map(p => (
            <PerguntaAberta
              key={p.id}
              id={p.id}
              titulo={p.titulo}
              descricao={p.descricao}
              placeholder={p.placeholder}
              valor={respostas[p.id]}
              onChange={handleSalvarResposta}
              respondida={!!respostas[p.id]}
            />
          ))}

          {/* Seção A.3 */}
          <Secao titulo={secoes['A.3'].titulo} numero="A.3" />
          {secoes['A.3'].perguntas.map(p => (
            <PerguntaAberta
              key={p.id}
              id={p.id}
              titulo={p.titulo}
              descricao={p.descricao}
              placeholder={p.placeholder}
              valor={respostas[p.id]}
              onChange={handleSalvarResposta}
              respondida={!!respostas[p.id]}
            />
          ))}

          {/* Seção A.4 */}
          <Secao titulo={secoes['A.4'].titulo} numero="A.4" />
          {secoes['A.4'].perguntas.map(p => (
            <PerguntaAberta
              key={p.id}
              id={p.id}
              titulo={p.titulo}
              descricao={p.descricao}
              placeholder={p.placeholder}
              valor={respostas[p.id]}
              onChange={handleSalvarResposta}
              respondida={!!respostas[p.id]}
            />
          ))}

          {/* Seção A.5 */}
          <Secao titulo={secoes['A.5'].titulo} numero="A.5" />
          {secoes['A.5'].perguntas.map(p =>
            p.tipo === 'escolha' ? (
              <PerguntaEscolha
                key={p.id}
                id={p.id}
                titulo={p.titulo}
                descricao={p.descricao}
                opcoes={p.opcoes}
                valor={respostas[p.id]}
                onChange={handleSalvarResposta}
                respondida={!!respostas[p.id]}
              />
            ) : (
              <PerguntaAberta
                key={p.id}
                id={p.id}
                titulo={p.titulo}
                descricao={p.descricao}
                placeholder={p.placeholder}
                valor={respostas[p.id]}
                onChange={handleSalvarResposta}
                respondida={!!respostas[p.id]}
              />
            )
          )}

          {/* Seção A.6 */}
          <Secao titulo={secoes['A.6'].titulo} numero="A.6" />
          {secoes['A.6'].perguntas.map(p =>
            p.tipo === 'escolha' ? (
              <PerguntaEscolha
                key={p.id}
                id={p.id}
                titulo={p.titulo}
                descricao={p.descricao}
                opcoes={p.opcoes}
                valor={respostas[p.id]}
                onChange={handleSalvarResposta}
                respondida={!!respostas[p.id]}
              />
            ) : (
              <PerguntaAberta
                key={p.id}
                id={p.id}
                titulo={p.titulo}
                descricao={p.descricao}
                placeholder={p.placeholder}
                valor={respostas[p.id]}
                onChange={handleSalvarResposta}
                respondida={!!respostas[p.id]}
              />
            )
          )}

        </div>

        {/* BOTÕES */}
        <div className="mt-10 flex gap-4 mb-10">
          <button
            onClick={() => navigate(`/diagnostico/${diagnosticoId}/seletor`)}
            className="flex-1 px-4 py-3 bg-[#1B2A4A] text-white rounded-[8px] font-sans font-[500] uppercase text-sm tracking-wider hover:bg-[#0F1929] transition-all"
          >
            ◀ VOLTAR
          </button>
          <button
            onClick={() => navigate(`/diagnostico/${diagnosticoId}/regimento`)}
            className="flex-1 px-4 py-3 bg-[#C9A84C] text-white rounded-[8px] font-sans font-[500] uppercase text-sm tracking-wider hover:bg-[#B8971F] transition-all"
          >
            PRÓXIMO ▶
          </button>
          <button
            onClick={handleSalvarSair}
            className="flex-1 px-4 py-3 bg-[#F0EDE8] text-[#1B2A4A] rounded-[8px] font-sans font-[500] uppercase text-sm tracking-wider hover:bg-[#E0DDD8] transition-all"
          >
            SALVAR & SAIR
          </button>
        </div>
      </div>
    </div>
  )
}
