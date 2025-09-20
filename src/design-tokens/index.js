// src/design-tokens/index.js
// Exportaciones centralizadas

export { colors, colorSchemes } from './tokens/colors.js';
export { typography } from './tokens/typography.js';
export { shadows } from './tokens/shadows.js';
export { borderRadius } from './tokens/radius.js';
export { spacing } from './tokens/spacing.js';
export { animations } from './tokens/animations.js';

// Design tokens unificados
import { colors, colorSchemes } from './tokens/colors.js';
import { typography } from './tokens/typography.js';
import { shadows } from './tokens/shadows.js';
import { borderRadius } from './tokens/radius.js';
import { spacing } from './tokens/spacing.js';
import { animations } from './tokens/animations.js';

export const designTokens = {
  colors,
  colorSchemes,
  typography,
  shadows,
  borderRadius,
  spacing,
  animations
};

// Función helper para aplicar color schemes
export const applyColorScheme = (schemeNumber) => {
  const scheme = colorSchemes[`scheme${schemeNumber}`];
  if (!scheme) return {};

  return {
    color: scheme.text,
    backgroundColor: scheme.background,
    borderColor: scheme.border,
    '--accent-color': scheme.accent
  };
};