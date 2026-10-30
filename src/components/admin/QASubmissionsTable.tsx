import React, { useState } from 'react';
import { Search, Eye, Download, ArrowUpDown, Filter, UserCheck } from 'lucide-react';
import { QASubmission } from '../../types/qaSubmission';

interface QASubmissionsTableProps {
  submissions: QASubmission[];
  onOpenDetail: (submission: QASubmission) => void;
  selectedArea: string;
  selectedClassification: string;
  onSelectArea: (area: string) => void;
  onSelectClassification: (classification: string) => void;
}

export const QASubmissionsTable: React.FC<QASubmissionsTableProps> = ({
  submissions,
  onOpenDetail,
  selectedArea,
  selectedClassification,
  onSelectArea,
  onSelectClassification
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'score' | 'name' | 'date'>('score');
  const [sortAsc, setSortAsc] = useState(false);

  // Unique areas for filter
  const uniqueAreas = Array.from(new Set(submissions.map(s => s.area))).filter(Boolean);

  const filtered = submissions.filter(s => {
    if (selectedArea && s.area !== selectedArea) return false;
    if (selectedClassification && s.classification !== selectedClassification) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchName = s.name.toLowerCase().includes(term);
      const matchEmail = s.email.toLowerCase().includes(term);
      const matchArea = s.area.toLowerCase().includes(term);
      if (!matchName && !matchEmail && !matchArea) return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    let comp = 0;
    if (sortField === 'score') comp = a.overallScore - b.overallScore;
    if (sortField === 'name') comp = a.name.localeCompare(b.name);
    if (sortField === 'date') comp = new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
    return sortAsc ? comp : -comp;
  });

  const handleSort = (field: 'score' | 'name' | 'date') => {
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
      'Nome',
      'Email',
      'Area_Atuacao',
      'Score_Geral',
      'Classificacao',
      'Automacao',
      'IA_Aplicada',
      'Engenharia',
      'CICD_Massa',
      'Fundamentos',
      'Data_Submissao'
    ];

    const rows = filtered.map(s => [
      `"${s.name}"`,
      `"${s.email}"`,
      `"${s.area}"`,
      s.overallScore,
      `"${s.classification}"`,
      s.scores.automation,
      s.scores.ai,
      s.scores.engineering,
      s.scores.cicd,
      s.scores.fundamentals,
      `"${new Date(s.submittedAt).toLocaleDateString()}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
    const encoded = encodeURI(csvContent);
    const link = document.createElement('a');
    link.href = encoded;
    link.download = `quick_scan_respostas_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
      {/* Top Filter Bar */}
      <div className="p-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Profissionais Avaliados (Visão Individual)
            </h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {filtered.length} QAs
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Clique em "Raio-X" para visualizar as respostas e o diagnóstico de cada profissional
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Area Filter */}
          <select
            value={selectedArea}
            onChange={(e) => onSelectArea(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-ntt-blue"
          >
            <option value="">Todas as Áreas</option>
            {uniqueAreas.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>

          {/* Classification Filter */}
          <select
            value={selectedClassification}
            onChange={(e) => onSelectClassification(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-ntt-blue"
          >
            <option value="">Todas as Classificações</option>
            <option value="Alto">Alto</option>
            <option value="Médio">Médio</option>
            <option value="Baixo">Baixo</option>
          </select>

          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nome, email ou área..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-ntt-blue focus:bg-white w-48 sm:w-56"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>

          {/* Export CSV */}
          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center space-x-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
            title="Exportar planilha CSV dos resultados filtrados"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CSV</span>
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
                  <span>Profissional / E-mail</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-4">Área de Atuação</th>
              <th
                onClick={() => handleSort('score')}
                className="py-3 px-4 text-center cursor-pointer hover:text-slate-900"
              >
                <div className="flex items-center justify-center space-x-1">
                  <span>Score Geral</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-4 text-center">Classificação</th>
              <th className="py-3 px-4 text-center">Automação</th>
              <th className="py-3 px-4 text-center">IA Aplicada</th>
              <th
                onClick={() => handleSort('date')}
                className="py-3 px-4 cursor-pointer hover:text-slate-900"
              >
                <div className="flex items-center space-x-1">
                  <span>Data de Envio</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sorted.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 px-4">
                  <div className="font-bold text-slate-900">{s.name}</div>
                  <div className="text-[11px] text-slate-500 font-mono">{s.email}</div>
                </td>

                <td className="py-3 px-4">
                  <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md text-[11px]">
                    {s.area}
                  </span>
                </td>

                <td className="py-3 px-4 text-center">
                  <span className="font-black text-sm text-slate-900">
                    {s.overallScore}%
                  </span>
                </td>

                <td className="py-3 px-4 text-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      s.classification === 'Alto'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : s.classification === 'Médio'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}
                  >
                    {s.classification}
                  </span>
                </td>

                <td className="py-3 px-4 text-center font-semibold text-slate-700">
                  {s.scores.automation}%
                </td>

                <td className="py-3 px-4 text-center font-semibold text-slate-700">
                  {s.scores.ai}%
                </td>

                <td className="py-3 px-4 text-slate-500 text-[11px]">
                  {new Date(s.submittedAt).toLocaleDateString()}
                </td>

                <td className="py-3 px-4 text-center">
                  <button
                    type="button"
                    onClick={() => onOpenDetail(s)}
                    className="inline-flex items-center space-x-1 px-3 py-1 bg-ntt-blue/10 hover:bg-ntt-blue text-ntt-blue hover:text-white rounded-lg font-bold text-xs transition"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Raio-X</span>
                  </button>
                </td>
              </tr>
            ))}

            {sorted.length === 0 && (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-400 text-xs">
                  Nenhum profissional encontrado com os filtros selecionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

