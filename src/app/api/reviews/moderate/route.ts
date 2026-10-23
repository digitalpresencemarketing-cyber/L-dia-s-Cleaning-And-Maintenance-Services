import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { verifySessionToken, TOKEN_COOKIE } from "@/lib/admin-auth";
import { readSiteContent, writeSiteContent } from "@/lib/supabase";
import { siteConfig, type SiteConfig } from "@/lib/site.config";
import { deepMerge } from "@/lib/get-site-config";
import { displayName, initialsOf, monthYear, readPending, writePending } from "@/lib/reviews";

/** POST { id, action: "approve" | "reject" } — publica ou descarta uma avaliação (somente admin). */
export async function POST(req: NextRequest) {
  if (!verifySessionToken(req.cookies.get(TOKEN_COOKIE)?.value ?? "")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, action } = (await req.json()) as { id?: string; action?: string };
  const pending = await readPending();
  const item = pending.find((r) => r.id === id);
  if (!item || (action !== "approve" && action !== "reject")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (action === "approve") {
    const raw = await readSiteContent(true);
    const config = deepMerge(siteConfig as unknown as SiteConfig, (raw ?? {}) as Partial<SiteConfig>);
    const location = [item.service, item.location].filter(Boolean).join(" · ") || "Greater Boston, MA";
    const review = {
      name: displayName(item.name),
      location,
      rating: item.rating,
      date: monthYear(item.createdAt),
      text: item.text,
      avatar: initialsOf(item.name),
      ...(item.photo ? { photo: item.photo } : {}),
    };
    const ok = await writeSiteContent({ ...config, reviews: [review, ...config.reviews] });
    if (!ok) return NextResponse.json({ error: "Failed to publish" }, { status: 500 });
    revalidatePath("/");
  }

  const ok = await writePending(pending.filter((r) => r.id !== id));
  if (!ok) return NextResponse.json({ error: "Failed to update queue" }, { status: 500 });

  return NextResponse.json({ ok: true });
}
