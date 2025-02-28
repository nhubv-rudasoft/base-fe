import { createContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginRequest } from '../types';
import { signIn } from '../services/authService';
import { getJwtToken } from '../services/authService';
import { AppConstants } from '@/config/constants';
import { notify } from '@/shared/components/partials/Notification';

interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  loginUser: (payload: LoginRequest) => void;
  logoutUser: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getJwtToken());
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loginUser = async (payload: LoginRequest) => {
    setIsLoading(true);
    const response = await signIn(payload);
    if (response.responseCode === '200') {
      localStorage.setItem(AppConstants.SYSTEM_SETTINGS.JWT_TOKEN, response.body.accessToken);
      setIsAuthenticated(true);
      navigate(AppConstants.SYSTEM_SETTINGS.AFTER_LOGIN_REDIRECT_PATH);
    } else {
      notify('error', { message: response.responseMessage });
    }
    setIsLoading(false);
  };

  const setAuthenticated = (value: boolean) => {
    setIsAuthenticated(value);
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AppConstants.SYSTEM_SETTINGS.JWT_TOKEN);
  };

  return (
    <AuthContext.Provider
      value={{ setAuthenticated, isAuthenticated, loginUser, logoutUser, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
