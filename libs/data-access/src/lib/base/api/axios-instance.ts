import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { envConfig } from '@libs/config';
import toast from 'react-hot-toast';

const instance = axios.create({
  baseURL: envConfig.api.apiUrl,
  timeout: Number(envConfig.api.apiTimeout), // 10 minutes
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'Accept-Language': 'en',
  },
});

// Request interceptor
instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor
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
    toast.error(errorMessage);
    return Promise.reject(error);
  }
);

// Export the instance
export { instance as axiosInstance };
