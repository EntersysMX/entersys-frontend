# 📝 Especificaciones de Imágenes: Blog y Awalab

> **Guía para imágenes dinámicas de Blog y páginas de clientes (Awalab)**

---

## 📋 Resumen

### Blog
- **Tipo:** Contenido dinámico (CMS)
- **Estructura:** Cada post tiene su propia imagen principal
- **Uso:** La misma imagen se reutiliza en thumbnails y headers

### Awalab
- **Tipo:** Páginas individuales por cliente (casos de éxito)
- **Estructura:** Cada cliente tiene su propia página completa
- **Uso:** Hero, galería, estadísticas, testimonios por cliente

---

## 📰 SECCIÓN: BLOG

### Arquitectura del Blog

```
/blog
  - Lista de posts (Blog-30)
    └─ Muestra thumbnails de cada post

/blog/[slug]
  - Post individual (Blog-Post-Header-04 + Content-27)
    └─ Usa la MISMA imagen del thumbnail como hero
```

---

### 1️⃣ Imagen Principal del Post (Única por artículo)

**La imagen principal se usa en 2 lugares:**
1. **Thumbnail** en el listado de blog (Blog-30)
2. **Hero image** dentro del post individual (Blog-Post-Header-04)

#### Especificaciones Técnicas

```
Nombre: {slug-del-post}.webp
Ejemplo: digitalizacion-procesos-2024.webp

Dimensiones: 1920 × 1280px (Ratio 3:2)
Formato: WebP
Calidad: 85%
Peso objetivo: <300KB

USOS:
- Thumbnail en grid: Se muestra en aspect-video (16:9)
- Hero en post: Se muestra en aspect-[3/2] (3:2)

COMPOSICIÓN:
- Imagen debe funcionar bien en ambos crops
- Elementos importantes en el centro
- No colocar texto crítico en bordes
```

#### Display en Componentes

**Blog-30 (Lista de posts):**
```jsx
<img
  src="/imagenes/blog/{slug}.webp"
  className="aspect-video size-full object-cover"
  alt="{título del post}"
/>
```
- Display: aspect-video (16:9)
- Object-fit: cover (recorta arriba/abajo)

**Blog-Post-Header-04 (Header del post):**
```jsx
<img
  src="/imagenes/blog/{slug}.webp"
  className="aspect-[3/2] size-full rounded-image object-cover"
  alt="{título del post}"
/>
```
- Display: aspect-[3/2] (3:2)
- Object-fit: cover
- Rounded corners

---

### 2️⃣ Imágenes Dentro del Contenido (Content-27)

**Componente:** Content-27 (contenido markdown del artículo)

#### Imágenes inline en el artículo

```
Nombre: {slug-del-post}_figura-01.webp, _figura-02.webp, etc.
Ejemplo: digitalizacion-procesos-2024_figura-01.webp

Dimensiones: 1600 × 900px (16:9 landscape)
Formato: WebP
Calidad: 80-85%
Peso objetivo: <200KB cada una

USO:
- Ilustraciones, diagramas, screenshots dentro del artículo
- Se insertan vía markdown en el contenido
- Pueden tener caption
```

```jsx
<figure>
  <img
    src="/imagenes/blog/{slug}_figura-01.webp"
    alt="Descripción de la imagen"
  />
  <figcaption>Pie de foto explicativo</figcaption>
</figure>
```

---

### 3️⃣ Estructura de Archivos para Blog

```
/public/imagenes/blog/

  # Posts individuales
  digitalizacion-procesos-2024.webp           (hero/thumbnail)
  digitalizacion-procesos-2024_figura-01.webp (inline)
  digitalizacion-procesos-2024_figura-02.webp (inline)

  ia-gestion-empresarial-2024.webp
  ia-gestion-empresarial-2024_figura-01.webp

  metodologias-agiles-2024.webp
  metodologias-agiles-2024_figura-01.webp
  metodologias-agiles-2024_figura-02.webp
  metodologias-agiles-2024_figura-03.webp
```

---

### 📐 Plantilla de Diseño para Blog Posts

#### Hero/Thumbnail Image (1920×1280 - 3:2)

```
┌─────────────────────────────────────────┐
│                                         │ ← Área que se recorta en thumbnail
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │     CONTENIDO PRINCIPAL           │  │ ← Área visible en ambos formatos
│  │     (Safe zone)                   │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │ ← Área que se recorta en thumbnail
└─────────────────────────────────────────┘

SAFE ZONE: Centro 1920×1080 (zona siempre visible)
FULL IMAGE: 1920×1280 (se ve completa en hero del post)
```

#### Guías de Composición

```
BUENAS PRÁCTICAS:
✅ Elementos clave en el centro horizontal
✅ Texto legible en ambos tamaños
✅ Fondos con suficiente contraste
✅ No texto crítico en esquinas
✅ Composición balanceada

EVITAR:
❌ Texto importante arriba/abajo (se recorta en thumbnail)
❌ Elementos clave en bordes extremos
❌ Demasiado detalle pequeño (no se ve en thumbnail)
```

---

## 🏢 SECCIÓN: AWALAB (Páginas de Clientes)

### Arquitectura de Awalab

```
/awalab/[cliente-slug]
  Página completa del caso de éxito del cliente

  Componentes:
  - BlogPostHeader01: Hero del caso de éxito
  - Content-27: Descripción del proyecto
  - Stats-30: Estadísticas con imágenes
  - Gallery-01: Galería multimedia
  - Testimonial-17: Testimonios del cliente
  - Cta-39: Call to action
```

**Nota:** Cada cliente tiene su propia página completa, no es una lista dinámica como el blog.

---

### 1️⃣ Hero del Cliente (Blog-Post-Header-01)

```
Nombre: {cliente-slug}_hero.webp
Ejemplo: grupo-industrial-nexus_hero.webp

Dimensiones: 3200 × 1600px (Ratio 2:1)
Formato: WebP
Calidad: 90%
Peso objetivo: <400KB

DISPLAY:
- aspect-[2/1] en desktop
- Full width, rounded corners

COMPOSICIÓN:
- Imagen del proyecto implementado
- Puede ser: dashboard, facility, equipo trabajando
- Alta calidad, profesional
- Representativa del cliente
```

```jsx
<img
  src="/imagenes/awalab/{cliente-slug}_hero.webp"
  className="aspect-[2] size-full rounded-image object-cover"
  alt="Transformación digital en {nombre del cliente}"
/>
```

---

### 2️⃣ Avatar del Cliente (Blog-Post-Header-01)

```
Nombre: {cliente-slug}_avatar.webp
Ejemplo: grupo-industrial-nexus_avatar.webp

Dimensiones: 280 × 280px (@2x de 140×140)
Formato: WebP
Calidad: 90%
Shape: Cuadrada (se aplicará border-radius en CSS)

OPCIONES:
- Logo de la empresa cliente
- Foto del contacto principal
- Icono representativo del sector
```

```jsx
<img
  src="/imagenes/awalab/{cliente-slug}_avatar.webp"
  alt="{nombre del cliente}"
  className="size-14 min-h-14 min-w-14 rounded-full object-cover"
/>
```

---

### 3️⃣ Galería Multimedia (Gallery-01)

**Componente:** Gallery-01 - Galería de imágenes del proyecto

```
Nombre: {cliente-slug}_galeria-{numero}.webp
Ejemplo:
  grupo-industrial-nexus_galeria-01.webp
  grupo-industrial-nexus_galeria-02.webp
  grupo-industrial-nexus_galeria-03.webp

Cantidad: 1-6 imágenes por cliente
Dimensiones: 1920 × 1080px (16:9)
Formato: WebP
Calidad: 85%

CONTENIDO:
- Screenshots de dashboards implementados
- Fotos del equipo en acción
- Visualizaciones de resultados
- Instalaciones del cliente
- Before/After comparisons
```

```jsx
<img
  src="/imagenes/awalab/{cliente-slug}_galeria-01.webp"
  alt="Implementación en {cliente}"
  className="aspect-video size-full rounded-image object-cover"
/>
```

---

### 4️⃣ Stats con Imágenes (Stats-30)

**Componente:** Stats-30 - Grid de estadísticas + imágenes

#### Imágenes de Estadísticas

```
Nombre: {cliente-slug}_stat-{numero}.webp
Ejemplo: grupo-industrial-nexus_stat-01.webp

Cantidad: 2 imágenes por cliente
Dimensiones: 1200 × 800px (3:2)
Formato: WebP
Calidad: 85%

CONCEPTO:
- Visualizaciones de métricas
- Gráficos de impacto
- Fotos del equipo/proceso
- Ilustraciones de resultados
```

```jsx
<img
  className="aspect-[3/2] size-full rounded-image object-cover"
  src="/imagenes/awalab/{cliente-slug}_stat-01.webp"
  alt="Resultados de {cliente}"
/>
```

---

### 5️⃣ Avatares de Testimonios (Testimonial-17)

**Componente:** Testimonial-17 - Testimonios del cliente

```
Nombre: {cliente-slug}_testimonio-{numero}.webp
Ejemplo: grupo-industrial-nexus_testimonio-01.webp

Cantidad: 3 testimonios por cliente
Dimensiones: 240 × 240px (@2x de 120×120)
Formato: WebP
Calidad: 90%
Shape: Cuadrada (display circular)

OPCIONES:
- Fotos de empleados del cliente (con permiso)
- Avatares profesionales
- Siluetas con iniciales
```

```jsx
<img
  src="/imagenes/awalab/{cliente-slug}_testimonio-01.webp"
  alt="Carlos Martínez"
  className="size-12 min-h-12 min-w-12 rounded-full object-cover"
/>
```

---

### 6️⃣ CTA Banner (Cta-39)

```
Nombre: {cliente-slug}_cta.webp
Ejemplo: grupo-industrial-nexus_cta.webp

Dimensiones: 1600 × 1200px (4:3)
Formato: WebP
Calidad: 85%

CONCEPTO:
- Imagen invitando a contactar
- Laptop con dashboard
- Professional meeting setting
- Team collaboration
```

---

### 📁 Estructura de Archivos para Awalab

```
/public/imagenes/awalab/

# Cliente 1: Grupo Industrial Nexus
grupo-industrial-nexus_hero.webp              (3200×1600)
grupo-industrial-nexus_avatar.webp            (280×280)
grupo-industrial-nexus_galeria-01.webp        (1920×1080)
grupo-industrial-nexus_galeria-02.webp
grupo-industrial-nexus_galeria-03.webp
grupo-industrial-nexus_stat-01.webp           (1200×800)
grupo-industrial-nexus_stat-02.webp
grupo-industrial-nexus_testimonio-01.webp     (240×240)
grupo-industrial-nexus_testimonio-02.webp
grupo-industrial-nexus_testimonio-03.webp
grupo-industrial-nexus_cta.webp               (1600×1200)

# Cliente 2: TechCorp Solutions
techcorp-solutions_hero.webp
techcorp-solutions_avatar.webp
techcorp-solutions_galeria-01.webp
[... etc ...]

# Cliente 3: Manufactura del Norte
manufactura-del-norte_hero.webp
manufactura-del-norte_avatar.webp
[... etc ...]
```

---

## 🎨 Guía de Estilo Visual

### Para Blog Posts

```
ESTILO:
- Moderno, profesional pero accesible
- Tech aesthetic sin ser sci-fi
- Paleta de Entersys (azules, cyan)
- Typography readable
- Composiciones limpias

TIPO DE IMÁGENES:
- Ilustraciones conceptuales
- Screenshots de herramientas
- Diagramas explicativos
- Infografías
- Abstract tech visuals
```

### Para Awalab (Clientes)

```
ESTILO:
- Corporate profesional
- Real world aplicaciones
- Credible y confiable
- Resultados tangibles
- Success stories

TIPO DE IMÁGENES:
- Screenshots reales de dashboards (con permiso)
- Fotos del equipo cliente (con permiso)
- Visualizaciones de datos reales
- Gráficos de ROI/impacto
- Instalaciones/facilities
```

---

## ✅ Checklist por Tipo

### ✅ Checklist Blog Post

Por cada artículo de blog necesitas:

- [ ] 1 imagen hero/thumbnail (1920×1280 - 3:2)
- [ ] 2-4 imágenes inline/figuras (1600×900 - 16:9)
- [ ] Todas en formato WebP 80-85%
- [ ] Peso total del post <1MB
- [ ] Safe zone respetada en hero
- [ ] Todas con alt text descriptivo

### ✅ Checklist Caso de Éxito (Awalab)

Por cada cliente necesitas:

- [ ] 1 hero image (3200×1600 - 2:1)
- [ ] 1 avatar cliente (280×280)
- [ ] 3-6 imágenes galería (1920×1080 - 16:9)
- [ ] 2 imágenes stats (1200×800 - 3:2)
- [ ] 3 avatares testimonios (240×240)
- [ ] 1 CTA banner (1600×1200 - 4:3)
- [ ] Total: 11-14 imágenes por cliente
- [ ] Todas en formato WebP 85-90%
- [ ] Naming convention consistente

---

## 🔧 Workflow de Producción

### Para Blog (Contenido Dinámico)

```
1. Redactor crea el artículo con slug
2. Diseñador crea:
   - Hero/thumbnail (1920×1280)
   - Figuras inline según necesidad
3. Naming: {slug}.webp, {slug}_figura-01.webp
4. Upload a /public/imagenes/blog/
5. CMS referencia las imágenes por slug
```

### Para Awalab (Páginas Estáticas)

```
1. Cliente aprueba caso de éxito
2. Recopilar materiales:
   - Screenshots con permiso
   - Fotos del equipo con permiso
   - Logos y branding
3. Diseñador crea paquete completo (11-14 imágenes)
4. Naming: {cliente-slug}_{tipo}-{numero}.webp
5. Upload a /public/imagenes/awalab/
6. Desarrollador crea página con imágenes
```

---

## 📊 Resumen de Especificaciones

| Uso | Dimensiones | Ratio | Formato | Calidad | Peso |
|-----|-------------|-------|---------|---------|------|
| **BLOG** |
| Hero/Thumbnail | 1920×1280 | 3:2 | WebP | 85% | <300KB |
| Figuras inline | 1600×900 | 16:9 | WebP | 80% | <200KB |
| **AWALAB** |
| Hero cliente | 3200×1600 | 2:1 | WebP | 90% | <400KB |
| Avatar cliente | 280×280 | 1:1 | WebP | 90% | <50KB |
| Galería | 1920×1080 | 16:9 | WebP | 85% | <250KB |
| Stats | 1200×800 | 3:2 | WebP | 85% | <200KB |
| Testimonios | 240×240 | 1:1 | WebP | 90% | <40KB |
| CTA banner | 1600×1200 | 4:3 | WebP | 85% | <250KB |

---

## 🎯 Ejemplos de Naming

### Blog
```
✅ Correcto:
digitalizacion-procesos-2024.webp
digitalizacion-procesos-2024_figura-01.webp
ia-gestion-empresarial.webp

❌ Incorrecto:
Blog Post 1.webp
Imagen-1.jpg
Screenshot 2024-03-15.png
```

### Awalab
```
✅ Correcto:
grupo-industrial-nexus_hero.webp
grupo-industrial-nexus_galeria-01.webp
techcorp-solutions_testimonio-02.webp

❌ Incorrecto:
Cliente 1 Hero.webp
nexus-gallery.jpg
testimonio.png
```

---

## 🚀 Próximos Pasos

### Fase 1: Blog (5-10 artículos iniciales)
1. Definir primeros 5-10 slugs de artículos
2. Crear heroes/thumbnails (1920×1280)
3. Crear figuras inline según contenido
4. Upload y test

### Fase 2: Awalab (3-5 clientes iniciales)
1. Seleccionar primeros 3-5 casos de éxito
2. Obtener permisos de clientes para imágenes
3. Crear paquetes completos (11-14 img c/u)
4. Build páginas individuales
5. Review con clientes

---

**Documento creado:** 2 de Octubre, 2025
**Versión:** 1.0
**Contacto:** [Equipo Entersys]

---

*Este documento especifica únicamente las imágenes para Blog y Awalab. Para el resto del sitio, consultar `ESPECIFICACIONES-IMAGENES-COMPLETO.md`*
