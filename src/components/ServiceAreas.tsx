"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, CalendarDays, Clock, Sparkles } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { SectionHeader } from "./Services";

export default function ServiceAreas() {
  const { t } = useLanguage();
  const sa = t.serviceAreas;
  const { serviceAreas: cities } = useSiteConfig();
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (cities.length === 0) return null;
  const selected = cities[Math.min(selectedIndex, cities.length - 1)];

  return (
    <section id="service-areas" className="py-24 lg:py-32 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={sa.badge} title={sa.title} accent={sa.titleAccent} subtitle={sa.subtitle} />

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6 lg:gap-8">
          {/* ── Photo ── */}
          <div className="relative rounded-[2rem] overflow-hidden h-[380px] lg:h-auto lg:min-h-[520px] shadow-[0_40px_80px_-40px_rgba(14,31,61,0.5)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.name}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selected.image} alt={`Home in ${selected.name}, ${selected.state}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-0 left-0 right-0 p-7 lg:p-9 text-white">
              <motion.div
                key={`label-${selected.name}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold">
                  <MapPin className="w-3.5 h-3.5" />
                  {selected.state}
                </p>
                <h3 className="mt-2 font-serif text-5xl lg:text-6xl font-semibold">{selected.name}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(selected.neighborhoods as readonly string[]).map((n: string) => (
                    <span key={n} className="text-xs px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/25">
                      {n}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── Town selector ── */}
          <div className="bg-ivory rounded-[2rem] border border-gold-muted p-7 lg:p-9 flex flex-col">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-gold-deep">{sa.selectArea}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {cities.map((city, i) => {
                const active = city.name === selected.name;
                return (
                  <button
                    key={city.name}
                    onClick={() => setSelectedIndex(i)}
                    aria-pressed={active}
                    className={`px-3.5 py-2 rounded-full text-sm border transition-all duration-300 ${
                      active
                        ? "bg-navy text-white border-navy shadow-md"
                        : "bg-white text-navy/80 border-gold-muted hover:border-gold hover:text-navy"
                    }`}
                  >
                    {city.name}
                  </button>
                );
              })}
            </div>
            <p className="mt-4 font-serif italic text-navy/55">{sa.surrounding}</p>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl p-4 border border-gold-muted/70 flex items-center gap-3">
                <CalendarDays className="w-5 h-5 text-gold-dark flex-shrink-0" />
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-navy/50">{sa.travelTime}</p>
                  <p className="font-semibold text-navy text-sm">{sa.travelTimeValue}</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-gold-muted/70 flex items-center gap-3">
                <Clock className="w-5 h-5 text-gold-dark flex-shrink-0" />
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-navy/50">{sa.scheduleLabel}</p>
                  <p className="font-semibold text-navy text-sm">{sa.scheduleValue}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-3 text-sm text-navy/60 leading-relaxed">
              <Sparkles className="w-4 h-4 text-gold-dark mt-0.5 flex-shrink-0" />
              <p><span className="font-semibold text-navy">{sa.serviceGuarantee}.</span> {sa.guaranteeText}</p>
            </div>

            <a href="#contact" className="btn-dark mt-7 w-full text-sm">
              <MapPin className="w-4 h-4" />
              {sa.checkAvailability}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
