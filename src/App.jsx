import React, { useEffect, Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import PageTransition from './components/PageTransition'
import ErrorBoundary from './components/ui/ErrorBoundary'
import WhatsAppFloatButton from './components/WhatsAppFloatButton'
import ScrollToTop from './components/ScrollToTop'
import { analyticsService } from './services/analytics'
import { initWebVitals } from './utils/webVitals'
import './utils/testAnalytics' // Auto-expose test suite in development

// Lazy loading de páginas para mejor performance
// Home se carga inmediatamente por ser la página principal
import Home from './pages/Home'

// Páginas secundarias con lazy loading
const Blog = lazy(() => import('./pages/Blog'))
const BlogEntry = lazy(() => import('./pages/BlogEntry'))
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

const NotFound = lazy(() => import('./pages/NotFound'))

// Componente de loading mientras se cargan las páginas
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p className="mt-4 text-gray-600">Cargando...</p>
    </div>
  </div>
)

function App() {
  // Inicializar analytics y web vitals cuando la app se carga
  useEffect(() => {
    // Inicializar servicios
    try {
      analyticsService.initialize();

      // Habilitar scroll tracking automático (25%, 50%, 75%, 100%)
      analyticsService.setupScrollTracking();

      initWebVitals();
    } catch (error) {
      // Silenciar errores en producción
      if (process.env.NODE_ENV !== 'production') {
        console.error('Initialization error:', error);
      }
    }
  }, []);

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <div className="App">
          <ScrollToTop />
          <PageTransition>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/inicio" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog-entry" element={<BlogEntry />} />
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/awalab" element={<Awalab />} />
                <Route path="/expersys" element={<Expersys />} />
                <Route path="/worksys" element={<Worksys />} />
                <Route path="/clientes/qhse" element={<Qhse />} />
                <Route path="/clientes/femsa" element={<Femsa />} />
                <Route path="/clientes/ochoa" element={<Ochoa />} />
                {/* Páginas legales */}
                <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />
                <Route path="/terminos-de-servicio" element={<TermsOfService />} />
                <Route path="/configuracion-de-cookies" element={<CookieSettings />} />
                {/* Ruta 404 - debe estar al final */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </PageTransition>

          {/* NUEVO: WhatsApp Float Button - NO ALTERAR DISEÑO EXISTENTE */}
          <WhatsAppFloatButton />
        </div>
      </ErrorBoundary>
    </HelmetProvider>
  )
}

export default App