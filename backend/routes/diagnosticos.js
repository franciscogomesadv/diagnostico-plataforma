import express from 'express';

const router = express.Router();

// Mock data
let diagnosticos = [
  {
    id: 'DG-001',
    cliente_id: 'CLI-001',
    etapa_atual: 'Bloco 0',
    progresso: 60,
    data_inicio: '2026-06-04',
    data_conclusao: null,
    modulos_solicitados: ['COD', 'REG', 'POL']
  },
  {
    id: 'DG-002',
    cliente_id: 'CLI-002',
    etapa_atual: 'Completo',
    progresso: 100,
    data_inicio: '2026-06-05',
    data_conclusao: '2026-06-10',
    modulos_solicitados: ['COD', 'REG', 'POL']
  }
];

// GET: listar diagnósticos de um cliente
router.get('/cliente/:cliente_id', (req, res) => {
  const diagnosticos_cliente = diagnosticos.filter(d => d.cliente_id === req.params.cliente_id);
  res.json({ success: true, diagnosticos: diagnosticos_cliente });
});

// GET: diagnóstico por ID
router.get('/:id', (req, res) => {
  const diagnostico = diagnosticos.find(d => d.id === req.params.id);
  if (!diagnostico) {
    return res.status(404).json({ error: 'Diagnóstico não encontrado' });
  }
  res.json({ success: true, diagnostico });
});

// POST: criar novo diagnóstico
router.post('/', (req, res) => {
  const { cliente_id, modulos_solicitados } = req.body;

  if (!cliente_id) {
    return res.status(400).json({ error: 'cliente_id é obrigatório' });
  }

  const novoDiagnostico = {
    id: `DG-${Date.now()}`,
    cliente_id,
    etapa_atual: 'Bloco 0',
    progresso: 0,
    data_inicio: new Date().toISOString().split('T')[0],
    data_conclusao: null,
    modulos_solicitados: modulos_solicitados || ['COD', 'REG', 'POL']
  };

  diagnosticos.push(novoDiagnostico);
  res.status(201).json({ success: true, diagnostico: novoDiagnostico });
});

// PUT: atualizar diagnóstico (progresso, etapa)
router.put('/:id', (req, res) => {
  const diagnostico = diagnosticos.find(d => d.id === req.params.id);
  if (!diagnostico) {
    return res.status(404).json({ error: 'Diagnóstico não encontrado' });
  }

  const { etapa_atual, progresso } = req.body;

  if (etapa_atual) diagnostico.etapa_atual = etapa_atual;
  if (progresso !== undefined) diagnostico.progresso = progresso;

  // Se completar (100%), registrar data de conclusão
  if (progresso === 100) {
    diagnostico.data_conclusao = new Date().toISOString().split('T')[0];
    diagnostico.etapa_atual = 'Completo';
  }

  res.json({ success: true, diagnostico });
});

export default router;
