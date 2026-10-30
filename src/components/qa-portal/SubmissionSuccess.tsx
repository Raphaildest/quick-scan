import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Award, ArrowRight, BarChart3, RotateCcw, ShieldCheck, Zap } from 'lucide-react';
import { AssessmentResult } from '../../types/assessment';
import { StatusBadge } from '../common/StatusBadge';

interface SubmissionSuccessProps {
  result: AssessmentResult;
  onGoToAnalytics: () => void;
  onRestart: () => void;
}

export const SubmissionSuccess: React.FC<SubmissionSuccessProps> = ({
  result,
  onGoToAnalytics,
  onRestart
}) => {
  useEffect(() => {
    // Launch celebratory confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const dimensions = [
    { label: 'Automação de Testes', score: result.automationReadinessScore, color: 'bg-cyan-500' },
    { label: 'IA Aplicada à Qualidade', score: result.aiReadinessScore, color: 'bg-amber-500' },
    { label: 'Engenharia / Código', score: result.engineeringReadinessScore, color: 'bg-emerald-500' },
    { label: 'Fundamentos de Qualidade', score: result.qualityFundamentalsScore, color: 'bg-blue-500' },
    { label: 'CI/CD e Massa de Dados', score: result.cicdDataReadinessScore, color: 'bg-teal-600' }
  ];

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Banner */}
        <div className="bg-gradient-to-r from-ntt-navy via-slate-900 to-emerald-950 p-8 text-white text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto mb-4 shadow-inner">
            <CheckCircle2 className="w-9 h-9 text-emerald-400" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Avaliação Concluída com Sucesso
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
            Diagnóstico Quick Scan Gerado
          </h2>
          <p className="text-xs text-slate-300 mt-2">
            Profissional: <strong className="text-white">{result.qaName || 'QA'}</strong> • SAP: {result.sap}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Main KPI Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 border border-slate-200">
            {/* Score */}
            <div className="text-center sm:border-r border-slate-200 sm:pr-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Quick Scan Score</span>
              <div className="text-4xl font-extrabold text-ntt-navy mt-1">
                {result.overallScore}%
              </div>
              <span className="text-[11px] text-slate-400">Ponderado pelas rubricas</span>
            </div>

            {/* Classification */}
            <div className="text-center sm:border-r border-slate-200 sm:px-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Classificação</span>
              <div className="mt-2">
                <StatusBadge status={result.classification} size="lg" />
              </div>
              <span className="text-[11px] text-slate-400 block mt-1">
                Gate Automação (≥70%): {result.automationReadinessScore >= 70 ? '✅ Atingido' : '⚠️ Pendente'}
              </span>
            </div>

            {/* Profile */}
            <div className="text-center sm:pl-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Perfil Predominante</span>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-sky-50 text-sky-900 border border-sky-200 font-bold text-xs mt-2">
                <Award className="w-4 h-4 text-sky-600" />
                <span>{result.predominantProfile}</span>
              </div>
              <span className="text-[11px] text-slate-400 block mt-1">Baseado nos pontos fortes</span>
            </div>
          </div>

          {/* Transition Comparison */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
              Comparativo de Evolução (Scan Anterior vs. Quick Scan)
            </span>
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-3">
                <div>
                  <span className="text-[10px] text-slate-400 block">Scan Anterior</span>
                  <StatusBadge status={result.previousClassification || 'Não Avaliado'} size="sm" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Quick Scan Atual</span>
                  <StatusBadge status={result.classification} size="sm" />
                </div>
              </div>

              <div className="text-right">
                <span className="font-semibold text-slate-800">{result.transitionDiagnosis}</span>
                <span className="block text-[11px] text-blue-600 font-medium">{result.recommendedAction}</span>
              </div>
            </div>
          </div>

          {/* Readiness Bars */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Readiness Scores por Dimensão
            </h3>
            <div className="space-y-2.5">
              {dimensions.map((dim) => (
                <div key={dim.label} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-700">{dim.label}</span>
                    <span className="font-bold text-slate-900">{dim.score}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`${dim.color} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${dim.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={onRestart}
              className="w-full sm:w-auto flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Realizar Nova Avaliação</span>
            </button>

            <button
              type="button"
              onClick={onGoToAnalytics}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-ntt-blue hover:bg-blue-600 text-white shadow-md transition"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Ver no Portal Analytics (Liderança)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
