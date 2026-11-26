import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import { resolveTenant } from "../utils/tenantResolver";
import { BRAND_CONFIG } from "@factory/shared/config/brand";

const PUBLIC_INDEXABLE_PATHS = new Set([
  "/",
  "/logistica",
  "/mudanzas",
  "/legal/terms",
  "/legal/privacy",
]);

/**
 * Middleware para servir el index.html de React inyectando dinámicamente el SEO y estado de Tenant.
 */
export async function serveReactWithSEO(req: Request, res: Response, next: NextFunction) {
  // Servir archivos de texto plano esenciales (ads.txt, robots.txt, llms.txt) directamente desde Express
  if (req.path === "/ads.txt" || req.path === "/robots.txt" || req.path === "/llms.txt") {
    const fileName = req.path.substring(1);
    let filePath = "/usr/share/nginx/html/" + fileName;
    if (!fs.existsSync(filePath)) {
      filePath = path.resolve(__dirname, "../../../frontend/dist", fileName);
    }
    if (!fs.existsSync(filePath)) {
      filePath = path.resolve(__dirname, "../../frontend/public", fileName);
    }

    if (fs.existsSync(filePath)) {
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.setHeader("Access-Control-Allow-Origin", "*");
      return res.sendFile(filePath);
    }
  }

  // Excluir la API y recursos estáticos con extensiones
  if (req.path.startsWith("/api") || req.path.includes(".")) {
    return next();
  }

  const host = req.headers.host || "";
  const hostname = host.split(":")[0].toLowerCase();

  // Si es un health check local a la raíz, dejar pasar
  if (req.path === "/" && (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "0.0.0.0")) {
    return next();
  }

  // Determinar la ruta al index.html
  let indexPath = "";
  if (process.env.NODE_ENV === "production") {
    indexPath = "/usr/share/nginx/html/index.html";
    if (!fs.existsSync(indexPath)) {
      indexPath = path.resolve(__dirname, "../../../frontend/dist/index.html");
    }
  } else {
    indexPath = path.resolve(__dirname, "../../frontend/dist/index.html");
    if (!fs.existsSync(indexPath)) {
      indexPath = path.resolve(__dirname, "../../frontend/public/index.html");
    }
  }

  let html = "";
  if (fs.existsSync(indexPath)) {
    html = fs.readFileSync(indexPath, "utf8");
  }

  if (!html) {
    // Fallback HTML mínimo seguro para prevenir 5xx
    html = `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"/><title>${BRAND_CONFIG.siteName}</title></head><body><div id="root"></div></body></html>`;
  }

  let tenant = null;
  try {
    tenant = await resolveTenant(host);
  } catch {
    // Si falla la BD de tenant, continuar pacíficamente con la marca por defecto
  }

  try {
    // Resolver valores SEO
    const seoTitle = tenant?.seo?.title || BRAND_CONFIG.seoTitle;
    const seoDescription = tenant?.seo?.description || BRAND_CONFIG.seoDescription;
    const seoKeywords = tenant?.seo?.keywords || BRAND_CONFIG.seoKeywords;
    const protocol = req.secure || req.headers["x-forwarded-proto"] === "https" ? "https" : "http";
    const seoImage = tenant?.seo?.image || `${protocol}://${host}/og-image.jpg`;
    const themeColor = tenant?.theme?.primaryColor || "#1890ff";

    // Determinar si es una ruta pública o privada/inexistente para indexación
    const isPublicRoute = PUBLIC_INDEXABLE_PATHS.has(req.path);
    const robotsTag = isPublicRoute
      ? `<meta name="robots" content="index, follow" />`
      : `<meta name="robots" content="noindex, follow" />`;

    // Normalizar URL canónica
    const cleanPath = req.path === "/" ? "" : req.path;
    const canonicalUrl = `https://${BRAND_CONFIG.domain}${cleanPath}`;
    const canonicalTag = `<link rel="canonical" href="${canonicalUrl}" />`;

    // Reemplazar title y metas usando expresiones regulares robustas
    html = html
      .replace(/<title>.*?<\/title>/i, `<title>${seoTitle}</title>`)
      .replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${seoDescription}" />`)
      .replace(/<meta\s+name="keywords"\s+content=".*?"\s*\/?>/i, `<meta name="keywords" content="${seoKeywords}" />`)
      .replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${seoTitle}" />`)
      .replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${seoDescription}" />`)
      .replace(/<meta\s+property="og:image"\s+content=".*?"\s*\/?>/i, `<meta property="og:image" content="${seoImage}" />`)
      .replace(/<meta\s+name="theme-color"\s+content=".*?"\s*\/?>/i, `<meta name="theme-color" content="${themeColor}" />`);

    // Actualizar/inyectar etiqueta de robots
    if (html.includes('<meta name="robots"')) {
      html = html.replace(/<meta\s+name="robots"\s+content=".*?"\s*\/?>/i, robotsTag);
    } else {
      html = html.replace("</head>", `  ${robotsTag}\n</head>`);
    }

    // Actualizar/inyectar etiqueta canónica
    if (html.includes('<link rel="canonical"')) {
      html = html.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, canonicalTag);
    } else {
      html = html.replace("</head>", `  ${canonicalTag}\n</head>`);
    }

    // Inyectar el estado inicial en window.__INITIAL_STATE__
    const initialState = {
      tenant: tenant ? {
        id: tenant.id,
        subdomain: tenant.subdomain,
        domain: tenant.domain,
        name: tenant.name,
        theme: tenant.theme,
        features: tenant.features,
      } : null,
      brandDefault: {
        siteName: BRAND_CONFIG.siteName,
        domain: BRAND_CONFIG.domain,
        supportEmail: BRAND_CONFIG.supportEmail,
        theme: {
          primaryColor: "#1890ff",
          secondaryColor: "#52c41a",
          darkMode: false,
        }
      }
    };

    const stateScript = `<script id="initial-state">window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>`;
    html = html.replace("</head>", `  ${stateScript}\n</head>`);

    // Servir HTML siempre con status 200 OK para evitar 5xx
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.status(200).send(html);

  } catch (error) {
    console.error("❌ [SEO_MIDDLEWARE] Error inesperado en serveReactWithSEO:", error);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.status(200).send(html);
  }
}
