import React, { memo, useMemo, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { useAuth } from '@/auth/hooks/authHook';
import { MainView } from '@/shared/components/layout/MainView';
import { LoadingFallback } from '@/shared/components/partials/LoadingFallback';
import { ErrorFallback } from '@/shared/components/partials/ErrorFallback';
import { privateRoutes } from './routes';
import { RouterConfig } from '@/shared/types/routerType';
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = memo(({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to='/auth/login' replace />;
  }

  return <>{children}</>;
});

ProtectedRoute.displayName = 'ProtectedRoute';

interface LazyRouteWrapperProps {
  Component: RouterConfig['element'];
}

const LazyRouteWrapper: React.FC<LazyRouteWrapperProps> = memo(({ Component }) => (
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => {
      // Optional: Add any cleanup or reset logic here
      window.location.reload();
    }}
  >
    <Suspense fallback={<LoadingFallback />}>
      <Component />
    </Suspense>
  </ErrorBoundary>
));

LazyRouteWrapper.displayName = 'LazyRouteWrapper';

export const PrivateRoutes: React.FC = () => {
  const routes = useMemo(
    () =>
      privateRoutes.map(({ path, element: RouteComponent, isLazy }) => (
        <Route
          key={path}
          path={path}
          element={isLazy ? <LazyRouteWrapper Component={RouteComponent} /> : <RouteComponent />}
        />
      )),
    [],
  );

  return (
    <Routes>
      <Route
        path='/*'
        element={
          <ProtectedRoute>
            <MainView />
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
