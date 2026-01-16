import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { VitePWA } from 'vite-plugin-pwa'
import { versionPlugin } from './vite-plugins/version-plugin.js'
import { securityHeadersPlugin } from './vite-plugins/security-headers-plugin.js'
import { robotsPlugin } from './vite-plugins/robots-plugin.js'
import { htmlMetaPlugin } from './vite-plugins/html-meta-plugin.js'
import { gtmPlugin } from './vite-plugins/gtm-plugin.js'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    versionPlugin(),
    securityHeadersPlugin(),
    robotsPlugin(),
    htmlMetaPlugin(),
    gtmPlugin(),
    // PWA Service Worker
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Entersys',
        short_name: 'Entersys',
        description: 'Transformamos operaciones empresariales con Worksys y Expersys',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'imago-logo_entersys.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'imago-logo_entersys.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        skipWaiting: true,      // Activa el nuevo SW inmediatamente
        clientsClaim: true,     // Toma control de los clientes existentes
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,svg,webp}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB limit for large images
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 año
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 año
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 días
              }
            }
          },
          {
            urlPattern: /^https:\/\/api\.entersys\.mx\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 5 // 5 minutos
              },
              networkTimeoutSeconds: 10
            }
          }
        ]
      },
      devOptions: {
        enabled: false // Desactivar en desarrollo
      }
    }),
    // Bundle analyzer - solo en análisis
    visualizer({
      filename: './dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    // Force single instance of React to avoid "Invalid hook call" errors
    dedupe: ['react', 'react-dom', 'react-router-dom', 'framer-motion']
  },
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
    // Performance Budgets - Alertas si los chunks exceden límites
    chunkSizeWarningLimit: 500, // 500 KB para chunks individuales
    // Configurar reportCompressedSize para warnings
    reportCompressedSize: true,
    // Optimizar CSS
    cssCodeSplit: true,
    cssMinify: true,
    // Source maps para debugging (desactivar en producción si no se necesita)
    sourcemap: false,
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
        // Manual chunking para mejor caching
        manualChunks: {
          // React core - cambia raramente
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Framer Motion - librería pesada de animaciones
          'vendor-animation': ['framer-motion'],
          // Utilidades y helpers
          'vendor-utils': [
            'react-hot-toast',
            'react-helmet-async',
            'react-icons',
            'react-lazy-load-image-component',
            'react-loading-skeleton'
          ],
          // Analytics y monitoring
          'vendor-analytics': [
            '@sentry/react',
            'web-vitals'
          ]
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