export interface UserProfileType {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  photoId: number;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
}

export interface UserSettingType {
  locale: 'en' | 'vi';
  timeZone: string;
  dateFormat: string;
  timeFormat: string;
  currency: string;
  numberFormat: string;
  theme: 'light' | 'dark';
}

export interface UserStateType {
  profile: UserProfileType | null;
  setting: UserSettingType | null;
}
