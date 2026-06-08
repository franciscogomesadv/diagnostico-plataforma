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

export default function ModuloRegimentoPage() {
  const { diagnosticoId } = useParams()
  const [diagnostico, setDiagnostico] = useState(null)
  const [respostas, setRespostas] = useState({})
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

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
          resposta_valor: valor,
          tipo_pergunta: 'aberta'
        })
      })
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div className="flex justify-center items-center min-h-screen font-serif text-[#4a4a4a]">Carregando...</div>

  const progresso = 45

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
            <h2 className="text-xl font-serif font-[400] text-[#1B2A4A]">Questionário - Bloco B: Regimento Interno</h2>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-transparent text-[#1B2A4A] text-sm uppercase font-sans font-[400] tracking-wider border border-[#F0EDE8] rounded-[8px] hover:bg-[#F9F8F5] transition-all"
            >
              ← Voltar
            </button>
          </div>

          <div className="mb-4">
            <div className="w-full h-2 bg-[#F0EDE8] rounded-full overflow-hidden">
              <div className="h-full bg-[#1B2A4A] transition-all" style={{ width: `${progresso}%` }}></div>
            </div>
          </div>
          <p className="text-xs text-[#8a8a8a] font-serif">Progresso: {progresso}% (38 de 77 perguntas)</p>
        </div>

        {/* PERGUNTAS */}
        <div className="bg-white bg-opacity-70 backdrop-blur-[12px] border border-[#E0DDD8] border-opacity-60 rounded-[12px] p-8 shadow-sm">

          {/* B.1: ADMISSÃO */}
          <Secao titulo="Admissão" numero="B.1" />

          <PerguntaRadio
            id="B.1.1"
            titulo="Documentação na admissão"
            descricao="Qual documentação é solicitada na admissão?"
            opcoes={['RG + CPF', 'CPF + comprovante de endereço', 'Completa (RG, CPF, comprovante, PIS, etc.)']}
            valor={respostas['B.1.1']}
            onChange={handleSalvarResposta}
          />

          <PerguntaRadio
            id="B.1.2"
            titulo="CIPA/Comitê de segurança"
            descricao="Há representante de segurança eleito/designado?"
            opcoes={['Sim', 'Não, não se aplica ao porte', 'Não, mas deveríamos ter']}
            valor={respostas['B.1.2']}
            onChange={handleSalvarResposta}
          />

          <PerguntaRadio
            id="B.1.3"
            titulo="Avisos prévios e comunicações"
            descricao="Como são feitos os avisos legais (demissão, etc)?"
            opcoes={['Verbalmente', 'Por e-mail', 'Por escrito entregue em mão', 'Misto (depende do caso)']}
            valor={respostas['B.1.3']}
            onChange={handleSalvarResposta}
          />

          {/* B.2: JORNADA DE TRABALHO */}
          <Secao titulo="Jornada de trabalho" numero="B.2" />

          <PerguntaRadio
            id="B.2.1"
            titulo="Horário oficial de entrada e saída"
            descricao="Qual é o horário oficial?"
            opcoes={['8h-12h / 13h-17h', '8h-12h / 13h-18h', 'Flexível (home office)', 'Horário integral 8h-17h', 'Outro']}
            valor={respostas['B.2.1']}
            onChange={handleSalvarResposta}
          />

          <PerguntaRadio
            id="B.2.2"
            titulo="Intervalo intrajornada (almoço)"
            descricao="Quanto tempo é destinado ao almoço?"
            opcoes={['1 hora', '1,5 horas', '2 horas', 'Variável']}
            valor={respostas['B.2.2']}
            onChange={handleSalvarResposta}
          />

          <PerguntaRadio
            id="B.2.3"
            titulo="Sistema de controle de ponto"
            descricao="Como o ponto é controlado?"
            opcoes={['Ponto eletrônico', 'Ponto biométrico', 'Sistema digital (app)', 'Planilha/papel', 'Sem controle formal']}
            valor={respostas['B.2.3']}
            onChange={handleSalvarResposta}
          />

          <PerguntaRadio
            id="B.2.4"
            titulo="Horas extras e compensação"
            descricao="Como são tratadas as horas extras?"
            opcoes={['Pagas com adicional de 50%', 'Pagas com adicional de 100%', 'Compensadas em folga', 'Não permitidas/desconto']}
            valor={respostas['B.2.4']}
            onChange={handleSalvarResposta}
          />

          <PerguntaRadio
            id="B.2.5"
            titulo="Trabalho aos finais de semana/feriados"
            descricao="Como é remunerado?"
            opcoes={['Com adicional 100%', 'Com folga compensatória', 'Com adicional + folga', 'Sem adicional']}
            valor={respostas['B.2.5']}
            onChange={handleSalvarResposta}
          />

          <PerguntaRadio
            id="B.2.6"
            titulo="Home office / regime remoto"
            descricao="É permitido trabalhar de casa?"
            opcoes={['Não é permitido', 'Permitido com aprovação caso a caso', 'Permitido 1-2 dias/semana', 'Permitido irrestritamente', 'Regime híbrido padrão']}
            valor={respostas['B.2.6']}
            onChange={handleSalvarResposta}
          />

          <PerguntaRadio
            id="B.2.7"
            titulo="Intervalos e pausas (além do almoço)"
            descricao="Há outros intervalos definidos?"
            opcoes={['Sim, 2x 15 minutos', 'Sim, 1x 15 minutos', 'Livre, conforme necessidade', 'Não há']}
            valor={respostas['B.2.7']}
            onChange={handleSalvarResposta}
          />

          <PerguntaRadio
            id="B.2.8"
            titulo="Banco de horas / flexibilização"
            descricao="Há banco de horas ou flexibilização?"
            opcoes={['Sim, com acordo individual', 'Sim, com acordo coletivo', 'Não há']}
            valor={respostas['B.2.8']}
            onChange={handleSalvarResposta}
          />

          {/* B.3: DIREITOS E DEVERES */}
          <Secao titulo="Direitos e deveres" numero="B.3" />

          <PerguntaRadio
            id="B.3.1"
            titulo="Uniforme/equipamento de proteção"
            descricao="Quem fornece uniforme/EPI?"
            opcoes={['Empresa fornece totalmente', 'Empresa fornece parcialmente', 'Colaborador fornece', 'Não se aplica']}
            valor={respostas['B.3.1']}
            onChange={handleSalvarResposta}
          />

          <PerguntaRadio
            id="B.3.2"
            titulo="Uso de redes sociais / política de comunicação"
            descricao="Há política clara sobre uso?"
            opcoes={['Sim, documentada', 'Sim, verbal', 'Não há política']}
            valor={respostas['B.3.2']}
            onChange={handleSalvarResposta}
          />

          <PerguntaRadio
            id="B.3.3"
            titulo="Confidencialidade e sigilo"
            descricao="Há cláusula de confidencialidade?"
            opcoes={['Sim, em contrato individual', 'Sim, em regulamento', 'Não há']}
            valor={respostas['B.3.3']}
            onChange={handleSalvarResposta}
          />

          <PerguntaRadio
            id="B.3.4"
            titulo="Responsabilidade por danos a bens da empresa"
            descricao="Como é tratado?"
            opcoes={['Desconto proporcional', 'Cobertura total do colaborador', 'Repartição entre empresa e colaborador', 'Sem cobrança']}
            valor={respostas['B.3.4']}
            onChange={handleSalvarResposta}
          />

          {/* B.4: AUSÊNCIAS */}
          <Secao titulo="Ausências" numero="B.4" />

          <PerguntaRadio
            id="B.4.1"
            titulo="Abono de faltas (idas ao médico, etc)"
            descricao="Como são tratadas?"
            opcoes={['Abonadas com documentação', 'Descontadas', 'Limitadas a X por ano', 'Caso a caso']}
            valor={respostas['B.4.1']}
            onChange={handleSalvarResposta}
          />

          <PerguntaRadio
            id="B.4.2"
            titulo="Faltas não justificadas"
            descricao="Qual é a consequência?"
            opcoes={['Aviso verbal', 'Advertência escrita', 'Desconto direto em folha', 'Progressiva (verbal→escrita→demissional)']}
            valor={respostas['B.4.2']}
            onChange={handleSalvarResposta}
          />

          <PerguntaRadio
            id="B.4.3"
            titulo="Licença paternidade/maternidade (além da lei)"
            descricao="Há extensão do período legal?"
            opcoes={['Não, apenas legal', 'Sim, com extensão', 'Sim, com 50% mantido pela empresa']}
            valor={respostas['B.4.3']}
            onChange={handleSalvarResposta}
          />

          <PerguntaRadio
            id="B.4.4"
            titulo="Ausência por luto/calamidade familiar"
            descricao="Como é tratada?"
            opcoes={['Abonada por X dias', 'Abonada conforme solicitação', 'Descontada', 'Não há regra clara']}
            valor={respostas['B.4.4']}
            onChange={handleSalvarResposta}
          />

          {/* B.5: ATIVOS E SEGURANÇA */}
          <Secao titulo="Ativos e segurança" numero="B.5" />

          <PerguntaRadio
            id="B.5.1"
            titulo="Notebooks/equipamentos de trabalho"
            descricao="Quem é responsável por danos?"
            opcoes={['Empresa assume (seguro interno)', 'Colaborador responsável', 'Depende: uso pessoal paga, uso profissional empresa', 'Compartilhado']}
            valor={respostas['B.5.1']}
            onChange={handleSalvarResposta}
          />

          <PerguntaRadio
            id="B.5.2"
            titulo="Cartão corporativo/vale refeição/transporte"
            descricao="Como é gerenciado?"
            opcoes={['Fornecido pela empresa sem devolução', 'Fornecido, mas devolução ao sair', 'Sem cartão (reembolso)', 'Não fornece']}
            valor={respostas['B.5.2']}
            onChange={handleSalvarResposta}
          />

          <PerguntaRadio
            id="B.5.3"
            titulo="Acesso a informações/senhas de sistemas"
            descricao="Há procedimento de devolução?"
            opcoes={['Sim, documentado', 'Sim, verbalmente orientado', 'Não há procedimento formal']}
            valor={respostas['B.5.3']}
            onChange={handleSalvarResposta}
          />

          <PerguntaRadio
            id="B.5.4"
            titulo="Monitoramento de comunicação/navegação"
            descricao="Há monitoramento?"
            opcoes={['Não há', 'Sim, comunicado aos colaboradores', 'Sim, sem comunicação clara']}
            valor={respostas['B.5.4']}
            onChange={handleSalvarResposta}
          />

          <PerguntaRadio
            id="B.5.5"
            titulo="LGPD / Privacidade de dados pessoais"
            descricao="Há política?"
            opcoes={['Sim, documentada', 'Parcialmente', 'Não há']}
            valor={respostas['B.5.5']}
            onChange={handleSalvarResposta}
          />

          {/* B.6: SST (Saúde e Segurança do Trabalho) */}
          <Secao titulo="SST - Saúde e Segurança do Trabalho" numero="B.6" />

          <PerguntaRadio
            id="B.6.1"
            titulo="ASO (Atestado de Saúde Ocupacional) / Exames periódicos"
            descricao="São realizados?"
            opcoes={['Sim, anualmente', 'Sim, bienalmente', 'Sim, conforme NR', 'Não']}
            valor={respostas['B.6.1']}
            onChange={handleSalvarResposta}
          />

          <PerguntaRadio
            id="B.6.2"
            titulo="PPRA (Programa de Prevenção de Riscos Ambientais)"
            descricao="Existe e está atualizado?"
            opcoes={['Sim, atualizado', 'Sim, desatualizado', 'Não, mas deveríamos ter', 'Não se aplica']}
            valor={respostas['B.6.2']}
            onChange={handleSalvarResposta}
          />

          <PerguntaRadio
            id="B.6.3"
            titulo="PCMSO (Programa de Controle Médico de Saúde Ocupacional)"
            descricao="Existe?"
            opcoes={['Sim, atualizado', 'Sim, desatualizado', 'Não, mas deveríamos ter', 'Não se aplica']}
            valor={respostas['B.6.3']}
            onChange={handleSalvarResposta}
          />

          <PerguntaRadio
            id="B.6.4"
            titulo="NRs (Normas Regulamentadoras) aplicáveis"
            descricao="Quais NRs se aplicam?"
            opcoes={['Sim, todas as relevantes foram identificadas e adotadas', 'Parcialmente, algumas NRs não foram implementadas', 'Não identificadas formalmente']}
            valor={respostas['B.6.4']}
            onChange={handleSalvarResposta}
          />

          <PerguntaRadio
            id="B.6.5"
            titulo="Treinamento de SST para colaboradores"
            descricao="É realizado?"
            opcoes={['Sim, anualmente para todos', 'Sim, apenas para setores críticos', 'Não']}
            valor={respostas['B.6.5']}
            onChange={handleSalvarResposta}
          />

          {/* B.7: REGIME DISCIPLINAR */}
          <Secao titulo="Regime disciplinar" numero="B.7" />

          <PerguntaRadio
            id="B.7.1"
            titulo="Progressão disciplinar documentada"
            descricao="Como é estruturada?"
            opcoes={['Verbal → Advertência escrita → Suspensão → Demissão por justa causa', 'Apenas advertência escrita e demissão', 'Não há estrutura formal']}
            valor={respostas['B.7.1']}
            onChange={handleSalvarResposta}
          />

          <PerguntaRadio
            id="B.7.2"
            titulo="Advertência / Suspensão (direito de defesa)"
            descricao="É garantido direito de se defender?"
            opcoes={['Sim, por escrito antes', 'Sim, verbalmente', 'Não há procedimento']}
            valor={respostas['B.7.2']}
            onChange={handleSalvarResposta}
          />

          <PerguntaRadio
            id="B.7.3"
            titulo="Causas de demissão por justa causa"
            descricao="Estão claras?"
            opcoes={['Sim, documentadas conforme CLT', 'Sim, parcialmente', 'Não, segue CLT apenas']}
            valor={respostas['B.7.3']}
            onChange={handleSalvarResposta}
          />

          {/* B.8: MÓDULOS ESPECÍFICOS */}
          <Secao titulo="Módulos específicos" numero="B.8" />

          <PerguntaRadio
            id="B.8.1"
            titulo="Crescimento profissional / Treinamento"
            descricao="Há programa?"
            opcoes={['Sim, formalizado', 'Sim, informal', 'Não há']}
            valor={respostas['B.8.1']}
            onChange={handleSalvarResposta}
          />

          <PerguntaRadio
            id="B.8.2"
            titulo="Planejamento de carreiras / Plano de cargos e salários"
            descricao="Existe?"
            opcoes={['Sim, documentado', 'Sim, apenas tabela de salários', 'Não há']}
            valor={respostas['B.8.2']}
            onChange={handleSalvarResposta}
          />

          <PerguntaRadio
            id="B.8.3"
            titulo="Benefícios complementares (além do legal)"
            descricao="Quais benefícios?"
            opcoes={['Nenhum além do legal', '1-2 benefícios (vale, transporte)', '3-5 benefícios (vale, transporte, cesta, seguro)', 'Mais de 5']}
            valor={respostas['B.8.3']}
            onChange={handleSalvarResposta}
          />

          {/* B.9: ENCERRAMENTO */}
          <Secao titulo="Encerramento" numero="B.9" />

          <PerguntaRadio
            id="B.9.1"
            titulo="Procedimento de desligamento"
            descricao="Como é realizado?"
            opcoes={['Documentado e estruturado', 'Sem estrutura formal', 'Depende do motivo']}
            valor={respostas['B.9.1']}
            onChange={handleSalvarResposta}
          />

          <PerguntaRadio
            id="B.9.2"
            titulo="Devolução de documentos/bens na rescisão"
            descricao="Há checklist?"
            opcoes={['Sim, formal', 'Sim, informal', 'Não há']}
            valor={respostas['B.9.2']}
            onChange={handleSalvarResposta}
          />

          <PerguntaRadio
            id="B.9.3"
            titulo="Comunicação de rescisão (aviso prévio, TRCT, etc)"
            descricao="Processo completo?"
            opcoes={['Sim, conforme CLT com documentação', 'Parcialmente', 'Apenas verbal com TRCT']}
            valor={respostas['B.9.3']}
            onChange={handleSalvarResposta}
          />

        </div>

        {/* BOTÕES */}
        <div className="mt-10 flex gap-4 mb-10">
          <button
            onClick={() => navigate(`/diagnostico/${diagnosticoId}/codigo`)}
            className="flex-1 px-4 py-3 bg-[#1B2A4A] text-white rounded-[8px] font-sans font-[500] uppercase text-sm tracking-wider hover:bg-[#0F1929] transition-all"
          >
            ◀ ANTERIOR
          </button>
          <button
            onClick={() => navigate(`/diagnostico/${diagnosticoId}/politicas`)}
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
