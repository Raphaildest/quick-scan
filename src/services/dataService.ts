import { supabase, isSupabaseConfigured } from './supabaseClient';
import { QA, Hierarchy } from '../types/qa';
import { AssessmentResult, Question } from '../types/assessment';
import { SquadDiagnostic } from '../types/accelerate';
import { initialHierarchies } from '../data/hierarchyData';
import { initialQAs } from '../data/initialQAs';
import { questionsBank } from '../data/questionsBank';

const STORAGE_KEYS = {
  HIERARCHIES: 'quickscan_hierarchies_v2',
  QAS: 'quickscan_qas_v2',
  ASSESSMENTS: 'quickscan_assessments_v2',
  SQUAD_DIAGNOSTICS: 'quickscan_squad_diag_v2',
  QUESTIONS: 'quickscan_questions_v2'
};

// Generate comprehensive mock assessments for initial QAs
function generateInitialAssessments(): AssessmentResult[] {
  return [
    {
      id: 'mock-1',
      qaId: initialQAs[0].id,
      qaName: initialQAs[0].name,
      sap: initialQAs[0].sap,
      coordenacao: initialQAs[0].hierarchy?.coordenacao,
      squad: initialQAs[0].hierarchy?.squad_name,
      qualityFundamentalsScore: 85,
      automationReadinessScore: 82,
      engineeringReadinessScore: 78,
      cicdDataReadinessScore: 75,
      aiReadinessScore: 88,
      overallScore: 81,
      classification: 'Alto',
      previousClassification: initialQAs[0].previous_scan_classification,
      predominantProfile: 'AI-Enabled QE',
      transitionDiagnosis: 'Evolução consistente comprovada',
      recommendedAction: 'Manter / Potencial Multiplicador',
      answers: { 1: 'B', 2: 'C', 3: 'C', 4: 'B', 5: 'C', 6: 'C', 7: 'B', 8: 'B', 10: 'C', 13: 'B', 14: 'C', 15: 'B', 17: 'C', 18: 'A', 21: 'C', 22: 'B', 23: 'B' },
      practicalChallenge: {
        repoUrl: 'https://github.com/ntt-qa/pagamentos-e2e',
        strategySummary: 'Validação de regras em API Rest e fluxos críticos de ponta a ponta na UI com Playwright e fixtures.'
      },
      aiChallenge: {
        toolUsed: 'ChatGPT-4o',
        prompt: 'Considere os critérios de aceite para a tela de transferência. Gere matriz de risco e casos de teste...',
        acceptedRejectedNotes: 'Aceitei cenários de concorrência e saldo negativo; rejeitei cenário que sugeria chave PIX duplicada.',
        hallucinationAnalysis: 'Identifiquei que a premissa de chave CPF compartilhada entre contas viola a regra do Banco Central.',
        codeRefactoringNotes: 'Removidos sleeps e credenciais; adicionados Page Objects e variáveis de ambiente.'
      },
      completedAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString()
    },
    {
      id: 'mock-2',
      qaId: initialQAs[1].id,
      qaName: initialQAs[1].name,
      sap: initialQAs[1].sap,
      coordenacao: initialQAs[1].hierarchy?.coordenacao,
      squad: initialQAs[1].hierarchy?.squad_name,
      qualityFundamentalsScore: 60,
      automationReadinessScore: 52,
      engineeringReadinessScore: 48,
      cicdDataReadinessScore: 50,
      aiReadinessScore: 55,
      overallScore: 52,
      classification: 'Baixo',
      previousClassification: initialQAs[1].previous_scan_classification,
      predominantProfile: 'Emerging QE',
      transitionDiagnosis: 'Gap técnico persistente',
      recommendedAction: 'Avaliar plano intensivo de aceleração',
      answers: { 1: 'B', 2: 'A', 3: 'A', 5: 'C', 6: 'A', 7: 'A' },
      practicalChallenge: {
        strategySummary: 'Criação de scripts manuais adaptados para Selenium básico.'
      },
      completedAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString()
    },
    {
      id: 'mock-3',
      qaId: initialQAs[2].id,
      qaName: initialQAs[2].name,
      sap: initialQAs[2].sap,
      coordenacao: initialQAs[2].hierarchy?.coordenacao,
      squad: initialQAs[2].hierarchy?.squad_name,
      qualityFundamentalsScore: 90,
      automationReadinessScore: 92,
      engineeringReadinessScore: 88,
      cicdDataReadinessScore: 85,
      aiReadinessScore: 94,
      overallScore: 90,
      classification: 'Alto',
      previousClassification: initialQAs[2].previous_scan_classification,
      predominantProfile: 'Technical Enabler',
      transitionDiagnosis: 'Desempenho confirmado',
      recommendedAction: 'Manter / Habilitador Técnico',
      answers: { 1: 'B', 2: 'C', 3: 'C', 4: 'B', 5: 'C', 6: 'C', 7: 'B', 8: 'B', 10: 'C', 13: 'B', 14: 'C', 15: 'B', 17: 'C', 18: 'A', 21: 'C', 22: 'B', 23: 'B' },
      practicalChallenge: {
        repoUrl: 'https://gitlab.corp.net/qa/framework-resilient',
        strategySummary: 'Arquitetura modular de automação em TypeScript com isolamento de massa via API efêmera e mock de autorizadores.'
      },
      completedAt: new Date(Date.now() - 3600000 * 24 * 1).toISOString()
    },
    {
      id: 'mock-4',
      qaId: initialQAs[3].id,
      qaName: initialQAs[3].name,
      sap: initialQAs[3].sap,
      coordenacao: initialQAs[3].hierarchy?.coordenacao,
      squad: initialQAs[3].hierarchy?.squad_name,
      qualityFundamentalsScore: 78,
      automationReadinessScore: 75,
      engineeringReadinessScore: 68,
      cicdDataReadinessScore: 70,
      aiReadinessScore: 65,
      overallScore: 71,
      classification: 'Médio',
      previousClassification: initialQAs[3].previous_scan_classification,
      predominantProfile: 'Automation Specialist',
      transitionDiagnosis: 'Desempenho estável',
      recommendedAction: 'Habilitar nos gaps pontuais',
      answers: { 1: 'B', 2: 'C', 3: 'C', 5: 'C', 6: 'B', 7: 'B' },
      completedAt: new Date(Date.now() - 3600000 * 24 * 4).toISOString()
    },
    {
      id: 'mock-5',
      qaId: initialQAs[4].id,
      qaName: initialQAs[4].name,
      sap: initialQAs[4].sap,
      coordenacao: initialQAs[4].hierarchy?.coordenacao,
      squad: initialQAs[4].hierarchy?.squad_name,
      qualityFundamentalsScore: 65,
      automationReadinessScore: 48,
      engineeringReadinessScore: 50,
      cicdDataReadinessScore: 52,
      aiReadinessScore: 58,
      overallScore: 54,
      classification: 'Baixo',
      previousClassification: initialQAs[4].previous_scan_classification, // 'Alto' -> Divergência!
      predominantProfile: 'Quality Analyst',
      transitionDiagnosis: 'Divergência Crítica',
      recommendedAction: 'Gate: Entrevista Obrigatória',
      answers: { 1: 'B', 2: 'A', 3: 'B', 5: 'B' },
      completedAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString()
    },
    {
      id: 'mock-6',
      qaId: initialQAs[5].id,
      qaName: initialQAs[5].name,
      sap: initialQAs[5].sap,
      coordenacao: initialQAs[5].hierarchy?.coordenacao,
      squad: initialQAs[5].hierarchy?.squad_name,
      qualityFundamentalsScore: 72,
      automationReadinessScore: 66,
      engineeringReadinessScore: 65,
      cicdDataReadinessScore: 62,
      aiReadinessScore: 70,
      overallScore: 67,
      classification: 'Médio',
      previousClassification: initialQAs[5].previous_scan_classification, // 'Baixo'
      predominantProfile: 'Quality Engineer',
      transitionDiagnosis: 'Evolução Moderada',
      recommendedAction: 'Acompanhar Aceleração',
      answers: { 1: 'B', 2: 'C', 3: 'C', 5: 'C' },
      completedAt: new Date(Date.now() - 3600000 * 24 * 6).toISOString()
    },
    {
      id: 'mock-7',
      qaId: initialQAs[6].id,
      qaName: initialQAs[6].name,
      sap: initialQAs[6].sap,
      coordenacao: initialQAs[6].hierarchy?.coordenacao,
      squad: initialQAs[6].hierarchy?.squad_name,
      qualityFundamentalsScore: 95,
      automationReadinessScore: 96,
      engineeringReadinessScore: 92,
      cicdDataReadinessScore: 90,
      aiReadinessScore: 96,
      overallScore: 94,
      classification: 'Alto',
      previousClassification: initialQAs[6].previous_scan_classification,
      predominantProfile: 'Technical Enabler',
      transitionDiagnosis: 'Desempenho confirmado',
      recommendedAction: 'Manter / Habilitador Técnico',
      answers: { 1: 'B', 2: 'C', 3: 'C', 4: 'B', 5: 'C', 6: 'C', 7: 'B', 8: 'B', 10: 'C', 13: 'B', 14: 'C', 15: 'B', 17: 'C', 18: 'A', 21: 'C', 22: 'B', 23: 'B' },
      completedAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString()
    },
    {
      id: 'mock-8',
      qaId: initialQAs[7].id,
      qaName: initialQAs[7].name,
      sap: initialQAs[7].sap,
      coordenacao: initialQAs[7].hierarchy?.coordenacao,
      squad: initialQAs[7].hierarchy?.squad_name,
      qualityFundamentalsScore: 82,
      automationReadinessScore: 85,
      engineeringReadinessScore: 80,
      cicdDataReadinessScore: 78,
      aiReadinessScore: 84,
      overallScore: 83,
      classification: 'Alto',
      previousClassification: initialQAs[7].previous_scan_classification, // 'Médio'
      predominantProfile: 'Automation Specialist',
      transitionDiagnosis: 'Evolução consistente comprovada',
      recommendedAction: 'Manter / Potencial Multiplicador',
      answers: { 1: 'B', 2: 'C', 3: 'C', 4: 'B', 5: 'C', 6: 'C', 7: 'B', 8: 'B' },
      completedAt: new Date(Date.now() - 3600000 * 24 * 7).toISOString()
    },
    {
      id: 'mock-9',
      qaId: initialQAs[8].id,
      qaName: initialQAs[8].name,
      sap: initialQAs[8].sap,
      coordenacao: initialQAs[8].hierarchy?.coordenacao,
      squad: initialQAs[8].hierarchy?.squad_name,
      qualityFundamentalsScore: 80,
      automationReadinessScore: 76,
      engineeringReadinessScore: 74,
      cicdDataReadinessScore: 72,
      aiReadinessScore: 78,
      overallScore: 76,
      classification: 'Médio',
      previousClassification: initialQAs[8].previous_scan_classification,
      predominantProfile: 'Quality Engineer',
      transitionDiagnosis: 'Desempenho estável',
      recommendedAction: 'Habilitar nos gaps pontuais',
      answers: { 1: 'B', 2: 'C', 3: 'C', 4: 'B', 5: 'C', 6: 'B', 7: 'B', 8: 'B' },
      completedAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString()
    },
    {
      id: 'mock-10',
      qaId: initialQAs[9].id,
      qaName: initialQAs[9].name,
      sap: initialQAs[9].sap,
      coordenacao: initialQAs[9].hierarchy?.coordenacao,
      squad: initialQAs[9].hierarchy?.squad_name,
      qualityFundamentalsScore: 84,
      automationReadinessScore: 81,
      engineeringReadinessScore: 80,
      cicdDataReadinessScore: 78,
      aiReadinessScore: 86,
      overallScore: 82,
      classification: 'Alto',
      previousClassification: initialQAs[9].previous_scan_classification, // 'Baixo'
      predominantProfile: 'AI-Enabled QE',
      transitionDiagnosis: 'Salto de Maturidade',
      recommendedAction: 'Manter / Reconhecimento',
      answers: { 1: 'B', 2: 'C', 3: 'C', 5: 'C', 6: 'C', 7: 'B', 21: 'C', 22: 'B', 23: 'B' },
      completedAt: new Date(Date.now() - 3600000 * 24 * 1).toISOString()
    },
    {
      id: 'mock-11',
      qaId: initialQAs[10].id,
      qaName: initialQAs[10].name,
      sap: initialQAs[10].sap,
      coordenacao: initialQAs[10].hierarchy?.coordenacao,
      squad: initialQAs[10].hierarchy?.squad_name,
      qualityFundamentalsScore: 75,
      automationReadinessScore: 70,
      engineeringReadinessScore: 70,
      cicdDataReadinessScore: 68,
      aiReadinessScore: 76,
      overallScore: 72,
      classification: 'Médio',
      previousClassification: 'Não Avaliado',
      predominantProfile: 'Quality Analyst',
      transitionDiagnosis: 'Primeira avaliação estruturada',
      recommendedAction: 'Conforme resultado do Quick Scan',
      answers: { 1: 'B', 2: 'C', 3: 'C', 5: 'C', 6: 'B', 7: 'B' },
      completedAt: new Date(Date.now() - 3600000 * 24 * 4).toISOString()
    },
    {
      id: 'mock-12',
      qaId: initialQAs[11]?.id || 'mock-qa-12',
      qaName: initialQAs[11]?.name || 'Marcelo Castro',
      sap: initialQAs[11]?.sap || '104231',
      coordenacao: initialQAs[11]?.hierarchy?.coordenacao || 'Investimentos e Previdência II',
      squad: initialQAs[11]?.hierarchy?.squad_name || 'Squad Delta - Renda Variável',
      qualityFundamentalsScore: 90,
      automationReadinessScore: 89,
      engineeringReadinessScore: 86,
      cicdDataReadinessScore: 84,
      aiReadinessScore: 90,
      overallScore: 88,
      classification: 'Alto',
      previousClassification: 'Alto',
      predominantProfile: 'Technical Enabler',
      transitionDiagnosis: 'Desempenho confirmado',
      recommendedAction: 'Manter / Habilitador Técnico',
      answers: { 1: 'B', 2: 'C', 3: 'C', 4: 'B', 5: 'C', 6: 'C', 7: 'B', 8: 'B', 10: 'C', 13: 'B', 14: 'C', 15: 'B', 17: 'C', 18: 'A', 21: 'C', 22: 'B', 23: 'B' },
      completedAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString()
    },
    {
      id: 'mock-13',
      qaId: initialQAs[12]?.id || 'mock-qa-13',
      qaName: initialQAs[12]?.name || 'Camila Farias',
      sap: initialQAs[12]?.sap || '104590',
      coordenacao: initialQAs[12]?.hierarchy?.coordenacao || 'Investimentos e Previdência II',
      squad: initialQAs[12]?.hierarchy?.squad_name || 'Squad Delta - Renda Variável',
      qualityFundamentalsScore: 74,
      automationReadinessScore: 68,
      engineeringReadinessScore: 66,
      cicdDataReadinessScore: 65,
      aiReadinessScore: 72,
      overallScore: 69,
      classification: 'Médio',
      previousClassification: 'Médio',
      predominantProfile: 'Quality Engineer',
      transitionDiagnosis: 'Desempenho estável',
      recommendedAction: 'Habilitar nos gaps pontuais',
      answers: { 1: 'B', 2: 'C', 3: 'C', 5: 'C', 6: 'B', 7: 'B' },
      completedAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString()
    },
    {
      id: 'mock-14',
      qaId: initialQAs[13]?.id || 'mock-qa-14',
      qaName: initialQAs[13]?.name || 'Gustavo Prado',
      sap: initialQAs[13]?.sap || '105120',
      coordenacao: initialQAs[13]?.hierarchy?.coordenacao || 'Meios de Pagamentos I',
      squad: initialQAs[13]?.hierarchy?.squad_name || 'Squad Open Finance',
      qualityFundamentalsScore: 92,
      automationReadinessScore: 93,
      engineeringReadinessScore: 90,
      cicdDataReadinessScore: 88,
      aiReadinessScore: 91,
      overallScore: 91,
      classification: 'Alto',
      previousClassification: 'Alto',
      predominantProfile: 'Technical Enabler',
      transitionDiagnosis: 'Desempenho confirmado',
      recommendedAction: 'Manter / Habilitador Técnico',
      answers: { 1: 'B', 2: 'C', 3: 'C', 4: 'B', 5: 'C', 6: 'C', 7: 'B', 8: 'B', 10: 'C', 13: 'B', 14: 'C', 15: 'B', 17: 'C', 18: 'A', 21: 'C', 22: 'B', 23: 'B' },
      completedAt: new Date(Date.now() - 3600000 * 24 * 1).toISOString()
    },
    {
      id: 'mock-15',
      qaId: initialQAs[14]?.id || 'mock-qa-15',
      qaName: initialQAs[14]?.name || 'Larissa Souza',
      sap: initialQAs[14]?.sap || '105432',
      coordenacao: initialQAs[14]?.hierarchy?.coordenacao || 'Meios de Pagamentos I',
      squad: initialQAs[14]?.hierarchy?.squad_name || 'Squad Open Finance',
      qualityFundamentalsScore: 86,
      automationReadinessScore: 84,
      engineeringReadinessScore: 82,
      cicdDataReadinessScore: 80,
      aiReadinessScore: 87,
      overallScore: 84,
      classification: 'Alto',
      previousClassification: 'Médio',
      predominantProfile: 'AI-Enabled QE',
      transitionDiagnosis: 'Evolução consistente comprovada',
      recommendedAction: 'Manter / Potencial Multiplicador',
      answers: { 1: 'B', 2: 'C', 3: 'C', 4: 'B', 5: 'C', 6: 'C', 7: 'B', 8: 'B', 21: 'C', 22: 'B' },
      completedAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString()
    },
    {
      id: 'mock-16',
      qaId: initialQAs[15]?.id || 'mock-qa-16',
      qaName: initialQAs[15]?.name || 'Felipe Cardoso',
      sap: initialQAs[15]?.sap || '105877',
      coordenacao: initialQAs[15]?.hierarchy?.coordenacao || 'Canais Digitais I',
      squad: initialQAs[15]?.hierarchy?.squad_name || 'Squad Mobile Banking iOS & Android',
      qualityFundamentalsScore: 80,
      automationReadinessScore: 78,
      engineeringReadinessScore: 76,
      cicdDataReadinessScore: 74,
      aiReadinessScore: 76,
      overallScore: 77,
      classification: 'Médio',
      previousClassification: 'Alto',
      predominantProfile: 'Quality Engineer',
      transitionDiagnosis: 'Atenção Técnica',
      recommendedAction: 'Habilitar nos gaps pontuais',
      answers: { 1: 'B', 2: 'C', 3: 'C', 5: 'C', 6: 'B', 7: 'B' },
      completedAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString()
    },
    {
      id: 'mock-17',
      qaId: initialQAs[16]?.id || 'mock-qa-17',
      qaName: initialQAs[16]?.name || 'Amanda Vieira',
      sap: initialQAs[16]?.sap || '106201',
      coordenacao: initialQAs[16]?.hierarchy?.coordenacao || 'Canais Digitais I',
      squad: initialQAs[16]?.hierarchy?.squad_name || 'Squad Mobile Banking iOS & Android',
      qualityFundamentalsScore: 55,
      automationReadinessScore: 46,
      engineeringReadinessScore: 45,
      cicdDataReadinessScore: 48,
      aiReadinessScore: 50,
      overallScore: 48,
      classification: 'Baixo',
      previousClassification: 'Baixo',
      predominantProfile: 'Emerging QE',
      transitionDiagnosis: 'Gap técnico persistente',
      recommendedAction: 'Avaliar plano intensivo de aceleração',
      answers: { 1: 'B', 2: 'A', 3: 'A', 5: 'C', 6: 'A' },
      completedAt: new Date(Date.now() - 3600000 * 24 * 6).toISOString()
    },
    {
      id: 'mock-18',
      qaId: initialQAs[17]?.id || 'mock-qa-18',
      qaName: initialQAs[17]?.name || 'Bruno Carvalho',
      sap: initialQAs[17]?.sap || '106540',
      coordenacao: initialQAs[17]?.hierarchy?.coordenacao || 'Investimentos e Previdência I',
      squad: initialQAs[17]?.hierarchy?.squad_name || 'Squad Alpha - Renda Fixa',
      qualityFundamentalsScore: 88,
      automationReadinessScore: 87,
      engineeringReadinessScore: 84,
      cicdDataReadinessScore: 82,
      aiReadinessScore: 88,
      overallScore: 86,
      classification: 'Alto',
      previousClassification: 'Alto',
      predominantProfile: 'Automation Specialist',
      transitionDiagnosis: 'Desempenho confirmado',
      recommendedAction: 'Manter / Habilitador Técnico',
      answers: { 1: 'B', 2: 'C', 3: 'C', 4: 'B', 5: 'C', 6: 'C', 7: 'B', 8: 'B', 10: 'C', 13: 'B', 14: 'C' },
      completedAt: new Date(Date.now() - 3600000 * 24 * 1).toISOString()
    }
  ];
}

// Generate comprehensive diagnostics for all squads
function generateInitialSquadDiagnostics(): SquadDiagnostic[] {
  return [
    {
      id: 'diag-1',
      hierarchyId: initialHierarchies[0].id,
      squadName: initialHierarchies[0].squad_name,
      coordenacao: initialHierarchies[0].coordenacao,
      gerencia: initialHierarchies[0].gerencia,
      stack: ['Robot Framework', 'Python', 'Selenium', 'Postman'],
      webCoverage: 45,
      apiCoverage: 25,
      mobileCoverage: 0,
      regressiveCount: 140,
      automatedCount: 52,
      hasPipeline: true,
      hasAutomatedData: false,
      opportunities: ['Automação de API REST', 'Massa de Dados Efêmera / Automatizada', 'Quality Gates na Pipeline', 'IA para Geração de Casos'],
      actionPlanText: 'Prioridade 1: Implementar suíte de regressão em API para os cálculos de Renda Fixa. Prioridade 2: Eliminar massa de dados estática utilizando fixture API. Habilitar os QAs em Playwright e IA contextual.',
      targetCoverage90Days: 75,
      evaluatedBy: 'Accelerate Team NTT',
      updatedAt: new Date().toISOString()
    },
    {
      id: 'diag-2',
      hierarchyId: initialHierarchies[1].id,
      squadName: initialHierarchies[1].squad_name,
      coordenacao: initialHierarchies[1].coordenacao,
      gerencia: initialHierarchies[1].gerencia,
      stack: ['Cypress', 'TypeScript', 'Postman', 'Jest'],
      webCoverage: 55,
      apiCoverage: 40,
      mobileCoverage: 0,
      regressiveCount: 160,
      automatedCount: 88,
      hasPipeline: true,
      hasAutomatedData: false,
      opportunities: ['Automação de API REST', 'Massa de Dados Efêmera / Automatizada', 'IA para Manutenção de Suítes'],
      actionPlanText: 'Fortalecer esteira com quality gates bloqueantes. Criar fixtures automatizadas para cenários previdenciários.',
      targetCoverage90Days: 80,
      evaluatedBy: 'Accelerate Team NTT',
      updatedAt: new Date().toISOString()
    },
    {
      id: 'diag-3',
      hierarchyId: initialHierarchies[2].id,
      squadName: initialHierarchies[2].squad_name,
      coordenacao: initialHierarchies[2].coordenacao,
      gerencia: initialHierarchies[2].gerencia,
      stack: ['Playwright', 'TypeScript', 'RestAssured', 'K6'],
      webCoverage: 65,
      apiCoverage: 70,
      mobileCoverage: 10,
      regressiveCount: 180,
      automatedCount: 125,
      hasPipeline: true,
      hasAutomatedData: true,
      opportunities: ['Testes de Contrato (Pact / OpenAPI)', 'Performance e Carga Contínua'],
      actionPlanText: 'Acelerar automação de testes de performance e carga no pipeline para processamento noturno de fundos.',
      targetCoverage90Days: 85,
      evaluatedBy: 'Accelerate Team NTT',
      updatedAt: new Date().toISOString()
    },
    {
      id: 'diag-4',
      hierarchyId: initialHierarchies[3].id,
      squadName: initialHierarchies[3].squad_name,
      coordenacao: initialHierarchies[3].coordenacao,
      gerencia: initialHierarchies[3].gerencia,
      stack: ['Playwright', 'TypeScript', 'RestAssured', 'GitHub Actions'],
      webCoverage: 70,
      apiCoverage: 80,
      mobileCoverage: 15,
      regressiveCount: 210,
      automatedCount: 165,
      hasPipeline: true,
      hasAutomatedData: true,
      opportunities: ['IA para Manutenção e Refatoração de Suítes', 'Quality Gates Bloqueantes na Esteira (CI/CD)'],
      actionPlanText: 'Squad madura. Foco em introduzir agentes autônomos para triagem de falhas flaky e expandir cobertura de contratos OpenAPI.',
      targetCoverage90Days: 90,
      evaluatedBy: 'Accelerate Team NTT',
      updatedAt: new Date().toISOString()
    },
    {
      id: 'diag-5',
      hierarchyId: initialHierarchies[4].id,
      squadName: initialHierarchies[4].squad_name,
      coordenacao: initialHierarchies[4].coordenacao,
      gerencia: initialHierarchies[4].gerencia,
      stack: ['Robot Framework', 'Python', 'Appium', 'Postman'],
      webCoverage: 50,
      apiCoverage: 35,
      mobileCoverage: 30,
      regressiveCount: 190,
      automatedCount: 82,
      hasPipeline: false,
      hasAutomatedData: false,
      opportunities: ['Automação de API REST', 'Quality Gates Bloqueantes na Esteira (CI/CD)', 'Massa de Dados Efêmera / Automatizada'],
      actionPlanText: 'Estruturar pipeline com gates automáticos. Migrar automação de cobrança para execução paralela em esteira.',
      targetCoverage90Days: 75,
      evaluatedBy: 'Accelerate Team NTT',
      updatedAt: new Date().toISOString()
    },
    {
      id: 'diag-6',
      hierarchyId: initialHierarchies[5].id,
      squadName: initialHierarchies[5].squad_name,
      coordenacao: initialHierarchies[5].coordenacao,
      gerencia: initialHierarchies[5].gerencia,
      stack: ['Playwright', 'TypeScript', 'K6', 'Docker'],
      webCoverage: 60,
      apiCoverage: 65,
      mobileCoverage: 0,
      regressiveCount: 150,
      automatedCount: 95,
      hasPipeline: true,
      hasAutomatedData: true,
      opportunities: ['IA para Geração de Casos de Teste (Shift-Left)', 'Performance e Carga Contínua'],
      actionPlanText: 'Implantar testes de volumetria em dias de fechamento de mercado com execução assistida.',
      targetCoverage90Days: 85,
      evaluatedBy: 'Accelerate Team NTT',
      updatedAt: new Date().toISOString()
    },
    {
      id: 'diag-7',
      hierarchyId: initialHierarchies[6].id,
      squadName: initialHierarchies[6].squad_name,
      coordenacao: initialHierarchies[6].coordenacao,
      gerencia: initialHierarchies[6].gerencia,
      stack: ['RestAssured', 'Java', 'Pact', 'GitHub Actions'],
      webCoverage: 20,
      apiCoverage: 85,
      mobileCoverage: 0,
      regressiveCount: 220,
      automatedCount: 175,
      hasPipeline: true,
      hasAutomatedData: true,
      opportunities: ['Testes de Contrato (Pact / OpenAPI)', 'IA para Manutenção e Refatoração de Suítes'],
      actionPlanText: 'Garantir compliance com especificações do Banco Central e contratos de Open Finance com 100% de validação em esteira.',
      targetCoverage90Days: 95,
      evaluatedBy: 'Accelerate Team NTT',
      updatedAt: new Date().toISOString()
    },
    {
      id: 'diag-8',
      hierarchyId: initialHierarchies[7].id,
      squadName: initialHierarchies[7].squad_name,
      coordenacao: initialHierarchies[7].coordenacao,
      gerencia: initialHierarchies[7].gerencia,
      stack: ['Appium', 'TypeScript', 'Playwright', 'Jest'],
      webCoverage: 40,
      apiCoverage: 50,
      mobileCoverage: 65,
      regressiveCount: 240,
      automatedCount: 130,
      hasPipeline: true,
      hasAutomatedData: false,
      opportunities: ['Automação Mobile', 'Massa de Dados Efêmera / Automatizada', 'IA para Geração de Casos de Teste (Shift-Left)'],
      actionPlanText: 'Reduzir flakiness em testes móveis Android/iOS com isolamento de ambiente e mocks de API.',
      targetCoverage90Days: 80,
      evaluatedBy: 'Accelerate Team NTT',
      updatedAt: new Date().toISOString()
    }
  ];
}

// Initialize LocalStorage defaults if empty
function initializeLocalStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.HIERARCHIES)) {
    localStorage.setItem(STORAGE_KEYS.HIERARCHIES, JSON.stringify(initialHierarchies));
  }
  if (!localStorage.getItem(STORAGE_KEYS.QAS)) {
    localStorage.setItem(STORAGE_KEYS.QAS, JSON.stringify(initialQAs));
  }
  if (!localStorage.getItem(STORAGE_KEYS.QUESTIONS)) {
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questionsBank));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ASSESSMENTS)) {
    localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(generateInitialAssessments()));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SQUAD_DIAGNOSTICS)) {
    localStorage.setItem(STORAGE_KEYS.SQUAD_DIAGNOSTICS, JSON.stringify(generateInitialSquadDiagnostics()));
  }
}

// Run initial storage setup
initializeLocalStorage();

export const dataService = {
  isSupabaseActive: () => isSupabaseConfigured(),

  // Get Hierarchies
  async getHierarchies(): Promise<Hierarchy[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase.from('hierarchies').select('*');
        if (!error && data && data.length > 0) {
          return data as Hierarchy[];
        }
      } catch (err) {
        console.warn('Falha ao buscar hierarquias no Supabase, usando local:', err);
      }
    }
    const raw = localStorage.getItem(STORAGE_KEYS.HIERARCHIES);
    return raw ? JSON.parse(raw) : initialHierarchies;
  },

  // Get all QAs
  async getQAs(): Promise<QA[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('qas')
          .select('*, hierarchy:hierarchies(*)');
        if (!error && data && data.length > 0) {
          return data as unknown as QA[];
        }
      } catch (err) {
        console.warn('Falha ao buscar QAs no Supabase, usando local:', err);
      }
    }
    const raw = localStorage.getItem(STORAGE_KEYS.QAS);
    return raw ? JSON.parse(raw) : initialQAs;
  },

  // Find QA by SAP
  async findQABySAP(sap: string): Promise<QA | null> {
    const cleanSAP = sap.trim();
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('qas')
          .select('*, hierarchy:hierarchies(*)')
          .eq('sap', cleanSAP)
          .maybeSingle();
        if (!error && data) {
          return data as unknown as QA;
        }
      } catch (err) {
        console.warn('Falha ao buscar SAP no Supabase, buscando local:', err);
      }
    }
    const qas = await this.getQAs();
    return qas.find((q) => q.sap === cleanSAP) || null;
  },

  // Create or Update QA
  async upsertQA(qaData: Partial<QA> & { sap: string; name: string }): Promise<QA> {
    const qas = await this.getQAs();
    const existingIndex = qas.findIndex((q) => q.sap === qaData.sap);
    
    let updatedQA: QA;
    if (existingIndex >= 0) {
      updatedQA = { ...qas[existingIndex], ...qaData };
      qas[existingIndex] = updatedQA;
    } else {
      updatedQA = {
        id: crypto.randomUUID(),
        sap: qaData.sap,
        name: qaData.name,
        email: qaData.email,
        hierarchy_id: qaData.hierarchy_id,
        hierarchy: qaData.hierarchy,
        previous_scan_score: qaData.previous_scan_score,
        previous_scan_classification: qaData.previous_scan_classification || 'Não Avaliado',
        created_at: new Date().toISOString()
      };
      qas.push(updatedQA);
    }

    localStorage.setItem(STORAGE_KEYS.QAS, JSON.stringify(qas));

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('qas').upsert({
          id: updatedQA.id,
          sap: updatedQA.sap,
          name: updatedQA.name,
          email: updatedQA.email || null,
          hierarchy_id: updatedQA.hierarchy_id || null,
          previous_scan_score: updatedQA.previous_scan_score || null,
          previous_scan_classification: updatedQA.previous_scan_classification || 'Não Avaliado'
        });
      } catch (err) {
        console.warn('Erro ao salvar QA no Supabase:', err);
      }
    }

    return updatedQA;
  },

  // Get Questions Bank
  async getQuestions(): Promise<Question[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase.from('questions').select('*').order('id', { ascending: true });
        if (!error && data && data.length > 0) {
          return data.map((d) => ({
            id: d.id,
            code: d.code,
            dimension: d.dimension as any,
            dimensionLabel: d.dimension_label,
            title: d.title,
            statement: d.statement,
            options: d.options as any,
            correctAnswer: d.correct_answer,
            explanation: d.explanation || undefined,
            weight: Number(d.weight)
          }));
        }
      } catch (err) {
        console.warn('Falha ao buscar questões no Supabase, usando local:', err);
      }
    }
    const raw = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
    return raw ? JSON.parse(raw) : questionsBank;
  },

  // Save Assessment Result
  async saveAssessment(result: AssessmentResult): Promise<AssessmentResult> {
    const raw = localStorage.getItem(STORAGE_KEYS.ASSESSMENTS);
    const list: AssessmentResult[] = raw ? JSON.parse(raw) : [];
    
    const newResult: AssessmentResult = {
      ...result,
      id: result.id || crypto.randomUUID(),
      completedAt: result.completedAt || new Date().toISOString()
    };

    list.unshift(newResult);
    localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(list));

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('assessments').insert({
          id: newResult.id,
          qa_id: newResult.qaId,
          status: 'completed',
          answers: newResult.answers,
          practical_repo_url: newResult.practicalChallenge?.repoUrl || null,
          practical_storage_path: newResult.practicalChallenge?.storagePath || null,
          practical_strategy: newResult.practicalChallenge?.strategySummary || null,
          ai_tool_used: newResult.aiChallenge?.toolUsed || null,
          ai_prompt: newResult.aiChallenge?.prompt || null,
          ai_accepted_rejected: newResult.aiChallenge?.acceptedRejectedNotes || null,
          ai_hallucination_answer: newResult.aiChallenge?.hallucinationAnalysis || null,
          ai_refactoring: newResult.aiChallenge?.codeRefactoringNotes || null,
          quality_fundamentals_score: newResult.qualityFundamentalsScore,
          automation_readiness_score: newResult.automationReadinessScore,
          engineering_readiness_score: newResult.engineeringReadinessScore,
          cicd_data_readiness_score: newResult.cicdDataReadinessScore,
          ai_readiness_score: newResult.aiReadinessScore,
          overall_score: newResult.overallScore,
          classification: newResult.classification,
          predominant_profile: newResult.predominantProfile,
          transition_diagnosis: newResult.transitionDiagnosis,
          recommended_action: newResult.recommendedAction,
          completed_at: newResult.completedAt
        });
      } catch (err) {
        console.warn('Erro ao salvar avaliação no Supabase:', err);
      }
    }

    return newResult;
  },

  // Get Assessments
  async getAssessments(): Promise<AssessmentResult[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('assessments')
          .select(`
            *,
            qa:qas (
              id,
              name,
              sap,
              previous_scan_classification,
              hierarchy:hierarchies (
                coordenacao,
                squad_name
              )
            )
          `)
          .order('completed_at', { ascending: false });

        if (!error && data && data.length > 0) {
          return data.map((d: any) => ({
            id: d.id,
            qaId: d.qa_id,
            qaName: d.qa?.name,
            sap: d.qa?.sap,
            coordenacao: d.qa?.hierarchy?.coordenacao,
            squad: d.qa?.hierarchy?.squad_name,
            qualityFundamentalsScore: Number(d.quality_fundamentals_score),
            automationReadinessScore: Number(d.automation_readiness_score),
            engineeringReadinessScore: Number(d.engineering_readiness_score),
            cicdDataReadinessScore: Number(d.cicd_data_readiness_score),
            aiReadinessScore: Number(d.ai_readiness_score),
            overallScore: Number(d.overall_score),
            classification: d.classification as any,
            previousClassification: d.qa?.previous_scan_classification as any,
            predominantProfile: d.predominant_profile,
            transitionDiagnosis: d.transition_diagnosis || '',
            recommendedAction: d.recommended_action || '',
            answers: (d.answers as any) || {},
            practicalChallenge: {
              repoUrl: d.practical_repo_url || undefined,
              storagePath: d.practical_storage_path || undefined,
              strategySummary: d.practical_strategy || ''
            },
            aiChallenge: {
              toolUsed: d.ai_tool_used || '',
              prompt: d.ai_prompt || '',
              acceptedRejectedNotes: d.ai_accepted_rejected || '',
              hallucinationAnalysis: d.ai_hallucination_answer || '',
              codeRefactoringNotes: d.ai_refactoring || ''
            },
            completedAt: d.completed_at
          }));
        }
      } catch (err) {
        console.warn('Falha ao buscar avaliações no Supabase, usando local:', err);
      }
    }
    const raw = localStorage.getItem(STORAGE_KEYS.ASSESSMENTS);
    return raw ? JSON.parse(raw) : [];
  },

  // Upload ZIP to Supabase Storage
  async uploadPracticalZip(file: File, sap: string): Promise<string> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const fileExt = file.name.split('.').pop() || 'zip';
        const fileName = `${sap}_${Date.now()}.${fileExt}`;
        const filePath = `submissions/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('challenge-submissions')
          .upload(filePath, file, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('challenge-submissions')
          .getPublicUrl(filePath);

        return publicUrlData.publicUrl;
      } catch (err) {
        console.warn('Erro ao fazer upload no Supabase Storage:', err);
      }
    }
    // Fallback: Local object URL representation
    return `local-storage://${sap}/${file.name}`;
  },

  // Get Squad Diagnostics
  async getSquadDiagnostics(): Promise<SquadDiagnostic[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('squad_diagnostics')
          .select(`
            *,
            hierarchy:hierarchies (
              squad_name,
              coordenacao,
              gerencia
            )
          `);

        if (!error && data && data.length > 0) {
          return data.map((d: any) => ({
            id: d.id,
            hierarchyId: d.hierarchy_id,
            squadName: d.hierarchy?.squad_name || 'Squad',
            coordenacao: d.hierarchy?.coordenacao || '',
            gerencia: d.hierarchy?.gerencia || '',
            stack: d.stack || [],
            webCoverage: Number(d.web_coverage),
            apiCoverage: Number(d.api_coverage),
            mobileCoverage: Number(d.mobile_coverage),
            regressiveCount: d.regressive_count,
            automatedCount: d.automated_count,
            hasPipeline: d.has_pipeline,
            hasAutomatedData: d.has_automated_data,
            opportunities: (d.opportunities as string[]) || [],
            actionPlanText: d.action_plan_text || '',
            targetCoverage90Days: Number(d.target_coverage_90_days),
            evaluatedBy: d.evaluated_by || 'Accelerate Team',
            updatedAt: d.updated_at
          }));
        }
      } catch (err) {
        console.warn('Falha ao buscar diagnósticos no Supabase, usando local:', err);
      }
    }
    const raw = localStorage.getItem(STORAGE_KEYS.SQUAD_DIAGNOSTICS);
    return raw ? JSON.parse(raw) : [];
  },

  // Save Squad Diagnostic
  async saveSquadDiagnostic(diagnostic: SquadDiagnostic): Promise<SquadDiagnostic> {
    const raw = localStorage.getItem(STORAGE_KEYS.SQUAD_DIAGNOSTICS);
    const list: SquadDiagnostic[] = raw ? JSON.parse(raw) : [];
    
    const existingIndex = list.findIndex((item) => item.hierarchyId === diagnostic.hierarchyId);
    const updated: SquadDiagnostic = {
      ...diagnostic,
      id: diagnostic.id || crypto.randomUUID(),
      updatedAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      list[existingIndex] = updated;
    } else {
      list.push(updated);
    }

    localStorage.setItem(STORAGE_KEYS.SQUAD_DIAGNOSTICS, JSON.stringify(list));

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('squad_diagnostics').upsert({
          id: updated.id,
          hierarchy_id: updated.hierarchyId,
          stack: updated.stack,
          web_coverage: updated.webCoverage,
          api_coverage: updated.apiCoverage,
          mobile_coverage: updated.mobileCoverage,
          regressive_count: updated.regressiveCount,
          automated_count: updated.automatedCount,
          has_pipeline: updated.hasPipeline,
          has_automated_data: updated.hasAutomatedData,
          opportunities: updated.opportunities,
          action_plan_text: updated.actionPlanText,
          target_coverage_90_days: updated.targetCoverage90Days,
          evaluated_by: updated.evaluatedBy,
          updated_at: updated.updatedAt
        });
      } catch (err) {
        console.warn('Erro ao salvar diagnóstico no Supabase:', err);
      }
    }

    return updated;
  },

  // Reset Demo Data
  resetDemoData() {
    localStorage.removeItem(STORAGE_KEYS.HIERARCHIES);
    localStorage.removeItem(STORAGE_KEYS.QAS);
    localStorage.removeItem(STORAGE_KEYS.ASSESSMENTS);
    localStorage.removeItem(STORAGE_KEYS.SQUAD_DIAGNOSTICS);
    localStorage.removeItem(STORAGE_KEYS.QUESTIONS);
    initializeLocalStorage();
  }
};
