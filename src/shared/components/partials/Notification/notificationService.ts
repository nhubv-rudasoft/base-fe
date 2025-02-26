import toast, { ToastOptions } from 'react-hot-toast';
import { customToast } from './CustomToast';

// Define types
type ToastType = 'success' | 'error' | 'info' | 'warning' | 'loading';

interface ToastConfig {
  message: string;
  options?: ToastOptions;
}

// Default configuration
const defaultOptions: ToastOptions = {
  duration: 4000,
  position: 'top-right',
};

/**
 * Reusable toast notification function with custom render
 * @param type - The type of toast notification
 * @param config - Toast configuration with message and optional options
 * @returns toast id for potential dismissal
 */
export const notify = (type: ToastType, config: ToastConfig) => {
  const { message, options = {} } = config;

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  try {
    return toast((t) => customToast(t, message, type), mergedOptions);
  } catch (error) {
    console.error('Toast notification failed:', error);
    return null;
  }
};

// Utility to dismiss a specific toast
export const dismissToast = (toastId: string | null) => {
  if (toastId) {
    toast.dismiss(toastId);
  }
};

// Utility to dismiss all toasts
export const dismissAllToasts = () => {
  toast.dismiss();
};
