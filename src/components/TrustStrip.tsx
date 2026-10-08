"use client";

import { Sparkles } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

/** Faixa elegante em movimento com os diferenciais da marca. */
export default function TrustStrip() {
  const { t } = useLanguage();
  const items = [...t.strip, ...t.strip];

  return (
    <div className="bg-navy py-5 overflow-hidden border-y border-gold/30">
      <div className="flex w-max animate-[marquee_40s_linear_infinite] motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
            {items.map((item, i) => (
              <span key={`${copy}-${i}`} className="flex items-center gap-8 px-8 font-serif italic text-xl text-white/85 whitespace-nowrap">
                {item}
                <Sparkles className="w-4 h-4 text-gold not-italic" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
