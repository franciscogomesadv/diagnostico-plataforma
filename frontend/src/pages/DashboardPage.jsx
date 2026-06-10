import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function DashboardPage() {
  const [clientes, setClientes] = useState([])
  const [diagnosticos, setDiagnosticos] = useState({})
  const [loading, setLoading] = useState(true)
  const [showNewClienteForm, setShowNewClienteForm] = useState(false)
  const [novoCliente, setNovoCliente] = useState({ nome_empresa: '', email_responsavel: '' })
  const [showCompartilhadoModal, setShowCompartilhadoModal] = useState(false)
  const [compartilhadoData, setCompartilhadoData] = useState(null)
  const [gerandoLink, setGerandoLink] = useState(false)
  const [gerandoDocumentos, setGerandoDocumentos] = useState(false)
  const [showDocumentosModal, setShowDocumentosModal] = useState(false)
  const [documentosGerados, setDocumentosGerados] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    carregarClientes()
  }, [])

  const carregarClientes = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/clientes`)
      const data = await response.json()
      setClientes(data.clientes || [])

      // Carregar diagnósticos de cada cliente
      data.clientes.forEach(cliente => {
        carregarDiagnosticos(cliente.id)
      })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const carregarDiagnosticos = async (clienteId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/diagnosticos/cliente/${clienteId}`)
      const data = await response.json()
      setDiagnosticos(prev => ({
        ...prev,
        [clienteId]: data.diagnosticos || []
      }))
    } catch (err) {
      console.error(err)
    }
  }

  const handleCriarCliente = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/clientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoCliente)
      })
      const data = await response.json()
      if (data.success) {
        setClientes([...clientes, data.cliente])
        setNovoCliente({ nome_empresa: '', email_responsavel: '' })
        setShowNewClienteForm(false)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleCriarDiagnostico = async (clienteId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/diagnosticos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cliente_id: clienteId,
          modulos_solicitados: ['COD', 'REG', 'POL']
        })
      })
      const data = await response.json()
      if (data.success) {
        carregarDiagnosticos(clienteId)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleGerarLinkCompartilhado = async (diagnosticoId) => {
    setGerandoLink(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/compartilhado/gerar-link`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ diagnostico_id: diagnosticoId })
      })
      const data = await response.json()
      if (data.success) {
        setCompartilhadoData(data)
        setShowCompartilhadoModal(true)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setGerandoLink(false)
    }
  }

  const copiarParaClipboard = (texto) => {
    navigator.clipboard.writeText(texto)
  }

  const handleGerarDocumentos = async (diagnosticoId) => {
    setGerandoDocumentos(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/geradores/gerar/${diagnosticoId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (data.success) {
        setDocumentosGerados(data.documentos)
        setShowDocumentosModal(true)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setGerandoDocumentos(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-[#FDFCFB] font-serif text-[#4a4a4a]">Carregando...</div>
  }

  return (
    <div className="bg-[#FDFCFB] min-h-screen">
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="mb-12 pb-8 border-b border-[#F0EDE8]">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#C9A84C] font-sans font-[400] mb-3">Painel de Diagnósticos</p>
          <h2 className="text-4xl font-serif font-[400] text-[#1B2A4A] mb-3">Meus Diagnósticos</h2>
          <p className="text-[#8a8a8a] font-serif font-[300]">Gestão de governança documental corporativa</p>
        </div>

        <button
          onClick={() => setShowNewClienteForm(!showNewClienteForm)}
          className="mb-10 px-7 py-3 bg-[#1B2A4A] text-white rounded-[8px] font-sans font-[500] text-xs uppercase tracking-wider hover:bg-[#0F1929] transition-all shadow-sm hover:shadow-md"
        >
          Novo Diagnóstico
        </button>

        {showNewClienteForm && (
          <form onSubmit={handleCriarCliente} className="bg-white bg-opacity-70 backdrop-blur-[12px] border border-[#E0DDD8] border-opacity-60 rounded-[12px] p-8 mb-10 shadow-sm">
            <h3 className="text-xl font-serif font-[400] text-[#1B2A4A] mb-6">Novo Cliente</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nome da Empresa"
                value={novoCliente.nome_empresa}
                onChange={(e) => setNovoCliente({ ...novoCliente, nome_empresa: e.target.value })}
                className="px-4 py-3 border border-[#E0DDD8] rounded-[8px] bg-[#F9F8F5] focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent font-serif font-[300]"
                required
              />
              <input
                type="email"
                placeholder="Email do Responsável"
                value={novoCliente.email_responsavel}
                onChange={(e) => setNovoCliente({ ...novoCliente, email_responsavel: e.target.value })}
                className="px-4 py-3 border border-[#E0DDD8] rounded-[8px] bg-[#F9F8F5] focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent font-serif font-[300]"
                required
              />
            </div>
            <div className="mt-6 flex gap-3">
              <button type="submit" className="px-6 py-2.5 bg-[#C9A84C] text-white rounded-[8px] font-sans font-[500] text-xs uppercase tracking-wider hover:bg-[#B8971F] transition-all">
                Salvar
              </button>
              <button
                type="button"
                onClick={() => setShowNewClienteForm(false)}
                className="px-6 py-2.5 bg-[#F0EDE8] text-[#1B2A4A] rounded-[8px] font-sans font-[500] text-xs uppercase tracking-wider hover:bg-[#E0DDD8] transition-all"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 gap-6">
          {clientes.map(cliente => (
            <div key={cliente.id} className="bg-white bg-opacity-70 backdrop-blur-[12px] border border-[#E0DDD8] border-opacity-60 rounded-[12px] p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#F0EDE8]">
                <span className="w-2 h-2 rounded-full bg-[#C9A84C]"></span>
                <h3 className="text-xl font-serif font-[400] text-[#1B2A4A]">{cliente.nome_empresa}</h3>
              </div>

              {diagnosticos[cliente.id] && diagnosticos[cliente.id].length > 0 ? (
                <div className="space-y-4">
                  {diagnosticos[cliente.id].map(diag => (
                    <div key={diag.id} className="border border-[#F0EDE8] rounded-[8px] p-5 hover:bg-[#F9F8F5] transition-colors">
                      <div className="flex justify-between items-start gap-6">
                        <div className="flex-1">
                          <p className="font-serif font-[400] text-[#1B2A4A] text-lg">
                            {diag.etapa_atual}
                          </p>
                          <div className="mt-3 bg-[#F0EDE8] rounded-full h-1.5 w-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#C9A84C] to-[#1B2A4A] transition-all"
                              style={{ width: `${diag.progresso}%` }}
                            />
                          </div>
                          <p className="text-xs text-[#8a8a8a] mt-2 font-sans font-[300]">
                            {diag.progresso}% concluído · atualizado em {diag.ultima_atualizacao || diag.data_inicio}
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={() => navigate(`/diagnostico/${diag.id}`)}
                            className="px-5 py-2.5 bg-[#1B2A4A] text-white text-xs uppercase tracking-wider rounded-[8px] font-sans font-[500] hover:bg-[#0F1929] transition-all"
                          >
                            Continuar
                          </button>
                          <button
                            onClick={() => navigate(`/relatorio/${diag.id}`)}
                            className="px-5 py-2.5 bg-transparent text-[#1B2A4A] text-xs uppercase tracking-wider rounded-[8px] font-sans font-[500] border border-[#C9A84C] hover:bg-[#C9A84C] hover:text-white transition-all"
                          >
                            Relatório
                          </button>
                          <button
                            onClick={() => handleGerarLinkCompartilhado(diag.id)}
                            disabled={gerandoLink}
                            className="px-5 py-2.5 bg-transparent text-[#C9A84C] text-xs uppercase tracking-wider rounded-[8px] font-sans font-[500] border border-[#C9A84C] hover:bg-[#C9A84C] hover:text-white transition-all disabled:opacity-50"
                            title="Gerar link para cliente preencher respostas"
                          >
                            {gerandoLink ? '⏳' : '🔗'}
                          </button>
                          <button
                            onClick={() => handleGerarDocumentos(diag.id)}
                            disabled={gerandoDocumentos}
                            className="px-5 py-2.5 bg-transparent text-[#1B2A4A] text-xs uppercase tracking-wider rounded-[8px] font-sans font-[500] border border-[#1B2A4A] hover:bg-[#1B2A4A] hover:text-white transition-all disabled:opacity-50"
                            title="Gerar Código, Regimento e Políticas"
                          >
                            {gerandoDocumentos ? '⏳' : '📄'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#8a8a8a] mb-4 font-serif font-[300] italic">Nenhum diagnóstico iniciado.</p>
              )}

              <button
                onClick={() => handleCriarDiagnostico(cliente.id)}
                className="mt-6 text-[#C9A84C] text-xs uppercase tracking-wider font-sans font-[500] hover:text-[#B8971F] transition-colors"
              >
                + Novo Diagnóstico
              </button>
            </div>
          ))}
        </div>

        {/* Modal de Documentos Gerados */}
        {showDocumentosModal && documentosGerados && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white bg-opacity-70 backdrop-blur-[12px] border border-[#E0DDD8] border-opacity-60 rounded-[12px] shadow-lg p-8 max-w-md w-full">
              <h3 className="text-xl font-serif font-[400] text-[#1B2A4A] mb-6">Documentos Gerados</h3>

              <div className="space-y-4 mb-6">
                {/* Código de Conduta */}
                <div className="border border-[#E0DDD8] rounded-[8px] p-4 hover:bg-[#F9F8F5] transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-serif font-[400] text-[#1B2A4A]">{documentosGerados.codigo_conduta.titulo}</p>
                      <p className="text-xs text-[#8a8a8a] mt-1">{(documentosGerados.codigo_conduta.bytes / 1024).toFixed(0)} KB</p>
                    </div>
                  </div>
                  <a
                    href={documentosGerados.codigo_conduta.url}
                    className="inline-block px-4 py-2 bg-[#1B2A4A] text-white rounded-[6px] font-sans font-[500] text-xs uppercase tracking-wider hover:bg-[#0F1929] transition-all"
                  >
                    Baixar
                  </a>
                </div>

                {/* Regimento Interno */}
                <div className="border border-[#E0DDD8] rounded-[8px] p-4 hover:bg-[#F9F8F5] transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-serif font-[400] text-[#1B2A4A]">{documentosGerados.regimento_interno.titulo}</p>
                      <p className="text-xs text-[#8a8a8a] mt-1">{(documentosGerados.regimento_interno.bytes / 1024).toFixed(0)} KB</p>
                    </div>
                  </div>
                  <a
                    href={documentosGerados.regimento_interno.url}
                    className="inline-block px-4 py-2 bg-[#1B2A4A] text-white rounded-[6px] font-sans font-[500] text-xs uppercase tracking-wider hover:bg-[#0F1929] transition-all"
                  >
                    Baixar
                  </a>
                </div>

                {/* Políticas Internas */}
                <div className="border border-[#E0DDD8] rounded-[8px] p-4 hover:bg-[#F9F8F5] transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-serif font-[400] text-[#1B2A4A]">{documentosGerados.politicas_internas.titulo}</p>
                      <p className="text-xs text-[#8a8a8a] mt-1">{(documentosGerados.politicas_internas.bytes / 1024).toFixed(0)} KB</p>
                    </div>
                  </div>
                  <a
                    href={documentosGerados.politicas_internas.url}
                    className="inline-block px-4 py-2 bg-[#1B2A4A] text-white rounded-[6px] font-sans font-[500] text-xs uppercase tracking-wider hover:bg-[#0F1929] transition-all"
                  >
                    Baixar
                  </a>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowDocumentosModal(false)
                  setDocumentosGerados(null)
                }}
                className="w-full px-6 py-2.5 bg-[#F0EDE8] text-[#1B2A4A] rounded-[8px] font-sans font-[500] text-xs uppercase tracking-wider hover:bg-[#E0DDD8] transition-all"
              >
                Fechar
              </button>
            </div>
          </div>
        )}

        {/* Modal de Compartilhamento */}
        {showCompartilhadoModal && compartilhadoData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white bg-opacity-70 backdrop-blur-[12px] border border-[#E0DDD8] border-opacity-60 rounded-[12px] shadow-lg p-8 max-w-md w-full">
              <h3 className="text-xl font-serif font-[400] text-[#1B2A4A] mb-6">Link de Compartilhamento</h3>

              <div className="space-y-4 mb-6">
                {/* Link */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8a8a8a] font-sans font-[400] mb-2">
                    Link para Compartilhar
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={compartilhadoData.link}
                      readOnly
                      className="flex-1 px-4 py-3 border border-[#E0DDD8] rounded-[8px] bg-[#F9F8F5] font-serif font-[300] text-sm"
                    />
                    <button
                      onClick={() => copiarParaClipboard(compartilhadoData.link)}
                      className="px-4 py-3 bg-[#C9A84C] text-white rounded-[8px] font-sans font-[500] text-xs uppercase tracking-wider hover:bg-[#B8971F] transition-all"
                    >
                      Copiar
                    </button>
                  </div>
                </div>

                {/* Mensagem WhatsApp */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8a8a8a] font-sans font-[400] mb-2">
                    Mensagem para WhatsApp
                  </label>
                  <textarea
                    value={compartilhadoData.mensagem_whatsapp}
                    readOnly
                    className="w-full px-4 py-3 border border-[#E0DDD8] rounded-[8px] bg-[#F9F8F5] font-serif font-[300] text-sm resize-none"
                    rows="5"
                  />
                  <button
                    onClick={() => copiarParaClipboard(compartilhadoData.mensagem_whatsapp)}
                    className="w-full mt-2 px-4 py-2 bg-[#25D366] text-white rounded-[8px] font-sans font-[500] text-xs uppercase tracking-wider hover:bg-[#1BA653] transition-all"
                  >
                    Copiar Mensagem WhatsApp
                  </button>
                </div>

                {/* Validade */}
                <div className="bg-[#F9F8F5] p-3 rounded-[8px]">
                  <p className="text-xs font-sans font-[300] text-[#8a8a8a]">
                    <strong>Válido até:</strong> {new Date(compartilhadoData.expira_em).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowCompartilhadoModal(false)
                  setCompartilhadoData(null)
                }}
                className="w-full px-6 py-2.5 bg-[#F0EDE8] text-[#1B2A4A] rounded-[8px] font-sans font-[500] text-xs uppercase tracking-wider hover:bg-[#E0DDD8] transition-all"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
