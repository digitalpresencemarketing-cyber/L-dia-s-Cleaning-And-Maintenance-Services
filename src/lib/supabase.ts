// Utilitários para ler/escrever no Supabase via REST API (sem dependência extra)

const URL     = (process.env.NEXT_PUBLIC_SUPABASE_URL      ?? "").trim();
const ANON    = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "").trim();
const SVC     = (process.env.SUPABASE_SERVICE_ROLE_KEY     ?? "").trim();
const SITE_ID = (process.env.SITE_ID                       ?? "default").trim();

/** Linha separada (mesma tabela) com as avaliações enviadas pelo site aguardando aprovação. */
export const PENDING_REVIEWS_ID = `${SITE_ID}__pending-reviews`;

/** Lê o campo `data` de uma linha da tabela site_content.
 *  @param fresh  Se true, ignora o cache e força uma leitura fresca do Supabase.
 */
export async function readRow(rowId: string, fresh = false): Promise<Record<string, unknown> | null> {
  if (!URL || !ANON) return null;
  try {
    const res = await fetch(
      `${URL}/rest/v1/site_content?site_id=eq.${encodeURIComponent(rowId)}&select=data`,
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

/** Grava/atualiza uma linha da tabela site_content (requer service role). */
export async function writeRow(rowId: string, data: unknown): Promise<boolean> {
  if (!URL || !SVC) {
    console.error("[supabase] writeRow: missing URL or SVC key", { hasURL: !!URL, hasSVC: !!SVC, rowId });
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
      body: JSON.stringify({ site_id: rowId, data, updated_at: new Date().toISOString() }),
    });
    if (!res.ok) {
      const errText = await res.text();
      console.error("[supabase] writeRow failed:", res.status, errText);
    }
    return res.ok;
  } catch (e) {
    console.error("[supabase] writeRow exception:", e);
    return false;
  }
}

/** Lê o conteúdo do site (sem autenticação — política pública de leitura). */
export function readSiteContent(fresh = false) {
  return readRow(SITE_ID, fresh);
}

/** Grava/atualiza o conteúdo do site (requer service role). */
export function writeSiteContent(data: unknown) {
  return writeRow(SITE_ID, data);
}

/** Envia um arquivo para o bucket público `site-images` e devolve a URL pública. */
export async function uploadPublicImage(path: string, body: Buffer, contentType: string): Promise<string | null> {
  if (!URL || !SVC) return null;
  const res = await fetch(`${URL}/storage/v1/object/site-images/${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${SVC}`, "Content-Type": contentType },
    body: new Uint8Array(body),
  });
  if (!res.ok) {
    console.error("[supabase] upload failed:", res.status, await res.text());
    return null;
  }
  return `${URL}/storage/v1/object/public/site-images/${path}`;
}
