import React, { useState } from 'react';
import { Lock, Mail, ShieldAlert, ArrowRight, UserCheck } from 'lucide-react';
import { authService } from '../../services/authService';
import { AdminUser } from '../../types/auth';

interface AdminLoginProps {
  onSuccess: (user: AdminUser) => void;
  onGoToPublic: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onGoToPublic }) => {
  const [email, setEmail] = useState('admin@nttdata.com');
  const [password, setPassword] = useState('ntt@2026');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await authService.login(email, password);
      onSuccess(user);
    } catch (err: any) {
      setError(err.message || 'Falha na autenticação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-ntt-navy to-slate-900 p-6 text-white text-center">
          <div className="w-12 h-12 rounded-xl bg-ntt-blue/30 border border-cyan-400/30 flex items-center justify-center mx-auto mb-2">
            <Lock className="w-6 h-6 text-cyan-300" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
            Área Restrita à Liderança
          </span>
          <h2 className="text-xl font-bold">Login Administrativo</h2>
          <p className="text-xs text-slate-300 mt-1">
            Acesso ao Dashboard Analítico e Gestão de Usuários
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-5">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              E-mail do Administrador
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@nttdata.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-ntt-blue focus:bg-white transition"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Senha de Acesso
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-ntt-blue focus:bg-white transition"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-ntt-blue hover:bg-blue-600 text-white font-bold rounded-xl shadow-md transition disabled:opacity-50"
            >
              <span>{loading ? 'Validando acesso...' : 'Acessar Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">Credencial Demo: admin@nttdata.com</span>
            <button
              type="button"
              onClick={onGoToPublic}
              className="text-ntt-blue font-bold hover:underline"
            >
              Ir para Questionário do QA
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

