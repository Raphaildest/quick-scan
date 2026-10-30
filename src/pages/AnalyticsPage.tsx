import React, { useState, useEffect } from 'react';
import { Hierarchy } from '../types/qa';
import { AssessmentResult } from '../types/assessment';
import { dataService } from '../services/dataService';
import { FiltersBar } from '../components/analytics-portal/FiltersBar';
import { KpiOverview } from '../components/analytics-portal/KpiOverview';
import { TransitionMatrixView } from '../components/analytics-portal/TransitionMatrixView';
import { ReadinessBars } from '../components/analytics-portal/ReadinessBars';
import { QAsTable } from '../components/analytics-portal/QAsTable';
import { RadarModal } from '../components/analytics-portal/RadarModal';
import { RefreshCw, RotateCcw } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const [hierarchies, setHierarchies] = useState<Hierarchy[]>([]);
  const [assessments, setAssessments] = useState<AssessmentResult[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedGerencia, setSelectedGerencia] = useState('');
  const [selectedCoordenacao, setSelectedCoordenacao] = useState('');
  const [selectedSquad, setSelectedSquad] = useState('');

  // Modal
  const [selectedAssessmentForRadar, setSelectedAssessmentForRadar] =
    useState<AssessmentResult | null>(null);

  const loadData = async () => {
    setLoading(true);
    const [hList, aList] = await Promise.all([
      dataService.getHierarchies(),
      dataService.getAssessments()
    ]);
    setHierarchies(hList);
    setAssessments(aList);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered Assessments
  const filteredAssessments = assessments.filter((a) => {
    if (selectedSquad && a.squad !== selectedSquad) return false;
    if (selectedCoordenacao && a.coordenacao !== selectedCoordenacao) return false;
    return true;
  });

  const handleResetFilters = () => {
    setSelectedGerencia('');
    setSelectedCoordenacao('');
    setSelectedSquad('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Bar with Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-ntt-blue">
            Visão Executiva & Tomada de Decisão
          </span>
          <h1 className="text-2xl font-black text-slate-900">
            Portal Analytics — Gestão de Qualidade NTT DATA
          </h1>
          <p className="text-xs text-slate-500">
            Diagnóstico consolidado de prontidão técnica, evolução e prontidão de squads
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={async () => {
              if (confirm('Deseja restaurar a base demonstrativa completa de QAs e avaliações?')) {
                dataService.resetDemoData();
                await loadData();
              }
            }}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
            title="Restaura a base demonstrativa completa"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Restaurar Demo</span>
          </button>

          <button
            type="button"
            onClick={loadData}
            disabled={loading}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl text-xs font-semibold shadow-sm transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Atualizar Dados</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <FiltersBar
        hierarchies={hierarchies}
        selectedGerencia={selectedGerencia}
        selectedCoordenacao={selectedCoordenacao}
        selectedSquad={selectedSquad}
        onSelectGerencia={setSelectedGerencia}
        onSelectCoordenacao={setSelectedCoordenacao}
        onSelectSquad={setSelectedSquad}
        onReset={handleResetFilters}
      />

      {/* KPI Overview */}
      <KpiOverview assessments={filteredAssessments} />

      {/* 2-Column: Transition Matrix & Readiness Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TransitionMatrixView assessments={filteredAssessments} />
        <ReadinessBars assessments={filteredAssessments} />
      </div>

      {/* Detailed QAs Table */}
      <QAsTable
        assessments={filteredAssessments}
        onOpenRadar={(item) => setSelectedAssessmentForRadar(item)}
      />

      {/* Raio-X Modal */}
      {selectedAssessmentForRadar && (
        <RadarModal
          assessment={selectedAssessmentForRadar}
          onClose={() => setSelectedAssessmentForRadar(null)}
        />
      )}
    </div>
  );
};
