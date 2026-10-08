import { NextRequest, NextResponse } from "next/server";
import { readSiteContent, writeSiteContent } from "@/lib/supabase";
import { verifySessionToken, TOKEN_COOKIE } from "@/lib/admin-auth";
import { siteConfig } from "@/lib/site.config";
import { revalidatePath } from "next/cache";

/** GET — retorna o conteúdo atual (semeia o banco se vazio). */
export async function GET() {
  // Use fresh read (no-store) so we always see the current DB state for seed check
  let data = await readSiteContent(true);

  // Auto-seed: insere o config padrão se a tabela estiver vazia
  if (!data) {
    await writeSiteContent(siteConfig);
    data = siteConfig as unknown as Record<string, unknown>;
  }

  return NextResponse.json(data);
}

/** PUT — atualiza o conteúdo (requer sessão admin). */
export async function PUT(req: NextRequest) {
  const token = req.cookies.get(TOKEN_COOKIE)?.value ?? "";
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const ok = await writeSiteContent(body);
  if (!ok) {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }

  // Invalida o cache do Next.js para o conteúdo do site
  revalidatePath("/");

  return NextResponse.json({ ok: true });
}
