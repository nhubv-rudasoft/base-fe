import { apiGet, apiPost } from '@/config/axios';
import { AxiosResponse } from 'axios';
import { FileType } from '../types/fileType';
import { BaseResponse } from '../types/baseResponseType';

const API_FILE_URI = '/files';
const API_FILE_MANAGEMENT_URI = '/file-management';

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

  return apiPost<FormData, BaseResponse<FileType>>({
    url: `${API_FILE_URI}/upload`,
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
    url: `${API_FILE_MANAGEMENT_URI}/get/${fileId}`,
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
    url: `${API_FILE_MANAGEMENT_URI}/stream/${fileId}`,
    responseType: 'arraybuffer',
  });
}
