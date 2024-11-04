import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react()],
    server: {
      port: env.VITE_PORT ? parseInt(env.VITE_PORT) : 4200
    },
    css: {
      postcss: {
        plugins: [
          require('autoprefixer'), // Example: add Autoprefixer
          // Add other PostCSS plugins if needed
        ],
      },
    },
  });
};
