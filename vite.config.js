import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react()],
    server: {
      open:'/login',
      port: env.VITE_PORT ? parseInt(env.VITE_PORT) : 4200
    }});
};
