import { DefaultTheme } from "styled-components";
import "@design-sys/theme/types";

// Tema claro
export const lightTheme: DefaultTheme = {
  colors: {
    primary: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#ef4444",
      500: "#dc2626",
      600: "#b91c1c",
      700: "#991b1b",
      800: "#7f1d1d",
      900: "#450a0a",
    },
    secondary: {
      50: "#fafafa",
      100: "#f4f4f5",
      200: "#e4e4e7",
      300: "#d4d4d8",
      400: "#52525b",
      500: "#27272a",
      600: "#18181b",
      700: "#09090b",
      800: "#09090b",
      900: "#09090b",
    },
    tertiary: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#ef4444",
      500: "#b91c1c",
      600: "#991b1b",
      700: "#7f1d1d",
      800: "#450a0a",
      900: "#450a0a",
    },
    neutral: {
      50: "#ffffff",
      100: "#fafafa",
      200: "#f4f4f5",
      300: "#e4e4e7",
      400: "#d4d4d8",
      500: "#71717a",
      600: "#52525b",
      700: "#3f3f46",
      800: "#18181b",
      900: "#09090b",
    },
    success: {
      50: "#052e16",
      500: "#25d366",
      600: "#4ade80",
      700: "#0f8a43",
    },
    warning: {
      50: "#fffbeb",
      500: "#d97706",
      600: "#b45309",
      700: "#92400e",
    },
    error: {
      50: "#fef2f2",
      500: "#dc2626",
      600: "#b91c1c",
      700: "#991b1b",
    },
    info: {
      50: "#f4f4f5",
      500: "#3f3f46",
      600: "#27272a",
      700: "#18181b",
    },
    background: {
      primary: "#f4f4f5",
      secondary: "#e4e4e7",
      tertiary: "#d4d4d8",
      surface: "#ffffff",
      card: "#ffffff",
    },
    text: {
      primary: "#09090b",
      secondary: "#3f3f46",
      tertiary: "#71717a",
      inverse: "#ffffff",
    },
    border: {
      light: "#e4e4e7",
      normal: "#d4d4d8",
      dark: "#a1a1aa",
    },
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
  },
  shadows: {
    light: "0 2px 6px rgba(9, 9, 11, 0.06)",
    medium: "0 6px 16px rgba(9, 9, 11, 0.1)",
    heavy: "0 14px 28px rgba(9, 9, 11, 0.14)",
  },
  breakpoints: {
    xs: "0px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
  },
  typography: {
    fontFamily: {
      primary:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      secondary: 'Georgia, "Times New Roman", Times, serif',
      mono: 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
    },
    fontSize: {
      xs: "12px",
      sm: "14px",
      md: "16px",
      lg: "18px",
      xl: "20px",
      xxl: "24px",
      xxxl: "32px",
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
    fontScale: {
      normal: 0,
      medium: 3,
      large: 6,
    },
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
  transitions: {
    fast: "0.15s ease",
    normal: "0.2s ease",
    slow: "0.3s ease",
  },
  highlight: {
    main: "#dc2626",
    light: "#ef4444",
    glow: "rgba(220, 38, 38, 0.25)",
  },
  brand: {
    purple400: "#52525b",
    pink500: "#dc2626",
    indigo500: "#b91c1c",
    indigo400: "#3f3f46",
  },
  effects: {
    glassBackground: "rgba(255, 255, 255, 0.92)",
    glassBorder: "rgba(63, 63, 70, 0.2)",
    glassShadow: "0 10px 28px 0 rgba(9, 9, 11, 0.08), 0 0 12px rgba(220, 38, 38, 0.08)",
    blur: {
      subtle: "4px",
      glass: "12px",
      heavy: "16px",
      extreme: "60px",
    },
    glow: {
      primary: "0 0 16px rgba(220, 38, 38, 0.22), 0 4px 12px rgba(9, 9, 11, 0.08)",
      premium: "0 0 20px rgba(220, 38, 38, 0.28), 0 4px 14px rgba(9, 9, 11, 0.1)",
      success: "0 0 14px rgba(39, 39, 42, 0.16), 0 4px 12px rgba(9, 9, 11, 0.08)",
    },
  },
  gradients: {
    brand: "linear-gradient(135deg, #09090b 0%, #3f3f46 55%, #dc2626 100%)",
    premium: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
    highlight: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    glass: "linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(244, 244, 245, 0.6) 100%)",
  },
  animations: {
    duration: {
      instant: "100ms",
      fast: "200ms",
      normal: "300ms",
      slow: "500ms",
      slower: "1s",
      slowest: "2s",
    },
    easing: {
      default: "ease",
      smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      spring: "cubic-bezier(0.16, 1, 0.3, 1)",
      bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    },
  },
  animatedBackground: {
    darkGradient1: "#f4f4f5",
    darkGradient2: "#e4e4e7",
    darkGradient3: "#f4f4f5",
    starColor: "#dc2626",
    starColorAlpha80: "rgba(220, 38, 38, 0.8)",
    starColorAlpha90: "rgba(220, 38, 38, 0.9)",
    starColorAlpha70: "rgba(220, 38, 38, 0.7)",
    starColorAlpha60: "rgba(220, 38, 38, 0.6)",
    auroraIndigo: "rgba(220, 38, 38, 0.08)",
    auroraTertiary: "rgba(82, 82, 91, 0.08)",
    auroraCyan: "rgba(185, 28, 28, 0.06)",
  },
};

// Tema oscuro
export const darkTheme: DefaultTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: {
      50: "#450a0a",
      100: "#7f1d1d",
      200: "#991b1b",
      300: "#b91c1c",
      400: "#dc2626",
      500: "#dc2626",
      600: "#ef4444",
      700: "#f87171",
      800: "#fca5a5",
      900: "#fee2e2",
    },
    secondary: {
      50: "#18181b",
      100: "#27272a",
      200: "#3f3f46",
      300: "#52525b",
      400: "#a1a1aa",
      500: "#d4d4d8",
      600: "#e4e4e7",
      700: "#f4f4f5",
      800: "#fafafa",
      900: "#ffffff",
    },
    tertiary: {
      50: "#450a0a",
      100: "#7f1d1d",
      200: "#991b1b",
      300: "#b91c1c",
      400: "#dc2626",
      500: "#ff1e2d",
      600: "#ff5c67",
      700: "#fca5a5",
      800: "#fecaca",
      900: "#fee2e2",
    },
    neutral: {
      50: "#09090b",
      100: "#121216",
      200: "#1f1f26",
      300: "#27272a",
      400: "#3f3f46",
      500: "#71717a",
      600: "#a1a1aa",
      700: "#d4d4d8",
      800: "#e4e4e7",
      900: "#fafafa",
    },
    background: {
      primary: "#070709",
      secondary: "#0e0e12",
      tertiary: "#18181f",
      surface: "#121217",
      card: "#14141a",
    },
    text: {
      primary: "#fafafa",
      secondary: "#d4d4d8",
      tertiary: "#a1a1aa",
      inverse: "#ffffff",
    },
    border: {
      light: "#24242c",
      normal: "#343440",
      dark: "#4b4b59",
    },
  },
  shadows: {
    light: "0 2px 6px rgba(0, 0, 0, 0.5)",
    medium: "0 6px 16px rgba(0, 0, 0, 0.6)",
    heavy: "0 14px 32px rgba(0, 0, 0, 0.75)",
  },
  highlight: {
    main: "#ef4444",
    light: "#f87171",
    glow: "rgba(220, 38, 38, 0.4)",
  },
  effects: {
    ...lightTheme.effects,
    glassBackground: "rgba(22, 22, 27, 0.88)",
    glassBorder: "rgba(212, 212, 216, 0.18)",
    glassShadow: "0 12px 32px 0 rgba(0, 0, 0, 0.72), 0 0 18px rgba(220, 38, 38, 0.12)",
    glow: {
      primary: "0 0 20px rgba(220, 38, 38, 0.36), 0 4px 14px rgba(0, 0, 0, 0.55)",
      premium: "0 0 24px rgba(239, 68, 68, 0.42), 0 0 8px rgba(212, 212, 216, 0.18)",
      success: "0 0 18px rgba(212, 212, 216, 0.2), 0 4px 14px rgba(0, 0, 0, 0.55)",
    },
  },
  gradients: {
    brand: "linear-gradient(135deg, #ffffff 0%, #d4d4d8 55%, #ef4444 100%)",
    premium: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
    highlight: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    glass: "linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(22, 22, 27, 0.3) 100%)",
  },
};

// Temas de accesibilidad - Centralizados en theme.ts
export const highContrastTheme: DefaultTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    // Alto contraste: colores vibrantes sobre fondos contrastantes
    primary: {
      50: "#ffffff",
      100: "#ffffff",
      200: "#ffffff",
      300: "#ffffff",
      400: "#ffffff",
      500: "#0000ff", // Azul vibrante
      600: "#0000cc",
      700: "#000099",
      800: "#000066",
      900: "#000033",
    },
    secondary: {
      50: "#ffffff",
      100: "#ffffff",
      200: "#ffffff",
      300: "#ffffff",
      400: "#ffffff",
      500: "#ff0000", // Rojo vibrante
      600: "#cc0000",
      700: "#990000",
      800: "#660000",
      900: "#330000",
    },
    tertiary: {
      50: "#ffffff",
      100: "#ffffff",
      200: "#ffffff",
      300: "#ffffff",
      400: "#ffffff",
      500: "#00ff00", // Verde vibrante
      600: "#00cc00",
      700: "#009900",
      800: "#006600",
      900: "#003300",
    },
    neutral: {
      50: "#ffffff", // Blanco puro
      100: "#ffffff",
      200: "#ffffff",
      300: "#ffffff",
      400: "#ffffff",
      500: "#000000", // Negro puro
      600: "#000000",
      700: "#000000",
      800: "#000000",
      900: "#000000",
    },
    success: {
      50: "#ffffff",
      500: "#00ff00", // Verde brillante
      600: "#00cc00",
      700: "#009900",
    },
    warning: {
      50: "#ffffff",
      500: "#ffff00", // Amarillo brillante
      600: "#cccc00",
      700: "#999900",
    },
    error: {
      50: "#ffffff",
      500: "#ff0000", // Rojo brillante
      600: "#cc0000",
      700: "#990000",
    },
    info: {
      50: "#ffffff",
      500: "#0000ff", // Azul brillante
      600: "#0000cc",
      700: "#000099",
    },
    background: {
      primary: "#ffffff", // Fondo blanco
      secondary: "#ffffff",
      tertiary: "#ffffff",
      surface: "#ffffff",
      card: "#ffffff",
    },
    text: {
      primary: "#000000", // Texto negro
      secondary: "#000000",
      tertiary: "#000000",
      inverse: "#ffffff", // Texto blanco para fondos oscuros
    },
    border: {
      light: "#000000", // Bordes negros
      normal: "#000000",
      dark: "#000000",
    },
  },
  typography: {
    ...lightTheme.typography,
    fontWeight: {
      light: 400,
      normal: 500,
      medium: 600,
      semibold: 700,
      bold: 800,
    },
  },
};

// Exportar el tipo para uso en otros archivos
export type { DefaultTheme };
