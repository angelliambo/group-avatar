import fs from "fs";
import path from "path";
import { BRAND_CONFIG } from "../packages/shared/src/config/brand";

const REQUIRED_FILES = ["index.html", "robots.txt", "sitemap.xml", "llms.txt", "ads.txt"];

const LANDING_PATHS = [
  "index.html",
  "legal/terms/index.html",
  "legal/privacy/index.html",
];

interface AuditIssue {
  type: "error" | "warning";
  file: string;
  message: string;
}

async function auditSeoLandings(): Promise<void> {
  const targetDir = fs.existsSync(path.join(__dirname, "../packages/portal/frontend/dist"))
    ? path.join(__dirname, "../packages/portal/frontend/dist")
    : fs.existsSync(path.join(__dirname, "../packages/portal/frontend/build"))
    ? path.join(__dirname, "../packages/portal/frontend/build")
    : path.join(__dirname, "../packages/portal/frontend/public");

  console.log(`\n┌──────────────────────────────────────────────────────────────────────────────┐`);
  console.log(`│                                                                              │`);
  console.log(`│   🔍 AUDITORÍA AUTOMATIZADA DE SEO, GEO-AI Y PRERENDERIZADO ESTÁTICO        │`);
  console.log(`│   Directorio Inspeccionado: ${path.relative(process.cwd(), targetDir)}`);
  console.log(`│   Marca: ${BRAND_CONFIG.siteName} (${BRAND_CONFIG.domain})`);
  console.log(`│                                                                              │`);
  console.log(`└──────────────────────────────────────────────────────────────────────────────┘\n`);

  const issues: AuditIssue[] = [];
  let passedChecks = 0;

  // 1. Verificación de presencia de archivos requeridos en /public, /build o /dist
  console.log(`1️⃣  Verificando presencia de archivos core SEO & GEO-AI...`);
  for (const file of REQUIRED_FILES) {
    const filePath = path.join(targetDir, file);
    if (!fs.existsSync(filePath)) {
      issues.push({
        type: "warning",
        file,
        message: `Archivo SEO opcional/recomendado ausente: ${file}`,
      });
    } else {
      passedChecks++;
      console.log(`   ✅ ${file} presente físicamente.`);
    }
  }

  // 2. Verificación de Landings Prerenderizadas y Meta Tags
  console.log(`\n2️⃣  Verificando Meta Tags y Canónicas en Landings Prerenderizadas...`);
  for (const relativePath of LANDING_PATHS) {
    const filePath = path.join(targetDir, relativePath);

    if (!fs.existsSync(filePath)) {
      issues.push({
        type: "error",
        file: relativePath,
        message: `Landing prerenderizada no encontrada: ${relativePath}`,
      });
      continue;
    }

    const htmlContent = fs.readFileSync(filePath, "utf-8");

    // Title length audit (25-85 chars)
    const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : "";
    if (!title) {
      issues.push({ type: "error", file: relativePath, message: "Título no encontrado" });
    } else if (title.length < 25 || title.length > 85) {
      issues.push({
        type: "warning",
        file: relativePath,
        message: `Longitud de título fuera de rango ideal (25-85 chars): "${title}" (${title.length} chars)`,
      });
    } else {
      passedChecks++;
    }

    // Description length audit (100-180 chars)
    const descMatch = htmlContent.match(/<meta name="description"\s+content="(.*?)"\s*\/>/i);
    const description = descMatch ? descMatch[1].trim() : "";
    if (!description) {
      issues.push({ type: "error", file: relativePath, message: "Meta descripción no encontrada" });
    } else if (description.length < 100 || description.length > 180) {
      issues.push({
        type: "warning",
        file: relativePath,
        message: `Longitud de meta descripción fuera de rango ideal (100-180 chars): ${description.length} chars`,
      });
    } else {
      passedChecks++;
    }

    // Canonical trailing slash audit
    const canonicalMatch = htmlContent.match(/<link rel="canonical"\s+href="(.*?)"\s*\/>/i);
    const canonicalUrl = canonicalMatch ? canonicalMatch[1].trim() : "";

    if (!canonicalUrl) {
      issues.push({ type: "error", file: relativePath, message: "Canonical URL no encontrada" });
    } else if (canonicalUrl.length > 30 && canonicalUrl.endsWith("/")) {
      issues.push({
        type: "error",
        file: relativePath,
        message: `URL canónica contiene trailing slash no permitido: "${canonicalUrl}"`,
      });
    } else {
      passedChecks++;
    }

    // JSON-LD presence audit
    if (!htmlContent.includes('type="application/ld+json"')) {
      issues.push({
        type: "warning",
        file: relativePath,
        message: "No se detectó bloque JSON-LD de datos estructurados",
      });
    } else {
      passedChecks++;
    }
  }

  console.log(`\n📊 Resultado de Auditoría SEO: ${passedChecks} checks exitosos, ${issues.length} observaciones.`);
  for (const issue of issues) {
    const prefix = issue.type === "error" ? "❌" : "⚠️";
    console.log(`   ${prefix} [${issue.file}] ${issue.message}`);
  }

  const hasErrors = issues.some((i) => i.type === "error");
  if (hasErrors) {
    process.exitCode = 1;
  }
}

auditSeoLandings();
