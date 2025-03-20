import { Routes, Route, Navigate } from 'react-router-dom';
import { AppConstantsConfig } from '@libs/config';
import { RouterConfig } from './router.type';

const isAuthenticated = () => !!localStorage.getItem(AppConstantsConfig.LOCALSTORAGE.JWT_TOKEN);

interface PublicRoutesProps {
  publicRoutes: RouterConfig[];
}

export default function PublicRoutes({ publicRoutes }: PublicRoutesProps) {
  return isAuthenticated() ? (
    <Navigate to='/' replace />
  ) : (
    <Routes>
      {publicRoutes.map((route: RouterConfig) => (
        <Route key={route.path} path={route.path} element={<route.element />} />
      ))}
    </Routes>
  );
}
