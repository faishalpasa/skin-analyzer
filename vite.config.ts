import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    svgr({
      include: ['src/**/*.svg'],
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    open: true,
    host: true,
    port: 5173,
    fs: {
      strict: true,
      allow: ['..'],
    },
  },
  build: {
    outDir: 'dist',
  },
  assetsInclude: ['**/*.svg'],
})
