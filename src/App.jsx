import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import BlogEntry from './pages/BlogEntry'
import Clientes from './pages/Clientes'
import Contacto from './pages/Contacto'
import Servicios from './pages/Servicios'
import SobreNosotros from './pages/SobreNosotros'
import Awalab from './pages/Awalab'
import Expersys from './pages/Expersys'
import Worksys from './pages/Worksys'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/inicio" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog-entry" element={<BlogEntry />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/servicios" element={<Servicios />} />
      <Route path="/sobre-nosotros" element={<SobreNosotros />} />
      <Route path="/awalab" element={<Awalab />} />
      <Route path="/expersys" element={<Expersys />} />
      <Route path="/worksys" element={<Worksys />} />
    </Routes>
  )
}

export default App