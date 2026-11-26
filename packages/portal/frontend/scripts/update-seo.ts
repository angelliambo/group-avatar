import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { BRAND_CONFIG } from "../../../shared/src/config/brand";

const FRONTEND_DIR = join(__dirname, "..");
const PUBLIC_DIR = join(FRONTEND_DIR, "public");
const TEMPLATES_DIR = join(PUBLIC_DIR, "seo-templates");
const FLY_TOML_PATH = join(FRONTEND_DIR, "../fly.toml");

console.log("🚀 [SEO-UPDATE] Iniciando actualización centralizada de SEO, Marca y Hosting...");
console.log(`🔧 [SEO-UPDATE] Configuración actual (desde brand.ts):`);
console.log(`   - App Fly.io (appName): ${BRAND_CONFIG.appName}`);
console.log(`   - Marca (siteName): ${BRAND_CONFIG.siteName}`);
console.log(`   - Dominio (domain): ${BRAND_CONFIG.domain}`);
console.log(`   - Título SEO: ${BRAND_CONFIG.seoTitle}`);
console.log(`   - Email de Soporte: ${BRAND_CONFIG.supportEmail}`);

if (!existsSync(TEMPLATES_DIR)) {
  console.error(`❌ [SEO-UPDATE] Error: La carpeta de plantillas no existe en: ${TEMPLATES_DIR}`);
  process.exit(1);
}

const applyHtmlBrandReplacements = (rawHtml: string): string => {
  return rawHtml
    .replace(/<title>.*?<\/title>/, `<title>${BRAND_CONFIG.seoTitle}</title>`)
    .replace(/<link rel="canonical"\s+href=".*?"\s*\/>/s, `<link rel="canonical" href="https://${BRAND_CONFIG.domain}/" />`)
    .replace(/<meta name="description"\s+content=".*?"\s*\/>/s, `<meta name="description" content="${BRAND_CONFIG.seoDescription}" />`)
    .replace(/<meta name="keywords"\s+content=".*?"\s*\/>/s, `<meta name="keywords" content="${BRAND_CONFIG.seoKeywords}" />`)
    .replace(/<meta name="author"\s+content=".*?"\s*\/>/s, `<meta name="author" content="${BRAND_CONFIG.siteName}" />`)
    .replace(/<meta property="og:url"\s+content=".*?"\s*\/>/s, `<meta property="og:url" content="https://${BRAND_CONFIG.domain}/" />`)
    .replace(/<meta property="og:title"\s+content=".*?"\s*\/>/s, `<meta property="og:title" content="${BRAND_CONFIG.seoTitle}" />`)
    .replace(/<meta property="og:description"\s+content=".*?"\s*\/>/s, `<meta property="og:description" content="${BRAND_CONFIG.seoDescription}" />`)
    .replace(/<meta property="og:image"\s+content=".*?"\s*\/>/s, `<meta property="og:image" content="https://${BRAND_CONFIG.domain}/og-image.jpg" />`)
    .replace(/<meta property="og:image:secure_url"\s+content=".*?"\s*\/>/s, `<meta property="og:image:secure_url" content="https://${BRAND_CONFIG.domain}/og-image.jpg" />`)
    .replace(/<meta property="og:image:alt"\s+content=".*?"\s*\/>/s, `<meta property="og:image:alt" content="${BRAND_CONFIG.seoImageAlt}" />`)
    .replace(/<meta property="og:site_name"\s+content=".*?"\s*\/>/s, `<meta property="og:site_name" content="${BRAND_CONFIG.siteName}" />`)
    .replace(/<meta property="twitter:url"\s+content=".*?"\s*\/>/s, `<meta property="twitter:url" content="https://${BRAND_CONFIG.domain}/" />`)
    .replace(/<meta property="twitter:title"\s+content=".*?"\s*\/>/s, `<meta property="twitter:title" content="${BRAND_CONFIG.seoTitle}" />`)
    .replace(/<meta property="twitter:description"\s+content=".*?"\s*\/>/s, `<meta property="twitter:description" content="${BRAND_CONFIG.seoDescription}" />`)
    .replace(/<meta property="twitter:image"\s+content=".*?"\s*\/>/s, `<meta property="twitter:image" content="https://${BRAND_CONFIG.domain}/og-image.jpg" />`)
    .replace(/<meta property="twitter:image:alt"\s+content=".*?"\s*\/>/s, `<meta property="twitter:image:alt" content="${BRAND_CONFIG.seoImageAlt}" />`)
    .replace(/<h1>.*?<\/h1>/s, `<h1>${BRAND_CONFIG.seoTitle}</h1>`)
    .replace(/<h2>.*?<\/h2>/s, `<h2>${BRAND_CONFIG.seoDescription}</h2>`)
    .replace(/id="portal-loader-logo">.*?<\/div>/s, `id="portal-loader-logo">${BRAND_CONFIG.siteName}</div>`)
    .replace(/__DOMAIN_NAME__/g, BRAND_CONFIG.domain)
    .replace(/__BRAND_NAME__/g, BRAND_CONFIG.siteName);
};

// 1. Procesar public/index.html y packages/portal/frontend/index.html (Vite root)
const processIndexHtml = () => {
  const templatePath = join(TEMPLATES_DIR, "index.html");
  const publicOutputPath = join(PUBLIC_DIR, "index.html");
  const viteRootHtmlPath = join(FRONTEND_DIR, "index.html");

  if (existsSync(templatePath)) {
    const content = applyHtmlBrandReplacements(readFileSync(templatePath, "utf8"));
    writeFileSync(publicOutputPath, content, "utf8");
    console.log(`✅ [SEO-UPDATE] public/index.html actualizado físicamente.`);
  }

  if (existsSync(viteRootHtmlPath)) {
    const viteContent = applyHtmlBrandReplacements(readFileSync(viteRootHtmlPath, "utf8"));
    writeFileSync(viteRootHtmlPath, viteContent, "utf8");
    console.log(`✅ [SEO-UPDATE] frontend/index.html (Vite entry) actualizado físicamente.`);
  }
};

// 2. Procesar robots.txt
const processRobotsTxt = () => {
  const templatePath = join(TEMPLATES_DIR, "robots.txt");
  const outputPath = join(PUBLIC_DIR, "robots.txt");

  if (!existsSync(templatePath)) return;

  let content = readFileSync(templatePath, "utf8");
  content = content
    .replace(/__DOMAIN_NAME__/g, BRAND_CONFIG.domain)
    .replace(/__BRAND_NAME__/g, BRAND_CONFIG.siteName);

  writeFileSync(outputPath, content, "utf8");
  console.log(`✅ [SEO-UPDATE] robots.txt actualizado físicamente.`);
};

// 3. Procesar sitemap.xml
const processSitemapXml = () => {
  const templatePath = join(TEMPLATES_DIR, "sitemap.xml");
  const outputPath = join(PUBLIC_DIR, "sitemap.xml");

  if (!existsSync(templatePath)) return;

  let content = readFileSync(templatePath, "utf8");
  content = content
    .replace(/__DOMAIN_NAME__/g, BRAND_CONFIG.domain);

  writeFileSync(outputPath, content, "utf8");
  console.log(`✅ [SEO-UPDATE] sitemap.xml actualizado físicamente.`);
};

// 4. Procesar manifest.json
const processManifestJson = () => {
  const templatePath = join(TEMPLATES_DIR, "manifest.json");
  const outputPath = join(PUBLIC_DIR, "manifest.json");

  if (!existsSync(templatePath)) return;

  let content = readFileSync(templatePath, "utf8");
  content = content
    .replace(/"short_name":\s*"__BRAND_NAME__"/g, `"short_name": "${BRAND_CONFIG.siteName}"`)
    .replace(/"name":\s*".*?"/g, `"name": "${BRAND_CONFIG.seoTitle}"`)
    .replace(/"description":\s*".*?"/g, `"description": "${BRAND_CONFIG.seoDescription}"`)
    .replace(/__BRAND_NAME__/g, BRAND_CONFIG.siteName);

  writeFileSync(outputPath, content, "utf8");
  console.log(`✅ [SEO-UPDATE] manifest.json actualizado físicamente.`);
};

// 5. Procesar llms.txt
const processLlmsTxt = () => {
  const templatePath = join(TEMPLATES_DIR, "llms.txt");
  const outputPath = join(PUBLIC_DIR, "llms.txt");

  if (!existsSync(templatePath)) return;

  let content = readFileSync(templatePath, "utf8");
  content = content
    .replace(/# __BRAND_NAME__ - .*?\n/g, `# ${BRAND_CONFIG.seoTitle}\\n`)
    .replace(/__DOMAIN_NAME__/g, BRAND_CONFIG.domain)
    .replace(/__BRAND_NAME__/g, BRAND_CONFIG.siteName);

  writeFileSync(outputPath, content, "utf8");
  console.log(`✅ [SEO-UPDATE] llms.txt actualizado físicamente.`);
};

// 6. Sincronizar fly.toml con BRAND_CONFIG (appName y domain)
const processFlyToml = () => {
  if (!existsSync(FLY_TOML_PATH)) return;

  let content = readFileSync(FLY_TOML_PATH, "utf8");
  content = content
    .replace(/^app\s*=\s*".*?"/m, `app = "${BRAND_CONFIG.appName}"`)
    .replace(/VITE_API_URL\s*=\s*".*?"/g, `VITE_API_URL = "https://${BRAND_CONFIG.domain}/api"`)
    .replace(/^#?\s*FRONTEND_URL\s*=\s*".*?"/m, `FRONTEND_URL = "https://${BRAND_CONFIG.domain}"`);

  writeFileSync(FLY_TOML_PATH, content, "utf8");
  console.log(`✅ [SEO-UPDATE] fly.toml sincronizado con app="${BRAND_CONFIG.appName}" y domain="${BRAND_CONFIG.domain}".`);
};

// Ejecutar todos los procesadores
try {
  processIndexHtml();
  processRobotsTxt();
  processSitemapXml();
  processManifestJson();
  processLlmsTxt();
  processFlyToml();
  console.log("🎉 [SEO-UPDATE] Todos los archivos estáticos de SEO y configuración de Fly.io se actualizaron exitosamente.");
} catch (error) {
  console.error("❌ [SEO-UPDATE] Error procesando los archivos de SEO:", error);
  process.exit(1);
}
