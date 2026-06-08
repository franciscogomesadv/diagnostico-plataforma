import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage({ setIsAuthenticated, setUser }) {
  const [email, setEmail] = useState('frangomes@claraassociados.com')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: email.split('@')[0],
          googleId: 'mock-google-id-' + Date.now()
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Erro ao fazer login')
        return
      }

      localStorage.setItem('token', data.token)
      setUser(data.user)
      setIsAuthenticated(true)
      navigate('/')
    } catch (err) {
      setError('Erro ao conectar com servidor')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FDFCFB]">
      <div className="bg-white bg-opacity-70 backdrop-blur-[12px] border border-[#E0DDD8] border-opacity-60 rounded-[12px] shadow-sm p-12 max-w-md w-full">
        <div className="text-center mb-10">
          <img src="/logo-fga.png" alt="Francisco Gomes Advocacia" className="w-16 h-16 object-contain mx-auto mb-6 opacity-90" />
          <h2 className="text-2xl font-serif font-[400] text-[#1B2A4A]">Francisco Gomes <span className="text-[#C9A84C]">Advocacia</span></h2>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#8a8a8a] font-sans font-[300] mt-2">Diagnóstico de Governança</p>
        </div>

        {error && (
          <div className="bg-[#F9F0EE] border-l-2 border-[#9B5A4A] text-[#9B5A4A] px-4 py-3 rounded-[8px] mb-6 text-sm font-serif">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#8a8a8a] font-sans font-[400] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-[#E0DDD8] rounded-[8px] bg-[#F9F8F5] focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent font-serif font-[300]"
              placeholder="seu@email.com"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1B2A4A] text-white py-3 rounded-[8px] font-sans font-[500] text-xs uppercase tracking-wider hover:bg-[#0F1929] disabled:opacity-50 transition-all shadow-sm hover:shadow-md"
          >
            {loading ? 'Conectando...' : 'Entrar'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#F0EDE8]">
          <p className="text-xs text-[#8a8a8a] font-serif font-[300] text-center">
            Acesso restrito a contas autorizadas.
          </p>
        </div>
      </div>
    </div>
  )
}
