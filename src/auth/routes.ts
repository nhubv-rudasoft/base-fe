import { RouterConfig } from '@/shared/types/routerType';
import LoginPage from '@/auth/pages/LoginPage.tsx';
import RegisterPage from '@/auth/pages/RegisterPage.tsx';
import Oauth2RedirectPage from '@/auth/pages/Oauth2RedirectPage.tsx';

const authRoutes: RouterConfig[] = [
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
  {
    path: 'oauth2/redirect',
    element: Oauth2RedirectPage,
    title: 'OAuth2 Redirect',
    isLazy: false,
  },
];

export default authRoutes;
