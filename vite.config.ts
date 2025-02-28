import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 4200,
    open: true,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8080',
    //     changeOrigin: false,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './src/app'),
      '@config': path.resolve(__dirname, './src/config'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@shared/components': path.resolve(__dirname, './src/shared/components'),
      '@shared/hooks': path.resolve(__dirname, './src/shared/hooks'),
      '@shared/services': path.resolve(__dirname, './src/shared/services'),
      '@shared/slices': path.resolve(__dirname, './src/shared/slices'),
      '@shared/types': path.resolve(__dirname, './src/shared/types'),
      '@features': path.resolve(__dirname, './src/features'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
});
