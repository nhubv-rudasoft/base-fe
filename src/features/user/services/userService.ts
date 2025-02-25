import { User } from '@/features/user/types/userType.ts';
import { Get } from '@/config/axios.ts';
import { BaseResponse } from '@/shared/types/baseResponseType';

export function getUserProfile() {
  return Get<BaseResponse<User>>('/user/me');
}
