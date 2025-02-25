export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserState {
  profile: User | null;
}
