import { useMemo } from "react";
import { useLocation } from "@tanstack/react-router";
import { useTranslation } from "../i18n/I18nProvider";
import { BRAND_CONFIG } from "@factory/shared/config/brand";

export interface BreadcrumbItem {
  name: string;
  url: string;
  icon?: string;
}

const ROUTE_CONFIG: Record<string, { name: string; parent?: string }> = {
  logistica: { name: "Logística y Transportes" },
  mudanzas: { name: "Mudanzas Easy-Pack" },
  legal: { name: "Legal" },
  terms: { name: "Términos y Condiciones", parent: "legal" },
  privacy: { name: "Política de Privacidad", parent: "legal" },
};

export const useBreadcrumbs = () => {
  const location = useLocation();
  const canonicalOrigin = `https://${BRAND_CONFIG.domain}`;

  const breadcrumbs = useMemo(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const breadcrumbItems: BreadcrumbItem[] = [
      {
        name: "Inicio",
        url: "/",
      },
    ];

    let currentPath = "";
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      const routeInfo = ROUTE_CONFIG[segment];

      breadcrumbItems.push({
        name: routeInfo
          ? routeInfo.name
          : segment.charAt(0).toUpperCase() + segment.slice(1),
        url: currentPath,
      });
    });

    return breadcrumbItems;
  }, [location.pathname]);

  const structuredData = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `${canonicalOrigin}${item.url}`,
      })),
    };
  }, [breadcrumbs, canonicalOrigin]);

  return {
    breadcrumbs,
    structuredData,
    currentPage: breadcrumbs[breadcrumbs.length - 1]?.name || "Inicio",
  };
};

export const usePageSEO = () => {
  const { breadcrumbs, currentPage } = useBreadcrumbs();
  const location = useLocation();
  const { t } = useTranslation();

  const seoData = useMemo(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const currentSegment = pathSegments[pathSegments.length - 1] || "";

    let pageKey = currentSegment;
    if (!pageKey) {
      pageKey = "home";
    } else if (pageKey === "terms" || pageKey === "terminos") {
      pageKey = "legal";
    } else if (pageKey === "privacy" || pageKey === "privacidad") {
      pageKey = "privacy";
    }

    const routeInfo = ROUTE_CONFIG[currentSegment];
    const isLegalPage = location.pathname.startsWith("/legal/");

    const translatedTitle = !isLegalPage ? t(`pages.${pageKey}.seoTitle`) : "";
    const translatedDescription = !isLegalPage ? t(`pages.${pageKey}.seoDescription`) : "";
    const translatedKeywords = !isLegalPage ? t(`pages.${pageKey}.seoKeywords`) : "";

    const title =
      translatedTitle && !translatedTitle.startsWith("pages.")
        ? translatedTitle
        : routeInfo
          ? `${routeInfo.name} | ${BRAND_CONFIG.siteName}`
          : BRAND_CONFIG.seoTitle;

    const description =
      translatedDescription && !translatedDescription.startsWith("pages.")
        ? translatedDescription
        : BRAND_CONFIG.seoDescription;

    const keywords =
      translatedKeywords && !translatedKeywords.startsWith("pages.")
        ? translatedKeywords.split(",").map((k) => k.trim())
        : BRAND_CONFIG.seoKeywords.split(",").map((k) => k.trim());

    const canonicalPath = location.pathname === "/" ? "/" : location.pathname;

    return {
      title,
      description,
      keywords,
      canonicalUrl: `https://${BRAND_CONFIG.domain}${canonicalPath}`,
      ogImage: `/og-image.jpg?v=${BRAND_CONFIG.ogImageVersion}`,
      noIndex: isLegalPage,
      noFollow: isLegalPage,
    };
  }, [location.pathname, t]);

  return {
    ...seoData,
    breadcrumbs,
    currentPage,
  };
};
