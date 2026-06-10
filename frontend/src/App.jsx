import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import FormularioPage from './pages/FormularioPage'
import RelatorioPage from './pages/RelatorioPage'
import ModuloCodePage from './pages/ModuloCodePage'
import ModuloRegimentoPage from './pages/ModuloRegimentoPage'
import ModuloPoliticasPage from './pages/ModuloPoliticasPage'
import ModuloSelectorPage from './pages/ModuloSelectorPage'
import ResponderDiagnosticoPage from './pages/ResponderDiagnosticoPage'
import Header from './components/Header'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar se há token no localStorage
    const token = localStorage.getItem('token')
    if (token) {
      // Validar token com backend
      fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.valid) {
            setUser(data.user)
            setIsAuthenticated(true)
          } else {
            localStorage.removeItem('token')
          }
        })
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    setUser(null)
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {isAuthenticated && <Header user={user} onLogout={handleLogout} />}
        <Routes>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <LoginPage setIsAuthenticated={setIsAuthenticated} setUser={setUser} />}
          />
          <Route
            path="/"
            element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/diagnostico/:diagnosticoId"
            element={isAuthenticated ? <FormularioPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/diagnostico/:diagnosticoId/seletor"
            element={isAuthenticated ? <ModuloSelectorPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/diagnostico/:diagnosticoId/codigo"
            element={isAuthenticated ? <ModuloCodePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/diagnostico/:diagnosticoId/regimento"
            element={isAuthenticated ? <ModuloRegimentoPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/diagnostico/:diagnosticoId/politicas"
            element={isAuthenticated ? <ModuloPoliticasPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/relatorio/:diagnosticoId"
            element={isAuthenticated ? <RelatorioPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/responder/:token"
            element={<ResponderDiagnosticoPage />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
