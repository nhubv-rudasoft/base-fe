import { Toaster } from 'react-hot-toast';

export const ToastNotifyProvider = () => {
  return (
    <Toaster
      containerClassName='mt-4 mr-4'
      toastOptions={{
        style: {
          background: 'transparent',
          padding: 0,
          boxShadow: 'none',
        },
      }}
    />
  );
};

export default ToastNotifyProvider;
