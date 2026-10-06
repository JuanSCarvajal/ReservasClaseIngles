import { Platform } from 'react-native';

export const Colors = {
  light: {
    primario: '#007AFF',
    superficie: '#F0F0F3',
    borde: '#E0E1E6',
    border: '#E0E1E6',
    texto: '#000000',
    textoSuave: '#60646C',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    text: '#000000',
    textSecondary: '#60646C',
  },
  dark: {
    primario: '#0A84FF',
    superficie: '#212225',
    borde: '#2E3135',
    border: '#2E3135',
    texto: '#ffffff',
    textoSuave: '#B0B4BA',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    text: '#ffffff',
    textSecondary: '#B0B4BA',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const Spacing = spacing;

export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  full: 9999,
};

export const Radius = radius;

export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});