import { useMutationBase } from '../base/hooks/query.hook';
import { useQueryBase } from '../base/hooks/query.hook';
import { getFile } from './file.service';
import { FilePropsType } from './file.type';

export const useQueryGetFile = (fileId: number) => {
  const query = useQueryBase(['getFile', fileId], async () => {
    return await getFile(fileId);
  });

  return {
    query,
    file: query.data,
    isLoading: query.isPending,
    isError: query.isError,
    error: query.error,
  };
};

export const useMutateGetFile = (fileId: number) => {
  const mutation = useMutationBase<FilePropsType, Blob>(async () => {
    return await getFile(fileId);
  });

  return {
    mutation,
    file: mutation.data,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
