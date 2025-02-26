import { AuthProvider } from '@/auth/context/AuthContext';
import { AppRoutes } from './routes/AppRoutes';
import '@/styles/globals.css';

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
