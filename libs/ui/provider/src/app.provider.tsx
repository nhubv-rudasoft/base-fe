import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { baseState } from '@libs/data-access';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@libs/config';
interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={baseState.appStore}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    </QueryClientProvider>
  );
};

export default AppProvider;
