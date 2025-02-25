export interface BaseResponse<T> {
  message: string;
  status: number;
  body: T;
}
