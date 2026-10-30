export interface DimensionScores {
  automation: number;     // 0 a 100
  ai: number;             // 0 a 100
  engineering: number;    // 0 a 100
  cicd: number;           // 0 a 100
  fundamentals: number;   // 0 a 100
}

export type ClassificationType = 'Alto' | 'Médio' | 'Baixo';

export interface QASubmission {
  id: string;
  name: string;
  email: string;
  area: string; // Ex: Investimentos, Cartões, Meios de Pagamento, Mobile, Core Banking
  answers: Record<number, string>; // questionId -> optionId ('A', 'B', 'C', 'D')
  practicalRepoUrl?: string;
  aiNotes?: string;
  scores: DimensionScores;
  overallScore: number;
  classification: ClassificationType;
  submittedAt: string;
}

