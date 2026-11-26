import React from "react";
import { createGlobalStyle } from "styled-components";
import { useTheme } from "../styles/ThemeProvider";

const GlobalStylesComponent = createGlobalStyle<{ theme: any }>`
  /* Variables CSS para temas */
  :root {
    /* Colores principales */
    --color-primary: ${(props) => props.theme.colors.primary[500]};
    --color-primary-50: ${(props) => props.theme.colors.primary[50]};
    --color-primary-100: ${(props) => props.theme.colors.primary[100]};
    --color-primary-500: ${(props) => props.theme.colors.primary[500]};
    --color-primary-600: ${(props) => props.theme.colors.primary[600]};
    
    /* Colores secundarios */
    --color-secondary: ${(props) => props.theme.colors.secondary[500]};
    --color-success: ${(props) => props.theme.colors.success[500]};
    --color-warning: ${(props) => props.theme.colors.warning[500]};
    --color-error: ${(props) => props.theme.colors.error[500]};
    --color-info: ${(props) => props.theme.colors.info[500]};
    
    /* Colores de fondo */
    --color-background: ${(props) => props.theme.colors.background.primary};
    --color-background-primary: ${(props) => props.theme.colors.background.primary};
    --color-background-secondary: ${(props) => props.theme.colors.background.secondary};
    --color-background-card: ${(props) => props.theme.colors.background.card};
    --color-background-surface: ${(props) => props.theme.colors.background.surface};
    
    /* Colores de texto */
    --color-text: ${(props) => props.theme.colors.text.primary};
    --color-text-primary: ${(props) => props.theme.colors.text.primary};
    --color-text-secondary: ${(props) => props.theme.colors.text.secondary};
    --color-text-tertiary: ${(props) => props.theme.colors.text.tertiary};
    --color-text-inverse: ${(props) => props.theme.colors.text.inverse};
    
    /* Colores de borde */
    --color-border: ${(props) => props.theme.colors.border.light};
    --color-border-light: ${(props) => props.theme.colors.border.light};
    --color-border-normal: ${(props) => props.theme.colors.border.normal};
    --color-border-dark: ${(props) => props.theme.colors.border.dark};
    
    /* Colores neutros */
    --color-neutral-50: ${(props) => props.theme.colors.neutral[50]};
    --color-neutral-100: ${(props) => props.theme.colors.neutral[100]};
    --color-neutral-200: ${(props) => props.theme.colors.neutral[200]};
    --color-neutral-300: ${(props) => props.theme.colors.neutral[300]};
    --color-neutral-400: ${(props) => props.theme.colors.neutral[400]};
    --color-neutral-600: ${(props) => props.theme.colors.neutral[600]};
    
    /* Sombras */
    --shadow-light: ${(props) => props.theme.shadows.light};
    --shadow-medium: ${(props) => props.theme.shadows.medium};
    --shadow-heavy: ${(props) => props.theme.shadows.heavy};
    
    /* Gradientes */
    --gradient-hero: ${(props) => props.theme.gradients.hero};
  }

  /* Box-sizing global */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  /* Estilos globales del html */
  html {
    width: 100%;
    overflow-x: hidden;
    background-color: ${(props) => props.theme.colors.background.primary};
    color: ${(props) => props.theme.colors.text.primary};
  }

  /* Estilos globales del body */
  body {
    background-color: ${(props) => props.theme.colors.background.primary};
    color: ${(props) => props.theme.colors.text.primary};
    font-family: ${(props) => props.theme.typography.fontFamily.primary};
    margin: 0;
    padding: 0;
    line-height: ${(props) => props.theme.typography.lineHeight.normal};
    width: 100%;
    overflow-x: hidden;
  }

  /* Contenedor principal */
  #root {
    width: 100%;
    overflow-x: hidden;
  }

  /* Prevenir scroll horizontal en mobile */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    html, body, #root {
      overflow-x: hidden;
      max-width: 100%;
      position: relative;
    }
  }

  /* Estilos para páginas específicas */
  .page-container {
    background-color: var(--color-background-primary);
    min-height: 100vh;
    padding: 24px;
    transition: background-color 0.3s ease;
  }

  .card-container {
    background-color: var(--color-background-card);
    border-radius: 12px;
    padding: 24px;
    box-shadow: var(--shadow-light);
    border: 1px solid var(--color-border-light);
    transition: all 0.3s ease;
  }

  /* Estilos específicos para móvil */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    .page-container {
      padding: 12px 8px;
      margin-top: 64px; /* Espacio para el header fijo */
    }

    .card-container {
      padding: 12px;
      margin: 0 4px;
    }

    /* Hero section en móvil - asegurar que esté debajo del header */
    .hero-section {
      margin-top: 16px !important;
      z-index: 1 !important;
      position: relative !important;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    .page-container {
      padding: 8px 6px;
    }

    .card-container {
      padding: 8px;
      margin: 0 2px;
    }
  }

  /* Hero sections - usar gradientes del tema */
  .hero-section {
    background: var(--gradient-hero);
    color: var(--color-text-inverse);
  }

  /* Estilos para elementos específicos que necesitan contraste */
  .high-contrast-text {
    color: var(--color-text-primary);
    font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  }

  .inverse-text {
    color: var(--color-text-inverse);
  }
`;

export const GlobalStyles: React.FC = () => {
  // Los colores se obtienen automáticamente a través del tema
  const { currentTheme } = useTheme();

  return <GlobalStylesComponent theme={currentTheme} />;
};
