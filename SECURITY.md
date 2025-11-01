# Arquitectura de Seguridad Web - Entersys

## Content Security Policy (CSP)

### Arquitectura Profesional Inline

La configuración de CSP está organizada dentro de `nginx.conf` con documentación inline clara para facilitar:

- **Mantenibilidad**: CSP organizada con comentarios por categoría
- **Auditoría**: Fácil revisión de qué dominios están permitidos y por qué
- **Escalabilidad**: Agregar nuevas integraciones en la política CSP
- **Documentación**: Cada categoría está documentada inline con su propósito
- **Simplicidad**: Todo en un solo archivo, configuración directa y confiable

### Estructura del CSP

```
nginx.conf (location / y location = /index.html)
├── ANALYTICS & TRACKING: GA4, Facebook Pixel, Smartlook
├── FORMS: Smartsheet
├── CDN: Cloudflare, Google Fonts
├── MEDIA: YouTube
└── API: Entersys Backend
```

La política CSP completa está en línea 63 (location /) y línea 83 (location = /index.html).

### Agregar Nuevos Dominios

Para agregar un nuevo dominio, edita la línea 63 del `nginx.conf` y agrega el dominio en la directiva correspondiente:

#### Para Analytics/Tracking:
```nginx
# En script-src y connect-src, agregar el nuevo dominio:
script-src '...' https://nuevo-tracking.com;
connect-src '...' https://api.nuevo-tracking.com;
```

#### Para un Nuevo CDN:
```nginx
# En script-src o style-src según corresponda:
script-src '...' https://nuevo-cdn.com;
```

**IMPORTANTE**: Después de modificar la CSP en `location /`, copiar la misma política a `location = /index.html` (línea 83) para mantener consistencia.

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
- **Trimestral**: Auditar dominios en `nginx.conf` (sección CSP líneas 22-105)
- **Por cambio**: Al agregar nuevas integraciones
- **Anual**: Revisar mejores prácticas de CSP

### Changelog de Seguridad
- **2025-11-01**: Arquitectura modular inline implementada (CSP variables en nginx.conf)
- **2025-11-01**: Smartlook agregado con dominios cloud (*.smartlook.com, *.smartlook.cloud)
- **2025-11-01**: Facebook Pixel integrado (connect.facebook.net, www.facebook.com)
- **2025-11-01**: Service worker cleanup automático implementado
- **2025-10**: CSP inicial con GA4 y Smartsheet

## Recursos

- [MDN CSP Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [CSP Evaluator (Google)](https://csp-evaluator.withgoogle.com/)
- [Security Headers Checker](https://securityheaders.com/)

## Contacto

Para preguntas sobre seguridad: dev@entersys.mx
