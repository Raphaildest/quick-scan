export type AssessmentDimension = 
  | 'fundamentos' 
  | 'automacao' 
  | 'engenharia' 
  | 'cicd_massa' 
  | 'ia_aplicada';

export interface QuestionOption {
  id: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
}

export interface Question {
  id: number;
  code: string;
  dimension: AssessmentDimension;
  dimensionLabel: string;
  title: string;
  statement: string;
  options: QuestionOption[];
  correctAnswer: string;
  explanation?: string;
  weight: number;
}

export interface PracticalChallengeSubmission {
  repoUrl?: string;
  storagePath?: string;
  fileName?: string;
  strategySummary: string; // Strategy summary (API vs UI, fixtures, etc)
}

export interface AiChallengeSubmission {
  toolUsed: string; // 'ChatGPT' | 'Claude' | 'Copilot' | 'Outro'
  prompt: string;
  acceptedRejectedNotes: string;
  hallucinationAnalysis: string;
  codeRefactoringNotes: string;
}

export interface AssessmentResult {
  id?: string;
  qaId: string;
  qaName?: string;
  sap?: string;
  coordenacao?: string;
  squad?: string;
  qualityFundamentalsScore: number;
  automationReadinessScore: number;
  engineeringReadinessScore: number;
  cicdDataReadinessScore: number;
  aiReadinessScore: number;
  overallScore: number;
  classification: 'Alto' | 'Médio' | 'Baixo';
  previousClassification?: 'Alto' | 'Médio' | 'Baixo' | 'Não Avaliado';
  predominantProfile: string;
  transitionDiagnosis: string;
  recommendedAction: string;
  answers: Record<number, string>; // questionId -> selectedOptionId
  practicalChallenge?: PracticalChallengeSubmission;
  aiChallenge?: AiChallengeSubmission;
  completedAt: string;
}
