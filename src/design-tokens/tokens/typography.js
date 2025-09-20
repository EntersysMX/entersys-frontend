// src/design-tokens/tokens/typography.js
// Basado en Typography.pdf con Titillium Web y Inter

export const typography = {
  // Fuentes definidas en Typography.pdf
  fontFamily: {
    heading: ['Titillium Web', 'system-ui', 'sans-serif'],
    body: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Monaco', 'monospace']
  },

  // Escalas responsive Desktop/Mobile
  fontSize: {
    // Desktop sizes
    desktop: {
      h1: ['3.5rem', { lineHeight: '120%' }],      // 56px
      h2: ['3rem', { lineHeight: '120%' }],        // 48px
      h3: ['2.5rem', { lineHeight: '120%' }],      // 40px
      h4: ['2rem', { lineHeight: '130%' }],        // 32px
      h5: ['1.5rem', { lineHeight: '130%' }],      // 24px
      h6: ['1.25rem', { lineHeight: '140%' }],     // 20px
      tagline: ['1.25rem', { lineHeight: '150%' }] // 20px
    },

    // Mobile sizes
    mobile: {
      h1: ['2.5rem', { lineHeight: '120%' }],      // 40px
      h2: ['2.25rem', { lineHeight: '120%' }],     // 36px
      h3: ['2rem', { lineHeight: '120%' }],        // 32px
      h4: ['1.5rem', { lineHeight: '130%' }],      // 24px
      h5: ['1.25rem', { lineHeight: '140%' }],     // 20px
      h6: ['1.125rem', { lineHeight: '140%' }],    // 18px
      tagline: ['1rem', { lineHeight: '150%' }]    // 16px
    },

    // Body text sizes - mismo para desktop y mobile
    'text-large': ['1.125rem', { lineHeight: '150%' }],   // 18px
    'text-medium': ['1rem', { lineHeight: '150%' }],      // 16px
    'text-regular': ['0.875rem', { lineHeight: '150%' }], // 14px
    'text-small': ['0.75rem', { lineHeight: '150%' }]     // 12px
  },

  // Pesos de fuente - todos los disponibles
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800'
  },

  // Line heights específicos
  lineHeight: {
    heading: '120%',
    subheading: '130%',
    body: '140%',
    text: '150%'
  }
};