import userRoutes from '@/features/user/routes';
import dashboardRoutes from '@/features/dashboard/routes';
import authRoutes from '@/auth/routes.ts';
import { RouterConfig } from '@/shared/types/routerType';

// Private routes
export const privateRoutes: RouterConfig[] = [...dashboardRoutes, ...userRoutes] as const;

// Public routes
export const publicRoutes: RouterConfig[] = [...authRoutes] as const;
