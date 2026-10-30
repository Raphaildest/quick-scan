import React, { useState, useEffect } from 'react';
import { QAIdentification } from '../components/public-qa/QAIdentification';
import { QAQuestionnaire } from '../components/public-qa/QAQuestionnaire';
import { QASuccessScreen } from '../components/public-qa/QASuccessScreen';
import { questionsService } from '../services/questionsService';
import { submissionService } from '../services/submissionService';
import { Question } from '../types/assessment';

type PublicStep = 'identification' | 'questionnaire' | 'success';

export const QAPublicPage: React.FC = () => {
  const [step, setStep] = useState<PublicStep>('identification');
  const [qaData, setQaData] = useState<{ name: string; email: string; area: string } | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setQuestions(questionsService.getQuestions());
  }, []);

  const handleStart = (data: { name: string; email: string; area: string }) => {
    setQaData(data);
    setStep('questionnaire');
  };

  const handleSubmit = async (
    answers: Record<number, string>,
    practicalUrl?: string,
    aiNotes?: string
  ) => {
    if (!qaData) return;
    setSubmitting(true);

    try {
      await submissionService.saveSubmission({
        name: qaData.name,
        email: qaData.email,
        area: qaData.area,
        answers,
        practicalRepoUrl: practicalUrl,
        aiNotes
      });
      setStep('success');
    } catch (err) {
      console.error('Erro ao salvar submissão:', err);
      alert('Ocorreu um erro ao enviar. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRestart = () => {
    setQaData(null);
    setStep('identification');
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] bg-slate-50 py-4">
      {step === 'identification' && (
        <QAIdentification onStart={handleStart} />
      )}

      {step === 'questionnaire' && qaData && (
        <QAQuestionnaire
          qaName={qaData.name}
          qaArea={qaData.area}
          questions={questions}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      )}

      {step === 'success' && qaData && (
        <QASuccessScreen
          qaName={qaData.name}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

