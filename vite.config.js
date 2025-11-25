import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true, // Permite acesso de outros dispositivos na rede
    strictPort: false,
    open: true // Abre o navegador automaticamente
  },
  build: {
    sourcemap: true
  },
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname
    }
  }
})
