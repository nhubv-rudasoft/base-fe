import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { queryClient } from '@/config/queryClient';
import { appStore } from '@/app/store/appRootStore';
import { ErrorFallback } from '@/shared/components/partials/ErrorFallback';
import { ToastProvider } from '@/shared/components/partials/Notification/ToastProvider';

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={appStore}>
        <QueryClientProvider client={queryClient}>
          <ToastProvider />
          <BrowserRouter>{children}</BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  );
};
