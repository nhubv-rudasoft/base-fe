import React, { memo, useMemo, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getJWT } from '@libs/utils';
import { AppLayout } from '@libs/ui/layouts';
import { RouterConfig } from '@libs/ui/router';
interface ProtectedRouteProps {
  children: React.ReactNode;
  privateRoutes?: RouterConfig[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = memo(({ children }) => {
  const isAuthenticated = getJWT();

  if (!isAuthenticated) {
    return <Navigate to='/auth/signin' replace />;
  }

  return children;
});

ProtectedRoute.displayName = 'ProtectedRoute';

interface LazyRouteWrapperProps {
  Component: RouterConfig['element'];
}

const LazyRouteWrapper: React.FC<LazyRouteWrapperProps> = memo(({ Component }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
));

LazyRouteWrapper.displayName = 'LazyRouteWrapper';

interface PrivateRoutesProps {
  privateRoutes: RouterConfig[];
}

export const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ privateRoutes }) => {
  const routes = useMemo(
    () =>
      privateRoutes.map(({ path, element: RouteComponent, isLazy }) => (
        <Route
          key={path}
          path={path}
          element={isLazy ? <LazyRouteWrapper Component={RouteComponent} /> : <RouteComponent />}
        />
      )),
    [privateRoutes]
  );

  return (
    <Routes>
      <Route
        path='/*'
        element={
          <ProtectedRoute privateRoutes={privateRoutes}>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to='dashboard' replace />} />
        {routes}
      </Route>
    </Routes>
  );
};

export default memo(PrivateRoutes);
