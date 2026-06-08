import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const LogoFGA = () => (
  <img
    src="/logo-fga.png"
    alt="Francisco Gomes Advocacia"
    className="w-20 h-20 object-contain"
  />
)

export default function RelatorioPage() {
  const { diagnosticoId } = useParams()
  const [diagnostico, setDiagnostico] = useState(null)
  const [respostas, setRespostas] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Cores premium FGA
  const COLORS_FGA = {
    marinho: '#1B2A4A',
    ambar: '#C9A84C',
    risco1: '#EF4444', // Alto
    risco2: '#F97316', // Médio-alto
    risco3: '#EAB308', // Médio
    risco4: '#84CC16', // Baixo-médio
    risco5: '#22C55E'  // Baixo
  }

  const COLORS = [COLORS_FGA.ambar, COLORS_FGA.risco1, COLORS_FGA.risco2, COLORS_FGA.risco3]

  useEffect(() => {
    carregarDados()
  }, [diagnosticoId])

  const carregarDados = async () => {
    try {
      const [diagResponse, resResponse] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/api/diagnosticos/${diagnosticoId}`),
        fetch(`${import.meta.env.VITE_API_URL}/api/respostas/diagnostico/${diagnosticoId}`)
      ])

      const diagData = await diagResponse.json()
      const resData = await resResponse.json()

      setDiagnostico(diagData.diagnostico)
      setRespostas(resData.respostas || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Paleta tonal refinada (marinho → âmbar → taupe), sem cores primárias
  const maturidadeData = [
    { name: 'Código de Conduta', value: 72, fill: '#1B2A4A' },
    { name: 'Regimento Interno', value: 35, fill: '#3D5480' },
    { name: 'Políticas Internas', value: 25, fill: '#A89B82' },
    { name: 'Compliance', value: 45, fill: '#C9A84C' },
    { name: 'Cultura/Ética', value: 62, fill: '#D4BB72' }
  ]

  const riscoData = [
    { name: 'Assédio', value: 45, fill: '#1B2A4A' },
    { name: 'LGPD', value: 40, fill: '#3D5480' },
    { name: 'Home Office', value: 25, fill: '#C9A84C' },
    { name: 'Outros', value: 30, fill: '#A89B82' }
  ]

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen font-serif text-[#4a4a4a]">
      Carregando...
    </div>
  )

  return (
    <div className="bg-[#FDFCFB] min-h-screen">
      {/* HEADER */}
      <header className="bg-gradient-to-b from-white to-[#F9F8F5] py-16 border-b border-[#F0EDE8]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-8">
              <div className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => navigate('/')}>
                <LogoFGA />
              </div>
              <div>
                <h1 className="text-4xl font-serif font-[400] text-[#1B2A4A] mb-2">Relatório de Diagnóstico</h1>
                <p className="text-sm text-[#8a8a8a] font-sans font-[300] tracking-wide">Clara Associados | 04/06/2026 | v1.0</p>
              </div>
            </div>

            {/* Botões Premium */}
            <div className="flex gap-3">
              <button
                onClick={() => alert('JSON exportado')}
                className="px-6 py-3 bg-[#C9A84C] text-white rounded-[8px] font-sans font-[500] text-xs uppercase tracking-wider hover:bg-[#B8971F] transition-all shadow-sm hover:shadow-md"
              >
                Exportar JSON
              </button>
              <button
                onClick={() => alert('MD exportado')}
                className="px-6 py-3 bg-[#1B2A4A] text-white rounded-[8px] font-sans font-[500] text-xs uppercase tracking-wider hover:bg-[#0F1929] transition-all shadow-sm hover:shadow-md"
              >
                Exportar MD
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-transparent text-[#1B2A4A] border border-[#E0DDD8] rounded-[8px] font-sans font-[500] text-xs uppercase tracking-wider hover:bg-[#F9F8F5] transition-all"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* CONTEÚDO */}
      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* CARD 1: Perfil da Empresa */}
          <div className="bg-white bg-opacity-70 backdrop-blur-[12px] border border-[#E0DDD8] border-opacity-60 rounded-[12px] p-8 shadow-sm hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-serif font-[400] text-[#1B2A4A] mb-6 flex items-center gap-3">
              <span className="w-1 h-5 bg-[#C9A84C] rounded-full"></span> Perfil da Empresa
            </h3>
            <div className="space-y-3">
              <div className="border-b border-[#F0EDE8] pb-3">
                <p className="text-sm text-[#8a8a8a] font-sans font-[300] uppercase tracking-wide">Razão Social</p>
                <p className="text-[#1B2A4A] font-serif font-[400] text-lg mt-1">Clara Associados LTDA</p>
              </div>
              <div className="border-b border-[#F0EDE8] pb-3">
                <p className="text-sm text-[#8a8a8a] font-sans font-[300] uppercase tracking-wide">CNPJ</p>
                <p className="text-[#1B2A4A] font-serif font-[400] text-lg mt-1">12.345.678/0001-90</p>
              </div>
              <div className="border-b border-[#F0EDE8] pb-3">
                <p className="text-sm text-[#8a8a8a] font-sans font-[300] uppercase tracking-wide">Setor</p>
                <p className="text-[#1B2A4A] font-serif font-[400] text-lg mt-1">Serviços / Legal Tech</p>
              </div>
              <div className="border-b border-[#F0EDE8] pb-3">
                <p className="text-sm text-[#8a8a8a] font-sans font-[300] uppercase tracking-wide">Porte</p>
                <p className="text-[#1B2A4A] font-serif font-[400] text-lg mt-1">Médio (45 pessoas)</p>
              </div>
              <div>
                <p className="text-sm text-[#8a8a8a] font-sans font-[300] uppercase tracking-wide">Regime</p>
                <p className="text-[#1B2A4A] font-serif font-[400] text-lg mt-1">Híbrido</p>
              </div>
            </div>
          </div>

          {/* CARD 2: Maturidade Geral */}
          <div className="bg-white bg-opacity-70 backdrop-blur-[12px] border border-[#E0DDD8] border-opacity-60 rounded-[12px] p-8 shadow-sm hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-serif font-[400] text-[#1B2A4A] mb-6 flex items-center gap-3">
              <span className="w-1 h-5 bg-[#C9A84C] rounded-full"></span> Maturidade Geral
            </h3>
            <div className="space-y-4">
              <div>
                    <span className="font-serif font-[500] text-[#1B2A4A] text-2xl">48%</span>
                </div>
                <div className="h-3 bg-[#F0EDE8] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#C9A84C] to-[#1B2A4A]" style={{ width: '48%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gráficos Premium */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white bg-opacity-70 backdrop-blur-[12px] border border-[#E0DDD8] border-opacity-60 rounded-[12px] p-8 shadow-sm hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-serif font-[400] text-[#1B2A4A] mb-6 flex items-center gap-3">
              <span className="w-1 h-5 bg-[#C9A84C] rounded-full"></span> Maturidade por Dimensão
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={maturidadeData} margin={{ top: 20, right: 30, left: 0, bottom: 80 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0DDD8" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} stroke="#8a8a8a" />
                <YAxis stroke="#8a8a8a" />
                <Tooltip contentStyle={{ backgroundColor: '#F9F8F5', border: '1px solid #E0DDD8', borderRadius: '8px' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {maturidadeData.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white bg-opacity-70 backdrop-blur-[12px] border border-[#E0DDD8] border-opacity-60 rounded-[12px] p-8 shadow-sm hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-serif font-[400] text-[#1B2A4A] mb-6 flex items-center gap-3">
              <span className="w-1 h-5 bg-[#C9A84C] rounded-full"></span> Distribuição de Riscos
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={riscoData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value">
                  {riscoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status dos Documentos */}
        <div className="bg-white bg-opacity-70 backdrop-blur-[12px] border border-[#E0DDD8] border-opacity-60 rounded-[12px] p-8 shadow-sm mb-8">
          <h3 className="text-xl font-serif font-[400] text-[#1B2A4A] mb-6 flex items-center gap-3">
            <span className="w-1 h-5 bg-[#C9A84C] rounded-full"></span> Status dos Documentos
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4 p-5 bg-[#F9F8F5] border-l-2 border-[#C9A84C] rounded-r-[8px]">
              <div>
                <p className="font-serif font-[400] text-[#1B2A4A] text-lg">Código de Conduta</p>
                <p className="text-sm text-[#8a8a8a] font-sans font-[300] mt-1">Completo — 72% de resposta</p>
              </div>
              <span className="text-[11px] uppercase tracking-wider font-sans font-[500] text-[#C9A84C] whitespace-nowrap">Completo</span>
            </div>
            <div className="flex items-center justify-between gap-4 p-5 bg-[#F9F8F5] border-l-2 border-[#3D5480] rounded-r-[8px]">
              <div>
                <p className="font-serif font-[400] text-[#1B2A4A] text-lg">Regimento Interno</p>
                <p className="text-sm text-[#8a8a8a] font-sans font-[300] mt-1">35% — Faltam: jornada, atestados, disciplina</p>
              </div>
              <span className="text-[11px] uppercase tracking-wider font-sans font-[500] text-[#3D5480] whitespace-nowrap">Em curso</span>
            </div>
            <div className="flex items-center justify-between gap-4 p-5 bg-[#F9F8F5] border-l-2 border-[#9B5A4A] rounded-r-[8px]">
              <div>
                <p className="font-serif font-[400] text-[#1B2A4A] text-lg">Políticas Internas</p>
                <p className="text-sm text-[#8a8a8a] font-sans font-[300] mt-1">25% — Faltam: 10 de 11 políticas</p>
              </div>
              <span className="text-[11px] uppercase tracking-wider font-sans font-[500] text-[#9B5A4A] whitespace-nowrap">Pendente</span>
            </div>
          </div>
        </div>

        {/* Recomendações */}
        <div className="bg-white bg-opacity-70 backdrop-blur-[12px] border border-[#E0DDD8] border-opacity-60 rounded-[12px] p-8 shadow-sm">
          <h3 className="text-xl font-serif font-[400] text-[#1B2A4A] mb-6 flex items-center gap-3">
            <span className="w-1 h-5 bg-[#C9A84C] rounded-full"></span> Recomendações Prioritárias
          </h3>
          <div className="space-y-px">
            <div className="flex items-start gap-5 py-4 border-b border-[#F0EDE8]">
              <span className="font-serif text-2xl font-[400] text-[#C9A84C] leading-none w-8 shrink-0">01</span>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#9B5A4A] font-sans font-[500]">Urgente</span>
                <p className="text-[#1B2A4A] font-serif font-[400] mt-1">Implementar Política de Prevenção ao Assédio (risco crítico + Lei 14.457/22)</p>
              </div>
            </div>
            <div className="flex items-start gap-5 py-4 border-b border-[#F0EDE8]">
              <span className="font-serif text-2xl font-[400] text-[#C9A84C] leading-none w-8 shrink-0">02</span>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#9B5A4A] font-sans font-[500]">Urgente</span>
                <p className="text-[#1B2A4A] font-serif font-[400] mt-1">Estruturar LGPD com DPO nomeado (risco crítico + multas ANPD)</p>
              </div>
            </div>
            <div className="flex items-start gap-5 py-4 border-b border-[#F0EDE8]">
              <span className="font-serif text-2xl font-[400] text-[#C9A84C] leading-none w-8 shrink-0">03</span>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#3D5480] font-sans font-[500]">Importante</span>
                <p className="text-[#1B2A4A] font-serif font-[400] mt-1">Completar Regimento Interno (múltiplas reclamações)</p>
              </div>
            </div>
            <div className="flex items-start gap-5 py-4 border-b border-[#F0EDE8]">
              <span className="font-serif text-2xl font-[400] text-[#C9A84C] leading-none w-8 shrink-0">04</span>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#3D5480] font-sans font-[500]">Importante</span>
                <p className="text-[#1B2A4A] font-serif font-[400] mt-1">Política de Home Office (empresa é híbrida — 45% remota)</p>
              </div>
            </div>
            <div className="flex items-start gap-5 py-4">
              <span className="font-serif text-2xl font-[400] text-[#C9A84C] leading-none w-8 shrink-0">05</span>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#8a8a8a] font-sans font-[500]">Recomendado</span>
                <p className="text-[#1B2A4A] font-serif font-[400] mt-1">Formalizar Comitê de Ética + Canal de Denúncias</p>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}
