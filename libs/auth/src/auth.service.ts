import { baseApi, baseType } from '@libs/data-access';
import { envConfig } from '@libs/config';
import { SignInRequestType, SignInResponseType, SignUpResponseType } from './types';

/**
 * @description sign in
 * @param payload SignInRequestType
 * @returns SignInResponseType response
 */
export function signIn(payload: SignInRequestType) {
  return baseApi.apiPost<SignInRequestType, baseType.ApiResponse<SignInResponseType>>({
    url: envConfig.api.commonApiUri.auth.signin,
    payload: payload,
  });
}

/**
 * @description sign up
 * @param payload SignInRequestType
 * @returns SignUpResponseType response
 */
export function signUp(payload: SignInRequestType) {
  return baseApi.apiPost<SignInRequestType, baseType.ApiResponse<SignUpResponseType>>({
    url: envConfig.api.commonApiUri.auth.signup,
    payload: payload,
  });
}

/**
 * @description forgot password
 * @param email string
 * @returns boolean response
 */
export function forgotPassword(email: string) {
  return baseApi.apiPost<{ email: string }, baseType.ApiResponse<boolean>>({
    url: envConfig.api.commonApiUri.auth.forgotPassword,
    payload: { email },
  });
}

/**
 * @description reset password
 * @param email string
 * @returns boolean response
 */
export function resetPassword(email: string) {
  return baseApi.apiPost<{ email: string }, baseType.ApiResponse<boolean>>({
    url: envConfig.api.commonApiUri.auth.resetPassword,
    payload: { email },
  });
}
