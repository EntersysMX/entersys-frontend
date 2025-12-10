# 🔍 Google Search Console - Guía de Setup Paso a Paso

**Tiempo estimado**: 15 minutos
**Dificultad**: Fácil
**Prerequisito**: Acceso al dominio entersys.mx

---

## 📋 OPCIÓN 1: VERIFICACIÓN HTML TAG (Más Rápido - 10 min)

### Paso 1: Ir a Google Search Console

```
1. Abrir navegador en modo incógnito (Ctrl+Shift+N)
2. Ir a: https://search.google.com/search-console
3. Hacer login con tu cuenta Google de empresa
```

### Paso 2: Agregar Propiedad

```
1. Click en "Agregar propiedad" (esquina superior izquierda)

2. Elegir "Prefijo de URL"
   ├─ Pegar: https://www.entersys.mx
   └─ Click "Continuar"

   ❌ NO usar "Propiedad de dominio" (requiere DNS, más lento)
   ✅ SÍ usar "Prefijo de URL" (HTML tag, inmediato)
```

### Paso 3: Copiar Meta Tag

Google te mostrará varios métodos de verificación. Elegir **"Etiqueta HTML"**:

```html
<!-- Ejemplo del tag que te darán -->
<meta name="google-site-verification" content="ABC123XYZ..." />
```

**IMPORTANTE**: Copia TODO el tag, incluyendo `<meta` y `/>`.

### Paso 4: Agregar Tag al Sitio

Voy a agregarlo por ti ahora mismo en el código:

```javascript
// En: src/components/SEO/MetaTags.jsx
// Agregar después de la línea 48 (antes de closing Helmet)
```

**ESPERA** - Voy a hacer esto por ti, solo dame el tag que te dio Google.

---

## 📋 OPCIÓN 2: VERIFICACIÓN DNS (Más Confiable - 20 min)

### Paso 1-2: Igual que Opción 1

### Paso 3: Copiar TXT Record

En los métodos de verificación, elegir **"Proveedor de nombres de dominio"**:

Google te dará algo como:
```
TXT record:
google-site-verification=ABC123XYZ...
```

### Paso 4: Agregar a DNS

Depende de dónde compraste el dominio:

#### Si usas GoDaddy:
```
1. Ir a: https://dcc.godaddy.com/domains
2. Click en tu dominio "entersys.mx"
3. Scroll → "DNS" → "Administrar zonas DNS"
4. Click "Agregar"
5. Tipo: TXT
6. Nombre: @ (o dejar vacío)
7. Valor: google-site-verification=ABC123XYZ...
8. TTL: 1 hora
9. Click "Guardar"
10. Esperar 5-15 minutos
```

#### Si usas Cloudflare:
```
1. Ir a: https://dash.cloudflare.com
2. Seleccionar dominio "entersys.mx"
3. Click en "DNS" (menú superior)
4. Click "Add record"
5. Type: TXT
6. Name: @ (o entersys.mx)
7. Content: google-site-verification=ABC123XYZ...
8. TTL: Auto
9. Click "Save"
10. Esperar 5-10 minutos
```

#### Si usas otro proveedor:
```
Buscar en su panel:
├─ "DNS Settings"
├─ "DNS Records"
├─ "Zone File"
└─ Agregar TXT record igual que arriba
```

### Paso 5: Verificar en Google

```
1. Volver a Google Search Console
2. Click "Verificar"
3. Si sale error "No se pudo verificar":
   ├─ Esperar otros 10 minutos
   ├─ Click "Verificar" de nuevo
   └─ DNS puede tomar hasta 24h (raro)
```

---

## 🚀 DESPUÉS DE VERIFICAR (Hacer Inmediatamente)

### 1. Submit Sitemap

```
1. En Google Search Console, menú izquierdo
2. Click "Sitemaps"
3. En "Agregar un sitemap nuevo"
4. Pegar: sitemap.xml
5. Click "Enviar"

Deberías ver:
✅ Estado: Correcto
📊 URLs descubiertas: [número]

Si sale error:
├─ Verificar que existe: https://www.entersys.mx/sitemap.xml
└─ Esperar 24h y volver a intentar
```

### 2. Solicitar Indexación de Páginas Principales

```
1. En Search Console, parte superior: "Inspeccionar cualquier URL"
2. Pegar: https://www.entersys.mx/
3. Click buscar (icono lupa)
4. Esperar resultado
5. Click "Solicitar indexación"
6. Esperar 1-2 minutos
7. Repetir para cada página:
   ├─ https://www.entersys.mx/worksys
   ├─ https://www.entersys.mx/expersys
   ├─ https://www.entersys.mx/awalab
   └─ https://www.entersys.mx/clientes/coca-cola
```

**Esto acelera la indexación de días a horas.**

### 3. Configurar Preferencias

```
1. Menú izquierdo → "Configuración" (icono engranaje)

2. Verificar:
   ✅ Propiedad: https://www.entersys.mx
   ✅ Usuarios: Tu email con permisos de propietario

3. Agregar usuarios adicionales (opcional):
   ├─ Click "Agregar usuario"
   ├─ Email del usuario
   └─ Permisos: "Propietario" o "Completo"
```

---

## 📊 QUÉ VER EN SEARCH CONSOLE

### Primeras 24-48 horas:

```
Menú izquierdo → "Descripción general":

Probablemente verás:
├─ Total de clics: 0
├─ Total de impresiones: 0
├─ CTR promedio: 0%
└─ Posición promedio: -

✅ ESTO ES NORMAL - Google acaba de conocer tu sitio
```

### Después de 1 semana:

```
Menú izquierdo → "Rendimiento":

Buscar:
├─ Impresiones: ¿Hay al menos 1-10?
├─ Consultas: ¿Qué búsquedas están trayendo impresiones?
└─ Páginas: ¿Qué páginas se están mostrando?

Si hay 0 impresiones después de 7 días:
├─ Verificar robots.txt: https://www.entersys.mx/robots.txt
├─ Debe decir "Allow: /" NO "Disallow: /"
└─ Forzar indexación de nuevo (paso 2 arriba)
```

### Después de 2-4 semanas:

```
Menú → "Rendimiento" → Tab "Consultas":

Deberías ver keywords como:
├─ "Entersys"
├─ "Worksys"
├─ Quizás alguna keyword objetivo (posición 50-100)

Tab "Páginas":
├─ Verificar que /worksys, /expersys están indexadas
└─ Ver cuántas impresiones tiene cada una
```

---

## 🎯 MÉTRICAS A TRACKEAR (SEMANAL)

Crea este Google Sheet para tracking:

```
| Semana | Impressions | Clicks | CTR | Pos Prom | Top Query |
|--------|-------------|--------|-----|----------|-----------|
| 1      | 0           | 0      | 0%  | -        | N/A       |
| 2      | 5           | 0      | 0%  | 98       | Entersys  |
| 3      | 25          | 1      | 4%  | 85       | Worksys   |
| 4      | 50          | 2      | 4%  | 72       | ...       |
```

### Cómo obtener datos cada semana:

```
1. Google Search Console → Rendimiento
2. Filtrar por: "Últimos 7 días"
3. Anotar:
   ├─ Total de clics
   ├─ Total de impresiones
   ├─ CTR promedio
   ├─ Posición promedio
   └─ Top query (tab "Consultas", primera fila)
```

---

## 🔧 VERIFICACIÓN TÉCNICA POST-SETUP

### 1. Verificar robots.txt

```
1. Ir a: https://www.entersys.mx/robots.txt

2. Debe verse así:
   User-agent: *
   Allow: /

   Sitemap: https://www.entersys.mx/sitemap.xml

3. ❌ Si dice "Disallow: /":
   ├─ Significa que estás bloqueando Google
   └─ Revisar que desplegaste versión de producción
```

### 2. Verificar sitemap.xml

```
1. Ir a: https://www.entersys.mx/sitemap.xml

2. Debe mostrar XML con URLs como:
   <url>
     <loc>https://www.entersys.mx/</loc>
     ...
   </url>
   <url>
     <loc>https://www.entersys.mx/worksys</loc>
     ...
   </url>

3. Si da error 404:
   └─ Verificar que tu sitio genera sitemap.xml automáticamente
```

### 3. Verificar indexación manual

```
1. Google (modo incógnito)
2. Buscar: site:entersys.mx
3. Resultados:

   Semana 1: Probablemente 0 resultados (normal)
   Semana 2: Debería aparecer homepage
   Semana 3-4: Deberían aparecer 5-10 páginas
```

---

## 🚨 PROBLEMAS COMUNES

### ❌ "No se pudo verificar la propiedad"

**Soluciones**:

1. **HTML Tag**:
   - Verificar que tag está en `<head>` del HTML
   - Ver código fuente (Ctrl+U) y buscar "google-site-verification"
   - Debe aparecer ANTES de `</head>`

2. **DNS Record**:
   - Esperar 15-30 minutos más
   - Verificar record en: https://mxtoolbox.com/SuperTool.aspx
   - Buscar: TXT entersys.mx
   - Debe aparecer el record google-site-verification

### ❌ "Sitemap no se pudo leer"

**Soluciones**:
1. Verificar que existe: https://www.entersys.mx/sitemap.xml
2. Si da 404, verificar configuración de Vite/React Router
3. Esperar 24h y volver a enviar

### ❌ "Sin datos después de 7 días"

**Causas**:
1. robots.txt bloqueando (Disallow: /)
2. Sitio no está realmente en producción
3. Google aún no indexó (puede tomar 2 semanas)

**Soluciones**:
1. Forzar indexación (paso 2 en "Después de verificar")
2. Verificar robots.txt
3. Esperar otra semana

---

## 📱 APP MÓVIL (OPCIONAL)

Google Search Console tiene app móvil para Android/iOS:

```
1. Descargar: "Google Search Console" de la tienda
2. Login con tu cuenta
3. Ver métricas desde el celular
4. Recibir notificaciones de problemas

Útil para:
├─ Ver clics/impresiones diarios
├─ Alertas de errores de indexación
└─ Monitoreo rápido semanal
```

---

## ✅ CHECKLIST FINAL

### Hoy (Inmediato):
- [ ] Ir a Search Console
- [ ] Agregar propiedad www.entersys.mx
- [ ] Verificar (HTML tag o DNS)
- [ ] Submit sitemap.xml
- [ ] Solicitar indexación de 5 páginas principales

### Esta Semana:
- [ ] Verificar que sitemap fue aceptado
- [ ] Buscar "site:entersys.mx" en Google
- [ ] Anotar baseline (probablemente 0)

### Próximas 2 Semanas:
- [ ] Revisar Search Console cada 2-3 días
- [ ] Esperar primeras impresiones
- [ ] Verificar que páginas se indexan

### Mes 1:
- [ ] Tracking semanal de métricas
- [ ] Crear Google Sheet de seguimiento
- [ ] Identificar primeras keywords que traen tráfico

---

## 🎓 RECURSOS ADICIONALES

### Tutoriales Oficiales:
- Guía Google Search Console: https://support.google.com/webmasters/answer/9128668
- Verificación de sitio: https://support.google.com/webmasters/answer/9008080
- Sitemaps: https://support.google.com/webmasters/answer/183668

### Videos:
- YouTube: "Google Search Console Tutorial 2024"
- Buscar: "Cómo verificar sitio en Search Console"

---

## 💡 TIPS PRO

1. **Configurar Email Alerts**:
   ```
   Search Console → Configuración → Usuarios
   → Verificar que tu email reciba alertas
   → Te avisará de problemas (errores 404, etc)
   ```

2. **Comparar con Semana Anterior**:
   ```
   En "Rendimiento", siempre comparar:
   "Últimos 7 días" vs "Periodo anterior"
   → Verás si subes o bajas
   ```

3. **Filtrar por Dispositivo**:
   ```
   Tab "Dispositivos" en Rendimiento
   → Ver si tienes más tráfico móvil o desktop
   → Ajustar estrategia según eso
   ```

4. **Exportar Datos Mensual**:
   ```
   Rendimiento → Click "Exportar"
   → Guardar CSV mensualmente
   → Crear histórico para análisis largo plazo
   ```

---

## 🎯 SIGUIENTE PASO DESPUÉS DE SEARCH CONSOLE

Una vez configurado Search Console (hoy), el siguiente paso es:

1. **Esperar 7 días**
2. **Revisar primeros datos**
3. **Si hay impresiones**: Celebrar 🎉
4. **Si NO hay impresiones**: Troubleshooting (ver sección arriba)

**Mientras esperas (Semana 1-2)**:

- [ ] Leer: KEYWORD_RESEARCH_VALIDATED.md
- [ ] Revisar: PROPUESTA_CAMBIOS_TEXTO_FASE2.md
- [ ] Planear: Contenido adicional para blog
- [ ] Preparar: Screenshots de productos para GMB

---

**¿Listo para empezar? Dime cuál método prefieres (HTML Tag u DNS) y te ayudo paso a paso.** 🚀
