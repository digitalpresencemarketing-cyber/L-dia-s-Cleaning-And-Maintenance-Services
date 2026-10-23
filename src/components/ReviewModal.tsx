"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, ImagePlus, Trash2, Send, AlertCircle, Lock } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const MAX_SIDE = 1600;

/** Reduz a foto no navegador (máx. 1600px, JPEG) para o envio ser rápido no celular. */
async function compressImage(file: File): Promise<Blob> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = reject;
      el.src = url;
    });
    const scale = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);
    canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
    return await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("encode"))), "image/jpeg", 0.85)
    );
  } finally {
    URL.revokeObjectURL(url);
  }
}

const BURST = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2;
  const dist = 70 + (i % 3) * 22;
  return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, delay: (i % 4) * 0.04, size: 6 + (i % 3) * 3 };
});

export default function ReviewModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLanguage();
  const f = t.reviewForm;
  const services = t.services.items.map((s: { title: string }) => s.title);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState<Blob | null>(null);
  const [preview, setPreview] = useState("");
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Fecha o popup; depois de um envio, deixa o formulário limpo para a próxima vez
  const close = useCallback(() => {
    if (status === "done") {
      setRating(0); setName(""); setLocation(""); setService(""); setText("");
      setPhoto(null); setPreview(""); setStatus("idle"); setError("");
    }
    onClose();
  }, [status, onClose]);

  // Trava o scroll da página e fecha com ESC
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  async function pickFile(file: File | undefined) {
    if (!file) return;
    setError("");
    try {
      const blob = await compressImage(file);
      setPhoto(blob);
      setPreview(URL.createObjectURL(blob));
    } catch {
      setError(f.errPhoto);
    }
  }

  function removePhoto() {
    setPhoto(null);
    setPreview("");
    if (fileRef.current) fileRef.current.value = "";
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!rating) return setError(f.errRating);
    if (name.trim().length < 2) return setError(f.errName);
    if (text.trim().length < 10) return setError(f.errText);

    setError("");
    setStatus("sending");
    const form = new FormData();
    form.append("rating", String(rating));
    form.append("name", name);
    form.append("location", location);
    form.append("service", service);
    form.append("text", text);
    form.append("website", honeypotRef.current?.value ?? "");
    if (photo) form.append("photo", photo, "review.jpg");

    try {
      const res = await fetch("/api/reviews", { method: "POST", body: form });
      if (!res.ok) {
        const { error: msg } = (await res.json().catch(() => ({}))) as { error?: string };
        setError(msg || f.errGeneric);
        setStatus("idle");
        return;
      }
      setStatus("done");
    } catch {
      setError(f.errGeneric);
      setStatus("idle");
    }
  }

  const shown = hover || rating;
  const firstName = name.trim().split(/\s+/)[0];
  const field =
    "w-full bg-white border border-gold-muted rounded-xl px-4 py-3 text-sm text-navy placeholder:text-navy/35 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-colors";
  const label = "text-[11px] font-semibold uppercase tracking-wider text-navy/65 mb-1.5 block";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={() => {
            // Foco automático só no computador — no celular abriria o teclado por cima das estrelas
            if (status === "idle" && window.matchMedia("(pointer: fine)").matches) firstFieldRef.current?.focus({ preventScroll: true });
          }}
        >
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={close} />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-modal-title"
            className="relative w-full sm:max-w-xl max-h-[92vh] overflow-y-auto bg-ivory rounded-t-[2rem] sm:rounded-[2rem] shadow-[0_40px_100px_-30px_rgba(14,31,61,0.7)]"
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-1.5 bg-gradient-to-r from-gold-dark via-gold to-gold-dark" />
            <button
              onClick={close}
              aria-label={f.close}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white border border-gold-muted flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <AnimatePresence mode="wait">
              {status === "done" ? (
                <motion.div
                  key="thanks"
                  className="px-8 py-14 sm:px-12 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="relative mx-auto w-28 h-28 flex items-center justify-center">
                    {BURST.map((p, i) => (
                      <motion.span
                        key={i}
                        className="absolute rounded-full bg-gold"
                        style={{ width: p.size, height: p.size }}
                        initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                        animate={{ x: p.x, y: p.y, opacity: [0, 1, 0], scale: [0, 1, 0.6] }}
                        transition={{ duration: 1.1, delay: 0.25 + p.delay, ease: "easeOut" }}
                      />
                    ))}
                    <motion.div
                      className="w-24 h-24 rounded-full bg-navy flex items-center justify-center shadow-xl"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    >
                      <svg viewBox="0 0 52 52" className="w-12 h-12" fill="none" stroke="#C9A45C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <motion.path
                          d="M14 27 L22 35 L38 18"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5, delay: 0.35 }}
                        />
                      </svg>
                    </motion.div>
                  </div>
                  <h3 id="review-modal-title" className="mt-8 font-serif text-4xl font-semibold text-navy">
                    {f.thanks}{firstName ? <>, <span className="italic text-gold-dark">{firstName}</span></> : null}!
                  </h3>
                  <div className="mt-4 flex justify-center gap-1">
                    {[...Array(rating)].map((_, i) => (
                      <motion.span key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.08 }}>
                        <Star className="w-5 h-5 fill-gold text-gold" />
                      </motion.span>
                    ))}
                  </div>
                  <p className="mt-5 text-navy/65 leading-relaxed max-w-sm mx-auto">{f.thanksText}</p>
                  <button onClick={close} className="btn-dark mt-9">{f.close}</button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  className="px-6 pt-10 pb-8 sm:px-10"
                  noValidate
                  exit={{ opacity: 0, y: -10 }}
                >
                  <span className="section-badge">{t.testimonials.badge}</span>
                  <h3 id="review-modal-title" className="mt-3 font-serif text-4xl font-semibold text-navy leading-tight">
                    {f.title} <span className="italic text-gold-dark">{f.titleAccent}</span>
                  </h3>
                  <p className="mt-2 text-sm text-navy/60">{f.subtitle}</p>

                  {/* Stars */}
                  <div className="mt-7 bg-white border border-gold-muted rounded-2xl px-5 py-5 text-center">
                    <p className={label}>{f.ratingLabel}</p>
                    <div className="flex justify-center gap-1.5" onMouseLeave={() => setHover(0)} role="radiogroup" aria-label={f.ratingLabel}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <motion.button
                          key={n}
                          type="button"
                          role="radio"
                          aria-checked={rating === n}
                          aria-label={`${n} star${n > 1 ? "s" : ""}`}
                          onMouseEnter={() => setHover(n)}
                          onClick={() => { setRating(n); setError(""); }}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          animate={rating === n ? { scale: [1, 1.3, 1], rotate: [0, -8, 0] } : {}}
                          transition={{ duration: 0.35 }}
                          className="p-1"
                        >
                          <Star className={`w-9 h-9 transition-colors duration-200 ${n <= shown ? "fill-gold text-gold" : "text-gold-muted"}`} strokeWidth={1.5} />
                        </motion.button>
                      ))}
                    </div>
                    <p className={`mt-2 font-serif italic text-lg h-7 ${shown ? "text-gold-dark" : "text-navy/40"}`}>{f.ratingWords[shown]}</p>
                  </div>

                  {/* Fields */}
                  <div className="mt-5 grid sm:grid-cols-2 gap-4">
                    <label className="block">
                      <span className={label}>{f.name} <span className="text-gold-dark">*</span></span>
                      <input ref={firstFieldRef} value={name} onChange={(e) => setName(e.target.value)} maxLength={60} placeholder={f.namePlaceholder} autoComplete="name" className={field} />
                    </label>
                    <label className="block">
                      <span className={label}>{f.location}</span>
                      <input value={location} onChange={(e) => setLocation(e.target.value)} maxLength={60} placeholder={f.locationPlaceholder} autoComplete="address-level2" className={field} />
                    </label>
                  </div>
                  <label className="block mt-4">
                    <span className={label}>{f.service}</span>
                    <select value={service} onChange={(e) => setService(e.target.value)} className={field}>
                      <option value="">{f.serviceDefault}</option>
                      {services.map((s: string) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </label>
                  <label className="block mt-4">
                    <span className={label}>{f.text} <span className="text-gold-dark">*</span></span>
                    <textarea value={text} onChange={(e) => setText(e.target.value)} maxLength={1200} rows={4} placeholder={f.textPlaceholder} className={`${field} resize-none`} />
                    <span className="block text-right text-[11px] text-navy/40 mt-1">{text.length}/1200</span>
                  </label>

                  {/* Photo */}
                  <div className="mt-2">
                    <span className={label}>{f.photo} <span className="normal-case tracking-normal font-normal text-navy/45">({f.photoOptional})</span></span>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => pickFile(e.target.files?.[0])} />
                    {preview ? (
                      <div className="relative rounded-2xl overflow-hidden border border-gold-muted bg-white">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={preview} alt="" className="w-full max-h-60 object-cover" />
                        <button type="button" onClick={removePhoto} className="absolute top-3 right-3 inline-flex items-center gap-1.5 bg-white/95 text-navy text-xs font-semibold px-3 py-2 rounded-full shadow hover:bg-navy hover:text-white transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />{f.photoRemove}
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={(e) => { e.preventDefault(); setDragging(false); pickFile(e.dataTransfer.files?.[0]); }}
                        className={`w-full flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed py-7 transition-colors ${
                          dragging ? "border-gold bg-gold-light" : "border-gold-muted bg-white hover:border-gold hover:bg-gold-light/60"
                        }`}
                      >
                        <span className="w-12 h-12 rounded-full bg-gold-light border border-gold-muted flex items-center justify-center">
                          <ImagePlus className="w-5 h-5 text-gold-deep" />
                        </span>
                        <span className="text-sm text-navy/60">{f.photoHint}</span>
                      </button>
                    )}
                  </div>

                  {/* Honeypot (invisível para pessoas) */}
                  <input ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] w-px h-px opacity-0" />

                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-5 flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
                      >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <button type="submit" disabled={status === "sending"} className="btn-primary w-full mt-6 !py-4 text-base disabled:opacity-70 disabled:cursor-not-allowed">
                    {status === "sending" ? (
                      <><span className="w-4 h-4 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />{f.submitting}</>
                    ) : (
                      <><Send className="w-4 h-4" />{f.submit}</>
                    )}
                  </button>
                  <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-navy/45">
                    <Lock className="w-3 h-3" />{f.privacy}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
