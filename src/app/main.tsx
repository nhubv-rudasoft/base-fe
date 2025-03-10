import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/styles/index.css';
import App from '@/app/App';
import { AppProviders } from '@/app/Providers';
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
);
