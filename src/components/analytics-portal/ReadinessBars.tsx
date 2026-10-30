import React from 'react';
import { AssessmentResult } from '../../types/assessment';
import { Cpu, Bot, Code, ShieldCheck, DatabaseZap } from 'lucide-react';

interface ReadinessBarsProps {
  assessments: AssessmentResult[];
}

export const ReadinessBars: React.FC<ReadinessBarsProps> = ({ assessments }) => {
  const total = assessments.length;

  const avg = (fn: (a: AssessmentResult) => number) => {
    if (total === 0) return 0;
    return Math.round(assessments.reduce((acc, a) => acc + fn(a), 0) / total);
  };

  const dimensions = [
    {
      label: 'Automação de Testes',
      sub: 'API, UI, Seletores, Resiliência e Desafio',
      score: avg((a) => a.automationReadinessScore),
      color: 'bg-cyan-500',
      icon: Cpu,
      weight: '30%'
    },
    {
      label: 'IA Aplicada à Qualidade',
      sub: 'Detecção de Alucinação, Prompts e Análise',
      score: avg((a) => a.aiReadinessScore),
      color: 'bg-amber-500',
      icon: Bot,
      weight: '20%'
    },
    {
      label: 'Engenharia / Código',
      sub: 'Code Review, Arquitetura, Reuso e Limpeza',
      score: avg((a) => a.engineeringReadinessScore),
      color: 'bg-emerald-500',
      icon: Code,
      weight: '20%'
    },
    {
      label: 'Fundamentos de Qualidade',
      sub: 'Risco, Pirâmide, Regressão e Root Cause',
      score: avg((a) => a.qualityFundamentalsScore),
      color: 'bg-blue-500',
      icon: ShieldCheck,
      weight: '10%'
    },
    {
      label: 'CI/CD e Massa de Dados',
      sub: 'Gates na Esteira, Paralelismo e Dados Efêmeros',
      score: avg((a) => a.cicdDataReadinessScore),
      color: 'bg-teal-600',
      icon: DatabaseZap,
      weight: '10%'
    }
  ];

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            Skill Radar Médio por Dimensão Técnica
          </h3>
          <p className="text-xs text-slate-500">
            Nível de maturidade consolidado da amostra selecionada
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
          N = {total} avaliações
        </span>
      </div>

      <div className="space-y-4">
        {dimensions.map((dim) => {
          const Icon = dim.icon;
          return (
            <div key={dim.label} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <Icon className="w-4 h-4 text-slate-500" />
                  <span className="font-bold text-slate-800">{dim.label}</span>
                  <span className="text-[10px] text-slate-400 font-medium">({dim.weight})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] text-slate-400 hidden sm:inline">{dim.sub}</span>
                  <span className="font-extrabold text-slate-900 text-sm">{dim.score}%</span>
                </div>
              </div>

              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`${dim.color} h-full rounded-full transition-all duration-500`}
                  style={{ width: `${dim.score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
