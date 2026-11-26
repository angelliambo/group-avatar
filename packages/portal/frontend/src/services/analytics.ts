/**
 * Servicio centralizado de Google Analytics (GA4)
 * Permite inicializar el script de tracking de forma dinámica y registrar pageviews y eventos (CTAs).
 */

import type { Analytics } from "firebase/analytics";

const GA_MEASUREMENT_ID = process.env.VITE_GA_MEASUREMENT_ID;
let cachedAnalytics: Analytics | null = null;

// Extender la interfaz global de Window para TypeScript
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Inicializa GA4 en la aplicación inyectando el script de gtag.js dinámicamente.
 * Solo se ejecuta si el VITE_GA_MEASUREMENT_ID está configurado en las variables de entorno.
 */
export const initGA = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  const startGA = async () => {
    const isValidGaId = Boolean(
      GA_MEASUREMENT_ID &&
      !GA_MEASUREMENT_ID.includes("__") &&
      !GA_MEASUREMENT_ID.includes("YOUR_")
    );

    if (process.env.NODE_ENV === 'production') {
      try {
        const fb = await import("./firebase");
        cachedAnalytics = fb.analytics;
      } catch {
        // Ignorar si Firebase no está configurado
      }
    }

    if (!isValidGaId || window.gtag) {
      return;
    }

    // Inyectar el script de Google Tag Manager
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Inicializar dataLayer y la función gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      if (window.dataLayer) {
        window.dataLayer.push(args);
      }
    };

    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false, // Desactivamos el pageview automático para manejarlo por código en React
    });
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(startGA, { timeout: 3500 });
  } else {
    setTimeout(startGA, 2500);
  }
};

/**
 * Registra una vista de página (Pageview).
 * @param path Ruta de la página (ej: '/pricing')
 * @param title Título de la página (ej: 'Planes')
 */
export const trackPageView = (path: string, title?: string): void => {
  if (typeof window === 'undefined') {
    return;
  }

  // Registrar en Firebase Analytics si está disponible
  if (cachedAnalytics) {
    import("firebase/analytics")
      .then(({ logEvent }) => {
        if (cachedAnalytics) {
          logEvent(cachedAnalytics, "page_view", {
            page_path: path,
            page_title: title || document.title,
          });
        }
      })
      .catch(() => {});
  }

  // Registrar en GA4 tradicional via gtag.js
  if (window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title || document.title,
    });
  }
};

/**
 * Registra un evento personalizado (por ejemplo, clics en CTAs).
 * @param action Acción del evento (ej: 'click_cta')
 * @param category Categoría del evento (ej: 'marketing')
 * @param label Etiqueta descriptiva (ej: 'Comenzar Gratis - Hero')
 * @param value Valor numérico opcional (ej: precio de un plan)
 */
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
): void => {
  if (typeof window === 'undefined') {
    return;
  }

  // Registrar en Firebase Analytics si está disponible
  if (cachedAnalytics) {
    import("firebase/analytics")
      .then(({ logEvent }) => {
        if (cachedAnalytics) {
          logEvent(cachedAnalytics, action, {
            event_category: category,
            event_label: label,
            value: value,
          });
        }
      })
      .catch(() => {});
  }

  // Registrar en GA4 tradicional via gtag.js
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
