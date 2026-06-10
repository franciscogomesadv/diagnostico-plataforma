// Motor de Geração de Documentos Inteligentes
// Baseado no Método do Arquiteto de Governança

import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, UnderlineType } from 'docx';

// ============================================================================
// CÓDIGO DE CONDUTA E ÉTICA
// ============================================================================

export async function gerarCodigoCoduta(dados) {
  const { cliente, missao, valores, riscos_eticos, principais_desafios } = dados;

  const sections = [];

  // CAPA
  sections.push(
    new Paragraph({
      text: 'CÓDIGO DE CONDUTA E ÉTICA',
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      bold: true,
      size: 28
    }),
    new Paragraph({
      text: cliente.nome_empresa,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      italics: true,
      size: 24
    })
  );

  // MENSAGEM DA LIDERAN­ÇA
  sections.push(
    new Paragraph({
      text: 'MENSAGEM DA LIDERAN­ÇA',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 100 }
    }),
    new Paragraph({
      text: `Caro Colaborador,\n\nEste Código de Conduta e Ética representa o compromisso de ${cliente.nome_empresa} com a integridade, a transparência e a responsabilidade. Não é simplesmente um conjunto de regras, mas uma declaração de quem somos e como nos comportamos frente ao mundo.\n\nCom ${cliente.funcionarios} colaboradores e atuando no setor de ${cliente.setor}, carregamos a responsabilidade de construir um ambiente de trabalho onde a ética não é uma obrigação, mas uma escolha cotidiana.\n\nCada uma de nossas ações reflete nossa reputação. Espero que este documento seja um farol para todos nós.`,
      spacing: { after: 200 }
    })
  );

  // PROPÓSITO E VALORES
  sections.push(
    new Paragraph({
      text: 'PROPÓSITO E VALORES',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 100 }
    }),
    new Paragraph({
      text: 'Missão',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    }),
    new Paragraph({
      text: missao || 'Missão não informada',
      spacing: { after: 100 }
    }),
    new Paragraph({
      text: 'Valores Fundamentais',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    })
  );

  valores.forEach((valor, idx) => {
    sections.push(
      new Paragraph({
        text: `${idx + 1}. ${valor}`,
        spacing: { after: 50 }
      })
    );
  });

  // PRINCÍPIOS ÉTICOS
  sections.push(
    new Paragraph({
      text: '\nPRINCÍPIOS ÉTICOS FUNDAMENTAIS',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 100 }
    }),
    new Paragraph({
      text: 'Integridade como Fundação',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    }),
    new Paragraph({
      text: 'A integridade é o fundamento de todas as nossas ações. Cada colaborador é responsável por agir com honestidade, mesmo quando ninguém está observando. Não toleramos desvios éticos, independentemente da pressão ou do ganho imediato.',
      spacing: { after: 100 }
    }),
    new Paragraph({
      text: 'Respeito à Dignidade Humana',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    }),
    new Paragraph({
      text: 'Todo colaborador, cliente, fornecedor e parceiro merece ser tratado com respeito e dignidade. Discriminação, assédio de qualquer tipo e desrespeito são condutas gravíssimas nesta organização.',
      spacing: { after: 100 }
    }),
    new Paragraph({
      text: 'Conformidade Legal',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    }),
    new Paragraph({
      text: 'O cumprimento de leis e regulamentações é inegociável. Neste setor, destacamos a importância de conformidade com Lei Geral de Proteção de Dados (LGPD), legislação anticorrupção e normas de segurança.',
      spacing: { after: 100 }
    })
  );

  // DIRETRIZES DE CONDUTA
  sections.push(
    new Paragraph({
      text: 'DIRETRIZES DE CONDUTA',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 100 }
    }),
    new Paragraph({
      text: 'Relacionamento Interno',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    }),
    new Paragraph({
      text: '• Respeito mútuo entre colaboradores\n• Zero tolerância a assédio moral ou sexual\n• Inclusão e valorização da diversidade\n• Comunicação clara e respeitosa\n• Resolução construtiva de conflitos',
      spacing: { after: 100 }
    }),
    new Paragraph({
      text: 'Relacionamento Externo',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    }),
    new Paragraph({
      text: '• Honestidade em todas as transações\n• Negociação justa com fornecedores\n• Qualidade e transparência com clientes\n• Conformidade com autoridades públicas',
      spacing: { after: 100 }
    }),
    new Paragraph({
      text: 'Uso de Recursos da Empresa',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    }),
    new Paragraph({
      text: '• Uso apropriado de equipamentos e infraestrutura\n• Dedicação ao trabalho durante horas de expediente\n• Sigilo profissional obrigatório\n• Proteção de dados e informações sensíveis',
      spacing: { after: 100 }
    }),
    new Paragraph({
      text: 'Conflitos de Interesse',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    }),
    new Paragraph({
      text: 'Conflitos de interesse devem ser comunicados imediatamente à administração. Exemplos incluem:\n• Relações comerciais com familiares\n• Investimentos em concorrentes\n• Presentes ou vantagens de clientes/fornecedores\n\nA transparência é essencial. Dúvidas? Consulte seu gestor ou o canal de compliance.',
      spacing: { after: 100 }
    })
  );

  // CANAL DE DENÚNCIA
  sections.push(
    new Paragraph({
      text: 'CANAL DE DENÚNCIA E PROTEÇÃO',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 100 }
    }),
    new Paragraph({
      text: 'Como Denunciar Irregularidades',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    }),
    new Paragraph({
      text: 'Se você presenciar qualquer violação deste Código, tem o direito e o dever de denunciar:\n\n1. Fale com seu gestor direto\n2. Contate o departamento de Recursos Humanos\n3. Envie um email para compliance@empresaexemplo.com.br\n4. Acesse nosso canal anônimo: www.canaldenuncias.com.br/empresa\n\nGarantimos:\n• Anonimato (se desejado)\n• Confidencialidade total\n• Não retaliação contra denunciantes de boa fé\n• Investigação justa e transparente',
      spacing: { after: 100 }
    })
  );

  // RESPONSABILIDADES
  sections.push(
    new Paragraph({
      text: 'RESPONSABILIDADES',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 100 }
    }),
    new Paragraph({
      text: 'Da Lideran­ça',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    }),
    new Paragraph({
      text: '• Estabelecer exemplo de comportamento ético\n• Criar ambiente seguro para denúncias\n• Apoiar treinamentos periódicos\n• Monitorar conformidade na sua área',
      spacing: { after: 100 }
    }),
    new Paragraph({
      text: 'Dos Colaboradores',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    }),
    new Paragraph({
      text: '• Cumprir este Código em todas as atividades\n• Denunciar irregularidades\n• Participar de treinamentos obrigatórios\n• Não conivência com desvios éticos',
      spacing: { after: 100 }
    }),
    new Paragraph({
      text: 'Da Empresa',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    }),
    new Paragraph({
      text: '• Garantir acesso a este Código\n• Proporcionar treinamentos regulares\n• Investigar denúncias com imparcialidade\n• Agir contra qualquer violação',
      spacing: { after: 100 }
    })
  );

  // CONSEQUÊNCIAS
  sections.push(
    new Paragraph({
      text: 'CONSEQUÊNCIAS PELO DESCUMPRIMENTO',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 100 }
    }),
    new Paragraph({
      text: 'Qualquer violação deste Código resultará em ações disciplinares proporcionais à gravidade da conduta, incluindo:\n\n• Advertência\n• Suspensão\n• Demissão por justa causa\n\nAs sanções estão detalhadas no Regimento Interno de ${cliente.nome_empresa} e seguem a legislação trabalhista vigente.',
      spacing: { after: 100 }
    })
  );

  // TERMO DE COMPROMISSO
  sections.push(
    new Paragraph({
      text: 'TERMO DE CIÊNCIA E COMPROMISSO',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 100 }
    }),
    new Paragraph({
      text: `Eu, _______________________, matrícula ________, declaro:\n\n• Ter recebido uma cópia deste Código de Conduta e Ética\n• Ter lido e compreendido todas as suas disposições\n• Concordo em cumprir integralmente todas as normas contidas neste documento\n• Entendo que violações resultarão em ações disciplinares\n• Comprometo-me a denunciar qualquer irregularidade que presenciar\n\nAssinatura: _________________________ Data: _____/_____/_______\n\nTestemunha (RH): _________________________ Data: _____/_____/_______`,
      spacing: { after: 200 }
    })
  );

  const doc = new Document({
    sections: [
      {
        children: sections
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  return buffer;
}

// ============================================================================
// REGIMENTO INTERNO
// ============================================================================

export async function gerarRegimentoInterno(dados) {
  const { cliente, jornada_padrao, intervalo, problemas_frequentes } = dados;

  const sections = [];

  sections.push(
    new Paragraph({
      text: 'REGIMENTO INTERNO',
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      bold: true,
      size: 28
    }),
    new Paragraph({
      text: cliente.nome_empresa,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      italics: true,
      size: 24
    })
  );

  // CAP 1: ADMISSÃO
  sections.push(
    new Paragraph({
      text: 'CAPÍTULO 1: DA ADMISSÃO E DO CONTRATO DE TRABALHO',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 100 }
    }),
    new Paragraph({
      text: 'Documentos Necessários',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    }),
    new Paragraph({
      text: 'Todo candidato admitido deve fornecer:\n• Identidade e CPF\n• Comprovante de endereço\n• Carteira de Trabalho\n• Título de Eleitor\n• Certificado de Reservista (homens)\n• Exame médico admissional\n• Referências profissionais',
      spacing: { after: 100 }
    }),
    new Paragraph({
      text: 'Período de Experiência',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    }),
    new Paragraph({
      text: 'Todo novo colaborador passa por período de experiência de 90 dias, durante o qual:\n• Pode ser desligado a qualquer momento\n• Deve cumprir todas as normas deste Regimento\n• Está sujeito às mesmas regras de jornada e faltas\n• Receberá feedback de desempenho\n• Ao final, será formalizado ou desligado',
      spacing: { after: 100 }
    }),
    new Paragraph({
      text: 'Termo de Ciência',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    }),
    new Paragraph({
      text: 'No ato da admissão, o colaborador recebe uma cópia deste Regimento e assina Termo de Ciência e Concordância, comprometendo-se a cumprir todas as disposições nele contidas.',
      spacing: { after: 100 }
    })
  );

  // CAP 2: JORNADA DE TRABALHO
  sections.push(
    new Paragraph({
      text: 'CAPÍTULO 2: DA JORNADA DE TRABALHO',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 100 }
    }),
    new Paragraph({
      text: 'Horários Padrão',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    }),
    new Paragraph({
      text: `A jornada padrão de trabalho é de ${jornada_padrao}, totalizando 8 horas diárias e 40 horas semanais, de segunda a sexta-feira.\n\nHorários especiais podem ser solicitados ao gestor, sujeito à aprovação da administração.`,
      spacing: { after: 100 }
    }),
    new Paragraph({
      text: 'Intervalos',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    }),
    new Paragraph({
      text: `Todo colaborador tem direito a ${intervalo} de intervalo para repouso e alimentação, conforme legislação trabalhista. Este intervalo:\n• Não é computado como tempo de trabalho\n• Deve ser respeitado sem exceções\n• Não pode ser acumulado\n• Pode ser compensado por decisão da administração em casos excepcionais`,
      spacing: { after: 100 }
    }),
    new Paragraph({
      text: 'Controle de Ponto',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    }),
    new Paragraph({
      text: 'O ponto é registrado diariamente através de sistema eletrônico. Colaborador é responsável por:\n• Bater ponto na chegada e saída\n• Informar gestora qualquer inconsistência\n• Não permitir que outros batam ponto por ele (crime)',
      spacing: { after: 100 }
    })
  );

  // CAP 3: DIREITOS E DEVERES
  sections.push(
    new Paragraph({
      text: 'CAPÍTULO 3: DOS DIREITOS, DEVERES E PROIBIÇÕES',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 100 }
    }),
    new Paragraph({
      text: 'Direitos do Colaborador',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    }),
    new Paragraph({
      text: '• Receber salário em dia\n• Ambiente de trabalho seguro e respeitoso\n• Férias remuneradas (30 dias)\n• 13º salário\n• Descanso semanal remunerado\n• Auxílio quando previsto em lei\n• Liberdade de expressão dentro dos limites profissionais',
      spacing: { after: 100 }
    }),
    new Paragraph({
      text: 'Deveres do Colaborador',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    }),
    new Paragraph({
      text: '• Ser assíduo e pontual\n• Cumprir suas atribuições com qualidade\n• Obedecer às ordens de gestores\n• Manter sigilo profissional\n• Tratar colegas e clientes com respeito\n• Cuidar do patrimônio da empresa\n• Participar de treinamentos obrigatórios',
      spacing: { after: 100 }
    }),
    new Paragraph({
      text: 'Condutas Vedadas (Proibições)',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    }),
    new Paragraph({
      text: '• Retirar material da empresa sem autorização\n• Usar equipamentos ou internet para fins pessoais\n• Estar embriagado ou sob efeito de drogas\n• Portar armas de qualquer tipo\n• Promover desordem ou desrespeito\n• Negligência grave nas funções\n• Roubo, fraude ou falsidade\n• Qualquer forma de assédio\n• Desrespeito à hierarquia',
      spacing: { after: 100 }
    })
  );

  // CAP 4: AUSÊNCIAS E ATRASOS
  sections.push(
    new Paragraph({
      text: 'CAPÍTULO 4: DAS AUSÊNCIAS, ATRASOS E ATESTADOS',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 100 }
    }),
    new Paragraph({
      text: 'Atrasos',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    }),
    new Paragraph({
      text: 'Atrasos devem ser comunicados ao gestor assim que possível. Atrasos frequentes podem resultar em advertência. Após 3 atrasos em 30 dias, será aberto processo disciplinar.',
      spacing: { after: 100 }
    }),
    new Paragraph({
      text: 'Faltas Justificadas',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    }),
    new Paragraph({
      text: 'São consideradas faltas justificadas:\n• Doença comprovada por atestado médico\n• Luto (até 3 dias)\n• Comparecimento obrigatório em juízo\n• Serviço militar obrigatório\n• Outras previstas em lei',
      spacing: { after: 100 }
    }),
    new Paragraph({
      text: 'Atestados Médicos',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    }),
    new Paragraph({
      text: 'Atestado médico deve ser entregue no máximo 2 dias úteis após o retorno. Atestados com mais de 2 dias consecutivos serão descontados em folha, salvo disposição legal. Atestados de médico de confiança da empresa não serão aceitos.',
      spacing: { after: 100 }
    })
  );

  // CAP 5: FÉRIAS
  sections.push(
    new Paragraph({
      text: 'CAPÍTULO 5: DAS FÉRIAS E AFASTAMENTOS',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 100 }
    }),
    new Paragraph({
      text: 'Férias',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    }),
    new Paragraph({
      text: 'Todo colaborador tem direito a 30 dias de férias remuneradas após 12 meses de trabalho. As férias são concessão da empresa, marcadas conforme necessidade operacional. Colaborador não pode recusar férias.',
      spacing: { after: 100 }
    })
  );

  // CAP 6: PENALIDADES
  sections.push(
    new Paragraph({
      text: 'CAPÍTULO 6: DAS PENALIDADES',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 100 }
    }),
    new Paragraph({
      text: 'As penalidades aplicáveis são:\n\n1. Advertência Verbal - para infrações leves\n2. Advertência Por Escrito - para infrações médias\n3. Suspensão - para infrações graves\n4. Demissão por Justa Causa - para infrações gravíssimas\n\nSerão observados os princípios de razoabilidade e proporcionalidade. Qualquer penalidade será comunicada por escrito ao colaborador.',
      spacing: { after: 100 }
    })
  );

  // CAP 7: DISPOSIÇÕES GERAIS
  sections.push(
    new Paragraph({
      text: 'CAPÍTULO 7: DISPOSIÇÕES GERAIS',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 100 }
    }),
    new Paragraph({
      text: `Este Regimento faz parte integrante do contrato de trabalho de todos os colaboradores e é vinculante. Casos omissos serão resolvidos pela diretoria, observando-se sempre a legislação trabalhista vigente (CLT).\n\nVigência: A partir de 10 de junho de 2026.`,
      spacing: { after: 200 }
    })
  );

  // TERMO DE CIÊNCIA
  sections.push(
    new Paragraph({
      text: 'TERMO DE CIÊNCIA E CONCORDÂNCIA',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 100 }
    }),
    new Paragraph({
      text: `Eu, _______________________, matrícula ________, declaro ter recebido uma cópia deste Regimento Interno, ter lido e compreendido todas as suas disposições, e concordo integralmente com as normas nele contidas.\n\nAssinatura: _________________________ Data: _____/_____/_______`,
      spacing: { after: 100 }
    })
  );

  const doc = new Document({
    sections: [
      {
        children: sections
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  return buffer;
}

// ============================================================================
// POLÍTICAS INTERNAS
// ============================================================================

export async function gerarPoliticasInternas(dados) {
  const { cliente, tem_lgpd, tem_home_office, principais_desafios } = dados;

  const sections = [];

  sections.push(
    new Paragraph({
      text: 'POLÍTICAS INTERNAS',
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      bold: true,
      size: 28
    }),
    new Paragraph({
      text: cliente.nome_empresa,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      italics: true,
      size: 24
    })
  );

  // POLÍTICA DE LGPD
  if (tem_lgpd) {
    sections.push(
      new Paragraph({
        text: 'POLÍTICA DE PROTEÇÃO DE DADOS PESSOAIS (LGPD)',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 }
      }),
      new Paragraph({
        text: 'Objetivo',
        heading: HeadingLevel.HEADING_3,
        spacing: { before: 100, after: 50 }
      }),
      new Paragraph({
        text: 'Estabelecer diretrizes para a coleta, armazenamento, processamento e compartilhamento de dados pessoais, garantindo conformidade com a Lei Geral de Proteção de Dados (Lei 13.709/2018).',
        spacing: { after: 100 }
      }),
      new Paragraph({
        text: 'Abrangência',
        heading: HeadingLevel.HEADING_3,
        spacing: { before: 100, after: 50 }
      }),
      new Paragraph({
        text: 'Esta política se aplica a todos os colaboradores, gestores, prestadores de serviço e qualquer pessoa que tenha acesso a dados pessoais de clientes, fornecedores ou colaboradores.',
        spacing: { after: 100 }
      }),
      new Paragraph({
        text: 'Definições-Chave',
        heading: HeadingLevel.HEADING_3,
        spacing: { before: 100, after: 50 }
      }),
      new Paragraph({
        text: '• Dado Pessoal: Qualquer informação que identifique ou possa identificar uma pessoa\n• Tratamento: Qualquer operação realizada com dados (coleta, armazenamento, processamento)\n• Titular: A pessoa natural a quem se referem os dados\n• Consentimento: Autorização expressa do titular',
        spacing: { after: 100 }
      }),
      new Paragraph({
        text: 'Diretrizes',
        heading: HeadingLevel.HEADING_3,
        spacing: { before: 100, after: 50 }
      }),
      new Paragraph({
        text: '1. Legitimidade: Dados só serão coletados com consentimento ou fundamentação legal\n2. Necessidade: Apenas dados necessários serão coletados\n3. Transparência: Titular será informado sobre uso de seus dados\n4. Segurança: Dados serão armazenados com proteção adequada\n5. Retenção: Dados serão deletados quando não mais necessários',
        spacing: { after: 100 }
      }),
      new Paragraph({
        text: 'Direitos do Titular',
        heading: HeadingLevel.HEADING_3,
        spacing: { before: 100, after: 50 }
      }),
      new Paragraph({
        text: '• Direito de acesso aos seus dados\n• Direito de solicitar correção\n• Direito de solicitar exclusão\n• Direito de portabilidade (receber dados em formato estruturado)',
        spacing: { after: 100 }
      }),
      new Paragraph({
        text: 'Violações e Sanções',
        heading: HeadingLevel.HEADING_3,
        spacing: { before: 100, after: 50 }
      }),
      new Paragraph({
        text: 'Qualquer violação desta política resultará em ações disciplinares, que podem incluir advertência, suspensão ou demissão. Casos de vazamento intencional serão denunciados às autoridades competentes.',
        spacing: { after: 200 }
      })
    );
  }

  // POLÍTICA DE HOME OFFICE
  if (tem_home_office) {
    sections.push(
      new Paragraph({
        text: 'POLÍTICA DE TRABALHO REMOTO (HOME OFFICE)',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 }
      }),
      new Paragraph({
        text: 'Objetivo',
        heading: HeadingLevel.HEADING_3,
        spacing: { before: 100, after: 50 }
      }),
      new Paragraph({
        text: 'Estabelecer critérios para realização de trabalho remoto, mantendo produtividade e conformidade normativa.',
        spacing: { after: 100 }
      }),
      new Paragraph({
        text: 'Elegibilidade',
        heading: HeadingLevel.HEADING_3,
        spacing: { before: 100, after: 50 }
      }),
      new Paragraph({
        text: 'Nem todas as funções são passíveis de home office. A solicitação deve ser analisada pelo gestor e aprovada pela administração, considerando:\n• Natureza da função\n• Maturidade profissional\n• Desempenho anterior',
        spacing: { after: 100 }
      }),
      new Paragraph({
        text: 'Horários e Disponibilidade',
        heading: HeadingLevel.HEADING_3,
        spacing: { before: 100, after: 50 }
      }),
      new Paragraph({
        text: 'Colaborador trabalhando remotamente deve:\n• Manter a mesma jornada de trabalho\n• Estar disponível durante horas de trabalho\n• Participar de reuniões presencialmente quando solicitado\n• Responder comunicações no prazo estipulado',
        spacing: { after: 100 }
      }),
      new Paragraph({
        text: 'Segurança da Informação',
        heading: HeadingLevel.HEADING_3,
        spacing: { before: 100, after: 50 }
      }),
      new Paragraph({
        text: '• Usar VPN para acessar sistemas\n• Não trabalhar em redes públicas de WiFi\n• Manter senha do acesso segura\n• Não compartilhar credenciais\n• Usar dispositivos com antivírus atualizado',
        spacing: { after: 200 }
      })
    );
  }

  // POLÍTICA DE SEGURANÇA DA INFORMAÇÃO
  sections.push(
    new Paragraph({
      text: 'POLÍTICA DE SEGURANÇA DA INFORMAÇÃO',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 100 }
    }),
    new Paragraph({
      text: 'Objetivo',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    }),
    new Paragraph({
      text: 'Proteger os ativos de informação da empresa contra acessos não autorizados, modificações ou perdas.',
      spacing: { after: 100 }
    }),
    new Paragraph({
      text: 'Senhas',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    }),
    new Paragraph({
      text: '• Mínimo 8 caracteres, letras + números + caracteres especiais\n• Trocar a cada 90 dias\n• Não compartilhar com colegas\n• Não anotar em papéis\n• Não usar datas de nascimento ou nomes',
      spacing: { after: 100 }
    }),
    new Paragraph({
      text: 'Uso de Sistemas',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    }),
    new Paragraph({
      text: '• Login automático é proibido\n• Desbloquear tela ao se afastar\n• Fazer logoff ao término do expediente\n• Denunciar acessos suspeitos\n• Usar dois fatores de autenticação quando disponível',
      spacing: { after: 200 }
    })
  );

  // POLÍTICA DE ASSÉDIO
  sections.push(
    new Paragraph({
      text: 'POLÍTICA DE COMBATE AO ASSÉDIO MORAL E SEXUAL',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 100 }
    }),
    new Paragraph({
      text: 'Objetivo',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    }),
    new Paragraph({
      text: 'Garantir um ambiente de trabalho livre de qualquer forma de assédio moral ou sexual.',
      spacing: { after: 100 }
    }),
    new Paragraph({
      text: 'Definição',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    }),
    new Paragraph({
      text: 'Assédio Moral: Exposição repetitiva e prolongada a situações humilhantes, constrangedoras ou degradantes.\nAssédio Sexual: Qualquer comportamento de conotação sexual não desejado ou consentido.',
      spacing: { after: 100 }
    }),
    new Paragraph({
      text: 'Exemplos',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    }),
    new Paragraph({
      text: '• Piadas ou comentários ofensivos\n• Isolamento proposital\n• Crítica excessiva sem justificativa\n• Pressão psicológica\n• Toques não consensuais\n• Convites ou propostas sexuais\n• Qualquer forma de coação sexual',
      spacing: { after: 100 }
    }),
    new Paragraph({
      text: 'Denúncia e Investigação',
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 }
    }),
    new Paragraph({
      text: '• Vítima pode denunciar ao RH ou canal anônimo\n• Investigação será sigilosa\n• Não toleramos retaliação contra denunciante\n• Se confirmado, o agressor será punido severamente',
      spacing: { after: 200 }
    })
  );

  sections.push(
    new Paragraph({
      text: '---',
      spacing: { before: 200, after: 100 }
    }),
    new Paragraph({
      text: 'Documento preparado de acordo com as legislações aplicáveis.',
      alignment: AlignmentType.CENTER,
      italics: true,
      spacing: { after: 100 }
    })
  );

  const doc = new Document({
    sections: [
      {
        children: sections
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  return buffer;
}
