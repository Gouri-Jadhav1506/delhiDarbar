export const Colors = {
  light: {
    background: '#042D31', // Maintaining Dark Theme for Premium Look
    surface: '#053B40',
    primary: '#FEA116',
    secondary: '#FEA42B',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.6)',
    border: 'rgba(254, 161, 22, 0.15)',
    glass: 'rgba(255, 255, 255, 0.05)',
    accent: '#FEA116',
    whatsapp: '#FEA116',
  },
  dark: {
    background: '#042D31',
    surface: '#053B40',
    primary: '#FEA116',
    secondary: '#FEA42B',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.6)',
    border: 'rgba(254, 161, 22, 0.15)',
    glass: 'rgba(255, 255, 255, 0.05)',
    accent: '#FEA116',
    whatsapp: '#FEA116',
  },
  // Flattened for backward compatibility in existing components
  background: '#042D31',
  surface: '#053B40',
  primary: '#FEA116',
  secondary: '#FEA42B',
  text: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.6)',
  border: 'rgba(254, 161, 22, 0.15)',
  glass: 'rgba(255, 255, 255, 0.05)',
  accent: '#FEA116',
  whatsapp: '#FEA116',
};

export const Fonts = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  semiBold: 'System',
  black: 'System',
  rounded: 'System',
  mono: 'System',
};

export const Typography = {
  h1: {
    fontSize: 32,
    fontWeight: '800' as const,
    letterSpacing: 0.5,
    color: Colors.text,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  body: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  caption: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
};
