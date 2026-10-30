import React from 'react';
import { Users, Award, TrendingUp, CheckCircle, Target, AlertTriangle, ShieldCheck, Cpu, Code, DatabaseZap } from 'lucide-react';
import { QASubmission } from '../../types/qaSubmission';

interface AnalyticsOverviewProps {
  submissions: QASubmission[];
  selectedArea: string;
  selectedClassification: string;
}

export const AnalyticsOverview: React.FC<AnalyticsOverviewProps> = ({
  submissions,
  selectedArea,
  selectedClassification
}) => {
  const filtered = submissions.filter(s => {
    if (selectedArea && s.area !== selectedArea) return false;
    if (selectedClassification && s.classification !== selectedClassification) return false;
    return true;
  });

  const total = filtered.length;

  const countAlto = filtered.filter(s => s.classification === 'Alto').length;
  const countMedio = filtered.filter(s => s.classification === 'Médio').length;
  const countBaixo = filtered.filter(s => s.classification === 'Baixo').length;

  const pctAlto = total > 0 ? Math.round((countAlto / total) * 100) : 0;
  const pctMedio = total > 0 ? Math.round((countMedio / total) * 100) : 0;
  const pctBaixo = total > 0 ? Math.round((countBaixo / total) * 100) : 0;

  const avgOverall = total > 0 ? Math.round(filtered.reduce((acc, s) => acc + s.overallScore, 0) / total) : 0;
  const avgAuto = total > 0 ? Math.round(filtered.reduce((acc, s) => acc + s.scores.automation, 0) / total) : 0;
  const avgAi = total > 0 ? Math.round(filtered.reduce((acc, s) => acc + s.scores.ai, 0) / total) : 0;
  const avgEng = total > 0 ? Math.round(filtered.reduce((acc, s) => acc + s.scores.engineering, 0) / total) : 0;
  const avgCicd = total > 0 ? Math.round(filtered.reduce((acc, s) => acc + s.scores.cicd, 0) / total) : 0;
  const avgFund = total > 0 ? Math.round(filtered.reduce((acc, s) => acc + s.scores.fundamentals, 0) / total) : 0;

  return (
    <div className="space-y-6">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">QAs Avaliados</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{total}</div>
          <span className="text-[10px] text-slate-400">Total de submissões</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Média Geral</span>
            <Award className="w-4 h-4 text-ntt-blue" />
          </div>
          <div className="text-2xl font-black text-slate-900">{avgOverall}%</div>
          <span className="text-[10px] text-slate-400">Score ponderado</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Perfil Alto</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700">{pctAlto}%</div>
          <span className="text-[10px] text-slate-400">{countAlto} profissionais</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">Perfil Médio</span>
            <Target className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-700">{pctMedio}%</div>
          <span className="text-[10px] text-slate-400">{countMedio} profissionais</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600">Perfil Baixo</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-rose-700">{pctBaixo}%</div>
          <span className="text-[10px] text-slate-400">{countBaixo} profissionais</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-600">Auto + IA</span>
            <TrendingUp className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="text-2xl font-black text-cyan-800">{Math.round((avgAuto + avgAi) / 2)}%</div>
          <span className="text-[10px] text-slate-400">Prontidão combinada</span>
        </div>
      </div>

      {/* 2-Columns: Readiness Consolidado & Recomendações */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Readiness Consolidado */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Readiness Técnico Consolidado por Dimensão
            </h3>
            <p className="text-xs text-slate-500">
              Desempenho médio dos profissionais no assessment
            </p>
          </div>

          <div className="space-y-4 pt-1">
            {/* Automação */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700 flex items-center space-x-1.5">
                  <Cpu className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Automação de Testes (UI, API e Resiliência)</span>
                </span>
                <span className="text-slate-900 font-bold">{avgAuto}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full rounded-full transition-all duration-500" style={{ width: `${avgAuto}%` }} />
              </div>
            </div>

            {/* IA Aplicada */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700 flex items-center space-x-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  <span>IA Aplicada à Qualidade (Curadoria & Prompt)</span>
                </span>
                <span className="text-slate-900 font-bold">{avgAi}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${avgAi}%` }} />
              </div>
            </div>

            {/* Engenharia / Código */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700 flex items-center space-x-1.5">
                  <Code className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Engenharia & Código (Code Review e Arquitetura)</span>
                </span>
                <span className="text-slate-900 font-bold">{avgEng}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${avgEng}%` }} />
              </div>
            </div>

            {/* CI/CD & Massa */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700 flex items-center space-x-1.5">
                  <DatabaseZap className="w-3.5 h-3.5 text-teal-600" />
                  <span>CI/CD & Massa de Dados (Pipeline e Fixtures)</span>
                </span>
                <span className="text-slate-900 font-bold">{avgCicd}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-teal-600 h-full rounded-full transition-all duration-500" style={{ width: `${avgCicd}%` }} />
              </div>
            </div>

            {/* Fundamentos de Qualidade */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700 flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Fundamentos de Qualidade (Risco e Regressão)</span>
                </span>
                <span className="text-slate-900 font-bold">{avgFund}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: `${avgFund}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Recomendações Estratégicas para o Gestor */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Direcionamento Estratégico da Liderança
              </h3>
              <p className="text-xs text-slate-500">
                Ações sugeridas com base no perfil do grupo selecionado
              </p>
            </div>

            <div className="space-y-3 pt-3 text-xs leading-relaxed text-slate-600">
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                <strong className="text-blue-950 font-bold block mb-1">
                  Multiplicadores Técnicos ({countAlto} QAs no Perfil Alto):
                </strong>
                Aproveitar os profissionais com alto desempenho em automação para liderar revisões de código e padrões arquiteturais nas squads.
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                <strong className="text-amber-950 font-bold block mb-1">
                  Trilha de Aceleração ({countMedio} QAs no Perfil Médio):
                </strong>
                Focar em capacitação prática em testes de API e integração contínua (CI/CD) para elevar a autonomia do time.
              </div>

              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
                <strong className="text-rose-950 font-bold block mb-1">
                  Atenção Especial ({countBaixo} QAs no Perfil Baixo):
                </strong>
                Planejar acompanhamento intensivo e pareamento técnico antes de alocações em demandas críticas de automação.
              </div>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-400 italic">
            * Dados calculados a partir das submissões reais registradas no questionário público.
          </div>
        </div>
      </div>
    </div>
  );
};

