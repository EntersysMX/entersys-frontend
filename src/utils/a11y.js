/**
 * Accessibility (a11y) Utilities
 * Herramientas para mejorar la accesibilidad del sitio
 */

/**
 * Maneja el focus trap en modales
 * @param {HTMLElement} element - Elemento del modal
 */
export const trapFocus = (element) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  const handleTab = (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  };

  element.addEventListener('keydown', handleTab);
  firstFocusable?.focus();

  return () => {
    element.removeEventListener('keydown', handleTab);
  };
};

/**
 * Anuncia mensajes a screen readers
 * @param {string} message - Mensaje a anunciar
 * @param {string} priority - 'polite' o 'assertive'
 */
export const announceToScreenReader = (message, priority = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * Genera un ID único para aria-describedby
 */
export const generateAriaId = () => {
  return `aria-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Verifica si el usuario prefiere reduced motion
 */
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Hook para detectar cambios en prefers-reduced-motion
 */
export const usePrefersReducedMotion = (callback) => {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const handleChange = (e) => {
    callback(e.matches);
  };

  mediaQuery.addEventListener('change', handleChange);
  callback(mediaQuery.matches);

  return () => {
    mediaQuery.removeEventListener('change', handleChange);
  };
};

/**
 * Maneja skip links para navegación rápida
 */
export const initSkipLinks = () => {
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Saltar al contenido principal';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #000;
    color: #fff;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
  `;

  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
  });

  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });

  document.body.insertBefore(skipLink, document.body.firstChild);
};

/**
 * Valida contraste de colores (WCAG AA)
 * @param {string} foreground - Color de texto (hex)
 * @param {string} background - Color de fondo (hex)
 */
export const checkColorContrast = (foreground, background) => {
  const getLuminance = (hex) => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

  return {
    ratio: ratio.toFixed(2),
    AA: ratio >= 4.5,
    AAA: ratio >= 7,
  };
};

/**
 * Keyboard navigation helper
 */
export const handleArrowNavigation = (event, items, currentIndex, onSelect) => {
  const { key } = event;
  let newIndex = currentIndex;

  switch (key) {
    case 'ArrowDown':
      event.preventDefault();
      newIndex = (currentIndex + 1) % items.length;
      break;
    case 'ArrowUp':
      event.preventDefault();
      newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
      break;
    case 'Home':
      event.preventDefault();
      newIndex = 0;
      break;
    case 'End':
      event.preventDefault();
      newIndex = items.length - 1;
      break;
    case 'Enter':
    case ' ':
      event.preventDefault();
      onSelect(items[currentIndex]);
      return;
    default:
      return;
  }

  items[newIndex]?.focus();
};

export default {
  trapFocus,
  announceToScreenReader,
  generateAriaId,
  prefersReducedMotion,
  usePrefersReducedMotion,
  initSkipLinks,
  checkColorContrast,
  handleArrowNavigation,
};
