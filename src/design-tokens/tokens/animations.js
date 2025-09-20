// src/design-tokens/tokens/animations.js
// Animaciones y transiciones suaves

export const animations = {
  // Duraciones
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms'
  },

  // Timing functions
  timing: {
    linear: 'linear',
    ease: 'ease',
    'ease-in': 'ease-in',
    'ease-out': 'ease-out',
    'ease-in-out': 'ease-in-out'
  },

  // Transiciones predefinidas
  transition: {
    all: 'all 200ms ease-in-out',
    colors: 'color 150ms ease-in-out, background-color 150ms ease-in-out, border-color 150ms ease-in-out',
    opacity: 'opacity 150ms ease-in-out',
    shadow: 'box-shadow 150ms ease-in-out',
    transform: 'transform 150ms ease-in-out'
  }
};