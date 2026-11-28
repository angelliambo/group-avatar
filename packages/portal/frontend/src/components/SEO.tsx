import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "../i18n/I18nProvider";
import { BRAND_CONFIG } from "@factory/shared/config/brand";
import {
  SHOW_SOCIAL_LINKS,
  SOCIAL_FACEBOOK_URL,
  SOCIAL_INSTAGRAM_URL,
  SOCIAL_TIKTOK_URL,
  SOCIAL_X_URL,
} from "@shared/config/urls";

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string | string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterSite?: string;
  twitterCreator?: string;
  structuredData?: Record<string, unknown> | null;
  noIndex?: boolean;
  noFollow?: boolean;
  locale?: string;
  alternateLanguages?: { href: string; hreflang: string }[];
}

const buildSameAsLinks = (): string[] => {
  if (!SHOW_SOCIAL_LINKS) return [];
  return [
    SOCIAL_INSTAGRAM_URL,
    SOCIAL_FACEBOOK_URL,
    SOCIAL_TIKTOK_URL,
    SOCIAL_X_URL,
  ].filter(Boolean);
};

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = `/og-image.jpg?v=${BRAND_CONFIG.ogImageVersion}`,
  ogType = "website",
  twitterCard = "summary_large_image",
  twitterSite,
  twitterCreator,
  structuredData,
  noIndex = false,
  noFollow = false,
  locale,
  alternateLanguages = [],
}) => {
  const { t, lang: currentLang } = useTranslation();

  const finalLocale = locale || (currentLang === "es" ? "es-AR" : currentLang);

  const finalTitle = title || t("pages.home.seoTitle") || BRAND_CONFIG.seoTitle;
  const finalDescription =
    description || t("pages.home.seoDescription") || BRAND_CONFIG.seoDescription;

  const rawKeywords = keywords || t("pages.home.seoKeywords") || BRAND_CONFIG.seoKeywords;
  const finalKeywords = Array.isArray(rawKeywords)
    ? rawKeywords.join(", ")
    : rawKeywords;

  const fullTitle = finalTitle.toLowerCase().includes(BRAND_CONFIG.siteName.toLowerCase())
    ? finalTitle
    : `${finalTitle} | ${BRAND_CONFIG.siteName}`;

  const rawPathname = typeof window !== "undefined" ? window.location.pathname : "/";
  const normalizedPathname =
    rawPathname.length > 1 && rawPathname.endsWith("/")
      ? rawPathname.slice(0, -1)
      : rawPathname;

  const resolvedCanonicalUrl =
    canonicalUrl ||
    `https://${BRAND_CONFIG.domain}${normalizedPathname === "/" ? "/" : normalizedPathname}`;

  const absoluteOgImage = ogImage.startsWith("http")
    ? ogImage
    : `https://${BRAND_CONFIG.domain}${ogImage.startsWith("/") ? ogImage : `/${ogImage}`}`;

  const resolvedTwitterHandle = BRAND_CONFIG.socials.x
    ? `@${BRAND_CONFIG.socials.x.replace(/^@/, "")}`
    : "";
  const finalTwitterSite = twitterSite ?? resolvedTwitterHandle;
  const finalTwitterCreator = twitterCreator ?? resolvedTwitterHandle;

  const sameAs = buildSameAsLinks();

  const defaultStructuredData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MovingCompany", "Organization"],
        "@id": `https://${BRAND_CONFIG.domain}/#organization`,
        name: BRAND_CONFIG.siteName,
        description: BRAND_CONFIG.seoDescription,
        url: `https://${BRAND_CONFIG.domain}/`,
        logo: {
          "@type": "ImageObject",
          url: `https://${BRAND_CONFIG.domain}${BRAND_CONFIG.logoUrl}`,
        },
        image: absoluteOgImage,
        email: BRAND_CONFIG.supportEmail,
        telephone: BRAND_CONFIG.phoneE164,
        hasMap: BRAND_CONFIG.mapLinkUrl,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Alfredo Lorenzo Palacios 2963",
          addressLocality: "Lomas del Mirador",
          addressRegion: "Provincia de Buenos Aires",
          postalCode: "B1752BNS",
          addressCountry: "AR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: BRAND_CONFIG.latitude,
          longitude: BRAND_CONFIG.longitude,
        },
        areaServed: [
          { "@type": "City", name: "Ciudad Autónoma de Buenos Aires" },
          { "@type": "AdministrativeArea", name: "Gran Buenos Aires" },
          { "@type": "Country", name: "Argentina" },
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: BRAND_CONFIG.phoneE164,
            email: BRAND_CONFIG.supportEmail,
            contactType: "customer service",
            areaServed: "AR",
            availableLanguage: ["Spanish"],
          },
        ],
        ...(sameAs.length > 0 ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `https://${BRAND_CONFIG.domain}/#website`,
        url: `https://${BRAND_CONFIG.domain}/`,
        name: BRAND_CONFIG.siteName,
        description: BRAND_CONFIG.seoDescription,
        inLanguage: "es-AR",
        publisher: {
          "@id": `https://${BRAND_CONFIG.domain}/#organization`,
        },
      },
    ],
  };

  const finalStructuredData = noIndex
    ? null
    : structuredData === undefined
      ? defaultStructuredData
      : structuredData;

  const finalAlternateLanguages =
    noIndex
      ? []
      : alternateLanguages.length > 0
        ? alternateLanguages
        : [
            { hreflang: "es-AR", href: resolvedCanonicalUrl },
            { hreflang: "es", href: resolvedCanonicalUrl },
            { hreflang: "x-default", href: resolvedCanonicalUrl },
          ];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      {!noIndex && <meta name="keywords" content={finalKeywords} />}
      <meta name="author" content={BRAND_CONFIG.siteName} />
      <meta
        name="robots"
        content={`${noIndex ? "noindex" : "index"}, ${noFollow ? "nofollow" : "follow"}`}
      />
      <meta name="language" content={finalLocale} />

      <link rel="canonical" href={resolvedCanonicalUrl} />
      <link
        rel="alternate"
        type="text/plain"
        href={`https://${BRAND_CONFIG.domain}/llms.txt`}
        title="LLMs Context"
      />
      <link
        rel="alternate"
        type="text/plain"
        href={`https://${BRAND_CONFIG.domain}/llms-full.txt`}
        title="LLMs Full Documentation"
      />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={resolvedCanonicalUrl} />
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:image:secure_url" content={absoluteOgImage} />
      <meta
        property="og:image:type"
        content={ogImage.split("?")[0].endsWith(".png") ? "image/png" : "image/jpeg"}
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={BRAND_CONFIG.seoImageAlt} />
      <meta property="og:site_name" content={BRAND_CONFIG.siteName} />
      <meta property="og:locale" content="es_AR" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={resolvedCanonicalUrl} />
      {finalTwitterSite && <meta name="twitter:site" content={finalTwitterSite} />}
      {finalTwitterCreator && <meta name="twitter:creator" content={finalTwitterCreator} />}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={absoluteOgImage} />
      <meta name="twitter:image:alt" content={BRAND_CONFIG.seoImageAlt} />

      {finalAlternateLanguages.map((langItem) => (
        <link
          key={langItem.hreflang}
          rel="alternate"
          hrefLang={langItem.hreflang}
          href={langItem.href}
        />
      ))}

      {finalStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(finalStructuredData)}
        </script>
      )}

      <meta name="theme-color" content="#070709" />
      <meta name="msapplication-TileColor" content="#070709" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={BRAND_CONFIG.siteName} />
    </Helmet>
  );
};

export default SEO;
