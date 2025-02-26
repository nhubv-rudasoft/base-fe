export interface UserProfileResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  provider: 'local' | 'google';
  providerId: string;
  photoId: number;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserUpdateProfileRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface UserUpdateAvatarRequest {
  file: File;
}

export interface UserState {
  profile: UserProfileResponse | null;
}
