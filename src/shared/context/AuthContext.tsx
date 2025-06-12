import { createContext, ReactNode, useContext, useState } from 'react';
import { AuthResponse, LoginDto, UserDto } from '../../features/auth/api/types';
import { authApi } from '../lib/auth';

export const AuthContext = createContext<{
  user: AuthResponse['user'] | null;
  login: (data: LoginDto) => Promise<void>;
  register: (data: UserDto) => Promise<void>;
  logout: () => void;
} | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthResponse['user'] | null>(null);

  const handleAuth = (data: AuthResponse) => {
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

const login = async (dto: LoginDto) => {
  try {
   const  data  = await authApi.login(dto);

    localStorage.setItem('token', data.token);
    if (data.refreshToken) {
      localStorage.setItem('refreshToken', data.refreshToken);
    }
    setUser(data.user);
     console.log('User set in context:', data.user);

  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

  const register = async (dto: UserDto) => {
    const  data  = await authApi.register(dto);
    handleAuth(data);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};