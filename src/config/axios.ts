import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import { API_URL } from './env.ts';
import { getJwtToken } from '@/auth/services/authService';
import { notify } from '@/shared/components/partials/Notification';

export type RequestHeaders = Record<string, string>;

const GetRequestHeader = (headers?: RequestHeaders): AxiosHeaders => {
  const accessToken = getJwtToken();

  const requestHeaders: {
    [key: string]: string;
  } = {
    'Accept-Language': `en`,
    ...(headers ?? {}),
  };

  if (accessToken) {
    requestHeaders['Authorization'] = `Bearer ${accessToken}`;
  }
  return <AxiosHeaders>requestHeaders;
};

export const instance = axios.create({
  baseURL: API_URL,
  timeout: 10 * 60 * 1000, // 10 minutes
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'Accept-Language': 'en',
  },
});

instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  async function (error) {
    // Extract the error message
    const errorMessage =
      error.response?.data?.message || error.message || 'An unexpected error occurred';
    notify('error', { message: errorMessage });
    return Promise.reject(error);
  },
);

// *************************** BEGIN:Base HTTP methods ***************************
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Get = async <T>(url: string, params?: any, headers?: RequestHeaders): Promise<T> => {
  const request: AxiosRequestConfig = {
    url,
    method: 'GET',
    params,
    headers: GetRequestHeader(headers),
  };
  return (await instance(request)) as T;
};

export const Post = async <T>(
  url: string,
  data?: any,
  params?: any,
  headers?: RequestHeaders,
): Promise<T> => {
  const request: AxiosRequestConfig = {
    url,
    method: 'POST',
    data,
    params,
    headers: GetRequestHeader(headers),
  };
  return (await instance(request)) as T;
};

export const Put = async <T>(
  url: string,
  data?: any,
  params?: any,
  headers?: RequestHeaders,
): Promise<T> => {
  const request: AxiosRequestConfig = {
    url,
    method: 'PUT',
    data,
    params,
    headers: GetRequestHeader(headers),
  };
  return (await instance(request)) as T;
};

export const Delete = async <T>(
  url: string,
  data?: any,
  params?: any,
  headers?: RequestHeaders,
): Promise<T> => {
  const request: AxiosRequestConfig = {
    url,
    method: 'DELETE',
    data,
    params,
    headers: GetRequestHeader(headers),
  };
  return (await instance(request)) as T;
};
// *************************** END:Base HTTP methods ***************************
