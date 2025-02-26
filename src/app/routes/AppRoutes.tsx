import { Routes, Route } from 'react-router-dom';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';

export function AppRoutes() {
  return (
    <Routes>
      <Route path='/*' element={<PrivateRoutes />} />
      <Route path='/auth/*' element={<PublicRoutes />} />
    </Routes>
  );
}
