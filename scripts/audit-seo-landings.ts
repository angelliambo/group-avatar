import fs from "fs";
import path from "path";
import { BRAND_CONFIG } from "../packages/shared/src/config/brand";

const REQUIRED_FILES = [
  "index.html",
  "robots.txt",
  "sitemap.xml",
  "llms.txt",
  "llms-full.txt",
  "manifest.json",
  "og-image.jpg",
];

const INDEXABLE_LANDINGS = [
  { file: "index.html", expectedCanonical: `https://${BRAND_CONFIG.domain}/` },
  { file: "logistica/index.html", expectedCanonical: `https://${BRAND_CONFIG.domain}/logistica` },
  { file: "mudanzas/index.html", expectedCanonical: `https://${BRAND_CONFIG.domain}/mudanzas` },
];

const NOINDEX_LEGAL_PAGES = [
  "legal/terms/index.html",
  "legal/privacy/index.html",
];

const FORBIDDEN_PATTERNS: Array<{ label: string; regex: RegExp }> = [
  { label: "boilerplate", regex: /boilerplate/i },
  { label: "saas", regex: /\bsaas\b/i },
  { label: "lemon squeezy", regex: /lemon\s*squeezy/i },
  { label: "dictado por voz", regex: /dictado\s+por\s+voz/i },
  { label: "mataderos (dirección vieja)", regex: /\bmataderos\b/i },
  { label: "araujo (calle vieja)", regex: /\baraujo\b/i },
  { label: "@factory", regex: /(?<![a-z0-9._%+-])@factory\b/i },
  { label: "@avatargroup (handle mock)", regex: /(?<![a-z0-9._%+-])@avatargroup(?!\.)\b/i },
  { label: "/pricing (ruta inexistente)", regex: /\/pricing\b/i },
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
  console.log(`│   🔍 AUDITORÍA AUTOMATIZADA DE SEO, GEO-AI, LLMS Y PRERENDERIZADO ESTÁTICO   │`);
  console.log(`│   Directorio Inspeccionado: ${path.relative(process.cwd(), targetDir)}`);
  console.log(`│   Marca: ${BRAND_CONFIG.siteName} (${BRAND_CONFIG.domain})`);
  console.log(`│                                                                              │`);
  console.log(`└──────────────────────────────────────────────────────────────────────────────┘\n`);

  const issues: AuditIssue[] = [];
  let passedChecks = 0;

  // 1. Verificación de archivos core SEO & GEO-AI
  console.log(`1️⃣  Verificando presencia de archivos core SEO & GEO-AI...`);
  for (const file of REQUIRED_FILES) {
    const filePath = path.join(targetDir, file);
    if (!fs.existsSync(filePath)) {
      issues.push({
        type: "error",
        file,
        message: `Archivo SEO obligatorio ausente: ${file}`,
      });
    } else {
      passedChecks++;
      console.log(`   ✅ ${file} presente físicamente.`);
    }
  }

  // 2. Verificación de robots.txt (no bloquear JS/CSS + declarar sitemap y llms)
  console.log(`\n2️⃣  Verificando directivas de rastreo en robots.txt...`);
  const robotsPath = path.join(targetDir, "robots.txt");
  if (fs.existsSync(robotsPath)) {
    const robotsContent = fs.readFileSync(robotsPath, "utf-8");
    if (/Disallow:\s*\/\*\.js\$/i.test(robotsContent) || /Disallow:\s*\/\*\.css\$/i.test(robotsContent)) {
      issues.push({
        type: "error",
        file: "robots.txt",
        message: "robots.txt bloquea archivos .js o .css e impide el renderizado de Googlebot/Bingbot.",
      });
    } else {
      passedChecks++;
      console.log(`   ✅ Renderizado JS/CSS permitido para todos los bots.`);
    }

    if (!robotsContent.includes(`Sitemap: https://${BRAND_CONFIG.domain}/sitemap.xml`)) {
      issues.push({
        type: "error",
        file: "robots.txt",
        message: `Falta referencia exacta a Sitemap: https://${BRAND_CONFIG.domain}/sitemap.xml`,
      });
    } else {
      passedChecks++;
    }

    if (!robotsContent.includes("/llms.txt") || !robotsContent.includes("/llms-full.txt")) {
      issues.push({
        type: "error",
        file: "robots.txt",
        message: "robots.txt debe permitir y referenciar explícitamente /llms.txt y /llms-full.txt",
      });
    } else {
      passedChecks++;
      console.log(`   ✅ /llms.txt, /llms-full.txt y Sitemap declarados correctamente.`);
    }
  }

  // 3. Verificación de sitemap.xml (3 rutas comerciales presentes, legales excluidas)
  console.log(`\n3️⃣  Verificando coherencia de sitemap.xml...`);
  const sitemapPath = path.join(targetDir, "sitemap.xml");
  if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, "utf-8");
    for (const landing of INDEXABLE_LANDINGS) {
      if (!sitemapContent.includes(`<loc>${landing.expectedCanonical}</loc>`)) {
        issues.push({
          type: "error",
          file: "sitemap.xml",
          message: `Falta URL indexable en sitemap.xml: ${landing.expectedCanonical}`,
        });
      } else {
        passedChecks++;
      }
    }

    if (sitemapContent.includes("/legal/")) {
      issues.push({
        type: "error",
        file: "sitemap.xml",
        message: "sitemap.xml no debe incluir rutas /legal/* marcadas como noindex.",
      });
    } else {
      passedChecks++;
      console.log(`   ✅ sitemap.xml contiene las 3 rutas comerciales y excluye legales (noindex).`);
    }
  }

  // 4. Verificación de llms.txt y llms-full.txt
  console.log(`\n4️⃣  Verificando contenido estructurado de llms.txt y llms-full.txt...`);
  for (const [llmFile, minChars] of [["llms.txt", 800], ["llms-full.txt", 3500]] as const) {
    const llmPath = path.join(targetDir, llmFile);
    if (!fs.existsSync(llmPath)) continue;
    const llmContent = fs.readFileSync(llmPath, "utf-8");

    if (llmContent.length < minChars) {
      issues.push({
        type: "error",
        file: llmFile,
        message: `Contenido insuficiente en ${llmFile} (${llmContent.length} chars, mínimo esperado ${minChars}).`,
      });
    } else {
      passedChecks++;
    }

    if (llmContent.includes("\\n")) {
      issues.push({
        type: "error",
        file: llmFile,
        message: `Se detectó secuencia literal "\\n" mal escapada en ${llmFile}.`,
      });
    } else {
      passedChecks++;
    }

    if (
      !llmContent.includes(BRAND_CONFIG.domain) ||
      !llmContent.includes("Lomas del Mirador") ||
      !llmContent.includes("Easy-Pack")
    ) {
      issues.push({
        type: "error",
        file: llmFile,
        message: `Faltan datos institucionales clave de Avatar Group en ${llmFile}.`,
      });
    } else {
      passedChecks++;
      console.log(`   ✅ ${llmFile} validado (${llmContent.length} caracteres, 100% datos oficiales).`);
    }
  }

  // 5. Verificación de Landings Indexables Prerenderizadas
  console.log(`\n5️⃣  Verificando Meta Tags, Canónicas y Schema.org en Landings Indexables...`);
  for (const { file: relativePath, expectedCanonical } of INDEXABLE_LANDINGS) {
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

    const descMatch = htmlContent.match(/<meta name="description"\s+content="(.*?)"\s*\/>/is);
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

    const robotsMatch = htmlContent.match(/<meta name="robots"\s+content="(.*?)"\s*\/>/i);
    const robotsValue = robotsMatch ? robotsMatch[1].trim() : "";
    if (robotsValue !== "index, follow") {
      issues.push({
        type: "error",
        file: relativePath,
        message: `Directiva robots incorrecta en landing pública: "${robotsValue}" (esperado "index, follow")`,
      });
    } else {
      passedChecks++;
    }

    const canonicalMatch = htmlContent.match(/<link rel="canonical"\s+href="(.*?)"\s*\/>/i);
    const canonicalUrl = canonicalMatch ? canonicalMatch[1].trim() : "";
    if (canonicalUrl !== expectedCanonical) {
      issues.push({
        type: "error",
        file: relativePath,
        message: `URL canónica "${canonicalUrl}" no coincide con la esperada "${expectedCanonical}"`,
      });
    } else {
      passedChecks++;
    }

    const jsonLdMatch = htmlContent.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i);
    if (!jsonLdMatch) {
      issues.push({
        type: "error",
        file: relativePath,
        message: "No se detectó bloque JSON-LD de datos estructurados",
      });
    } else {
      try {
        const parsed = JSON.parse(jsonLdMatch[1]);
        if (!Array.isArray(parsed["@graph"])) {
          issues.push({
            type: "warning",
            file: relativePath,
            message: "El bloque JSON-LD no utiliza estructura unificada @graph",
          });
        } else {
          passedChecks++;
          console.log(`   ✅ ${relativePath}: título (${title.length}c), desc (${description.length}c), canonical y @graph válidos.`);
        }
      } catch {
        issues.push({
          type: "error",
          file: relativePath,
          message: "JSON-LD inválido (error de sintaxis JSON)",
        });
      }
    }
  }

  // 6. Verificación de desindexación estricta en páginas legales
  console.log(`\n6️⃣  Verificando exclusión SEO (noindex, nofollow) en páginas legales...`);
  for (const legalRelPath of NOINDEX_LEGAL_PAGES) {
    const legalPath = path.join(targetDir, legalRelPath);
    if (!fs.existsSync(legalPath)) continue;
    const htmlContent = fs.readFileSync(legalPath, "utf-8");
    const robotsMatch = htmlContent.match(/<meta name="robots"\s+content="(.*?)"\s*\/>/i);
    const robotsValue = robotsMatch ? robotsMatch[1].trim() : "";
    if (!robotsValue.includes("noindex")) {
      issues.push({
        type: "error",
        file: legalRelPath,
        message: `Página legal sin directiva noindex: "${robotsValue}"`,
      });
    } else {
      passedChecks++;
      console.log(`   ✅ ${legalRelPath} protegida con "${robotsValue}".`);
    }
  }

  // 7. Escaneo anti-contaminación de datos mock / heredados
  console.log(`\n7️⃣  Escaneando ausencia total de datos mock o heredados de otros proyectos...`);
  const filesToScanForLeaks = [
    ...REQUIRED_FILES.filter((f) => !f.endsWith(".jpg")),
    "logistica/index.html",
    "mudanzas/index.html",
    ...NOINDEX_LEGAL_PAGES,
    "offline.html",
    "clear-sw.html",
  ];

  let leakCount = 0;
  for (const relFile of filesToScanForLeaks) {
    const fullPath = path.join(targetDir, relFile);
    if (!fs.existsSync(fullPath)) continue;
    const text = fs.readFileSync(fullPath, "utf-8");
    for (const pattern of FORBIDDEN_PATTERNS) {
      if (pattern.regex.test(text)) {
        leakCount++;
        issues.push({
          type: "error",
          file: relFile,
          message: `Dato heredado/mock detectado (${pattern.label})`,
        });
      }
    }
  }

  if (leakCount === 0) {
    passedChecks++;
    console.log(`   ✅ 0 rastros de datos mock/boilerplate en los ${filesToScanForLeaks.length} archivos públicos auditados.`);
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
