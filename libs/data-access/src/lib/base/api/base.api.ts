import { AxiosHeaders, AxiosRequestConfig } from 'axios';
import { AppConstantsConfig } from '@libs/config';
import { axiosInstance } from './axios-instance';

// Request headers
export type RequestHeaders = Record<string, string>;

// Request options
interface RequestOptions<P> {
  params?: Record<string, any>;
  payload?: P;
  headers?: RequestHeaders;
  responseType?: AxiosRequestConfig['responseType'];
}

/**
 * Get request headers
 * @param headers Request headers
 * @returns Request headers
 */
const getRequestHeader = (headers?: RequestHeaders): AxiosHeaders => {
  const accessToken = localStorage.getItem(AppConstantsConfig.LOCALSTORAGE.JWT_TOKEN);

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

/**
 * Get request
 * @param url API URL
 * @param params Request parameters
 * @param headers Request headers
 * @param responseType Response type
 */
export const apiGet = async <P, D>({
  url,
  params,
  headers,
  responseType = 'json',
}: RequestOptions<P> & { url: string }): Promise<D> => {
  const response = await axiosInstance.get<D>(url, {
    headers: getRequestHeader(headers),
    params,
    responseType,
  });
  return response as D;
};

/**
 * Post request
 * @param url API URL
 * @param payload Request payload
 * @param headers Request headers
 * @param responseType Response type
 */
export const apiPost = async <P, D>({
  url,
  payload,
  headers,
  responseType = 'json',
}: RequestOptions<P> & { url: string }): Promise<D> => {
  const response = await axiosInstance.post<D>(url, payload, {
    headers: getRequestHeader(headers),
    responseType,
  });
  return response as D;
};

/**
 * Put request
 * @param url API URL
 * @param payload Request payload
 * @param headers Request headers
 * @param responseType Response type
 */
export const apiPut = async <P, D>({
  url,
  payload,
  headers,
  responseType = 'json',
}: RequestOptions<P> & { url: string }): Promise<D> => {
  const response = await axiosInstance.put<D>(url, payload, {
    headers: getRequestHeader(headers),
    responseType,
  });
  return response as D;
};

/**
 * Delete request
 * @param url API URL
 * @param headers Request headers
 * @param responseType Response type
 */
export const apiDelete = async <P, D>({
  url,
  headers,
  responseType = 'json',
}: RequestOptions<P> & { url: string }): Promise<D> => {
  const response = await axiosInstance.delete<D>(url, {
    headers: getRequestHeader(headers),
    responseType,
  });
  return response as D;
};
