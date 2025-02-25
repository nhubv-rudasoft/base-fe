import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import Aside from './Aside';
import Header from './Header';
import { useProfile } from '@/features/user/hooks/userHook';

export function MainView() {
  const { query } = useProfile();

  useEffect(() => {
    query.refetch();
  }, []);

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Aside />
      <div className='ml-0 flex flex-1 flex-col pt-4'>
        <Header />

        <main className='relative flex-1 overflow-y-auto px-8 lg:px-48'>
          <div className='mx-auto h-full max-w-screen-2xl space-y-4 py-5'>
            <div className='min-h-[calc(100vh-186px)] rounded-sm bg-transparent'>
              <Outlet />
            </div>
          </div>
        </main>

        <footer className='w-full pb-4 text-center'>
          <p className='text-xs font-light text-gray-500'>
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default MainView;
