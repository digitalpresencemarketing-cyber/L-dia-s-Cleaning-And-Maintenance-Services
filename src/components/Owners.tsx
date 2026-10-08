"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { useSiteConfig } from "@/contexts/SiteConfigContext";

export default function Owners() {
  const { t } = useLanguage();
  const o = t.owners;
  const f = o.founder;
  const { stats: s, team } = useSiteConfig();
  const member = team[0];

  const stats = [
    { value: s.years,        label: o.yearsLabel },
    { value: s.clients,      label: o.clientsLabel },
    { value: s.satisfaction, label: o.guaranteeLabel, star: true },
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-gray-soft scroll-mt-24 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 gold-rule" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.85fr_1.15fr] gap-14 lg:gap-20 items-center">
        {/* ── Portrait / monogram ── */}
        <motion.div
          className="relative mx-auto w-full max-w-[400px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute -inset-3 rounded-t-[999px] rounded-b-[2.5rem] border border-gold/60" />
          <div className="relative aspect-[4/5] rounded-t-[999px] rounded-b-[2rem] overflow-hidden bg-navy flex items-center justify-center">
            {member?.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={member.photo} alt={f.name} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(30,99,214,0.45),transparent_60%)]" />
                <div className="relative text-center">
                  <span className="block font-serif italic text-[11rem] leading-none text-gold">{member?.initials ?? "L"}</span>
                  <span className="block mt-2 text-xs uppercase tracking-[0.35em] text-white/60">{f.role}</span>
                </div>
              </>
            )}
          </div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-full px-6 py-3 shadow-xl border border-gold-muted flex items-center gap-2 whitespace-nowrap">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-gold text-gold" />
            ))}
            <span className="ml-1 text-sm font-semibold text-navy">{s.satisfaction}</span>
          </div>
        </motion.div>

        {/* ── Story ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <span className="section-badge">{o.badge}</span>
          <h2 className="section-title mt-5">
            {o.title} <span className="italic text-gold-dark">{o.titleAccent}</span>
          </h2>

          <p className="mt-7 text-navy/70 leading-relaxed text-lg">{f.bio}</p>
          <p className="mt-4 text-navy/70 leading-relaxed">{f.bio2}</p>

          <blockquote className="mt-8 pl-6 border-l-2 border-gold font-serif italic text-2xl text-navy leading-snug">
            &ldquo;{f.promise}&rdquo;
          </blockquote>

          <div className="mt-6 flex items-center gap-4">
            <span className="font-serif italic text-5xl text-gold-dark">{f.signature}</span>
            <span className="text-sm text-navy/55">{f.name}<br />{f.role}</span>
          </div>

          <div className="mt-10 grid grid-cols-3 divide-x divide-gold-muted border-y border-gold-muted">
            {stats.map((stat) => (
              <div key={stat.label} className="py-5 text-center">
                <div className="font-serif text-4xl font-semibold text-navy flex items-center justify-center gap-1">
                  {stat.value}
                  {stat.star && <Star className="w-5 h-5 fill-gold text-gold" />}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-navy/55">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
