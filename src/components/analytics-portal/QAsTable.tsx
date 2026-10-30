import React, { useState } from 'react';
import { Search, Eye, AlertTriangle, ArrowUpDown, Download } from 'lucide-react';
import { AssessmentResult } from '../../types/assessment';
import { StatusBadge } from '../common/StatusBadge';

interface QAsTableProps {
  assessments: AssessmentResult[];
  onOpenRadar: (assessment: AssessmentResult) => void;
}

export const QAsTable: React.FC<QAsTableProps> = ({ assessments, onOpenRadar }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'name' | 'score' | 'classification'>('score');
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = assessments.filter((a) => {
    const term = searchTerm.toLowerCase();
    return (
      a.qaName?.toLowerCase().includes(term) ||
      a.sap?.toLowerCase().includes(term) ||
      a.squad?.toLowerCase().includes(term) ||
      a.coordenacao?.toLowerCase().includes(term)
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    let comparison = 0;
    if (sortField === 'score') {
      comparison = a.overallScore - b.overallScore;
    } else if (sortField === 'name') {
      comparison = (a.qaName || '').localeCompare(b.qaName || '');
    } else if (sortField === 'classification') {
      comparison = (a.classification || '').localeCompare(b.classification || '');
    }
    return sortAsc ? comparison : -comparison;
  });

  const handleSort = (field: 'name' | 'score' | 'classification') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const handleExportCSV = () => {
    if (filtered.length === 0) return;
    const headers = [
      'SAP',
      'Nome',
      'Coordenacao',
      'Squad',
      'Scan_Anterior',
      'Quick_Scan_Atual',
      'Score_Geral',
      'Automacao_Score',
      'IA_Score',
      'Engenharia_Score',
      'Fundamentos_Score',
      'CICD_Score',
      'Perfil_Predominante',
      'Diagnostico_Transicao',
      'Acao_Recomendada'
    ];

    const rows = filtered.map((a) => [
      `"${a.sap}"`,
      `"${a.qaName || ''}"`,
      `"${a.coordenacao || ''}"`,
      `"${a.squad || ''}"`,
      `"${a.previousClassification || 'Não Avaliado'}"`,
      `"${a.classification}"`,
      a.overallScore,
      a.automationReadinessScore,
      a.aiReadinessScore,
      a.engineeringReadinessScore,
      a.qualityFundamentalsScore,
      a.cicdDataReadinessScore,
      `"${a.predominantProfile}"`,
      `"${a.transitionDiagnosis || ''}"`,
      `"${a.recommendedAction || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `quick_scan_analytics_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
      {/* Top Search & Actions */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            Quadro Individual de Profissionais
          </h3>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            {filtered.length} encontrados
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative max-w-xs w-full">
            <input
              type="text"
              placeholder="Buscar por Nome, SAP ou Squad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-ntt-blue focus:bg-white transition"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          </div>

          <button
            type="button"
            onClick={handleExportCSV}
            title="Exportar dados filtrados para CSV"
            className="inline-flex items-center space-x-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exportar CSV</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
            <tr>
              <th
                onClick={() => handleSort('name')}
                className="py-3 px-4 cursor-pointer hover:text-slate-900"
              >
                <div className="flex items-center space-x-1">
                  <span>Profissional / SAP</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-4">Coordenação & Squad</th>
              <th className="py-3 px-4 text-center">Scan Anterior</th>
              <th
                onClick={() => handleSort('classification')}
                className="py-3 px-4 text-center cursor-pointer hover:text-slate-900"
              >
                <div className="flex items-center justify-center space-x-1">
                  <span>Quick Scan Atual</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('score')}
                className="py-3 px-4 text-center cursor-pointer hover:text-slate-900"
              >
                <div className="flex items-center justify-center space-x-1">
                  <span>Score Ponderado</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-4">Perfil Predominante</th>
              <th className="py-3 px-4">Recomendação Estratégica</th>
              <th className="py-3 px-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sorted.map((item) => {
              const isDivergence =
                item.previousClassification === 'Alto' && item.classification === 'Baixo';

              return (
                <tr
                  key={item.id}
                  className={`hover:bg-slate-50/80 transition-colors ${
                    isDivergence ? 'bg-rose-50/70 border-l-4 border-l-rose-500' : ''
                  }`}
                >
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{item.qaName || 'QA'}</div>
                    <div className="text-[11px] font-mono text-slate-500">SAP: {item.sap}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-800">{item.squad || 'Geral'}</div>
                    <div className="text-[10px] text-slate-400">{item.coordenacao}</div>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <StatusBadge status={item.previousClassification || 'Não Avaliado'} size="sm" />
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <StatusBadge status={item.classification} size="sm" />
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span className="font-extrabold text-sm text-slate-900">
                      {item.overallScore}%
                    </span>
                    <span className="block text-[10px] text-slate-400">
                      Auto: {item.automationReadinessScore}%
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200 text-[11px]">
                      {item.predominantProfile}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-800 text-[11px]">{item.transitionDiagnosis}</div>
                    <div className="text-[10px] text-blue-600 font-semibold">{item.recommendedAction}</div>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => onOpenRadar(item)}
                      className="inline-flex items-center space-x-1 px-2.5 py-1.5 bg-ntt-blue/10 hover:bg-ntt-blue text-ntt-blue hover:text-white rounded-lg font-bold text-xs transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Raio-X</span>
                    </button>
                  </td>
                </tr>
              );
            })}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-400 text-xs">
                  Nenhum profissional encontrado com os filtros atuais.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
