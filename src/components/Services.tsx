"use client";

import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { useSiteConfig } from "@/contexts/SiteConfigContext";

export function SectionHeader({
  badge,
  title,
  accent,
  subtitle,
  light = false,
}: {
  badge: string;
  title: string;
  accent?: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <motion.div
      className="text-center mb-16 max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <span className={`section-badge ${light ? "!text-gold" : ""}`}>{badge}</span>
      <h2 className={`section-title mt-5 ${light ? "!text-white" : ""}`}>
        {title}{" "}
        {accent && <span className={`italic ${light ? "text-gold" : "text-gold-dark"}`}>{accent}</span>}
      </h2>
      {subtitle && (
        <p className={`mt-5 text-lg leading-relaxed ${light ? "text-white/70" : "text-navy/60"}`}>{subtitle}</p>
      )}
    </motion.div>
  );
}

export default function Services() {
  const { t } = useLanguage();
  const s = t.services;
  const { services: svcMedia } = useSiteConfig();

  // Junta o texto (translations.ts) com imagem/preço do siteConfig (mesma ordem)
  const items = s.items.map(
    (item: { title: string; description: string; features: readonly string[] }, i: number) => ({
      ...item,
      image: svcMedia[i]?.image ?? "",
      price: svcMedia[i]?.price ?? "",
      imagePosition: svcMedia[i]?.imagePosition,
    })
  );

  return (
    <section id="services" className="py-24 lg:py-32 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={s.badge} title={s.title} accent={s.titleAccent} subtitle={s.subtitle} />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-7">
          {items.map((service, i: number) => (
            <motion.article
              key={service.title}
              className="group flex flex-col bg-white rounded-[1.75rem] overflow-hidden border border-gold-muted/70 card-hover"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
            >
              <div className="relative h-56 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: service.imagePosition || "center" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
                <span className="absolute top-4 left-4 font-serif italic text-white text-lg bg-navy/40 backdrop-blur-sm rounded-full w-11 h-11 flex items-center justify-center border border-white/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {service.price && (
                  <div className="absolute top-4 right-4 bg-white/95 rounded-full px-3 py-1.5 text-xs shadow">
                    <span className="text-navy/55">{s.startingAt} </span>
                    <span className="text-gold-deep font-bold">{service.price}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col flex-1 p-6">
                <h3 className="font-serif text-[1.65rem] leading-tight font-semibold text-navy">{service.title}</h3>
                <p className="mt-2.5 text-navy/60 text-sm leading-relaxed">{service.description}</p>

                <ul className="mt-5 space-y-2.5 mb-6">
                  {service.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm text-navy/75">
                      <span className="mt-0.5 w-4 h-4 rounded-full bg-gold-light border border-gold-muted flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-gold-deep" strokeWidth={3} />
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-navy border-t border-gold-muted/70 pt-4 group/link"
                >
                  {s.getQuote}
                  <ArrowUpRight className="w-4 h-4 text-gold-dark transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
