// src/design-tokens/tokens/radius.js
// Basado en Radius.pdf - 3 tamaños según el ancho de columna

export const borderRadius = {
  // Small radius - elementos menores a 4 columnas
  small: '0.25rem', // 4px

  // Medium radius - elementos entre 2-3 columnas
  medium: '0.5rem', // 8px

  // Large radius - elementos de 1-2 columnas
  large: '0.75rem', // 12px

  // Extras para flexibilidad
  none: '0',
  xs: '0.125rem', // 2px
  xl: '1rem',     // 16px
  '2xl': '1.5rem', // 24px
  full: '9999px'   // Círculos/pills
};