import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: 'https://provinces.open-api.vn',
          changeOrigin: true, // Ensures the host header of the request matches the target
          rewrite: (path) => path.replace(/^\/api/, ''), // Removes `/api` prefix before forwarding
        },
      },
      port: env.VITE_PORT ? parseInt(env.VITE_PORT) : 4200,
    },
  });
};
