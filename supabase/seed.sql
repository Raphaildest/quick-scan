-- ==============================================================================
-- QUICK SCAN — SEED DE DADOS SUPABASE
-- Hierarquias, 28 Questões Oficiais e Base de QAs Demonstrativa
-- ==============================================================================

-- 1. Inserir Hierarquias Organizacionais (Exemplo NTT DATA / Sicredi)
insert into public.hierarchies (id, gerencia, coordenacao, squad_name)
values
    ('11111111-1111-1111-1111-111111111111', 'Engenharia de Software VI', 'Investimentos e Previdência I', 'Squad Alpha - Renda Fixa'),
    ('22222222-2222-2222-2222-222222222222', 'Engenharia de Software VI', 'Investimentos e Previdência I', 'Squad Beta - Previdência Privada'),
    ('33333333-3333-3333-3333-333333333333', 'Engenharia de Software VI', 'Investimentos e Previdência II', 'Squad Gamma - Fundos de Investimento'),
    ('44444444-4444-4444-4444-444444444444', 'Engenharia de Software VII', 'Meios de Pagamentos I', 'Squad PIX Instantâneo'),
    ('55555555-5555-5555-5555-555555555555', 'Engenharia de Software VII', 'Meios de Pagamentos II', 'Squad Cartões e Cobrança')
on conflict (id) do nothing;

-- 2. Inserir Banco de 28 Questões
insert into public.questions (id, code, dimension, dimension_label, title, statement, options, correct_answer, explanation, weight)
values
-- A. Fundamentos de Qualidade
(1, 'Q1', 'fundamentos', 'Fundamentos de Qualidade', 'Priorização baseada em risco',
 'Uma funcionalidade de transferência bancária será alterada. O prazo de testes é limitado. Qual estratégia você adotaria?',
 '[{"id":"A","text":"Executar todos os testes existentes na mesma prioridade."},{"id":"B","text":"Priorizar cenários considerando impacto, probabilidade de falha, criticidade e áreas afetadas."},{"id":"C","text":"Executar apenas testes de interface."},{"id":"D","text":"Executar somente os testes automatizados."}]'::jsonb,
 'B', 'A gestão de testes baseada em risco (RBT) balanceia tempo e esforço focando em áreas de maior severidade e impacto ao negócio.', 1.0),

(2, 'Q2', 'fundamentos', 'Fundamentos de Qualidade', 'Pirâmide de testes',
 'Um fluxo possui validações que podem ser realizadas tanto via API quanto via interface Web. Qual estratégia tende a ser mais eficiente?',
 '[{"id":"A","text":"Automatizar tudo pela UI."},{"id":"B","text":"Automatizar tudo manualmente primeiro."},{"id":"C","text":"Colocar o máximo de validações adequadas nas camadas inferiores e manter na UI principalmente o necessário para validar a jornada."},{"id":"D","text":"Duplicar os mesmos testes em API e UI."}]'::jsonb,
 'C', 'Testes de API são ordens de grandeza mais rápidos e resilientes que testes de UI, mitigando instabilidades na esteira.', 1.0),

(3, 'Q3', 'fundamentos', 'Fundamentos de Qualidade', 'Estratégia de Regressão',
 'Um sistema possui 600 cenários regressivos manuais. Qual deveria ser o primeiro passo antes de automatizá-los?',
 '[{"id":"A","text":"Automatizar todos diretamente."},{"id":"B","text":"Selecionar os mais fáceis."},{"id":"C","text":"Analisar criticidade, frequência, estabilidade, valor, redundância e adequação à automação."},{"id":"D","text":"Automatizar apenas os cenários felizes."}]'::jsonb,
 'C', 'Automatizar cenários redundantes ou instáveis gera débito técnico massivo. A curadoria prévia é mandatória.', 1.0),

(4, 'Q4', 'fundamentos', 'Fundamentos de Qualidade', 'Bug em produção (Fuga)',
 'Uma funcionalidade passou por todos os testes definidos, mas apresentou defeito crítico em produção. Qual ação gera mais aprendizado?',
 '[{"id":"A","text":"Aumentar simplesmente a quantidade de testes sem critério."},{"id":"B","text":"Investigar a causa da fuga (Root Cause), identificar a lacuna de cobertura e atualizar estratégia/testes."},{"id":"C","text":"Responsabilizar quem executou os testes."},{"id":"D","text":"Adicionar o caso exclusivamente à regressão manual."}]'::jsonb,
 'B', 'Post-mortems e RCA (Root Cause Analysis) sistemáticos fortalecem o processo contínuo de qualidade.', 1.0),

-- B. Automação de Testes
(5, 'Q5', 'automacao', 'Automação de Testes', 'Escolha de automação',
 'Qual cenário apresenta maior potencial inicial para automação?',
 '[{"id":"A","text":"Processo executado uma vez por ano."},{"id":"B","text":"Fluxo que muda de regras semanalmente."},{"id":"C","text":"Regressão crítica executada em todas as releases."},{"id":"D","text":"Teste exploratório sem comportamento previamente definido."}]'::jsonb,
 'C', 'Automação exige ROI: fluxos repetitivos, estáveis e de alta criticidade fornecem feedback instantâneo de valor.', 1.0),

(6, 'Q6', 'automacao', 'Automação de Testes', 'Flaky tests (Instabilidade)',
 'Uma suíte apresenta falhas intermitentes. Qual seria sua primeira abordagem?',
 '[{"id":"A","text":"Aumentar todos os sleeps."},{"id":"B","text":"Executar novamente até passar."},{"id":"C","text":"Analisar sincronização, dependências, massa, ambiente e isolamento dos testes."},{"id":"D","text":"Remover sumariamente os testes que falham."}]'::jsonb,
 'C', 'Flakiness é sintoma de problemas estruturais de sincronização (esperas implícitas/explícitas) ou poluição de estado.', 1.0),

(7, 'Q7', 'automacao', 'Automação de Testes', 'Espera fixa (Sleeps)',
 'Você encontra no código: click("Entrar"); sleep(10); click("Continuar"). Qual seria a melhor melhoria?',
 '[{"id":"A","text":"Aumentar para sleep(20)."},{"id":"B","text":"Criar uma espera explícita baseada na condição necessária para continuar (elemento visível/clicável)."},{"id":"C","text":"Repetir o clique em loop sem delay."},{"id":"D","text":"Não alterar nada."}]'::jsonb,
 'B', 'Esperas explícitas reduzem o tempo ocioso e tornam o teste resiliente a variações de latência do servidor.', 1.0),

(8, 'Q8', 'automacao', 'Automação de Testes', 'Reuso de componentes',
 'Há 80 testes Web repetindo o código de login. O que você faria?',
 '[{"id":"A","text":"Manter, pois cada teste deve ser independente."},{"id":"B","text":"Criar um componente/keyword/método reutilizável ou fixture para a operação."},{"id":"C","text":"Copiar o código para uma nova classe."},{"id":"D","text":"Remover a verificação de login."}]'::jsonb,
 'B', 'Padrões de design como Page Objects, Fixtures ou Composable Actions evitam manutenção dispersa em dezenas de arquivos.', 1.0),

(9, 'Q9', 'automacao', 'Automação de Testes', 'API x UI em Cálculos',
 'Um cálculo financeiro complexo pode ser validado diretamente por API. A UI apenas apresenta o resultado. Onde concentraria os testes das regras de cálculo?',
 '[{"id":"A","text":"Exclusivamente na UI para garantir a visão do usuário final."},{"id":"B","text":"Principalmente na API/camada de serviço com matriz completa de valores, deixando na UI apenas a validação da apresentação."},{"id":"C","text":"Dividir 50% dos casos em cada camada de forma aleatória."},{"id":"D","text":"Apenas testes unitários do desenvolvedor, sem testes de QA."}]'::jsonb,
 'B', 'Testar permutações e edge cases via API é mais rápido, determinístico e não sobrecarrega a infraestrutura de navegadores.', 1.0),

(10, 'Q10', 'automacao', 'Automação de Testes', 'Seletores Resilientes',
 'Qual seletor tende a ser mais resiliente a mudanças cosméticas de layout?',
 '[{"id":"A","text":"/html/body/div[2]/div[3]/button"},{"id":"B","text":".button:nth-child(4)"},{"id":"C","text":"[data-testid=\"confirm-transfer\"]"},{"id":"D","text":"div > div > button"}]'::jsonb,
 'C', 'Atributos dedicados como data-testid desacoplam os testes de classes CSS e hierarquias mutáveis do DOM.', 1.0),

(11, 'Q11', 'automacao', 'Automação de Testes', 'Independência de testes',
 'O Teste B depende de o Teste A ter sido executado com sucesso. Qual o principal problema dessa abordagem?',
 '[{"id":"A","text":"Gera dependência sequencial, impede paralelização e provoca efeito cascata de falsos negativos."},{"id":"B","text":"Não há problema, suítes devem sempre seguir uma ordem rígida."},{"id":"C","text":"Apenas o consumo de memória adicional."},{"id":"D","text":"Nenhuma ferramenta de automação moderna suporta essa dependência."}]'::jsonb,
 'A', 'Testes atômicos e independentes garantem isolamento, execução paralela e diagnóstico preciso de falhas.', 1.0),

(12, 'Q12', 'automacao', 'Automação de Testes', 'Interpretação de Cobertura',
 'A equipe afirma possuir "90% de automação". Qual informação adicional é mais importante para interpretar esse indicador?',
 '[{"id":"A","text":"Quais cenários estão cobertos, criticidade das jornadas e risco mitigado."},{"id":"B","text":"Quantidade total de linhas de código escritas no framework."},{"id":"C","text":"Quantos arquivos .robot ou .spec existem no repositório."},{"id":"D","text":"Número de commits realizados na semana."}]'::jsonb,
 'A', '90% de cenários triviais não protege o core business. A qualidade e o risco coberto definem a eficácia real.', 1.0),

-- C. Engenharia / Código
(13, 'Q13', 'engenharia', 'Engenharia / Código', 'Code Review de Automação',
 'Ao revisar um script com credenciais em texto puro, seletores absolutos e sleep(10), qual a prioridade de refatoração?',
 '[{"id":"A","text":"Apenas renomear as variáveis para português."},{"id":"B","text":"Parametrizar credenciais via variáveis de ambiente, substituir sleep por esperas explícitas e usar data-testid."},{"id":"C","text":"Aumentar o sleep para 20 segundos para evitar timeout."},{"id":"D","text":"Manter como está desde que passe na pipeline local."}]'::jsonb,
 'B', 'Segurança, estabilidade de sincronismo e seletores semânticos são pilares de engenharia de software aplicada ao teste.', 1.0),

(14, 'Q14', 'engenharia', 'Engenharia / Código', 'Manutenibilidade em Escala',
 'Qual característica é mais importante para uma suíte que terá milhares de cenários corporativos?',
 '[{"id":"A","text":"Velocidade de criação rápida sem seguir arquitetura."},{"id":"B","text":"Uso da biblioteca que foi lançada no último mês."},{"id":"C","text":"Arquitetura limpa, desacoplamento, reutilização de código e padrões bem documentados."},{"id":"D","text":"Colocar todo o fluxo em um único arquivo para não fragmentar."}]'::jsonb,
 'C', 'Sem padrões claros e abstração adequada, suítes de grande porte colapsam pelo custo de manutenção.', 1.0),

(15, 'Q15', 'engenharia', 'Engenharia / Código', 'Revisão de Código Gerado por IA',
 'Uma IA gerou uma automação aparentemente correta em um Pull Request. O que deve acontecer antes do merge?',
 '[{"id":"A","text":"Merge direto e imediato, pois código de IA não possui erros de sintaxe."},{"id":"B","text":"Revisão técnica criteriosa, validação de assertions, execução real e verificação de padrões do projeto."},{"id":"C","text":"Perguntar à mesma IA se o código dela está seguro."},{"id":"D","text":"Deletar o código e refazer 100% manualmente."}]'::jsonb,
 'B', 'IA acelera a escrita, mas a responsabilidade técnica e o discernimento crítico são intransferíveis do engenheiro.', 1.0),

(16, 'Q16', 'engenharia', 'Engenharia / Código', 'Eliminação de Duplicação',
 'Você encontra dezenas de scripts com pequenas variações do mesmo fluxo de transferência. Qual técnica aplicar?',
 '[{"id":"A","text":"Copiar e colar mais variações conforme novos produtos forem criados."},{"id":"B","text":"Aplicar Data-Driven Testing (DDT), parametrização e métodos compartilhados."},{"id":"C","text":"Deixar de testar as variações e focar em apenas uma."},{"id":"D","text":"Transformar tudo em testes manuais."}]'::jsonb,
 'B', 'DDT desacopla massa de teste da lógica de automação, simplificando expansão e manutenção.', 1.0),

-- D. CI/CD e Massa de Dados
(17, 'Q17', 'cicd_massa', 'CI/CD e Massa de Dados', 'Gates de Execução na Pipeline',
 'Em qual momento os testes automatizados deveriam ser executados?',
 '[{"id":"A","text":"Apenas antes do deploy em produção uma vez ao mês."},{"id":"B","text":"Apenas quando solicitado explicitamente por e-mail pelo gestor."},{"id":"C","text":"Em diferentes gates da pipeline conforme velocidade e criticidade (smoke no PR, regressivo noturno/merge)."},{"id":"D","text":"Apenas localmente na máquina de quem desenvolveu."}]'::jsonb,
 'C', 'Feedback contínuo segmentado: suítes ultrarrápidas no PR (shift-left) e baterias completas em pipelines programadas.', 1.0),

(18, 'Q18', 'cicd_massa', 'CI/CD e Massa de Dados', 'Otimização de Pipeline Lenta',
 'Uma regressão automatizada está levando 4 horas para executar. Qual conjunto de medidas é mais adequado?',
 '[{"id":"A","text":"Paralelização de jobs, balanceamento de testes entre API/UI e eliminação de cenários redundantes."},{"id":"B","text":"Apenas aumentar o timeout do servidor de CI."},{"id":"C","text":"Desligar os testes na pipeline."},{"id":"D","text":"Executar a suíte a cada 3 meses."}]'::jsonb,
 'A', 'Paralelização e distribuição inteligente de carga são fundamentais para manter o ciclo de entrega contínuo.', 1.0),

(19, 'Q19', 'cicd_massa', 'CI/CD e Massa de Dados', 'Gestão Estrutural de Massa',
 'Uma suíte falha frequentemente porque os usuários utilizados já estão bloqueados ou com saldo zerado. Qual a solução sustentável?',
 '[{"id":"A","text":"Pedir manualmente novos logins ao suporte antes de cada execução."},{"id":"B","text":"Criação/reset automatizado de massa sob demanda via API ou scripts de banco dedicados para testes."},{"id":"C","text":"Remover validações de saldo do teste."},{"id":"D","text":"Usar apenas 1 login compartilhado por todo o time."}]'::jsonb,
 'B', 'Massa de teste efêmera ou gerada via API antes da execução elimina concorrência e estado corrompido.', 1.0),

(20, 'Q20', 'cicd_massa', 'CI/CD e Massa de Dados', 'Quality Gate e Bloqueio',
 'Um teste crítico da jornada principal de pagamento falha na pipeline de release. Qual a conduta esperada?',
 '[{"id":"A","text":"Bloquear a pipeline (Quality Gate), investigar imediatamente e não liberar sem correção ou deliberação formal."},{"id":"B","text":"Ignorar a falha e fazer o deploy para não atrasar o cronograma."},{"id":"C","text":"Comentar o teste que falhou para a pipeline ficar verde."},{"id":"D","text":"Desativar o CI/CD."}]'::jsonb,
 'A', 'O propósito do Quality Gate é proteger o cliente final e a operação contra falhas catastróficas em produção.', 1.0),

-- E. IA Aplicada à Qualidade
(21, 'Q21', 'ia_aplicada', 'IA Aplicada à Qualidade', 'Revisão de Cenários Gerados por IA',
 'Você recebe uma história de usuário e pede para uma IA gerar cenários de teste. Qual a melhor conduta?',
 '[{"id":"A","text":"Copiar integralmente os cenários e assumir como cobertura 100% garantida."},{"id":"B","text":"Não utilizar IA em nenhuma hipótese."},{"id":"C","text":"Revisar criticamente contra critérios de aceite, regras de negócio, riscos e lacunas contextuais."},{"id":"D","text":"Usar os testes sem ler porque a IA possui conhecimento superior."}]'::jsonb,
 'C', 'LLMs geram excelentes hipóteses iniciais, mas desconhecem restrições de arquitetura e contexto específico da empresa.', 1.0),

(22, 'Q22', 'ia_aplicada', 'IA Aplicada à Qualidade', 'Identificação de Alucinações',
 'A IA sugere uma regra de negócio que não consta na especificação. O que fazer?',
 '[{"id":"A","text":"Incluir nos testes porque a IA pode ter inferido uma regra oculta."},{"id":"B","text":"Validar a informação contra fonte confiável (Product Owner/documentação de arquitetura) antes de aceitar."},{"id":"C","text":"Descartar todos os outros cenários sugeridos pela IA."},{"id":"D","text":"Mudar o código da aplicação para atender à IA."}]'::jsonb,
 'B', 'Discernimento para detectar e refutar alucinações é a principal competência de um engenheiro assistido por IA.', 1.0),

(23, 'Q23', 'ia_aplicada', 'IA Aplicada à Qualidade', 'Engenharia de Prompt Contextualizado',
 'Qual estratégia de prompt tende a gerar cenários de teste mais assertivos?',
 '[{"id":"A","text":"\"Crie testes para essa tela.\""},{"id":"B","text":"Fornecer persona, critérios de aceite, stack técnica, formato esperado de saída e solicitar edge cases com priorização."},{"id":"C","text":"Colocar apenas uma imagem da tela sem texto explicativo."},{"id":"D","text":"Solicitar o máximo de cenários possíveis sem especificar regras de negócio."}]'::jsonb,
 'B', 'Few-shot e contexto estruturado direcionam o modelo para respostas robustas e acionáveis.', 1.0),

(24, 'Q24', 'ia_aplicada', 'IA Aplicada à Qualidade', 'Refatoração de Código Gerado por IA',
 'A IA gera um script que funciona, mas utiliza código duplicado, sleeps de 15 segundos e credenciais fixas. O QE deve:',
 '[{"id":"A","text":"Aceitar sem alterações porque o teste ficou verde."},{"id":"B","text":"Refatorar o código aplicando boas práticas de engenharia antes de submeter ao repositório."},{"id":"C","text":"Solicitar que outra IA reescreva sem olhar o resultado."},{"id":"D","text":"Colocar diretamente na esteira de produção."}]'::jsonb,
 'B', 'O profissional é o responsável pela qualidade e manutenibilidade do código entregue no repositório.', 1.0),

(25, 'Q25', 'ia_aplicada', 'IA Aplicada à Qualidade', 'Segurança e Uso Responsável de IA',
 'Quais fatores são cruciais antes de enviar informações do projeto para um modelo de IA público?',
 '[{"id":"A","text":"Verificar confidencialidade de dados (LGPD), segredos de código corporativo e conformidade com políticas de segurança da empresa."},{"id":"B","text":"Apenas checar se a internet está veloz."},{"id":"C","text":"Não há necessidade de cuidados com dados em modelos de linguagem."},{"id":"D","text":"Basta não colocar o próprio nome no prompt."}]'::jsonb,
 'A', 'Vazamento de propriedade intelectual ou dados sensíveis de clientes é violação grave de compliance e segurança.', 1.0),

(26, 'Q26', 'ia_aplicada', 'IA Aplicada à Qualidade', 'Papel do QE na Era dos Agentes Autônomos',
 'Com o avanço de agentes autônomos capazes de codificar e executar testes, qual a atribuição central do profissional de qualidade?',
 '[{"id":"A","text":"Apenas executar testes manuais de cliques na tela."},{"id":"B","text":"Definição estratégica, análise de riscos críticos, governança de qualidade, validação de saídas e arquitetura técnica."},{"id":"C","text":"Nenhuma, a qualidade será 100% autônoma sem supervisão humana."},{"id":"D","text":"Operar apenas planilhas de chamados."}]'::jsonb,
 'B', 'O profissional migra do papel operacional de repetidor de scripts para arquiteto de qualidade e curador de soluções.', 1.0),

(27, 'Q27', 'ia_aplicada', 'IA Aplicada à Qualidade', 'Aplicação Prática no Dia a Dia',
 'Qual das opções melhor exemplifica um uso de alto valor de IA em Quality Engineering?',
 '[{"id":"A","text":"Geração de dados sintéticos de teste, auxílio na escrita de expressões regulares e análise de logs de falha na pipeline."},{"id":"B","text":"Deixar a IA decidir quais releases vão para produção sem revisão."},{"id":"C","text":"Substituir toda a equipe de QA por prompts automáticos sem auditoria."},{"id":"D","text":"Utilizar IA apenas para corrigir gramática de e-mails."}]'::jsonb,
 'A', 'Produtividade real é conquistada acelerando tarefas rotineiras de análise de logs, dados sintéticos e regex.', 1.0),

(28, 'Q28', 'ia_aplicada', 'IA Aplicada à Qualidade', 'Critério de Desconfiança e Validação',
 'Qual situação exige maior ceticismo e validação cruzada do QE em relação à IA?',
 '[{"id":"A","text":"Quando a IA sugere cálculos regulatórios, regras financeiras críticas ou assertivas de segurança sem fonte citada."},{"id":"B","text":"Quando a IA formata uma tabela em Markdown."},{"id":"C","text":"Quando a IA gera uma lista de sinônimos."},{"id":"D","text":"Quando a IA escreve um comentário de código."}]'::jsonb,
 'A', 'Valores financeiros e regras de compliance exigem validação determinística e auditoria rigorosa de fontes.', 1.0)
on conflict (id) do update set
    statement = excluded.statement,
    options = excluded.options,
    correct_answer = excluded.correct_answer,
    explanation = excluded.explanation;

-- 3. Inserir Base Demonstrativa de QAs (com históricos do Scan Anterior para cruzamento)
insert into public.qas (id, sap, name, email, hierarchy_id, previous_scan_score, previous_scan_classification)
values
    ('a1111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '100234', 'Maria Silva', 'maria.silva@nttdata.com', '11111111-1111-1111-1111-111111111111', 65.0, 'Médio'),
    ('a2222222-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '100582', 'Carlos Eduardo Santos', 'carlos.santos@nttdata.com', '11111111-1111-1111-1111-111111111111', 48.0, 'Baixo'),
    ('a3333333-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '100891', 'Fernanda Oliveira', 'fernanda.oliveira@nttdata.com', '11111111-1111-1111-1111-111111111111', 84.0, 'Alto'),
    ('a4444444-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '101012', 'Rafael Mendes', 'rafael.mendes@nttdata.com', '22222222-2222-2222-2222-222222222222', 72.0, 'Médio'),
    ('a5555555-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '101344', 'Juliana Costa', 'juliana.costa@nttdata.com', '22222222-2222-2222-2222-222222222222', 88.0, 'Alto'),
    ('a6666666-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '101567', 'Lucas Barbosa', 'lucas.barbosa@nttdata.com', '33333333-3333-3333-3333-333333333333', 55.0, 'Baixo'),
    ('a7777777-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '102019', 'Beatriz Lima', 'beatriz.lima@nttdata.com', '44444444-4444-4444-4444-444444444444', 91.0, 'Alto'),
    ('a8888888-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '102450', 'Thiago Rocha', 'thiago.rocha@nttdata.com', '44444444-4444-4444-4444-444444444444', 62.0, 'Médio'),
    ('a9999999-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '103110', 'Aline Martins', 'aline.martins@nttdata.com', '55555555-5555-5555-5555-555555555555', 78.0, 'Médio'),
    ('b1111111-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '103554', 'Rodrigo Nogueira', 'rodrigo.nogueira@nttdata.com', '55555555-5555-5555-5555-555555555555', 42.0, 'Baixo')
on conflict (sap) do nothing;

-- 4. Inserir Diagnóstico Inicial de Squads (Módulo Accelerate Team)
insert into public.squad_diagnostics (
    hierarchy_id, stack, web_coverage, api_coverage, mobile_coverage,
    regressive_count, automated_count, has_pipeline, has_automated_data,
    opportunities, action_plan_text, target_coverage_90_days, evaluated_by
) values
(
    '11111111-1111-1111-1111-111111111111',
    array['Robot Framework', 'Python', 'Selenium', 'Postman'],
    45.0, 25.0, 0.0,
    140, 52, true, false,
    '["Automação de API", "Massa de Dados Automatizada", "Quality Gates na Pipeline", "IA para Geração de Casos"]'::jsonb,
    'Prioridade 1: Implementar suíte de regressão em API para os cálculos de Renda Fixa. Prioridade 2: Eliminar massa de dados estática utilizando fixture API. Habilitar os QAs em Playwright e IA contextual.',
    75.0,
    'Accelerate Team NTT'
),
(
    '44444444-4444-4444-4444-444444444444',
    array['Playwright', 'TypeScript', 'RestAssured', 'GitHub Actions'],
    70.0, 80.0, 15.0,
    210, 165, true, true,
    '["IA para Manutenção de Suítes", "Performance de Regressivo", "Contratos de API"]'::jsonb,
    'Squad madura. Foco em introduzir agentes autônomos para triagem de falhas flaky e expandir cobertura de contratos OpenAPI.',
    90.0,
    'Accelerate Team NTT'
)
on conflict do nothing;
