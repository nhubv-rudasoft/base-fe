import { createContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginRequest } from '../types';
import { signIn } from '../services/authService';
import { getJwtToken } from '../services/authService';
import { AppConstants } from '@/config/constants';

interface AuthContextType {
  isAuthenticated: boolean;
  loginUser: (payload: LoginRequest) => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getJwtToken());
  const navigate = useNavigate();

  const loginUser = async (payload: LoginRequest) => {
    const response = await signIn(payload);
    localStorage.setItem(AppConstants.SYSTEM_SETTINGS.JWT_TOKEN, response.body.accessToken);
    setIsAuthenticated(true);
    navigate(AppConstants.SYSTEM_SETTINGS.AFTER_LOGIN_REDIRECT_PATH);
  };

  const logoutUser = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
