import React, { useState, useEffect } from 'react';
import { UserCheck, Search, Building2, Users, ArrowRight, Shield, Sparkles, UserPlus } from 'lucide-react';
import { QA, Hierarchy } from '../../types/qa';
import { dataService } from '../../services/dataService';
import { StatusBadge } from '../common/StatusBadge';

interface IdentificationStepProps {
  onIdentified: (qa: QA) => void;
}

export const IdentificationStep: React.FC<IdentificationStepProps> = ({ onIdentified }) => {
  const [sap, setSap] = useState('');
  const [selectedQA, setSelectedQA] = useState<QA | null>(null);
  const [loading, setLoading] = useState(false);
  const [qas, setQas] = useState<QA[]>([]);
  const [hierarchies, setHierarchies] = useState<Hierarchy[]>([]);
  const [isRegisteringNew, setIsRegisteringNew] = useState(false);

  // New QA fields
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newHierarchyId, setNewHierarchyId] = useState('');

  useEffect(() => {
    async function loadData() {
      const [loadedQAs, loadedHierarchies] = await Promise.all([
        dataService.getQAs(),
        dataService.getHierarchies()
      ]);
      setQas(loadedQAs);
      setHierarchies(loadedHierarchies);
      if (loadedHierarchies.length > 0) {
        setNewHierarchyId(loadedHierarchies[0].id);
      }
    }
    loadData();
  }, []);

  const handleSearchSAP = async (sapToSearch: string) => {
    setLoading(true);
    const found = await dataService.findQABySAP(sapToSearch);
    setSelectedQA(found);
    setIsRegisteringNew(false);
    setLoading(false);
  };

  const handleCreateNewQA = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sap || !newName) return;

    setLoading(true);
    const hierarchy = hierarchies.find(h => h.id === newHierarchyId);
    const created = await dataService.upsertQA({
      sap: sap.trim(),
      name: newName.trim(),
      email: newEmail.trim() || undefined,
      hierarchy_id: newHierarchyId,
      hierarchy: hierarchy,
      previous_scan_classification: 'Não Avaliado'
    });

    setSelectedQA(created);
    setIsRegisteringNew(false);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-ntt-navy to-slate-900 p-6 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-ntt-blue/30 border border-cyan-400/30 flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-cyan-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Identificação do Profissional</h2>
              <p className="text-xs text-slate-300">
                Informe seu SAP para carregar sua alocação e iniciar o assessment
              </p>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Número SAP do Colaborador
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Ex: 100234, 100891..."
                  value={sap}
                  onChange={(e) => {
                    setSap(e.target.value);
                    if (selectedQA) setSelectedQA(null);
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchSAP(sap)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ntt-blue focus:bg-white transition"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
              <button
                type="button"
                onClick={() => handleSearchSAP(sap)}
                disabled={!sap || loading}
                className="px-5 py-2.5 bg-ntt-blue hover:bg-blue-600 text-white text-xs font-bold rounded-xl shadow transition disabled:opacity-50"
              >
                {loading ? 'Buscando...' : 'Localizar'}
              </button>
            </div>

            {/* Quick selector of demo QAs */}
            <div className="mt-3">
              <span className="text-[11px] text-slate-500 mr-2">QAs cadastrados para teste rápido:</span>
              <div className="inline-flex flex-wrap gap-1.5 mt-1">
                {qas.slice(0, 5).map((q) => (
                  <button
                    key={q.sap}
                    type="button"
                    onClick={() => {
                      setSap(q.sap);
                      handleSearchSAP(q.sap);
                    }}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition"
                  >
                    {q.name.split(' ')[0]} ({q.sap})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Found */}
          {selectedQA && !isRegisteringNew && (
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50/70 to-slate-50 border border-blue-200/80 animate-fade-in space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                    Profissional Localizado
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900">{selectedQA.name}</h3>
                  <p className="text-xs text-slate-500 font-mono">SAP: {selectedQA.sap} • {selectedQA.email || 'sem e-mail'}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] block text-slate-500 uppercase font-bold mb-1">Scan Anterior</span>
                  <StatusBadge status={selectedQA.previous_scan_classification || 'Não Avaliado'} size="sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-blue-100 text-xs">
                <div className="flex items-center space-x-2 text-slate-700">
                  <Building2 className="w-4 h-4 text-blue-500 shrink-0" />
                  <div>
                    <span className="block text-[10px] text-slate-500">Coordenação</span>
                    <span className="font-semibold">{selectedQA.hierarchy?.coordenacao || 'Não atribuída'}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-slate-700">
                  <Users className="w-4 h-4 text-blue-500 shrink-0" />
                  <div>
                    <span className="block text-[10px] text-slate-500">Squad</span>
                    <span className="font-semibold">{selectedQA.hierarchy?.squad_name || 'Geral'}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onIdentified(selectedQA)}
                className="w-full mt-3 flex items-center justify-center space-x-2 py-3 bg-ntt-blue hover:bg-blue-600 text-white font-bold rounded-xl shadow-md transition"
              >
                <span>Confirmar Dados e Iniciar Quick Scan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Not Found -> Prompt to Register */}
          {sap && !selectedQA && !loading && (
            <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-slate-700 space-y-3">
              <div className="flex items-center space-x-2 text-amber-800 font-bold">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>SAP não localizado na base prévia</span>
              </div>
              <p>
                Deseja se cadastrar agora? É rápido e você poderá realizar a avaliação normalmente.
              </p>
              {!isRegisteringNew ? (
                <button
                  type="button"
                  onClick={() => setIsRegisteringNew(true)}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Cadastrar meu SAP agora</span>
                </button>
              ) : (
                <form onSubmit={handleCreateNewQA} className="space-y-3 pt-3 border-t border-amber-200">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Nome Completo *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: João Souza"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">E-mail (qualquer e-mail válido)</label>
                    <input
                      type="email"
                      placeholder="joao@qualquer.com"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Squad / Alocação</label>
                    <select
                      value={newHierarchyId}
                      onChange={(e) => setNewHierarchyId(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                    >
                      {hierarchies.map((h) => (
                        <option key={h.id} value={h.id}>
                          {h.coordenacao} — {h.squad_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 bg-ntt-blue text-white font-bold rounded-lg text-xs hover:bg-blue-600 transition"
                    >
                      Salvar e Continuar
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsRegisteringNew(false)}
                      className="px-3 py-2 bg-slate-200 text-slate-700 rounded-lg text-xs hover:bg-slate-300"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
