// src/design-tokens/tokens/colors.js
// Basado en Variables.pdf - Primitive Variables

export const colors = {
  // Neutrals - Escala completa de grises
  neutral: {
    white: '#FFFFFF',
    lightest: '#F2F2F2',
    lighter: '#D8D9D9',
    light: '#B2B4B4',
    DEFAULT: '#7F8383',
    dark: '#4C5252',
    darker: '#192020',
    darkest: '#000808'
  },

  // Entersys_org - Color principal de la marca
  primary: {
    lightest: '#E5F5F6',
    lighter: '#CCEBED',
    light: '#4CB9C0',
    DEFAULT: '#009CA6',
    dark: '#007C84',
    darker: '#003E42',
    darkest: '#002E31'
  },

  // Premiumsys - Color secundario premium
  secondary: {
    lightest: '#E6EBED',
    lighter: '#CDD8DC',
    light: '#527786',
    DEFAULT: '#093D53',
    dark: '#073042',
    darker: '#031821',
    darkest: '#021218'
  },

  // Gold - Color accent dorado
  gold: {
    lightest: '#F8F6F0',
    lighter: '#F2EDE1',
    light: '#D4C098',
    DEFAULT: '#C2A56D',
    dark: '#9B8457',
    darker: '#4D422B',
    darkest: '#3A3120'
  },

  // Oslo Gray - Grises alternativos
  gray: {
    lightest: '#F1F3F3',
    lighter: '#E4E7E8',
    light: '#A3ABAF',
    DEFAULT: '#7C878E',
    dark: '#636C71',
    darker: '#313638',
    darkest: '#25282A'
  },

  // Estados del sistema
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#009CA6'
};

// Color Schemes - 5 esquemas de color predefinidos
export const colorSchemes = {
  scheme1: {
    text: '#000808',
    background: '#FFFFFF',
    foreground: '#FFFFFF',
    border: 'rgba(0, 8, 8, 0.15)',
    accent: '#009CA6'
  },
  scheme2: {
    text: '#FFFFFF',
    background: '#192020',
    foreground: '#192020',
    border: 'rgba(255, 255, 255, 0.2)',
    accent: '#FFFFFF'
  },
  scheme3: {
    text: '#000808',
    background: '#E5F5F6',
    foreground: '#E5F5F6',
    border: 'rgba(0, 8, 8, 0.15)',
    accent: '#000808'
  },
  scheme4: {
    text: '#FFFFFF',
    background: '#009CA6',
    foreground: '#009CA6',
    border: 'rgba(255, 255, 255, 0.2)',
    accent: '#FFFFFF'
  },
  scheme5: {
    text: '#FFFFFF',
    background: '#093D53',
    foreground: '#093D53',
    border: 'rgba(255, 255, 255, 0.2)',
    accent: '#FFFFFF'
  }
};