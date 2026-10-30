import React, { useState, useEffect } from 'react';
import { QA } from '../types/qa';
import { Question, PracticalChallengeSubmission, AiChallengeSubmission, AssessmentResult } from '../types/assessment';
import { IdentificationStep } from '../components/qa-portal/IdentificationStep';
import { AssessmentQuestion } from '../components/qa-portal/AssessmentQuestion';
import { PracticalChallenge } from '../components/qa-portal/PracticalChallenge';
import { AiChallenge } from '../components/qa-portal/AiChallenge';
import { SubmissionSuccess } from '../components/qa-portal/SubmissionSuccess';
import { dataService } from '../services/dataService';
import { calculateAssessmentResult } from '../services/scoringEngine';

interface QAPortalPageProps {
  onGoToAnalytics: () => void;
}

type QAFlowStep = 'identification' | 'questions' | 'practical' | 'ai' | 'success';

export const QAPortalPage: React.FC<QAPortalPageProps> = ({ onGoToAnalytics }) => {
  const [currentStep, setCurrentStep] = useState<QAFlowStep>('identification');
  const [activeQA, setActiveQA] = useState<QA | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [practicalData, setPracticalData] = useState<PracticalChallengeSubmission | undefined>();
  const [aiData, setAiData] = useState<AiChallengeSubmission | undefined>();
  const [finalResult, setFinalResult] = useState<AssessmentResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadQuestions() {
      const qList = await dataService.getQuestions();
      setQuestions(qList);
    }
    loadQuestions();
  }, []);

  const handleIdentified = (qa: QA) => {
    setActiveQA(qa);
    setCurrentStep('questions');
    setCurrentQuestionIndex(0);
  };

  const handleSelectAnswer = (questionId: number, answerId: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const handleAutoFillDemo = () => {
    const demoAnswers: Record<number, string> = { ...userAnswers };
    questions.forEach((q) => {
      if (!demoAnswers[q.id]) {
        demoAnswers[q.id] = q.correctAnswer;
      }
    });
    setUserAnswers(demoAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setCurrentStep('practical');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSavePractical = (data: PracticalChallengeSubmission) => {
    setPracticalData(data);
    setCurrentStep('ai');
  };

  const handleSubmitCompleteAssessment = async (aiChallengeData: AiChallengeSubmission) => {
    if (!activeQA) return;
    setSubmitting(true);
    setAiData(aiChallengeData);

    const calculated = calculateAssessmentResult({
      qaId: activeQA.id,
      qaName: activeQA.name,
      sap: activeQA.sap,
      coordenacao: activeQA.hierarchy?.coordenacao,
      squad: activeQA.hierarchy?.squad_name,
      previousClassification: activeQA.previous_scan_classification,
      answers: userAnswers,
      practicalChallenge: practicalData,
      aiChallenge: aiChallengeData
    });

    const saved = await dataService.saveAssessment(calculated);
    setFinalResult(saved);
    setSubmitting(false);
    setCurrentStep('success');
  };

  const handleRestart = () => {
    setActiveQA(null);
    setUserAnswers({});
    setPracticalData(undefined);
    setAiData(undefined);
    setFinalResult(null);
    setCurrentQuestionIndex(0);
    setCurrentStep('identification');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-4">
      {currentStep === 'identification' && (
        <IdentificationStep onIdentified={handleIdentified} />
      )}

      {currentStep === 'questions' && questions.length > 0 && (
        <AssessmentQuestion
          question={questions[currentQuestionIndex]}
          currentIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          selectedAnswer={userAnswers[questions[currentQuestionIndex].id]}
          userAnswers={userAnswers}
          allQuestions={questions}
          onSelectAnswer={handleSelectAnswer}
          onJumpToQuestion={(idx) => setCurrentQuestionIndex(idx)}
          onAutoFillDemo={handleAutoFillDemo}
          onNext={handleNextQuestion}
          onPrevious={handlePreviousQuestion}
          isFirst={currentQuestionIndex === 0}
          isLast={currentQuestionIndex === questions.length - 1}
        />
      )}

      {currentStep === 'practical' && activeQA && (
        <PracticalChallenge
          sap={activeQA.sap}
          initialData={practicalData}
          onSave={handleSavePractical}
          onPrevious={() => {
            setCurrentStep('questions');
            setCurrentQuestionIndex(questions.length - 1);
          }}
        />
      )}

      {currentStep === 'ai' && (
        <AiChallenge
          initialData={aiData}
          onSubmitAssessment={handleSubmitCompleteAssessment}
          onPrevious={() => setCurrentStep('practical')}
          submitting={submitting}
        />
      )}

      {currentStep === 'success' && finalResult && (
        <SubmissionSuccess
          result={finalResult}
          onGoToAnalytics={onGoToAnalytics}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};
