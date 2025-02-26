import { getFile } from '@/shared/services';
import { useMutationBase, useQueryBase } from './queryBaseHook';

export const useQueryGetFile = (fileId: number) => {
  const query = useQueryBase(['getFile', fileId], async () => {
    const data = await getFile(fileId);
    return data;
  });

  return {
    query,
    file: query.data,
    isLoading: query.isPending,
    isError: query.isError,
    error: query.error,
  };
};

export const useMutateGetFile = () => {
  const mutation = useMutationBase<any, { fileId: number }>(async ({ fileId }) => {
    const data: any = await getFile(fileId);
    const blob = new Blob([data], { type: data.contentType });
    const objectURL = URL.createObjectURL(blob);
    console.log(objectURL);
    return objectURL;
  });

  return {
    mutation,
    file: mutation.data,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
