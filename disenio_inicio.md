Eres un DISEÑADOR WEB EXPERTO y necesito que apliques con PRECISIÓN ABSOLUTA todos los estilos de mi design system basado en los PDFs de especificaciones técnicas. NO modifiques ninguna estructura HTML, solo aplica estilos visuales.

## 🎯 VARIABLES CSS OBLIGATORIAS (Design Tokens):

```
:root {
  /* COLORES - Variables.pdf */
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
  
  /* Desktop Sizes */
  --h1-desktop: 56px; --h1-lh-desktop: 120%;
  --h2-desktop: 48px; --h2-lh-desktop: 120%;
  --h3-desktop: 40px; --h3-lh-desktop: 120%;
  --h4-desktop: 32px; --h4-lh-desktop: 130%;
  --h5-desktop: 24px; --h5-lh-desktop: 130%;
  --h6-desktop: 20px; --h6-lh-desktop: 140%;
  
  /* Mobile Sizes */
  --h1-mobile: 40px; --h1-lh-mobile: 120%;
  --h2-mobile: 36px; --h2-lh-mobile: 120%;
  --h3-mobile: 32px; --h3-lh-mobile: 120%;
  --h4-mobile: 24px; --h4-lh-mobile: 140%;
  --h5-mobile: 20px; --h5-lh-mobile: 140%;
  --h6-mobile: 18px; --h6-lh-mobile: 140%;
  
  /* Body Text */
  --text-large: 18px; --text-large-lh: 150%;
  --text-medium: 16px; --text-medium-lh: 150%;
  --text-regular: 14px; --text-regular-lh: 150%;
  --text-small: 12px; --text-small-lh: 150%;
  
  /* Weights */
  --font-light: 300; --font-normal: 400; --font-medium: 500;
  --font-semibold: 600; --font-bold: 700; --font-extrabold: 800;

  /* SOMBRAS - Shadows.pdf */
  --shadow-xxsmall: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-xsmall: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-small: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
  --shadow-medium: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
  --shadow-large: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04);
  --shadow-xlarge: 0 25px 50px rgba(0, 0, 0, 0.15), 0 15px 20px rgba(0, 0, 0, 0.1);
  --shadow-xxlarge: 0 35px 60px rgba(0, 0, 0, 0.2), 0 20px 30px rgba(0, 0, 0, 0.12);

  /* RADIUS - Radius.pdf */
  --radius-small: 4px;   /* Elementos < 4 columnas */
  --radius-medium: 8px;  /* Elementos 2-3 columnas */
  --radius-large: 12px;  /* Elementos 1-2 columnas */

  /* SPACING */
  --spacing-1: 4px; --spacing-2: 8px; --spacing-3: 12px; --spacing-4: 16px;
  --spacing-5: 20px; --spacing-6: 24px; --spacing-8: 32px; --spacing-10: 40px;
  --spacing-12: 48px; --spacing-16: 64px; --spacing-20: 80px; --spacing-24: 96px;
  --spacing-32: 128px;

  /* TRANSICIONES */
  --transition-fast: 150ms ease-in-out;
  --transition-normal: 200ms ease-in-out;
  --transition-slow: 300ms ease-in-out;
}
```

## 📋 ESPECIFICACIONES POR SECCIÓN:

### 🏠 1. HEADER/NAVEGACIÓN
```
.header {
  background: var(--neutral-white);
  border-bottom: 1px solid var(--neutral-lighter);
  padding: var(--spacing-4) var(--spacing-6);
}

.header-logo { color: var(--primary); }
.header-nav-link { 
  font: var(--font-medium) var(--text-medium)/var(--text-medium-lh) var(--font-body);
  color: var(--neutral-darkest);
}
.header-nav-link:hover { color: var(--primary); }
```

### 🌟 2. HERO SECTION
```
.hero-section {
  background: var(--primary-lightest);
  padding: 120px var(--spacing-6) 80px;
  text-align: center;
}

.hero-title {
  font: var(--font-bold) var(--h1-desktop)/var(--h1-lh-desktop) var(--font-heading);
  color: var(--neutral-darkest);
  margin-bottom: var(--spacing-6);
}

.hero-subtitle {
  font: var(--font-normal) var(--text-large)/var(--text-large-lh) var(--font-body);
  color: var(--neutral-dark);
  margin-bottom: var(--spacing-8);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.btn-primary {
  background: var(--primary);
  color: var(--neutral-white);
  font: var(--font-semibold) var(--text-medium)/var(--text-medium-lh) var(--font-body);
  padding: 12px var(--spacing-8);
  border-radius: var(--radius-medium);
  border: none;
  transition: var(--transition-normal);
}
.btn-primary:hover { background: var(--primary-dark); }

.btn-secondary {
  background: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
  font: var(--font-semibold) var(--text-medium)/var(--text-medium-lh) var(--font-body);
  padding: 10px var(--spacing-8);
  border-radius: var(--radius-medium);
  transition: var(--transition-normal);
}
.btn-secondary:hover { background: var(--primary-lightest); }

/* MOBILE */
@media (max-width: 768px) {
  .hero-title { font-size: var(--h1-mobile); line-height: var(--h1-lh-mobile); }
}
```

### 🛠️ 3. SERVICIOS SECTION
```
.servicios-section {
  background: var(--neutral-white);
  padding: 100px var(--spacing-6);
}

.servicios-title {
  font: var(--font-bold) var(--h2-desktop)/var(--h2-lh-desktop) var(--font-heading);
  color: var(--neutral-darkest);
  text-align: center;
  margin-bottom: var(--spacing-4);
}

.servicios-subtitle {
  font: var(--font-normal) var(--text-medium)/var(--text-medium-lh) var(--font-body);
  color: var(--neutral-dark);
  text-align: center;
  margin-bottom: var(--spacing-12);
}

.service-card {
  background: var(--neutral-white);
  border: 1px solid var(--neutral-lighter);
  border-radius: var(--radius-large);
  padding: var(--spacing-8) var(--spacing-6);
  box-shadow: var(--shadow-small);
  transition: var(--transition-normal);
}
.service-card:hover { 
  box-shadow: var(--shadow-medium);
  transform: translateY(-2px);
}

.worksys-title { color: var(--primary); }
.expersys-title { color: var(--secondary); }

.service-card-title {
  font: var(--font-semibold) var(--h5-desktop)/var(--h5-lh-desktop) var(--font-heading);
  margin-bottom: var(--spacing-2);
}

.service-card-subtitle {
  font: var(--font-medium) var(--text-medium)/var(--text-medium-lh) var(--font-body);
  margin-bottom: var(--spacing-3);
}

.service-card-description {
  font: var(--font-normal) var(--text-regular)/var(--text-regular-lh) var(--font-body);
  color: var(--neutral);
  margin-bottom: var(--spacing-4);
}

.service-link {
  font: var(--font-medium) var(--text-regular)/var(--text-regular-lh) var(--font-body);
  color: var(--primary);
  text-decoration: none;
}
.service-link:hover { color: var(--primary-dark); }

/* MOBILE */
@media (max-width: 768px) {
  .servicios-title { font-size: var(--h2-mobile); line-height: var(--h2-lh-mobile); }
  .service-card-title { font-size: var(--h5-mobile); line-height: var(--h5-lh-mobile); }
}
```

### 🎯 4. DIFERENCIADORES SECTION
```
.diferenciadores-section {
  background: var(--neutral-white);
  padding: 100px var(--spacing-6);
}

.diferenciadores-title {
  font: var(--font-bold) var(--h2-desktop)/var(--h2-lh-desktop) var(--font-heading);
  color: var(--neutral-darkest);
  text-align: center;
  margin-bottom: var(--spacing-4);
}

.diferenciadores-subtitle {
  font: var(--font-normal) var(--text-medium)/var(--text-medium-lh) var(--font-body);
  color: var(--neutral-dark);
  text-align: center;
  margin-bottom: var(--spacing-12);
}

/* CARDS ESPECÍFICAS */
.card-eficiencia {
  background: var(--primary-lightest);
  border-radius: var(--radius-large);
  padding: var(--spacing-8);
  box-shadow: var(--shadow-small);
}
.card-eficiencia .icon { color: var(--primary); font-size: 32px; }
.card-eficiencia .title { 
  font: var(--font-semibold) var(--h5-desktop)/var(--h5-lh-desktop) var(--font-heading);
  color: var(--primary-dark);
  margin: var(--spacing-4) 0 var(--spacing-2);
}

.card-escalabilidad {
  background: var(--secondary-lightest);
  border-radius: var(--radius-large);
  padding: var(--spacing-8);
  box-shadow: var(--shadow-small);
}
.card-escalabilidad .icon { color: var(--secondary); font-size: 32px; }
.card-escalabilidad .title {
  font: var(--font-semibold) var(--h5-desktop)/var(--h5-lh-desktop) var(--font-heading);
  color: var(--secondary-dark);
  margin: var(--spacing-4) 0 var(--spacing-2);
}

.card-cumplimiento {
  background: var(--gold-lightest);
  border-radius: var(--radius-large);
  padding: var(--spacing-8);
  box-shadow: var(--shadow-small);
}
.card-cumplimiento .icon { color: var(--gold); font-size: 32px; }
.card-cumplimiento .title {
  font: var(--font-semibold) var(--h5-desktop)/var(--h5-lh-desktop) var(--font-heading);
  color: var(--gold-dark);
  margin: var(--spacing-4) 0 var(--spacing-2);
}

.card-description {
  font: var(--font-normal) var(--text-regular)/var(--text-regular-lh) var(--font-body);
  color: var(--neutral-dark);
  margin-bottom: var(--spacing-4);
}

.card-link {
  font: var(--font-medium) var(--text-regular)/var(--text-regular-lh) var(--font-body);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-1);
}

/* MOBILE */
@media (max-width: 768px) {
  .diferenciadores-title { font-size: var(--h2-mobile); line-height: var(--h2-lh-mobile); }
}
```

### 💎 5. PROPUESTA DE VALOR SECTION
```
.propuesta-section {
  background: var(--primary);
  color: var(--neutral-white);
  padding: 100px var(--spacing-6);
  text-align: center;
}

.propuesta-title {
  font: var(--font-bold) var(--h2-desktop)/var(--h2-lh-desktop) var(--font-heading);
  color: var(--neutral-white);
  margin-bottom: var(--spacing-4);
}

.propuesta-subtitle {
  font: var(--font-normal) var(--text-large)/var(--text-large-lh) var(--font-body);
  color: var(--primary-lightest);
  margin-bottom: var(--spacing-8);
}

.btn-white {
  background: var(--neutral-white);
  color: var(--primary);
  font: var(--font-semibold) var(--text-medium)/var(--text-medium-lh) var(--font-body);
  padding: 12px var(--spacing-8);
  border-radius: var(--radius-medium);
  border: none;
  transition: var(--transition-normal);
}
.btn-white:hover { background: var(--primary-lightest); }

/* MOBILE */
@media (max-width: 768px) {
  .propuesta-title { font-size: var(--h2-mobile); line-height: var(--h2-lh-mobile); }
}
```

### ❓ 6. FAQ SECTION
```
.faq-section {
  background: var(--neutral-darker);
  padding: 100px var(--spacing-6);
}

.faq-title {
  font: var(--font-bold) var(--h2-desktop)/var(--h2-lh-desktop) var(--font-heading);
  color: var(--neutral-white);
  text-align: center;
  margin-bottom: var(--spacing-4);
}

.faq-subtitle {
  font: var(--font-normal) var(--text-medium)/var(--text-medium-lh) var(--font-body);
  color: var(--neutral-lighter);
  text-align: center;
  margin-bottom: var(--spacing-12);
}

.faq-item {
  border-bottom: 1px solid var(--neutral);
  padding: var(--spacing-6) 0;
  transition: var(--transition-normal);
}
.faq-item:hover { background: rgba(255,255,255,0.05); }

.faq-question {
  font: var(--font-semibold) var(--text-large)/140% var(--font-body);
  color: var(--neutral-white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.faq-icon {
  color: var(--primary);
  font-size: 24px;
  transition: var(--transition-fast);
}

.faq-answer {
  font: var(--font-normal) var(--text-medium)/var(--text-medium-lh) var(--font-body);
  color: var(--neutral-lighter);
  padding-top: var(--spacing-4);
  max-height: 0;
  overflow: hidden;
  transition: max-height var(--transition-slow);
}
.faq-answer.open { max-height: 200px; }

/* MOBILE */
@media (max-width: 768px) {
  .faq-title { font-size: var(--h2-mobile); line-height: var(--h2-lh-mobile); }
  .faq-question { font-size: var(--text-medium); }
}
```

### 📞 7. CTA FINAL SECTION
```
.cta-final-section {
  background: var(--secondary);
  padding: 100px var(--spacing-6);
  text-align: center;
}

.cta-final-title {
  font: var(--font-bold) var(--h2-desktop)/var(--h2-lh-desktop) var(--font-heading);
  color: var(--neutral-white);
  margin-bottom: var(--spacing-4);
}

.cta-final-text {
  font: var(--font-normal) var(--text-large)/var(--text-large-lh) var(--font-body);
  color: var(--secondary-lighter);
  margin-bottom: var(--spacing-8);
}

.btn-white-secondary {
  background: var(--neutral-white);
  color: var(--secondary);
  font: var(--font-semibold) var(--text-medium)/var(--text-medium-lh) var(--font-body);
  padding: 12px var(--spacing-8);
  border-radius: var(--radius-medium);
  border: none;
  transition: var(--transition-normal);
}
.btn-white-secondary:hover { background: var(--secondary-lightest); }

/* MOBILE */
@media (max-width: 768px) {
  .cta-final-title { font-size: var(--h2-mobile); line-height: var(--h2-lh-mobile); }
}
```

### 🔗 8. FOOTER
```
.footer {
  background: var(--neutral-darkest);
  padding: var(--spacing-12) var(--spacing-6) var(--spacing-6);
}

.footer-logo { color: var(--primary); }

.footer-link {
  font: var(--font-normal) var(--text-medium)/var(--text-medium-lh) var(--font-body);
  color: var(--neutral-lighter);
  text-decoration: none;
  transition: var(--transition-fast);
}
.footer-link:hover { color: var(--primary); }

.footer-text {
  font: var(--font-normal) var(--text-regular)/var(--text-regular-lh) var(--font-body);
  color: var(--neutral);
}

.footer-divider {
  border-color: var(--neutral-dark);
  margin: var(--spacing-8) 0 var(--spacing-4);
}
```

## ⚡ INSTRUCCIONES CRÍTICAS:

1. **USA EXCLUSIVAMENTE** las variables CSS definidas
2. **NO CAMBIES** ninguna estructura HTML existente
3. **APLICA EXACTAMENTE** estos estilos sin modificaciones
4. **VERIFICA** que cada sección use el color scheme correcto
5. **INCLUYE** todas las transiciones y hover states
6. **ASEGURA** responsive design en todos los elementos
7. **MANTÉN** las proporciones y spacing exactos
8. **USA** las sombras específicas según la jerarquía
9. **APLICA** border-radius según las especificaciones
10. **RESPETA** la tipografía exacta: familia, peso, tamaño, line-height

Este CSS debe aplicarse manteniendo PERFECTA FIDELIDAD a los PDFs de Variables, Typography, Shadows y Radius sin cambiar formas ni estructura.