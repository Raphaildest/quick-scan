import React from 'react';
import { Question } from '../../types/assessment';
import { CheckCircle2, ChevronRight, ChevronLeft, HelpCircle } from 'lucide-react';

interface AssessmentQuestionProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswer?: string;
  userAnswers?: Record<number, string>;
  allQuestions?: Question[];
  onSelectAnswer: (questionId: number, answerId: string) => void;
  onJumpToQuestion?: (index: number) => void;
  onAutoFillDemo?: () => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export const AssessmentQuestion: React.FC<AssessmentQuestionProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  userAnswers = {},
  allQuestions = [],
  onSelectAnswer,
  onJumpToQuestion,
  onAutoFillDemo,
  onNext,
  onPrevious,
  isFirst,
  isLast
}) => {
  const dimensionColors = {
    fundamentos: 'bg-blue-100 text-blue-800 border-blue-200',
    automacao: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    engenharia: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    cicd_massa: 'bg-teal-100 text-teal-800 border-teal-200',
    ia_aplicada: 'bg-amber-100 text-amber-800 border-amber-200',
  }[question.dimension] || 'bg-slate-100 text-slate-800 border-slate-200';

  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Progress Bar Header */}
        <div className="bg-slate-900 text-white p-5">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-slate-300">
              Questão <strong className="text-white text-sm">{currentIndex + 1}</strong> de {totalQuestions}
            </span>
            <div className="flex items-center space-x-2">
              {onAutoFillDemo && (
                <button
                  type="button"
                  onClick={onAutoFillDemo}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition"
                  title="Preencher respostas automaticamente para demonstração rápida"
                >
                  ⚡ Preencher Demo
                </button>
              )}
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase border bg-slate-800 text-cyan-300 border-slate-700">
                {progressPercent}% Concluído
              </span>
            </div>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
            <div
              className="bg-gradient-to-r from-ntt-blue to-cyan-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Quick Question Pills Grid */}
          {onJumpToQuestion && totalQuestions > 0 && (
            <div className="flex flex-wrap gap-1 pt-1 border-t border-slate-800/80">
              {Array.from({ length: totalQuestions }).map((_, idx) => {
                const q = allQuestions[idx];
                const isAnswered = q && userAnswers[q.id];
                const isCurrent = idx === currentIndex;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onJumpToQuestion(idx)}
                    className={`w-6 h-6 rounded-md text-[10px] font-bold transition flex items-center justify-center ${
                      isCurrent
                        ? 'bg-cyan-400 text-slate-950 ring-2 ring-cyan-300'
                        : isAnswered
                        ? 'bg-emerald-700/80 text-emerald-100 hover:bg-emerald-600'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                    }`}
                    title={`Ir para questão ${idx + 1}${isAnswered ? ' (Respondida)' : ''}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Question Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Dimension & Title */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border uppercase tracking-wider ${dimensionColors}`}>
                {question.dimensionLabel}
              </span>
              <span className="text-xs text-slate-400 font-mono font-bold">[{question.code}]</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {question.statement}
            </h2>
          </div>

          {/* Options List */}
          <div className="space-y-3">
            {question.options.map((opt) => {
              const isSelected = selectedAnswer === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onSelectAnswer(question.id, opt.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start space-x-3.5 ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20 text-blue-950 font-medium shadow-sm'
                      : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50/60 text-slate-700'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-ntt-blue text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {opt.id}
                  </span>
                  <span className="text-sm leading-relaxed pt-0.5">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={onPrevious}
              disabled={isFirst}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <button
              type="button"
              onClick={onNext}
              className="flex items-center space-x-1.5 px-6 py-2.5 rounded-xl text-xs font-bold bg-ntt-blue hover:bg-blue-600 text-white shadow-md transition"
            >
              <span>{isLast ? 'Prosseguir para Desafio Prático' : 'Próxima Questão'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
