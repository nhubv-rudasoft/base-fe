import { Get, Post } from '@/config/axios';

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

  return Post(`${API_FILE_URI}/upload`, formData, null, headers);
}

/**
 * Get a file from the server
 * @param fileId - The id of the file
 * @returns The file
 */
export function getFile(fileId: number) {
  return Get(`${API_FILE_MANAGEMENT_URI}/get/${fileId}`);
}

/**
 * Stream a file from the server
 * @param fileId - The id of the file
 * @returns The file
 */
export function streamFile(fileId: string) {
  return Get(`${API_FILE_MANAGEMENT_URI}/stream/${fileId}`);
}
