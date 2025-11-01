# Arquitectura de Seguridad Web - Entersys

## Content Security Policy (CSP)

### Arquitectura Modular

La configuración de CSP está separada en un archivo independiente (`csp-config.conf`) para facilitar:

- **Mantenibilidad**: Un solo lugar para gestionar todas las políticas de seguridad
- **Auditoría**: Fácil revisión de qué dominios están permitidos y por qué
- **Escalabilidad**: Agregar nuevas integraciones sin modificar nginx.conf principal
- **Documentación**: Cada categoría está documentada con su propósito

### Estructura del CSP

```
csp-config.conf
├── Analytics & Tracking (GA4, Facebook, Smartlook)
├── Forms & Integrations (Smartsheet)
├── CDN & External Resources (Cloudflare, Fonts)
├── Media & Embeds (YouTube)
├── API & Backend (Entersys APIs)
└── Directivas CSP completas
```

### Agregar Nuevos Dominios

#### Para Analytics/Tracking:
```nginx
# En csp-config.conf, línea 13-14
set $csp_analytics_scripts "... https://nuevo-tracking.com";
set $csp_analytics_connect "... https://api.nuevo-tracking.com";
```

#### Para un Nuevo CDN:
```nginx
# En csp-config.conf, línea 23-25
set $csp_cdn_scripts "... https://nuevo-cdn.com";
```

### Dominios Actuales Permitidos

#### Analytics & Tracking
- **Google Analytics 4**: `www.googletagmanager.com`, `www.google-analytics.com`, `analytics.entersys.mx`
- **Facebook Pixel**: `connect.facebook.net`, `www.facebook.com`
- **Smartlook**: `web-sdk.smartlook.com`, `*.smartlook.com`, `*.smartlook.cloud`

#### Forms & Integrations
- **Smartsheet**: `app.smartsheet.com`, `*.smartsheet.com`

#### CDN & Resources
- **Cloudflare**: `static.cloudflareinsights.com`, `cdnjs.cloudflare.com`
- **Google Fonts**: `fonts.googleapis.com`, `fonts.gstatic.com`

#### Media
- **YouTube**: `www.youtube.com`

#### Internal APIs
- **Entersys**: `api.entersys.mx`

## Directivas CSP Explicadas

### `script-src`
Controla qué scripts JavaScript pueden ejecutarse.

**Configuración actual**:
- ✅ `'self'`: Scripts propios
- ⚠️ `'unsafe-inline'`: Requerido por GTM y React (mejora futura: usar nonces)
- ⚠️ `'unsafe-eval'`: Requerido por algunas librerías de analytics
- ✅ Dominios específicos de analytics y CDNs

**Mejora futura**: Migrar a CSP Level 3 con nonces para eliminar `'unsafe-inline'`.

### `connect-src`
Controla conexiones AJAX/fetch/WebSocket.

**Por qué es importante**: Previene que scripts maliciosos envíen datos a servidores no autorizados.

### `img-src`
Controla fuentes de imágenes.

**Configuración**: `'self' data: https: blob:`
- Amplio para soportar CDNs, proxies de imágenes y data URIs
- Considerado seguro para imágenes

### `frame-src`
Controla qué páginas pueden ser cargadas en iframes.

**Uso actual**: YouTube embeds y Smartsheet forms

## Headers de Seguridad

### Strict-Transport-Security (HSTS)
```nginx
max-age=31536000; includeSubDomains; preload
```
- Fuerza HTTPS por 1 año
- Incluye todos los subdominios
- Pre-cargado en navegadores

### X-Frame-Options
```nginx
SAMEORIGIN
```
- Previene clickjacking
- Solo permite iframes del mismo origen

### X-Content-Type-Options
```nginx
nosniff
```
- Previene MIME-sniffing
- Reduce ataques XSS

### Permissions-Policy
```nginx
geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=()
```
- Deshabilita APIs sensibles por defecto
- Mejora privacidad del usuario

## Monitoreo y Debugging

### Ver Errores CSP en Consola
```javascript
// Chrome DevTools > Console
// Filtrar por: "Content Security Policy"
```

### Reportar Violaciones CSP (Futuro)
Agregar directiva `report-uri` para monitoreo centralizado:
```nginx
report-uri https://analytics.entersys.mx/csp-reports;
```

## Checklist para Nuevas Integraciones

Cuando agregues una nueva herramienta/servicio:

1. [ ] Identificar todos los dominios necesarios
2. [ ] Clasificar por tipo (analytics, cdn, api, etc.)
3. [ ] Agregar a `csp-config.conf` en la categoría correcta
4. [ ] Documentar el propósito en comentarios
5. [ ] Probar en staging antes de producción
6. [ ] Verificar consola del navegador (sin errores CSP)
7. [ ] Documentar en este archivo

## Notas de Seguridad

### ¿Por qué no bloqueamos `'unsafe-inline'`?
- Google Tag Manager requiere ejecución inline
- React en desarrollo usa evaluación dinámica
- **Mitigación**: CSP restrictivo en otros aspectos compensa
- **Plan futuro**: Migrar a CSP Level 3 con nonces cuando sea posible

### ¿Por qué permitimos `data:` y `blob:` en imágenes?
- Soporta canvas, gráficos generados dinámicamente
- Común en aplicaciones React modernas
- Riesgo limitado (solo imágenes, no scripts)

## Mantenimiento

### Frecuencia de Revisión
- **Trimestral**: Auditar dominios en `csp-config.conf`
- **Por cambio**: Al agregar nuevas integraciones
- **Anual**: Revisar mejores prácticas de CSP

### Changelog de Seguridad
- **2025-11-01**: Arquitectura modular implementada
- **2025-11-01**: Smartlook agregado con dominios cloud
- **2025-11-01**: Facebook Pixel integrado
- **2025-10**: CSP inicial con GA4 y Smartsheet

## Recursos

- [MDN CSP Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [CSP Evaluator (Google)](https://csp-evaluator.withgoogle.com/)
- [Security Headers Checker](https://securityheaders.com/)

## Contacto

Para preguntas sobre seguridad: dev@entersys.mx
