import { Bell, Menu, Settings } from 'lucide-react';
import { useCallback, useState, useEffect } from 'react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    setIsScrolled(scrollPosition > 0);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleToggleSidebar = () => {
    console.log('toggle sidebar');
  };

  const handleLogout = () => {
    console.log('logout');
  };

  return (
    <header
      className={`fixed top-0 right-0 z-30 flex h-16 w-full items-center bg-white backdrop-blur-md lg:ml-64 lg:w-[calc(100%-16rem)] ${isScrolled ? 'shadow-sm' : ''} transition-all duration-300`}
    >
      <div className='flex w-full items-center justify-between px-8'>
        {/* Left section */}
        <div className='flex items-center gap-4'>
          <button
            type='button'
            className='overflow-hidden rounded-lg p-0 text-gray-600 hover:bg-gray-100 lg:hidden'
            onClick={handleToggleSidebar}
          >
            <Menu size={24} className='font-semibold text-gray-600' />
          </button>
          <span className='text-2xl font-bold text-gray-600'>{'Logo'}</span>
        </div>

        {/* Right section */}
        <div className='flex items-center gap-1'>
          {/* Settings */}
          <button
            type='button'
            className='relative cursor-pointer rounded-lg p-2 text-gray-600 hover:bg-gray-100'
          >
            <span className='sr-only'>Settings</span>
            <Settings size={22} />
          </button>

          {/* Notifications */}
          <button
            type='button'
            className='relative cursor-pointer rounded-lg p-2 text-gray-600 hover:bg-gray-100'
          >
            <span className='sr-only'>View notifications</span>
            <Bell size={22} />
            <span className='absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500' />
          </button>

          {/* Profile Dropdown */}
          <span className='flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-sm font-semibold text-white'>
            {'A'}
          </span>
        </div>
      </div>
    </header>
  );
}
export default Header;
