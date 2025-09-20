# INTEGRACIÓN PROFESIONAL DE RELUME CSS + DESIGN SYSTEM ENTERSYS

## 📋 CONTEXTO DEL PROYECTO

**Repositorio:** https://github.com/EntersysMX/entersys-frontend
**Framework:** React 18 + Vite + TailwindCSS + Relume UI
**Estado actual:** Design system parcialmente implementado, Docker deployment funcionando
**Objetivo:** Integrar CSS completo extraído de Relume con nuestro design token system existente

## 🎯 TAREAS ESPECÍFICAS REQUERIDAS

### TAREA 1: CREACIÓN DE ESTRUCTURA DE ARCHIVOS CSS
**Crear nueva estructura organizada:**

src/
├── styles/
│ ├── relume-complete.css # [CREAR] - CSS completo de paste.txt
│ ├── design-tokens.css # [CREAR] - Variables mapeadas
│ ├── overrides.css # [CREAR] - Personalizaciones
│ └── index.css # [MODIFICAR] - Imports ordenados
└── design-tokens/ # [MANTENER] - Sistema existente

text

**Instrucciones:**
- Crear directorio `src/styles/` si no existe
- Mover todo el contenido de `paste.txt` (796,085 caracteres) a `src/styles/relume-complete.css`
- NO modificar ni optimizar el CSS de Relume, mantenerlo íntegro

### TAREA 2: MAPEO DE VARIABLES CSS
**En `src/styles/design-tokens.css` crear mapeo bidireccional:**

:root {
/* VARIABLES EXISTENTES DEL PROYECTO (mantener intactas) */
--neutral-white: #FFFFFF;
--neutral-lightest: #F2F2F2;
--neutral-lighter: #D8D9D9;
--neutral-light: #B2B4B4;
--neutral: #7F8383;
--neutral-dark: #4C5252;
--neutral-darker: #192020;
--neutral-darkest: #000808;

--primary-lightest: #E5F5F6;
--primary-lighter: #CCEBED;
--primary-light: #4CB9C0;
--primary: #009CA6;
--primary-dark: #007C84;
--primary-darker: #003E42;
--primary-darkest: #002E31;

--secondary-lightest: #E6EBED;
--secondary-lighter: #CDD8DC;
--secondary-light: #527786;
--secondary: #093D53;
--secondary-dark: #073042;
--secondary-darker: #031821;
--secondary-darkest: #021218;

--gold-lightest: #F8F6F0;
--gold-lighter: #F2EDE1;
--gold-light: #D4C098;
--gold: #C2A56D;
--gold-dark: #9B8457;
--gold-darker: #4D422B;
--gold-darkest: #3A3120;

/* MAPEO PARA COMPATIBILIDAD CON RELUME CSS */
--neutral-shade-0: var(--neutral-white);
--neutral-shade-1: var(--neutral-lightest);
--neutral-shade-2: var(--neutral-lighter);
--neutral-shade-3: var(--neutral-light);
--neutral-shade-4: var(--neutral);
--neutral-shade-5: var(--neutral-dark);
--neutral-shade-6: var(--neutral-darker);
--neutral-shade-7: var(--neutral-darkest);

--chromatic1-shade-1: var(--primary-lightest);
--chromatic1-shade-2: var(--primary-lighter);
--chromatic1-shade-3: var(--primary-light);
--chromatic1-shade-4: var(--primary);
--chromatic1-shade-5: var(--primary-dark);
--chromatic1-shade-6: var(--primary-darker);
--chromatic1-shade-7: var(--primary-darkest);

--chromatic2-shade-1: var(--secondary-lightest);
--chromatic2-shade-2: var(--secondary-lighter);
--chromatic2-shade-3: var(--secondary-light);
--chromatic2-shade-4: var(--secondary);
--chromatic2-shade-5: var(--secondary-dark);
--chromatic2-shade-6: var(--secondary-darker);
--chromatic2-shade-7: var(--secondary-darkest);

--chromatic3-shade-1: var(--gold-lightest);
--chromatic3-shade-2: var(--gold-lighter);
--chromatic3-shade-3: var(--gold-light);
--chromatic3-shade-4: var(--gold);
--chromatic3-shade-5: var(--gold-dark);
--chromatic3-shade-6: var(--gold-darker);
--chromatic3-shade-7: var(--gold-darkest);

/* COLOR SCHEMES POR SECCIÓN */
--color-scheme-1-background: var(--neutral-white);
--color-scheme-1-text: var(--neutral-darkest);
--color-scheme-1-accent: var(--primary);
--color-scheme-1-border: rgba(0, 8, 8, 0.15);

--color-scheme-2-background: var(--neutral-darker);
--color-scheme-2-text: var(--neutral-white);
--color-scheme-2-accent: var(--neutral-white);
--color-scheme-2-border: rgba(255, 255, 255, 0.2);

--color-scheme-3-background: var(--primary-lightest);
--color-scheme-3-text: var(--neutral-darkest);
--color-scheme-3-accent: var(--neutral-darkest);
--color-scheme-3-border: rgba(0, 8, 8, 0.15);

--color-scheme-4-background: var(--primary);
--color-scheme-4-text: var(--neutral-white);
--color-scheme-4-accent: var(--neutral-white);
--color-scheme-4-border: rgba(255, 255, 255, 0.2);

--color-scheme-5-background: var(--secondary);
--color-scheme-5-text: var(--neutral-white);
--color-scheme-5-accent: var(--neutral-white);
--color-scheme-5-border: rgba(255, 255, 255, 0.2);
}

text

### TAREA 3: CREAR ARCHIVO DE OVERRIDES
**En `src/styles/overrides.css` aplicar color schemes por sección:**

/* HERO SECTION - Color Scheme 3 (Primary Lightest Background) */
.Usection-header5 {
background-color: var(--color-scheme-3-background) !important;
color: var(--color-scheme-3-text) !important;
}

.Uheader5-content .Uheading-style-h1 {
font-family: 'Titillium Web', sans-serif !important;
color: var(--color-scheme-3-text) !important;
}

.Uheader5-content .Utext-style-body {
font-family: 'Inter', sans-serif !important;
color: var(--neutral-dark) !important;
}

/* SERVICIOS SECTION - Color Scheme 1 (White Background) */
.Ulayout363-container {
background-color: var(--color-scheme-1-background) !important;
}

.Ulayout363-content .Uheading-style-h2,
.Ulayout363-content .Uheading-style-h3 {
font-family: 'Titillium Web', sans-serif !important;
color: var(--color-scheme-1-text) !important;
}

/* WORKSYS CARD - Primary Color */
.Ulayout363-item:first-child .Uheading-style-h3 {
color: var(--primary) !important;
}

/* EXPERSYS CARD - Secondary Color */
.Ulayout363-item:nth-child(2) .Uheading-style-h3 {
color: var(--secondary) !important;
}

/* FAQ SECTION - Color Scheme 2 (Dark Background) */
.Ufaq4-container {
background-color: var(--color-scheme-2-background) !important;
color: var(--color-scheme-2-text) !important;
}

.Ufaq4-content .Uheading-style-h2 {
font-family: 'Titillium Web', sans-serif !important;
color: var(--color-scheme-2-text) !important;
}

/* FOOTER - Neutral Darkest */
.Ufooter11-container {
background-color: var(--neutral-darkest) !important;
}

.Ufooter11-content * {
color: var(--neutral-lighter) !important;
}

/* BOTONES PERSONALIZADOS */
.Ubutton.primary {
background-color: var(--primary) !important;
color: var(--neutral-white) !important;
border-color: var(--primary) !important;
font-family: 'Inter', sans-serif !important;
font-weight: 600 !important;
}

.Ubutton.primary:hover {
background-color: var(--primary-dark) !important;
}

.Ubutton.secondary {
background-color: transparent !important;
color: var(--primary) !important;
border: 2px solid var(--primary) !important;
font-family: 'Inter', sans-serif !important;
font-weight: 600 !important;
}

.Ubutton.secondary:hover {
background-color: var(--primary-lightest) !important;
}

/* TYPOGRAPHY SYSTEM OVERRIDE */
.Uheading-style-h1,
.Uheading-style-h2,
.Uheading-style-h3,
.Uheading-style-h4,
.Uheading-style-h5,
.Uheading-style-h6 {
font-family: 'Titillium Web', sans-serif !important;
}

.Utext-style-body,
.Utext-style-small,
.Utext-style-label {
font-family: 'Inter', sans-serif !important;
}

text

### TAREA 4: ACTUALIZAR src/index.css
**Reemplazar completamente el contenido con estructura de imports correcta:**

/* GOOGLE FONTS */
@import url('https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600;700;900&family=Inter:wght@300;400;500;600;700;800&display=swap');

/* DESIGN TOKENS VARIABLES */
@import url('./styles/design-tokens.css');

/* RELUME CSS COMPLETO */
@import url('./styles/relume-complete.css');

/* OVERRIDES Y PERSONALIZACIONES */
@import url('./styles/overrides.css');

/* BASE STYLES */

{
margin: 0;
padding: 0;
box-sizing: border-box;
}

body {
font-family: 'Inter', system-ui, sans-serif;
line-height: 1.6;
color: var(--neutral-darkest);
background: var(--neutral-white);
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
}

/* UTILITY CLASSES */
.container {
max-width: 1200px;
margin: 0 auto;
padding: 0 1.5rem;
}

.text-center { text-align: center; }
.hidden { display: none; }
.block { display: block; }
.flex { display: flex; }

/* RESPONSIVE UTILITIES */
@media (max-width: 768px) {
.hide-mobile { display: none !important; }
.show-mobile { display: block !important; }
}

@media (min-width: 769px) {
.hide-desktop { display: none !important; }
.show-desktop { display: block !important; }
}

text

### TAREA 5: ACTUALIZAR COMPONENTES REACT
**Identificar y actualizar todos los componentes para usar clases de Relume:**

**Ejemplo para src/App.jsx o componente principal:**
// Buscar y reemplazar clases existentes por clases U-prefixed de Relume
// Ejemplos de mapeo:
// .hero-section -> .Usection-header5
// .hero-title -> .Uheading-style-h1
// .hero-subtitle -> .Utext-style-body
// .btn-primary -> .Ubutton.primary
// .service-card -> .Ulayout363-item
// .faq-section -> .Ufaq4-container

// Asegurar que todos los componentes usen la estructura de clases de Relume
// Mantener la funcionalidad de React pero cambiar solo las clases CSS

text

## ⚡ CRITERIOS DE ÉXITO

### TÉCNICOS:
- [ ] CSS de Relume importado sin errores
- [ ] Variables mapeadas correctamente  
- [ ] Overrides aplicados por sección
- [ ] Tipografía Titillium Web + Inter funcionando
- [ ] Color schemes aplicados según especificaciones
- [ ] Build de Vite sin errores
- [ ] Responsive design mantenido

### VISUALES:
- [ ] Hero section con fondo primary-lightest
- [ ] Servicios Worksys (primary) y Expersys (secondary) 
- [ ] FAQ con fondo neutral-darker
- [ ] Footer con fondo neutral-darkest
- [ ] Botones con hover states correctos
- [ ] Tipografía exacta según Typography.pdf

## 🚨 RESTRICCIONES CRÍTICAS

1. **NO MODIFICAR** el CSS contenido en paste.txt - usarlo tal como está
2. **NO ROMPER** la funcionalidad React existente
3. **MANTENER** la estructura de design tokens existente
4. **NO CAMBIAR** los valores de colores hex definidos
5. **PRESERVAR** el sistema de deployment Docker existente
6. **USAR** !important solo donde sea absolutamente necesario
7. **MANTENER** compatibilidad con Vite build system

## 📝 ENTREGABLES ESPERADOS

1. **Archivos CSS creados/modificados:**
   - `src/styles/relume-complete.css` (nuevo)
   - `src/styles/design-tokens.css` (nuevo) 
   - `src/styles/overrides.css` (nuevo)
   - `src/index.css` (modificado)

2. **Componentes React actualizados** con clases de Relume

3. **Build exitoso** sin errores ni warnings

4. **Sitio funcionando** con apariencia exacta a los PDFs de diseño

## 🔧 COMANDOS PARA VALIDACIÓN

Test de build
npm run build

Test de desarrollo
npm run dev

Test de deployment
sudo docker compose up -d --build

text

## 📋 NOTAS ADICIONALES

- Este proyecto usa React 18 + Vite + TailwindCSS + Relume UI
- El CSS de paste.txt contiene 796,085 caracteres de estilos completos
- Los PDFs Variables.pdf, Typography.pdf definen las especificaciones exactas
- El deployment se hace vía Docker a dev.entersys.mx
- El repositorio tiene CI/CD configurado con GitHub Actions

**PRIORIDAD:** Alta - Este es un proyecto en producción
**URGENCIA:** Completar en una sola sesión sin iteraciones
**CALIDAD:** Debe verse EXACTAMENTE igual al diseño original de Relume
🎯 INSTRUCCIONES DE USO DEL PROMPT
Copia el prompt completo tal como está

Pégalo en Claude Code sin modificaciones

Adjunta el archivo paste.txt si es necesario

Deja que Claude Code ejecute todas las tareas secuencialmente

Verifica que el resultado final sea exitoso

Este prompt está diseñado con ingeniería de prompts profesional para maximizar la precisión y completitud de la respuesta de Claude Code.