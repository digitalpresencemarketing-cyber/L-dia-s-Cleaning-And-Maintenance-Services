"use client";

import { motion } from "framer-motion";
import { Star, Quote, BadgeCheck } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { useSiteConfig } from "@/contexts/SiteConfigContext";

type Review = { name: string; location: string; rating: number; date: string; text: string; avatar: string };

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
        </motion.div>

        {/* ── Review cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 min-w-0">
          {reviews.map((review: Review, i: number) => {
            const featured = i < 2; // os dois depoimentos mais completos ocupam a linha inteira
            return (
              <motion.figure
                key={review.name + i}
                className={`relative bg-white rounded-[1.75rem] p-7 lg:p-9 border border-gold-muted/70 card-hover ${featured ? "sm:col-span-2" : ""}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <Quote className="absolute top-7 right-7 w-10 h-10 text-gold-muted" />
                <Stars rating={review.rating} />
                <blockquote
                  className={`mt-5 font-serif text-navy leading-snug ${
                    featured ? "text-2xl lg:text-[1.7rem]" : "text-2xl lg:text-3xl italic"
                  }`}
                >
                  &ldquo;{review.text}&rdquo;
                </blockquote>
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
        </div>
      </div>
    </section>
  );
}
