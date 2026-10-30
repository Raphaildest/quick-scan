import { Question } from '../types/assessment';

export const questionsBank: Question[] = [
  // A. Fundamentos de Qualidade
  {
    id: 1,
    code: 'Q1',
    dimension: 'fundamentos',
    dimensionLabel: 'Fundamentos de Qualidade',
    title: 'Priorização baseada em risco',
    statement: 'Uma funcionalidade de transferência bancária será alterada. O prazo de testes é limitado. Qual estratégia você adotaria?',
    options: [
      { id: 'A', text: 'Executar todos os testes existentes na mesma prioridade.' },
      { id: 'B', text: 'Priorizar cenários considerando impacto, probabilidade de falha, criticidade e áreas afetadas.' },
      { id: 'C', text: 'Executar apenas testes de interface.' },
      { id: 'D', text: 'Executar somente os testes automatizados.' }
    ],
    correctAnswer: 'B',
    explanation: 'A gestão de testes baseada em risco (RBT) balanceia tempo e esforço focando em áreas de maior severidade e impacto ao negócio.',
    weight: 1.0
  },
  {
    id: 2,
    code: 'Q2',
    dimension: 'fundamentos',
    dimensionLabel: 'Fundamentos de Qualidade',
    title: 'Pirâmide de testes',
    statement: 'Um fluxo possui validações que podem ser realizadas tanto via API quanto via interface Web. Qual estratégia tende a ser mais eficiente?',
    options: [
      { id: 'A', text: 'Automatizar tudo pela UI.' },
      { id: 'B', text: 'Automatizar tudo manualmente primeiro.' },
      { id: 'C', text: 'Colocar o máximo de validações adequadas nas camadas inferiores e manter na UI principalmente o necessário para validar a jornada.' },
      { id: 'D', text: 'Duplicar os mesmos testes em API e UI.' }
    ],
    correctAnswer: 'C',
    explanation: 'Testes de API são ordens de grandeza mais rápidos e resilientes que testes de UI, mitigando instabilidades na esteira.',
    weight: 1.0
  },
  {
    id: 3,
    code: 'Q3',
    dimension: 'fundamentos',
    dimensionLabel: 'Fundamentos de Qualidade',
    title: 'Estratégia de Regressão',
    statement: 'Um sistema possui 600 cenários regressivos manuais. Qual deveria ser o primeiro passo antes de automatizá-los?',
    options: [
      { id: 'A', text: 'Automatizar todos diretamente.' },
      { id: 'B', text: 'Selecionar os mais fáceis.' },
      { id: 'C', text: 'Analisar criticidade, frequência, estabilidade, valor, redundância e adequação à automação.' },
      { id: 'D', text: 'Automatizar apenas os cenários felizes.' }
    ],
    correctAnswer: 'C',
    explanation: 'Automatizar cenários redundantes ou instáveis gera débito técnico massivo. A curadoria prévia é mandatória.',
    weight: 1.0
  },
  {
    id: 4,
    code: 'Q4',
    dimension: 'fundamentos',
    dimensionLabel: 'Fundamentos de Qualidade',
    title: 'Bug em produção (Fuga)',
    statement: 'Uma funcionalidade passou por todos os testes definidos, mas apresentou defeito crítico em produção. Qual ação gera mais aprendizado?',
    options: [
      { id: 'A', text: 'Aumentar simplesmente a quantidade de testes sem critério.' },
      { id: 'B', text: 'Investigar a causa da fuga (Root Cause), identificar a lacuna de cobertura e atualizar estratégia/testes.' },
      { id: 'C', text: 'Responsabilizar quem executou os testes.' },
      { id: 'D', text: 'Adicionar o caso exclusivamente à regressão manual.' }
    ],
    correctAnswer: 'B',
    explanation: 'Post-mortems e RCA (Root Cause Analysis) sistemáticos fortalecem o processo contínuo de qualidade.',
    weight: 1.0
  },

  // B. Automação de Testes
  {
    id: 5,
    code: 'Q5',
    dimension: 'automacao',
    dimensionLabel: 'Automação de Testes',
    title: 'Escolha de automação',
    statement: 'Qual cenário apresenta maior potencial inicial para automação?',
    options: [
      { id: 'A', text: 'Processo executado uma vez por ano.' },
      { id: 'B', text: 'Fluxo que muda de regras semanalmente.' },
      { id: 'C', text: 'Regressão crítica executada em todas as releases.' },
      { id: 'D', text: 'Teste exploratório sem comportamento previamente definido.' }
    ],
    correctAnswer: 'C',
    explanation: 'Automação exige ROI: fluxos repetitivos, estáveis e de alta criticidade fornecem feedback instantâneo de valor.',
    weight: 1.0
  },
  {
    id: 6,
    code: 'Q6',
    dimension: 'automacao',
    dimensionLabel: 'Automação de Testes',
    title: 'Flaky tests (Instabilidade)',
    statement: 'Uma suíte apresenta falhas intermitentes. Qual seria sua primeira abordagem?',
    options: [
      { id: 'A', text: 'Aumentar todos os sleeps.' },
      { id: 'B', text: 'Executar novamente até passar.' },
      { id: 'C', text: 'Analisar sincronização, dependências, massa, ambiente e isolamento dos testes.' },
      { id: 'D', text: 'Remover sumariamente os testes que falham.' }
    ],
    correctAnswer: 'C',
    explanation: 'Flakiness é sintoma de problemas estruturais de sincronização (esperas implícitas/explícitas) ou poluição de estado.',
    weight: 1.0
  },
  {
    id: 7,
    code: 'Q7',
    dimension: 'automacao',
    dimensionLabel: 'Automação de Testes',
    title: 'Espera fixa (Sleeps)',
    statement: 'Você encontra no código: click("Entrar"); sleep(10); click("Continuar"). Qual seria a melhor melhoria?',
    options: [
      { id: 'A', text: 'Aumentar para sleep(20).' },
      { id: 'B', text: 'Criar uma espera explícita baseada na condição necessária para continuar (elemento visível/clicável).' },
      { id: 'C', text: 'Repetir o clique em loop sem delay.' },
      { id: 'D', text: 'Não alterar nada.' }
    ],
    correctAnswer: 'B',
    explanation: 'Esperas explícitas reduzem o tempo ocioso e tornam o teste resiliente a variações de latência do servidor.',
    weight: 1.0
  },
  {
    id: 8,
    code: 'Q8',
    dimension: 'automacao',
    dimensionLabel: 'Automação de Testes',
    title: 'Reuso de componentes',
    statement: 'Há 80 testes Web repetindo o código de login. O que você faria?',
    options: [
      { id: 'A', text: 'Manter, pois cada teste deve ser independente.' },
      { id: 'B', text: 'Criar um componente/keyword/método reutilizável ou fixture para a operação.' },
      { id: 'C', text: 'Copiar o código para uma nova classe.' },
      { id: 'D', text: 'Remover a verificação de login.' }
    ],
    correctAnswer: 'B',
    explanation: 'Padrões de design como Page Objects, Fixtures ou Composable Actions evitam manutenção dispersa em dezenas de arquivos.',
    weight: 1.0
  },
  {
    id: 9,
    code: 'Q9',
    dimension: 'automacao',
    dimensionLabel: 'Automação de Testes',
    title: 'API x UI em Cálculos',
    statement: 'Um cálculo financeiro complexo pode ser validado diretamente por API. A UI apenas apresenta o resultado. Onde concentraria os testes das regras de cálculo?',
    options: [
      { id: 'A', text: 'Exclusivamente na UI para garantir a visão do usuário final.' },
      { id: 'B', text: 'Principalmente na API/camada de serviço com matriz completa de valores, deixando na UI apenas a validação da apresentação.' },
      { id: 'C', text: 'Dividir 50% dos casos em cada camada de forma aleatória.' },
      { id: 'D', text: 'Apenas testes unitários do desenvolvedor, sem testes de QA.' }
    ],
    correctAnswer: 'B',
    explanation: 'Testar permutações e edge cases via API é mais rápido, determinístico e não sobrecarrega a infraestrutura de navegadores.',
    weight: 1.0
  },
  {
    id: 10,
    code: 'Q10',
    dimension: 'automacao',
    dimensionLabel: 'Automação de Testes',
    title: 'Seletores Resilientes',
    statement: 'Qual seletor tende a ser mais resiliente a mudanças cosméticas de layout?',
    options: [
      { id: 'A', text: '/html/body/div[2]/div[3]/button' },
      { id: 'B', text: '.button:nth-child(4)' },
      { id: 'C', text: '[data-testid="confirm-transfer"]' },
      { id: 'D', text: 'div > div > button' }
    ],
    correctAnswer: 'C',
    explanation: 'Atributos dedicados como data-testid desacoplam os testes de classes CSS e hierarquias mutáveis do DOM.',
    weight: 1.0
  },
  {
    id: 11,
    code: 'Q11',
    dimension: 'automacao',
    dimensionLabel: 'Automação de Testes',
    title: 'Independência de testes',
    statement: 'O Teste B depende de o Teste A ter sido executado com sucesso. Qual o principal problema dessa abordagem?',
    options: [
      { id: 'A', text: 'Gera dependência sequencial, impede paralelização e provoca efeito cascata de falsos negativos.' },
      { id: 'B', text: 'Não há problema, suítes devem sempre seguir uma ordem rígida.' },
      { id: 'C', text: 'Apenas o consumo de memória adicional.' },
      { id: 'D', text: 'Nenhuma ferramenta de automação moderna suporta essa dependência.' }
    ],
    correctAnswer: 'A',
    explanation: 'Testes atômicos e independentes garantem isolamento, execução paralela e diagnóstico preciso de falhas.',
    weight: 1.0
  },
  {
    id: 12,
    code: 'Q12',
    dimension: 'automacao',
    dimensionLabel: 'Automação de Testes',
    title: 'Interpretação de Cobertura',
    statement: 'A equipe afirma possuir "90% de automação". Qual informação adicional é mais importante para interpretar esse indicador?',
    options: [
      { id: 'A', text: 'Quais cenários estão cobertos, criticidade das jornadas e risco mitigado.' },
      { id: 'B', text: 'Quantidade total de linhas de código escritas no framework.' },
      { id: 'C', text: 'Quantos arquivos .robot ou .spec existem no repositório.' },
      { id: 'D', text: 'Número de commits realizados na semana.' }
    ],
    correctAnswer: 'A',
    explanation: '90% de cenários triviais não protege o core business. A qualidade e o risco coberto definem a eficácia real.',
    weight: 1.0
  },

  // C. Engenharia / Código
  {
    id: 13,
    code: 'Q13',
    dimension: 'engenharia',
    dimensionLabel: 'Engenharia / Código',
    title: 'Code Review de Automação',
    statement: 'Ao revisar um script com credenciais em texto puro, seletores absolutos e sleep(10), qual a prioridade de refatoração?',
    options: [
      { id: 'A', text: 'Apenas renomear as variáveis para português.' },
      { id: 'B', text: 'Parametrizar credenciais via variáveis de ambiente, substituir sleep por esperas explícitas e usar data-testid.' },
      { id: 'C', text: 'Aumentar o sleep para 20 segundos para evitar timeout.' },
      { id: 'D', text: 'Manter como está desde que passe na pipeline local.' }
    ],
    correctAnswer: 'B',
    explanation: 'Segurança, estabilidade de sincronismo e seletores semânticos são pilares de engenharia de software aplicada ao teste.',
    weight: 1.0
  },
  {
    id: 14,
    code: 'Q14',
    dimension: 'engenharia',
    dimensionLabel: 'Engenharia / Código',
    title: 'Manutenibilidade em Escala',
    statement: 'Qual característica é mais importante para uma suíte que terá milhares de cenários corporativos?',
    options: [
      { id: 'A', text: 'Velocidade de criação rápida sem seguir arquitetura.' },
      { id: 'B', text: 'Uso da biblioteca que foi lançada no último mês.' },
      { id: 'C', text: 'Arquitetura limpa, desacoplamento, reutilização de código e padrões bem documentados.' },
      { id: 'D', text: 'Colocar todo o fluxo em um único arquivo para não fragmentar.' }
    ],
    correctAnswer: 'C',
    explanation: 'Sem padrões claros e abstração adequada, suítes de grande porte colapsam pelo custo de manutenção.',
    weight: 1.0
  },
  {
    id: 15,
    code: 'Q15',
    dimension: 'engenharia',
    dimensionLabel: 'Engenharia / Código',
    title: 'Revisão de Código Gerado por IA',
    statement: 'Uma IA gerou uma automação aparentemente correta em um Pull Request. O que deve acontecer antes do merge?',
    options: [
      { id: 'A', text: 'Merge direto e imediato, pois código de IA não possui erros de sintaxe.' },
      { id: 'B', text: 'Revisão técnica criteriosa, validação de assertions, execução real e verificação de padrões do projeto.' },
      { id: 'C', text: 'Perguntar à mesma IA se o código dela está seguro.' },
      { id: 'D', text: 'Deletar o código e refazer 100% manualmente.' }
    ],
    correctAnswer: 'B',
    explanation: 'IA acelera a escrita, mas a responsabilidade técnica e o discernimento crítico são intransferíveis do engenheiro.',
    weight: 1.0
  },
  {
    id: 16,
    code: 'Q16',
    dimension: 'engenharia',
    dimensionLabel: 'Engenharia / Código',
    title: 'Eliminação de Duplicação',
    statement: 'Você encontra dezenas de scripts com pequenas variações do mesmo fluxo de transferência. Qual técnica aplicar?',
    options: [
      { id: 'A', text: 'Copiar e colar mais variações conforme novos produtos forem criados.' },
      { id: 'B', text: 'Aplicar Data-Driven Testing (DDT), parametrização e métodos compartilhados.' },
      { id: 'C', text: 'Deixar de testar as variações e focar em apenas uma.' },
      { id: 'D', text: 'Transformar tudo em testes manuais.' }
    ],
    correctAnswer: 'B',
    explanation: 'DDT desacopla massa de teste da lógica de automação, simplificando expansão e manutenção.',
    weight: 1.0
  },

  // D. CI/CD e Massa de Dados
  {
    id: 17,
    code: 'Q17',
    dimension: 'cicd_massa',
    dimensionLabel: 'CI/CD e Massa de Dados',
    title: 'Gates de Execução na Pipeline',
    statement: 'Em qual momento os testes automatizados deveriam ser executados?',
    options: [
      { id: 'A', text: 'Apenas antes do deploy em produção uma vez ao mês.' },
      { id: 'B', text: 'Apenas quando solicitado explicitamente por e-mail pelo gestor.' },
      { id: 'C', text: 'Em diferentes gates da pipeline conforme velocidade e criticidade (smoke no PR, regressivo noturno/merge).' },
      { id: 'D', text: 'Apenas localmente na máquina de quem desenvolveu.' }
    ],
    correctAnswer: 'C',
    explanation: 'Feedback contínuo segmentado: suítes ultrarrápidas no PR (shift-left) e baterias completas em pipelines programadas.',
    weight: 1.0
  },
  {
    id: 18,
    code: 'Q18',
    dimension: 'cicd_massa',
    dimensionLabel: 'CI/CD e Massa de Dados',
    title: 'Otimização de Pipeline Lenta',
    statement: 'Uma regressão automatizada está levando 4 horas para executar. Qual conjunto de medidas é mais adequado?',
    options: [
      { id: 'A', text: 'Paralelização de jobs, balanceamento de testes entre API/UI e eliminação de cenários redundantes.' },
      { id: 'B', text: 'Apenas aumentar o timeout do servidor de CI.' },
      { id: 'C', text: 'Desligar os testes na pipeline.' },
      { id: 'D', text: 'Executar a suíte a cada 3 meses.' }
    ],
    correctAnswer: 'A',
    explanation: 'Paralelização e distribuição inteligente de carga são fundamentais para manter o ciclo de entrega contínuo.',
    weight: 1.0
  },
  {
    id: 19,
    code: 'Q19',
    dimension: 'cicd_massa',
    dimensionLabel: 'CI/CD e Massa de Dados',
    title: 'Gestão Estrutural de Massa',
    statement: 'Uma suíte falha frequentemente porque os usuários utilizados já estão bloqueados ou com saldo zerado. Qual a solução sustentável?',
    options: [
      { id: 'A', text: 'Pedir manualmente novos logins ao suporte antes de cada execução.' },
      { id: 'B', text: 'Criação/reset automatizado de massa sob demanda via API ou scripts de banco dedicados para testes.' },
      { id: 'C', text: 'Remover validações de saldo do teste.' },
      { id: 'D', text: 'Usar apenas 1 login compartilhado por todo o time.' }
    ],
    correctAnswer: 'B',
    explanation: 'Massa de teste efêmera ou gerada via API antes da execução elimina concorrência e estado corrompido.',
    weight: 1.0
  },
  {
    id: 20,
    code: 'Q20',
    dimension: 'cicd_massa',
    dimensionLabel: 'CI/CD e Massa de Dados',
    title: 'Quality Gate e Bloqueio',
    statement: 'Um teste crítico da jornada principal de pagamento falha na pipeline de release. Qual a conduta esperada?',
    options: [
      { id: 'A', text: 'Bloquear a pipeline (Quality Gate), investigar imediatamente e não liberar sem correção ou deliberação formal.' },
      { id: 'B', text: 'Ignorar a falha e fazer o deploy para não atrasar o cronograma.' },
      { id: 'C', text: 'Comentar o teste que falhou para a pipeline ficar verde.' },
      { id: 'D', text: 'Desativar o CI/CD.' }
    ],
    correctAnswer: 'A',
    explanation: 'O propósito do Quality Gate é proteger o cliente final e a operação contra falhas catastróficas em produção.',
    weight: 1.0
  },

  // E. IA Aplicada à Qualidade
  {
    id: 21,
    code: 'Q21',
    dimension: 'ia_aplicada',
    dimensionLabel: 'IA Aplicada à Qualidade',
    title: 'Revisão de Cenários Gerados por IA',
    statement: 'Você recebe uma história de usuário e pede para uma IA gerar cenários de teste. Qual a melhor conduta?',
    options: [
      { id: 'A', text: 'Copiar integralmente os cenários e assumir como cobertura 100% garantida.' },
      { id: 'B', text: 'Não utilizar IA em nenhuma hipótese.' },
      { id: 'C', text: 'Revisar criticamente contra critérios de aceite, regras de negócio, riscos e lacunas contextuais.' },
      { id: 'D', text: 'Usar os testes sem ler porque a IA possui conhecimento superior.' }
    ],
    correctAnswer: 'C',
    explanation: 'LLMs geram excelentes hipóteses iniciais, mas desconhecem restrições de arquitetura e contexto específico da empresa.',
    weight: 1.0
  },
  {
    id: 22,
    code: 'Q22',
    dimension: 'ia_aplicada',
    dimensionLabel: 'IA Aplicada à Qualidade',
    title: 'Identificação de Alucinações',
    statement: 'A IA sugere uma regra de negócio que não consta na especificação. O que fazer?',
    options: [
      { id: 'A', text: 'Incluir nos testes porque a IA pode ter inferido uma regra oculta.' },
      { id: 'B', text: 'Validar a informação contra fonte confiável (Product Owner/documentação de arquitetura) antes de aceitar.' },
      { id: 'C', text: 'Descartar todos os outros cenários sugeridos pela IA.' },
      { id: 'D', text: 'Mudar o código da aplicação para atender à IA.' }
    ],
    correctAnswer: 'B',
    explanation: 'Discernimento para detectar e refutar alucinações é a principal competência de um engenheiro assistido por IA.',
    weight: 1.0
  },
  {
    id: 23,
    code: 'Q23',
    dimension: 'ia_aplicada',
    dimensionLabel: 'IA Aplicada à Qualidade',
    title: 'Engenharia de Prompt Contextualizado',
    statement: 'Qual estratégia de prompt tende a gerar cenários de teste mais assertivos?',
    options: [
      { id: 'A', text: '"Crie testes para essa tela."' },
      { id: 'B', text: 'Fornecer persona, critérios de aceite, stack técnica, formato esperado de saída e solicitar edge cases com priorização.' },
      { id: 'C', text: 'Colocar apenas uma imagem da tela sem texto explicativo.' },
      { id: 'D', text: 'Solicitar o máximo de cenários possíveis sem especificar regras de negócio.' }
    ],
    correctAnswer: 'B',
    explanation: 'Few-shot e contexto estruturado direcionam o modelo para respostas robustas e acionáveis.',
    weight: 1.0
  },
  {
    id: 24,
    code: 'Q24',
    dimension: 'ia_aplicada',
    dimensionLabel: 'IA Aplicada à Qualidade',
    title: 'Refatoração de Código Gerado por IA',
    statement: 'A IA gera um script que funciona, mas utiliza código duplicado, sleeps de 15 segundos e credenciais fixas. O QE deve:',
    options: [
      { id: 'A', text: 'Aceitar sem alterações porque o teste ficou verde.' },
      { id: 'B', text: 'Refatorar o código aplicando boas práticas de engenharia antes de submeter ao repositório.' },
      { id: 'C', text: 'Solicitar que outra IA reescreva sem olhar o resultado.' },
      { id: 'D', text: 'Colocar diretamente na esteira de produção.' }
    ],
    correctAnswer: 'B',
    explanation: 'O profissional é o responsável pela qualidade e manutenibilidade do código entregue no repositório.',
    weight: 1.0
  },
  {
    id: 25,
    code: 'Q25',
    dimension: 'ia_aplicada',
    dimensionLabel: 'IA Aplicada à Qualidade',
    title: 'Segurança e Uso Responsável de IA',
    statement: 'Quais fatores são cruciais antes de enviar informações do projeto para um modelo de IA público?',
    options: [
      { id: 'A', text: 'Verificar confidencialidade de dados (LGPD), segredos de código corporativo e conformidade com políticas de segurança da empresa.' },
      { id: 'B', text: 'Apenas checar se a internet está veloz.' },
      { id: 'C', text: 'Não há necessidade de cuidados com dados em modelos de linguagem.' },
      { id: 'D', text: 'Basta não colocar o próprio nome no prompt.' }
    ],
    correctAnswer: 'A',
    explanation: 'Vazamento de propriedade intelectual ou dados sensíveis de clientes é violação grave de compliance e segurança.',
    weight: 1.0
  },
  {
    id: 26,
    code: 'Q26',
    dimension: 'ia_aplicada',
    dimensionLabel: 'IA Aplicada à Qualidade',
    title: 'Papel do QE na Era dos Agentes Autônomos',
    statement: 'Com o avanço de agentes autônomos capazes de codificar e executar testes, qual a atribuição central do profissional de qualidade?',
    options: [
      { id: 'A', text: 'Apenas executar testes manuais de cliques na tela.' },
      { id: 'B', text: 'Definição estratégica, análise de riscos críticos, governança de qualidade, validação de saídas e arquitetura técnica.' },
      { id: 'C', text: 'Nenhuma, a qualidade será 100% autônoma sem supervisão humana.' },
      { id: 'D', text: 'Operar apenas planilhas de chamados.' }
    ],
    correctAnswer: 'B',
    explanation: 'O profissional migra do papel operacional de repetidor de scripts para arquiteto de qualidade e curador de soluções.',
    weight: 1.0
  },
  {
    id: 27,
    code: 'Q27',
    dimension: 'ia_aplicada',
    dimensionLabel: 'IA Aplicada à Qualidade',
    title: 'Aplicação Prática no Dia a Dia',
    statement: 'Qual das opções melhor exemplifica um uso de alto valor de IA em Quality Engineering?',
    options: [
      { id: 'A', text: 'Geração de dados sintéticos de teste, auxílio na escrita de expressões regulares e análise de logs de falha na pipeline.' },
      { id: 'B', text: 'Deixar a IA decidir quais releases vão para produção sem revisão.' },
      { id: 'C', text: 'Substituir toda a equipe de QA por prompts automáticos sem auditoria.' },
      { id: 'D', text: 'Utilizar IA apenas para corrigir gramática de e-mails.' }
    ],
    correctAnswer: 'A',
    explanation: 'Produtividade real é conquistada acelerando tarefas rotineiras de análise de logs, dados sintéticos e regex.',
    weight: 1.0
  },
  {
    id: 28,
    code: 'Q28',
    dimension: 'ia_aplicada',
    dimensionLabel: 'IA Aplicada à Qualidade',
    title: 'Critério de Desconfiança e Validação',
    statement: 'Qual situação exige maior ceticismo e validação cruzada do QE em relação à IA?',
    options: [
      { id: 'A', text: 'Quando a IA sugere cálculos regulatórios, regras financeiras críticas ou assertivas de segurança sem fonte citada.' },
      { id: 'B', text: 'Quando a IA formata uma tabela em Markdown.' },
      { id: 'C', text: 'Quando a IA gera uma lista de sinônimos.' },
      { id: 'D', text: 'Quando a IA escreve um comentário de código.' }
    ],
    correctAnswer: 'A',
    explanation: 'Valores financeiros e regras de compliance exigem validação determinística e auditoria rigorosa de fontes.',
    weight: 1.0
  }
];
