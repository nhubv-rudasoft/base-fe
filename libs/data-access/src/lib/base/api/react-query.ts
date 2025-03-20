import { QueryClient } from '@tanstack/react-query';

export const queryClientConfig = new QueryClient({
  defaultOptions: {
    queries: {
      // 5 minutes
      staleTime: 5 * 60 * 1000,

      // refetch every 5 minutes
      refetchOnWindowFocus: false,

      // refetch on mount
      refetchOnMount: true,

      // retry 0 times
      retry: 0,
    },
    mutations: {
      // retry 0 times
      retry: 0,
    },
  },
});
