import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { baseState } from '@libs/data-access';

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <Provider store={baseState.appStore}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
};

export default AppProvider;
