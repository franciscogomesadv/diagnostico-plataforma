import { useNavigate } from 'react-router-dom'

export default function ProgressoCard({ titulo, progresso, diagnosticoId }) {
  const navigate = useNavigate()

  return (
    <div className="bg-white bg-opacity-70 backdrop-blur-[12px] border border-[#E0DDD8] border-opacity-60 rounded-[12px] p-8 mb-10 shadow-sm hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-serif font-[400] text-[#1B2A4A]">{titulo}</h2>
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
      <p className="text-xs text-[#8a8a8a] font-serif">Progresso: {progresso}%</p>
    </div>
  )
}
