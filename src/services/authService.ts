import { AdminUser } from '../types/auth';

const STORAGE_KEYS = {
  ADMINS: 'quickscan_admin_users_v1',
  SESSION: 'quickscan_admin_session_v1'
};

const INITIAL_ADMINS: (AdminUser & { passwordHash: string })[] = [
  {
    id: 'admin-1',
    name: 'Administrador Geral NTT',
    email: 'admin@nttdata.com',
    role: 'admin',
    status: 'active',
    createdAt: '2026-10-01T10:00:00Z',
    passwordHash: 'ntt@2026'
  },
  {
    id: 'admin-2',
    name: 'Gestor de Qualidade & IA',
    email: 'gestor.qa@nttdata.com',
    role: 'manager',
    status: 'active',
    createdAt: '2026-10-15T14:30:00Z',
    passwordHash: 'ntt@2026'
  }
];

function initAdminsStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.ADMINS)) {
    localStorage.setItem(STORAGE_KEYS.ADMINS, JSON.stringify(INITIAL_ADMINS));
  }
}

initAdminsStorage();

export const authService = {
  // Login method
  async login(email: string, password: string): Promise<AdminUser> {
    const raw = localStorage.getItem(STORAGE_KEYS.ADMINS);
    const admins: (AdminUser & { passwordHash: string })[] = raw ? JSON.parse(raw) : INITIAL_ADMINS;

    const cleanEmail = email.trim().toLowerCase();
    const found = admins.find(a => a.email.toLowerCase() === cleanEmail);

    if (!found) {
      throw new Error('E-mail não encontrado no cadastro de administradores.');
    }

    if (found.status === 'inactive') {
      throw new Error('Este usuário administrador está desativado. Contate o administrador principal.');
    }

    if (found.passwordHash !== password) {
      throw new Error('Senha incorreta. Verifique suas credenciais.');
    }

    const { passwordHash, ...safeUser } = found;
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(safeUser));
    return safeUser;
  },

  // Logout method
  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  },

  // Get current logged-in user
  getCurrentUser(): AdminUser | null {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AdminUser;
    } catch {
      return null;
    }
  },

  // List all admin users
  async getAdminUsers(): Promise<AdminUser[]> {
    const raw = localStorage.getItem(STORAGE_KEYS.ADMINS);
    const admins: (AdminUser & { passwordHash?: string })[] = raw ? JSON.parse(raw) : INITIAL_ADMINS;
    return admins.map(({ passwordHash, ...safeUser }) => safeUser);
  },

  // Create new admin user
  async createAdminUser(data: { name: string; email: string; role: 'admin' | 'manager'; password?: string }): Promise<AdminUser> {
    const raw = localStorage.getItem(STORAGE_KEYS.ADMINS);
    const admins: (AdminUser & { passwordHash: string })[] = raw ? JSON.parse(raw) : INITIAL_ADMINS;

    const cleanEmail = data.email.trim().toLowerCase();
    if (admins.some(a => a.email.toLowerCase() === cleanEmail)) {
      throw new Error('Já existe um administrador cadastrado com este e-mail.');
    }

    const newAdmin: AdminUser & { passwordHash: string } = {
      id: crypto.randomUUID(),
      name: data.name.trim(),
      email: cleanEmail,
      role: data.role,
      status: 'active',
      createdAt: new Date().toISOString(),
      passwordHash: data.password || 'ntt@2026'
    };

    admins.push(newAdmin);
    localStorage.setItem(STORAGE_KEYS.ADMINS, JSON.stringify(admins));

    const { passwordHash, ...safeUser } = newAdmin;
    return safeUser;
  },

  // Toggle user active status
  async toggleUserStatus(userId: string): Promise<AdminUser[]> {
    const raw = localStorage.getItem(STORAGE_KEYS.ADMINS);
    const admins: (AdminUser & { passwordHash: string })[] = raw ? JSON.parse(raw) : INITIAL_ADMINS;

    const user = admins.find(a => a.id === userId);
    if (!user) throw new Error('Usuário não encontrado.');

    // Protect at least one active admin
    const activeAdmins = admins.filter(a => a.status === 'active' && a.role === 'admin');
    if (user.status === 'active' && user.role === 'admin' && activeAdmins.length <= 1) {
      throw new Error('Não é possível desativar o único Administrador ativo.');
    }

    user.status = user.status === 'active' ? 'inactive' : 'active';
    localStorage.setItem(STORAGE_KEYS.ADMINS, JSON.stringify(admins));

    return admins.map(({ passwordHash, ...safeUser }) => safeUser);
  },

  // Delete admin user
  async deleteAdminUser(userId: string): Promise<AdminUser[]> {
    const raw = localStorage.getItem(STORAGE_KEYS.ADMINS);
    let admins: (AdminUser & { passwordHash: string })[] = raw ? JSON.parse(raw) : INITIAL_ADMINS;

    const user = admins.find(a => a.id === userId);
    if (!user) throw new Error('Usuário não encontrado.');

    const activeAdmins = admins.filter(a => a.status === 'active' && a.role === 'admin');
    if (user.role === 'admin' && activeAdmins.length <= 1) {
      throw new Error('Não é possível excluir o único Administrador do sistema.');
    }

    admins = admins.filter(a => a.id !== userId);
    localStorage.setItem(STORAGE_KEYS.ADMINS, JSON.stringify(admins));

    return admins.map(({ passwordHash, ...safeUser }) => safeUser);
  }
};

