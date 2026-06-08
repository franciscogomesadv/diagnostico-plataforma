import { useNavigate } from 'react-router-dom'

const LogoFGA = () => (
  <img
    src="/logo-fga.png"
    alt="Francisco Gomes Advocacia"
    className="w-20 h-20 object-contain"
  />
)

export default function QuestionarioHeader({ titulo, subtitulo, diagnosticoId }) {
  const navigate = useNavigate()

  return (
    <header className="bg-gradient-to-b from-white to-[#F9F8F5] py-16 border-b border-[#F0EDE8]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="opacity-80 hover:opacity-100 transition-opacity mb-8 flex justify-center cursor-pointer" onClick={() => navigate('/')}>
          <LogoFGA />
        </div>
        <h1 className="text-4xl font-serif font-[400] text-[#1B2A4A]">Francisco Gomes</h1>
        <p className="text-xs uppercase tracking-widest text-[#8a8a8a] mt-3 font-sans font-[300]">Advocacia • OAB/SP 363.517</p>
      </div>
    </header>
  )
}
