// src/design-tokens/tokens/shadows.js
// Basado en Shadows.pdf - 7 niveles de sombra

export const shadows = {
  xxsmall: '0 1px 2px rgba(0, 0, 0, 0.05)',
  xsmall: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
  small: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
  medium: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
  large: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
  xlarge: '0 25px 50px rgba(0, 0, 0, 0.15), 0 15px 20px rgba(0, 0, 0, 0.1)',
  xxlarge: '0 35px 60px rgba(0, 0, 0, 0.2), 0 20px 30px rgba(0, 0, 0, 0.12)',

  // Sombras especiales
  inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
  outline: '0 0 0 3px rgba(0, 156, 166, 0.1)', // primary color
  none: 'none'
};