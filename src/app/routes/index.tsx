import { Routes, Route } from 'react-router-dom';
import { PublicRoutes } from './public';
import { PrivateRoutes } from './private';

export function AppRoutes() {
  return (
    <Routes>
      <Route path='/*' element={<PrivateRoutes />} />
      <Route path='/auth/*' element={<PublicRoutes />} />
    </Routes>
  );
}
