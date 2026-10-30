import { Question } from '../types/assessment';
import { DimensionScores, ClassificationType } from '../types/qaSubmission';
import { questionsService } from './questionsService';

export function calculateSubmissionAnalytics(
  answers: Record<number, string>,
  customQuestions?: Question[]
): {
  scores: DimensionScores;
  overallScore: number;
  classification: ClassificationType;
} {
  const activeQuestions = customQuestions || questionsService.getQuestions();

  const dimensionCounts: Record<string, { total: number; correct: number }> = {
    automacao: { total: 0, correct: 0 },
    ia_aplicada: { total: 0, correct: 0 },
    engenharia: { total: 0, correct: 0 },
    cicd_massa: { total: 0, correct: 0 },
    fundamentos: { total: 0, correct: 0 }
  };

  activeQuestions.forEach((q: Question) => {
    const dim = q.dimension;
    if (!dimensionCounts[dim]) return;

    dimensionCounts[dim].total += 1;
    const userAnswer = answers[q.id];
    if (userAnswer && userAnswer.trim().toUpperCase() === q.correctAnswer.trim().toUpperCase()) {
      dimensionCounts[dim].correct += 1;
    }
  });

  const getScore = (key: string): number => {
    const item = dimensionCounts[key];
    if (!item || item.total === 0) return 0;
    return Math.round((item.correct / item.total) * 100);
  };

  const automation = getScore('automacao');
  const ai = getScore('ia_aplicada');
  const engineering = getScore('engenharia');
  const cicd = getScore('cicd_massa');
  const fundamentals = getScore('fundamentos');

  // Weighted overall calculation
  // Automação: 30%, IA: 20%, Engenharia: 20%, CI/CD: 15%, Fundamentos: 15%
  const overallScore = Math.round(
    automation * 0.30 +
    ai * 0.20 +
    engineering * 0.20 +
    cicd * 0.15 +
    fundamentals * 0.15
  );

  let classification: ClassificationType = 'Baixo';
  if (overallScore >= 80 && automation >= 70) {
    classification = 'Alto';
  } else if (overallScore >= 60) {
    classification = 'Médio';
  } else {
    classification = 'Baixo';
  }

  return {
    scores: {
      automation,
      ai,
      engineering,
      cicd,
      fundamentals
    },
    overallScore,
    classification
  };
}

