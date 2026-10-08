"use client";

import { motion, type Variants } from "framer-motion";
import { Star, Phone, Sparkles, ShieldCheck, Clock, PawPrint, Gem } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { useSiteConfig } from "@/contexts/SiteConfigContext";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const { t } = useLanguage();
  const h = t.hero;
  const { stats: s, contact, hero } = useSiteConfig();

  const trustItems = [
    { icon: Gem,         label: h.trust1 },
    { icon: ShieldCheck, label: h.trust2 },
    { icon: PawPrint,    label: h.trust3 },
    { icon: Clock,       label: h.trust4 },
  ];

  const stats = [
    { value: s.clients,      label: h.stat1Label },
    { value: s.years,        label: h.stat2Label },
    { value: s.satisfaction, label: h.stat3Label, star: true },
  ];

  return (
    <section className="relative overflow-hidden bg-ivory">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[38rem] h-[38rem] rounded-full bg-blue-light blur-3xl opacity-80" />
        <div className="absolute bottom-0 -left-32 w-[28rem] h-[28rem] rounded-full bg-gold-light blur-3xl" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.035]" aria-hidden>
          <defs>
            <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#0E1F3D" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-16 lg:pb-28 grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-10 items-center">
        {/* ── Text ── */}
        <div>
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
            <span className="inline-flex items-center gap-2.5 bg-white border border-gold-muted text-navy text-xs font-semibold tracking-[0.18em] uppercase px-4 py-2 rounded-full shadow-sm">
              <span className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                ))}
              </span>
              {h.badge}
            </span>
          </motion.div>

          <motion.h1
            className="mt-7 text-[3.1rem] leading-[1.02] sm:text-7xl lg:text-[5.25rem] text-navy"
            custom={0.12}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            {h.headline1}
            <br />
            <span className="italic text-gold-dark">{h.headline2}</span>
          </motion.h1>

          <motion.div
            className="mt-7 w-20 h-px bg-gold"
            custom={0.22}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          />

          <motion.p
            className="mt-7 text-lg text-navy/70 leading-relaxed max-w-xl"
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            {h.subheadline}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap gap-3.5"
            custom={0.42}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <a href="#contact" className="btn-primary text-base">
              <Sparkles className="w-4 h-4" />
              {h.cta1}
            </a>
            <a href={`tel:${contact.phoneRaw}`} className="btn-outline text-base">
              <Phone className="w-4 h-4" />
              {h.cta2} {contact.phone}
            </a>
          </motion.div>

          <motion.ul
            className="mt-10 grid grid-cols-2 sm:flex sm:flex-wrap gap-x-6 gap-y-3"
            custom={0.54}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            {trustItems.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm text-navy/75">
                <Icon className="w-4 h-4 text-gold-dark" />
                {label}
              </li>
            ))}
          </motion.ul>

          <motion.div
            className="mt-12 grid grid-cols-3 max-w-md divide-x divide-gold-muted border-y border-gold-muted"
            custom={0.66}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="py-5 text-center">
                <div className="font-serif text-4xl font-semibold text-navy flex items-center justify-center gap-1">
                  {stat.value}
                  {stat.star && <Star className="w-5 h-5 fill-gold text-gold" />}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-navy/55">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Image ── */}
        <motion.div
          className="relative mx-auto w-full max-w-[520px]"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Gold arch outline */}
          <div className="absolute -inset-3 sm:-inset-4 rounded-t-[999px] rounded-b-[2.5rem] border border-gold/60" />

          <div className="relative aspect-[4/5] rounded-t-[999px] rounded-b-[2rem] overflow-hidden shadow-[0_40px_80px_-30px_rgba(14,31,61,0.45)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hero.backgroundImage}
              alt="A beautifully cleaned, bright living room"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: hero.imagePosition || "center" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/35 via-transparent to-transparent" />
          </div>

          {/* Floating review card */}
          <motion.div
            className="absolute -left-4 sm:-left-12 bottom-10 bg-white rounded-2xl p-5 shadow-[0_25px_50px_-20px_rgba(14,31,61,0.45)] max-w-[250px] border border-gold-muted/70"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <div className="flex gap-0.5 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
              ))}
            </div>
            <p className="font-serif italic text-lg leading-snug text-navy">&ldquo;{h.floatingQuote}&rdquo;</p>
            <p className="mt-2 text-xs text-navy/55">— {h.floatingAuthor}</p>
          </motion.div>

          {/* Floating plan tag */}
          <motion.div
            className="absolute -right-2 sm:-right-6 top-16 bg-navy text-white rounded-full px-4 py-2.5 text-xs font-semibold tracking-wide shadow-xl flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            {h.floatingTag}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
