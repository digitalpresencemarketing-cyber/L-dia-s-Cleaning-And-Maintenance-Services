import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, verifySessionToken, generateSessionToken, TOKEN_COOKIE } from "@/lib/admin-auth";

/** GET — verifica se já existe uma sessão válida. */
export async function GET(req: NextRequest) {
  const token = req.cookies.get(TOKEN_COOKIE)?.value ?? "";
  if (!verifySessionToken(token)) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true });
}

/** POST — valida senha e cria sessão. */
export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (!verifyPassword(password)) {
    return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
  }

  const token = generateSessionToken();
  const res = NextResponse.json({ ok: true });

  res.cookies.set(TOKEN_COOKIE, token, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge:   60 * 60 * 48,
    path:     "/",
  });

  return res;
}
