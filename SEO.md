# SEO y Control de Indexación - Entersys

Este documento describe cómo el sitio web de Entersys controla la indexación por motores de búsqueda en diferentes ambientes.

## 🎯 Objetivo

**Evitar que los ambientes de desarrollo y staging sean indexados por motores de búsqueda**, mientras se permite la indexación completa en producción.

---

## 🛡️ Protección Multi-Capa

### 1. Meta Tags en `<head>` del HTML

**Plugin**: `vite-plugins/html-meta-plugin.js`

Durante el build, se inyectan automáticamente meta tags en el `<head>` del HTML base:

#### Development/Staging
```html
<meta name="robots" content="noindex, nofollow">
<meta name="googlebot" content="noindex, nofollow">
<meta name="environment" content="development">
```

#### Production
No se inyecta nada (permite indexación natural).

---

### 2. Meta Tags en React (react-helmet-async)

**Componente**: `src/components/SEO/MetaTags.jsx`

El componente `MetaTags` detecta el ambiente dinámicamente y aplica la configuración correcta:

```javascript
const robotsContent = config.app.isProd
  ? 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
  : 'noindex, nofollow';
```

**Ventajas**:
- SEO dinámico por página
- Open Graph y Twitter Cards
- Schema.org structured data

---

### 3. Archivo `robots.txt`

**Plugin**: `vite-plugins/robots-plugin.js`

El plugin copia automáticamente el archivo `robots.txt` correcto según el ambiente:

| Ambiente | Archivo Origen | Comportamiento |
|----------|----------------|----------------|
| development | `robots.development.txt` | `Disallow: /` (bloquea TODO) |
| staging | `robots.staging.txt` | `Disallow: /` (bloquea TODO) |
| production | `robots.production.txt` | `Allow: /` (permite indexación) |

#### Ejemplo: robots.development.txt
```txt
# Bloquear TODOS los robots
User-agent: *
Disallow: /

# Bloquear crawlers específicos
User-agent: Googlebot
Disallow: /

User-agent: Bingbot
Disallow: /

# NO hay sitemap en desarrollo
```

#### Ejemplo: robots.production.txt
```txt
# Permitir acceso a todos los crawlers
User-agent: *
Allow: /

# Bloquear solo directorios sensibles
Disallow: /api/
Disallow: /*.json$

# Sitemap
Sitemap: https://entersys.mx/sitemap.xml
```

---

## 🔧 Configuración Técnica

### Plugins de Vite

#### 1. `robots-plugin.js`
```javascript
import { robotsPlugin } from './vite-plugins/robots-plugin.js'

export default defineConfig({
  plugins: [robotsPlugin()],
})
```

**Funcionalidad**:
- Detecta el modo de Vite (`development`, `staging`, `production`)
- Copia el archivo `robots.{mode}.txt` a `robots.txt`
- Muestra logs informativos durante el build

**Logs de ejemplo**:
```
🤖 Robots Plugin: Modo detectado = development
✅ Robots Plugin: robots.development.txt → robots.txt
   # robots.txt para DESARROLLO - Entersys
⚠️  Robots Plugin: INDEXACIÓN BLOQUEADA (ambiente: development)
   Los motores de búsqueda NO indexarán este sitio.
```

#### 2. `html-meta-plugin.js`
```javascript
import { htmlMetaPlugin } from './vite-plugins/html-meta-plugin.js'

export default defineConfig({
  plugins: [htmlMetaPlugin()],
})
```

**Funcionalidad**:
- Modifica el `index.html` durante el build
- Inyecta meta tags `noindex, nofollow` en dev/staging
- No modifica nada en producción

**Logs de ejemplo**:
```
🏷️  HTML Meta Plugin: Inyectando meta tags para modo = development
⚠️  HTML Meta Plugin: NOINDEX inyectado (ambiente: development)
   Meta tags agregados: robots, googlebot, environment
```

---

## ✅ Verificación

### 1. Verificar Meta Tags

Abrir DevTools y revisar el `<head>`:

**Development/Staging**:
```html
<head>
  <meta name="robots" content="noindex, nofollow">
  <meta name="googlebot" content="noindex, nofollow">
  <meta name="environment" content="development">
  ...
</head>
```

**Production**:
```html
<head>
  <meta name="robots" content="index, follow, max-snippet:-1, ...">
  ...
</head>
```

### 2. Verificar robots.txt

**Development**:
```bash
curl https://dev.entersys.mx/robots.txt
```
Debe mostrar:
```txt
User-agent: *
Disallow: /
```

**Production**:
```bash
curl https://entersys.mx/robots.txt
```
Debe mostrar:
```txt
User-agent: *
Allow: /
Sitemap: https://entersys.mx/sitemap.xml
```

### 3. Verificar en Google Search Console

**Development/Staging**:
- No debería aparecer en Search Console
- Si aparece, será marcado como "Excluido por etiqueta 'noindex'"

**Production**:
- Debe aparecer indexado normalmente
- Sitemap debe ser procesado

---

## 🚀 Scripts NPM y SEO

| Script | Ambiente | Indexación |
|--------|----------|------------|
| `npm run dev` | development | ❌ BLOQUEADA |
| `npm run dev:staging` | staging | ❌ BLOQUEADA |
| `npm run dev:prod` | production | ✅ PERMITIDA |
| `npm run build:dev` | development | ❌ BLOQUEADA |
| `npm run build:staging` | staging | ❌ BLOQUEADA |
| `npm run build:prod` | production | ✅ PERMITIDA |

---

## 🛠️ Troubleshooting

### Problema: Development está siendo indexado

**Solución**:
1. Verificar que el build usó el modo correcto:
   ```bash
   npm run build:dev  # NO npm run build
   ```
2. Verificar logs durante el build:
   ```
   ⚠️  Robots Plugin: INDEXACIÓN BLOQUEADA (ambiente: development)
   ```
3. Verificar robots.txt en el servidor:
   ```bash
   curl https://dev.entersys.mx/robots.txt
   ```
4. Verificar meta tags en el HTML:
   - Abrir DevTools → Elements → `<head>`
   - Buscar: `<meta name="robots" content="noindex, nofollow">`

### Problema: Production no está siendo indexado

**Solución**:
1. Verificar que el build usó modo production:
   ```bash
   npm run build:prod
   ```
2. Verificar logs durante el build:
   ```
   ✅ Robots Plugin: INDEXACIÓN PERMITIDA (producción)
   ```
3. Verificar robots.txt:
   ```bash
   curl https://entersys.mx/robots.txt
   # Debe mostrar: Allow: /
   ```
4. Enviar sitemap a Google Search Console

---

## 📊 Cobertura de Crawlers Bloqueados

Los archivos `robots.development.txt` y `robots.staging.txt` bloquean explícitamente:

### Search Engine Crawlers
- Googlebot
- Bingbot
- Slurp (Yahoo)
- DuckDuckBot
- Baiduspider
- YandexBot

### AI Crawlers
- OAI-SearchBot (OpenAI)
- ChatGPT-User
- PerplexityBot
- AndiBot
- ClaudeBot
- GoogleOtherBot
- Google-Extended
- CCBot
- anthropic-ai
- Claude-Web

---

## 🔐 Mejores Prácticas

1. ✅ **NUNCA** hacer deploy de staging/dev con `npm run build` (sin sufijo)
2. ✅ **SIEMPRE** usar scripts específicos: `build:dev`, `build:staging`, `build:prod`
3. ✅ **VERIFICAR** los logs del build antes de hacer deploy
4. ✅ **REVISAR** robots.txt después del deploy
5. ✅ **MONITOREAR** Google Search Console para URLs indexadas incorrectamente

---

## 📚 Referencias

- [Google: robots meta tag](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)
- [Google: robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- [Bing: robots meta tag](https://www.bing.com/webmasters/help/how-to-use-robots-meta-tag-6d4d02fa)
- [MDN: X-Robots-Tag HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Robots-Tag)

---

**Última actualización**: 2025-10-11
**Autor**: Equipo Entersys Dev
