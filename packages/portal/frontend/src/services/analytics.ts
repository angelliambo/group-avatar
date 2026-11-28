/**
 * Servicio centralizado de Google Analytics (GA4)
 * Inicializa gtag.js con la cola oficial de IArguments y registra page_view y eventos personalizados.
 */

import type { Analytics } from "firebase/analytics";
import { BRAND_CONFIG } from "@factory/shared/config/brand";

const GA_MEASUREMENT_ID =
  process.env.VITE_GA_MEASUREMENT_ID || BRAND_CONFIG.gaMeasurementId;

let cachedAnalytics: Analytics | null = null;
let isGaInitialized = false;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const isValidGaMeasurementId = (id: string | undefined): id is string =>
  Boolean(
    id &&
      id.startsWith("G-") &&
      !id.includes("__") &&
      !id.includes("YOUR_")
  );

/**
 * Inicializa GA4 de forma sincrónica sobre window.dataLayer (usando `arguments`
 * como exige el protocolo de gtag.js) e inyecta el script async de Google Tag Manager.
 */
export const initGA = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  if (isValidGaMeasurementId(GA_MEASUREMENT_ID) && !isGaInitialized) {
    isGaInitialized = true;
    window.dataLayer = window.dataLayer || [];

    const scriptId = "ga4-gtag-script";
    const alreadyInHead = Boolean(document.getElementById(scriptId) && window.gtag);

    if (!window.gtag) {
      window.gtag = function () {
        // gtag.js requiere pushear el objeto `arguments` nativo, no un Array rest
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer?.push(arguments);
      };
    }

    if (!alreadyInHead) {
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(script);
      }

      window.gtag("js", new Date());
      window.gtag("config", GA_MEASUREMENT_ID, {
        send_page_view: false,
      });
    }
  }

  if (process.env.NODE_ENV === "production") {
    import("./firebase")
      .then((fb) => {
        cachedAnalytics = fb.analytics;
      })
      .catch(() => {
        // Ignorar si Firebase no está configurado
      });
  }
};

/**
 * Registra una vista de página (page_view) en GA4.
 */
export const trackPageView = (path: string, title?: string): void => {
  if (typeof window === "undefined") {
    return;
  }

  if (!isGaInitialized && isValidGaMeasurementId(GA_MEASUREMENT_ID)) {
    initGA();
  }

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

  if (window.gtag && isValidGaMeasurementId(GA_MEASUREMENT_ID)) {
    window.gtag("event", "page_view", {
      send_to: GA_MEASUREMENT_ID,
      page_path: path,
      page_location: window.location.href,
      page_title: title || document.title,
    });
  }
};

/**
 * Registra un evento personalizado (por ejemplo, clics en CTAs).
 */
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
): void => {
  if (typeof window === "undefined") {
    return;
  }

  if (!isGaInitialized && isValidGaMeasurementId(GA_MEASUREMENT_ID)) {
    initGA();
  }

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

  if (window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
