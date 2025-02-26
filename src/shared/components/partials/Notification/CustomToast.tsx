import toast, { Toast } from 'react-hot-toast';

type ToastType = 'success' | 'error' | 'info' | 'warning' | 'loading';

export const customToast = (t: Toast, message: string, type: ToastType) => {
  const typeStyles = {
    success: 'bg-green-500 border-green-600',
    error: 'bg-red-500 border-red-600',
    info: 'bg-blue-500 border-blue-600',
    warning: 'bg-yellow-500 border-yellow-600',
    loading: 'bg-gray-500 border-gray-600',
  };

  const progressStyles = {
    success: 'bg-green-300',
    error: 'bg-red-300',
    info: 'bg-blue-300',
    warning: 'bg-yellow-300',
    loading: 'bg-gray-300',
  };

  return (
    <div
      className={`${
        t.visible ? 'animate-slide-in' : 'animate-slide-out'
      } w-full max-w-md rounded-lg border-t-4 bg-white shadow-lg ${
        typeStyles[type]
      } pointer-events-auto`}
    >
      <div className='p-4'>
        <div className='flex items-start'>
          <div className='flex-1'>
            <p className='text-sm font-medium text-gray-900'>{message}</p>
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className='ml-3 flex-shrink-0 text-gray-400 hover:text-gray-600'
          >
            <span className='sr-only'>Close</span>
            <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
      </div>
      {t.duration && t.duration !== Infinity && (
        <div
          className={`h-1 ${progressStyles[type]} transition-all duration-1000 ease-linear`}
          style={{
            width: `${((t.duration - (t.pauseDuration || 0)) / t.duration) * 100}%`,
          }}
        />
      )}
    </div>
  );
};
