// Private routes
import { RouterConfig } from '@libs/ui/router';
import { authRoutes } from '@libs/auth';
import BasicExample from './example';

export const privateRoutes: RouterConfig[] = [
  ...authRoutes,
  {
    path: 'example',
    element: BasicExample,
    title: 'Example',
  },
] as const;

// Public routes
export const publicRoutes: RouterConfig[] = [...authRoutes] as const;
