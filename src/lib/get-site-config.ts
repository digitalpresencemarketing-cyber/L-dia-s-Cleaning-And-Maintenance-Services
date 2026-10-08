import { readSiteContent } from "./supabase";
import { siteConfig, type SiteConfig } from "./site.config";

/**
 * Busca o conteúdo do site no Supabase (server-side).
 * Usa o siteConfig estático como fallback caso o Supabase não esteja configurado
 * ou retorne um erro.
 */
export async function fetchSiteConfig(): Promise<SiteConfig> {
  const data = await readSiteContent();
  if (data && typeof data === "object") {
    // Mescla com o config padrão para garantir que todos os campos existam
    return deepMerge(siteConfig as unknown as SiteConfig, data as Partial<SiteConfig>);
  }
  return siteConfig as unknown as SiteConfig;
}

export function deepMerge<T extends object>(base: T, override: Partial<T>): T {
  const result = { ...base };
  for (const key in override) {
    const val = override[key];
    if (val !== null && val !== undefined) {
      if (Array.isArray(val)) {
        (result as Record<string, unknown>)[key] = val;
      } else if (typeof val === "object" && !Array.isArray(base[key])) {
        (result as Record<string, unknown>)[key] = deepMerge(
          base[key] as object,
          val as object
        );
      } else {
        (result as Record<string, unknown>)[key] = val;
      }
    }
  }
  return result;
}
