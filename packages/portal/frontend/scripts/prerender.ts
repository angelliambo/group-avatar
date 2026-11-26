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
  heading: string;
  subheading: string;
  bodyHtml: string;
}

const LANDING_ROUTES: PrerenderRoute[] = [
  {
    path: "",
    title: `${BRAND_CONFIG.seoTitle}`,
    description: `${BRAND_CONFIG.seoDescription}`,
    keywords: `${BRAND_CONFIG.seoKeywords}`,
    canonicalUrl: `https://${BRAND_CONFIG.domain}`,
    heading: `${BRAND_CONFIG.siteName} — Logística de Precisión y Mudanzas sin Estrés`,
    subheading: "Más de 55 años operando en CABA, GBA y un radio nacional de hasta 1.600 km.",
    bodyHtml: `
      <section>
        <h1>${BRAND_CONFIG.siteName}</h1>
        <p>${BRAND_CONFIG.seoDescription}</p>
        <ul>
          <li>Transportes Programados y Repartos Asistidos puerta a puerta con monitoreo satelital.</li>
          <li>Mudanzas residenciales, corporativas e industriales bajo normas Easy-Pack.</li>
          <li>Habilitaciones para parques industriales, entidades bancarias, hospitales y entes oficiales.</li>
        </ul>
      </section>
    `,
  },
  {
    path: "logistica",
    title: `Logística Empresarial, Transportes Programados y Repartos Asistidos | ${BRAND_CONFIG.siteName}`,
    description: "Funcionamos como el apéndice logístico de tu empresa: transportes programados de cargas generales, dotación de operarios y repartos asistidos con monitoreo satelital.",
    keywords: "logistica empresarial, transportes programados, repartos asistidos, distribucion puerta a puerta, parques industriales",
    canonicalUrl: `https://${BRAND_CONFIG.domain}/logistica`,
    heading: "El Apéndice Logístico de tu Empresa",
    subheading: "Transportes Programados, Cargas Generales y Repartos Asistidos en CABA, GBA y hasta 1.600 km.",
    bodyHtml: `
      <article>
        <h2>Transportes Programados</h2>
        <p>Unidades adaptadas a diversos volúmenes y provisión de operarios y supervisores habilitados.</p>
      </article>
      <article>
        <h2>Repartos Asistidos Puerta a Puerta</h2>
        <p>Monitoreo satelital, control de documentación, gestión integral de carga/descarga y rendiciones en tiempo y forma.</p>
      </article>
    `,
  },
  {
    path: "mudanzas",
    title: `Mudanzas Sistema Easy-Pack — Particulares, Oficinas e Industrias | ${BRAND_CONFIG.siteName}`,
    description: "Mudanzas sin estrés bajo normas certificadas Easy-Pack. Modalidades Mini, Estándar, Clásica y Premium con visita técnica sin cargo, embalaje ecológico y placares portátiles.",
    keywords: "mudanzas easy-pack, mudanzas caba, mudanzas corporativas, mudanzas oficinas, mudanzas particulares, embalaje mudanzas",
    canonicalUrl: `https://${BRAND_CONFIG.domain}/mudanzas`,
    heading: "Mudanzas Bajo Normas «Easy-Pack»",
    subheading: "Modalidades Mini, Estándar, Clásica y Premium con visita técnica sin cargo.",
    bodyHtml: `
      <section>
        <h2>Sistema Easy-Pack</h2>
        <p>Entrega previa de material descartable ecológico, embalaje fino y grueso, placares portátiles, izajes y desembalaje asistido.</p>
      </section>
    `,
  },
  {
    path: "legal/terms",
    title: `Términos y Condiciones | ${BRAND_CONFIG.siteName}`,
    description: `Términos y condiciones de uso de los servicios de ${BRAND_CONFIG.siteName}.`,
    keywords: "terminos y condiciones, legal, contrato de uso",
    canonicalUrl: `https://${BRAND_CONFIG.domain}/legal/terms`,
    heading: "Términos y Condiciones del Servicio",
    subheading: "Condiciones y normas generales de servicio.",
    bodyHtml: `
      <section>
        <h2>Condiciones Generales</h2>
        <p>El uso de este sitio implica la aceptación de todos nuestros términos y condiciones de servicio.</p>
      </section>
    `,
  },
  {
    path: "legal/privacy",
    title: `Política de Privacidad | ${BRAND_CONFIG.siteName}`,
    description: "Política de privacidad y protección de datos personales.",
    keywords: "politica de privacidad, proteccion de datos, legal",
    canonicalUrl: `https://${BRAND_CONFIG.domain}/legal/privacy`,
    heading: "Política de Privacidad",
    subheading: "Compromiso con la seguridad de la información.",
    bodyHtml: `
      <section>
        <h2>Protección de Datos</h2>
        <p>Tus datos personales son procesados con la máxima seguridad y confidencialidad.</p>
      </section>
    `,
  },
];

function generateStructuredData(route: PrerenderRoute) {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "WebSite"],
    "name": BRAND_CONFIG.siteName,
    "description": route.description,
    "url": route.canonicalUrl,
    "logo": `https://${BRAND_CONFIG.domain}${BRAND_CONFIG.logoUrl}`,
    "image": `https://${BRAND_CONFIG.domain}/og-image.jpg`,
    "email": BRAND_CONFIG.supportEmail,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": BRAND_CONFIG.address,
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": BRAND_CONFIG.latitude,
      "longitude": BRAND_CONFIG.longitude,
    },
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
      .replace(/<meta name="description"\s+content=".*?"\s*\/>/s, `<meta name="description" content="${route.description}" />`)
      .replace(/<meta name="keywords"\s+content=".*?"\s*\/>/s, `<meta name="keywords" content="${route.keywords}" />`)
      .replace(/<link rel="canonical"\s+href=".*?"\s*\/>/s, `<link rel="canonical" href="${route.canonicalUrl}" />`)
      .replace(/<meta property="og:title"\s+content=".*?"\s*\/>/s, `<meta property="og:title" content="${route.title}" />`)
      .replace(/<meta property="og:description"\s+content=".*?"\s*\/>/s, `<meta property="og:description" content="${route.description}" />`)
      .replace(/<meta property="og:url"\s+content=".*?"\s*\/>/s, `<meta property="og:url" content="${route.canonicalUrl}" />`)
      .replace(/<meta property="twitter:title"\s+content=".*?"\s*\/>/s, `<meta property="twitter:title" content="${route.title}" />`)
      .replace(/<meta property="twitter:description"\s+content=".*?"\s*\/>/s, `<meta property="twitter:description" content="${route.description}" />`);

    const jsonLd = JSON.stringify(generateStructuredData(route));
    const jsonLdScript = `<script type="application/ld+json" id="prerendered-jsonld">${jsonLd}</script>`;
    if (pageHtml.includes('id="prerendered-jsonld"')) {
      pageHtml = pageHtml.replace(/<script type="application\/ld\+json" id="prerendered-jsonld">.*?<\/script>/s, jsonLdScript);
    } else {
      pageHtml = pageHtml.replace("</head>", `  ${jsonLdScript}\n</head>`);
    }

    const prerenderedStaticContent = `
      <div id="prerender-static-content" style="padding: 20px; font-family: sans-serif; max-width: 1200px; margin: 0 auto;">
        <h1>${route.heading}</h1>
        <h2>${route.subheading}</h2>
        ${route.bodyHtml}
      </div>
    `;

    const rootStartIndex = pageHtml.indexOf('<div id="root">');
    const bodyEndIndex = pageHtml.indexOf('</body>', rootStartIndex);
    if (rootStartIndex !== -1 && bodyEndIndex !== -1) {
      pageHtml = pageHtml.substring(0, rootStartIndex) + `<div id="root">\n${prerenderedStaticContent}\n  </div>\n` + pageHtml.substring(bodyEndIndex);
    } else {
      pageHtml = pageHtml.replace(
        /<div id="root">[\s\S]*?<\/div>\s*<\/body>/s,
        `<div id="root">${prerenderedStaticContent}</div>\n</body>`
      );
    }

    const outDir = route.path === ""
      ? targetBaseDir
      : path.join(targetBaseDir, route.path);

    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    const outFile = path.join(outDir, "index.html");
    fs.writeFileSync(outFile, pageHtml, "utf-8");
    console.log(`  ✅ Landing Prerenderizada: /${route.path} -> ${path.relative(process.cwd(), outFile)}`);
  }

  console.log("🎉 [SSG-PRERENDER] Prerenderizado estático completado exitosamente.\n");
}

if (require.main === module) {
  runPrerender().catch((err) => {
    console.error("❌ [SSG-PRERENDER] Error durante la ejecución del prerenderizado:", err);
    process.exit(1);
  });
}
