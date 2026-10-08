import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, TOKEN_COOKIE } from "@/lib/admin-auth";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SVC          = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
const SITE_ID      = process.env.SITE_ID ?? "default";

export async function POST(req: NextRequest) {
  const token = req.cookies.get(TOKEN_COOKIE)?.value ?? "";
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const ext      = file.name.split(".").pop() ?? "jpg";
  const filename = `${SITE_ID}/${Date.now()}.${ext}`;
  const buffer   = Buffer.from(await file.arrayBuffer());

  const res = await fetch(
    `${SUPABASE_URL}/storage/v1/object/site-images/${filename}`,
    {
      method:  "POST",
      headers: {
        Authorization:  `Bearer ${SVC}`,
        "Content-Type": file.type || "image/jpeg",
      },
      body: buffer,
    }
  );

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: err }, { status: 500 });
  }

  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/site-images/${filename}`;
  return NextResponse.json({ url: publicUrl });
}
