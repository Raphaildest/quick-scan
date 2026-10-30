import React from 'react';
import { X, ExternalLink, Download, Bot, Code2, Award, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { AssessmentResult } from '../../types/assessment';
import { StatusBadge } from '../common/StatusBadge';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';

interface RadarModalProps {
  assessment: AssessmentResult;
  onClose: () => void;
}

export const RadarModal: React.FC<RadarModalProps> = ({ assessment, onClose }) => {
  const chartData = [
    { subject: 'Automação', score: assessment.automationReadinessScore, fullMark: 100 },
    { subject: 'IA Aplicada', score: assessment.aiReadinessScore, fullMark: 100 },
    { subject: 'Engenharia', score: assessment.engineeringReadinessScore, fullMark: 100 },
    { subject: 'Fundamentos', score: assessment.qualityFundamentalsScore, fullMark: 100 },
    { subject: 'CI/CD & Massa', score: assessment.cicdDataReadinessScore, fullMark: 100 }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-ntt-navy to-slate-900 p-6 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-ntt-blue/30 border border-cyan-400/30 flex items-center justify-center">
              <Award className="w-6 h-6 text-cyan-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-bold">{assessment.qaName || 'Profissional'}</h3>
                <span className="text-xs font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                  SAP: {assessment.sap}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {assessment.coordenacao} • {assessment.squad}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition"
              title="Imprimir ou Salvar Raio-X em PDF"
            >
              <Download className="w-3.5 h-3.5 text-cyan-300" />
              <span className="hidden sm:inline">Imprimir / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          {/* Top Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Score Quick Scan</span>
              <span className="text-2xl font-black text-ntt-navy">{assessment.overallScore}%</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Classificação</span>
              <div className="mt-1">
                <StatusBadge status={assessment.classification} size="md" />
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Perfil Predominante</span>
              <span className="font-extrabold text-sky-800 text-sm block mt-1">
                {assessment.predominantProfile}
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Diagnóstico de Transição</span>
              <span className="font-bold text-slate-800 text-xs block mt-1">
                {assessment.transitionDiagnosis}
              </span>
            </div>
          </div>

          {/* Radar Chart & Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <h4 className="font-bold text-slate-800 uppercase tracking-wide text-xs mb-2">
                Skill Radar de Competências
              </h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
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

            <div className="space-y-3 flex flex-col justify-center">
              <h4 className="font-bold text-slate-800 uppercase tracking-wide text-xs">
                Notas por Instrumento
              </h4>
              <div className="space-y-2">
                {chartData.map((d) => (
                  <div key={d.subject} className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200">
                    <span className="font-medium text-slate-700">{d.subject}</span>
                    <span className="font-bold text-slate-900">{d.score}%</span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-900">
                <p className="font-semibold text-xs">Ação Recomendada:</p>
                <p className="mt-0.5 font-bold">{assessment.recommendedAction}</p>
              </div>
            </div>
          </div>

          {/* Evidence 1: Practical Challenge */}
          <div className="p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-xs uppercase tracking-wide">
              <Code2 className="w-4 h-4 text-cyan-600" />
              <span>Evidência: Desafio Prático de Automação</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block text-[11px]">Repositório / Código:</span>
                {assessment.practicalChallenge?.repoUrl ? (
                  <a
                    href={assessment.practicalChallenge.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 font-medium inline-flex items-center space-x-1 underline hover:text-blue-800"
                  >
                    <span>{assessment.practicalChallenge.repoUrl}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : assessment.practicalChallenge?.storagePath ? (
                  <a
                    href={assessment.practicalChallenge.storagePath}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-700 font-semibold inline-flex items-center space-x-1 hover:underline"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download ZIP (Supabase Storage)</span>
                  </a>
                ) : (
                  <span className="text-slate-400 italic">Nenhum repositório anexado</span>
                )}
              </div>

              <div>
                <span className="text-slate-500 block text-[11px]">Estratégia Declarada:</span>
                <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200 mt-1">
                  {assessment.practicalChallenge?.strategySummary || 'Sem justificativa.'}
                </p>
              </div>
            </div>
          </div>

          {/* Evidence 2: AI Challenge */}
          <div className="p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-xs uppercase tracking-wide">
              <Bot className="w-4 h-4 text-amber-600" />
              <span>Evidência: Discernimento no Uso de IA</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block text-[11px]">Ferramenta & Prompt:</span>
                <span className="font-semibold text-slate-800">{assessment.aiChallenge?.toolUsed || 'ChatGPT'}</span>
                <p className="text-slate-600 font-mono text-[10px] bg-slate-50 p-2 rounded border border-slate-200 mt-1">
                  {assessment.aiChallenge?.prompt || 'Sem prompt.'}
                </p>
              </div>

              <div>
                <span className="text-slate-500 block text-[11px]">Filtro de Sugestões:</span>
                <p className="text-slate-700 bg-slate-50 p-2 rounded border border-slate-200 mt-1">
                  {assessment.aiChallenge?.acceptedRejectedNotes || 'Sem registro.'}
                </p>
              </div>

              <div>
                <span className="text-slate-500 block text-[11px]">Detecção de Alucinação (PIX):</span>
                <p className="text-slate-700 bg-amber-50/60 p-2 rounded border border-amber-200 mt-1 font-medium">
                  {assessment.aiChallenge?.hallucinationAnalysis || 'Sem análise.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-ntt-navy hover:bg-slate-800 text-white font-semibold rounded-lg text-xs transition"
          >
            Fechar Raio-X
          </button>
        </div>
      </div>
    </div>
  );
};
