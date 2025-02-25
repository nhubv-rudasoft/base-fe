import { JSX, lazy } from 'react';
import LoginPage from '@/auth/LoginPage';
import RegisterPage from '@/auth/RegisterPage';
import userRoutes from '@/features/user/routes';
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
  ...userRoutes,
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
