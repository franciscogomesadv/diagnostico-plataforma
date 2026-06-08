import express from 'express';

const router = express.Router();

// Mock data (depois será integrado com Google Sheets)
let clientes = [
  {
    id: 'CLI-001',
    nome_empresa: 'Clara Associados',
    email_responsavel: 'frangomes@claraassociados.com',
    status: 'Em Progresso',
    data_criacao: '2026-06-04',
    ultima_atualizacao: '2026-06-04'
  },
  {
    id: 'CLI-002',
    nome_empresa: 'Empresa XYZ',
    email_responsavel: 'contato@xyz.com',
    status: 'Diagnóstico Completo',
    data_criacao: '2026-06-05',
    ultima_atualizacao: '2026-06-10'
  }
];

// GET: listar todos os clientes
router.get('/', (req, res) => {
  res.json({ success: true, clientes });
});

// GET: cliente por ID
router.get('/:id', (req, res) => {
  const cliente = clientes.find(c => c.id === req.params.id);
  if (!cliente) {
    return res.status(404).json({ error: 'Cliente não encontrado' });
  }
  res.json({ success: true, cliente });
});

// POST: criar novo cliente
router.post('/', (req, res) => {
  const { nome_empresa, email_responsavel } = req.body;

  if (!nome_empresa || !email_responsavel) {
    return res.status(400).json({ error: 'Nome da empresa e email são obrigatórios' });
  }

  const novoCliente = {
    id: `CLI-${Date.now()}`,
    nome_empresa,
    email_responsavel,
    status: 'Não iniciado',
    data_criacao: new Date().toISOString().split('T')[0],
    ultima_atualizacao: new Date().toISOString().split('T')[0]
  };

  clientes.push(novoCliente);
  res.status(201).json({ success: true, cliente: novoCliente });
});

// PUT: atualizar cliente
router.put('/:id', (req, res) => {
  const cliente = clientes.find(c => c.id === req.params.id);
  if (!cliente) {
    return res.status(404).json({ error: 'Cliente não encontrado' });
  }

  Object.assign(cliente, req.body, {
    ultima_atualizacao: new Date().toISOString().split('T')[0]
  });

  res.json({ success: true, cliente });
});

// DELETE: deletar cliente
router.delete('/:id', (req, res) => {
  clientes = clientes.filter(c => c.id !== req.params.id);
  res.json({ success: true, message: 'Cliente deletado' });
});

export default router;
