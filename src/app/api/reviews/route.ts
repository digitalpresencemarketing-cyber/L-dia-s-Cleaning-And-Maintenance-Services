import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { uploadPublicImage } from "@/lib/supabase";
import { MAX_PENDING, readPending, writePending, type PendingReview } from "@/lib/reviews";

const SITE_ID = (process.env.SITE_ID ?? "default").trim();
const MAX_PHOTO_BYTES = 4 * 1024 * 1024;

// Limite simples por IP (por instância) para evitar abuso.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

function clean(v: FormDataEntryValue | null, max: number) {
  return typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "";
}

/** Confere a assinatura do arquivo — aceita só JPEG, PNG e WebP de verdade. */
function imageType(buf: Buffer): string | null {
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "image/jpeg";
  if (buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "image/png";
  if (buf.subarray(0, 4).toString() === "RIFF" && buf.subarray(8, 12).toString() === "WEBP") return "image/webp";
  return null;
}

/** POST — cliente envia uma avaliação (multipart, foto opcional). Fica pendente até aprovação. */
export async function POST(req: NextRequest) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: campo invisível que só robôs preenchem — finge sucesso.
  if (clean(form.get("website"), 200)) return NextResponse.json({ ok: true });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many reviews sent. Please try again later." }, { status: 429 });
  }

  const name     = clean(form.get("name"), 60);
  const location = clean(form.get("location"), 60);
  const service  = clean(form.get("service"), 60);
  const text     = clean(form.get("text"), 1200);
  const rating   = Math.round(Number(form.get("rating")));

  if (name.length < 2)            return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (text.length < 10)           return NextResponse.json({ error: "Please write a few words about your experience." }, { status: 400 });
  if (!(rating >= 1 && rating <= 5)) return NextResponse.json({ error: "Please choose a star rating." }, { status: 400 });

  const pending = await readPending();
  if (pending.length >= MAX_PENDING) {
    return NextResponse.json({ error: "We can't accept new reviews right now. Please try again later." }, { status: 503 });
  }

  let photo = "";
  const file = form.get("photo");
  if (file && typeof file !== "string" && file.size > 0) {
    if (file.size > MAX_PHOTO_BYTES) {
      return NextResponse.json({ error: "Photo is too large (max 4 MB)." }, { status: 400 });
    }
    const buf = Buffer.from(await file.arrayBuffer());
    const type = imageType(buf);
    if (!type) return NextResponse.json({ error: "Please upload a JPG, PNG or WebP photo." }, { status: 400 });
    const ext = type.split("/")[1].replace("jpeg", "jpg");
    const url = await uploadPublicImage(`${SITE_ID}/reviews/${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`, buf, type);
    if (!url) return NextResponse.json({ error: "We couldn't upload your photo. Please try again." }, { status: 500 });
    photo = url;
  }

  const review: PendingReview = {
    id: randomUUID(),
    name, location, service, rating, text, photo,
    createdAt: new Date().toISOString(),
  };

  const ok = await writePending([review, ...pending]);
  if (!ok) return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });

  return NextResponse.json({ ok: true });
}
