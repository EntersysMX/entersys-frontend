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
      // Intentar hacer scroll con múltiples reintentos para asegurar que el elemento está en DOM
      let attempts = 0;
      const maxAttempts = 10;
      const interval = 100; // Reintentar cada 100ms

      const scrollToHash = () => {
        const element = document.querySelector(hash);
        if (element) {
          // Elemento encontrado, hacer scroll
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return true;
        } else if (attempts < maxAttempts) {
          // Elemento no encontrado, reintentar
          attempts++;
          setTimeout(scrollToHash, interval);
          return false;
        } else {
          // Máximo de reintentos alcanzado, scroll al tope
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          return false;
        }
      };

      // Iniciar el proceso de scroll con un pequeño delay inicial
      setTimeout(scrollToHash, 100);
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
