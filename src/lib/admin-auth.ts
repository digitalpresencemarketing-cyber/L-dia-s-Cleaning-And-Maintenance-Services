import { createHmac } from "crypto";

const PASSWORD   = (process.env.ADMIN_PASSWORD ?? "").trim();
export const TOKEN_COOKIE = "mw_admin_token";

function makeToken(dayOffset = 0): string {
  const day = Math.floor(Date.now() / 86_400_000) + dayOffset;
  return createHmac("sha256", PASSWORD || "fallback-change-me")
    .update(`mw-cleaning-admin-${day}`)
    .digest("hex");
}

export function verifyPassword(input: string): boolean {
  return PASSWORD.length > 0 && input === PASSWORD;
}

export function generateSessionToken(): string {
  return makeToken(0);
}

/** Aceita token do dia atual ou do dia anterior (sessão ~48 h). */
export function verifySessionToken(token: string): boolean {
  return token === makeToken(0) || token === makeToken(-1);
}
