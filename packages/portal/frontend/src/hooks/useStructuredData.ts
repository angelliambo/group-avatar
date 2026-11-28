import { useMemo } from 'react';
import { useLocation } from '@tanstack/react-router';
import {
  SHOW_SOCIAL_LINKS,
  SOCIAL_FACEBOOK_URL,
  SOCIAL_INSTAGRAM_URL,
  SOCIAL_TIKTOK_URL,
  SOCIAL_X_URL,
} from '@shared/config/urls';
import { BRAND_CONFIG } from '@factory/shared/config/brand';

export interface StructuredDataConfig {
  type: 'WebSite' | 'WebPage' | 'Service' | 'Organization' | 'BreadcrumbList' | 'FAQPage';
  name?: string;
  description?: string;
  url?: string;
  image?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  serviceType?: string;
}

export const useStructuredData = (config: StructuredDataConfig) => {
  const location = useLocation();
  const baseUrl = `https://${BRAND_CONFIG.domain}`;

  const structuredData = useMemo(() => {
    const currentUrl = config.url || `${baseUrl}${location.pathname === '/' ? '/' : location.pathname}`;
    const currentDate = new Date().toISOString();
    const ogImageUrl = `${baseUrl}/og-image.jpg?v=${BRAND_CONFIG.ogImageVersion}`;
    const logoImageUrl = `${baseUrl}${BRAND_CONFIG.logoUrl}`;
    const sameAs = SHOW_SOCIAL_LINKS
      ? [SOCIAL_INSTAGRAM_URL, SOCIAL_FACEBOOK_URL, SOCIAL_TIKTOK_URL, SOCIAL_X_URL].filter(Boolean)
      : [];

    switch (config.type) {
      case 'WebSite':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": config.name || BRAND_CONFIG.siteName,
          "description": config.description || BRAND_CONFIG.seoDescription,
          "url": `${baseUrl}/`,
          "inLanguage": "es-AR",
          "publisher": {
            "@type": "Organization",
            "name": BRAND_CONFIG.siteName,
            "logo": {
              "@type": "ImageObject",
              "url": logoImageUrl
            }
          }
        };

      case 'WebPage':
        return {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": config.name || BRAND_CONFIG.seoTitle,
          "description": config.description || BRAND_CONFIG.seoDescription,
          "url": currentUrl,
          "inLanguage": "es-AR",
          "datePublished": config.datePublished || currentDate,
          "dateModified": config.dateModified || currentDate,
          "author": {
            "@type": "Organization",
            "name": config.author || BRAND_CONFIG.siteName
          },
          "publisher": {
            "@type": "Organization",
            "name": BRAND_CONFIG.siteName,
            "logo": {
              "@type": "ImageObject",
              "url": logoImageUrl
            }
          },
          "mainEntity": {
            "@type": "MovingCompany",
            "name": BRAND_CONFIG.siteName,
            "description": BRAND_CONFIG.seoDescription
          }
        };

      case 'Service':
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": config.name || BRAND_CONFIG.seoTitle,
          "serviceType": config.serviceType || "Logística empresarial y mudanzas integrales",
          "description": config.description || BRAND_CONFIG.seoDescription,
          "url": currentUrl,
          "image": config.image || ogImageUrl,
          "areaServed": "Argentina",
          "provider": {
            "@type": "MovingCompany",
            "name": BRAND_CONFIG.siteName,
            "telephone": BRAND_CONFIG.phoneE164,
            "email": BRAND_CONFIG.supportEmail
          }
        };

      case 'Organization':
        return {
          "@context": "https://schema.org",
          "@type": ["MovingCompany", "Organization"],
          "name": BRAND_CONFIG.siteName,
          "description": BRAND_CONFIG.seoDescription,
          "url": `${baseUrl}/`,
          "logo": logoImageUrl,
          "image": ogImageUrl,
          "telephone": BRAND_CONFIG.phoneE164,
          "email": BRAND_CONFIG.supportEmail,
          "hasMap": BRAND_CONFIG.mapLinkUrl,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Alfredo Lorenzo Palacios 2963",
            "addressLocality": "Lomas del Mirador",
            "addressRegion": "Provincia de Buenos Aires",
            "postalCode": "B1752BNS",
            "addressCountry": "AR"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": BRAND_CONFIG.latitude,
            "longitude": BRAND_CONFIG.longitude
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": BRAND_CONFIG.phoneE164,
            "email": BRAND_CONFIG.supportEmail,
            "contactType": "customer service",
            "areaServed": "AR",
            "availableLanguage": "Spanish"
          },
          ...(sameAs.length > 0 ? { sameAs } : {})
        };

      case 'BreadcrumbList':
        if (!config.breadcrumbs) return null;
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": config.breadcrumbs.map((crumb, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": crumb.name,
            "item": `${baseUrl}${crumb.url}`
          }))
        };

      case 'FAQPage':
        if (!config.faqs) return null;
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": config.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        };

      default:
        return null;
    }
  }, [config, location.pathname, baseUrl]);

  return structuredData;
};

export const useServiceStructuredData = (serviceName: string, serviceDescription: string, serviceType?: string) => {
  return useStructuredData({
    type: 'Service',
    name: serviceName,
    description: serviceDescription,
    serviceType,
  });
};

export const useBreadcrumbStructuredData = (breadcrumbs: Array<{ name: string; url: string }>) => {
  return useStructuredData({
    type: 'BreadcrumbList',
    breadcrumbs
  });
};

export const useFAQStructuredData = (faqs: Array<{ question: string; answer: string }>) => {
  return useStructuredData({
    type: 'FAQPage',
    faqs
  });
};
