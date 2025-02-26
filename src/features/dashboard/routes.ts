import { RouterConfig } from '@/shared/types/routerType';
import { lazy } from 'react';

const dashboardRoutes: RouterConfig[] = [
  {
    path: 'dashboard',
    element: lazy(() =>
      import('@/features/dashboard/pages/DashboardPage.tsx').then((module) => ({
        default: module.default,
      })),
    ),
    title: 'Dashboard',
    isLazy: true,
  },
];

export default dashboardRoutes;
