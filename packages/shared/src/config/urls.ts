import { BRAND_CONFIG } from './brand';

export const PORTAL_URL = `https://${BRAND_CONFIG.domain}`;
export const LICENSE_API_URL = `${PORTAL_URL}/api`;
export const LEGAL_TERMS_URL = `${PORTAL_URL}/legal/terms`;
export const LEGAL_PRIVACY_URL = `${PORTAL_URL}/legal/privacy`;

export const GA_MEASUREMENT_ID = '';
export const GA_API_SECRET = '';
export const GA_COLLECT_URL = 'https://www.google-analytics.com/mp/collect';
export const GA_DEBUG_URL = 'https://www.google-analytics.com/debug/mp/collect';

// Redes Sociales (derivadas dinámicamente de BRAND_CONFIG.socials)
export const SHOW_SOCIAL_LINKS = Boolean(
  BRAND_CONFIG.socials?.instagram ||
  BRAND_CONFIG.socials?.x ||
  BRAND_CONFIG.socials?.facebook ||
  BRAND_CONFIG.socials?.tiktok
);
export const SOCIAL_X_URL = BRAND_CONFIG.socials?.x ? `https://x.com/${BRAND_CONFIG.socials.x}` : '';
export const SOCIAL_INSTAGRAM_URL = BRAND_CONFIG.socials?.instagram ? `https://instagram.com/${BRAND_CONFIG.socials.instagram}` : '';
export const SOCIAL_FACEBOOK_URL = BRAND_CONFIG.socials?.facebook ? `https://facebook.com/${BRAND_CONFIG.socials.facebook}` : '';
export const SOCIAL_TIKTOK_URL = BRAND_CONFIG.socials?.tiktok ? `https://tiktok.com/@${BRAND_CONFIG.socials.tiktok}` : '';

