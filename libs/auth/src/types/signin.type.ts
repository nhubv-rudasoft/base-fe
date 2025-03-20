export interface SignInRequestType {
  email: string;
  password: string;
}

export interface SignInResponseType {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}
