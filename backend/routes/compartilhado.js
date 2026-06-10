import express from 'express';
import crypto from 'crypto';

const router = express.Router();

// Mock: armazenar tokens de compartilhamento com expiração
// Em produção, usar banco de dados
let compartilhamentos = [];

// POST: gerar novo link de compartilhamento
// Requer autenticação JWT (do middleware)
router.post('/gerar-link', (req, res) => {
  const { diagnostico_id } = req.body;

  if (!diagnostico_id) {
    return res.status(400).json({ error: 'diagnostico_id é obrigatório' });
  }

  // Gerar token único (24 caracteres hexadecimais)
  const token = crypto.randomBytes(12).toString('hex');

  // Validade: 48 horas
  const expira_em = new Date(Date.now() + 48 * 60 * 60 * 1000);

  const compartilhamento = {
    token,
    diagnostico_id,
    criado_em: new Date(),
    expira_em,
    ativo: true
  };

  compartilhamentos.push(compartilhamento);

  const link = `https://diagnostico-plataforma.vercel.app/responder/${token}`;
  const mensagem_whatsapp = `Olá! Preencha o questionário de governança aqui:\n\n${link}\n\nVálido por 48 horas.`;

  res.json({
    success: true,
    token,
    link,
    expira_em,
    mensagem_whatsapp
  });
});

// GET: validar token e retornar diagnóstico + perguntas (sem autenticação)
router.get('/validar/:token', (req, res) => {
  const { token } = req.params;

  const compartilhamento = compartilhamentos.find(c => c.token === token);

  if (!compartilhamento) {
    return res.status(404).json({ error: 'Link não encontrado ou expirado' });
  }

  if (!compartilhamento.ativo || new Date() > compartilhamento.expira_em) {
    compartilhamento.ativo = false;
    return res.status(410).json({ error: 'Link expirou. Solicite um novo link ao responsável.' });
  }

  // Mock: retornar dados do diagnóstico e perguntas padrão
  const perguntas = [
    {
      id: '0.1.1',
      bloco: 0,
      categoria: 'Identificação',
      titulo: 'Qual é o nome da empresa/organização?',
      tipo: 'aberta',
      obrigatoria: true
    },
    {
      id: '0.1.2',
      bloco: 0,
      categoria: 'Identificação',
      titulo: 'Qual é a sigla ou nome fantasia?',
      tipo: 'aberta',
      obrigatoria: false
    },
    {
      id: '0.2.1',
      bloco: 0,
      categoria: 'Estrutura Legal',
      titulo: 'A empresa possui documentação de Governança Corporativa?',
      tipo: 'multipla_escolha',
      opcoes: ['Sim, bem documentada', 'Parcialmente', 'Não possui'],
      obrigatoria: true
    },
    {
      id: '1.1.1',
      bloco: 1,
      categoria: 'Código de Conduta',
      titulo: 'Existe um Código de Conduta formalizado?',
      tipo: 'multipla_escolha',
      opcoes: ['Sim, documentado e comunicado', 'Em desenvolvimento', 'Não existe'],
      obrigatoria: true
    },
    {
      id: '1.2.1',
      bloco: 1,
      categoria: 'Código de Conduta',
      titulo: 'Descreva os principais princípios éticos da organização:',
      tipo: 'aberta',
      obrigatoria: false
    }
  ];

  res.json({
    success: true,
    diagnostico_id: compartilhamento.diagnostico_id,
    token,
    expira_em: compartilhamento.expira_em,
    perguntas
  });
});

// POST: salvar respostas via token (sem autenticação JWT)
router.post('/salvar-resposta/:token', (req, res) => {
  const { token } = req.params;
  const { pergunta_id, resposta_valor, observacoes } = req.body;

  const compartilhamento = compartilhamentos.find(c => c.token === token);

  if (!compartilhamento) {
    return res.status(404).json({ error: 'Link não encontrado' });
  }

  if (!compartilhamento.ativo || new Date() > compartilhamento.expira_em) {
    compartilhamento.ativo = false;
    return res.status(410).json({ error: 'Link expirou' });
  }

  if (!pergunta_id || resposta_valor === undefined) {
    return res.status(400).json({ error: 'pergunta_id e resposta_valor são obrigatórios' });
  }

  // Mock: em produção, salvar no banco de dados
  // Por enquanto, vamos chamar o endpoint de respostas autenticado
  // (Na implementação real, teríamos acesso direto ao storage)

  res.json({
    success: true,
    resposta: {
      diagnostico_id: compartilhamento.diagnostico_id,
      pergunta_id,
      resposta_valor,
      observacoes: observacoes || '',
      data_resposta: new Date().toLocaleString('pt-BR')
    }
  });
});

// GET: listar compartilhamentos ativos (apenas para depuração, remover em produção)
router.get('/admin/listar', (req, res) => {
  const ativos = compartilhamentos.filter(c => c.ativo && new Date() <= c.expira_em);
  res.json({ compartilhamentos: ativos });
});

export default router;
