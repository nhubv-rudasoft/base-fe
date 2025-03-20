interface EntityMessages {
  id: string;
  message: string;
}

export interface ApiResponse<T> {
  responseCode: '200' | '400' | '401' | '403' | '404' | '500';
  responseMessage: string;
  responseEntityMessages: EntityMessages[];
  body: T;
}
