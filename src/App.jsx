import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'
import Blog from './pages/Blog'
import BlogEntry from './pages/BlogEntry'
import Clientes from './pages/Clientes'
import Contacto from './pages/Contacto'
import Nosotros from './pages/Nosotros'
import Awalab from './pages/Awalab'
import Expersys from './pages/Expersys'
import Worksys from './pages/Worksys'
import Qhse from './pages/Qhse'
import Femsa from './pages/Femsa'
import WhatsAppFloatButton from './components/WhatsAppFloatButton'
import { analyticsService } from './services/analytics'

function App() {
  // Inicializar analytics cuando la app se carga
  useEffect(() => {
    console.log('🚀 App mounted - initializing analytics');
    analyticsService.initialize();
  }, []);

  return (
    <div className="App">
      <PageTransition>
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
        </Routes>
      </PageTransition>

      {/* NUEVO: WhatsApp Float Button - NO ALTERAR DISEÑO EXISTENTE */}
      <WhatsAppFloatButton />
    </div>
  )
}

export default App