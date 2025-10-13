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
      // Pequeño delay para asegurar que el elemento existe en el DOM
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          // Si el elemento no existe, scroll al tope
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
      }, 100);
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
