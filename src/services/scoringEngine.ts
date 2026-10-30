import { questionsBank } from '../data/questionsBank';
import { PracticalChallengeSubmission, AiChallengeSubmission, AssessmentResult } from '../types/assessment';
import { ScanClassification } from '../types/qa';

export interface ScoringInput {
  qaId: string;
  qaName?: string;
  sap?: string;
  coordenacao?: string;
  squad?: string;
  previousClassification?: ScanClassification;
  answers: Record<number, string>;
  practicalChallenge?: PracticalChallengeSubmission;
  aiChallenge?: AiChallengeSubmission;
}

export function calculateAssessmentResult(input: ScoringInput): AssessmentResult {
  const { answers, practicalChallenge, aiChallenge } = input;

  // 1. Calculate accuracy per dimension for theoretical questions
  const dimensionStats: Record<string, { total: number; correct: number }> = {
    fundamentos: { total: 0, correct: 0 },
    automacao: { total: 0, correct: 0 },
    engenharia: { total: 0, correct: 0 },
    cicd_massa: { total: 0, correct: 0 },
    ia_aplicada: { total: 0, correct: 0 },
  };

  questionsBank.forEach((q) => {
    const stat = dimensionStats[q.dimension];
    if (stat) {
      stat.total += 1;
      const userAnswer = answers[q.id];
      if (userAnswer && userAnswer.trim().toUpperCase() === q.correctAnswer.trim().toUpperCase()) {
        stat.correct += 1;
      }
    }
  });

  const getDimensionPercentage = (dim: string) => {
    const s = dimensionStats[dim];
    if (!s || s.total === 0) return 0;
    return (s.correct / s.total) * 100;
  };

  // Base theoretical scores
  let qualityFundamentalsScore = Math.round(getDimensionPercentage('fundamentos'));
  let baseAutomation = getDimensionPercentage('automacao');
  let baseEngineering = getDimensionPercentage('engenharia');
  let cicdDataReadinessScore = Math.round(getDimensionPercentage('cicd_massa'));
  let baseAi = getDimensionPercentage('ia_aplicada');

  // 2. Score Practical Challenge
  // If repository provided or storage uploaded with strategy
  let practicalScore = 0;
  if (practicalChallenge) {
    let pts = 0;
    if (practicalChallenge.repoUrl?.trim() || practicalChallenge.storagePath?.trim()) {
      pts += 50; // Repository or ZIP submitted
    }
    const strategyLen = practicalChallenge.strategySummary?.trim().length || 0;
    if (strategyLen > 80) pts += 50;
    else if (strategyLen > 30) pts += 30;
    else if (strategyLen > 0) pts += 15;
    practicalScore = pts;
  } else {
    practicalScore = 70; // baseline neutral if in quick mode
  }

  // Automation Readiness: 60% theory + 40% practical
  const automationReadinessScore = Math.round(baseAutomation * 0.6 + practicalScore * 0.4);

  // Engineering Readiness: 70% theory + 30% practical
  const engineeringReadinessScore = Math.round(baseEngineering * 0.7 + practicalScore * 0.3);

  // 3. Score AI Challenge
  let aiChallengeScore = 0;
  let criticalDecisionScore = 0;
  if (aiChallenge) {
    let aiPts = 0;
    if (aiChallenge.toolUsed) aiPts += 20;
    if (aiChallenge.prompt?.trim().length > 40) aiPts += 30;
    if (aiChallenge.hallucinationAnalysis?.trim().length > 30) aiPts += 30;
    if (aiChallenge.codeRefactoringNotes?.trim().length > 30) aiPts += 20;
    aiChallengeScore = aiPts;

    // Critical decision score evaluates refusal of false AI premises & filtering
    let critPts = 30; // base
    if (aiChallenge.acceptedRejectedNotes?.trim().length > 30) critPts += 40;
    if (aiChallenge.hallucinationAnalysis?.toLowerCase().includes('cpf') || 
        aiChallenge.hallucinationAnalysis?.toLowerCase().includes('única') ||
        aiChallenge.hallucinationAnalysis?.toLowerCase().includes('banco')) {
      critPts += 30;
    }
    criticalDecisionScore = Math.min(100, critPts);
  } else {
    aiChallengeScore = 70;
    criticalDecisionScore = 70;
  }

  // AI Readiness: 60% theory + 40% challenge
  const aiReadinessScore = Math.round(baseAi * 0.6 + aiChallengeScore * 0.4);

  // 4. Overall Weighted Score (Weights: Fund 10%, Auto 30%, Eng 20%, CI 10%, AI 20%, Crit 10%)
  const overallScore = Math.round(
    qualityFundamentalsScore * 0.10 +
    automationReadinessScore * 0.30 +
    engineeringReadinessScore * 0.20 +
    cicdDataReadinessScore * 0.10 +
    aiReadinessScore * 0.20 +
    criticalDecisionScore * 0.10
  );

  // 5. Classification with 70% Automation Gate
  let classification: 'Alto' | 'Médio' | 'Baixo' = 'Baixo';
  if (overallScore >= 80 && automationReadinessScore >= 70) {
    classification = 'Alto';
  } else if (overallScore >= 60) {
    classification = 'Médio';
  } else {
    classification = 'Baixo';
  }

  // 6. Predominant Profile
  let predominantProfile = 'Quality Engineer';
  if (automationReadinessScore >= 80 && engineeringReadinessScore >= 80 && aiReadinessScore >= 80) {
    predominantProfile = 'Technical Enabler';
  } else if (automationReadinessScore >= 70 && aiReadinessScore >= 80) {
    predominantProfile = 'AI-Enabled QE';
  } else if (automationReadinessScore >= 80) {
    predominantProfile = 'Automation Specialist';
  } else if (qualityFundamentalsScore >= 75 && automationReadinessScore < 60) {
    predominantProfile = 'Quality Analyst';
  } else if (overallScore < 60) {
    predominantProfile = 'Emerging QE';
  }

  // 7. Transition Matrix Diagnosis & Recommended Action
  const prev = input.previousClassification || 'Não Avaliado';
  let transitionDiagnosis = 'Primeira avaliação estruturada';
  let recommendedAction = 'Acompanhar conforme trilha inicial';

  if (prev === 'Alto') {
    if (classification === 'Alto') {
      transitionDiagnosis = 'Desempenho confirmado';
      recommendedAction = 'Manter / Habilitador Técnico';
    } else if (classification === 'Médio') {
      transitionDiagnosis = 'Atenção técnica';
      recommendedAction = 'Habilitar nos gaps pontuais';
    } else {
      transitionDiagnosis = 'Divergência Crítica';
      recommendedAction = 'Gate: Entrevista Obrigatória com Liderança';
    }
  } else if (prev === 'Médio') {
    if (classification === 'Alto') {
      transitionDiagnosis = 'Evolução consistente comprovada';
      recommendedAction = 'Manter / Potencial Multiplicador';
    } else if (classification === 'Médio') {
      transitionDiagnosis = 'Desempenho estável';
      recommendedAction = 'Habilitar nos gaps pontuais';
    } else {
      transitionDiagnosis = 'Declínio técnico';
      recommendedAction = 'Avaliar plano intensivo de habilitação';
    }
  } else if (prev === 'Baixo') {
    if (classification === 'Alto') {
      transitionDiagnosis = 'Evolução relevante / Salto de maturidade';
      recommendedAction = 'Manter / Reconhecimento';
    } else if (classification === 'Médio') {
      transitionDiagnosis = 'Evolução moderada comprovada';
      recommendedAction = 'Manter e acompanhar plano de aceleração';
    } else {
      transitionDiagnosis = 'Gap técnico persistente';
      recommendedAction = 'Avaliar substituição ou plano emergencial';
    }
  } else {
    // Não Avaliado
    if (classification === 'Alto') {
      transitionDiagnosis = 'Entrada de alto desempenho';
      recommendedAction = 'Habilitador Técnico / Multiplicador';
    } else if (classification === 'Médio') {
      transitionDiagnosis = 'Entrada consistente';
      recommendedAction = 'Alocar em squad e acompanhar gaps';
    } else {
      transitionDiagnosis = 'Entrada com gap relevante';
      recommendedAction = 'Trilha de nivelamento intensivo';
    }
  }

  return {
    qaId: input.qaId,
    qaName: input.qaName,
    sap: input.sap,
    coordenacao: input.coordenacao,
    squad: input.squad,
    qualityFundamentalsScore,
    automationReadinessScore,
    engineeringReadinessScore,
    cicdDataReadinessScore,
    aiReadinessScore,
    overallScore,
    classification,
    previousClassification: prev,
    predominantProfile,
    transitionDiagnosis,
    recommendedAction,
    answers,
    practicalChallenge,
    aiChallenge,
    completedAt: new Date().toISOString()
  };
}
