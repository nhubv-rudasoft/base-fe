import { Post } from '@/config/axios.ts';
import { BaseResponse } from '@/shared/types/baseResponseType.ts';
import { LoginRequest, LoginResponse } from '../types';
import { AppConstants } from '@/config/constants';
import { AUTH_API_URI_SIGN_IN } from '../contants/authConstants';

export function getJwtToken() {
  return localStorage.getItem(AppConstants.SYSTEM_SETTINGS.JWT_TOKEN);
}

export function signIn(payload: LoginRequest) {
  return Post<BaseResponse<LoginResponse>>(AUTH_API_URI_SIGN_IN, payload);
}
