import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente que hace scroll al tope de la página cada vez que cambia la ruta
 * Soluciona el problema de que React Router mantiene la posición del scroll
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll inmediato al tope cuando cambia la ruta
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Sin animación para que sea inmediato
    });
  }, [pathname]);

  return null;
}
