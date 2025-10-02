# ARQUITECTURA DE SOFTWARE - ENTERSYS FRONTEND

## 📋 INFORMACIÓN GENERAL

**Proyecto:** Entersys Frontend
**Framework:** React 18 + Vite
**Lenguaje:** JavaScript (JSX)
**Styling:** Tailwind CSS + CSS Modules + Design System personalizado
**Repositorio:** https://github.com/EntersysMX/entersys-frontend
**Puerto de desarrollo:** 3002

## 🏗️ ARQUITECTURA GENERAL

### Stack Tecnológico
```
┌─ React 18.3.1 (Frontend Framework)
├─ Vite 4.5.14 (Build Tool & Dev Server)
├─ Tailwind CSS 3.4.13 (Utility CSS Framework)
├─ Relume UI (Component Library)
├─ React Icons (Iconografía)
└─ Design System personalizado (CSS Variables + Tokens)
```

### Estructura de Archivos
```
entersys-frontend/
├── public/                     # Assets estáticos
├── src/
│   ├── components/            # Componentes React reutilizables
│   │   ├── Header5.jsx       # Hero Section con imagen de fondo
│   │   ├── Navbar11.jsx      # Barra de navegación
│   │   ├── Layout363.jsx     # Sección de servicios (Worksys/Expersys)
│   │   ├── Layout394.jsx     # Diferenciadores (Eficiencia/Escalabilidad/Cumplimiento)
│   │   ├── Layout245.jsx     # Propuesta de valor
│   │   ├── Layout241.jsx     # Industrias
│   │   ├── Faq4.jsx         # Preguntas frecuentes con accordions
│   │   ├── Footer11.jsx     # Footer con links y contacto
│   │   ├── Card.jsx         # Componente base para tarjetas
│   │   └── AwaTestimonial17.jsx # Testimonios
│   ├── design-tokens/         # Sistema de design tokens
│   │   ├── index.js          # Exportación principal
│   │   └── tokens/
│   │       ├── colors.js     # Paleta de colores
│   │       ├── typography.js # Fuentes y tamaños
│   │       ├── spacing.js    # Espaciado
│   │       ├── shadows.js    # Sombras
│   │       ├── radius.js     # Border radius
│   │       └── animations.js # Transiciones
│   ├── index.css            # CSS global + Design System
│   └── main.jsx            # Punto de entrada de React
├── tailwind.config.js       # Configuración de Tailwind
├── vite.config.js          # Configuración de Vite
├── disenio_inicio.md       # Especificaciones del Design System
└── package.json            # Dependencias del proyecto
```

## 🎨 DESIGN SYSTEM

### 1. Variables CSS (CSS Custom Properties)
**Ubicación:** `src/index.css` (líneas 8-96)

```css
:root {
  /* COLORES - 4 paletas principales */
  --neutral-*: #FFFFFF → #000808 (8 variaciones)
  --primary-*: #E5F5F6 → #002E31 (7 variaciones - Entersys Org)
  --secondary-*: #E6EBED → #021218 (7 variaciones - Premiumsys)
  --gold-*: #F8F6F0 → #3A3120 (7 variaciones - Accent)

  /* TIPOGRAFÍA */
  --font-heading: 'Titillium Web' (Títulos)
  --font-body: 'Inter' (Texto)

  /* TAMAÑOS DESKTOP/MOBILE */
  --h1-desktop: 56px / --h1-mobile: 40px
  --h2-desktop: 48px / --h2-mobile: 36px

  /* SISTEMA DE SOMBRAS (7 niveles) */
  --shadow-xxsmall → --shadow-xxlarge

  /* RADIUS */
  --radius-small: 4px / medium: 8px / large: 12px

  /* SPACING */
  --spacing-1: 4px → --spacing-32: 128px
}
```

### 2. Sistema de Componentes

#### **Componentes por Función:**

**A) Navegación:**
- `Navbar11.jsx` - Header fijo con logo y menú
- Links de navegación con hover states

**B) Hero Section:**
- `Header5.jsx` - Sección principal con imagen de fondo
- Overlay oscuro (bg-black/50)
- Botones primario y secundario
- Tipografía: Titillium Web Bold 56px → 40px mobile

**C) Contenido Principal:**
- `Layout363.jsx` - **Servicios** (Worksys: primary, Expersys: secondary)
- `Layout394.jsx` - **Diferenciadores** (3 cards con colores específicos)
- `Layout245.jsx` - **Propuesta de valor** (fondo primary)
- `Layout241.jsx` - **Industrias** (contenido placeholder)

**D) Interacción:**
- `Faq4.jsx` - Accordions con Relume UI
- Fondo neutral-darker, iconos primary

**E) Footer:**
- `Footer11.jsx` - Links, contacto, redes sociales
- Fondo neutral-darkest

### 3. Estrategia de Estilos

#### **Híbrido: Tailwind + CSS Custom Properties**
```jsx
// Ejemplo de implementación
<section className="hero-section px-[5%]">  {/* Tailwind utilities */}
  <h1 className="hero-title mb-5">        {/* CSS custom classes */}
    Título con tipografía del design system
  </h1>
</section>
```

```css
/* CSS personalizado para design system exacto */
.hero-title {
  font: var(--font-bold) var(--h1-desktop)/var(--h1-lh-desktop) var(--font-heading);
  color: var(--neutral-darkest);
}
```

## 🔧 CONFIGURACIÓN TÉCNICA

### Vite Configuration
```javascript
// vite.config.js - Optimizado para React
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Puerto preferido (fallback automático)
    host: true  // Permite acceso desde red local
  }
})
```

### Tailwind Configuration
```javascript
// tailwind.config.js - Extendido con design tokens
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Extensiones personalizadas si se requieren
      // Principalmente usa CSS custom properties
    }
  }
}
```

## 🎯 PATRONES DE DISEÑO IMPLEMENTADOS

### 1. Design Token System
- **Centralización:** Todas las variables de diseño en un lugar
- **Consistencia:** Uso uniforme de colores, tipografía, espaciado
- **Mantenibilidad:** Cambios globales desde variables CSS

### 2. Component-Based Architecture
- **Reutilización:** Componentes modulares (Card.jsx como base)
- **Separación de responsabilidades:** Un componente = una función
- **Props drilling mínimo:** Componentes mayormente estáticos

### 3. Responsive Design
- **Mobile First approach** con breakpoint en 768px
- **Progressive enhancement** para desktop
- **Fluid typography** con variables específicas

```css
@media (max-width: 768px) {
  .hero-title {
    font-size: var(--h1-mobile);    /* 40px */
    line-height: var(--h1-lh-mobile); /* 120% */
  }
}
```

## 🔄 FLUJO DE DATOS

### Estructura Estática Actual
```
main.jsx
├── App.jsx (no visible, implícito)
└── Página Inicio (Single Page)
    ├── Navbar11 (Navegación)
    ├── Header5 (Hero)
    ├── Layout363 (Servicios)
    ├── Layout394 (Diferenciadores)
    ├── Layout245 (Propuesta)
    ├── Layout241 (Industrias)
    ├── Faq4 (FAQ)
    └── Footer11 (Footer)
```

**Nota:** Actualmente es una SPA estática sin routing. Cada "Layout" es una sección de la misma página.

## 🎨 SISTEMA DE COLORES - USAGE MAPPING

### Aplicación por Sección:
```css
/* Hero Section */
background: var(--primary-lightest)  /* Fondo suave */
title: var(--neutral-darkest)        /* Contraste máximo */

/* Servicios */
background: var(--neutral-white)     /* Limpio */
worksys-title: var(--primary)       /* Marca Entersys */
expersys-title: var(--secondary)    /* Marca Premiumsys */

/* Diferenciadores */
eficiencia: var(--primary-lightest)     /* Verde agua suave */
escalabilidad: var(--secondary-lightest) /* Azul suave */
cumplimiento: var(--gold-lightest)      /* Dorado suave */

/* Propuesta */
background: var(--primary)           /* Llamada de atención */
text: var(--neutral-white)          /* Contraste */

/* FAQ */
background: var(--neutral-darker)    /* Elegante oscuro */
icons: var(--primary)               /* Acentos de marca */

/* Footer */
background: var(--neutral-darkest)   /* Máxima profundidad */
links: var(--neutral-lighter)       /* Legibilidad */
```

## ⚡ OPTIMIZACIONES IMPLEMENTADAS

### 1. Performance
- **Vite:** Hot Module Replacement ultra-rápido
- **Tree shaking:** Solo importa componentes usados de Relume UI
- **CSS Variables:** Mejor performance que Sass/preprocessing

### 2. Developer Experience
- **Design tokens:** Cambios de diseño centralizados
- **Component naming:** Convención clara (Layout### para secciones)
- **CSS organization:** Secciones comentadas y estructuradas

### 3. Maintenance
- **Single source of truth:** disenio_inicio.md como especificación
- **Version control:** Git con commits descriptivos
- **Documentation:** Este archivo para onboarding

## 🚀 COMANDOS DE DESARROLLO

```bash
# Instalación
npm install

# Desarrollo (puerto automático: 3000 → 3001 → 3002)
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting (si está configurado)
npm run lint
```

## 📝 CONSIDERACIONES PARA FUTURAS ITERACIONES

### 1. Arquitectura
- **Router:** React Router para navegación multi-página
- **State Management:** Zustand/Redux si se añade interactividad
- **API Integration:** Axios/Fetch para contenido dinámico

### 2. Performance
- **Code splitting:** Lazy loading de componentes
- **Image optimization:** Formato WebP, lazy loading
- **Bundle analysis:** Para optimizar tamaño final

### 3. Funcionalidad
- **Form handling:** React Hook Form para contacto
- **Animation:** Framer Motion para micro-interacciones
- **SEO:** React Helmet para meta tags

### 4. Testing
- **Unit tests:** Jest + React Testing Library
- **E2E tests:** Cypress/Playwright
- **Visual regression:** Chromatic/Percy

## 🔍 DEBUGGING Y TROUBLESHOOTING

### Problemas Comunes:
1. **Puerto ocupado:** Vite encuentra automáticamente puerto libre
2. **CSS no aplica:** Verificar que las clases estén en src/index.css
3. **Componente no renderiza:** Revisar imports y exports
4. **Responsive issues:** Confirmar breakpoint en 768px

### Herramientas de Debug:
- **React DevTools:** Para inspeccionar componentes
- **Chrome DevTools:** Para CSS y performance
- **Vite DevTools:** Para build analysis

---

## 📞 INFORMACIÓN DE CONTACTO DEL PROYECTO

**Último commit:** b4076e1 - "Implement complete design system with exact specifications"
**Autor:** Claude Code Assistant
**Fecha:** Implementación completa del design system según especificaciones exactas

Este documento debe ser actualizado cuando se realicen cambios arquitectónicos significativos al proyecto.