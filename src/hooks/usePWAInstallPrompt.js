import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook para controlar el prompt de instalación de PWA.
 * Previene el prompt en rutas de onboarding donde no queremos distracciones.
 */
export const usePWAInstallPrompt = () => {
  const location = useLocation();

  useEffect(() => {
    // Rutas donde NO queremos mostrar el prompt de instalación
    const BLOCKED_ROUTES = [
      '/curso-seguridad',
      '/formulario-curso-seguridad',
      '/certificacion-seguridad',
      '/credencial-kof',
      '/actualizar-perfil',
    ];

    // Verificar si estamos en una ruta bloqueada
    const isBlockedRoute = BLOCKED_ROUTES.some(route =>
      location.pathname.startsWith(route)
    );

    if (!isBlockedRoute) {
      // Si no es una ruta bloqueada, no hacer nada
      return;
    }

    // Handler para prevenir el prompt de instalación
    const preventInstallPrompt = (event) => {
      // Prevenir que el navegador muestre el prompt de instalación
      event.preventDefault();

      // No guardar el evento para uso posterior
      // (normalmente se guardaría para mostrarlo en un momento personalizado)
      console.log('🚫 PWA install prompt blocked on onboarding route:', location.pathname);
    };

    // Escuchar el evento beforeinstallprompt
    window.addEventListener('beforeinstallprompt', preventInstallPrompt);

    // Cleanup: remover el listener cuando el componente se desmonte o cambie la ruta
    return () => {
      window.removeEventListener('beforeinstallprompt', preventInstallPrompt);
    };
  }, [location.pathname]);
};
