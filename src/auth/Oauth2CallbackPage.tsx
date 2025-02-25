import { useEffect } from 'react';

export default function Oauth2CallbackPage() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    console.log(token);
  }, []);
  return <div>Oauth2CallbackPage</div>;
}
