# 📐 Especificaciones Completas de Imágenes - Entersys Website

> **Guía definitiva para el diseñador**
> Todas las dimensiones, formatos y especificaciones de imágenes del sitio web

---

## 📋 Índice

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Imágenes Hero (Responsivas)](#imágenes-hero-responsivas)
3. [Página: Inicio](#página-inicio)
4. [Página: Worksys](#página-worksys)
5. [Página: Expersys](#página-expersys)
6. [Página: Servicios](#página-servicios)
7. [Página: Sobre Nosotros](#página-sobre-nosotros)
8. [Página: Clientes](#página-clientes)
9. [Página: Contacto](#página-contacto)
10. [Página: Blog y Awalab](#página-blog-y-awalab)
11. [Checklist Final](#checklist-final)

---

## 🎯 Resumen Ejecutivo

### Categorías de Imágenes

| Categoría | Cantidad | Tamaños | Formato |
|-----------|----------|---------|---------|
| **Hero Responsivos** | 4 páginas × 3 tamaños = 12 | Mobile: 1080×1920<br>Desktop: 1920×1080<br>Large: 2560×1440 | WebP |
| **Cards 3D/Ilustraciones** | ~15 | 400×400px @2x (800×800) | WebP |
| **Iconos SVG** | ~20 | 64×64px | SVG |
| **Imágenes Features** | ~15 | 800×600px @2x (1600×1200) | WebP |
| **Blog/Gallery** | ~10 | 1200×800px (3:2) | WebP |

### Principios Generales

✅ **Formato:** WebP para todas las imágenes raster
✅ **Calidad:** 85-90% para WebP
✅ **Retina:** Todas las imágenes @2x excepto hero
✅ **Paleta de colores:**
- Azul oscuro: #0a1828, #2d4059
- Azul medio: #4a6fa5, #6ba3d4
- Cyan/Turquesa: #4ECDC4, #C5F0E8
- Fondo mint para 3D: #C5F0E8

---

## 🖼️ Imágenes Hero (Responsivas)

### ⚠️ IMPORTANTE: 4 Páginas Requieren Hero Responsivo

Estas páginas necesitan **3 tamaños** cada una:

1. **Inicio** (home)
2. **Worksys** (servicio)
3. **Expersys** (servicio)
4. **Sobre Nosotros** (about)

---

### 1️⃣ HERO: Página Inicio

**Archivos:**
- `hero_main_inicio-mobile.webp`
- `hero_main_inicio-desktop.webp`
- `hero_main_inicio-desktop-2x.webp`

**Mensaje principal:** "Simplificamos la complejidad operativa con inteligencia digital"

#### Mobile (1080 × 1920px - Ratio 9:16)

```
Dimensiones: 1080 × 1920 píxeles
Formato: WebP
Calidad: 85-90%
Orientación: Vertical

COMPOSICIÓN:
- Superior 30%: Espacio oscuro para texto (gradient #0a1828)
- Centro 40%: Visualizaciones tech abstractas
- Inferior 30%: Fade to dark

ELEMENTOS:
- Hologramas de dashboards
- Gráficos de analítica flotantes
- Partículas de datos
- Nodos conectados
- Color accent: Cyan (#4ECDC4)

TEXTO OVERLAY AREA:
- Lado izquierdo más oscuro
- Gradient: from-[#0a1828]/95 via-[#0a1828]/60 to-transparent
```

#### Desktop (1920 × 1080px - Ratio 16:9)

```
Dimensiones: 1920 × 1080 píxeles
Formato: WebP
Calidad: 85-90%
Orientación: Horizontal

COMPOSICIÓN:
- Izquierda 40%: Espacio oscuro para texto
- Centro-Derecha 60%: Visualizaciones principales
- Gradient horizontal para legibilidad

ELEMENTOS:
- Dashboard interfaces semi-transparentes
- Gráficos 3D isométricos
- Network nodes
- Process flow visualization
- Tech grid background sutil
```

#### Large Desktop (2560 × 1440px - Ratio 16:9)

```
Dimensiones: 2560 × 1440 píxeles
Formato: WebP
Calidad: 90%
Orientación: Horizontal (ultra-wide)

COMPOSICIÓN:
- Izquierda 30%: Espacio para texto
- Centro 30%: Elementos de transición
- Derecha 40%: Hero visual complejo

ELEMENTOS:
- Command center interface
- Multiple floating panels
- Detailed tech elements
- Depth con foreground/midground/background
- Premium quality visuals
```

---

### 2️⃣ HERO: Página Worksys

**Archivos:**
- `hero_dashboard_worksys-mobile.webp`
- `hero_dashboard_worksys-desktop.webp`
- `hero_dashboard_worksys-desktop-2x.webp`

**Mensaje:** "Worksys: gestión de negocios inteligente"

**Temática:** Dashboard analytics, business intelligence, process digitalization

```
Mobile: 1080 × 1920px (9:16)
Desktop: 1920 × 1080px (16:9)
Large: 2560 × 1440px (16:9)

ELEMENTOS ESPECÍFICOS:
- Dashboard con métricas de negocio
- KPIs visualizados
- Process flowcharts
- Real-time analytics
- Visual management elements

OVERLAY: bg-black/50 para legibilidad de texto blanco
```

---

### 3️⃣ HERO: Página Expersys

**Archivos:**
- `hero_quality_expersys-mobile.webp`
- `hero_quality_expersys-desktop.webp`
- `hero_quality_expersys-desktop-2x.webp`

**Mensaje:** "Expersys: calidad operativa"

**Temática:** Quality management, ISO certifications, compliance, auditorías

```
Mobile: 1080 × 1920px (9:16)
Desktop: 1920 × 1080px (16:9)
Large: 2560 × 1440px (16:9)

ELEMENTOS ESPECÍFICOS:
- Certificaciones ISO visualizadas
- Checkmarks de calidad
- Process compliance diagrams
- Audit trails visualization
- Quality control elements

OVERLAY: bg-black/50
```

---

### 4️⃣ HERO: Página Sobre Nosotros

**Archivos:**
- `hero_about_nosotros-mobile.webp`
- `hero_about_nosotros-desktop.webp`
- `hero_about_nosotros-desktop-2x.webp`

**Mensaje:** "Entersyzamos empresas"

**Temática:** Team collaboration, company culture, transformation journey

```
Mobile: 1080 × 1920px (9:16)
Desktop: 1920 × 1080px (16:9)
Large: 2560 × 1440px (16:9)

ELEMENTOS ESPECÍFICOS:
- Abstract team collaboration visuals
- Company growth visualization
- Transformation journey elements
- Connected network of people/processes
- Inspirational tech aesthetic

OVERLAY: bg-black/50
NOTA: Actualmente usa placeholder, necesita imagen real
```

---

## 🏠 Página: Inicio

### Header-05: Hero Section
Ver [Imágenes Hero](#imágenes-hero-responsivas) - Inicio

---

### Layout-363: Servicios Cards

**Componente:** Cards con imágenes 3D de servicios

#### Imagen 1: Worksys Card
```
Archivo: servicios_insignia_inicio.webp
Dimensiones: 800 × 800px (@2x de 400×400)
Display: 280px max-width
Formato: WebP 90%
Object-fit: contain

DESCRIPCIÓN:
- Ilustración 3D de proceso digitalizado
- Fondo: Transparente (se usará mint #C5F0E8 en web)
- Estilo: Isométrico, moderno, tech
- Elementos: Laptop, datos, automatización
- Colores: Azules (#2d4059, #4a6fa5) + cyan accents
```

#### Imagen 2: Expersys Card
```
Archivo: servicios_management_inicio.webp
Dimensiones: 800 × 800px (@2x de 400×400)
Display: 280px max-width
Formato: WebP 90%
Object-fit: contain

DESCRIPCIÓN:
- Ilustración 3D de sistema de gestión
- Fondo: Transparente
- Estilo: Isométrico, profesional
- Elementos: Documentos, checkmarks, certificaciones
- Colores: Azules + mint accents
```

---

### Layout-241: Industrias (Iconos)

**Componente:** 3 iconos de industrias

```
Archivos:
- icon_factory_inicio.svg (64×64)
- icon_science_inicio.svg (64×64)
- icon_car_repair_inicio.svg (64×64)

Formato: SVG
Tamaño: 64×64 píxeles
Display: 40px (h-10 w-10)
Color: Single color para fácil theming

ESTILOS:
- Líneas limpias
- Estilo Material Design o similar
- Monocromático (se coloreará con CSS)
```

---

### Layout-245: Propuesta de Valor (Iconos)

**Componente:** 3 iconos de valores

```
Archivos:
- icon_speed_inicio.svg (64×64)
- icon_support_agent_inicio.svg (64×64)
- icon_book_3_inicio.svg (64×64)

Formato: SVG
Tamaño: 64×64 píxeles
Display: 32px (h-8 w-8)
Color: Single color

CONCEPTOS:
- Speed: Rapidez, resultados rápidos
- Support: Atención personalizada
- Book: Conocimiento, expertise
```

---

### Layout-394: Diferenciadores (Cards con Imágenes)

**Componente:** 3 cards con imágenes de features

#### Imagen 1: Eficiencia
```
Archivo: diferenciadores_eficiencia_inicio.webp
Dimensiones: 1600 × 1200px (@2x de 800×600)
Aspect Ratio: 4:3
Formato: WebP 85%

CONCEPTO:
- Visualización de métricas y analytics
- Gráficos de rendimiento
- Dashboard simplificado
- Colores: Azul tech con verde/cyan para "success"
```

#### Imagen 2: Escalabilidad
```
Archivo: diferenciadores_escalabilidad_inicio.webp
Dimensiones: 1600 × 1200px (@2x de 800×600)
Aspect Ratio: 4:3
Formato: WebP 85%

CONCEPTO:
- Growth visualization
- Sistemas modulares creciendo
- Arquitectura escalable
- Colores: Azul con elementos expandiéndose
```

#### Imagen 3: Cumplimiento
```
Archivo: diferenciadores_cumplimiento_inicio.webp
Dimensiones: 1600 × 1200px (@2x de 800×600)
Aspect Ratio: 4:3
Formato: WebP 85%

CONCEPTO:
- Shields, checkmarks
- Compliance visual
- Certificaciones
- Colores: Azul con gold accents para certificaciones
```

---

### Layout-501: Tecnologías (Tabs con Imágenes)

**Componente:** 3 imágenes de tecnologías en tabs

#### Tab 1: Smartsheet
```
Archivo: techstack_smartsheets_inicio.webp
Dimensiones: 1600 × 1200px (@2x de 800×600)
Aspect Ratio: 4:3
Formato: WebP 85%

CONCEPTO:
- Screenshot o mockup de Smartsheet
- Interface de gestión de proyectos
- Puede ser screenshot real + overlay de branding
```

#### Tab 2: No Code
```
Archivo: techstack_code_inicio.webp
Dimensiones: 1600 × 1200px (@2x de 800×600)
Aspect Ratio: 4:3
Formato: WebP 85%

CONCEPTO:
- Visual de desarrollo no-code
- Drag & drop interface
- Building blocks concept
```

#### Tab 3: IA
```
Archivo: techstack_ai_inicio.webp
Dimensiones: 1600 × 1200px (@2x de 800×600)
Aspect Ratio: 4:3
Formato: WebP 85%

CONCEPTO:
- AI/ML visualization
- Neural networks
- Automation concept
- Futuristic pero profesional
```

---

## 🔧 Página: Worksys

### Header-30: Hero
Ver [Imágenes Hero](#imágenes-hero-responsivas) - Worksys

---

### Layout-74, 109, 237, 243, 421: Secciones con Imágenes

```
Archivos existentes:
- section_dashboard_worksys.webp
- section_process_worksys.webp
- section_cascade_worksys.webp
- section_automation_worksys.webp (si no existe, crear)

Dimensiones: 1600 × 1200px (@2x)
Aspect Ratio: 4:3
Formato: WebP 85%

TEMÁTICA WORKSYS:
- Dashboards de negocio
- Process digitalization
- Visual management
- Automation workflows
- Analytics y reportes
```

---

### Blog-37: Blog Posts (3 Imágenes)

```
Archivos existentes:
- section_dashboard_worksys.webp
- section_process_worksys.webp
- section_cascade_worksys.webp

Dimensiones: 1200 × 800px (3:2 ratio)
Formato: WebP 85%
Uso: Thumbnails de blog posts
```

---

### Cta-39: Call to Action Banner

```
Archivo: banner_meeting_worksys.webp
Dimensiones: 1600 × 1200px
Aspect Ratio: 4:3
Formato: WebP 85%

CONCEPTO:
- Meeting/consultation visual
- Laptop con dashboard
- Professional setting
- Invita a agendar demo
```

---

## 🎓 Página: Expersys

### Header-30: Hero
Ver [Imágenes Hero](#imágenes-hero-responsivas) - Expersys

---

### Layout-16, 121, 253, 492, 239: Secciones con Iconos/Imágenes

```
Iconos SVG existentes (64×64):
- icon_1_expersys.svg
- icon_2_expersys.svg
- icon_3_expersys.svg
- icon_4_expersys.svg
- icon_5_expersys.svg
- icon_6_expersys.svg

Formato: SVG monocromático
Conceptos: ISO, quality, compliance, audit, process
```

```
Imágenes de sección:
- section_quality_expersys.webp
- section_audit_expersys.webp
- section_compliance_expersys.webp

Dimensiones: 1600 × 1200px (@2x)
Aspect Ratio: 4:3
Formato: WebP 85%

TEMÁTICA EXPERSYS:
- Quality management systems
- ISO certifications
- Audit processes
- Compliance documentation
- Professional corporate aesthetic
```

---

### Blog-37: Blog Posts

```
Dimensiones: 1200 × 800px (3:2)
Formato: WebP 85%

Imágenes:
- blog_iso_expersys.webp
- blog_audit_expersys.webp
- blog_quality_expersys.webp
```

---

### Cta-39: Call to Action

```
Archivo: banner_consultation_expersys.webp
Dimensiones: 1600 × 1200px
Aspect Ratio: 4:3
Formato: WebP 85%

CONCEPTO:
- Professional consultation
- Quality certification
- Expert guidance visual
```

---

## 🛠️ Página: Servicios

### Header-64: Header Simple
**Sin imagen hero - Solo texto**

---

### Layout-362, 395, 239, 423: Servicios con Imágenes

```
Archivos necesarios:
- servicio_worksys_principal.webp (1600×1200)
- servicio_expersys_principal.webp (1600×1200)
- servicio_consultoria.webp (1600×1200)
- servicio_implementacion.webp (1600×1200)

Dimensiones: 1600 × 1200px (@2x de 800×600)
Aspect Ratio: 4:3
Formato: WebP 85%

CONCEPTOS:
- Cada servicio con visual representativo
- Professional business aesthetic
- Colores corporate de Entersys
```

---

### Testimonial-17: Avatares de Clientes

```
Archivos:
- avatar_cliente_1.webp
- avatar_cliente_2.webp
- avatar_cliente_3.webp

Dimensiones: 200 × 200px (@2x de 100×100)
Formato: WebP 90%
Shape: Circular (se aplicará border-radius en CSS)

OPCIONES:
- Fotos reales de clientes (requiere permiso)
- Avatares profesionales genéricos
- Iniciales con background de color
```

---

## 👥 Página: Sobre Nosotros

### Header-114: Hero
Ver [Imágenes Hero](#imágenes-hero-responsivas) - Sobre Nosotros

---

### Layout-93: Team o Company Values

```
Archivos necesarios (si aplica):
- value_innovation.webp (800×800)
- value_quality.webp (800×800)
- value_commitment.webp (800×800)

Dimensiones: 800 × 800px
Formato: WebP 85%
Uso: Ilustraciones de valores corporativos
```

---

### Layout-213, 141: Historia/Misión

```
Archivos:
- mision_vision.webp (1600×1200)
- historia_timeline.webp (1600×1200)

Dimensiones: 1600 × 1200px
Aspect Ratio: 4:3
Formato: WebP 85%
```

---

### Timeline-20: Línea de Tiempo

```
Iconos para hitos (SVG 64×64):
- timeline_icon_fundacion.svg
- timeline_icon_primer_cliente.svg
- timeline_icon_expansion.svg
- timeline_icon_actualidad.svg

Formato: SVG monocromático
```

---

### Logo-03: Logos de Clientes/Partners

```
Logos en formato SVG o PNG transparente:
- Dimensiones variables (mantener aspect ratio)
- Formato preferido: SVG
- Alternativa: PNG transparente @ 400px ancho
- Monocromático o color según brand guidelines
```

---

## 👔 Página: Clientes

### Header-64: Header Simple
**Sin imagen hero**

---

### Portfolio-09: Portfolio de Casos de Éxito

```
Archivos (6-9 imágenes):
- caso_exito_manufactura.webp (1200×800)
- caso_exito_retail.webp (1200×800)
- caso_exito_logistica.webp (1200×800)
- caso_exito_salud.webp (1200×800)
- caso_exito_tecnologia.webp (1200×800)
- caso_exito_servicios.webp (1200×800)

Dimensiones: 1200 × 800px (3:2 ratio)
Formato: WebP 85%

CONCEPTO:
- Screenshots de dashboards implementados (con permiso)
- O visualizaciones abstractas de industrias
- Antes/Después concepts
```

---

### Event-23: Eventos o Workshops

```
Archivos:
- evento_workshop_1.webp (1600×1200)
- evento_webinar_1.webp (1600×1200)

Dimensiones: 1600 × 1200px
Aspect Ratio: 4:3
Formato: WebP 85%
```

---

## 📞 Página: Contacto

### Header-64: Header Simple
**Sin imagen hero**

---

### Contact-13 / Contact-06: Formularios

```
Imágenes opcionales de contacto:
- contact_support.webp (800×800)
- contact_map_placeholder.webp (800×600)

Dimensiones variables según diseño
Formato: WebP 85%
```

---

## 📝 Página: Blog y Awalab

### Blog-Post-Header-01: Hero de Post

```
Dimensiones: 2400 × 1200px (2:1 ratio)
Formato: WebP 85%
Uso: Header de artículos de blog individuales
```

---

### Blog-30: Grid de Posts

```
Thumbnails: 1200 × 800px (3:2 ratio)
Formato: WebP 85%
Cantidad: Variable según contenido
```

---

### Awalab Secciones Específicas

#### Content-27: Contenido de Laboratorio
```
Archivos:
- awalab_research_1.webp (1600×1200)
- awalab_innovation_1.webp (1600×1200)

Dimensiones: 1600 × 1200px
Formato: WebP 85%
```

#### Gallery-01: Galería
```
Dimensiones: 1200 × 800px (3:2)
Cantidad: 6-12 imágenes
Formato: WebP 85%
```

#### Stats-30: Estadísticas con Iconos
```
Iconos SVG (64×64):
- stat_projects.svg
- stat_clients.svg
- stat_hours.svg
- stat_success_rate.svg
```

#### Testimonial-17: Testimonios
```
Avatares: 200 × 200px
Formato: WebP 90%
Circular display
```

---

## ✅ Checklist Final

### Por Hacer para el Diseñador

#### 🔴 Prioridad Alta (Crítico)

- [ ] **Hero Inicio** - 3 tamaños (mobile/desktop/large)
- [ ] **Hero Worksys** - 3 tamaños
- [ ] **Hero Expersys** - 3 tamaños
- [ ] **Hero Sobre Nosotros** - 3 tamaños

#### 🟡 Prioridad Media (Importante)

- [ ] Cards servicios inicio (2 imágenes 3D: Worksys, Expersys)
- [ ] Diferenciadores inicio (3 imágenes: eficiencia, escalabilidad, cumplimiento)
- [ ] Tecnologías inicio (3 imágenes: Smartsheet, No-code, IA)
- [ ] Secciones Worksys (4-5 imágenes de features)
- [ ] Secciones Expersys (4-5 imágenes de features)
- [ ] CTAs banners (Worksys y Expersys)

#### 🟢 Prioridad Baja (Puede esperar)

- [ ] Iconos SVG industrias (3)
- [ ] Iconos SVG propuesta de valor (3)
- [ ] Iconos SVG Expersys (6)
- [ ] Casos de éxito portfolio (6-9)
- [ ] Blog thumbnails (variable)
- [ ] Avatares testimonios (6-12)
- [ ] Logos clientes/partners (variable)

---

### Checklist de Calidad por Imagen

Antes de entregar cada imagen, verificar:

- [ ] ✅ Dimensiones exactas según especificación
- [ ] ✅ Formato WebP (o SVG para iconos)
- [ ] ✅ Calidad 85-90% para WebP
- [ ] ✅ Nombres de archivo coinciden exactamente
- [ ] ✅ Paleta de colores Entersys aplicada
- [ ] ✅ Para heroes: espacio oscuro izquierdo para texto
- [ ] ✅ Para 3D: fondo transparente (mint se aplica en web)
- [ ] ✅ Para retina: @2x del tamaño de display
- [ ] ✅ Optimización: tamaño de archivo <500KB idealmente

---

## 🎨 Paleta de Colores Entersys

```css
/* Azules Oscuros (Backgrounds) */
--color-dark-1: #0a1828;
--color-dark-2: #2d4059;

/* Azules Medios (Elementos) */
--color-blue-1: #4a6fa5;
--color-blue-2: #6ba3d4;

/* Cyan/Turquesa (Accents) */
--color-accent-1: #4ECDC4;
--color-accent-2: #C5F0E8;  /* Mint - usado para fondos 3D */

/* Grises (Textos secundarios) */
--color-text-secondary: #64748b;
--color-border: #e2e8f0;
```

---

## 📦 Entrega de Archivos

### Estructura de Carpetas

```
/imagenes
  /inicio
    - hero_main_inicio-mobile.webp
    - hero_main_inicio-desktop.webp
    - hero_main_inicio-desktop-2x.webp
    - servicios_insignia_inicio.webp
    - servicios_management_inicio.webp
    - diferenciadores_eficiencia_inicio.webp
    - [etc...]
  /worksys
    - hero_dashboard_worksys-mobile.webp
    - hero_dashboard_worksys-desktop.webp
    - hero_dashboard_worksys-desktop-2x.webp
    - [etc...]
  /expersys
    - hero_quality_expersys-mobile.webp
    - [etc...]
  /servicios
    - [archivos de servicios]
  /sobre-nosotros
    - hero_about_nosotros-mobile.webp
    - [etc...]
  /clientes
    - [casos de éxito]
  /blog
    - [thumbnails blog]
  /awalab
    - [contenido awalab]
```

### Nomenclatura

**Patrón:** `{seccion}_{descripcion}_{pagina}.{formato}`

Ejemplos:
- ✅ `hero_main_inicio-desktop.webp`
- ✅ `servicios_insignia_inicio.webp`
- ✅ `diferenciadores_eficiencia_inicio.webp`
- ✅ `icon_factory_inicio.svg`

---

## 🔧 Herramientas Recomendadas

### Para Crear Imágenes
- **Adobe Illustrator** - Iconos SVG, ilustraciones 3D
- **Figma** - Diseño UI, mockups
- **Blender** - Renders 3D isométricos
- **Photoshop** - Composiciones complejas

### Para Optimizar
- **Squoosh.app** - Conversión a WebP online
- **TinyPNG/TinyJPG** - Compresión adicional
- **SVGOMG** - Optimización de SVG

### Para Generar con IA
- **Midjourney** - Máxima calidad
- **DALL-E (ChatGPT)** - Más accesible
- **Leonardo.ai** - Gratis, excelente control
- **Ideogram** - Bueno para composición

---

## 📞 Dudas Frecuentes

**P: ¿Puedo usar imágenes de stock?**
R: Sí, siempre que sean royalty-free y editables para aplicar brand colors.

**P: ¿Qué hago si una imagen no cabe en las dimensiones exactas?**
R: Mantén el aspect ratio y crea espacio con background blur o extensions.

**P: ¿Todas las imágenes hero realmente necesitan 3 tamaños?**
R: Sí, para optimización. Mobile carga menos datos, large desktop se ve mejor en 4K.

**P: ¿Los iconos SVG deben ser outlined o filled?**
R: Preferiblemente outlined (líneas) para consistencia con Material Design.

**P: ¿Cómo exporto WebP desde Photoshop?**
R: Usa Squoosh.app o plugin WebPShop. Export como PNG primero, luego convierte.

---

## 📊 Resumen de Entregas

| Fase | Imágenes | Prioridad | Deadline Sugerido |
|------|----------|-----------|-------------------|
| **Fase 1: Heroes** | 12 (4 páginas × 3) | 🔴 Alta | Semana 1 |
| **Fase 2: Cards 3D** | 15 imágenes | 🟡 Media | Semana 2 |
| **Fase 3: Features** | 20 imágenes | 🟡 Media | Semana 2-3 |
| **Fase 4: Iconos** | 20 SVG | 🟢 Baja | Semana 3 |
| **Fase 5: Blog/Misc** | Variable | 🟢 Baja | Semana 4+ |

---

**Documento creado:** 2 de Octubre, 2025
**Versión:** 1.0
**Contacto:** [Equipo Entersys]

---

*Este documento cubre el 100% de las imágenes necesarias para el sitio web de Entersys. Para cualquier duda o clarificación, contactar con el equipo de desarrollo.*
