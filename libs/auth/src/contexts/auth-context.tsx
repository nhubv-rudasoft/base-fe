import { createContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { getJWT } from '@libs/utils';
import { AppConstantsConfig } from '@libs/config';
import { SignInRequestType } from '../types';
import { signIn } from '../auth.service';

interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  loginUser: (payload: SignInRequestType) => void;
  logoutUser: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getJWT());
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loginUser = async (payload: SignInRequestType) => {
    setIsLoading(true);
    const response = await signIn(payload);
    console.log({ response });
    if (response.responseCode === '200') {
      localStorage.setItem(AppConstantsConfig.LOCALSTORAGE.JWT_TOKEN, response.body.accessToken);
      setIsAuthenticated(true);
      navigate('/');
    } else {
      console.log({ message: response.responseMessage });
    }
    setIsLoading(false);
  };

  const setAuthenticated = (value: boolean) => {
    setIsAuthenticated(value);
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AppConstantsConfig.LOCALSTORAGE.JWT_TOKEN);
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
