import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 5 minutes
      staleTime: 5 * 60 * 1000,

      // refetch every 5 minutes
      refetchOnWindowFocus: false,

      // refetch on mount
      refetchOnMount: true,

      // retry 2 times
      retry: 2,
    },
    mutations: {
      // retry 0 times
      retry: 0,
    },
  },
});
