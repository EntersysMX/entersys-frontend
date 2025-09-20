# IMPLEMENTACIÓN EXACTA MODO DESIGN RELUME → DESIGN TOKENS

## 📋 CONTEXTO TÉCNICO CORRECTO

**Fuente de verdad:** paste.txt extraído del **MODO DESIGN** de Relume  
**URL original:** https://www.relume.io/app/project/P2453611_oag8C2on9umZBayEY139bU5aI8khlSkG9ePwSrqRXq0#mode=design  
**Contenido:** 796,082 caracteres de CSS + HTML renderizado desde Relume Design  
**Objetivo:** Réplica pixel-perfect del diseño final aplicado

## 🔍 **ANÁLISIS ESPECÍFICO DEL MODO DESIGN**

### **DIFERENCIAS CRÍTICAS:**
- **Wireframe** = Estructura básica sin estilos
- **Design Mode** = Diseño final con todos los estilos aplicados
- **paste.txt** = Código del DESIGN MODE (no wireframe)

### **TIPOGRAFÍA EXTRAÍDA DEL DESIGN MODE:**

**FUENTES APLICADAS EN DESIGN:**
- Análisis de paste.txt muestra: `font-family: system-ui`
- NO usa Titillium Web ni Inter como design tokens
- Sistema de fuentes nativo del navegador

**TAMAÑOS EXACTOS DEL DESIGN MODE:**
```
/* HEADINGS - Extraídos del paste.txt Design Mode */
.Uheading-style-h1: 3.5rem / 1.2 / 700 (56px)
.Uheading-style-h2: 3rem / 1.2 / 700 (48px)  
.Uheading-style-h3: 2.5rem / 1.2 / 700 (40px)
.Uheading-style-h4: 2rem / 1.3 / 700 (32px)
.Uheading-style-h5: 1.5rem / 1.4 / 700 (24px)
.Uheading-style-h6: 1.25rem / 1.4 / 700 (20px)

/* BODY TEXT - Design Mode */
.Utext-size-medium: 1rem / 1.5 / 400 (16px)
.Utext-size-large: 1.25rem / 1.5 / 400 (20px)
.Utext-size-small: 0.875rem / 1.5 / 400 (14px)
```

**RESPONSIVE DEL DESIGN MODE:**
```
/* Tablet (.breakpoint-medium - max-width: 991px) */
h1: 3.25rem → 2.5rem
h2: 2.75rem → 2.25rem
h3: 2.25rem → 2rem
h4: 1.75rem → 1.5rem

/* Mobile (.breakpoint-small - max-width: 767px) */
h1: 2.5rem (40px)
h2: 2.25rem (36px) 
h3: 2rem (32px)
h4: 1.5rem (24px) line-height: 1.4
h5: 1.25rem (20px)
h6: 1.125rem (18px)
```

## 🎨 **COLORES DE TEXTO DEL DESIGN MODE**

### **POR SECCIÓN (según Design Mode aplicado):**

**NAVBAR:**
- Texto: `var(--neutral-darkest)` sobre fondo blanco
- Links: `var(--neutral-darkest)` con hover `var(--primary)`

**HERO:**  
- Título: `var(--neutral-darkest)` sobre fondo `var(--primary-lightest)`
- Párrafo: `var(--neutral-dark)` para contraste sutil

**SERVICIOS (Fondo Secondary #093D53):**
- Títulos sección: `var(--neutral-white)` sobre fondo oscuro
- Cards internas: `var(--neutral-darkest)` sobre fondo blanco de cards
- Worksys title: `var(--primary)` (#009CA6)
- Expersys title: `var(--secondary)` (#093D53) o más claro para contraste

**DIFERENCIADORES:**
- Títulos: `var(--neutral-darkest)` sobre `var(--primary-lightest)`
- Labels: `var(--primary)`, `var(--secondary)`, `var(--gold)`

**FAQ/FOOTER:**
- Texto: `var(--neutral-darkest)` sobre fondos blancos

## 🔧 **IMPLEMENTACIÓN TÉCNICA COMPLETA**

### **CREAR src/styles/relume-design-mode.css:**
```
/* SISTEMA TIPOGRÁFICO EXACTO DEL DESIGN MODE */

/* FONT SYSTEM OVERRIDE */
* {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
}

/* HEADINGS DESIGN MODE */
.Uheading-style-h1,
.hero-title,
.diferenciadores-title,
.propuesta-title,
.faq-title {
  font-size: 3.5rem !important;
  line-height: 1.2 !important;
  font-weight: 700 !important;
}

.Uheading-style-h2,
.servicios-title {
  font-size: 3rem !important;
  line-height: 1.2 !important;
  font-weight: 700 !important;
}

.Uheading-style-h3,
.service-card-title {
  font-size: 2.5rem !important;
  line-height: 1.2 !important;
  font-weight: 700 !important;
}

/* BODY TEXT DESIGN MODE */
.Utext-size-medium,
.hero-subtitle,
.servicios-subtitle,
.diferenciadores-description {
  font-size: 1rem !important;
  line-height: 1.5 !important;
  font-weight: 400 !important;
}

/* RESPONSIVE EXACTO DESIGN MODE */
@media (max-width: 991px) {
  .Uheading-style-h1 { font-size: 3.25rem !important; }
  .Uheading-style-h2 { font-size: 2.75rem !important; }
  .Uheading-style-h3 { font-size: 2.25rem !important; }
}

@media (max-width: 767px) {
  .Uheading-style-h1 { font-size: 2.5rem !important; }
  .Uheading-style-h2 { font-size: 2.25rem !important; }
  .Uheading-style-h3 { font-size: 2rem !important; }
  .Uheading-style-h4 { 
    font-size: 1.5rem !important;
    line-height: 1.4 !important;
  }
}

/* COLORES POR SECCIÓN DESIGN MODE */
.hero-section { color: var(--neutral-darkest) !important; }
.servicios-section { color: var(--neutral-white) !important; }
.service-card { color: var(--neutral-darkest) !important; }
.diferenciadores-section { color: var(--neutral-darkest) !important; }
.faq-section { color: var(--neutral-darkest) !important; }
.footer-section { color: var(--neutral-dark) !important; }

/* COLORES BRAND ESPECÍFICOS */
.worksys-card .service-card-title { color: var(--primary) !important; }
.expersys-card .service-card-title { color: var(--secondary) !important; }
.eficiencia-label { color: var(--primary) !important; }
.escalabilidad-label { color: var(--secondary) !important; }
.cumplimiento-label { color: var(--gold) !important; }
```

## ⚡ **CRITERIOS DE ÉXITO - DESIGN MODE EXACTO**

- [ ] Fuente: system-ui aplicada globalmente (NO Titillium Web)
- [ ] Tamaños exactos del Design Mode renderizado
- [ ] Responsive preciso según breakpoints de paste.txt  
- [ ] Colores de texto contrastados por sección
- [ ] Build exitoso manteniendo design tokens para colores
