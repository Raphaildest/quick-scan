import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { Hierarchy } from '../../types/qa';

interface FiltersBarProps {
  hierarchies: Hierarchy[];
  selectedGerencia: string;
  selectedCoordenacao: string;
  selectedSquad: string;
  onSelectGerencia: (val: string) => void;
  onSelectCoordenacao: (val: string) => void;
  onSelectSquad: (val: string) => void;
  onReset: () => void;
}

export const FiltersBar: React.FC<FiltersBarProps> = ({
  hierarchies,
  selectedGerencia,
  selectedCoordenacao,
  selectedSquad,
  onSelectGerencia,
  onSelectCoordenacao,
  onSelectSquad,
  onReset
}) => {
  // Cascading options
  const gerencias = Array.from(new Set(hierarchies.map((h) => h.gerencia)));

  const filteredCoordenacoes = Array.from(
    new Set(
      hierarchies
        .filter((h) => !selectedGerencia || h.gerencia === selectedGerencia)
        .map((h) => h.coordenacao)
    )
  );

  const filteredSquads = Array.from(
    new Set(
      hierarchies
        .filter(
          (h) =>
            (!selectedGerencia || h.gerencia === selectedGerencia) &&
            (!selectedCoordenacao || h.coordenacao === selectedCoordenacao)
        )
        .map((h) => h.squad_name)
    )
  );

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
      <div className="flex items-center space-x-2 text-slate-700 font-bold">
        <Filter className="w-4 h-4 text-blue-600" />
        <span>Filtros em Cascata:</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1 max-w-3xl">
        {/* Gerência */}
        <div>
          <select
            value={selectedGerencia}
            onChange={(e) => {
              onSelectGerencia(e.target.value);
              onSelectCoordenacao('');
              onSelectSquad('');
            }}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:ring-2 focus:ring-ntt-blue"
          >
            <option value="">Todas as Gerências</option>
            {gerencias.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Coordenação */}
        <div>
          <select
            value={selectedCoordenacao}
            onChange={(e) => {
              onSelectCoordenacao(e.target.value);
              onSelectSquad('');
            }}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:ring-2 focus:ring-ntt-blue"
          >
            <option value="">Todas as Coordenações</option>
            {filteredCoordenacoes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Squad */}
        <div>
          <select
            value={selectedSquad}
            onChange={(e) => onSelectSquad(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:ring-2 focus:ring-ntt-blue"
          >
            <option value="">Todas as Squads</option>
            {filteredSquads.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="flex items-center justify-center space-x-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Limpar</span>
      </button>
    </div>
  );
};
