import React, { useState } from 'react';
import { X, CheckCircle2, XCircle, Award, Printer, GitBranch, Sparkles, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { QASubmission } from '../../types/qaSubmission';
import { questionsService } from '../../services/questionsService';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';

interface QADetailModalProps {
  submission: QASubmission;
  onClose: () => void;
}

export const QADetailModal: React.FC<QADetailModalProps> = ({ submission, onClose }) => {
  const [filterWrongOnly, setFilterWrongOnly] = useState(false);
  const allQuestions = questionsService.getQuestions();

  const radarData = [
    { subject: 'Automação', score: submission.scores.automation, fullMark: 100 },
    { subject: 'IA Aplicada', score: submission.scores.ai, fullMark: 100 },
    { subject: 'Engenharia', score: submission.scores.engineering, fullMark: 100 },
    { subject: 'CI/CD & Massa', score: submission.scores.cicd, fullMark: 100 },
    { subject: 'Fundamentos', score: submission.scores.fundamentals, fullMark: 100 }
  ];

  // Map questions with QA answer
  const questionsWithAnswers = allQuestions.map(q => {
    const userAnswer = submission.answers[q.id];
    const isCorrect = userAnswer && userAnswer.trim().toUpperCase() === q.correctAnswer.trim().toUpperCase();
    return {
      question: q,
      userAnswer,
      isCorrect
    };
  });

  const displayedQuestions = filterWrongOnly
    ? questionsWithAnswers.filter(item => !item.isCorrect)
    : questionsWithAnswers;

  const totalQuestions = allQuestions.length;
  const correctCount = questionsWithAnswers.filter(i => i.isCorrect).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-ntt-navy to-slate-900 p-6 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-ntt-blue/30 border border-cyan-400/30 flex items-center justify-center">
              <Award className="w-6 h-6 text-cyan-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-bold">{submission.name}</h3>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    submission.classification === 'Alto'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                      : submission.classification === 'Médio'
                      ? 'bg-amber-950 text-amber-300 border border-amber-700'
                      : 'bg-rose-950 text-rose-300 border border-rose-700'
                  }`}
                >
                  {submission.classification}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {submission.email} • Área: <strong className="text-white">{submission.area}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition"
              title="Imprimir ou Salvar Raio-X em PDF"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-300" />
              <span className="hidden sm:inline">Imprimir / PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          {/* Top Score Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Score Geral</span>
              <span className="text-2xl font-black text-ntt-navy">{submission.overallScore}%</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Automação</span>
              <span className="text-2xl font-black text-cyan-600">{submission.scores.automation}%</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">IA Aplicada</span>
              <span className="text-2xl font-black text-amber-600">{submission.scores.ai}%</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Engenharia</span>
              <span className="text-2xl font-black text-emerald-600">{submission.scores.engineering}%</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">CI/CD & Massa</span>
              <span className="text-2xl font-black text-teal-600">{submission.scores.cicd}%</span>
            </div>
          </div>

          {/* Skill Radar & Strategic Action */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div>
              <h4 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-2">
                Radar de Competências do Profissional
              </h4>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                    <PolarGrid stroke="#cbd5e1" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#334155', fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" />
                    <Radar
                      name="Score"
                      dataKey="score"
                      stroke="#0a66c2"
                      fill="#0a66c2"
                      fillOpacity={0.4}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="flex flex-col justify-between space-y-4">
              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-2">
                  Diagnóstico & Recomendação
                </h4>
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                      Ação Sugerida para a Gestão:
                    </span>
                    <strong className="text-sm text-ntt-blue font-bold">
                      {submission.classification === 'Alto'
                        ? 'Manter / Multiplicador Técnico nas Squads'
                        : submission.classification === 'Médio'
                        ? 'Habilitar nos Gaps de Automação & Pipeline'
                        : 'Treinamento Intensivo & Acompanhamento Próximo'}
                    </strong>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-slate-600">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                      Assertividade no Assessment:
                    </span>
                    <span>
                      Acertou <strong className="text-slate-900 font-bold">{correctCount}</strong> de{' '}
                      <strong className="text-slate-900 font-bold">{totalQuestions}</strong> questões (
                      {Math.round((correctCount / totalQuestions) * 100)}%).
                    </span>
                  </div>
                </div>
              </div>

              {/* Practical repo and AI notes if exists */}
              {(submission.practicalRepoUrl || submission.aiNotes) && (
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-2 text-[11px]">
                  {submission.practicalRepoUrl && (
                    <div className="flex items-center space-x-1.5 text-blue-700">
                      <GitBranch className="w-3.5 h-3.5 shrink-0" />
                      <a
                        href={submission.practicalRepoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="truncate hover:underline font-bold"
                      >
                        {submission.practicalRepoUrl}
                      </a>
                    </div>
                  )}
                  {submission.aiNotes && (
                    <div className="flex items-start space-x-1.5 text-slate-600">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span className="italic line-clamp-2">{submission.aiNotes}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Detailed Question by Question Audit */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wide text-xs">
                  Auditoria Questão a Questão
                </h4>
                <p className="text-[11px] text-slate-500">
                  Respostas dadas pelo QA comparadas ao gabarito oficial com fundamentação técnica
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setFilterWrongOnly(!filterWrongOnly)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    filterWrongOnly
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {filterWrongOnly ? 'Mostrando apenas erros' : 'Filtrar apenas erros'}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {displayedQuestions.map(({ question: q, userAnswer, isCorrect }, idx) => (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl border transition ${
                    isCorrect
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : 'bg-rose-50/40 border-rose-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center space-x-2">
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                      <span className="font-bold text-slate-900 text-xs">
                        Questão {q.id}: {q.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-500 border border-slate-200">
                      {q.dimensionLabel}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 mb-2.5 pl-6">{q.statement}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pl-6">
                    <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                        Resposta do Profissional:
                      </span>
                      <div className="font-semibold text-slate-800">
                        {userAnswer ? (
                          <span>
                            Opção <strong>{userAnswer}</strong> — {q.options.find(o => o.id === userAnswer)?.text}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">Não respondida</span>
                        )}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                        Gabarito Oficial:
                      </span>
                      <div className="font-semibold text-emerald-800">
                        Opção <strong>{q.correctAnswer}</strong> — {q.options.find(o => o.id === q.correctAnswer)?.text}
                      </div>
                    </div>
                  </div>

                  {q.explanation && (
                    <div className="mt-2 text-[11px] text-slate-500 pl-6 italic">
                      💡 <strong>Justificativa Técnica:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

