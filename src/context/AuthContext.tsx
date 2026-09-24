import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginDTO, RegisterDTO } from '@/types';
import { authService } from '@/services/authService';
import { userService } from '@/services/userService';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginDTO) => Promise<boolean>;
  loginWithGoogle: (payload: {
    credential?: string;
    idToken?: string;
    code?: string;
    accessToken?: string;
    email?: string;
    name?: string;
  }) => Promise<boolean>;
  register: (data: RegisterDTO) => Promise<boolean>;
  updateUser: (userData: User) => void;
  updateUserProfile: (data: Partial<User> | FormData) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = authService.getToken();
    const savedUser = authService.getCurrentUser();

    if (savedToken && authService.isAuthenticated() && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
    } else {
      authService.logout();
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginDTO): Promise<boolean> => {
    try {
      setIsLoading(true);
      const res = await authService.login(credentials);
      setToken(res.token);
      setUser(res.user);
      toast.success(`¡Bienvenido de vuelta, ${res.user.title || res.user.name || 'Estudiante'}!`);
      return true;
    } catch (error: any) {
      const msg = error.response?.data?.message || error.response?.data?.error || error.message || 'Error al iniciar sesión';
      toast.error(msg);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (payload: {
    credential?: string;
    idToken?: string;
    code?: string;
    accessToken?: string;
    email?: string;
    name?: string;
  }): Promise<boolean> => {
    try {
      setIsLoading(true);
      const res = await authService.loginWithGoogle(payload);
      setToken(res.token);
      setUser(res.user);
      toast.success(`¡Sesión institucional iniciada! Bienvenido, ${res.user.title || res.user.name || 'Estudiante UDC'}`);
      return true;
    } catch (error: any) {
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Error al iniciar sesión con cuenta institucional de Google';
      toast.error(msg);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterDTO): Promise<boolean> => {
    try {
      setIsLoading(true);
      localStorage.setItem('udc_user_sede', data.sede);
      localStorage.setItem('udc_user_role', data.role || 'Estudiante');
      localStorage.setItem('udc_user_phone', data.cellphone);
      if (data.picture) localStorage.setItem('udc_user_picture', data.picture);

      const res = await authService.register(data);
      toast.success(res.message || 'Registro exitoso. Ahora puedes iniciar sesión.');
      return true;
    } catch (error: any) {
      const msg = error.response?.data?.message || error.response?.data?.error || 'Error al registrar el usuario';
      toast.error(msg);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem('udc_current_user', JSON.stringify(userData));
  };

  const updateUserProfile = async (data: Partial<User> | FormData): Promise<boolean> => {
    try {
      setIsLoading(true);
      const updatedUser = await userService.updateProfile(data as any);
      updateUser(updatedUser);
      toast.success('Perfil actualizado correctamente');
      return true;
    } catch (error: any) {
      const msg = error.response?.data?.message || error.response?.data?.error || 'Error al actualizar el perfil';
      toast.error(msg);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
    toast.info('Sesión cerrada correctamente');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        loginWithGoogle,
        register,
        updateUser,
        updateUserProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}
