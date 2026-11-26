import type { ThemeOverride } from '@factory/shared/design-sys/theme/types';

/**
 * SOBREESCRITURAS LOCALES DE TIPOGRAFÍA, ESPACIADOS Y RADIOS PARA AVATAR GROUP
 *
 * Los colores, fondos, brillos neón (effects.glow) y glassBackground se definen
 * específicamente en dark.ts (tema por defecto) y light.ts para garantizar
 * contraste óptimo en ambos modos sin pisar el modo oscuro con fondos claros.
 */
export const localThemeOverride: ThemeOverride = {
  typography: {
    fontFamily: {
      primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      secondary: '"Outfit", "Inter", sans-serif',
      mono: 'source-code-pro, Menlo, Monaco, Consolas, monospace',
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      xxl: '24px',
      xxxl: '32px',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.55,
      relaxed: 1.75,
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '20px',
  },
};
