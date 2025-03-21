export interface SignInRequestType {
  email: string;
  password: string;
}

export interface SignInResponseType {
  accessToken: string;
  tokenType: string;
}
