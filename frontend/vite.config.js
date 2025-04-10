import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    open: true,
    hmr: {
      overlay: true,
    },
  },
  build: {
    minify: 'terser',
    sourcemap: false,
  }
})
