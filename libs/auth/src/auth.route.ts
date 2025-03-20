import { RouterConfig } from '@libs/ui/router';
import Oauth2RedirectPage from './pages/oauth2-redirect.page';
import SignInPage from './pages/signin.page';
import SignupPage from './pages/signup.page';

const authRoutes: RouterConfig[] = [
  {
    path: 'signin',
    element: SignInPage,
    title: 'Sign In',
    isLazy: false,
  },
  {
    path: 'signup',
    element: SignupPage,
    title: 'Sign Up',
    isLazy: false,
  },
  {
    path: 'oauth2/redirect',
    element: Oauth2RedirectPage,
    title: 'OAuth2 Redirecting...',
    isLazy: false,
  },
];

export default authRoutes;
