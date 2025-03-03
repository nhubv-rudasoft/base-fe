/* eslint-disable @typescript-eslint/no-explicit-any */
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

interface RequestOptions<P> {
  params?: Record<string, any>;
  payload?: P;
  headers?: RequestHeaders;
  responseType?: AxiosRequestConfig['responseType'];
}

const getRequestHeader = (headers?: RequestHeaders): AxiosHeaders => {
  const accessToken = getJwtToken();

  const requestHeaders: {
    [key: string]: string;
  } = {
    Accept: 'application/json, text/plain, */*',
    'Accept-Language': 'en',
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
    if (response.config.responseType === 'arraybuffer' || response.config.responseType === 'blob') {
      return response;
    }
    return response.data;
  },
  async function (error) {
    const errorMessage =
      error.response?.data?.message || error.message || 'An unexpected error occurred';
    notify('error', { message: errorMessage });
    return Promise.reject(error);
  },
);

export const apiGet = async <P, D>({
  url,
  params,
  headers,
  responseType = 'json',
}: RequestOptions<P> & { url: string }): Promise<D> => {
  const response = await instance.get<D>(url, {
    headers: getRequestHeader(headers),
    params,
    responseType,
  });
  return response as D;
};

export const apiPost = async <P, D>({
  url,
  payload,
  headers,
  responseType = 'json',
}: RequestOptions<P> & { url: string }): Promise<D> => {
  const response = await instance.post<D>(url, payload, {
    headers: getRequestHeader(headers),
    responseType,
  });
  return response as D;
};

export const apiPut = async <P, D>({
  url,
  payload,
  headers,
  responseType = 'json',
}: RequestOptions<P> & { url: string }): Promise<D> => {
  const response = await instance.put<D>(url, payload, {
    headers: getRequestHeader(headers),
    responseType,
  });
  return response as D;
};

export const apiDelete = async <P, D>({
  url,
  headers,
  responseType = 'json',
}: RequestOptions<P> & { url: string }): Promise<D> => {
  const response = await instance.delete<D>(url, {
    headers: getRequestHeader(headers),
    responseType,
  });
  return response as D;
};
