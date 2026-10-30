import React, { useState } from 'react';
import { Question } from '../../types/assessment';
import { ChevronRight, ChevronLeft, Send, Sparkles, Code2, CheckCircle2, HelpCircle } from 'lucide-react';

interface QAQuestionnaireProps {
  qaName: string;
  qaArea: string;
  questions: Question[];
  onSubmit: (answers: Record<number, string>, practicalUrl?: string, aiNotes?: string) => void;
  submitting: boolean;
}

export const QAQuestionnaire: React.FC<QAQuestionnaireProps> = ({
  qaName,
  qaArea,
  questions,
  onSubmit,
  submitting
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [practicalUrl, setPracticalUrl] = useState('');
  const [aiNotes, setAiNotes] = useState('');
  const [showOptionalBlocks, setShowOptionalBlocks] = useState(false);

  const currentQ = questions[currentIndex];
  const total = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPct = Math.round((answeredCount / total) * 100);

  const dimensionBadges: Record<string, { label: string; color: string }> = {
    automacao: { label: 'Automação de Testes', color: 'bg-cyan-100 text-cyan-800 border-cyan-300' },
    ia_aplicada: { label: 'IA Aplicada à Qualidade', color: 'bg-amber-100 text-amber-800 border-amber-300' },
    engenharia: { label: 'Engenharia / Código', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    cicd_massa: { label: 'CI/CD e Massa de Dados', color: 'bg-teal-100 text-teal-800 border-teal-300' },
    fundamentos: { label: 'Fundamentos de Qualidade', color: 'bg-blue-100 text-blue-800 border-blue-300' }
  };

  const handleSelectOption = (questionId: number, optId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optId
    }));
  };

  const handleAutoFillDemo = () => {
    const demo: Record<number, string> = { ...answers };
    questions.forEach(q => {
      if (!demo[q.id]) {
        demo[q.id] = q.correctAnswer;
      }
    });
    setAnswers(demo);
    setPracticalUrl('https://github.com/ntt-qa/automacao-e2e-playwright');
    setAiNotes('Utilizado ChatGPT-4o para elaboração de matriz de risco em transferências. Rejeitadas sugestões que infringiam regras regulatórias do BACEN.');
  };

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setShowOptionalBlocks(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(answers, practicalUrl, aiNotes);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-ntt-blue">
              Assessment Técnico em Andamento
            </span>
            <h2 className="text-lg font-black text-slate-900">
              Profissional: {qaName}
            </h2>
            <p className="text-xs text-slate-500">Área: {qaArea}</p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleAutoFillDemo}
              className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100 transition"
              title="Preenche respostas de exemplo para teste rápido"
            >
              ⚡ Preencher Demo
            </button>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-cyan-300">
              {answeredCount} de {total} respondidas ({progressPct}%)
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-3 mb-4">
          <div
            className="bg-gradient-to-r from-ntt-blue to-cyan-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Question Selector Pills */}
        <div className="flex flex-wrap gap-1.5">
          {questions.map((q, idx) => {
            const isAnswered = !!answers[q.id];
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition flex items-center justify-center ${
                  isCurrent
                    ? 'bg-ntt-blue text-white ring-2 ring-ntt-blue/30 shadow'
                    : isAnswered
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                title={`Questão ${idx + 1}: ${q.title}${isAnswered ? ' (Respondida)' : ''}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card */}
      {currentQ && (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <span
                className={`px-2.5 py-0.5 rounded-md text-xs font-bold border ${
                  dimensionBadges[currentQ.dimension]?.color || 'bg-slate-100 text-slate-800'
                }`}
              >
                {dimensionBadges[currentQ.dimension]?.label || currentQ.dimensionLabel}
              </span>
              <span className="text-xs font-mono font-bold text-slate-400">
                Questão {currentIndex + 1} de {total}
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-slate-400">[{currentQ.code}]</span>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {currentQ.statement}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map(opt => {
              const isSelected = answers[currentQ.id] === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectOption(currentQ.id, opt.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start space-x-3 ${
                    isSelected
                      ? 'bg-blue-50/80 border-ntt-blue ring-2 ring-ntt-blue/20 text-blue-950 font-semibold shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 text-slate-700'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected
                        ? 'bg-ntt-blue text-white shadow'
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

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            {currentIndex < total - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center space-x-1.5 px-6 py-2.5 rounded-xl text-xs font-bold bg-ntt-blue hover:bg-blue-600 text-white shadow-md transition"
              >
                <span>Próxima Questão</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowOptionalBlocks(true)}
                className="flex items-center space-x-1.5 px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-md transition"
              >
                <span>Revisar e Finalizar</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Optional Practical Challenge & AI Block */}
      {showOptionalBlocks && (
        <form onSubmit={handleFinalSubmit} className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-6 animate-fade-in">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-ntt-blue">
              Etapa Final • Complementos Opcionais
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              Evidências Práticas de Automação & Uso de IA
            </h3>
            <p className="text-xs text-slate-500">
              Caso possua repositório de automação ou deseje registrar como utilizou IA, preencha os campos abaixo:
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center space-x-1.5">
              <Code2 className="w-4 h-4 text-slate-500" />
              <span>Link do Repositório Git (Opcional)</span>
            </label>
            <input
              type="url"
              placeholder="Ex: https://github.com/seu-usuario/desafio-automacao"
              value={practicalUrl}
              onChange={(e) => setPracticalUrl(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-ntt-blue focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Notas sobre Uso de IA (Opcional)</span>
            </label>
            <textarea
              rows={3}
              placeholder="Ex: Onde utilizou IA, quais sugestões foram aceitas e quais foram rejeitadas..."
              value={aiNotes}
              onChange={(e) => setAiNotes(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-ntt-blue focus:bg-white transition"
            />
          </div>

          <div className="pt-4 flex justify-end space-x-3">
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center space-x-2 px-8 py-3 bg-ntt-blue hover:bg-blue-600 text-white font-bold text-sm rounded-xl shadow-lg transition disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Enviando Avaliação...' : 'Confirmar e Enviar Questionário'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

