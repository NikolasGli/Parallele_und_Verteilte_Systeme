import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// vite.config.js
export default defineConfig({
  plugins: [vue()], 
  server: {
    proxy: {
      '/todos': {
        target: 'http://localhost:8080', 
        changeOrigin: true,
        secure: false,
      }
    }
  }
})