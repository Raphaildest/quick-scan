import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { QAPublicPage } from './pages/QAPublicPage';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminUser } from './types/auth';
import { authService } from './services/authService';

type AppView = 'public' | 'admin-login' | 'admin-dashboard';

export function App() {
  const [currentView, setCurrentView] = useState<AppView>('public');
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleGoToAdmin = () => {
    if (currentUser) {
      setCurrentView('admin-dashboard');
    } else {
      setCurrentView('admin-login');
    }
  };

  const handleLoginSuccess = (user: AdminUser) => {
    setCurrentUser(user);
    setCurrentView('admin-dashboard');
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setCurrentView('public');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* If in Public QA flow, show top navigation */}
      {currentView === 'public' && (
        <Navbar
          onGoToAdmin={handleGoToAdmin}
          currentUser={currentUser}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'public' && (
          <QAPublicPage />
        )}

        {currentView === 'admin-login' && (
          <div className="min-h-screen flex flex-col justify-center bg-slate-100 py-12">
            <AdminLogin
              onSuccess={handleLoginSuccess}
              onGoToPublic={() => setCurrentView('public')}
            />
          </div>
        )}

        {currentView === 'admin-dashboard' && currentUser && (
          <AdminDashboardPage
            currentUser={currentUser}
            onLogout={handleLogout}
            onGoToPublic={() => setCurrentView('public')}
          />
        )}
      </main>

      {/* Corporate Footer (Public view) */}
      {currentView === 'public' && (
        <footer className="bg-white border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-slate-900 tracking-wide">QUICK SCAN</span>
              <span className="text-slate-400">•</span>
              <span>NTT DATA Quality Engineering</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Assessment Técnico de Habilidades • {new Date().getFullYear()}
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
