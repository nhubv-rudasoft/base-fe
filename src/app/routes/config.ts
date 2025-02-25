import { JSX, lazy } from 'react';
import LoginPage from '@/auth/LoginPage';
import RegisterPage from '@/auth/RegisterPage';

export interface RouterConfig {
  path: string;
  element: (() => JSX.Element) | React.LazyExoticComponent<() => JSX.Element>;
  title: string;
  isLazy?: boolean;
}

// Private routes
export const privateRoutes: RouterConfig[] = [
  {
    path: 'dashboard',
    element: lazy(() =>
      import('@/features/dashboard/DashboardPage').then((module) => ({
        default: module.default,
      })),
    ),
    title: 'Dashboard',
    isLazy: true,
  },
  {
    path: 'user',
    element: lazy(() =>
      import('@/features/user/UserPage').then((module) => ({
        default: module.default,
      })),
    ),
    title: 'User profile',
    isLazy: true,
  },
] as const;

// Public routes
export const publicRoutes: RouterConfig[] = [
  {
    path: 'login',
    element: LoginPage,
    title: 'Login',
    isLazy: false,
  },
  {
    path: 'register',
    element: RegisterPage,
    title: 'Register',
    isLazy: false,
  },
] as const;
