import UserPage from '@/features/user/pages/UserPage.tsx';
import { RouterConfig } from '@/shared/types/routerType';

const userRoutes: RouterConfig[] = [
  {
    path: 'profile',
    element: UserPage,
    title: 'Profile',
    isLazy: false,
  },
];

export default userRoutes;
