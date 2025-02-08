import { defineConfig } from 'vite';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://thekanbanboard.onrender.com'
    : 'http://localhost:3001';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/auth': {
        target: API_URL,
        changeOrigin: true,
        secure: API_URL.startsWith('https'),
      },
      '/api': {
        target: API_URL,
        changeOrigin: true,
        secure: API_URL.startsWith('https'),
      },
    },
  },
});
