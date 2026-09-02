import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginDTO, RegisterDTO } from '@/types';
import { authService } from '@/services/authService';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginDTO) => Promise<boolean>;
  register: (data: RegisterDTO) => Promise<boolean>;
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
      const msg = error.response?.data?.message || error.response?.data?.error || 'Error al iniciar sesión';
      toast.error(msg);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterDTO): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Store registration preferences locally so subsequent login has user profile details
      localStorage.setItem('udc_user_codEst', data.codEst);
      localStorage.setItem('udc_user_sede', data.sede);
      localStorage.setItem('udc_user_role', data.role);
      localStorage.setItem('udc_user_phone', data.cellphone);

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
        register,
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
