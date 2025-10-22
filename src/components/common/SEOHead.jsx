import { useEffect } from 'react';

export function SEOHead({
  title,
  description,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  category,
  tags = [],
  schema
}) {
  useEffect(() => {
    // Set title
    if (title) {
      document.title = `${title} | Entersys`;
    }

    // Set or update meta tags
    const setMetaTag = (property, content, isName = false) => {
      if (!content) return;

      const attribute = isName ? 'name' : 'property';
      let meta = document.querySelector(`meta[${attribute}="${property}"]`);

      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, property);
        document.head.appendChild(meta);
      }

      meta.setAttribute('content', content);
    };

    // Basic SEO meta tags
    setMetaTag('description', description, true);
    setMetaTag('keywords', tags.join(', '), true);
    setMetaTag('author', author || 'Entersys', true);

    // Open Graph meta tags
    setMetaTag('og:title', title);
    setMetaTag('og:description', description);
    setMetaTag('og:image', image);
    setMetaTag('og:url', url || window.location.href);
    setMetaTag('og:type', type);
    setMetaTag('og:site_name', 'Entersys');
    setMetaTag('og:locale', 'es_MX');

    if (type === 'article') {
      setMetaTag('article:published_time', publishedTime);
      setMetaTag('article:modified_time', modifiedTime);
      setMetaTag('article:author', author);
      setMetaTag('article:section', category);
      tags.forEach(tag => {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'article:tag');
        meta.setAttribute('content', tag);
        document.head.appendChild(meta);
      });
    }

    // Twitter Card meta tags
    setMetaTag('twitter:card', image ? 'summary_large_image' : 'summary', true);
    setMetaTag('twitter:title', title, true);
    setMetaTag('twitter:description', description, true);
    setMetaTag('twitter:image', image, true);
    setMetaTag('twitter:site', '@entersysmx', true);
    setMetaTag('twitter:creator', '@entersysmx', true);

    // Geo meta tags for Mexico
    setMetaTag('geo.region', 'MX', true);
    setMetaTag('geo.placename', 'México', true);
    setMetaTag('geo.position', '19.432608;-99.133209', true);
    setMetaTag('ICBM', '19.432608, -99.133209', true);

    // Additional SEO meta tags
    setMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1', true);
    setMetaTag('googlebot', 'index, follow', true);
    setMetaTag('language', 'Spanish', true);
    setMetaTag('rating', 'general', true);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url || window.location.href);

    // Schema.org JSON-LD
    if (schema) {
      let schemaScript = document.getElementById('schema-org');
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'schema-org';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    }

    // Cleanup function to remove added meta tags on unmount
    return () => {
      // Keep meta tags for better SEO persistence
    };
  }, [title, description, image, url, type, publishedTime, modifiedTime, author, category, tags, schema]);

  return null;
}
