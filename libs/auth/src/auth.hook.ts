import { useContext } from 'react';
import { baseHook, baseType } from '@libs/data-access';
import { AuthContext } from './contexts/auth-context';
import { ForgotPasswordRequestType, SignUpRequestType } from './types';
import { forgotPassword, signUp } from './auth.service';

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export function useSignup() {
  let signupData: SignUpRequestType;

  const mutation = baseHook.useMutationBase<SignUpRequestType, baseType.ApiResponse<boolean>>(
    async () => {
      if (!signupData) throw new Error('Signup data not provided');
      return await signUp(signupData);
    }
  );

  return {
    mutate: (data: SignUpRequestType) => {
      signupData = data;
      mutation.mutate(data);
    },
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}

export function useForgotPassword() {
  let forgotPasswordData: ForgotPasswordRequestType;

  const mutation = baseHook.useMutationBase<
    ForgotPasswordRequestType,
    baseType.ApiResponse<boolean>
  >(async () => {
    if (!forgotPasswordData) throw new Error('Forgot password data not provided');
    return await forgotPassword(forgotPasswordData);
  });

  return {
    mutate: (data: ForgotPasswordRequestType) => {
      forgotPasswordData = data;
      mutation.mutate(data);
    },
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}
