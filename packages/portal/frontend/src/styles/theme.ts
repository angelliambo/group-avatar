import { DefaultTheme } from "styled-components";

// Extender el tema de styled-components
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      // Colores primarios
      primary: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      // Colores secundarios
      secondary: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      // Colores terciarios
      tertiary: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      // Colores neutros
      neutral: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      // Colores semánticos
      success: {
        50: string;
        500: string;
        600: string;
        700: string;
      };
      warning: {
        50: string;
        500: string;
        600: string;
        700: string;
      };
      error: {
        50: string;
        500: string;
        600: string;
        700: string;
      };
      info: {
        50: string;
        500: string;
        600: string;
        700: string;
      };
      // Colores de aplicación
      background: {
        primary: string;
        secondary: string;
        tertiary: string;
        surface: string;
        card: string;
      };
      text: {
        primary: string;
        secondary: string;
        tertiary: string;
        inverse: string;
      };
      border: {
        light: string;
        normal: string;
        dark: string;
      };
    };
    spacing: {
      // Desktop por defecto (valores Fibonacci)
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      // Responsive spacing
      mobile?: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
      };
      tablet?: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
      };
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    shadows: {
      light: string;
      medium: string;
      heavy: string;
    };
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    typography: {
      fontFamily: {
        primary: string;
        secondary: string;
        mono: string;
      };
      fontSize: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
        xxxl: string;
      };
      fontWeight: {
        light: number;
        normal: number;
        medium: number;
        semibold: number;
        bold: number;
      };
      lineHeight: {
        tight: number;
        normal: number;
        relaxed: number;
      };
      fontScale: {
        normal: number;
        medium: number;
        large: number;
      };
    };
    zIndex: {
      dropdown: number;
      sticky: number;
      fixed: number;
      modal: number;
      popover: number;
      tooltip: number;
    };
    transitions: {
      fast: string;
      normal: string;
      slow: string;
    };
    highlight: {
      main: string;
      light: string;
      glow: string;
    };
    brand: {
      purple400: string;
      pink500: string;
      indigo500: string;
      indigo400: string;
    };
    effects: {
      glassBackground: string;
      glassBorder: string;
      glassShadow: string;
      blur: {
        subtle: string;
        glass: string;
        heavy: string;
        extreme: string;
      };
      glow: {
        primary: string;
        premium: string;
        success: string;
      };
    };
    gradients: {
      brand: string;
      premium: string;
      highlight: string;
      glass: string;
    };
    animations: {
      duration: {
        instant: string;
        fast: string;
        normal: string;
        slow: string;
        slower: string;
        slowest: string;
      };
      easing: {
        default: string;
        smooth: string;
        spring: string;
        bounce: string;
      };
    };
    animatedBackground: {
      darkGradient1: string;
      darkGradient2: string;
      darkGradient3: string;
      starColor: string;
      starColorAlpha80: string;
      starColorAlpha90: string;
      starColorAlpha70: string;
      starColorAlpha60: string;
      auroraIndigo: string;
      auroraTertiary: string;
      auroraCyan: string;
    };
  }
}

// Tema claro
export const lightTheme: DefaultTheme = {
  colors: {
    primary: {
      50: "#f0f9ff",
      100: "#e0f2fe",
      200: "#bae6fd",
      300: "#7dd3fc",
      400: "#38bdf8",
      500: "#0284c7",
      600: "#0369a1",
      700: "#075985",
      800: "#0c4a6e",
      900: "#082f49",
    },
    secondary: {
      50: "#ecfdf5",
      100: "#d1fae5",
      200: "#a7f3d0",
      300: "#6ee7b7",
      400: "#34d399",
      500: "#059669",
      600: "#047857",
      700: "#065f46",
      800: "#064e3b",
      900: "#022c22",
    },
    tertiary: {
      50: "#fffbeb",
      100: "#fef3c7",
      200: "#fde68a",
      300: "#fcd34d",
      400: "#fbbf24",
      500: "#d97706",
      600: "#b45309",
      700: "#92400e",
      800: "#78350f",
      900: "#451a03",
    },
    neutral: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
    },
    success: {
      50: "#ecfdf5",
      500: "#059669",
      600: "#047857",
      700: "#065f46",
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
      50: "#f0f9ff",
      500: "#0284c7",
      600: "#0369a1",
      700: "#075985",
    },
    background: {
      primary: "#f1f5f9",
      secondary: "#e2e8f0",
      tertiary: "#cbd5e1",
      surface: "#f8fafc",
      card: "#ffffff",
    },
    text: {
      primary: "#0f172a",
      secondary: "#334155",
      tertiary: "#64748b",
      inverse: "#f8fafc",
    },
    border: {
      light: "#e2e8f0",
      normal: "#cbd5e1",
      dark: "#94a3b8",
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
    light: "0 1px 3px rgba(0, 0, 0, 0.1)",
    medium: "0 4px 6px rgba(0, 0, 0, 0.1)",
    heavy: "0 10px 15px rgba(0, 0, 0, 0.1)",
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
      normal: 0, // Tamaño base
      medium: 3, // +3px del tamaño base
      large: 6, // +6px del tamaño base
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
    main: "#0284c7",
    light: "#38bdf8",
    glow: "rgba(2, 132, 199, 0.35)",
  },
  brand: {
    purple400: "#38bdf8",
    pink500: "#059669",
    indigo500: "#0284c7",
    indigo400: "#0ea5e9",
  },
  effects: {
    glassBackground: "rgba(255, 255, 255, 0.85)",
    glassBorder: "rgba(2, 132, 199, 0.22)",
    glassShadow: "0 8px 28px 0 rgba(15, 23, 42, 0.08), 0 0 14px rgba(2, 132, 199, 0.12)",
    blur: {
      subtle: "4px",
      glass: "12px",
      heavy: "16px",
      extreme: "60px",
    },
    glow: {
      primary: "0 0 18px rgba(2, 132, 199, 0.28), 0 4px 12px rgba(14, 165, 233, 0.2)",
      premium: "0 0 20px rgba(2, 132, 199, 0.26), 0 4px 14px rgba(5, 150, 105, 0.22)",
      success: "0 0 18px rgba(5, 150, 105, 0.3), 0 4px 12px rgba(16, 185, 129, 0.22)",
    },
  },
  gradients: {
    brand: "linear-gradient(135deg, #0284c7 0%, #059669 55%, #d97706 100%)",
    premium: "linear-gradient(135deg, #0369a1 0%, #0284c7 50%, #059669 100%)",
    highlight: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
    glass: "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 100%)",
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
    darkGradient1: "#f0f9ff",
    darkGradient2: "#e0f2fe",
    darkGradient3: "#ecfdf5",
    starColor: "#0284c7",
    starColorAlpha80: "rgba(2, 132, 199, 0.8)",
    starColorAlpha90: "rgba(2, 132, 199, 0.9)",
    starColorAlpha70: "rgba(2, 132, 199, 0.7)",
    starColorAlpha60: "rgba(2, 132, 199, 0.6)",
    auroraIndigo: "rgba(14, 165, 233, 0.1)",
    auroraTertiary: "rgba(16, 185, 129, 0.08)",
    auroraCyan: "rgba(245, 158, 11, 0.05)",
  },
};

// Tema oscuro
export const darkTheme: DefaultTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: {
      50: "#082f49",
      100: "#0c4a6e",
      200: "#075985",
      300: "#0369a1",
      400: "#0ea5e9",
      500: "#38bdf8",
      600: "#7dd3fc",
      700: "#bae6fd",
      800: "#e0f2fe",
      900: "#f0f9ff",
    },
    secondary: {
      50: "#022c22",
      100: "#064e3b",
      200: "#065f46",
      300: "#047857",
      400: "#10b981",
      500: "#34d399",
      600: "#6ee7b7",
      700: "#a7f3d0",
      800: "#d1fae5",
      900: "#ecfdf5",
    },
    tertiary: {
      50: "#451a03",
      100: "#78350f",
      200: "#92400e",
      300: "#b45309",
      400: "#f59e0b",
      500: "#fbbf24",
      600: "#fcd34d",
      700: "#fde68a",
      800: "#fef3c7",
      900: "#fffbeb",
    },
    background: {
      primary: "#0b0f19",
      secondary: "#111827",
      tertiary: "#1e293b",
      surface: "#0f172a",
      card: "#131c2e",
    },
    text: {
      primary: "#f8fafc",
      secondary: "#cbd5e1",
      tertiary: "#94a3b8",
      inverse: "#0f172a",
    },
    border: {
      light: "#1e293b",
      normal: "#334155",
      dark: "#475569",
    },
  },
  shadows: {
    light: "0 1px 3px rgba(0, 0, 0, 0.4)",
    medium: "0 4px 12px rgba(0, 0, 0, 0.45)",
    heavy: "0 10px 24px rgba(0, 0, 0, 0.55)",
  },
  highlight: {
    main: "#38bdf8",
    light: "#7dd3fc",
    glow: "rgba(56, 189, 248, 0.45)",
  },
  effects: {
    ...lightTheme.effects,
    glassBackground: "rgba(19, 28, 46, 0.78)",
    glassBorder: "rgba(56, 189, 248, 0.28)",
    glassShadow: "0 8px 32px 0 rgba(2, 6, 23, 0.6), 0 0 18px rgba(56, 189, 248, 0.14)",
    glow: {
      primary: "0 0 22px rgba(56, 189, 248, 0.38), 0 0 4px rgba(56, 189, 248, 0.55)",
      premium: "0 0 24px rgba(56, 189, 248, 0.35), 0 0 12px rgba(52, 211, 153, 0.28)",
      success: "0 0 22px rgba(52, 211, 153, 0.38), 0 0 4px rgba(52, 211, 153, 0.55)",
    },
  },
  gradients: {
    brand: "linear-gradient(135deg, #38bdf8 0%, #34d399 55%, #fbbf24 100%)",
    premium: "linear-gradient(135deg, #0284c7 0%, #0ea5e9 50%, #10b981 100%)",
    highlight: "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)",
    glass: "linear-gradient(180deg, rgba(56, 189, 248, 0.08) 0%, rgba(19, 28, 46, 0) 100%)",
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
