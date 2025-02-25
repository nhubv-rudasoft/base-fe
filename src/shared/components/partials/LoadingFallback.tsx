import React from 'react';
import { CgSpinner } from 'react-icons/cg';

export const LoadingFallback: React.FC = () => (
  <div className='flex items-center justify-center gap-2 p-10'>
    <div className='animate-spin'>
      <CgSpinner size={32} />
    </div>
    <p className='text-base text-gray-500'>Loading...</p>
  </div>
);
