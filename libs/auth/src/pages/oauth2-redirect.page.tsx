import { AppConstantsConfig } from '@libs/config';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth.hook';

const Oauth2RedirectPage = () => {
  const navigate = useNavigate();
  const { setAuthenticated } = useAuth();

  useEffect(() => {
    const accessToken = new URLSearchParams(window.location.search).get('token');
    if (accessToken) {
      setAuthenticated(true);
      localStorage.setItem(AppConstantsConfig.LOCALSTORAGE.JWT_TOKEN, accessToken);
      navigate('/');
    }
  }, [navigate, setAuthenticated]);

  return (
    <div className='flex h-screen items-center justify-center'>
      <h1 className='text-2xl font-bold'>OAuth2 redirect page</h1>
    </div>
  );
};

Oauth2RedirectPage.displayName = 'Oauth2RedirectPage';
export default Oauth2RedirectPage;
