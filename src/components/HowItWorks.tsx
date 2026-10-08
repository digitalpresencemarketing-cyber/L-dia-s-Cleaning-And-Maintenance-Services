"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { SectionHeader } from "./Services";

export default function HowItWorks() {
  const { t } = useLanguage();
  const h = t.howItWorks;

  return (
    <section className="py-24 lg:py-32 bg-navy relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[34rem] h-[34rem] rounded-full bg-blue/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[28rem] h-[28rem] rounded-full bg-gold/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={h.badge} title={h.title} accent={h.titleAccent} subtitle={h.subtitle} light />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
          <div className="hidden md:block absolute top-[3.25rem] left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-gold/0 via-gold/60 to-gold/0" />

          {h.steps.map((step: { number: string; title: string; description: string }, i: number) => (
            <motion.div
              key={step.number}
              className="relative flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.18 }}
            >
              <div className="relative w-[6.5rem] h-[6.5rem] rounded-full border border-gold/60 bg-navy flex items-center justify-center">
                <div className="absolute inset-2 rounded-full border border-white/10" />
                <span className="font-serif italic text-5xl text-gold">{step.number}</span>
              </div>
              <h3 className="mt-7 font-serif text-3xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-white/65 text-sm leading-relaxed max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a href="#contact" className="btn-primary hover:!bg-white hover:!text-navy text-base">
            {t.nav.getQuote}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
