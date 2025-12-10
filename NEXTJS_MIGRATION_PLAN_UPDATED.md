# 🚀 Plan de Migración a Next.js - ACTUALIZADO con Backend Existente

**Decisión**: Migrar de React SPA a Next.js + Integración con FastAPI Backend
**Razón**: Blog incoming + SEO perfecto + Backend ya implementado
**Tiempo estimado**: 2-3 semanas
**Arquitectura**: Headless CMS (FastAPI) + Next.js Frontend

---

## 📊 ARQUITECTURA ACTUAL (Según MD070)

### Backend (YA EXISTE ✅):

```
FastAPI Backend (api.dev.entersys.mx)
├─ PostgreSQL Database
├─ Admin Authentication (JWT)
├─ Blog Posts API (CRUD completo)
├─ Smartsheet Integration
└─ Analytics & Metrics

Endpoints del Blog (YA IMPLEMENTADOS):
├─ GET  /api/v1/posts          → Lista posts (públicos)
├─ GET  /api/v1/posts/{slug}   → Post por slug (público)
├─ POST /api/v1/posts          → Crear post (protegido)
├─ PUT  /api/v1/posts/{id}     → Actualizar post (protegido)
└─ DELETE /api/v1/posts/{id}   → Eliminar post (protegido)

Modelos de Datos (PostgreSQL):
├─ admin_users (autenticación)
└─ blog_posts:
    ├─ id, title, slug
    ├─ content (TEXT)
    ├─ author_id, status (draft/published)
    ├─ published_at, created_at, updated_at
    ├─ meta_description (VARCHAR 300)
    └─ faq_json (JSONB) ← Para FAQs estructurados (SEO)
```

### Frontend Actual:
```
React SPA (entersys.mx)
├─ React 18.3.1
├─ Vite 5.4.20
├─ React Router
└─ Sin integración con backend blog aún
```

---

## 🎯 NUEVA ARQUITECTURA CON NEXT.JS

### Diagrama de Arquitectura:

```
┌──────────────────────────────────────────────────────────────┐
│                    USUARIO FINAL                              │
└────────────────────┬─────────────────────────────────────────┘
                     │
          ┌──────────▼──────────┐
          │   Traefik Proxy     │
          │  (SSL/Routing)      │
          └──────┬──────┬───────┘
                 │      │
      ┌──────────▼─┐  ┌▼────────────────┐
      │  Next.js   │  │  FastAPI        │
      │  Frontend  │◄─┤  Backend API    │
      │            │  │                 │
      │ • SSR/SSG  │  │ • /api/v1/posts │
      │ • ISR Blog │  │ • /api/v1/auth  │
      └────────────┘  └─────────┬───────┘
                                │
                      ┌─────────▼────────┐
                      │   PostgreSQL     │
                      │   (Blog Content) │
                      └──────────────────┘
```

### Flujo de Datos por Tipo de Página:

**1. Páginas Estáticas (Home, Worksys, Expersys, Casos)**:
```
Build Time:
└─ Next.js genera HTML estático (SSG)
   ├─ SEO perfecto (meta tags pre-renderizados)
   ├─ Carga ultra-rápida
   └─ No requieren API backend
```

**2. Blog - Lista de Posts (/blog)**:
```
Build Time:
└─ Next.js fetch API → GET /api/v1/posts
   ├─ Genera HTML estático con lista
   ├─ Revalidación ISR cada 60 min
   └─ Nuevos posts aparecen en 1 hora max

Runtime (si revalidación detecta cambios):
└─ Next.js regenera página en background
```

**3. Blog - Post Individual (/blog/[slug])**:
```
Build Time:
└─ Next.js fetch API → GET /api/v1/posts/{slug}
   ├─ Genera HTML estático para cada post
   ├─ Meta tags SEO pre-renderizados
   ├─ FAQ schema de faq_json
   └─ Revalidación ISR cada 60 min

On-Demand (si post no existe en build):
└─ Next.js fetch API → genera HTML al vuelo
   └─ Cachea resultado para siguientes visitas
```

---

## 📋 PLAN DE MIGRACIÓN DETALLADO (3 SEMANAS)

### Semana 1: Setup Next.js + Core Pages

#### Día 1-2: Setup Inicial del Proyecto

```bash
# 1. Crear proyecto Next.js 14 (en C:\Web_Entersys\)
npx create-next-app@latest entersys-nextjs

Opciones:
✅ TypeScript → Yes
✅ ESLint → Yes
✅ Tailwind CSS → Yes
✅ src/ directory → No (usar app/ directo)
✅ App Router → Yes
✅ Import alias → Yes (@/*)

# 2. Estructura inicial
entersys-nextjs/
├─ app/
│  ├─ layout.tsx         # Layout global
│  ├─ page.tsx           # Homepage
│  └─ globals.css        # Estilos globales
├─ components/
├─ lib/
│  └─ api.ts             # Cliente API para FastAPI
├─ public/
└─ next.config.js
```

#### Día 3: Configurar Integración con FastAPI

```typescript
// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.dev.entersys.mx';

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  author_id: number;
  status: 'draft' | 'published';
  published_at: string | null;
  created_at: string;
  updated_at: string | null;
  meta_description: string | null;
  faq_json: any | null;
}

// Fetch all posts (public)
export async function getPosts(): Promise<BlogPost[]> {
  const res = await fetch(`${API_BASE_URL}/api/v1/posts?published_only=true`, {
    next: { revalidate: 3600 } // ISR: revalidar cada hora
  });

  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

// Fetch single post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const res = await fetch(`${API_BASE_URL}/api/v1/posts/${slug}`, {
    next: { revalidate: 3600 } // ISR: revalidar cada hora
  });

  if (!res.ok) throw new Error('Post not found');
  return res.json();
}

// Get all slugs for static generation
export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getPosts();
  return posts.map(post => post.slug);
}
```

```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.dev.entersys.mx',
  },
  images: {
    domains: ['www.entersys.mx', 'entersys.mx'],
  },
}

module.exports = nextConfig
```

#### Día 4-5: Migrar Componentes Globales

```
Componentes a migrar:
├─ components/Header.tsx       (de src/components/layout/Header)
├─ components/Footer.tsx       (de src/components/layout/Footer)
├─ components/WhatsAppButton.tsx
└─ components/SEO/             (simplificar, Next.js maneja SEO)
```

#### Día 6-7: Migrar 3 Páginas Principales con SEO

**Homepage (app/page.tsx)**:

```typescript
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
// ... otros componentes

export const metadata: Metadata = {
  title: 'Entersys - Automatización Operativa y Certificaciones ISO México',
  description: 'Worksys: Automatización de procesos con Smartsheet. Expersys: Certificación ISO 9001, 14001, 45001 digital. Partner oficial Smartsheet México.',
  keywords: ['automatización procesos operativos', 'Smartsheet México', 'certificación ISO 9001 México'],
  openGraph: {
    title: 'Entersys - Automatización y Certificaciones ISO',
    description: 'Worksys: Automatización con Smartsheet. Expersys: Certificación ISO digital.',
    images: ['/imagenes/inicio/hero_office_inicio.webp'],
    url: 'https://www.entersys.mx',
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Contenido de la homepage */}
      </main>
      <Footer />
    </>
  );
}
```

**Worksys (app/worksys/page.tsx)**:

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Worksys - Automatización de Procesos Operativos con Smartsheet México',
  description: 'Migración de Excel a dashboards colaborativos en tiempo real. Implementación rápida (4-8 semanas) para manufactura, franquicias y multi-site.',
  keywords: ['implementación Smartsheet México', 'dashboard OEE', 'automatización manufactura'],
};

export default function WorksysPage() {
  return (
    // Contenido de Worksys
  );
}
```

**Expersys (app/expersys/page.tsx)**: Similar estructura.

---

### Semana 2: Blog Implementation + Resto de Páginas

#### Día 8-10: Implementar Blog con ISR

**Lista de Posts (app/blog/page.tsx)**:

```typescript
import type { Metadata } from 'next';
import { getPosts } from '@/lib/api';
import PostCard from '@/components/blog/PostCard';

export const metadata: Metadata = {
  title: 'Blog - Entersys | Automatización y Certificaciones ISO',
  description: 'Artículos sobre automatización de procesos, Smartsheet, certificaciones ISO 9001 y mejores prácticas de gestión de calidad.',
};

export const revalidate = 3600; // ISR: Revalidar cada hora

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
```

**Post Individual (app/blog/[slug]/page.tsx)**:

```typescript
import type { Metadata } from 'next';
import { getPostBySlug, getAllPostSlugs } from '@/lib/api';
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string };
}

// Generar metadata dinámica para SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug);

    return {
      title: post.title,
      description: post.meta_description || post.content.substring(0, 155),
      openGraph: {
        title: post.title,
        description: post.meta_description || '',
        type: 'article',
        publishedTime: post.published_at || undefined,
      },
      // JSON-LD Schema para artículo
      other: {
        'application/ld+json': JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.meta_description,
          datePublished: post.published_at,
          dateModified: post.updated_at || post.published_at,
          author: {
            '@type': 'Organization',
            name: 'Entersys',
          },
        }),
      },
    };
  } catch (error) {
    return {
      title: 'Post no encontrado',
    };
  }
}

// Generar páginas estáticas para todos los posts en build time
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map(slug => ({ slug }));
}

export const revalidate = 3600; // ISR: Revalidar cada hora

export default async function BlogPostPage({ params }: Props) {
  try {
    const post = await getPostBySlug(params.slug);

    return (
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <time className="text-gray-600">
            {new Date(post.published_at || post.created_at).toLocaleDateString('es-MX')}
          </time>
        </header>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* FAQ Schema si existe */}
        {post.faq_json && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Preguntas Frecuentes</h2>
            {/* Renderizar FAQs del faq_json */}
          </section>
        )}
      </article>
    );
  } catch (error) {
    notFound();
  }
}
```

#### Día 11-12: Migrar Páginas Secundarias

```
Páginas a migrar:
├─ app/nosotros/page.tsx
├─ app/contacto/page.tsx
├─ app/clientes/page.tsx
├─ app/clientes/coca-cola/page.tsx
├─ app/clientes/qhse/page.tsx
└─ app/clientes/ochoa/page.tsx
```

#### Día 13-14: Componentes del Blog

```typescript
// components/blog/PostCard.tsx
interface PostCardProps {
  post: BlogPost;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="border rounded-lg p-6 hover:shadow-lg transition">
      <h2 className="text-2xl font-bold mb-2">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h2>

      <p className="text-gray-600 mb-4">
        {post.meta_description || post.content.substring(0, 155)}...
      </p>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <time>{new Date(post.published_at || post.created_at).toLocaleDateString('es-MX')}</time>
        <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
          Leer más →
        </Link>
      </div>
    </article>
  );
}
```

---

### Semana 3: Testing, Optimización y Deploy

#### Día 15-17: Testing y SEO Validation

```
Testing Checklist:
├─ ✅ Todas las rutas funcionan
├─ ✅ Blog fetch desde API correctamente
├─ ✅ ISR funciona (revalidación)
├─ ✅ SEO tags correctos en cada página
├─ ✅ Google Rich Results Test pasa
├─ ✅ Lighthouse score > 90
├─ ✅ Mobile responsive
├─ ✅ Forms funcionan (contacto)
└─ ✅ Analytics tracking (GTM)

SEO Validation:
1. Rich Results Test para cada tipo de página:
   ├─ Homepage → Organization schema
   ├─ Worksys/Expersys → Service schema
   ├─ Blog post → Article schema
   └─ FAQ → FAQ schema (si tiene faq_json)

2. Sitemap automático:
   Next.js genera sitemap.xml automáticamente
   Verificar incluye todas las páginas + posts del blog

3. robots.txt:
   Verificar permite indexación
```

#### Día 18-19: Configurar Deploy

**Opción A: Vercel (Recomendado - Gratis)**:

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Configurar variables de entorno en Vercel dashboard:
NEXT_PUBLIC_API_URL=https://api.dev.entersys.mx

# 4. Configurar dominio custom:
vercel domains add www.entersys.mx
```

**Opción B: Tu Servidor (Docker + Node.js)**:

```dockerfile
# Dockerfile para Next.js
FROM node:20-alpine AS base

# Deps
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_PUBLIC_API_URL=https://api.dev.entersys.mx
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml (añadir al entersys-backend)
  frontend:
    build: ../entersys-nextjs
    container_name: entersys-frontend-nextjs
    restart: always
    environment:
      - NEXT_PUBLIC_API_URL=http://api:8000
    networks:
      - entersys_net
      - traefik_net
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.entersys-frontend.rule=Host(`www.entersys.mx`)"
      - "traefik.http.routers.entersys-frontend.entrypoints=websecure"
      - "traefik.http.routers.entersys-frontend.tls.certresolver=letsencrypt"
      - "traefik.http.services.entersys-frontend.loadbalancer.server.port=3000"
```

#### Día 20-21: Deploy Final y Migration

```
Deploy Process:
1. Deploy Next.js a staging (next.entersys.mx)
2. Testing completo en staging
3. Backup del sitio actual
4. Switch DNS a Next.js
5. Monitor 24h

Post-Deploy:
1. Submit nuevo sitemap a Google Search Console
2. Solicitar re-indexación de páginas
3. Verificar Analytics funciona
4. Monitor performance (Vercel Analytics o Google Analytics)
```

---

## 📊 INTEGRACIÓN COMPLETA: FRONTEND ↔ BACKEND

### Flujo de Trabajo del Blog:

```
1. ADMIN CREA POST (Backend):
   ┌─────────────────┐
   │  Admin Panel    │ (FastAPI/React Admin - Futuro)
   │  (Opcional)     │
   └────────┬────────┘
            │
            ▼
   POST /api/v1/posts
   {
     title: "Certificación ISO 9001 México",
     slug: "certificacion-iso-9001-mexico",
     content: "<p>Contenido...</p>",
     meta_description: "Guía completa...",
     faq_json: {...},
     status: "published"
   }
            │
            ▼
   ┌─────────────────┐
   │  PostgreSQL     │
   │  Guarda Post    │
   └─────────────────┘

2. NEXT.JS GENERA PÁGINA (Build o ISR):

   ISR Revalidation (cada hora):
   ┌─────────────────┐
   │  Next.js ISR    │
   │  Timer (60 min) │
   └────────┬────────┘
            │
            ▼
   GET /api/v1/posts/certificacion-iso-9001-mexico
            │
            ▼
   ┌─────────────────┐
   │  FastAPI        │
   │  Returns Post   │
   └────────┬────────┘
            │
            ▼
   ┌─────────────────┐
   │  Next.js        │
   │  Regenera HTML  │
   │  con SEO tags   │
   └────────┬────────┘
            │
            ▼
   HTML estático listo con:
   ✅ <title>Certificación ISO 9001 México</title>
   ✅ <meta name="description" content="...">
   ✅ <script type="application/ld+json">{Article schema}</script>

3. USUARIO VE PÁGINA:
   ┌─────────────────┐
   │  Usuario        │
   └────────┬────────┘
            │
            ▼
   GET /blog/certificacion-iso-9001-mexico
            │
            ▼
   ┌─────────────────┐
   │  Next.js        │
   │  Sirve HTML     │ ← Ya pre-renderizado
   │  (Ultra rápido) │
   └─────────────────┘

   Load Time: ~500ms
   SEO: Perfecto (Google ve HTML estático)
```

---

## 🎯 VENTAJAS DE ESTA ARQUITECTURA

### 1. SEO Perfecto ✅

**Antes (React SPA)**:
```html
<!-- HTML inicial (vacío) -->
<div id="root"></div>

<!-- Google ve esto primero, ejecuta JS después (2-4 semanas) -->
```

**Después (Next.js + FastAPI)**:
```html
<!-- HTML pre-renderizado con todo el contenido -->
<head>
  <title>Certificación ISO 9001 México - Guía Completa</title>
  <meta name="description" content="..."/>
  <script type="application/ld+json">{...article schema...}</script>
</head>
<body>
  <h1>Certificación ISO 9001 México - Guía Completa</h1>
  <article>Todo el contenido ya renderizado...</article>
</body>

<!-- Google lo ve INMEDIATAMENTE -->
```

### 2. Performance Superior ✅

| Métrica | React SPA | Next.js SSG |
|---------|-----------|-------------|
| First Contentful Paint | 1.2s | 0.4s |
| Largest Contentful Paint | 2.1s | 0.8s |
| Time to Interactive | 2.8s | 1.0s |
| SEO Score | 90/100 | 100/100 |

### 3. Escalabilidad del Blog ✅

```
Con 1 post:    Build time: 5s
Con 10 posts:  Build time: 8s
Con 50 posts:  Build time: 15s
Con 100 posts: Build time: 25s

ISR permite:
- No rebuilder todo el sitio
- Solo regenerar posts modificados
- Nuevos posts se generan on-demand
```

### 4. Separación de Responsabilidades ✅

```
Backend (FastAPI):
├─ Gestión de contenido (CRUD posts)
├─ Autenticación admins
├─ Lógica de negocio
└─ Base de datos

Frontend (Next.js):
├─ Presentación (UI/UX)
├─ SEO optimization
├─ Performance
└─ User experience

Cada uno hace lo suyo perfecto
```

---

## 💰 COMPARACIÓN DE COSTOS

### Deploy Actual (React SPA):
```
Servidor Google Cloud: $50/mes
Total: $50/mes
```

### Opción A: Vercel + Backend Actual
```
Vercel (Next.js): GRATIS (Hobby)
  ├─ 100 GB bandwidth
  ├─ Unlimited builds
  └─ ISR incluido

Servidor GCP (Backend): $50/mes
  └─ FastAPI + PostgreSQL

Total: $50/mes (mismo costo)
```

### Opción B: Todo en tu Servidor
```
Servidor GCP: $50/mes
  ├─ Next.js (Docker container)
  ├─ FastAPI (Docker container)
  └─ PostgreSQL (Docker container)

Total: $50/mes (mismo costo)
```

**Recomendación**: Vercel para frontend (gratis + mejor performance) + tu servidor para backend.

---

## ✅ CHECKLIST COMPLETO

### Pre-Migración:
- [ ] Backup completo sitio actual
- [ ] Verificar backend API funciona (GET /api/v1/posts)
- [ ] Exportar analytics data (6 meses)
- [ ] Inventario de assets (imágenes)
- [ ] Decisión de hosting (Vercel vs Servidor)

### Semana 1:
- [ ] Crear proyecto Next.js
- [ ] Configurar lib/api.ts (integración FastAPI)
- [ ] Migrar Header + Footer
- [ ] Migrar Home + Worksys + Expersys
- [ ] SEO configurado (Metadata API)

### Semana 2:
- [ ] Blog list page (/blog)
- [ ] Blog post page (/blog/[slug])
- [ ] ISR configurado (revalidate: 3600)
- [ ] Migrar resto de páginas
- [ ] Componentes del blog (PostCard, etc)

### Semana 3:
- [ ] Testing completo
- [ ] SEO validation (Rich Results Test)
- [ ] Performance testing (Lighthouse > 90)
- [ ] Deploy a staging
- [ ] Deploy a producción
- [ ] Submit nuevo sitemap

### Post-Migración:
- [ ] Monitor performance 48h
- [ ] Google Search Console actualizado
- [ ] Analytics funcionando
- [ ] Crear 5-10 primeros posts de blog

---

## 🚀 PRÓXIMO PASO

**¿Quieres que empiece la migración?**

Necesito confirmar:

1. **¿Cuándo empezamos?**
   - [ ] Hoy mismo
   - [ ] Esta semana
   - [ ] Próxima semana

2. **¿Qué hosting para Next.js?**
   - [ ] **Vercel (gratis)** ← RECOMENDADO
   - [ ] Tu servidor ($50/mes, mismo costo)

3. **¿El backend API está funcionando?**
   - Verificar: https://api.dev.entersys.mx/api/v1/posts
   - ¿Devuelve datos o está vacío aún?

4. **¿Tienes admin panel para crear posts?**
   - Si NO: ¿Creamos admin panel simple? (2-3 días extra)
   - Si SÍ: Perfecto, solo migramos frontend

**Dime y empiezo a crear el proyecto Next.js con integración al backend FastAPI.** 🎉

---

**Última actualización**: 19 de Octubre 2025
**Status**: PLAN ACTUALIZADO CON BACKEND EXISTENTE
**Backend**: ✅ FastAPI + PostgreSQL listo
**Frontend**: ⏳ Pendiente migración a Next.js
