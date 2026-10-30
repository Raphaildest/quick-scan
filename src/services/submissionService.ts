import { QASubmission } from '../types/qaSubmission';
import { calculateSubmissionAnalytics } from './analyticsEngine';

const STORAGE_KEYS = {
  SUBMISSIONS: 'quickscan_qa_submissions_v1'
};

const INITIAL_MOCK_SUBMISSIONS: QASubmission[] = [
  {
    id: 'sub-1',
    name: 'Ana Souza',
    email: 'ana.souza@nttdata.com',
    area: 'Investimentos & Previdência',
    answers: { 1: 'B', 2: 'C', 3: 'C', 4: 'B', 5: 'C', 6: 'C', 7: 'B', 8: 'B', 10: 'C', 13: 'B', 14: 'C', 15: 'B', 17: 'C', 18: 'A', 21: 'C', 22: 'B', 23: 'B', 27: 'A', 28: 'A' },
    practicalRepoUrl: 'https://github.com/ana-souza/pagamentos-playwright-e2e',
    aiNotes: 'Utilizei ChatGPT-4o para modelagem de cenários em Gherkin. Rejeitei sugestão que duplicava chaves PIX em contas diferentes.',
    scores: {
      automation: 88,
      ai: 90,
      engineering: 85,
      cicd: 80,
      fundamentals: 90
    },
    overallScore: 87,
    classification: 'Alto',
    submittedAt: '2026-10-28T14:20:00Z'
  },
  {
    id: 'sub-2',
    name: 'Bruno Lima',
    email: 'bruno.lima@nttdata.com',
    area: 'Meios de Pagamentos & PIX',
    answers: { 1: 'B', 2: 'A', 3: 'A', 5: 'A', 6: 'A', 7: 'A', 13: 'A', 21: 'A' },
    practicalRepoUrl: '',
    aiNotes: 'Apoio pontual para geração de dados sintéticos.',
    scores: {
      automation: 45,
      ai: 50,
      engineering: 48,
      cicd: 40,
      fundamentals: 60
    },
    overallScore: 47,
    classification: 'Baixo',
    submittedAt: '2026-10-28T16:45:00Z'
  },
  {
    id: 'sub-3',
    name: 'Carla Reis',
    email: 'carla.reis@nttdata.com',
    area: 'Cartões & Cobrança',
    answers: { 1: 'B', 2: 'C', 3: 'C', 5: 'C', 6: 'B', 7: 'B', 13: 'B', 14: 'C', 21: 'C', 22: 'B' },
    practicalRepoUrl: 'https://gitlab.com/carla-qa/api-rest-cypress',
    aiNotes: 'Prompt estruturado para análise de casos de teste de concorrência em cartões.',
    scores: {
      automation: 75,
      ai: 72,
      engineering: 70,
      cicd: 65,
      fundamentals: 80
    },
    overallScore: 73,
    classification: 'Médio',
    submittedAt: '2026-10-29T09:15:00Z'
  },
  {
    id: 'sub-4',
    name: 'Diego Alves',
    email: 'diego.alves@nttdata.com',
    area: 'Canais Digitais Mobile',
    answers: { 1: 'B', 2: 'C', 3: 'C', 4: 'B', 5: 'C', 6: 'C', 7: 'B', 8: 'B', 10: 'C', 13: 'B', 14: 'C', 15: 'B', 17: 'C', 18: 'A', 21: 'C', 22: 'B', 23: 'B', 27: 'A', 28: 'A' },
    practicalRepoUrl: 'https://github.com/diego-alves/appium-robot-banking',
    aiNotes: 'Refatoração assistida de scripts Appium com remoção de esperas estáticas.',
    scores: {
      automation: 92,
      ai: 88,
      engineering: 90,
      cicd: 85,
      fundamentals: 95
    },
    overallScore: 90,
    classification: 'Alto',
    submittedAt: '2026-10-29T11:30:00Z'
  },
  {
    id: 'sub-5',
    name: 'Fernanda Rocha',
    email: 'fernanda.rocha@nttdata.com',
    area: 'Investimentos & Previdência',
    answers: { 1: 'B', 2: 'C', 3: 'B', 5: 'C', 6: 'B', 7: 'B', 13: 'B', 21: 'C' },
    scores: {
      automation: 68,
      ai: 65,
      engineering: 66,
      cicd: 60,
      fundamentals: 75
    },
    overallScore: 67,
    classification: 'Médio',
    submittedAt: '2026-10-29T15:00:00Z'
  },
  {
    id: 'sub-6',
    name: 'Lucas Martins',
    email: 'lucas.martins@nttdata.com',
    area: 'Core Banking & Liquidação',
    answers: { 1: 'B', 2: 'A', 3: 'A', 5: 'B', 6: 'A', 13: 'A' },
    scores: {
      automation: 42,
      ai: 50,
      engineering: 46,
      cicd: 45,
      fundamentals: 55
    },
    overallScore: 46,
    classification: 'Baixo',
    submittedAt: '2026-10-30T08:20:00Z'
  }
];

function initSubmissionsStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.SUBMISSIONS)) {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(INITIAL_MOCK_SUBMISSIONS));
  }
}

initSubmissionsStorage();

export const submissionService = {
  // Get all submissions
  async getAllSubmissions(): Promise<QASubmission[]> {
    const raw = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    return raw ? JSON.parse(raw) : INITIAL_MOCK_SUBMISSIONS;
  },

  // Save new QA submission (Public)
  async saveSubmission(data: {
    name: string;
    email: string;
    area: string;
    answers: Record<number, string>;
    practicalRepoUrl?: string;
    aiNotes?: string;
  }): Promise<QASubmission> {
    const analytics = calculateSubmissionAnalytics(data.answers);

    const newSubmission: QASubmission = {
      id: crypto.randomUUID(),
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      area: data.area.trim(),
      answers: data.answers,
      practicalRepoUrl: data.practicalRepoUrl?.trim() || undefined,
      aiNotes: data.aiNotes?.trim() || undefined,
      scores: analytics.scores,
      overallScore: analytics.overallScore,
      classification: analytics.classification,
      submittedAt: new Date().toISOString()
    };

    const submissions = await this.getAllSubmissions();
    submissions.unshift(newSubmission);

    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
    return newSubmission;
  },

  // Reset to initial mock data
  resetMockData(): void {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(INITIAL_MOCK_SUBMISSIONS));
  }
};

