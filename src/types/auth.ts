export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager';
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface AuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
}

