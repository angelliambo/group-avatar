import esBase from './es/index';

export const locales: Record<string, { pages: Record<string, unknown> }> = {
  'es': { pages: esBase },
};

export async function loadLocaleAsync(code: string): Promise<{ pages: Record<string, unknown> } | null> {
  if (code === 'en') {
    const mod = await import('./en/index');
    return { pages: mod.default };
  }
  return null;
}
