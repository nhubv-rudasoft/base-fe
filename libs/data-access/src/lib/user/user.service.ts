import { envConfig } from '@libs/config';
import { ApiResponse } from '../base/types';
import { apiGet } from '../base/api';
import { UserProfileType } from './user.type';

/**
 * Get user profile
 * @returns UserProfileResponse
 */
export function getUserProfile() {
  return apiGet<null, ApiResponse<UserProfileType>>({
    url: envConfig.api.commonApiUri.user.profile,
  });
}
