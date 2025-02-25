import { lazy } from 'react';
import { RouterConfig } from '@/app/routes/routes';

const userRoutes: RouterConfig[] = [
  {
    path: 'user',
    element: lazy(() => import('./UserPage').then((module) => ({ default: module.default }))),
    title: 'User',
    isLazy: true,
  },
];

export default userRoutes;
