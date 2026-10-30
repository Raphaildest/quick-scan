import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Shield, CheckCircle2, XCircle, Trash2, Key, AlertCircle, X } from 'lucide-react';
import { AdminUser } from '../../types/auth';
import { authService } from '../../services/authService';

export const AdminUserManagement: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'admin' | 'manager'>('manager');
  const [newPassword, setNewPassword] = useState('ntt@2026');

  const loadUsers = async () => {
    setLoading(true);
    const list = await authService.getAdminUsers();
    setUsers(list);
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await authService.createAdminUser({
        name: newName,
        email: newEmail,
        role: newRole,
        password: newPassword
      });

      setSuccess(`Administrador "${newName}" cadastrado com sucesso!`);
      setShowAddModal(false);
      setNewName('');
      setNewEmail('');
      setNewPassword('ntt@2026');
      await loadUsers();
      setTimeout(() => setSuccess(''), 4000);
    } catch (err: any) {
      setError(err.message || 'Erro ao cadastrar administrador.');
    }
  };

  const handleToggleStatus = async (user: AdminUser) => {
    try {
      const updated = await authService.toggleUserStatus(user.id);
      setUsers(updated);
    } catch (err: any) {
      alert(err.message || 'Erro ao alterar status.');
    }
  };

  const handleDeleteUser = async (user: AdminUser) => {
    if (!confirm(`Tem certeza que deseja remover o acesso de "${user.name}"?`)) return;

    try {
      const updated = await authService.deleteAdminUser(user.id);
      setUsers(updated);
    } catch (err: any) {
      alert(err.message || 'Erro ao remover usuário.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-ntt-blue">
            Segurança & Controle de Acesso
          </span>
          <h2 className="text-lg font-black text-slate-900">
            Usuários Administradores & Gestores
          </h2>
          <p className="text-xs text-slate-500">
            Gerenciamento de quem possui permissão para acessar o painel de analytics e resultados dos QAs.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setError('');
            setShowAddModal(true);
          }}
          className="inline-flex items-center space-x-1.5 px-4 py-2 bg-ntt-blue hover:bg-blue-600 text-white font-bold rounded-xl text-xs shadow-md transition"
        >
          <UserPlus className="w-4 h-4" />
          <span>Cadastrar Novo Administrador</span>
        </button>
      </div>

      {success && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Administrador / Nome</th>
                <th className="py-3.5 px-4">E-mail Corporativo</th>
                <th className="py-3.5 px-4">Nível de Acesso</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4">Data de Inclusão</th>
                <th className="py-3.5 px-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-xs">
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                    <span>{u.name}</span>
                  </td>

                  <td className="py-3 px-4 font-mono text-slate-600">
                    {u.email}
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-md font-semibold text-[11px] border ${
                        u.role === 'admin'
                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      <Shield className="w-3 h-3 text-blue-600" />
                      <span>{u.role === 'admin' ? 'Administrador Geral' : 'Gestor de Qualidade'}</span>
                    </span>
                  </td>

                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        u.status === 'active'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}
                    >
                      <span>{u.status === 'active' ? 'Ativo' : 'Inativo'}</span>
                    </span>
                  </td>

                  <td className="py-3 px-4 text-slate-500 text-[11px]">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <div className="inline-flex items-center space-x-1.5">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(u)}
                        title={u.status === 'active' ? 'Desativar usuário' : 'Ativar usuário'}
                        className="px-2 py-1 rounded-lg text-[10px] font-bold border border-slate-200 hover:bg-slate-100 text-slate-700 transition"
                      >
                        {u.status === 'active' ? 'Desativar' : 'Ativar'}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteUser(u)}
                        title="Remover acesso"
                        className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Admin User */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-xl bg-blue-100 text-ntt-blue">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Novo Administrador</h3>
                  <p className="text-[11px] text-slate-500">Cadastre o acesso para liderança técnica</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ex: Carlos Mendes"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-ntt-blue"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  E-mail Corporativo *
                </label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Ex: carlos.mendes@nttdata.com"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-ntt-blue"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Perfil de Acesso *
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-ntt-blue"
                >
                  <option value="manager">Gestor de Qualidade (Visualiza Analytics e QAs)</option>
                  <option value="admin">Administrador Geral (Acesso Total + Gestão de Usuários)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Senha Provisória
                </label>
                <input
                  type="text"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-ntt-blue hover:bg-blue-600 text-white font-bold rounded-xl shadow transition"
                >
                  Salvar Usuário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

