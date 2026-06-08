import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SelectorModulos from '../components/SelectorModulos'

export default function ModuloSelectorPage() {
  const { diagnosticoId } = useParams()
  const navigate = useNavigate()
  const [modulosConcluidos, setModulosConcluidos] = useState([])

  useEffect(() => {
    carregarModulosConcluidos()
  }, [diagnosticoId])

  const carregarModulosConcluidos = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/diagnosticos/${diagnosticoId}`)
      if (response.ok) {
        const data = await response.json()
        setModulosConcluidos(data.diagnostico?.modulos_concluidos || [])
      }
    } catch (err) {
      console.error('Erro ao carregar módulos concluídos:', err)
    }
  }

  return <SelectorModulos diagnosticoId={diagnosticoId} modulosConcluidos={modulosConcluidos} />
}
