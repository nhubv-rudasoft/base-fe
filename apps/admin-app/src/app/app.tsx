import { AuthProvider } from '@libs/ui/provider';
import { AppRoutes } from '@libs/ui/router';
import { privateRoutes, publicRoutes } from './app.routes';

export function App() {
  return (
    <AuthProvider>
      <AppRoutes privateRoutes={privateRoutes} publicRoutes={publicRoutes} />
    </AuthProvider>
  );
}

export default App;
