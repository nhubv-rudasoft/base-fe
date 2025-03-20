import { AxiosError } from 'axios';
import { QueryKey, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';

type QueryConfig<TData, TError> = Omit<
  UseQueryOptions<TData, TError, TData>,
  'queryKey' | 'queryFn'
>;
type MutationConfig<TData, TError, TVariables> = Omit<
  UseMutationOptions<TData, TError, TVariables>,
  'mutationFn'
>;

export const useQueryBase = <TData>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  config?: QueryConfig<TData, AxiosError>
) => {
  return useQuery({
    queryKey,
    queryFn,
    ...config,
  });
};

export const useMutationBase = <TVariables, TData>(
  mutationFn: () => Promise<TData>,
  config?: MutationConfig<TData, AxiosError, TVariables> & {
    invalidateQueries?: QueryKey[];
  }
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (...args) => {
      if (config?.invalidateQueries) {
        config.invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey }).then();
        });
      }
      config?.onSuccess?.(...args);
    },
    ...config,
  });
};
