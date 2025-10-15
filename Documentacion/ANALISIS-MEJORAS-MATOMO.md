# Análisis y Mejoras de Matomo Analytics

**Fecha:** 13 de Octubre de 2025
**Servidor:** prod-server (34.59.193.54)
**URL Matomo:** https://analytics.entersys.mx
**Versión:** Matomo 5.5.0
**Sitio Web:** https://www.entersys.mx

---

## Índice

1. [Estado Actual](#1-estado-actual)
2. [Implementación en el Código](#2-implementación-en-el-código)
3. [¿Qué Está Funcionando Bien?](#3-qué-está-funcionando-bien)
4. [Problemas Identificados](#4-problemas-identificados)
5. [Mejoras Recomendadas (Prioritizadas)](#5-mejoras-recomendadas-prioritizadas)
6. [Implementación de Mejoras](#6-implementación-de-mejoras)
7. [Configuración Avanzada](#7-configuración-avanzada)
8. [Checklist de Optimización](#8-checklist-de-optimización)

---

## 1. Estado Actual

### Servidor y Contenedor

```yaml
Contenedor: matomo_app
Imagen: matomo:5.5.0
Estado: Running (33+ horas)
Base de Datos: matomo_mysql (MySQL 8.0, healthy)
URL: https://analytics.entersys.mx
Site ID: 1
```

### Variables de Entorno Configuradas

```bash
# Producción
VITE_MATOMO_URL=https://analytics.entersys.mx
VITE_MATOMO_SITE_ID=1
VITE_ENABLE_ANALYTICS=true
```

### Tracking Actual

**✅ Implementado:**
- Page views (todas las páginas)
- Form submissions (formulario de contacto)
- WhatsApp clicks (botón flotante)
- Button clicks (CTAs)
- Conversiones básicas
- Link tracking automático
- Debug logging

**❌ No Implementado:**
- Custom dimensions
- E-commerce tracking
- Content tracking (media, descargas)
- Event categories estructuradas
- Heatmaps/Session recording
- A/B testing
- Tag Manager de Matomo
- Archiving automático optimizado

---

## 2. Implementación en el Código

### Archivo Principal: `src/services/analytics.js`

**Clase:** `AnalyticsService`

**Métodos implementados:**
```javascript
initialize()                    // ✅ Carga script y configura Matomo
trackPageView(title)           // ✅ Track de páginas
trackEvent(cat, act, name, val) // ✅ Track de eventos
trackWhatsAppClick(source)     // ✅ Track de WhatsApp
trackFormSubmission(formName)  // ✅ Track de formularios
trackButtonClick(button, sect) // ✅ Track de botones
trackConversion(name, value)   // ✅ Track de conversiones
testConnection()               // ✅ Debug tool
```

**Expuesto globalmente:**
```javascript
window.entersysAnalytics = {
  trackEvent, trackWhatsApp, trackForm,
  trackButton, trackPageView, testConnection,
  initialize, getStatus
}
```

### Hook Alternativo: `src/hooks/useAnalytics.js`

**⚠️ PROBLEMA: Código duplicado**

Este hook tiene una implementación similar pero independiente de `analytics.js`. Esto genera:
- Doble carga del script de Matomo (potencial)
- Inconsistencia en tracking
- Confusión sobre cuál usar

### Componentes con Tracking

**21 componentes** implementan tracking:
- `App.jsx` - Inicialización global
- `contact-06.jsx` - Formulario de contacto
- `WhatsAppFloatButton.jsx` - Botón WhatsApp
- Múltiples páginas de productos (Worksys, Expersys)
- CTAs y layouts

---

## 3. ¿Qué Está Funcionando Bien?

### ✅ Fortalezas Actuales

1. **Implementación Básica Sólida**
   - Tracking de page views funcional
   - Script se carga correctamente
   - SSL configurado (HTTPS)

2. **Tracking de Conversiones**
   - Formularios de contacto tracked
   - WhatsApp clicks tracked
   - CTAs importantes tracked

3. **Debug Tools**
   - `window.entersysAnalytics.testConnection()`
   - Logging detallado en consola
   - Fácil troubleshooting

4. **Integración con Mautic**
   - Dual tracking (Matomo + Mautic)
   - Conversiones registradas en ambos

5. **Performance**
   - Script async (no bloquea rendering)
   - Carga lazy en algunos componentes

---

## 4. Problemas Identificados

### 🔴 Críticos

#### 4.1 Intentos de Ataque Detectados

Los logs muestran **cientos de intentos** de acceso a archivos `.env`:

```
GET //.env HTTP/1.1" 404
GET /.env.backup HTTP/1.1" 404
GET //.env.production HTTP/1.1" 404
```

**Riesgo:** Alguien está intentando obtener credenciales de la base de datos.

**Solución requerida:** Mejorar seguridad (ver sección 5.1)

#### 4.2 Debug Mode Siempre Activo

```javascript
// src/services/analytics.js:18
this.debug = true; // Siempre debug para troubleshooting
```

**Problema:**
- Console logs en producción (afecta performance)
- Información sensible visible
- Consume memoria del navegador

**Solución:** Condicionar al environment

#### 4.3 Código Duplicado

Dos implementaciones de tracking:
- `src/services/analytics.js` (principal)
- `src/hooks/useAnalytics.js` (alternativo)

**Problema:**
- Riesgo de doble tracking
- Mantenimiento difícil
- Inconsistencia

### 🟡 Importantes

#### 4.4 No Hay Custom Dimensions

Las custom dimensions permiten segmentar usuarios por:
- Tipo de empresa (B2B, B2C)
- Industria
- Tamaño de empresa
- Etapa del funnel
- User ID (sincronizado con Mautic)

**Impacto:** No puedes segmentar tu audiencia efectivamente.

#### 4.5 No Hay Content Tracking

No se trackea:
- Descarga de PDFs (brochures, casos de éxito)
- Reproducción de videos
- Clics en imágenes
- Scroll depth

**Impacto:** No sabes qué contenido genera engagement.

#### 4.6 Event Categories No Estructuradas

Categorías actuales:
```javascript
'CTA', 'Form', 'Conversion', 'Test'
```

**Problema:** Muy genérico, difícil de analizar.

**Mejor estructura:**
```javascript
'Lead Generation / Form / Contact Form'
'Engagement / CTA / WhatsApp Click'
'Content / Video / Product Demo Play'
```

#### 4.7 No Hay Heatmaps ni Session Recording

Matomo tiene plugins para:
- Heatmaps (dónde hacen clic)
- Session Recording (grabación de sesiones)
- Form Analytics (campos abandonados)

**Impacto:** No ves **cómo** interactúan los usuarios.

### 🟢 Mejoras Deseables

#### 4.8 No Hay A/B Testing

Matomo tiene A/B testing integrado para probar:
- Diferentes CTAs
- Variaciones de landing pages
- Colores de botones
- Headlines

#### 4.9 No Usa Tag Manager de Matomo

Tag Manager permite agregar/modificar tracking sin editar código.

#### 4.10 Archiving No Optimizado

Matomo necesita archiving para reportes rápidos. No está configurado el cron job optimizado.

---

## 5. Mejoras Recomendadas (Prioritizadas)

### 🔴 FASE 1: Seguridad y Estabilidad (Esta semana)

#### 5.1 Mejorar Seguridad del Contenedor Matomo

**Problema:** Intentos de ataque detectados

**Solución:**

```bash
# Conectarse al servidor
gcloud compute ssh prod-server --zone=us-central1-c

# Editar docker-compose de Matomo
cd /srv/servicios/matomo
```

Agregar al `docker-compose.yml`:

```yaml
services:
  matomo_app:
    # ... configuración existente
    environment:
      # ... variables existentes
      - PHP_INI_SCAN_DIR=/usr/local/etc/php/conf.d
    volumes:
      # ... volúmenes existentes
      - ./security.ini:/usr/local/etc/php/conf.d/security.ini:ro
```

Crear archivo `security.ini`:

```ini
; Desactivar funciones peligrosas
disable_functions = exec,passthru,shell_exec,system,proc_open,popen,curl_exec,curl_multi_exec,parse_ini_file,show_source

; Límites de seguridad
expose_php = Off
display_errors = Off
log_errors = On
error_log = /var/log/php_errors.log

; Límites de upload
upload_max_filesize = 10M
post_max_size = 10M
max_execution_time = 30
max_input_time = 60
memory_limit = 512M
```

Mejorar `.htaccess` del contenedor:

```bash
# Acceder al contenedor
docker exec -it matomo_app bash

# Crear/editar .htaccess de seguridad
cat >> /var/www/html/.htaccess << 'EOF'
# Bloquear acceso a archivos sensibles
<FilesMatch "(\.env|\.log|\.ini|config\.ini\.php|composer\.(json|lock))$">
  Require all denied
</FilesMatch>

# Bloquear bots maliciosos
<IfModule mod_rewrite.c>
    RewriteEngine On

    # Bloquear intentos de acceso a .env
    RewriteCond %{REQUEST_URI} ^.*\.(env|git|svn|htpasswd|htaccess).*$ [NC]
    RewriteRule .* - [F,L]

    # Bloquear SQL injection attempts
    RewriteCond %{QUERY_STRING} [a-zA-Z0-9_]=http:// [OR]
    RewriteCond %{QUERY_STRING} [a-zA-Z0-9_]=(\.\.//?)+ [OR]
    RewriteCond %{QUERY_STRING} [a-zA-Z0-9_]=/([a-z0-9_.]//?)+ [NC]
    RewriteRule .* - [F,L]
</IfModule>

# Headers de seguridad adicionales
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
    Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"
</IfModule>
EOF

exit
```

Reiniciar contenedor:

```bash
docker restart matomo_app
```

**Resultado esperado:**
- ❌ Intentos de acceso a .env bloqueados
- ✅ Headers de seguridad mejorados
- ✅ Funciones PHP peligrosas desactivadas

#### 5.2 Desactivar Debug Mode en Producción

**Editar:** `src/services/analytics.js`

```javascript
class AnalyticsService {
  constructor() {
    this.initialized = false;
    this.scriptLoaded = false;
    // Condicionar debug al environment
    this.debug = config.app.env === 'development' || config.app.debug;
  }

  // ... resto del código

  // Modificar todos los console.log para condicionarlos:
  log(message, ...args) {
    if (this.debug) {
      console.log(message, ...args);
    }
  }

  // Reemplazar en todos los métodos:
  // console.log(...) → this.log(...)
}
```

#### 5.3 Eliminar Código Duplicado

**Opción A:** Eliminar `useAnalytics.js` y usar solo `analyticsService`

```javascript
// src/hooks/useAnalytics.js - VERSIÓN NUEVA
import { useEffect } from 'react';
import { analyticsService } from '../services/analytics';

export const useAnalytics = () => {
  useEffect(() => {
    analyticsService.initialize();
  }, []);

  return {
    trackEvent: (...args) => analyticsService.trackEvent(...args),
    trackPageView: (...args) => analyticsService.trackPageView(...args),
    trackFormSubmission: (...args) => analyticsService.trackFormSubmission(...args),
    trackWhatsAppClick: (...args) => analyticsService.trackWhatsAppClick(...args),
    trackButtonClick: (...args) => analyticsService.trackButtonClick(...args),
  };
};
```

**Opción B:** Deprecar el hook y actualizar todos los componentes

Buscar y reemplazar en todos los componentes:
```javascript
// ANTES
import { useAnalytics } from '../hooks/useAnalytics';
const { trackEvent } = useAnalytics();

// DESPUÉS
import { analyticsService } from '../services/analytics';
analyticsService.trackEvent(...);
```

---

### 🟡 FASE 2: Tracking Avanzado (Próximas 2-4 semanas)

#### 5.4 Implementar Custom Dimensions

Custom Dimensions permiten segmentar usuarios.

**Paso 1:** Configurar en Matomo Dashboard

1. Login a https://analytics.entersys.mx
2. Ir a **Administration** → **Websites** → **Custom Dimensions**
3. Click **Add Custom Dimension**
4. Crear las siguientes dimensiones:

| Nombre | Scope | Active | ID |
|--------|-------|--------|-----|
| User Type | Visit | Yes | 1 |
| Industry | Visit | Yes | 2 |
| Company Size | Visit | Yes | 3 |
| Lead Source | Visit | Yes | 4 |
| Mautic Lead ID | Visitor | Yes | 5 |
| User Journey Stage | Visit | Yes | 6 |

**Paso 2:** Implementar en el código

Agregar método a `src/services/analytics.js`:

```javascript
class AnalyticsService {
  // ... métodos existentes

  /**
   * Set custom dimension
   * @param {number} id - ID de la dimensión (1-5)
   * @param {string} value - Valor de la dimensión
   */
  setCustomDimension(id, value) {
    try {
      if (!window._paq) {
        this.log('⚠️ Matomo not ready for custom dimension');
        return;
      }

      window._paq.push(['setCustomDimension', id, value]);
      this.log(`📊 Custom dimension ${id} set to:`, value);
    } catch (error) {
      console.error('❌ Error setting custom dimension:', error);
    }
  }

  /**
   * Set multiple custom dimensions at once
   */
  setCustomDimensions(dimensions) {
    Object.entries(dimensions).forEach(([id, value]) => {
      this.setCustomDimension(parseInt(id), value);
    });
  }

  /**
   * Track user with all available data
   */
  trackUserContext(userData) {
    const {
      userType = 'visitor',
      industry = 'unknown',
      companySize = 'unknown',
      leadSource = 'direct',
      mauticLeadId = null,
      journeyStage = 'awareness'
    } = userData;

    this.setCustomDimensions({
      1: userType,           // User Type
      2: industry,           // Industry
      3: companySize,        // Company Size
      4: leadSource,         // Lead Source
      5: mauticLeadId,       // Mautic Lead ID
      6: journeyStage        // User Journey Stage
    });

    this.log('✅ User context tracked:', userData);
  }
}
```

**Paso 3:** Usar en componentes

```javascript
// En formulario de contacto (contact-06.jsx)
const handleSubmit = async (e) => {
  e.preventDefault();

  // Configurar dimensiones personalizadas
  analyticsService.trackUserContext({
    userType: 'lead',
    industry: formData.industry || 'unknown',
    companySize: formData.companySize || 'unknown',
    leadSource: formData.source || 'website_contact_form',
    mauticLeadId: result.leadId, // Del response de Mautic
    journeyStage: 'consideration'
  });

  // Track el evento
  analyticsService.trackFormSubmission('contact_form');

  // ... resto del código
};
```

**Paso 4:** Sincronizar con Mautic

Cuando captures un lead en Mautic, actualizar las dimensiones:

```javascript
// Después de capturar lead en Mautic
const result = await mauticService.captureLead(formData);

if (result.success && result.leadId) {
  // Guardar Mautic Lead ID en Matomo
  analyticsService.setCustomDimension(5, result.leadId);

  // Guardar en localStorage para futuras visitas
  localStorage.setItem('mauticLeadId', result.leadId);
  localStorage.setItem('userType', 'lead');
}
```

#### 5.5 Implementar Content Tracking

Track descargas de PDFs, reproducción de videos, etc.

**Agregar método a `analytics.js`:**

```javascript
class AnalyticsService {
  // ... métodos existentes

  /**
   * Track media interaction
   */
  trackMedia(mediaType, action, mediaName, value = null) {
    this.trackEvent('Content', `${mediaType} ${action}`, mediaName, value);
  }

  /**
   * Track download
   */
  trackDownload(fileName, fileType = 'PDF') {
    this.trackEvent('Content', 'Download', `${fileType}: ${fileName}`);
    this.log(`📥 Download tracked: ${fileName}`);
  }

  /**
   * Track video interaction
   */
  trackVideo(action, videoName, timeInSeconds = null) {
    this.trackMedia('Video', action, videoName, timeInSeconds);
  }

  /**
   * Track scroll depth
   */
  trackScrollDepth(percentage) {
    if (percentage === 25 || percentage === 50 || percentage === 75 || percentage === 100) {
      this.trackEvent('Engagement', 'Scroll Depth', `${percentage}%`);
    }
  }

  /**
   * Setup automatic scroll tracking
   */
  setupScrollTracking() {
    const thresholds = [25, 50, 75, 100];
    const reached = new Set();

    const checkScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      thresholds.forEach(threshold => {
        if (scrollPercent >= threshold && !reached.has(threshold)) {
          reached.add(threshold);
          this.trackScrollDepth(threshold);
        }
      });
    };

    window.addEventListener('scroll', () => {
      requestAnimationFrame(checkScroll);
    }, { passive: true });

    this.log('✅ Scroll tracking enabled');
  }
}
```

**Usar en componentes:**

```javascript
// En cualquier página con PDFs descargables
<a
  href="/brochure.pdf"
  download
  onClick={() => analyticsService.trackDownload('Brochure Worksys', 'PDF')}
>
  Descargar Brochure
</a>

// Para videos
<video
  onPlay={() => analyticsService.trackVideo('Play', 'Demo de Worksys')}
  onPause={() => analyticsService.trackVideo('Pause', 'Demo de Worksys')}
  onEnded={() => analyticsService.trackVideo('Completed', 'Demo de Worksys')}
>
  <source src="demo.mp4" />
</video>
```

**Habilitar scroll tracking en App.jsx:**

```javascript
// src/App.jsx
useEffect(() => {
  analyticsService.initialize();
  analyticsService.setupScrollTracking(); // ← Agregar esta línea
  initWebVitals();
}, []);
```

#### 5.6 Mejorar Estructura de Categorías de Eventos

Implementar una nomenclatura consistente:

**Crear archivo:** `src/config/analytics-events.js`

```javascript
/**
 * Event tracking taxonomy para Matomo
 * Estructura: Category / Action / Name
 */
export const ANALYTICS_EVENTS = {
  // Lead Generation
  LEAD_GENERATION: {
    category: 'Lead Generation',
    actions: {
      FORM_SUBMIT: 'Form Submit',
      FORM_START: 'Form Start',
      FORM_ABANDON: 'Form Abandon',
      FIELD_ERROR: 'Field Error',
    },
    names: {
      CONTACT_FORM: 'Contact Form',
      DEMO_REQUEST: 'Demo Request Form',
      QUOTE_REQUEST: 'Quote Request Form',
    }
  },

  // Engagement
  ENGAGEMENT: {
    category: 'Engagement',
    actions: {
      CTA_CLICK: 'CTA Click',
      WHATSAPP_CLICK: 'WhatsApp Click',
      PHONE_CLICK: 'Phone Click',
      EMAIL_CLICK: 'Email Click',
      SOCIAL_CLICK: 'Social Media Click',
    },
    names: {
      HERO_CTA: 'Hero CTA',
      FOOTER_CTA: 'Footer CTA',
      STICKY_CTA: 'Sticky CTA',
      FLOAT_BUTTON: 'Float Button',
    }
  },

  // Content
  CONTENT: {
    category: 'Content',
    actions: {
      VIDEO_PLAY: 'Video Play',
      VIDEO_PAUSE: 'Video Pause',
      VIDEO_COMPLETE: 'Video Complete',
      DOWNLOAD: 'Download',
      SCROLL_DEPTH: 'Scroll Depth',
      READ_TIME: 'Read Time',
    }
  },

  // Navigation
  NAVIGATION: {
    category: 'Navigation',
    actions: {
      MENU_CLICK: 'Menu Click',
      BREADCRUMB_CLICK: 'Breadcrumb Click',
      SEARCH: 'Search',
      FILTER: 'Filter',
    }
  },

  // Conversions
  CONVERSIONS: {
    category: 'Conversion',
    actions: {
      DEMO_SCHEDULED: 'Demo Scheduled',
      QUOTE_SENT: 'Quote Sent',
      TRIAL_STARTED: 'Trial Started',
      CONTACT_MADE: 'Contact Made',
    }
  }
};

// Helper function para tracking consistente
export function trackAnalyticsEvent(eventGroup, action, name = null, value = null) {
  const category = ANALYTICS_EVENTS[eventGroup]?.category;
  const actionName = ANALYTICS_EVENTS[eventGroup]?.actions[action];

  if (!category || !actionName) {
    console.warn(`Invalid analytics event: ${eventGroup}.${action}`);
    return;
  }

  window.analyticsService?.trackEvent(category, actionName, name, value);
}
```

**Usar en componentes:**

```javascript
import { trackAnalyticsEvent } from '../config/analytics-events';

// En lugar de:
analyticsService.trackEvent('CTA', 'WhatsApp Click', 'float_button');

// Usar:
trackAnalyticsEvent('ENGAGEMENT', 'WHATSAPP_CLICK', 'Float Button');
```

---

### 🟢 FASE 3: Análisis Avanzado (1-3 meses)

#### 5.7 Instalar Heatmaps & Session Recording

**Heatmaps Premium** es un plugin de pago de Matomo ($199/año) que incluye:
- Click heatmaps
- Move heatmaps
- Scroll heatmaps
- Session recordings

**Alternativa Open Source:** Usar Hotjar (gratis hasta 35 sesiones/día)

**Opción 1: Plugin de Matomo (Recomendado si tienes presupuesto)**

```bash
# Acceder a Matomo Dashboard
# Administration → Marketplace → Search "Heatmap"
# Comprar e instalar el plugin
```

**Opción 2: Integrar Hotjar (Gratuito)**

```bash
# Registrarse en https://www.hotjar.com/
# Obtener tracking code
```

Agregar a `src/services/analytics.js`:

```javascript
class AnalyticsService {
  // ... métodos existentes

  /**
   * Initialize Hotjar for heatmaps/recordings
   */
  initializeHotjar() {
    const hotjarId = config.analytics.hotjar?.siteId;

    if (!hotjarId || config.app.env !== 'production') {
      return;
    }

    (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:hotjarId,hjsv:6};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');

    this.log('✅ Hotjar initialized');
  }
}
```

Llamar en inicialización:

```javascript
// src/App.jsx
useEffect(() => {
  analyticsService.initialize();
  analyticsService.initializeHotjar(); // ← Agregar
  analyticsService.setupScrollTracking();
  initWebVitals();
}, []);
```

#### 5.8 Configurar A/B Testing

Matomo tiene A/B Testing integrado (plugin premium $199/año).

**Alternativa Open Source:** Google Optimize (aunque fue descontinuado en Sep 2023)

**Mejor opción actual: A/B Testing Manual con Matomo**

Crear variantes de páginas y trackear cual convierte mejor:

```javascript
// Ejemplo: Probar 2 variantes de CTA
const ctaVariants = ['Solicitar Demo', 'Prueba Gratuita'];
const selectedVariant = Math.random() < 0.5 ? 0 : 1;

// Guardar variante en custom dimension
analyticsService.setCustomDimension(7, `CTA_Variant_${selectedVariant}`);

// Trackear si convierte
if (userConverted) {
  analyticsService.trackConversion(`CTA Variant ${selectedVariant} Conversion`, 1);
}
```

#### 5.9 Implementar Tag Manager de Matomo

Tag Manager permite agregar/modificar tags sin editar código.

**Instalación:**

1. En Matomo Dashboard: **Administration** → **Tag Manager**
2. Create Container → Website
3. Copiar el código del container

**Reemplazar script actual** en `analytics.js`:

```javascript
// En lugar de cargar matomo.js, cargar el Tag Manager
script.src = MATOMO_CONFIG.url + 'js/container_' + CONTAINER_ID + '.js';
```

**Beneficios:**
- Agregar Facebook Pixel sin tocar código
- Agregar Google Ads Conversion sin deploy
- Modificar tracking events desde UI
- Otros miembros del equipo pueden gestionar tags

---

## 6. Implementación de Mejoras

### 6.1 Roadmap de Implementación

#### Semana 1
- [x] Análisis completo de configuración actual
- [ ] Mejorar seguridad del contenedor
- [ ] Desactivar debug mode en producción
- [ ] Eliminar código duplicado

#### Semana 2-3
- [ ] Implementar custom dimensions
- [ ] Configurar content tracking (descargas, videos)
- [ ] Mejorar estructura de eventos

#### Semana 4-6
- [ ] Implementar scroll tracking
- [ ] Configurar heatmaps (Hotjar o Matomo plugin)
- [ ] Integrar Tag Manager

#### Mes 2-3
- [ ] Setup A/B testing
- [ ] Configurar archiving optimizado
- [ ] Integración bidireccional con Mautic
- [ ] Dashboard personalizado

### 6.2 Configuración de Archiving

El archiving de Matomo procesa los reportes. Sin configuración, se ejecuta cuando alguien visita el dashboard (lento).

**Configurar Cron Job:**

```bash
# Conectarse al servidor
gcloud compute ssh prod-server --zone=us-central1-c

# Crear script de archiving
sudo tee /srv/scripts/matomo-archive.sh > /dev/null << 'EOF'
#!/bin/bash
# Matomo Archiving Script
docker exec matomo_app php /var/www/html/console core:archive \
  --url=https://analytics.entersys.mx \
  --force-all-websites \
  --concurrent-requests-per-website=3
EOF

# Dar permisos
sudo chmod +x /srv/scripts/matomo-archive.sh

# Agregar a crontab (ejecutar cada hora)
sudo crontab -e
```

Agregar la línea:

```bash
5 * * * * /srv/scripts/matomo-archive.sh >> /var/log/matomo-archive.log 2>&1
```

**Configurar en Matomo:**

1. Login a https://analytics.entersys.mx
2. **Administration** → **System** → **General Settings**
3. **Archive Reports**: Set to "triggered via command"
4. Save

### 6.3 Integración Bidireccional Mautic ↔ Matomo

Actualmente Matomo y Mautic funcionan independientemente. Podemos sincronizarlos.

**Crear servicio de integración:**

`src/services/matomo-mautic-sync.js`

```javascript
import { analyticsService } from './analytics';
import { mauticService } from './mautic';

class MatomoMauticSync {

  /**
   * Sync visitor data from Matomo to Mautic
   */
  async syncVisitorToMautic() {
    try {
      // Get Matomo visitor ID
      const visitorId = window._paq?.push(['getVisitorId']);

      // Get lead email from localStorage
      const leadEmail = localStorage.getItem('leadEmail');

      if (visitorId && leadEmail) {
        // Update Mautic contact with Matomo visitor ID
        await mauticService.updateContact(leadEmail, {
          matomoVisitorId: visitorId
        });

        console.log('✅ Synced Matomo visitor to Mautic');
      }
    } catch (error) {
      console.error('❌ Error syncing visitor:', error);
    }
  }

  /**
   * Track Mautic events in Matomo
   */
  trackMauticEvent(eventType, eventData) {
    analyticsService.trackEvent(
      'Mautic Integration',
      eventType,
      JSON.stringify(eventData)
    );
  }

  /**
   * Setup bidirectional sync
   */
  initialize() {
    // Sync visitor after Matomo loads
    window.addEventListener('load', () => {
      setTimeout(() => this.syncVisitorToMautic(), 2000);
    });

    // Listen for Mautic events
    window.addEventListener('mauticFormSubmit', (e) => {
      this.trackMauticEvent('Form Submit', e.detail);
    });
  }
}

export const matomoMauticSync = new MatomoMauticSync();
```

Inicializar en `App.jsx`:

```javascript
import { matomoMauticSync } from './services/matomo-mautic-sync';

useEffect(() => {
  analyticsService.initialize();
  matomoMauticSync.initialize(); // ← Agregar
  initWebVitals();
}, []);
```

---

## 7. Configuración Avanzada

### 7.1 Goals (Objetivos) en Matomo

Los Goals permiten medir conversiones específicas.

**Configurar Goals:**

1. Login a https://analytics.entersys.mx
2. **Administration** → **Websites** → **Goals**
3. **Add a new goal**

**Goals recomendados:**

| Goal Name | Triggered When | Value |
|-----------|----------------|-------|
| Contact Form Submission | Event Category = "Lead Generation", Action = "Form Submit" | 100 |
| WhatsApp Click | Event Category = "Engagement", Action = "WhatsApp Click" | 50 |
| Demo Request | URL contains "/demo-confirmacion" | 200 |
| Scroll to Bottom | Event Category = "Engagement", Action = "Scroll Depth", Name = "100%" | 10 |
| Video Watched | Event Category = "Content", Action = "Video Complete" | 30 |

**Trackear goals manualmente:**

```javascript
// Cuando se complete un goal
window._paq.push(['trackGoal', 1]); // Goal ID 1 = Contact Form
```

O usar el servicio:

```javascript
analyticsService.trackGoal = function(goalId, revenue = 0) {
  window._paq?.push(['trackGoal', goalId, revenue]);
  this.log(`🎯 Goal ${goalId} tracked`);
};
```

### 7.2 Funnels (Embudos)

Los Funnels muestran dónde abandonan los usuarios en un proceso de conversión.

**Plugin necesario:** Funnels (Premium, $199/año)

**Alternativa manual:** Crear goals para cada paso:

```javascript
// Paso 1: Visita landing page
analyticsService.trackEvent('Funnel', 'Step 1', 'Visited Landing Page');

// Paso 2: Inicia formulario
analyticsService.trackEvent('Funnel', 'Step 2', 'Started Contact Form');

// Paso 3: Completa formulario
analyticsService.trackEvent('Funnel', 'Step 3', 'Submitted Contact Form');

// Paso 4: Confirmación
analyticsService.trackEvent('Funnel', 'Step 4', 'Reached Thank You Page');
```

Luego analizar en Matomo con custom reports.

### 7.3 User Opt-out (Cumplimiento GDPR)

Para cumplir con GDPR, debes permitir que usuarios opten por no ser trackeados.

**Crear página:** `src/pages/PrivacyOptOut.jsx`

```javascript
import React, { useEffect } from 'react';

export default function PrivacyOptOut() {
  useEffect(() => {
    // Inject Matomo opt-out iframe
    const iframe = document.createElement('iframe');
    iframe.src = 'https://analytics.entersys.mx/index.php?module=CoreAdminHome&action=optOut&language=es';
    iframe.style.border = '0';
    iframe.style.height = '200px';
    iframe.style.width = '100%';

    document.getElementById('matomo-opt-out').appendChild(iframe);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">Configuración de Privacidad</h1>
      <p className="mb-4">
        Usamos Matomo Analytics para mejorar nuestro sitio web.
        Puedes optar por no ser rastreado:
      </p>
      <div id="matomo-opt-out" className="bg-gray-100 p-4 rounded"></div>
    </div>
  );
}
```

Agregar ruta en `App.jsx`:

```javascript
<Route path="/privacy-opt-out" element={<PrivacyOptOut />} />
```

### 7.4 Trackeo de Performance (Web Vitals)

Ya tienes `initWebVitals()` en tu código. Integrarlo con Matomo:

**Editar:** `src/utils/webVitals.js`

```javascript
import { analyticsService } from '../services/analytics';

export function initWebVitals() {
  if ('web-vital' in window) {
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      onCLS((metric) => {
        analyticsService.trackEvent('Web Vitals', 'CLS', null, Math.round(metric.value * 1000));
      });

      onFID((metric) => {
        analyticsService.trackEvent('Web Vitals', 'FID', null, Math.round(metric.value));
      });

      onFCP((metric) => {
        analyticsService.trackEvent('Web Vitals', 'FCP', null, Math.round(metric.value));
      });

      onLCP((metric) => {
        analyticsService.trackEvent('Web Vitals', 'LCP', null, Math.round(metric.value));
      });

      onTTFB((metric) => {
        analyticsService.trackEvent('Web Vitals', 'TTFB', null, Math.round(metric.value));
      });
    });
  }
}
```

---

## 8. Checklist de Optimización

### Seguridad
- [ ] Bloquear accesos a archivos .env
- [ ] Configurar security.ini
- [ ] Mejorar .htaccess con reglas anti-ataque
- [ ] Headers de seguridad adicionales
- [ ] Limitar intentos de login en Matomo
- [ ] 2FA para usuarios admin

### Performance
- [ ] Configurar archiving automático con cron
- [ ] Optimizar consultas de base de datos
- [ ] Archivar datos antiguos (>12 meses)
- [ ] Configurar cache de Matomo
- [ ] Limitar retención de logs (180 días)

### Tracking
- [ ] Desactivar debug mode en producción
- [ ] Eliminar código duplicado (useAnalytics.js)
- [ ] Implementar custom dimensions (6 dimensiones)
- [ ] Content tracking (PDFs, videos, scroll)
- [ ] Estructura consistente de eventos
- [ ] Goals configurados (5 goals)
- [ ] Tracking de web vitals

### Análisis
- [ ] Heatmaps/Session recording (Hotjar o plugin)
- [ ] Funnels de conversión
- [ ] A/B testing configurado
- [ ] Dashboard personalizado
- [ ] Reportes automáticos por email
- [ ] Integración con Mautic bidireccional

### Cumplimiento
- [ ] Página de opt-out
- [ ] Cookie consent banner
- [ ] Política de privacidad actualizada
- [ ] Anonimización de IPs
- [ ] Respeto de Do Not Track

### Mantenimiento
- [ ] Backup semanal de base de datos
- [ ] Actualización de Matomo (trimestral)
- [ ] Monitoreo de espacio en disco
- [ ] Limpieza de logs antiguos
- [ ] Revisión de plugins

---

## Resumen Ejecutivo

### Estado Actual: 7/10

**Fortalezas:**
- ✅ Tracking básico funcional
- ✅ Integración con Mautic
- ✅ SSL configurado
- ✅ Debug tools disponibles

**Debilidades:**
- ❌ Intentos de ataque detectados (seguridad)
- ❌ Debug mode siempre activo (performance)
- ❌ Código duplicado (mantenibilidad)
- ❌ No hay custom dimensions (análisis limitado)
- ❌ No hay heatmaps (UX insights)

### Prioridades Inmediatas

1. **🔴 CRÍTICO (Esta semana):**
   - Mejorar seguridad del contenedor
   - Desactivar debug en producción
   - Eliminar código duplicado

2. **🟡 IMPORTANTE (Próximo mes):**
   - Custom dimensions
   - Content tracking
   - Estructura de eventos

3. **🟢 DESEABLE (Próximos 3 meses):**
   - Heatmaps/recordings
   - A/B testing
   - Tag Manager

### ROI Estimado

**Inversión de tiempo:**
- Fase 1 (Seguridad): 4-6 horas
- Fase 2 (Tracking): 12-16 horas
- Fase 3 (Avanzado): 20-30 horas

**Inversión monetaria (opcional):**
- Heatmaps plugin: $199/año
- A/B Testing plugin: $199/año
- Tag Manager: Gratis

**Beneficios:**
- Mejor segmentación de usuarios
- Insights de comportamiento (heatmaps)
- Optimización de conversiones (A/B testing)
- Mayor seguridad
- Performance mejorada

---

**Última actualización:** 13 de Octubre de 2025
**Autor:** Claude Code
**Versión:** 1.0
