import { useNavigate } from 'react-router-dom'

export default function BotoesNavegacao({
  diagnosticoId,
  onProximo,
  onAnterior,
  onSair,
  desabledProximo = false,
  labelProximo = 'PRÓXIMO ▶',
  labelAnterior = '◀ ANTERIOR'
}) {
  const navigate = useNavigate()

  return (
    <div className="mt-10 flex gap-4 mb-10">
      <button
        onClick={onAnterior || (() => navigate('/'))}
        className="flex-1 px-4 py-3 bg-[#1B2A4A] text-white rounded-[8px] font-sans font-[500] uppercase text-sm tracking-wider hover:bg-[#0F1929] transition-all"
      >
        {labelAnterior}
      </button>
      <button
        onClick={onProximo}
        disabled={desabledProximo}
        className="flex-1 px-4 py-3 bg-[#C9A84C] text-white rounded-[8px] font-sans font-[500] uppercase text-sm tracking-wider hover:bg-[#B8971F] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {labelProximo}
      </button>
      <button
        onClick={onSair || (() => navigate('/'))}
        className="flex-1 px-4 py-3 bg-[#F0EDE8] text-[#1B2A4A] rounded-[8px] font-sans font-[500] uppercase text-sm tracking-wider hover:bg-[#E0DDD8] transition-all"
      >
        SALVAR & SAIR
      </button>
    </div>
  )
}
