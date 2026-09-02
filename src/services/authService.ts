import api from './api';
import { RegisterDTO, LoginDTO, JWTPayload, User } from '@/types';

export function parseJwt(token: string): JWTPayload | null {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Error al decodificar JWT', e);
    return null;
  }
}

export const authService = {
  async register(data: RegisterDTO): Promise<{ message: string }> {
    const response = await api.post('/user/register', {
      title: data.title,
      name: data.title,
      mail: data.mail,
      password: data.password,
      sede: data.sede,
      codEst: data.codEst,
      role: data.role,
      cellphone: data.cellphone,
    });
    return response.data;
  },

  async login(credentials: LoginDTO): Promise<{ token: string; user: User }> {
    const response = await api.post('/user/login', credentials);
    const token = response.data.token;
    
    localStorage.setItem('udc_auth_token', token);
    // Clear any old mock cache
    localStorage.removeItem('udc_local_posts');

    const payload = parseJwt(token);
    const user: User = {
      id: payload?.user_id || 1,
      title: payload?.username || 'Estudiante UDC',
      name: payload?.username || 'Estudiante UDC',
      mail: credentials.mail,
      codEst: 'Verificado',
      sede: 'UDC',
      role: 'Estudiante',
      cellphone: '',
    };

    localStorage.setItem('udc_current_user', JSON.stringify(user));
    return { token, user };
  },

  logout(): void {
    localStorage.removeItem('udc_auth_token');
    localStorage.removeItem('udc_current_user');
    localStorage.removeItem('udc_local_posts');
  },

  getCurrentUser(): User | null {
    const saved = localStorage.getItem('udc_current_user');
    if (!saved) return null;
    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  },

  getToken(): string | null {
    return localStorage.getItem('udc_auth_token');
  },

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    const payload = parseJwt(token);
    if (!payload || !payload.exp) return false;
    return payload.exp * 1000 > Date.now();
  },
};
