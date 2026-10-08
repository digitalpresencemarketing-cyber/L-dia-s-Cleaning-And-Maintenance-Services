"use client";

import { motion } from "framer-motion";
import { Shield, Sparkles, Clock, Heart, MessageCircle, PawPrint } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { SectionHeader } from "./Services";

const iconMap: Record<string, React.ElementType> = {
  shield: Shield,
  sparkle: Sparkles,
  clock: Clock,
  heart: Heart,
  message: MessageCircle,
  paw: PawPrint,
};

export default function WhyChooseUs() {
  const { t } = useLanguage();
  const w = t.whyUs;

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={w.badge} title={w.title} accent={w.titleAccent} subtitle={w.subtitle} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-gold-muted/80 rounded-[2rem] overflow-hidden">
          {w.items.map((item: { icon: string; title: string; description: string }, i: number) => {
            const Icon = iconMap[item.icon] || Sparkles;
            return (
              <motion.div
                key={item.title}
                className="group relative p-9 lg:p-10 border-r border-b border-gold-muted/80 bg-white hover:bg-ivory transition-colors duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-full border border-gold-muted bg-gold-light flex items-center justify-center group-hover:bg-navy group-hover:border-navy transition-colors duration-500">
                    <Icon className="w-6 h-6 text-gold-deep group-hover:text-gold transition-colors duration-500" />
                  </div>
                  <span className="font-serif italic text-3xl text-gold-muted group-hover:text-gold transition-colors duration-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-7 font-serif text-[1.7rem] leading-tight font-semibold text-navy">{item.title}</h3>
                <p className="mt-3 text-navy/60 leading-relaxed text-sm">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
