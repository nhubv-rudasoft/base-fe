import { baseApi, baseType } from '@libs/data-access';
import { envConfig } from '@libs/config';
import { SignInRequestType, SignInResponseType } from './types';
import { ForgotPasswordRequestType } from './types/forgot-password.type';
import { ResetPasswordRequestType } from './types/reset-password.type';

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
export async function signUp(payload: SignInRequestType) {
  return await baseApi.apiPost<SignInRequestType, baseType.ApiResponse<boolean>>({
    url: envConfig.api.commonApiUri.auth.signup,
    payload: payload,
  });
}

/**
 * @description forgot password
 * @param payload ForgotPasswordRequestType
 * @returns boolean response
 */
export function forgotPassword(payload: ForgotPasswordRequestType) {
  return baseApi.apiPost<ForgotPasswordRequestType, baseType.ApiResponse<boolean>>({
    url: envConfig.api.commonApiUri.auth.forgotPassword,
    payload: payload,
  });
}

/**
 * @description reset password
 * @param payload ResetPasswordRequestType
 * @returns boolean response
 */
export function resetPassword(payload: ResetPasswordRequestType) {
  return baseApi.apiPost<ResetPasswordRequestType, baseType.ApiResponse<boolean>>({
    url: envConfig.api.commonApiUri.auth.resetPassword,
    payload: payload,
  });
}

/**
 * @description verify reset password token
 * @param token string
 * @returns boolean response
 */
export function verifyResetPasswordToken(token: string) {
  return baseApi.apiPost<string, baseType.ApiResponse<boolean>>({
    url: envConfig.api.commonApiUri.auth.verifyResetPasswordToken,
    payload: token,
  });
}
