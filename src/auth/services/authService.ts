import { apiPost } from '@/config/axios.ts';
import { BaseResponse } from '@/shared/types/baseResponseType.ts';
import { LoginRequest, LoginResponse } from '../types';
import { AppConstants } from '@/config/constants';
import { API_AUTH_SIGN_IN_URI, API_AUTH_SIGN_UP_URI } from '../constants';

export function getJwtToken() {
  return localStorage.getItem(AppConstants.SYSTEM_SETTINGS.JWT_TOKEN);
}

export function signIn(payload: LoginRequest) {
  return apiPost<LoginRequest, BaseResponse<LoginResponse>>({
    url: API_AUTH_SIGN_IN_URI,
    payload: payload,
  });
}

export function signUp(payload: LoginRequest) {
  return apiPost<LoginRequest, BaseResponse<LoginResponse>>({
    url: API_AUTH_SIGN_UP_URI,
    payload: payload,
  });
}
