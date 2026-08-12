import { create } from 'zustand';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'CANDIDATE' | 'RECRUITER' | 'ADMIN';
  tenantId: string;
  organizationName?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  theme: 'light' | 'dark';
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  toggleTheme: () => void;
}

const savedUser = localStorage.getItem('matchmind_user');
const savedToken = localStorage.getItem('matchmind_token');

export const useAuthStore = create<AuthState>((set) => ({
  user: savedUser ? JSON.parse(savedUser) : null,
  token: savedToken || null,
  theme: 'light',
  setAuth: (user: User, token: string) => {
    localStorage.setItem('matchmind_user', JSON.stringify(user));
    localStorage.setItem('matchmind_token', token);
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem('matchmind_user');
    localStorage.removeItem('matchmind_token');
    set({ user: null, token: null });
  },
  toggleTheme: () => {
    set((state: AuthState) => {
      const nextTheme = state.theme === 'light' ? 'dark' : 'light';
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
      return { theme: nextTheme };
    });
  },
}));
