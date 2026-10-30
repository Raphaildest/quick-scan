import React from 'react';
import { AssessmentResult } from '../../types/assessment';
import { ArrowUpRight, ArrowDownRight, Minus, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface TransitionMatrixViewProps {
  assessments: AssessmentResult[];
  onSelectCell?: (prev: string, current: string) => void;
}

export const TransitionMatrixView: React.FC<TransitionMatrixViewProps> = ({
  assessments,
  onSelectCell
}) => {
  const categories = ['Alto', 'Médio', 'Baixo'] as const;

  const getCount = (prev: string, current: string) => {
    return assessments.filter(
      (a) => a.previousClassification === prev && a.classification === current
    ).length;
  };

  const getCellMeta = (prev: string, current: string) => {
    if (prev === 'Alto' && current === 'Alto') {
      return {
        label: 'Desempenho Confirmado',
        action: 'Manter / Habilitador',
        bg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
        icon: CheckCircle2,
        iconColor: 'text-emerald-600'
      };
    }
    if (prev === 'Médio' && current === 'Alto') {
      return {
        label: 'Evolução Consistente',
        action: 'Multiplicador',
        bg: 'bg-blue-50 border-blue-200 text-blue-900',
        icon: ArrowUpRight,
        iconColor: 'text-blue-600'
      };
    }
    if (prev === 'Baixo' && current === 'Alto') {
      return {
        label: 'Salto de Maturidade',
        action: 'Reconhecimento',
        bg: 'bg-teal-50 border-teal-200 text-teal-900',
        icon: ArrowUpRight,
        iconColor: 'text-teal-600'
      };
    }
    if (prev === 'Alto' && current === 'Baixo') {
      return {
        label: 'Divergência Crítica',
        action: 'Gate: Entrevista Obrigatória',
        bg: 'bg-rose-100 border-rose-300 text-rose-950 font-bold',
        icon: AlertTriangle,
        iconColor: 'text-rose-700'
      };
    }
    if (prev === 'Médio' && current === 'Médio') {
      return {
        label: 'Desempenho Estável',
        action: 'Habilitar Gaps',
        bg: 'bg-amber-50 border-amber-200 text-amber-900',
        icon: Minus,
        iconColor: 'text-amber-600'
      };
    }
    if (prev === 'Alto' && current === 'Médio') {
      return {
        label: 'Atenção Técnica',
        action: 'Habilitar Gaps',
        bg: 'bg-orange-50 border-orange-200 text-orange-900',
        icon: ArrowDownRight,
        iconColor: 'text-orange-600'
      };
    }
    if (prev === 'Médio' && current === 'Baixo') {
      return {
        label: 'Declínio Técnico',
        action: 'Plano Intensivo',
        bg: 'bg-rose-50 border-rose-200 text-rose-900',
        icon: ArrowDownRight,
        iconColor: 'text-rose-600'
      };
    }
    if (prev === 'Baixo' && current === 'Médio') {
      return {
        label: 'Evolução Moderada',
        action: 'Acompanhar Aceleração',
        bg: 'bg-lime-50 border-lime-200 text-lime-900',
        icon: ArrowUpRight,
        iconColor: 'text-lime-600'
      };
    }
    // Baixo x Baixo
    return {
      label: 'Gap Persistente',
      action: 'Avaliar Substituição / Plano',
      bg: 'bg-red-100/70 border-red-300 text-red-950',
      icon: AlertTriangle,
      iconColor: 'text-red-600'
    };
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            Matriz de Transição Estratégica (Scan Anterior vs. Quick Scan)
          </h3>
          <p className="text-xs text-slate-500">
            Cruza o histórico de aptidão com os resultados comprovados na avaliação
          </p>
        </div>
        <div className="flex items-center space-x-2 text-[11px] text-slate-500">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
          <span>Divergência = Entrevista</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              <th className="p-3 text-left font-bold text-slate-400 uppercase tracking-wider bg-slate-50 border border-slate-200 rounded-tl-xl w-32">
                Scan Anterior ↓ \ Quick Atual →
              </th>
              {categories.map((col) => (
                <th
                  key={col}
                  className="p-3 text-center font-extrabold uppercase tracking-wider bg-slate-100 border border-slate-200 text-slate-800"
                >
                  Quick Scan: {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((row) => (
              <tr key={row}>
                <td className="p-3 font-bold bg-slate-100 border border-slate-200 text-slate-800 uppercase tracking-wider">
                  Anterior: {row}
                </td>
                {categories.map((col) => {
                  const count = getCount(row, col);
                  const meta = getCellMeta(row, col);
                  const Icon = meta.icon;

                  return (
                    <td
                      key={`${row}-${col}`}
                      onClick={() => onSelectCell && onSelectCell(row, col)}
                      className={`p-3.5 border border-slate-200 transition-all cursor-pointer hover:shadow-inner ${meta.bg}`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-lg font-black">{count}</span>
                        <Icon className={`w-4 h-4 ${meta.iconColor}`} />
                      </div>
                      <div className="mt-1 font-bold leading-tight">{meta.label}</div>
                      <div className="mt-1 text-[10px] opacity-80 uppercase tracking-tight">
                        {meta.action}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
