import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, TOKEN_COOKIE } from "@/lib/admin-auth";
import { readPending } from "@/lib/reviews";

/** GET — lista as avaliações aguardando aprovação (somente admin). */
export async function GET(req: NextRequest) {
  if (!verifySessionToken(req.cookies.get(TOKEN_COOKIE)?.value ?? "")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ items: await readPending() });
}
