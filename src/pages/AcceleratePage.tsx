import React, { useState, useEffect } from 'react';
import { Hierarchy } from '../types/qa';
import { AssessmentResult } from '../types/assessment';
import { SquadDiagnostic } from '../types/accelerate';
import { dataService } from '../services/dataService';
import { SquadDiagnosticForm } from '../components/accelerate-portal/SquadDiagnosticForm';
import { ActionPlanReport } from '../components/accelerate-portal/ActionPlanReport';
import { Rocket } from 'lucide-react';

export const AcceleratePage: React.FC = () => {
  const [hierarchies, setHierarchies] = useState<Hierarchy[]>([]);
  const [assessments, setAssessments] = useState<AssessmentResult[]>([]);
  const [diagnostics, setDiagnostics] = useState<SquadDiagnostic[]>([]);
  const [selectedSquadName, setSelectedSquadName] = useState<string>('');

  useEffect(() => {
    async function loadData() {
      const [hList, aList, dList] = await Promise.all([
        dataService.getHierarchies(),
        dataService.getAssessments(),
        dataService.getSquadDiagnostics()
      ]);
      setHierarchies(hList);
      setAssessments(aList);
      setDiagnostics(dList);
    }
    loadData();
  }, []);

  const handleDiagnosticSaved = (newDiag: SquadDiagnostic) => {
    setDiagnostics((prev) => {
      const filtered = prev.filter((d) => d.hierarchyId !== newDiag.hierarchyId);
      return [newDiag, ...filtered];
    });
    setSelectedSquadName(newDiag.squadName);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div>
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
            <Rocket className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
              Módulo de Aceleração & Transformação
            </span>
            <h1 className="text-2xl font-black text-slate-900">
              Accelerate Team — Sinergia Pessoas + Tecnologia
            </h1>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Conectando o diagnóstico individual dos QAs à realidade técnica das Squads para gerar Planos Acionáveis
        </p>
      </div>

      <div className="space-y-6">
        <SquadDiagnosticForm
          hierarchies={hierarchies}
          onSaved={handleDiagnosticSaved}
        />

        <ActionPlanReport
          assessments={assessments}
          diagnostics={diagnostics}
          selectedSquadName={selectedSquadName}
        />
      </div>
    </div>
  );
};
