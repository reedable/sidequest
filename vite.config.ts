import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/sidequest/' : '/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['sql.js'],
  },
}))
