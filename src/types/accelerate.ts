export interface SquadDiagnostic {
  id: string;
  hierarchyId: string;
  squadName: string;
  coordenacao: string;
  gerencia: string;
  stack: string[];
  webCoverage: number;
  apiCoverage: number;
  mobileCoverage: number;
  regressiveCount: number;
  automatedCount: number;
  hasPipeline: boolean;
  hasAutomatedData: boolean;
  opportunities: string[];
  actionPlanText: string;
  targetCoverage90Days: number;
  evaluatedBy: string;
  updatedAt: string;
}
