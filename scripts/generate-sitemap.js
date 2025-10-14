/**
 * Dynamic Sitemap Generator
 * Genera sitemap.xml con todas las rutas del sitio
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://www.entersys.mx';

/**
 * Definir todas las rutas del sitio
 */
const routes = [
  // Páginas principales
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/inicio', priority: 1.0, changefreq: 'weekly' },
  { path: '/nosotros', priority: 0.9, changefreq: 'monthly' },
  { path: '/contacto', priority: 0.9, changefreq: 'monthly' },

  // Productos
  { path: '/worksys', priority: 0.9, changefreq: 'monthly' },
  { path: '/expersys', priority: 0.9, changefreq: 'monthly' },
  { path: '/awalab', priority: 0.8, changefreq: 'monthly' },

  // Case Studies / Clientes
  { path: '/clientes', priority: 0.8, changefreq: 'monthly' },
  { path: '/clientes/qhse', priority: 0.8, changefreq: 'monthly' },
  { path: '/clientes/femsa', priority: 0.8, changefreq: 'monthly' },
  { path: '/clientes/ochoa', priority: 0.8, changefreq: 'monthly' },

  // Blog
  { path: '/blog', priority: 0.7, changefreq: 'weekly' },
  { path: '/blog-entry', priority: 0.6, changefreq: 'weekly' },

  // Páginas legales
  { path: '/politica-de-privacidad', priority: 0.3, changefreq: 'yearly' },
  { path: '/terminos-de-servicio', priority: 0.3, changefreq: 'yearly' },
  { path: '/configuracion-de-cookies', priority: 0.3, changefreq: 'yearly' },
];

/**
 * Genera el XML del sitemap
 */
const generateSitemap = () => {
  const lastmod = new Date().toISOString().split('T')[0];

  const urlsXML = routes.map((route) => `
  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('');

  const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlsXML}
</urlset>`;

  return sitemapXML;
};

/**
 * Guarda el sitemap en public/
 */
const saveSitemap = () => {
  const sitemapXML = generateSitemap();
  const publicDir = path.resolve(__dirname, '../public');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');

  // Asegurar que existe el directorio public
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Guardar sitemap
  fs.writeFileSync(sitemapPath, sitemapXML, 'utf-8');

  console.log('✅ Sitemap generated successfully at:', sitemapPath);
  console.log(`📄 Total URLs: ${routes.length}`);
  console.log(`🌐 Site URL: ${SITE_URL}`);
};

// Ejecutar
saveSitemap();
