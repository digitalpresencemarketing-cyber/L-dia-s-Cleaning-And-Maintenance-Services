"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { SectionHeader } from "./Services";

/** Fotos reais dos trabalhos da cliente. Não renderiza nada se a galeria estiver vazia. */
export default function Gallery() {
  const { t } = useLanguage();
  const g = t.gallery;
  const { gallery } = useSiteConfig();

  if (!gallery || gallery.length === 0) return null;

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={g.badge} title={g.title} accent={g.titleAccent} subtitle={g.subtitle} />

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [&>*]:mb-5">
          {gallery.map((photo, i) => (
            <motion.figure
              key={photo.image + i}
              className="relative break-inside-avoid overflow-hidden rounded-[1.5rem] group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.image}
                alt={photo.caption || "Recent cleaning by Lidia's Cleaner Service"}
                loading="lazy"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              {photo.caption && (
                <figcaption className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-navy/80 to-transparent text-white font-serif italic text-lg">
                  {photo.caption}
                </figcaption>
              )}
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
