/**
 * Security Headers Plugin for Vite
 * Agrega headers de seguridad HTTP durante el desarrollo
 * En producción, estos headers deben configurarse en el servidor web (nginx, apache, etc.)
 */

export function securityHeadersPlugin() {
  return {
    name: 'security-headers',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // X-Frame-Options: Previene clickjacking
        res.setHeader('X-Frame-Options', 'SAMEORIGIN');

        // X-Content-Type-Options: Previene MIME type sniffing
        res.setHeader('X-Content-Type-Options', 'nosniff');

        // X-XSS-Protection: Protección XSS para navegadores legacy
        res.setHeader('X-XSS-Protection', '1; mode=block');

        // Referrer-Policy: Control de información de referrer
        res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

        // Permissions-Policy: Control de features del navegador
        res.setHeader('Permissions-Policy',
          'camera=(), microphone=(), geolocation=(), interest-cohort=()'
        );

        // Strict-Transport-Security (HSTS): Fuerza HTTPS
        // Solo en producción - se debe configurar en el servidor
        if (process.env.NODE_ENV === 'production') {
          res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        }

        next();
      });
    }
  };
}

/**
 * Genera archivo _headers para Netlify/Vercel deployment
 */
export function generateSecurityHeadersFile() {
  return `/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.png
  Cache-Control: public, max-age=31536000, immutable

/*.jpg
  Cache-Control: public, max-age=31536000, immutable

/*.webp
  Cache-Control: public, max-age=31536000, immutable

/*.svg
  Cache-Control: public, max-age=31536000, immutable

/index.html
  Cache-Control: public, max-age=0, must-revalidate
`;
}
