import React, { useEffect, Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import PageTransition from './components/PageTransition'
import ErrorBoundary from './components/ui/ErrorBoundary'
import WhatsAppFloatButton from './components/WhatsAppFloatButton'
import ScrollToTop from './components/ScrollToTop'
import SkipLink from './components/ui/SkipLink'
import SimpleLoader from './components/ui/SimpleLoader'
import { analyticsService } from './services/analytics'
import { sentryService } from './services/sentry'
import { initWebVitals } from './utils/webVitals'
import { startPerformanceMonitoring } from './utils/performanceMonitor'
import { initJourneyTracking } from './utils/advancedAnalytics'
import { initSecurity } from './utils/security'
import './utils/testAnalytics' // Auto-expose test suite in development

// Lazy loading de páginas para mejor performance
// Home se carga inmediatamente por ser la página principal
import Home from './pages/Home'

// Páginas secundarias con lazy loading
const Blog = lazy(() => import('./pages/Blog'))
const BlogEntrada = lazy(() => import('./pages/BlogEntrada'))
const Clientes = lazy(() => import('./pages/Clientes'))
const Contacto = lazy(() => import('./pages/Contacto'))
const Nosotros = lazy(() => import('./pages/Nosotros'))
const Awalab = lazy(() => import('./pages/Awalab'))
const Expersys = lazy(() => import('./pages/Expersys'))
const Worksys = lazy(() => import('./pages/Worksys'))
const Qhse = lazy(() => import('./pages/Qhse'))
const Femsa = lazy(() => import('./pages/Femsa'))
const Ochoa = lazy(() => import('./pages/Ochoa'))

// Páginas legales
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./pages/TermsOfService'))
const CookieSettings = lazy(() => import('./pages/CookieSettings'))

// Certificación de seguridad
const CertificacionSeguridad = lazy(() => import('./pages/CertificacionSeguridad'))

const NotFound = lazy(() => import('./pages/NotFound'))

// Componente de loading mientras se cargan las páginas
// Loader simple y elegante que no interfiere con el diseño
const PageLoader = () => <SimpleLoader />

function App() {
  // Inicializar analytics, sentry y web vitals cuando la app se carga
  useEffect(() => {
    // Inicializar servicios
    try {
      // 1. Inicializar Sentry primero (para capturar errores de inicialización)
      sentryService.initialize();

      // 2. Inicializar Analytics
      analyticsService.initialize();

      // Habilitar scroll tracking automático (25%, 50%, 75%, 100%)
      analyticsService.setupScrollTracking();

      // 3. Inicializar Web Vitals monitoring
      initWebVitals();

      // 4. Inicializar Performance Monitoring
      startPerformanceMonitoring();

      // 5. Inicializar Journey Tracking
      initJourneyTracking();

      // 6. Inicializar Security protections
      initSecurity();

      console.log('✅ All services initialized successfully');
    } catch (error) {
      // Capturar error en Sentry
      sentryService.captureError(error, {
        context: 'App Initialization',
      });

      // Silenciar errores en producción
      if (process.env.NODE_ENV !== 'production') {
        console.error('Initialization error:', error);
      }
    }
  }, []);

  return (
    <ErrorBoundary>
      <div className="App">
        {/* Skip Link para accesibilidad */}
        <SkipLink />

          <ScrollToTop />
          <PageTransition>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/inicio" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogEntrada />} />
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/awalab" element={<Awalab />} />
                <Route path="/expersys" element={<Expersys />} />
                <Route path="/worksys" element={<Worksys />} />
                <Route path="/clientes/qhse" element={<Qhse />} />
                <Route path="/clientes/coca-cola" element={<Femsa />} />
                <Route path="/clientes/ochoa" element={<Ochoa />} />
                {/* Páginas legales */}
                <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />
                <Route path="/terminos-de-servicio" element={<TermsOfService />} />
                <Route path="/configuracion-de-cookies" element={<CookieSettings />} />
                {/* Certificación de seguridad */}
                <Route path="/certificacion-seguridad/:uuid" element={<CertificacionSeguridad />} />
                {/* Ruta 404 - debe estar al final */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </PageTransition>

          {/* NUEVO: WhatsApp Float Button - NO ALTERAR DISEÑO EXISTENTE */}
          <WhatsAppFloatButton />

          {/* Toast Notifications - Sistema de notificaciones global */}
          <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
              // Duración por defecto
              duration: 4000,
              // Estilos base
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </div>
      </ErrorBoundary>
  )
}

export default App