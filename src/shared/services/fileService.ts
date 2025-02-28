import { Get, Post } from '@/config/axios';
import axios from 'axios';

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
export async function getFile(fileId: number): Promise<Blob> {
  const response = await axios.get('http://localhost:8080/file-management/get/8', {
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Accept-Language': 'en',
      'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzQwNzI4MjI3LCJleHAiOjE3NDMzMjAyMjd9.-1OosQ476tqD-WUpkPSJ-HfJTrWRtpj-C9Sdg-wLQ0NL8Qt0I1rl6wX-igZp0kwOtp4sxxHenGkuaibPZkGaRg',
    },
    responseType: 'arraybuffer' // Để xử lý dữ liệu ảnh nhị phân
  });

  // Chuyển ArrayBuffer thành Blob để hiển thị ảnh
  return new Blob([response.data], { type: 'image/jpeg' }); // Thay type phù hợp với định dạng ảnh
}

/**
 * Stream a file from the server
 * @param fileId - The id of the file
 * @returns The file
 */
export function streamFile(fileId: string) {
  return Get(`${API_FILE_MANAGEMENT_URI}/stream/${fileId}`);
}
