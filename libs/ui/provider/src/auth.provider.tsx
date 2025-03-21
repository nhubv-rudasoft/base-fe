import { ReactNode, useState } from 'react';
import { getJWT } from '@libs/utils';
import { useNavigate } from 'react-router-dom';
import { AuthContext, signIn } from '@libs/auth';
import { AppConstantsConfig } from '@libs/config';
import { SignInRequestType } from '@libs/auth';
import toast from 'react-hot-toast';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getJWT());
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loginUser = async (payload: SignInRequestType) => {
    setIsLoading(true);
    const response = await signIn(payload);
    if (response.responseCode === '200') {
      localStorage.setItem(AppConstantsConfig.LOCALSTORAGE.JWT_TOKEN, response.body.accessToken);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } else {
      toast.error(response.responseMessage);
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

export default AuthProvider;
