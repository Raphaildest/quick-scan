import React, { useState } from 'react';
import { AssessmentResult } from '../../types/assessment';
import { SquadDiagnostic } from '../../types/accelerate';
import { Sparkles, Users, Cpu, Target, Download, Share2, CheckCircle2, AlertCircle } from 'lucide-react';

interface ActionPlanReportProps {
  assessments: AssessmentResult[];
  diagnostics: SquadDiagnostic[];
  selectedSquadName?: string;
}

export const ActionPlanReport: React.FC<ActionPlanReportProps> = ({
  assessments,
  diagnostics,
  selectedSquadName
}) => {
  const currentDiag =
    diagnostics.find((d) => !selectedSquadName || d.squadName === selectedSquadName) ||
    diagnostics[0];

  const squadQAs = assessments.filter(
    (a) => !currentDiag || a.squad === currentDiag.squadName
  );

  const countAlto = squadQAs.filter((a) => a.classification === 'Alto').length;
  const countMedio = squadQAs.filter((a) => a.classification === 'Médio').length;
  const countBaixo = squadQAs.filter((a) => a.classification === 'Baixo').length;

  const avgAutomation =
    squadQAs.length > 0
      ? Math.round(squadQAs.reduce((acc, a) => acc + a.automationReadinessScore, 0) / squadQAs.length)
      : 0;

  const avgAi =
    squadQAs.length > 0
      ? Math.round(squadQAs.reduce((acc, a) => acc + a.aiReadinessScore, 0) / squadQAs.length)
      : 0;

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `PLANO DE ACELERAÇÃO (90 DIAS) - ${currentDiag?.coordenacao} / ${currentDiag?.squadName}
PESSOAS: ${squadQAs.length} QAs (${countAlto} Alto / ${countMedio} Médio / ${countBaixo} Baixo)
TECNOLOGIA: Web: ${currentDiag?.webCoverage}% | API: ${currentDiag?.apiCoverage}% | Regressivo: ${currentDiag?.regressiveCount} cenários (${currentDiag?.automatedCount} autom.)
OPORTUNIDADES: ${currentDiag?.opportunities.join(', ')}
META: ${currentDiag?.targetCoverage90Days}% de cobertura em 90 dias.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    if (!currentDiag) return;
    const content = `# Plano de Aceleração & Transformação (90 Dias)
**Squad:** ${currentDiag.squadName}
**Gerência:** ${currentDiag.gerencia} | **Coordenação:** ${currentDiag.coordenacao}
**Avaliador:** ${currentDiag.evaluatedBy} | **Data:** ${new Date(currentDiag.updatedAt).toLocaleDateString()}

---

## 1. Diagnóstico de Pessoas (Quick Scan)
- **Total de QAs:** ${squadQAs.length}
- **Distribuição de Perfis:** ${countAlto} Alto | ${countMedio} Médio | ${countBaixo} Baixo
- **Média Automação:** ${avgAutomation}%
- **Média IA Aplicada:** ${avgAi}%

## 2. Diagnóstico de Tecnologia & Esteira
- **Stack Principal:** ${currentDiag.stack.join(', ')}
- **Cobertura Atual:** Web ${currentDiag.webCoverage}% | API ${currentDiag.apiCoverage}% | Mobile ${currentDiag.mobileCoverage}%
- **Regressivo:** ${currentDiag.regressiveCount} cenários (${currentDiag.automatedCount} automatizados)
- **Pipeline:** ${currentDiag.hasPipeline ? 'Com Gates Ativos' : 'Manual / Sem Gates'}
- **Massa de Dados:** ${currentDiag.hasAutomatedData ? 'Automatizada / Efêmera' : 'Estática / Manual'}

## 3. Oportunidades Prioritárias
${currentDiag.opportunities.map(o => `- ${o}`).join('\n')}

## 4. Meta de Aceleração (90 Dias)
- **Meta de Cobertura Automatizada:** ${currentDiag.targetCoverage90Days}%
- **Plano de Ação:** ${currentDiag.actionPlanText || 'Habilitação técnica nos gaps de API, fixtures dinâmicas e introdução de Quality Agents.'}
`;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `plano_aceleracao_${currentDiag.squadName.toLowerCase().replace(/[^a-z0-9]/g, '_')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!currentDiag) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
        Nenhum diagnóstico de squad registrado ainda. Preencha o formulário acima.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-ntt-blue">
            Plano Integrado Consolidado
          </span>
          <h3 className="text-lg font-extrabold text-slate-900">
            Plano de Ação: {currentDiag.squadName}
          </h3>
          <p className="text-xs text-slate-500">
            {currentDiag.gerencia} • {currentDiag.coordenacao}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiado!' : 'Copiar Sumário'}</span>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-ntt-blue hover:bg-blue-600 text-white rounded-lg text-xs font-semibold shadow-sm transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar Relatório (.md)</span>
          </button>
        </div>
      </div>

      {/* Sinergia Pessoas + Tecnologia */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Lado 1: Pessoas */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50/60 to-slate-50 border border-blue-200 space-y-3 text-xs">
          <div className="flex items-center space-x-2 text-blue-900 font-bold">
            <Users className="w-4 h-4 text-blue-600" />
            <span>Dimensão Pessoas (Diagnóstico Quick Scan)</span>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-600">Total de QAs alocados:</span>
              <span className="font-bold text-slate-900">{squadQAs.length} profissionais</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Distribuição:</span>
              <span className="font-semibold text-slate-800">
                <span className="text-emerald-700 font-bold">{countAlto} Alto</span> /{' '}
                <span className="text-amber-700 font-bold">{countMedio} Médio</span> /{' '}
                <span className="text-rose-700 font-bold">{countBaixo} Baixo</span>
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Média Automação:</span>
              <span className="font-bold text-slate-900">{avgAutomation}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Média IA Aplicada:</span>
              <span className="font-bold text-slate-900">{avgAi}%</span>
            </div>
          </div>
        </div>

        {/* Lado 2: Tecnologia */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50/60 to-slate-50 border border-emerald-200 space-y-3 text-xs">
          <div className="flex items-center space-x-2 text-emerald-900 font-bold">
            <Cpu className="w-4 h-4 text-emerald-600" />
            <span>Dimensão Tecnologia (Diagnóstico Squad)</span>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-600">Stack Principal:</span>
              <span className="font-bold text-slate-900">{currentDiag.stack.slice(0, 3).join(', ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Cobertura Atual:</span>
              <span className="font-semibold text-slate-800">
                Web {currentDiag.webCoverage}% • API {currentDiag.apiCoverage}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Regressivo Total:</span>
              <span className="font-bold text-slate-900">
                {currentDiag.regressiveCount} cenários ({currentDiag.automatedCount} automatizados)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Esteira CI/CD:</span>
              <span className="font-bold text-slate-900">
                {currentDiag.hasPipeline ? 'Com Gates Ativos' : 'Manual'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Ações Combinadas a 90 Dias */}
      <div className="p-5 rounded-xl bg-slate-900 text-white space-y-3 text-xs">
        <div className="flex items-center space-x-2 text-cyan-300 font-bold text-sm">
          <Target className="w-5 h-5 text-cyan-400" />
          <span>Ações Estratégicas Recomendadas (Meta 90 Dias: {currentDiag.targetCoverage90Days}% Cobertura)</span>
        </div>

        <ul className="space-y-2 text-slate-300 leading-relaxed list-disc list-inside">
          <li>
            <strong className="text-white">Capacitação em API:</strong> Habilitar {countMedio + countBaixo} QAs com gaps em testes de API e fixtures com Playwright/RestAssured.
          </li>
          <li>
            <strong className="text-white">Multiplicadores Técnicos:</strong> Designar os {countAlto} QAs classificados como <em className="text-cyan-300">Alto</em> como padrinhos técnicos para code review das suítes.
          </li>
          <li>
            <strong className="text-white">Modernização de Massa:</strong> {currentDiag.hasAutomatedData ? 'Manter fixtures efêmeras de dados.' : 'Substituir massa de dados estática por geradores dinâmicos via API no setup das execuções.'}
          </li>
          <li>
            <strong className="text-white">Quality Gates & IA:</strong> Introduzir Quality Agents para triagem assistida de testes instáveis e geração contextualizada de cenários regressivos.
          </li>
        </ul>
      </div>
    </div>
  );
};
