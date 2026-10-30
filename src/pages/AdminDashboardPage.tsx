import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Shield, LogOut, ExternalLink, RefreshCw, RotateCcw, BookOpen } from 'lucide-react';
import { AdminUser } from '../types/auth';
import { QASubmission } from '../types/qaSubmission';
import { authService } from '../services/authService';
import { submissionService } from '../services/submissionService';
import { AnalyticsOverview } from '../components/admin/AnalyticsOverview';
import { QASubmissionsTable } from '../components/admin/QASubmissionsTable';
import { AdminUserManagement } from '../components/admin/AdminUserManagement';
import { QuestionManagement } from '../components/admin/QuestionManagement';
import { QADetailModal } from '../components/admin/QADetailModal';

interface AdminDashboardPageProps {
  currentUser: AdminUser;
  onLogout: () => void;
  onGoToPublic: () => void;
}

type AdminTab = 'overview' | 'submissions' | 'questions' | 'users';

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  currentUser,
  onLogout,
  onGoToPublic
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [submissions, setSubmissions] = useState<QASubmission[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters shared between overview and table
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedClassification, setSelectedClassification] = useState('');

  // Individual modal
  const [selectedDetail, setSelectedDetail] = useState<QASubmission | null>(null);

  const loadSubmissions = async () => {
    setLoading(true);
    const list = await submissionService.getAllSubmissions();
    setSubmissions(list);
    setLoading(false);
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  const handleResetData = () => {
    if (confirm('Deseja restaurar as submissões demonstrativas padrão?')) {
      submissionService.resetMockData();
      loadSubmissions();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-['Plus_Jakarta_Sans',sans-serif] pb-12">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-ntt-navy text-white shadow-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-ntt-blue flex items-center justify-center font-bold text-white shadow-inner">
                <BarChart3 className="w-4 h-4 text-cyan-300" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-sm sm:text-base tracking-wide text-white">
                    QUICK SCAN
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                    ANALYTICS NTT DATA
                  </span>
                </div>
                <p className="text-[10px] text-slate-300 hidden sm:block">
                  Painel de Liderança & Gestão de Qualidade
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex space-x-1 bg-slate-900/60 p-1 rounded-xl border border-slate-700/50">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'overview'
                    ? 'bg-ntt-blue text-white shadow'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5 text-cyan-300" />
                <span>Visão Geral</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('submissions')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'submissions'
                    ? 'bg-ntt-blue text-white shadow'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-emerald-300" />
                <span>QAs & Respostas</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('questions')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'questions'
                    ? 'bg-ntt-blue text-white shadow'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-cyan-300" />
                <span>Banco de Questões</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('users')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'users'
                    ? 'bg-ntt-blue text-white shadow'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-amber-300" />
                <span>Administradores</span>
              </button>
            </nav>

            {/* User Session & Actions */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={onGoToPublic}
                className="hidden md:inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300 border border-slate-700 transition"
                title="Abrir o link público que os QAs usam para preencher o questionário"
              >
                <span>Link do QA</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <div className="text-right hidden sm:block border-l border-slate-700 pl-3">
                <span className="text-xs font-bold text-white block leading-tight">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-cyan-400 capitalize">
                  {currentUser.role === 'admin' ? 'Administrador' : 'Gestor'}
                </span>
              </div>

              <button
                type="button"
                onClick={onLogout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
                title="Encerrar sessão"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Quick Actions Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Sessão ativa como <strong>{currentUser.email}</strong></span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleResetData}
              className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold transition"
              title="Restaurar base de submissões demonstrativas"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Restaurar Base Demo</span>
            </button>

            <button
              type="button"
              onClick={loadSubmissions}
              className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold transition"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
              <span>Atualizar</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <AnalyticsOverview
            submissions={submissions}
            selectedArea={selectedArea}
            selectedClassification={selectedClassification}
          />
        )}

        {/* Tab 2: Submissions Table */}
        {activeTab === 'submissions' && (
          <QASubmissionsTable
            submissions={submissions}
            selectedArea={selectedArea}
            selectedClassification={selectedClassification}
            onSelectArea={setSelectedArea}
            onSelectClassification={setSelectedClassification}
            onOpenDetail={(sub: QASubmission) => setSelectedDetail(sub)}
          />
        )}

        {/* Tab 3: Question Bank Management */}
        {activeTab === 'questions' && (
          <QuestionManagement />
        )}

        {/* Tab 4: Admin User Management */}
        {activeTab === 'users' && (
          <AdminUserManagement />
        )}
      </main>

      {/* Detail Modal */}
      {selectedDetail && (
        <QADetailModal
          submission={selectedDetail}
          onClose={() => setSelectedDetail(null)}
        />
      )}
    </div>
  );
};
