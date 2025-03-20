import { Box, ChartBar, Search, Settings, ShoppingBag } from 'lucide-react';
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface MenuItem {
  id: string;
  title: string;
  icon: React.ReactNode | null;
  link?: string | null;
  route?: string | null;
  parent: string | null;
  children: MenuItem[];
}

const menus: MenuItem[] = [
  {
    id: 'main',
    title: 'Main',
    icon: null,
    route: null,
    parent: null,
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        icon: <ChartBar size={20} />,
        link: '/dashboard',
        parent: 'main',
        children: [],
      },
      {
        id: 'expense',
        title: 'Expense groups',
        icon: <ShoppingBag size={24} />,
        link: '/groups',
        parent: 'main',
        children: [],
      },
      {
        id: 'incoming',
        title: 'Incoming',
        icon: <Box size={20} />,
        link: '/incoming',
        parent: 'main',
        children: [],
      },
      {
        id: 'outgoing',
        title: 'Outgoing',
        icon: <Box size={20} />,
        link: '/outgoing',
        parent: 'main',
        children: [],
      },
    ],
  },
  {
    id: 'activity',
    title: 'Activity',
    icon: null,
    route: null,
    parent: null,
    children: [
      {
        id: 'actives',
        title: 'Activities',
        icon: <Box size={16} />,
        link: '/actives',
        parent: 'actives',
        children: [],
      },
      {
        id: 'messages',
        title: 'Messages',
        icon: <Box size={18} />,
        link: '/messages',
        parent: 'activity',
        children: [],
      },
    ],
  },
];

export default function Aside() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  const handleResize = useCallback(() => {
    const mobile = window.innerWidth < 1024;
    setIsMobile(mobile);
    setIsOpen(!mobile);
  }, []);

  const closeSidebar = () => isMobile && setIsOpen(false);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeSidebar();
    }
  };

  const renderMenuItem = (item: MenuItem) => {
    if (item.children.length === 0 && item.link) {
      const isActive = location.pathname === item.link;
      return (
        <li key={item.id}>
          <Link
            to={item.link}
            className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm transition-colors ${
              isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {item.icon && item.icon}
            <span className='text-xs font-light'>{item.title}</span>
          </Link>
        </li>
      );
    }

    return (
      <div key={item.id} className='space-y-1'>
        {item.title && (
          <h2 className='block w-full py-1 text-xs font-light text-gray-600 uppercase'>
            {item.title}
          </h2>
        )}
        <div className='space-y-1'>{item.children.map(renderMenuItem)}</div>
      </div>
    );
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <>
      {/* Overlay */}
      {isOpen && isMobile && (
        <div
          className='fixed inset-0 z-30 bg-gray-800/50 lg:hidden'
          onClick={handleOutsideClick}
          onKeyDown={e => e.key === 'Escape' && closeSidebar()}
          role='button'
          tabIndex={0}
        />
      )}

      {/* Sidebar */}
      <aside
        aria-hidden={!isOpen}
        aria-label='Sidebar'
        className={`fixed top-0 left-0 z-40 h-screen border-r border-gray-200 bg-white ${isMobile ? 'w-[280px]' : 'w-64'} ${isMobile ? 'shadow-xl' : ''} ${isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'} transition-transform duration-300 ease-in-out ${isMobile ? 'fixed' : 'relative lg:sticky lg:top-0'} `}
      >
        <div className='flex h-full flex-col gap-4 overflow-y-auto px-4 py-6'>
          {/* Logo or Brand */}
          <div className='flex items-center px-2'>
            <span className='ml-2 text-sm leading-4 font-extrabold text-black'>{'My App'}</span>
          </div>

          <div className='relative py-2'>
            <input
              type='text'
              placeholder='Search'
              className='h-10 w-full rounded-md border border-gray-400 stroke-gray-200 pr-12 pl-10 text-xs text-black shadow-sm placeholder:text-sm placeholder:font-light placeholder:text-gray-600 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none'
            />
            <Search size={18} className='absolute inset-y-0 top-5 left-3 flex items-center' />
            <span className='absolute inset-y-0 top-4 right-3 flex h-6 items-center rounded-md bg-gray-200 px-1.5 text-xs text-gray-600'>
              ⌘ K
            </span>
          </div>

          {/* Navigation */}
          <nav className='flex-1 space-y-4'>
            <ul className='space-y-2'>{menus.map(renderMenuItem)}</ul>
          </nav>

          {/* Footer */}
          <div className='border-t border-gray-200 pt-4'>
            <button
              type='button'
              onClick={() => {
                closeSidebar();
                window.location.href = '/settings';
              }}
              className='flex w-full cursor-pointer items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
            >
              <Settings size={20} />
              <span className='font-bold text-gray-700'>Settings</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
