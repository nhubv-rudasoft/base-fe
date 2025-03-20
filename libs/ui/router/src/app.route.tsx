import { Routes, Route } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes } from '@libs/ui/router';
import { RouterConfig } from './route.type';

interface AppRoutesProps {
  privateRoutes: RouterConfig[];
  publicRoutes: RouterConfig[];
}

export function AppRoutes({ privateRoutes, publicRoutes }: AppRoutesProps) {
  return (
    <Routes>
      <Route path='/*' element={<PrivateRoutes privateRoutes={privateRoutes} />} />
      <Route path='/auth/*' element={<PublicRoutes publicRoutes={publicRoutes} />} />
    </Routes>
  );
}

export default AppRoutes;
