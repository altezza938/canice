import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Use sub-path only for production builds (GitHub Pages).
  // Dev server runs at root so the preview tool can reach it.
  base: command === 'build' ? '/canice/' : '/',
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
}))
