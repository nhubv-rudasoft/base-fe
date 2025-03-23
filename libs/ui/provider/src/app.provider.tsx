import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { baseApi, baseState } from '@libs/data-access';
import { QueryClientProvider } from '@tanstack/react-query';
import ToastNotifyProvider from './toast-notify.provider';

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={baseApi.queryClientConfig}>
      <Provider store={baseState.appStore}>
        <ToastNotifyProvider />
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    </QueryClientProvider>
  );
};

export default AppProvider;
