import { useSettings } from '@/features/settings/hooks/settingsHook';
import { useCallback, useState, useEffect } from 'react';
import { HiMiniBars3BottomLeft } from 'react-icons/hi2';
import { PiBellSimple, PiGearSix } from 'react-icons/pi';
import logo from '/vite.svg';
import { appName } from '@/config/env';
import { DropdownDivider, DropdownItem, DropdownMenu } from '../common/DropdownMenu';
import { useNavigate } from 'react-router-dom';
import { AppConstants } from '@/config/constants';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [settings, setSettings] = useSettings();
  const navigate = useNavigate();

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    setIsScrolled(scrollPosition > 0);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleToggleSidebar = () => {
    setSettings({
      ...settings,
      isOpenSidebar: !settings.isOpenSidebar,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem(AppConstants.SYSTEM_SETTINGS.JWT_TOKEN);
    navigate('/auth/login');
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
            <HiMiniBars3BottomLeft size={28} className='font-semibold text-gray-600' />
          </button>
          <img src={logo} alt={appName} className='h-8 w-auto lg:hidden' />
        </div>

        {/* Right section */}
        <div className='flex items-center gap-1'>
          {/* Settings */}
          <button
            type='button'
            className='relative cursor-pointer rounded-lg p-2 text-gray-600 hover:bg-gray-100'
          >
            <span className='sr-only'>Settings</span>
            <PiGearSix size={26} />
          </button>

          {/* Notifications */}
          <button
            type='button'
            className='relative cursor-pointer rounded-lg p-2 text-gray-600 hover:bg-gray-100'
          >
            <span className='sr-only'>View notifications</span>
            <PiBellSimple size={26} />
            <span className='absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500' />
          </button>

          {/* Profile Dropdown */}
          <DropdownMenu
            trigger={
              <button
                type='button'
                aria-label='Profile'
                aria-expanded='false'
                aria-haspopup='true'
                className='flex cursor-pointer items-center gap-2 rounded-lg p-2 text-gray-600 hover:bg-gray-100'
              >
                <span className='flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-sm font-semibold text-white'>
                  J
                </span>
              </button>
            }
            align='right'
            width={180}
            offset={12}
          >
            <DropdownItem onClick={() => navigate('/user')}>Profile</DropdownItem>
            <DropdownItem onClick={() => navigate('/settings')}>Settings</DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={handleLogout} className='text-red-600 hover:bg-red-50'>
              Logout
            </DropdownItem>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
