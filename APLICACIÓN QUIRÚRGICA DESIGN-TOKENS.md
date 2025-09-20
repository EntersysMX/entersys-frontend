# APLICACIÓN QUIRÚRGICA DESIGN-TOKENS + ESTILOS RELUME

## 📋 CONTEXTO DESIGN TOKEN SYSTEM

**Estado del proyecto:** FUNCIONAL - usando design tokens CSS variables
**Arquitectura CSS:** Variables CSS como single source of truth
**Estrategia:** Extraer apariencia visual de paste.txt pero FORZAR uso de design tokens

## 🎨 DESIGN TOKEN SYSTEM EXISTENTE (PRESERVAR 100%)

```
:root {
  /* COLORES - Variables.pdf - NUNCA TOCAR ESTOS VALORES */
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

  /* TIPOGRAFÍA - Typography.pdf */
  --font-heading: 'Titillium Web', sans-serif;
  --font-body: 'Inter', sans-serif;

  /* TAMAÑOS DESKTOP/MOBILE */
  --h1-desktop: 56px; --h1-mobile: 40px;
  --h2-desktop: 48px; --h2-mobile: 36px;
  --h3-desktop: 40px; --h3-mobile: 32px;
  --h4-desktop: 32px; --h4-mobile: 24px;
  --h5-desktop: 24px; --h5-mobile: 20px;

  /* SPACING, SHADOWS, RADIUS - Mantener sistema completo */
  --spacing-4: 16px; --spacing-6: 24px; --spacing-8: 32px;
  --shadow-small: 0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06);
  --radius-medium: 8px; --radius-large: 12px;
  --transition-normal: 200ms ease-in-out;
}
```

## 🎯 TAREAS ESPECÍFICAS CON DESIGN TOKENS

### TAREA 1: EXTRAER CLASES VISUALES DE paste.txt
**Crear:** `src/styles/relume-components.css`

**METODOLOGÍA:**
1. Analizar el HTML de paste.txt
2. Identificar clases .U* y sus estilos aplicados
3. Recrear esas clases usando EXCLUSIVAMENTE design tokens

**EJEMPLO DE EXTRACCIÓN CORRECTA:**
```
/* Extraído de paste.txt pero USANDO DESIGN TOKENS */
.Uheading-style-h1 {
  font-family: var(--font-heading); /* Titillium Web */
  font-size: var(--h1-desktop);     /* 56px */
  line-height: var(--h1-lh-desktop); /* 120% */
  font-weight: var(--font-bold);    /* 700 */
  color: var(--neutral-darkest);    /* #000808 */
}

.Utext-style-body {
  font-family: var(--font-body);    /* Inter */
  font-size: var(--text-large);     /* 18px */
  line-height: var(--text-large-lh); /* 150% */
  font-weight: var(--font-normal);   /* 400 */
  color: var(--neutral-dark);       /* #4C5252 */
}

.Usection-header5 {
  background-color: var(--primary-lightest); /* #E5F5F6 */
  padding: 120px var(--spacing-6) 80px var(--spacing-6);
}

/* RESPONSIVE CON DESIGN TOKENS */
@media (max-width: 768px) {
  .Uheading-style-h1 {
    font-size: var(--h1-mobile);  /* 40px */
    line-height: var(--h1-lh-mobile); /* 120% */
  }
}
```

### TAREA 2: APLICAR COLOR SCHEMES POR SECCIÓN
**Crear:** `src/styles/section-color-schemes.css`

```
/* COLOR SCHEMES ESPECÍFICOS USANDO DESIGN TOKENS */

/* HERO SECTION - Color Scheme Primary Light */
.hero-section,
.Usection-header5 {
  background-color: var(--primary-lightest) !important;
  color: var(--neutral-darkest) !important;
}

.hero-title,
.Uheader5-content .Uheading-style-h1 {
  color: var(--neutral-darkest) !important;
  font-family: var(--font-heading) !important;
  font-size: var(--h1-desktop) !important;
  font-weight: var(--font-bold) !important;
}

/* SERVICIOS SECTION - Color Scheme Neutral White */
.servicios-section,
.Ulayout363-container {
  background-color: var(--neutral-white) !important;
}

.servicios-title,
.Ulayout363-content .Uheading-style-h2 {
  color: var(--neutral-darkest) !important;
  font-family: var(--font-heading) !important;
  font-size: var(--h2-desktop) !important;
}

/* SERVICIOS ESPECÍFICOS - Design Tokens */
.worksys-title,
.worksys-card .service-card-title,
.Ulayout363-item:first-child .Uheading-style-h3 {
  color: var(--primary) !important; /* #009CA6 */
}

.expersys-title,
.expersys-card .service-card-title,
.Ulayout363-item:nth-child(2) .Uheading-style-h3 {
  color: var(--secondary) !important; /* #093D53 */
}

/* DIFERENCIADORES - Design Tokens Específicos */
.card-eficiencia {
  background-color: var(--primary-lightest) !important; /* #E5F5F6 */
}
.eficiencia-label { color: var(--primary) !important; }
.eficiencia-title { color: var(--primary-dark) !important; }

.card-escalabilidad {
  background-color: var(--secondary-lightest) !important; /* #E6EBED */
}
.escalabilidad-label { color: var(--secondary) !important; }
.escalabilidad-title { color: var(--secondary-dark) !important; }

.card-cumplimiento {
  background-color: var(--gold-lightest) !important; /* #F8F6F0 */
}
.cumplimiento-label { color: var(--gold) !important; }
.cumplimiento-title { color: var(--gold-dark) !important; }

/* FAQ SECTION - Color Scheme Dark */
.faq-section,
.Ufaq4-container {
  background-color: var(--neutral-darker) !important; /* #192020 */
  color: var(--neutral-white) !important;
}

.faq-title,
.Ufaq4-content .Uheading-style-h2 {
  color: var(--neutral-white) !important;
  font-family: var(--font-heading) !important;
}

/* FOOTER SECTION - Color Scheme Darkest */
.footer-section,
.Ufooter11-container {
  background-color: var(--neutral-darkest) !important; /* #000808 */
}

.footer-links {
  color: var(--neutral-lighter) !important; /* #D8D9D9 */
  font-family: var(--font-body) !important;
}

.footer-links:hover {
  color: var(--primary) !important; /* #009CA6 */
}

/* BOTONES - Design Tokens */
.btn-primary,
.Ubutton.primary {
  background-color: var(--primary) !important;
  color: var(--neutral-white) !important;
  font-family: var(--font-body) !important;
  font-weight: var(--font-semibold) !important;
  border-radius: var(--radius-medium) !important;
  transition: var(--transition-normal) !important;
}

.btn-primary:hover,
.Ubutton.primary:hover {
  background-color: var(--primary-dark) !important;
}

.btn-secondary,
.Ubutton.secondary {
  background-color: transparent !important;
  color: var(--primary) !important;
  border: 2px solid var(--primary) !important;
  font-family: var(--font-body) !important;
  font-weight: var(--font-semibold) !important;
  border-radius: var(--radius-medium) !important;
}

.btn-secondary:hover,
.Ubutton.secondary:hover {
  background-color: var(--primary-lightest) !important;
}

/* TIPOGRAFÍA GLOBAL - Design Tokens */
.Uheading-style-h1,
.Uheading-style-h2,
.Uheading-style-h3,
.Uheading-style-h4,
.Uheading-style-h5,
.diferenciadores-title,
.propuesta-title,
.faq-title {
  font-family: var(--font-heading) !important; /* Titillium Web */
  font-weight: var(--font-bold) !important;    /* 700 */
}

.Utext-style-body,
.diferenciadores-description,
.service-card-description,
.card-description {
  font-family: var(--font-body) !important;    /* Inter */
  font-weight: var(--font-normal) !important;  /* 400 */
  line-height: var(--text-large-lh) !important; /* 150% */
}

/* RESPONSIVE - Design Tokens */
@media (max-width: 768px) {
  .Uheading-style-h1 {
    font-size: var(--h1-mobile) !important;  /* 40px */
  }
  .Uheading-style-h2 {
    font-size: var(--h2-mobile) !important;  /* 36px */
  }
}
```

### TAREA 3: IMPORTS ORDENADOS EN src/index.css

**Al final del archivo existente, añadir:**
```
/* DESIGN TOKEN SYSTEM - Mantener como está */

/* APLICACIÓN VISUAL RELUME - USANDO DESIGN TOKENS */
@import url('./styles/relume-components.css');
@import url('./styles/section-color-schemes.css');
```

## ⚡ CRITERIOS DE ÉXITO CON DESIGN TOKENS

### TÉCNICOS:
- [ ] Todos los estilos usando var(--variable-name)
- [ ] CERO valores hardcodeados (#FFFFFF, 56px, etc.)
- [ ] Variables de Variables.pdf aplicadas correctamente
- [ ] Typography.pdf aplicado con design tokens
- [ ] Spacing usando var(--spacing-X)
- [ ] Shadows usando var(--shadow-X)

### VISUALES:
- [ ] Hero: background: var(--primary-lightest) ✓
- [ ] Worksys: color: var(--primary) ✓  
- [ ] Expersys: color: var(--secondary) ✓
- [ ] Eficiencia: background: var(--primary-lightest) ✓
- [ ] Escalabilidad: background: var(--secondary-lightest) ✓
- [ ] Cumplimiento: background: var(--gold-lightest) ✓
- [ ] FAQ: background: var(--neutral-darker) ✓
- [ ] Footer: background: var(--neutral-darkest) ✓

## 🚨 RESTRICCIONES DESIGN TOKEN

1. **OBLIGATORIO:** Usar var(--variable-name) para TODOS los estilos
2. **PROHIBIDO:** Valores hardcodeados (#009CA6, 56px, etc.)
3. **PRESERVAR:** Sistema de design tokens existente intacto
4. **FORZAR:** Design tokens sobre cualquier estilo de Relume
5. **MANTENER:** Estructura de variables según Variables.pdf

## 📋 ENTREGABLES BASADOS EN DESIGN TOKENS

1. `src/styles/relume-components.css` - Clases U* usando var(--design-tokens)
2. `src/styles/section-color-schemes.css` - Color schemes usando design tokens
3. `src/index.css` - Imports finales (mantener design tokens intactos)

**RESULTADO:** Apariencia visual de paste.txt pero 100% powered by design token system

**VALIDACIÓN:** Todos los colores, tipografía, spacing, shadows deben usar var(--variable-name)
```

Este prompt corregido se enfoca en que **todo use design tokens** como lo tienes configurado, sin valores hardcodeados y manteniendo tu sistema de Variables.pdf  como la única fuente de verdad para colores y estilos.