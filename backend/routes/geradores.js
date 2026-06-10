import express from 'express';
import { gerarCodigoCoduta, gerarRegimentoInterno, gerarPoliticasInternas } from '../utils/gerador-documentos.js';

const router = express.Router();

// POST: gerar os 3 documentos
// Requer autenticação JWT
router.post('/gerar/:diagnosticoId', async (req, res) => {
  try {
    const { diagnosticoId } = req.params;

    // Mock: buscar respostas do diagnóstico
    // Em produção, faria uma query ao banco
    const respostas = {
      diagnostico_id: diagnosticoId,
      cliente: {
        nome_empresa: 'Clara Associados',
        cnpj: '12.345.678/0001-90',
        porte: 'PME',
        setor: 'Serviços Jurídicos',
        funcionarios: 45,
        estrutura: 'Híbrida'
      },
      missao: 'Prestar serviços jurídicos de excelência com integridade e inovação',
      valores: [
        'Integridade e ética profissional',
        'Inovação em soluções jurídicas',
        'Respeito e inclusão',
        'Excelência no atendimento',
        'Responsabilidade social'
      ],
      riscos_eticos: ['Conflito de interesse', 'Vazamento de dados de clientes', 'Pressão por resultados'],
      riscos_operacionais: ['Falta de controle de jornada', 'Segurança de informação fraca', 'Assédio não documentado'],
      tem_lgpd: true,
      tem_home_office: true,
      tem_trabalho_remoto: true,
      jornada_padrao: '9h às 18h',
      intervalo: '1 hora',
      horas_extras_frequentes: true,
      problemas_frequentes: ['Atrasos ocasionais', 'Falta de documentação de afastamentos'],
      principais_desafios: ['Governança documental fraca', 'Falta de políticas formalizadas', 'Compliance com LGPD'],
      respostas: [
        { id: '0.1.1', pergunta: 'Qual é o nome da empresa?', resposta: 'Clara Associados LTDA' },
        { id: '0.1.2', pergunta: 'Qual é a sigla?', resposta: 'Clara' },
        { id: '0.2.1', pergunta: 'Existe Código de Conduta?', resposta: 'Parcialmente' }
      ]
    };

    // Gerar os 3 documentos
    const codigo = await gerarCodigoCoduta(respostas);
    const regimento = await gerarRegimentoInterno(respostas);
    const politicas = await gerarPoliticasInternas(respostas);

    res.json({
      success: true,
      diagnostico_id: diagnosticoId,
      documentos: {
        codigo_conduta: {
          titulo: 'Código de Conduta e Ética',
          arquivo: 'codigo-conduta-' + diagnosticoId + '.docx',
          bytes: codigo.length,
          url: `/api/geradores/download/${diagnosticoId}/codigo`
        },
        regimento_interno: {
          titulo: 'Regimento Interno',
          arquivo: 'regimento-interno-' + diagnosticoId + '.docx',
          bytes: regimento.length,
          url: `/api/geradores/download/${diagnosticoId}/regimento`
        },
        politicas_internas: {
          titulo: 'Políticas Internas',
          arquivo: 'politicas-internas-' + diagnosticoId + '.docx',
          bytes: politicas.length,
          url: `/api/geradores/download/${diagnosticoId}/politicas`
        }
      },
      mensagem: 'Documentos gerados com sucesso'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao gerar documentos', message: err.message });
  }
});

export default router;
