import { Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes, RouterConfig } from './config';

const isAuthenticated = () => !!localStorage.getItem('accessToken');

export function PublicRoutes() {
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
