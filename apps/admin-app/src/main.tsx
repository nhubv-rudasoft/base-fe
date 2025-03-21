import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { AppProvider, ToastNotify } from '@libs/ui/provider';
import App from './app/app';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <ToastNotify />
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
);
