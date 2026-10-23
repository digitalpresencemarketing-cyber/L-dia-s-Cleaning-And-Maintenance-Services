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
  const { reviews, stats, social } = useSiteConfig();
  const googleUrl = social.googleReviews?.trim();

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

          {googleUrl && (
            <div className="mt-5">
              <a
                href={googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full items-center justify-center gap-3 bg-white border border-gold-muted hover:border-navy rounded-full px-6 py-3.5 text-sm font-semibold text-navy shadow-sm hover:shadow-md transition-all duration-300"
              >
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" aria-hidden>
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                {tm.googleCta}
                <Star className="w-4 h-4 fill-gold text-gold transition-transform group-hover:scale-110" />
              </a>
              <p className="mt-2.5 text-center text-xs text-navy/50">{tm.googleNote}</p>
            </div>
          )}
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
