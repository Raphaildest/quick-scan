import React, { useState, useEffect } from 'react';
import { Hierarchy } from '../../types/qa';
import { SquadDiagnostic } from '../../types/accelerate';
import { dataService } from '../../services/dataService';
import { Layers, CheckSquare, Sparkles, Save, CheckCircle2 } from 'lucide-react';

interface SquadDiagnosticFormProps {
  hierarchies: Hierarchy[];
  onSaved: (diagnostic: SquadDiagnostic) => void;
}

const COMMON_STACKS = [
  'Robot Framework',
  'Playwright',
  'Cypress',
  'Selenium',
  'Postman / Newman',
  'RestAssured',
  'Python',
  'TypeScript',
  'Java',
  'K6 / JMeter',
  'Appium'
];

const OPPORTUNITY_OPTIONS = [
  'Automação de API REST',
  'Automação de Interface Web',
  'Automação Mobile',
  'Massa de Dados Efêmera / Automatizada',
  'Quality Gates Bloqueantes na Esteira (CI/CD)',
  'IA para Geração de Casos de Teste (Shift-Left)',
  'IA para Manutenção e Refatoração de Suítes',
  'Testes de Contrato (Pact / OpenAPI)',
  'Performance e Carga Contínua'
];

export const SquadDiagnosticForm: React.FC<SquadDiagnosticFormProps> = ({
  hierarchies,
  onSaved
}) => {
  const [selectedHierarchyId, setSelectedHierarchyId] = useState(
    hierarchies[0]?.id || ''
  );
  const [stack, setStack] = useState<string[]>(['Robot Framework', 'Python', 'Selenium']);
  const [webCoverage, setWebCoverage] = useState(40);
  const [apiCoverage, setApiCoverage] = useState(20);
  const [mobileCoverage, setMobileCoverage] = useState(0);
  const [regressiveCount, setRegressiveCount] = useState(120);
  const [automatedCount, setAutomatedCount] = useState(48);
  const [hasPipeline, setHasPipeline] = useState(true);
  const [hasAutomatedData, setHasAutomatedData] = useState(false);
  const [opportunities, setOpportunities] = useState<string[]>([
    'Automação de API REST',
    'Massa de Dados Efêmera / Automatizada',
    'IA para Geração de Casos de Teste (Shift-Left)'
  ]);
  const [targetCoverage90Days, setTargetCoverage90Days] = useState(70);
  const [evaluatedBy, setEvaluatedBy] = useState('Accelerate Team NTT');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Load existing diagnostic when hierarchy changes
  useEffect(() => {
    async function loadSquadData() {
      if (!selectedHierarchyId) return;
      const allDiags = await dataService.getSquadDiagnostics();
      const existing = allDiags.find((d) => d.hierarchyId === selectedHierarchyId);
      if (existing) {
        setStack(existing.stack || []);
        setWebCoverage(existing.webCoverage || 0);
        setApiCoverage(existing.apiCoverage || 0);
        setMobileCoverage(existing.mobileCoverage || 0);
        setRegressiveCount(existing.regressiveCount || 0);
        setAutomatedCount(existing.automatedCount || 0);
        setHasPipeline(existing.hasPipeline);
        setHasAutomatedData(existing.hasAutomatedData);
        setOpportunities(existing.opportunities || []);
        setTargetCoverage90Days(existing.targetCoverage90Days || 70);
        setEvaluatedBy(existing.evaluatedBy || 'Accelerate Team NTT');
      }
    }
    loadSquadData();
  }, [selectedHierarchyId]);

  const toggleStack = (tech: string) => {
    setStack((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const toggleOpportunity = (opp: string) => {
    setOpportunities((prev) =>
      prev.includes(opp) ? prev.filter((o) => o !== opp) : [...prev, opp]
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const hierarchy = hierarchies.find((h) => h.id === selectedHierarchyId);
    const diagnostic: SquadDiagnostic = {
      id: crypto.randomUUID(),
      hierarchyId: selectedHierarchyId,
      squadName: hierarchy?.squad_name || 'Squad',
      coordenacao: hierarchy?.coordenacao || '',
      gerencia: hierarchy?.gerencia || '',
      stack,
      webCoverage,
      apiCoverage,
      mobileCoverage,
      regressiveCount,
      automatedCount,
      hasPipeline,
      hasAutomatedData,
      opportunities,
      targetCoverage90Days,
      evaluatedBy,
      actionPlanText: '',
      updatedAt: new Date().toISOString()
    };

    const saved = await dataService.saveSquadDiagnostic(diagnostic);
    onSaved(saved);
    setSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Diagnóstico Técnico de Squad (Accelerate Team)
          </h3>
          <p className="text-xs text-slate-500">
            Mapeamento da maturidade técnica, ferramental e cobertura para cruzamento com pessoas
          </p>
        </div>
        <div>
          <select
            value={selectedHierarchyId}
            onChange={(e) => setSelectedHierarchyId(e.target.value)}
            className="px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-ntt-blue"
          >
            {hierarchies.map((h) => (
              <option key={h.id} value={h.id}>
                {h.coordenacao} → {h.squad_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 1. Stack Tecnológico */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          1. Stack Tecnológico Utilizado na Squad
        </label>
        <div className="flex flex-wrap gap-1.5">
          {COMMON_STACKS.map((tech) => {
            const isSelected = stack.includes(tech);
            return (
              <button
                key={tech}
                type="button"
                onClick={() => toggleStack(tech)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                  isSelected
                    ? 'bg-ntt-navy text-cyan-300 border-ntt-navy shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {tech}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Coberturas e Regressivo */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Cobertura Web: {webCoverage}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={webCoverage}
            onChange={(e) => setWebCoverage(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Cobertura API: {apiCoverage}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={apiCoverage}
            onChange={(e) => setApiCoverage(Number(e.target.value))}
            className="w-full accent-emerald-600"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Cobertura Mobile: {mobileCoverage}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={mobileCoverage}
            onChange={(e) => setMobileCoverage(Number(e.target.value))}
            className="w-full accent-amber-600"
          />
        </div>
      </div>

      {/* 3. Métricas de Regressivo e Pipeline */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
        <div>
          <label className="block text-[11px] font-bold text-slate-600 mb-1">Cenários Regressivos</label>
          <input
            type="number"
            value={regressiveCount}
            onChange={(e) => setRegressiveCount(Number(e.target.value))}
            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 mb-1">Automatizados Hoje</label>
          <input
            type="number"
            value={automatedCount}
            onChange={(e) => setAutomatedCount(Number(e.target.value))}
            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold"
          />
        </div>

        <div className="flex flex-col justify-center">
          <label className="block text-[11px] font-bold text-slate-600 mb-1">Executa em Pipeline?</label>
          <button
            type="button"
            onClick={() => setHasPipeline(!hasPipeline)}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs border ${
              hasPipeline ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-rose-100 text-rose-800 border-rose-300'
            }`}
          >
            {hasPipeline ? 'Sim (Gates Ativos)' : 'Não (Manual)'}
          </button>
        </div>

        <div className="flex flex-col justify-center">
          <label className="block text-[11px] font-bold text-slate-600 mb-1">Massa Automatizada?</label>
          <button
            type="button"
            onClick={() => setHasAutomatedData(!hasAutomatedData)}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs border ${
              hasAutomatedData ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-amber-100 text-amber-800 border-amber-300'
            }`}
          >
            {hasAutomatedData ? 'Sim (Efêmera)' : 'Não (Estática)'}
          </button>
        </div>
      </div>

      {/* 4. Oportunidades Mapeadas */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          4. Oportunidades de Aceleração Mapeadas
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {OPPORTUNITY_OPTIONS.map((opp) => {
            const isSelected = opportunities.includes(opp);
            return (
              <button
                key={opp}
                type="button"
                onClick={() => toggleOpportunity(opp)}
                className={`p-2.5 rounded-xl border text-left text-xs flex items-center space-x-2 transition ${
                  isSelected
                    ? 'bg-blue-50 border-blue-400 text-blue-900 font-semibold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                    isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'
                  }`}
                >
                  {isSelected && <CheckSquare className="w-3 h-3" />}
                </div>
                <span>{opp}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Meta e Ações */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100 text-xs">
        <div className="flex items-center space-x-3">
          <span className="font-bold text-slate-700">Meta Cobertura 90 Dias:</span>
          <div className="flex items-center space-x-1">
            <input
              type="number"
              min="0"
              max="100"
              value={targetCoverage90Days}
              onChange={(e) => setTargetCoverage90Days(Number(e.target.value))}
              className="w-16 px-2 py-1 bg-slate-50 border border-slate-300 rounded font-bold text-center"
            />
            <span className="font-bold">%</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {savedSuccess && (
            <span className="text-emerald-600 font-bold flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Salvo com sucesso!</span>
            </span>
          )}

          <button
            type="submit"
            disabled={saving}
            className="flex items-center space-x-1.5 px-5 py-2.5 bg-ntt-blue hover:bg-blue-600 text-white font-bold rounded-xl shadow transition"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Gravando...' : 'Salvar Diagnóstico'}</span>
          </button>
        </div>
      </div>
    </form>
  );
};
