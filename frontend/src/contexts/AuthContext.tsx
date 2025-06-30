import React, {
  createContext,
  useState,
  useEffect,
  useContext,
} from 'react';
import type {ReactNode} from 'react';
import axios from 'axios';

// User type
interface User {
  id: string;
  username: string;
  email: string;
}

// Context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
}

// Default context (will be overwritten by Provider)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider props
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get<{ user: User }>(
          'http://localhost:5000/api/auth/me',
          {
            withCredentials: true,
          }
        );
        setUser(res.data.user);
        // console.log('User authenticated:', res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await axios.post<{ user: User }>(
        'http://localhost:5000/api/auth/login',
        { email, password },
        { withCredentials: true }
      );
      setUser(res.data.user);
      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        message: err?.response?.data?.message || 'Login failed',
      };
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await axios.post<{ user: User }>(
        'http://localhost:5000/api/auth/register',
        { username, email, password },
        { withCredentials: true }
      );
      setUser(res.data.user);
      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        message: err?.response?.data?.message || 'Registration failed',
      };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout',{}, {
        withCredentials: true,
      });
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated: !!user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier usage
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};