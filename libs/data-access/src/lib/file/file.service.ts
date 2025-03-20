import { AxiosResponse } from 'axios';
import { envConfig } from '@libs/config';
import { apiGet, apiPost } from '../base/api';
import { ApiResponse } from '../base/types';
import { FilePropsType } from './file.type';

/**
 * Upload a file to the server
 * @param file - The file to upload
 * @returns The uploaded file
 */
export function uploadFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  return apiPost<FormData, ApiResponse<FilePropsType>>({
    url: `${envConfig.file.file}/upload`,
    payload: formData,
    headers: headers,
  });
}

/**
 * Get a file from the server
 * @param fileId - The id of the file
 * @returns The file
 */
export async function getFile(fileId: number): Promise<Blob> {
  const response = await apiGet<null, AxiosResponse>({
    url: `${envConfig.file.fileManagement}/get/${fileId}`,
    responseType: 'arraybuffer',
  });
  return new Blob([response.data], { type: response.headers['content-type'] });
}

/**
 * Stream a file from the server
 * @param fileId - The id of the file
 * @returns The file
 */
export function streamFile(fileId: string) {
  return apiGet<null, AxiosResponse>({
    url: `${envConfig.file.fileManagement}/stream/${fileId}`,
    responseType: 'arraybuffer',
  });
}
