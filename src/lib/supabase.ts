// Utilitários para ler/escrever no Supabase via REST API (sem dependência extra)

const URL     = (process.env.NEXT_PUBLIC_SUPABASE_URL      ?? "").trim();
const ANON    = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "").trim();
const SVC     = (process.env.SUPABASE_SERVICE_ROLE_KEY     ?? "").trim();
const SITE_ID = (process.env.SITE_ID                       ?? "default").trim();

/** Lê o conteúdo do site (sem autenticação — política pública de leitura).
 *  @param fresh  Se true, ignora o cache e força uma leitura fresca do Supabase.
 */
export async function readSiteContent(fresh = false): Promise<Record<string, unknown> | null> {
  if (!URL || !ANON) return null;
  try {
    const res = await fetch(
      `${URL}/rest/v1/site_content?site_id=eq.${SITE_ID}&select=data`,
      {
        headers: { apikey: ANON, Authorization: `Bearer ${ANON}` },
        ...(fresh ? { cache: "no-store" } : { next: { revalidate: 60 } }),
      }
    );
    if (!res.ok) return null;
    const rows = (await res.json()) as { data: Record<string, unknown> }[];
    return rows[0]?.data ?? null;
  } catch {
    return null;
  }
}

/** Grava/atualiza o conteúdo do site (requer service role). */
export async function writeSiteContent(data: unknown): Promise<boolean> {
  if (!URL || !SVC) {
    console.error("[supabase] writeSiteContent: missing URL or SVC key", { hasURL: !!URL, hasSVC: !!SVC, SITE_ID });
    return false;
  }
  try {
    const res = await fetch(`${URL}/rest/v1/site_content`, {
      method: "POST",
      headers: {
        apikey: SVC,
        Authorization:  `Bearer ${SVC}`,
        "Content-Type": "application/json",
        Prefer:         "resolution=merge-duplicates",
      },
      body: JSON.stringify({ site_id: SITE_ID, data, updated_at: new Date().toISOString() }),
    });
    if (!res.ok) {
      const errText = await res.text();
      console.error("[supabase] writeSiteContent failed:", res.status, errText);
    }
    return res.ok;
  } catch (e) {
    console.error("[supabase] writeSiteContent exception:", e);
    return false;
  }
}
