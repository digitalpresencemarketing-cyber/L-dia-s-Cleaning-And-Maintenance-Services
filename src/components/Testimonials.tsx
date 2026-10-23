"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, BadgeCheck, PenLine, X, Expand } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import ReviewModal from "./ReviewModal";

type Review = { name: string; location: string; rating: number; date: string; text: string; avatar: string; photo?: string };

function Stars({ rating, size = "w-4 h-4" }: { rating: number; size?: string }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`${size} ${i < rating ? "fill-gold text-gold" : "text-gold-muted"}`} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { t } = useLanguage();
  const tm = t.testimonials;
  const { reviews, stats } = useSiteConfig();
  const [writing, setWriting] = useState(false);
  const [lightbox, setLightbox] = useState<Review | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  // Depoimentos curtos ficam lado a lado em pares; longos (ou um curto sem par) ocupam a linha inteira
  const isShort = (r: Review) => r.text.length <= 140;
  const fullWidth: boolean[] = [];
  for (let i = 0; i < reviews.length; ) {
    if (isShort(reviews[i]) && i + 1 < reviews.length && isShort(reviews[i + 1])) {
      fullWidth.push(false, false);
      i += 2;
    } else {
      fullWidth.push(true);
      i += 1;
    }
  }

  const avg = reviews.length
    ? (reviews.reduce((sum: number, r: Review) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : stats.satisfaction;

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-ivory scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)] gap-12 lg:gap-16 items-start">
        {/* ── Rating summary ── */}
        <motion.div
          className="lg:sticky lg:top-32 min-w-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-badge">{tm.badge}</span>
          <h2 className="section-title mt-5">
            {tm.title} <span className="italic text-gold-dark">{tm.titleAccent}</span>
          </h2>
          <p className="mt-5 text-navy/60 leading-relaxed">{tm.subtitle}</p>

          <div className="mt-8 bg-white rounded-[1.75rem] border border-gold-muted p-7 flex items-center gap-6">
            <div className="font-serif text-7xl font-semibold text-navy leading-none">{avg}</div>
            <div>
              <Stars rating={5} size="w-5 h-5" />
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-navy/55">{tm.ratingLabel}</p>
              <p className="text-xs text-navy/45">{tm.basedOn}</p>
            </div>
          </div>

          <button onClick={() => setWriting(true)} className="btn-primary w-full mt-5">
            <PenLine className="w-4 h-4" />
            {tm.writeCta}
          </button>
          <p className="mt-2.5 text-center text-xs text-navy/50">{tm.writeNote}</p>
        </motion.div>

        {/* ── Review cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 min-w-0">
          {reviews.map((review: Review, i: number) => {
            const featured = fullWidth[i];
            return (
              <motion.figure
                key={review.name + i}
                className={`relative bg-white rounded-[1.75rem] p-7 lg:p-9 border border-gold-muted/70 card-hover ${featured ? "sm:col-span-2" : ""}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: Math.min(i, 4) * 0.08 }}
              >
                <Quote className="absolute top-7 right-7 w-10 h-10 text-gold-muted" />
                <Stars rating={review.rating} />
                <blockquote
                  className={`mt-5 font-serif text-navy leading-snug ${
                    !isShort(review) ? "text-2xl lg:text-[1.7rem]" : "text-2xl lg:text-3xl italic"
                  }`}
                >
                  &ldquo;{review.text}&rdquo;
                </blockquote>

                {review.photo && (
                  <button
                    onClick={() => setLightbox(review)}
                    className="group relative mt-6 block w-full overflow-hidden rounded-2xl border border-gold-muted/70"
                    aria-label={tm.viewPhoto}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={review.photo} alt={`Photo shared by ${review.name}`} loading="lazy" className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${featured ? "h-64" : "h-48"}`} />
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-white/90 text-navy text-xs font-semibold px-3 py-1.5 rounded-full shadow opacity-90 group-hover:opacity-100">
                      <Expand className="w-3.5 h-3.5" />{tm.viewPhoto}
                    </span>
                  </button>
                )}

                <figcaption className="mt-7 pt-6 border-t border-gold-muted/70 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center flex-shrink-0 ring-2 ring-gold/50 ring-offset-2">
                    <span className="text-gold font-serif font-semibold text-lg">{review.avatar}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-navy flex items-center gap-1.5">
                      {review.name}
                      <BadgeCheck className="w-4 h-4 text-blue" aria-label={tm.verified} />
                    </p>
                    <p className="text-xs text-navy/50">{review.location}</p>
                    <p className="text-xs text-navy/40">{review.date}</p>
                  </div>
                </figcaption>
              </motion.figure>
            );
          })}

          {/* Convite para avaliar */}
          <motion.button
            onClick={() => setWriting(true)}
            className="group sm:col-span-2 relative overflow-hidden rounded-[1.75rem] border-2 border-dashed border-gold/60 bg-gradient-to-br from-gold-light to-white p-8 lg:p-10 text-left flex flex-col sm:flex-row sm:items-center gap-6 hover:border-gold transition-colors"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="w-16 h-16 rounded-full bg-navy flex items-center justify-center flex-shrink-0 shadow-lg transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
              <Star className="w-7 h-7 fill-gold text-gold" />
            </span>
            <span className="flex-1">
              <span className="block font-serif text-3xl font-semibold text-navy">{tm.shareTitle}</span>
              <span className="block mt-1 text-navy/60">{tm.shareText}</span>
            </span>
            <span className="btn-dark text-sm self-start sm:self-center">
              <PenLine className="w-4 h-4" />{tm.writeCta}
            </span>
          </motion.button>
        </div>
      </div>

      <ReviewModal open={writing} onClose={() => setWriting(false)} />

      {/* Foto ampliada */}
      <AnimatePresence>
        {lightbox?.photo && (
          <motion.div
            className="fixed inset-0 z-[60] bg-navy/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button aria-label="Close" className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-navy transition-colors">
              <X className="w-5 h-5" />
            </button>
            <motion.figure
              className="max-w-4xl w-full"
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={lightbox.photo} alt={`Photo shared by ${lightbox.name}`} className="w-full max-h-[78vh] object-contain rounded-2xl" />
              <figcaption className="mt-4 text-center text-white/80 font-serif italic text-lg">
                {lightbox.name} · {lightbox.location}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
