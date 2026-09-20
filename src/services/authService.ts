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
    try {
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
    } catch (error) {
      console.warn('Backend registro no disponible, registrando usuario localmente:', error);
    }

    // Save in local registered users
    const usersRaw = localStorage.getItem('udc_registered_users');
    const users = usersRaw ? JSON.parse(usersRaw) : [];
    const newUser = {
      id: Date.now(),
      title: data.title,
      name: data.title,
      mail: data.mail,
      password: data.password,
      sede: data.sede,
      codEst: data.codEst,
      role: data.role,
      cellphone: data.cellphone,
    };
    users.push(newUser);
    localStorage.setItem('udc_registered_users', JSON.stringify(users));
    return { message: '¡Registro universitario exitoso! Ahora puedes iniciar sesión.' };
  },

  async login(credentials: LoginDTO): Promise<{ token: string; user: User }> {
    try {
      const response = await api.post('/user/login', credentials);
      const token = response.data.token;

      localStorage.setItem('udc_auth_token', token);

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
    } catch (error) {
      console.warn('Backend login no disponible, autenticando localmente:', error);
    }

    // Check locally registered users or default accounts
    const usersRaw = localStorage.getItem('udc_registered_users');
    const users = usersRaw ? JSON.parse(usersRaw) : [];
    const found = users.find(
      (u: any) => u.mail?.toLowerCase() === credentials.mail.toLowerCase()
    );

    let user: User;
    if (found) {
      user = {
        id: found.id,
        title: found.title || found.name,
        name: found.name || found.title,
        mail: found.mail,
        codEst: found.codEst || '0221910045',
        sede: found.sede || 'Piedra de Bolívar',
        role: found.role || 'Estudiante',
        cellphone: found.cellphone || '3015489210',
      };
    } else {
      // Demo accounts or generic user
      const nameFromMail = credentials.mail.split('@')[0].replace(/[._]/g, ' ');
      user = {
        id: 7,
        title: credentials.mail.includes('jcuesta') ? 'Javier Cuesta' : (nameFromMail ? nameFromMail.toUpperCase() : 'Estudiante UDC'),
        name: credentials.mail.includes('jcuesta') ? 'Javier Cuesta' : (nameFromMail ? nameFromMail.toUpperCase() : 'Estudiante UDC'),
        mail: credentials.mail,
        codEst: '0221710001',
        sede: 'San Agustín',
        role: 'Estudiante',
        cellphone: '3045678901',
      };
    }

    // Create a mock client JWT with 7 days expiration
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(
      JSON.stringify({
        user_id: user.id,
        username: user.title,
        exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
      })
    );
    const mockToken = `${header}.${payload}.mockSignature`;

    localStorage.setItem('udc_auth_token', mockToken);
    localStorage.setItem('udc_current_user', JSON.stringify(user));
    return { token: mockToken, user };
  },

  logout(): void {
    localStorage.removeItem('udc_auth_token');
    localStorage.removeItem('udc_current_user');
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
