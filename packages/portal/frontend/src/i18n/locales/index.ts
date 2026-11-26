import esBase from './es/index';

export const locales: Record<string, { pages: Record<string, unknown> }> = {
  'es': { pages: esBase },
};

export async function loadLocaleAsync(code: string): Promise<{ pages: Record<string, unknown> } | null> {
  return locales[code] || null;
}
