import express from 'express';

const router = express.Router();

// Mock data: simulando as respostas no Google Sheets
let respostas = [
  {
    id: 'R-0001',
    diagnostico_id: 'DG-001',
    pergunta_id: '0.1.1',
    tipo_pergunta: 'aberta',
    resposta_valor: 'Clara Associados',
    observacoes: '',
    respondente: 'frangomes@claraassociados.com',
    data_resposta: '2026-06-04 10:30'
  },
  {
    id: 'R-0002',
    diagnostico_id: 'DG-001',
    pergunta_id: '0.1.2',
    tipo_pergunta: 'aberta',
    resposta_valor: 'Clara',
    observacoes: '',
    respondente: 'frangomes@claraassociados.com',
    data_resposta: '2026-06-04 10:32'
  }
];

// GET: respostas de um diagnóstico
router.get('/diagnostico/:diagnostico_id', (req, res) => {
  const respostas_diagnostico = respostas.filter(r => r.diagnostico_id === req.params.diagnostico_id);
  res.json({ success: true, respostas: respostas_diagnostico });
});

// GET: respostas por pergunta
router.get('/pergunta/:pergunta_id', (req, res) => {
  const respostas_pergunta = respostas.filter(r => r.pergunta_id === req.params.pergunta_id);
  res.json({ success: true, respostas: respostas_pergunta });
});

// POST: salvar uma resposta
router.post('/', (req, res) => {
  const { diagnostico_id, pergunta_id, tipo_pergunta, resposta_valor, respondente } = req.body;

  if (!diagnostico_id || !pergunta_id) {
    return res.status(400).json({ error: 'diagnostico_id e pergunta_id são obrigatórios' });
  }

  // Verificar se resposta já existe (para atualizar)
  const existente = respostas.find(r => r.diagnostico_id === diagnostico_id && r.pergunta_id === pergunta_id);

  if (existente) {
    existente.resposta_valor = resposta_valor;
    existente.data_resposta = new Date().toLocaleString('pt-BR');
    return res.json({ success: true, resposta: existente, updated: true });
  }

  // Criar nova resposta
  const novaResposta = {
    id: `R-${Date.now()}`,
    diagnostico_id,
    pergunta_id,
    tipo_pergunta,
    resposta_valor,
    observacoes: '',
    respondente: respondente || 'anônimo',
    data_resposta: new Date().toLocaleString('pt-BR')
  };

  respostas.push(novaResposta);
  res.status(201).json({ success: true, resposta: novaResposta, updated: false });
});

// PUT: atualizar resposta
router.put('/:id', (req, res) => {
  const resposta = respostas.find(r => r.id === req.params.id);
  if (!resposta) {
    return res.status(404).json({ error: 'Resposta não encontrada' });
  }

  Object.assign(resposta, req.body, {
    data_resposta: new Date().toLocaleString('pt-BR')
  });

  res.json({ success: true, resposta });
});

// POST: salvar múltiplas respostas (batch)
router.post('/batch/salvar', (req, res) => {
  const { respostas_array } = req.body;

  if (!Array.isArray(respostas_array)) {
    return res.status(400).json({ error: 'respostas_array deve ser um array' });
  }

  const salvas = respostas_array.map(resp => {
    const existente = respostas.find(r => r.diagnostico_id === resp.diagnostico_id && r.pergunta_id === resp.pergunta_id);

    if (existente) {
      existente.resposta_valor = resp.resposta_valor;
      existente.data_resposta = new Date().toLocaleString('pt-BR');
      return existente;
    } else {
      const nova = {
        id: `R-${Date.now()}-${Math.random()}`,
        ...resp,
        data_resposta: new Date().toLocaleString('pt-BR')
      };
      respostas.push(nova);
      return nova;
    }
  });

  res.json({ success: true, salvas: salvas.length, respostas: salvas });
});

export default router;
