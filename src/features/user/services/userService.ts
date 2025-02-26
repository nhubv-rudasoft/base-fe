import {
  UserProfileResponse,
  UserUpdateProfileRequest,
  UserUpdateAvatarRequest,
} from '@/features/user/types/userType.ts';
import { Get, Put } from '@/config/axios.ts';
import { BaseResponse } from '@/shared/types/baseResponseType';
import {
  API_USER_GET_PROFILE_URI,
  API_USER_UPDATE_PROFILE_URI,
  API_USER_UPDATE_AVATAR_URI,
} from '../constants';

/**
 * Get user profile
 * @returns UserProfileResponse
 */
export function getUserProfile() {
  return Get<BaseResponse<UserProfileResponse>>(API_USER_GET_PROFILE_URI);
}

/**
 * Update user profile
 * @param payload - UserUpdateProfileRequest
 * @returns UserProfileResponse
 */
export function updateUserProfile(payload: UserUpdateProfileRequest) {
  return Put<BaseResponse<UserProfileResponse>>(API_USER_UPDATE_PROFILE_URI, payload);
}

/**
 * Update user avatar
 * @param payload - UserUpdateAvatarRequest
 * @returns UserProfileResponse
 */
export function updateUserAvatar(payload: UserUpdateAvatarRequest) {
  const formData = new FormData();
  formData.append('file', payload.file);
  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  return Put<BaseResponse<UserProfileResponse>>(
    API_USER_UPDATE_AVATAR_URI,
    formData,
    null,
    headers,
  );
}
