import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { versionPlugin } from './vite-plugins/version-plugin.js'
import { securityHeadersPlugin } from './vite-plugins/security-headers-plugin.js'
import { robotsPlugin } from './vite-plugins/robots-plugin.js'
import { htmlMetaPlugin } from './vite-plugins/html-meta-plugin.js'
import { gtmPlugin } from './vite-plugins/gtm-plugin.js'

export default defineConfig({
  plugins: [
    react(),
    versionPlugin(),
    securityHeadersPlugin(),
    robotsPlugin(),
    htmlMetaPlugin(),
    gtmPlugin(),
    // Bundle analyzer - solo en análisis
    visualizer({
      filename: './dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    })
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
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2 // Múltiples pasadas para mejor compresión
      },
      mangle: {
        safari10: true // Compatibilidad con Safari 10
      }
    },
    // Mejorar chunk size para mejor caching
    chunkSizeWarningLimit: 600,
    // Optimizar CSS
    cssCodeSplit: true,
    cssMinify: true,
    // Source maps para debugging (desactivar en producción si no se necesita)
    sourcemap: false,
    // Reportar tamaños de chunks comprimidos
    reportCompressedSize: true,
    // Module preload polyfill para mejor compatibilidad
    modulePreload: {
      polyfill: true
    },
    rollupOptions: {
      output: {
        // Cache busting con hash en nombres de archivo
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        // Manual chunks para mejor code splitting
        manualChunks: (id) => {
          // Vendor chunk para librerías de terceros
          if (id.includes('node_modules')) {
            // React y ReactDOM en chunk separado
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            // React Router en chunk separado
            if (id.includes('react-router')) {
              return 'vendor-router';
            }
            // Framer Motion (animaciones) en chunk separado
            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            // Relume UI en chunk separado
            if (id.includes('@relume_io')) {
              return 'vendor-relume';
            }
            // Analytics y tracking
            if (id.includes('sentry') || id.includes('web-vitals')) {
              return 'vendor-analytics';
            }
            // Toast y skeleton
            if (id.includes('react-hot-toast') || id.includes('react-loading-skeleton') || id.includes('react-lazy-load-image')) {
              return 'vendor-ui';
            }
            // Resto de vendors
            return 'vendor-other';
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