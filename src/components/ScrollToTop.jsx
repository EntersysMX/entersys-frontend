import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente que hace scroll al tope de la página cada vez que cambia la ruta
 * Soluciona el problema de que React Router mantiene la posición del scroll
 * Respeta los hash fragments (#formulario-contacto, etc.)
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Si hay un hash (ej: #formulario-contacto), hacer scroll a ese elemento
    if (hash) {
      // Intentar scroll inmediato primero (caso más común)
      const element = document.querySelector(hash);
      if (element) {
        // Elemento ya disponible, scroll inmediato
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Elemento no disponible aún, reintentar con delays
        let attempts = 0;
        const maxAttempts = 8;
        const scrollToHash = () => {
          const el = document.querySelector(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else if (attempts < maxAttempts) {
            attempts++;
            setTimeout(scrollToHash, 100);
          } else {
            // Fallback: scroll al tope
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }
        };
        setTimeout(scrollToHash, 50);
      }
    } else {
      // Sin hash, scroll al tope inmediatamente
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }
  }, [pathname, hash]);

  return null;
}
