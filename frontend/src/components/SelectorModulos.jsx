import { useNavigate } from 'react-router-dom'

export default function SelectorModulos({ diagnosticoId, modulosConcluidos = [] }) {
  const navigate = useNavigate()

  const modulos = [
    {
      id: 'codigo',
      titulo: 'Código de Conduta',
      descricao: 'Princípios, valores e identidade da empresa',
      perguntas: 26,
      cor: '#C9A84C'
    },
    {
      id: 'regimento',
      titulo: 'Regimento Interno',
      descricao: 'Regras operacionais, jornada e disciplina',
      perguntas: 38,
      cor: '#1B2A4A'
    },
    {
      id: 'politicas',
      titulo: 'Políticas Internas',
      descricao: 'Gestão de risco e processos',
      perguntas: 13,
      cor: '#4a4a4a'
    }
  ]

  return (
    <div className="bg-[#FDFCFB] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-serif font-[400] text-[#1B2A4A] mb-2">
            Parabéns! Bloco 0 Completo
          </h1>
          <p className="text-[#4a4a4a] font-serif">
            Agora escolha quais documentos deseja gerar
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {modulos.map(mod => (
            <button
              key={mod.id}
              onClick={() => navigate(`/diagnostico/${diagnosticoId}/${mod.id}`)}
              className="group relative bg-white bg-opacity-70 backdrop-blur-[12px] border border-[#E0DDD8] border-opacity-60 rounded-[12px] p-8 shadow-sm hover:shadow-lg transition-all text-left h-full"
            >
              {/* Indicador de cor */}
              <div
                className="absolute top-0 left-0 h-1 rounded-t-[12px] transition-all group-hover:h-2 w-full"
                style={{ backgroundColor: mod.cor }}
              ></div>

              {/* Status */}
              {modulosConcluidos.includes(mod.id) && (
                <div className="absolute top-3 right-3 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  ✓ Concluído
                </div>
              )}

              <h3 className="text-xl font-serif font-[400] text-[#1B2A4A] mb-2">
                {mod.titulo}
              </h3>

              <p className="text-sm text-[#4a4a4a] mb-4 font-serif font-[300]">
                {mod.descricao}
              </p>

              <div className="text-xs text-[#8a8a8a] font-sans">
                {mod.perguntas} perguntas
              </div>

              <div className="mt-6 pt-4 border-t border-[#F0EDE8] group-hover:translate-x-1 transition-transform">
                <span className="text-[#C9A84C] font-sans font-[500] text-sm uppercase">
                  Começar →
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-[#1B2A4A] text-white rounded-[8px] font-sans font-[500] uppercase text-sm tracking-wider hover:bg-[#0F1929] transition-all"
          >
            ← Voltar ao Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
