import { User } from '@/features/user/types/userType.ts';
import { Get } from '@/config/axios.ts';

export function getUserProfile() {
  return Get<User>('/me');
}
