import { SignInRequestType } from './signin.type';

export interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  loginUser: (payload: SignInRequestType) => void;
  logoutUser: () => void;
  isLoading: boolean;
}
