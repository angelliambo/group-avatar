import { useEffect, useRef } from "react";
import { useLocation } from "@tanstack/react-router";
import { initGA, trackPageView } from "../services/analytics";

/**
 * Hook personalizado para inicializar Google Analytics (GA4) y realizar
 * el tracking automático de navegaciones SPA sin duplicar el page_view inicial de <head>.
 */
export const usePageTracking = (): void => {
  const location = useLocation();
  const isInitialLoadRef = useRef(true);

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    const fullPath = location.pathname + (location.searchStr || "");

    // En la carga inicial, el snippet nativo gtag('config', ID) en <head> ya envía el primer page_view.
    // Solo si por algún motivo no estaba presente en <head>, disparamos fallback manual.
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
      if (typeof document !== "undefined" && document.getElementById("ga4-gtag-script")) {
        return;
      }
    }

    const timer = setTimeout(() => {
      trackPageView(fullPath);
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname, location.searchStr]);
};

export default usePageTracking;
