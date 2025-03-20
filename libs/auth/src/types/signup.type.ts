export interface SignUpRequestType {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface SignUpResponseType {
  accessToken: string;
}
