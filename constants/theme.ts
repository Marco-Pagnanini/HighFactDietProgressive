/**
 * Theme configuration for the fitness app
 * Colors and fonts used throughout the application
 */

import { Platform } from 'react-native';

// Colori principali dell'app


export const Colors = {
    primaryBlue : '#4A90E2',
     darkBackground : '#1A1A1A',
 cardBackground : '#2A2A2A',
 textLight : '#FFFFFF',
 textGray : '#A0A0A0',
 accentPink : '#FF6B9D',
    // Testi
    text: '#1A1A1A',
    textSecondary: '#666666',
    textTertiary: '#999999',

    // Sfondi
    background: '#F5F5F5',

    // Elementi UI
    border: '#E0E0E0',
    shadow: 'rgba(0, 0, 0, 0.1)',

    // Bottoni
    buttonPrimary: '#1A1A1A',
    buttonText: '#FFFFFF',

    // Tab bar
    tabIconDefault: '#999999',
    tabIconSelected: '#1A1A1A'

};

// Font configuration
export const Fonts = Platform.select({
  ios: {
    primary: 'Montserrat',
    secondary: 'Roboto',
    // Fallback per sistema iOS
    system: 'system-ui',
  },
  android: {
    primary: 'Montserrat',
    secondary: 'Roboto',
    // Fallback per sistema Android
    system: 'system-ui',
  },
  default: {
    primary: 'Montserrat',
    secondary: 'Roboto',
    system: 'normal',
  },
  web: {
    primary: "'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    secondary: "'Roboto', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    system: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
});

// Font weights
export const FontWeights = {
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
};

// Font sizes
export const FontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
};

// Spacing
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
};

// Border radius
export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

// Shadows (per le card)
export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};
