import React from 'react';
import { Users, TrendingUp, Award, AlertCircle, CheckCircle, Target } from 'lucide-react';
import { MetricCard } from '../common/MetricCard';
import { AssessmentResult } from '../../types/assessment';

interface KpiOverviewProps {
  assessments: AssessmentResult[];
}

export const KpiOverview: React.FC<KpiOverviewProps> = ({ assessments }) => {
  const total = assessments.length;

  const countAlto = assessments.filter((a) => a.classification === 'Alto').length;
  const countMedio = assessments.filter((a) => a.classification === 'Médio').length;
  const countBaixo = assessments.filter((a) => a.classification === 'Baixo').length;

  const pctAlto = total > 0 ? Math.round((countAlto / total) * 100) : 0;
  const pctMedio = total > 0 ? Math.round((countMedio / total) * 100) : 0;
  const pctBaixo = total > 0 ? Math.round((countBaixo / total) * 100) : 0;

  // Previous Scan Comparison
  const previousEvaluated = assessments.filter(
    (a) => a.previousClassification && a.previousClassification !== 'Não Avaliado'
  );
  const previousAlto = previousEvaluated.filter((a) => a.previousClassification === 'Alto').length;
  const pctPrevAlto = previousEvaluated.length > 0 ? Math.round((previousAlto / previousEvaluated.length) * 100) : 0;
  
  const diffPp = pctAlto - pctPrevAlto;

  const avgOverallScore =
    total > 0
      ? Math.round(assessments.reduce((acc, a) => acc + a.overallScore, 0) / total)
      : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      <MetricCard
        title="QAs Avaliados"
        value={total}
        subtext="Com assessment concluído"
        icon={Users}
        variant="default"
      />

      <MetricCard
        title="Perfil Alto"
        value={`${pctAlto}%`}
        subtext={`${countAlto} profissionais`}
        icon={CheckCircle}
        variant="success"
      />

      <MetricCard
        title="Perfil Médio"
        value={`${pctMedio}%`}
        subtext={`${countMedio} profissionais`}
        icon={Target}
        variant="warning"
      />

      <MetricCard
        title="Perfil Baixo"
        value={`${pctBaixo}%`}
        subtext={`${countBaixo} profissionais`}
        icon={AlertCircle}
        variant="default"
      />

      <MetricCard
        title="Evolução Scan"
        value={`${diffPp >= 0 ? '+' : ''}${diffPp} p.p.`}
        subtext={`Anterior: ${pctPrevAlto}% → Atual: ${pctAlto}%`}
        trend={{
          value: diffPp >= 0 ? `+${diffPp}%` : `${diffPp}%`,
          isPositive: diffPp >= 0
        }}
        icon={TrendingUp}
        variant="primary"
      />

      <MetricCard
        title="Score Médio"
        value={`${avgOverallScore}%`}
        subtext="Média ponderada geral"
        icon={Award}
        variant="primary"
      />
    </div>
  );
};
