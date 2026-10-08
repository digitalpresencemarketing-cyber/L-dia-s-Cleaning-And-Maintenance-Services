"use client";

import { motion } from "framer-motion";
import { Check, CalendarHeart, CalendarClock, CalendarCheck2 } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { SectionHeader } from "./Services";

const planIcons = [CalendarHeart, CalendarCheck2, CalendarClock];
const POPULAR_INDEX = 1; // Bi-Weekly

export default function RecurringPlans() {
  const { t } = useLanguage();
  const p = t.plans;

  return (
    <section id="plans" className="py-24 lg:py-32 bg-gray-soft scroll-mt-24 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 gold-rule" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={p.badge} title={p.title} accent={p.titleAccent} subtitle={p.subtitle} />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {p.items.map((plan, i) => {
            const Icon = planIcons[i] ?? CalendarCheck2;
            const popular = i === POPULAR_INDEX;
            return (
              <motion.div
                key={plan.name}
                className={`relative flex flex-col rounded-[2rem] p-8 lg:p-10 transition-all duration-500 ${
                  popular
                    ? "bg-navy text-white shadow-[0_40px_80px_-30px_rgba(14,31,61,0.6)] md:-translate-y-4"
                    : "bg-white text-navy border border-gold-muted card-hover"
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                {popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold text-navy text-[11px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow">
                    {p.popular}
                  </span>
                )}

                <div className={`w-14 h-14 rounded-full flex items-center justify-center border ${popular ? "border-gold/50 bg-white/5" : "border-gold-muted bg-gold-light"}`}>
                  <Icon className={`w-6 h-6 ${popular ? "text-gold" : "text-gold-deep"}`} />
                </div>

                <h3 className="mt-6 font-serif text-4xl font-semibold">{plan.name}</h3>
                <p className={`mt-1 font-serif italic text-lg ${popular ? "text-gold" : "text-gold-dark"}`}>{plan.tagline}</p>
                <p className={`mt-4 text-sm leading-relaxed ${popular ? "text-white/70" : "text-navy/60"}`}>{plan.description}</p>

                <div className={`my-6 h-px ${popular ? "bg-white/15" : "bg-gold-muted"}`} />

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-start gap-3 text-sm ${popular ? "text-white/85" : "text-navy/75"}`}>
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${popular ? "text-gold" : "text-gold-dark"}`} strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`mt-auto ${popular ? "btn-primary hover:!bg-white hover:!text-navy" : "btn-dark"} w-full text-sm`}
                >
                  {p.cta}
                </a>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-12 text-center text-navy/60 font-serif italic text-lg">{p.note}</p>
      </div>
    </section>
  );
}
