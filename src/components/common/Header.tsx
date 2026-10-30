import React, { useState } from 'react';
import { Database, ShieldCheck, UserCheck, BarChart3, Rocket, Info, CheckCircle2, AlertTriangle, X } from 'lucide-react';
import { isSupabaseConfigured } from '../../services/supabaseClient';

export type ActivePortal = 'qa' | 'analytics' | 'accelerate';

interface HeaderProps {
  activePortal: ActivePortal;
  onSelectPortal: (portal: ActivePortal) => void;
}

export const Header: React.FC<HeaderProps> = ({ activePortal, onSelectPortal }) => {
  const [showDbModal, setShowDbModal] = useState(false);
  const isSupabase = isSupabaseConfigured();

  return (
    <>
      <header className="sticky top-0 z-40 bg-ntt-navy text-white shadow-md border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Product Title */}
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-ntt-blue flex items-center justify-center font-bold text-white shadow-inner">
                <ShieldCheck className="w-5 h-5 text-cyan-300" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-base tracking-wide text-white">QUICK SCAN</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                    NTT DATA
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 hidden sm:block">
                  Quality Engineering, Automação & IA
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex space-x-1 sm:space-x-2 bg-slate-900/60 p-1 rounded-xl border border-slate-700/40">
              <button
                onClick={() => onSelectPortal('qa')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activePortal === 'qa'
                    ? 'bg-ntt-blue text-white shadow'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <UserCheck className="w-4 h-4 text-cyan-300" />
                <span>Portal do QA</span>
              </button>

              <button
                onClick={() => onSelectPortal('analytics')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activePortal === 'analytics'
                    ? 'bg-ntt-blue text-white shadow'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                <span>Portal Analytics</span>
              </button>

              <button
                onClick={() => onSelectPortal('accelerate')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activePortal === 'accelerate'
                    ? 'bg-ntt-blue text-white shadow'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Rocket className="w-4 h-4 text-amber-400" />
                <span>Accelerate Team</span>
              </button>
            </nav>

            {/* Database Status Button */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowDbModal(true)}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                  isSupabase
                    ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700 hover:bg-emerald-900/60'
                    : 'bg-slate-800/80 text-cyan-300 border-cyan-800/60 hover:bg-slate-800'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span className="hidden md:inline">
                  {isSupabase ? 'Supabase Conectado' : 'Modo Híbrido (Supabase Ready)'}
                </span>
                <span className={`w-2 h-2 rounded-full ${isSupabase ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400'}`}></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Database Modal / Flyout */}
      {showDbModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white text-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-xl ${isSupabase ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Configuração do Supabase</h3>
                  <p className="text-xs text-slate-500">PostgreSQL, Storage e Autenticação Corporativa</p>
                </div>
              </div>
              <button
                onClick={() => setShowDbModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div className={`p-4 rounded-xl border ${
                isSupabase ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-blue-50 border-blue-200 text-blue-900'
              }`}>
                <div className="flex items-start space-x-2.5">
                  {isSupabase ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  )}
                  <div className="text-xs leading-relaxed">
                    <p className="font-semibold text-sm">
                      {isSupabase ? 'Supabase Ativo & Operacional' : 'Camada Desacoplada Ativa (Local/Mock)'}
                    </p>
                    <p className="mt-1">
                      {isSupabase
                        ? 'Todas as operações de submissão, scores, diagnósticos e upload de ZIP estão persistindo diretamente no PostgreSQL e Storage do Supabase.'
                        : 'A aplicação está totalmente navegável e funcional localmente com persistência em LocalStorage. O código está 100% preparado para conectar ao seu banco Supabase a qualquer instante.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-xs space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p className="font-semibold text-slate-700 uppercase tracking-wide">Como conectar seu Supabase:</p>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-600 leading-normal">
                  <li>Crie um projeto gratuito no <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-blue-600 underline font-medium">supabase.com</a>.</li>
                  <li>Abra o <strong>SQL Editor</strong> do Supabase e execute o script gerado em <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">supabase/schema.sql</code> e <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">supabase/seed.sql</code>.</li>
                  <li>Copie o arquivo <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">.env.example</code> para <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">.env</code> e insira sua <strong>Project URL</strong> e <strong>anon key</strong>.</li>
                  <li>Pronto! O app detectará o Supabase automaticamente.</li>
                </ol>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowDbModal(false)}
                className="px-4 py-2 bg-ntt-navy text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
