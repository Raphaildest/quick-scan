import React from 'react';
import { ShieldCheck, Lock, ExternalLink } from 'lucide-react';
import { AdminUser } from '../../types/auth';

interface NavbarProps {
  onGoToAdmin: () => void;
  currentUser: AdminUser | null;
}

export const Navbar: React.FC<NavbarProps> = ({ onGoToAdmin, currentUser }) => {
  return (
    <header className="sticky top-0 z-40 bg-ntt-navy text-white shadow-md border-b border-slate-700/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Product Title */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-ntt-blue flex items-center justify-center font-bold text-white shadow-inner">
              <ShieldCheck className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base tracking-wide text-white">
                  QUICK SCAN
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  NTT DATA
                </span>
              </div>
              <p className="text-[11px] text-slate-300 hidden sm:block">
                Quality Engineering • Questionário Técnico de Habilidades
              </p>
            </div>
          </div>

          {/* Right Action: Admin Access */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onGoToAdmin}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-600 transition"
              title="Acesso restrito para Gestores e Administradores"
            >
              <Lock className="w-3.5 h-3.5 text-cyan-300" />
              <span>{currentUser ? 'Painel Administrativo' : 'Área do Administrador'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

