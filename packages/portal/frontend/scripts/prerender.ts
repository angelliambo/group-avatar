import fs from "fs";
import path from "path";
import { BRAND_CONFIG } from "../../../shared/src/config/brand";

const BUILD_DIR = path.join(__dirname, "../dist");
const PUBLIC_DIR = path.join(__dirname, "../public");

interface PrerenderRoute {
  path: string;
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  robots: "index, follow" | "noindex, nofollow";
  heading: string;
  subheading: string;
  bodyHtml: string;
  serviceSchema?: Record<string, unknown>;
  faqItems?: Array<{ question: string; answer: string }>;
}

const LANDING_ROUTES: PrerenderRoute[] = [
  {
    path: "",
    title: BRAND_CONFIG.seoTitle,
    description: BRAND_CONFIG.seoDescription,
    keywords: BRAND_CONFIG.seoKeywords,
    canonicalUrl: `https://${BRAND_CONFIG.domain}/`,
    robots: "index, follow",
    heading: `${BRAND_CONFIG.siteName} — Infraestructura en Logística Empresarial y Mudanzas Easy-Pack`,
    subheading: "Más de 55 años operando desde Lomas del Mirador en CABA, Gran Buenos Aires y un radio nacional de hasta 1.600 km.",
    bodyHtml: `
      <section>
        <p>${BRAND_CONFIG.seoDescription}</p>
        <ul>
          <li><strong>División Logística Empresarial B2B:</strong> Transportes programados de cargas generales, dotación de supervisores y operarios propios, y repartos asistidos puerta a puerta con monitoreo satelital.</li>
          <li><strong>División Mudanzas Sistema Certificado «Easy-Pack»:</strong> Traslados residenciales, corporativos, industriales y de organismos oficiales en modalidades Mini, Estándar, Clásica y Premium.</li>
          <li><strong>Habilitaciones de Alta Seguridad:</strong> ART, seguros y documentación en regla para parques industriales, entidades bancarias, hospitales, laboratorios y entes oficiales.</li>
          <li><strong>Centro Operativo:</strong> ${BRAND_CONFIG.address} — Atención directa por WhatsApp al ${BRAND_CONFIG.phoneDisplay}.</li>
        </ul>
        <nav aria-label="Unidades de negocio">
          <a href="https://${BRAND_CONFIG.domain}/logistica">División Logística Empresarial y Transportes</a> |
          <a href="https://${BRAND_CONFIG.domain}/mudanzas">División Mudanzas Sistema Easy-Pack</a>
        </nav>
      </section>
    `,
    faqItems: [
      {
        question: "¿Dónde se encuentra el centro operativo de Avatar Group?",
        answer: `La base operativa y despacho de flotas de Avatar Group está ubicada en ${BRAND_CONFIG.address}, operando diariamente en CABA, Gran Buenos Aires y en un radio nacional de hasta 1.600 km.`,
      },
      {
        question: "¿Qué servicios brinda Avatar Group?",
        answer: "Avatar Group cuenta con dos divisiones especializadas: Logística Empresarial B2B (transportes programados de cargas generales, operarios propios y repartos asistidos con monitoreo satelital) y Mudanzas Integrales bajo normas certificadas Easy-Pack (modalidades Mini, Estándar, Clásica y Premium).",
      },
    ],
  },
  {
    path: "logistica",
    title: `Logística Empresarial, Transportes Programados y Repartos | ${BRAND_CONFIG.siteName}`,
    description: "Funcionamos como el apéndice logístico de tu empresa: transportes programados de cargas generales, operarios propios y repartos asistidos con monitoreo satelital.",
    keywords: "logistica empresarial, transportes programados, repartos asistidos, distribucion puerta a puerta, fletes corporativos, parques industriales, avatar group",
    canonicalUrl: `https://${BRAND_CONFIG.domain}/logistica`,
    robots: "index, follow",
    heading: "El Apéndice Logístico de tu Empresa",
    subheading: "Transportes Programados de Cargas Generales y Repartos Asistidos en CABA, GBA y hasta 1.600 km.",
    bodyHtml: `
      <article>
        <h3>Transportes Programados</h3>
        <p>Unidades carrozadas adaptadas a diversos volúmenes y tonelajes con provisión de supervisores y operarios especializados.</p>
      </article>
      <article>
        <h3>Repartos Asistidos Puerta a Puerta</h3>
        <p>Monitoreo satelital en tiempo real, control estricto de remitos, gestión completa de carga y descarga, y rendiciones documentales en tiempo y forma.</p>
      </article>
      <article>
        <h3>Habilitaciones para Instalaciones de Alta Seguridad</h3>
        <p>Cumplimiento integral de ART, seguros y seguridad e higiene para parques industriales, bancos, hospitales, laboratorios y organismos públicos.</p>
      </article>
    `,
    serviceSchema: {
      "@type": "Service",
      "@id": `https://${BRAND_CONFIG.domain}/logistica#service`,
      name: "Logística Empresarial, Transportes Programados y Repartos Asistidos",
      serviceType: "Transporte automotor de cargas generales y distribución B2B asistida",
      description: "Integración de flota monitoreada, supervisores y operarios propios a la cadena de suministro empresarial con cobertura en CABA, GBA y hasta 1.600 km.",
      provider: { "@id": `https://${BRAND_CONFIG.domain}/#organization` },
      areaServed: "Argentina",
      url: `https://${BRAND_CONFIG.domain}/logistica`,
    },
  },
  {
    path: "mudanzas",
    title: `Mudanzas Sistema Easy-Pack — Hogares, Oficinas e Industrias | ${BRAND_CONFIG.siteName}`,
    description: "Mudanzas sin estrés bajo normas certificadas Easy-Pack. Modalidades Mini, Estándar, Clásica y Premium con visita técnica sin cargo y placares portátiles.",
    keywords: "mudanzas easy-pack, mudanzas caba, mudanzas corporativas, mudanzas oficinas, mudanzas particulares, embalaje mudanzas, avatar group",
    canonicalUrl: `https://${BRAND_CONFIG.domain}/mudanzas`,
    robots: "index, follow",
    heading: "Mudanzas Bajo Normas Certificadas «Easy-Pack»",
    subheading: "Modalidades Mini, Estándar, Clásica y Premium con visita técnica y presupuesto sin cargo.",
    bodyHtml: `
      <section>
        <h3>Las 4 Modalidades del Sistema Easy-Pack</h3>
        <ul>
          <li><strong>Easy-Pack Mini:</strong> Unidad adaptada y personal calificado para monoambientes o volúmenes reducidos.</li>
          <li><strong>Easy-Pack Estándar:</strong> Visita técnica sin cargo, kit ecológico descartable anticipado, embalaje grueso y desarme/armado de muebles.</li>
          <li><strong>Easy-Pack Clásica:</strong> Supervisión dedicada, embalaje fino de vajilla y cristalería, y placares portátiles.</li>
          <li><strong>Easy-Pack Premium:</strong> Servicio llave en mano con izajes especiales por exterior, desembalaje asistido y retiro total de rezagos.</li>
        </ul>
      </section>
    `,
    serviceSchema: {
      "@type": "Service",
      "@id": `https://${BRAND_CONFIG.domain}/mudanzas#service`,
      name: "Mudanzas Integrales Sistema Certificado Easy-Pack",
      serviceType: "Mudanzas particulares, corporativas, industriales y de organismos oficiales",
      description: "Servicio escalable de mudanzas en modalidades Mini, Estándar, Clásica y Premium con visita técnica sin cargo, embalaje ecológico y placares portátiles.",
      provider: { "@id": `https://${BRAND_CONFIG.domain}/#organization` },
      areaServed: "Argentina",
      url: `https://${BRAND_CONFIG.domain}/mudanzas`,
    },
  },
  {
    path: "legal/terms",
    title: `Términos y Condiciones | ${BRAND_CONFIG.siteName}`,
    description: BRAND_CONFIG.seoDescription,
    keywords: "",
    canonicalUrl: `https://${BRAND_CONFIG.domain}/legal/terms`,
    robots: "noindex, nofollow",
    heading: "Términos y Condiciones",
    subheading: BRAND_CONFIG.siteName,
    bodyHtml: "",
  },
  {
    path: "legal/privacy",
    title: `Política de Privacidad | ${BRAND_CONFIG.siteName}`,
    description: BRAND_CONFIG.seoDescription,
    keywords: "",
    canonicalUrl: `https://${BRAND_CONFIG.domain}/legal/privacy`,
    robots: "noindex, nofollow",
    heading: "Política de Privacidad",
    subheading: BRAND_CONFIG.siteName,
    bodyHtml: "",
  },
];

function generateStructuredData(route: PrerenderRoute): Record<string, unknown> | null {
  if (route.robots.startsWith("noindex")) {
    return null;
  }

  const breadcrumbElements: Array<Record<string, unknown>> = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: `https://${BRAND_CONFIG.domain}/`,
    },
  ];

  if (route.path === "logistica") {
    breadcrumbElements.push({
      "@type": "ListItem",
      position: 2,
      name: "Logística y Transportes",
      item: route.canonicalUrl,
    });
  } else if (route.path === "mudanzas") {
    breadcrumbElements.push({
      "@type": "ListItem",
      position: 2,
      name: "Mudanzas Easy-Pack",
      item: route.canonicalUrl,
    });
  }

  const graph: Array<Record<string, unknown>> = [
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
      image: `https://${BRAND_CONFIG.domain}/og-image.jpg?v=${BRAND_CONFIG.ogImageVersion}`,
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
    },
    {
      "@type": "WebSite",
      "@id": `https://${BRAND_CONFIG.domain}/#website`,
      url: `https://${BRAND_CONFIG.domain}/`,
      name: BRAND_CONFIG.siteName,
      description: BRAND_CONFIG.seoDescription,
      inLanguage: "es-AR",
      publisher: { "@id": `https://${BRAND_CONFIG.domain}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${route.canonicalUrl}#webpage`,
      url: route.canonicalUrl,
      name: route.title,
      description: route.description,
      inLanguage: "es-AR",
      isPartOf: { "@id": `https://${BRAND_CONFIG.domain}/#website` },
      about: { "@id": `https://${BRAND_CONFIG.domain}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${route.canonicalUrl}#breadcrumb`,
      itemListElement: breadcrumbElements,
    },
  ];

  if (route.serviceSchema) {
    graph.push(route.serviceSchema);
  }

  if (route.faqItems && route.faqItems.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${route.canonicalUrl}#faq`,
      mainEntity: route.faqItems.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export async function runPrerender() {
  console.log("🚀 [SSG-PRERENDER] Iniciando prerenderizado estático build-time...");

  const baseHtmlPath = fs.existsSync(path.join(BUILD_DIR, "index.html"))
    ? path.join(BUILD_DIR, "index.html")
    : path.join(PUBLIC_DIR, "index.html");

  if (!fs.existsSync(baseHtmlPath)) {
    console.error(`❌ [SSG-PRERENDER] Error: No se encontró index.html base en ${baseHtmlPath}`);
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(baseHtmlPath, "utf-8");
  const targetBaseDir = fs.existsSync(BUILD_DIR) ? BUILD_DIR : PUBLIC_DIR;

  console.log(`📁 [SSG-PRERENDER] Directorio objetivo: ${targetBaseDir}`);

  for (const route of LANDING_ROUTES) {
    let pageHtml = baseHtml;

    pageHtml = pageHtml
      .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
      .replace(/<meta name="robots"\s+content=".*?"\s*\/>/s, `<meta name="robots" content="${route.robots}" />`)
      .replace(/<meta name="description"\s+content=".*?"\s*\/>/s, `<meta name="description" content="${route.description}" />`)
      .replace(/<meta name="keywords"\s+content=".*?"\s*\/>/s, route.keywords ? `<meta name="keywords" content="${route.keywords}" />` : "")
      .replace(/<link rel="canonical"\s+href=".*?"\s*\/>/s, `<link rel="canonical" href="${route.canonicalUrl}" />`)
      .replace(/<meta property="og:title"\s+content=".*?"\s*\/>/s, `<meta property="og:title" content="${route.title}" />`)
      .replace(/<meta property="og:description"\s+content=".*?"\s*\/>/s, `<meta property="og:description" content="${route.description}" />`)
      .replace(/<meta property="og:url"\s+content=".*?"\s*\/>/s, `<meta property="og:url" content="${route.canonicalUrl}" />`)
      .replace(/<meta (?:name|property)="twitter:url"\s+content=".*?"\s*\/>/s, `<meta name="twitter:url" content="${route.canonicalUrl}" />`)
      .replace(/<meta (?:name|property)="twitter:title"\s+content=".*?"\s*\/>/s, `<meta name="twitter:title" content="${route.title}" />`)
      .replace(/<meta (?:name|property)="twitter:description"\s+content=".*?"\s*\/>/s, `<meta name="twitter:description" content="${route.description}" />`);

    const structuredData = generateStructuredData(route);
    if (structuredData) {
      const jsonLd = JSON.stringify(structuredData);
      const jsonLdScript = `<script type="application/ld+json" id="prerendered-jsonld">${jsonLd}</script>`;
      if (pageHtml.includes('id="prerendered-jsonld"')) {
        pageHtml = pageHtml.replace(/<script type="application\/ld\+json" id="prerendered-jsonld">.*?<\/script>/s, jsonLdScript);
      } else {
        pageHtml = pageHtml.replace("</head>", `  ${jsonLdScript}\n</head>`);
      }
    } else if (pageHtml.includes('id="prerendered-jsonld"')) {
      pageHtml = pageHtml.replace(/\s*<script type="application\/ld\+json" id="prerendered-jsonld">.*?<\/script>/s, "");
    }

    const prerenderedStaticContent = route.robots.startsWith("noindex")
      ? `<div id="prerender-static-content" style="display:none;"><h1>${route.heading}</h1></div>`
      : `
      <div id="prerender-static-content" style="padding: 20px; font-family: sans-serif; max-width: 1200px; margin: 0 auto;">
        <h1>${route.heading}</h1>
        <h2>${route.subheading}</h2>
        ${route.bodyHtml}
      </div>
    `;

    const rootStartIndex = pageHtml.indexOf('<div id="root">');
    const bodyEndIndex = pageHtml.indexOf("</body>", rootStartIndex);
    if (rootStartIndex !== -1 && bodyEndIndex !== -1) {
      const moduleScriptMatch = pageHtml.substring(rootStartIndex, bodyEndIndex).match(/<script\s+type="module"[^>]*><\/script>/g);
      const preservedScripts = moduleScriptMatch ? `\n  ${moduleScriptMatch.join("\n  ")}` : "";
      pageHtml =
        pageHtml.substring(0, rootStartIndex) +
        `<div id="root">\n${prerenderedStaticContent}\n  </div>${preservedScripts}\n` +
        pageHtml.substring(bodyEndIndex);
    }

    const outDir = route.path === ""
      ? targetBaseDir
      : path.join(targetBaseDir, route.path);

    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    const outFile = path.join(outDir, "index.html");
    fs.writeFileSync(outFile, pageHtml, "utf-8");
    console.log(`  ✅ Ruta Prerenderizada (${route.robots}): /${route.path} -> ${path.relative(process.cwd(), outFile)}`);
  }

  console.log("🎉 [SSG-PRERENDER] Prerenderizado estático completado exitosamente.\n");
}

if (require.main === module) {
  runPrerender().catch((err) => {
    console.error("❌ [SSG-PRERENDER] Error durante la ejecución del prerenderizado:", err);
    process.exit(1);
  });
}
