import { useEffect } from 'react';
import { AppConstants } from '@/config/constants.ts';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/hooks/authHook.ts';

export default function Oauth2RedirectPage() {
  const navigate = useNavigate();
  const { setAuthenticated } = useAuth();

  useEffect(() => {
    const accessToken = new URLSearchParams(window.location.search).get('token');
    if (accessToken) {
      setAuthenticated(true);
      localStorage.setItem(AppConstants.SYSTEM_SETTINGS.JWT_TOKEN, accessToken);
      navigate(AppConstants.SYSTEM_SETTINGS.AFTER_LOGIN_REDIRECT_PATH);
    }
  }, [navigate, setAuthenticated]);

  return (
    <div className='flex h-screen items-center justify-center'>
      <h1 className='text-2xl font-bold'>OAuth2 redirect page</h1>
    </div>
  );
}
