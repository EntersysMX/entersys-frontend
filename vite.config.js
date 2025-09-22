import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { versionPlugin } from './vite-plugins/version-plugin.js'

export default defineConfig({
  plugins: [react(), versionPlugin()],
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        // Cache busting con hash en nombres de archivo - usar solo placeholders válidos
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        // Función personalizada para generar nombres únicos
        manualChunks: {
          vendor: ['react', 'react-dom'],
          version: ['./src/utils/version.js', './src/utils/versionCheck.js']
        }
      }
    }
  },
  define: {
    // Inyectar versión como variable global
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || new Date().getTime().toString()),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString())
  }
})