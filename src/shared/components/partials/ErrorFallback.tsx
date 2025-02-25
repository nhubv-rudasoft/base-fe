import React from 'react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => (
  <div className='flex flex-col items-center justify-center p-4' role='alert'>
    <h2>Something went wrong:</h2>
    <pre>{error.message}</pre>
    <button
      onClick={resetErrorBoundary}
      className='mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
    >
      Try again
    </button>
  </div>
);
