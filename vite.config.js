import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { versionPlugin } from './vite-plugins/version-plugin.js'
import { securityHeadersPlugin } from './vite-plugins/security-headers-plugin.js'
import { robotsPlugin } from './vite-plugins/robots-plugin.js'
import { htmlMetaPlugin } from './vite-plugins/html-meta-plugin.js'

export default defineConfig({
  plugins: [
    react(),
    versionPlugin(),
    securityHeadersPlugin(),
    robotsPlugin(),
    htmlMetaPlugin()
  ],
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: 'dist',
    // Optimizaciones de performance
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remover console.logs en producción
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      }
    },
    // Mejorar chunk size para mejor caching
    chunkSizeWarningLimit: 1000,
    // Optimizar CSS
    cssCodeSplit: true,
    // Source maps para debugging (desactivar en producción si no se necesita)
    sourcemap: false,
    rollupOptions: {
      output: {
        // Cache busting con hash en nombres de archivo
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        // Code splitting optimizado - Simplificado para evitar conflictos de React
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // Agrupar React y todas las librerías que dependen de React
            if (id.includes('react') ||
                id.includes('react-dom') ||
                id.includes('react-router') ||
                id.includes('@mui') ||
                id.includes('@emotion') ||
                id.includes('react-helmet')) {
              return 'react-vendor';
            }
            // Relume UI en chunk separado (grande)
            if (id.includes('@relume_io')) {
              return 'relume-ui';
            }
            // Framer Motion en chunk separado (grande)
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            // Resto de vendors
            return 'vendor';
          }
          // Agrupar componentes por página
          if (id.includes('/pages/')) {
            const match = id.match(/pages\/([^/]+)/);
            if (match) {
              return `page-${match[1]}`;
            }
          }
        }
      }
    }
  },
  // Optimizaciones adicionales
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: []
  },
  define: {
    // Inyectar versión como variable global
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || new Date().getTime().toString()),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString())
  }
})