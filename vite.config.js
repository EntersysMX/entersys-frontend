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
        // Manual chunking para mejor caching y rendimiento
        manualChunks: (id) => {
          // React core libraries
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          // React Router
          if (id.includes('node_modules/react-router-dom') || id.includes('node_modules/react-router')) {
            return 'vendor-router';
          }
          // MUI (Material-UI)
          if (id.includes('node_modules/@mui') || id.includes('node_modules/@emotion')) {
            return 'vendor-mui';
          }
          // Relume UI components
          if (id.includes('node_modules/@relume_io')) {
            return 'vendor-relume';
          }
          // Icon libraries
          if (id.includes('node_modules/react-icons')) {
            return 'vendor-icons';
          }
          // Framer Motion
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-framer';
          }
          // Other large vendor libraries
          if (id.includes('node_modules')) {
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