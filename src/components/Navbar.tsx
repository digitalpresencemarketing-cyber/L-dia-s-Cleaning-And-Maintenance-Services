"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { useSiteConfig } from "@/contexts/SiteConfigContext";

/** Logo da cliente; se business.logo estiver vazio, mostra o nome em texto. */
function BrandMark({ size }: { size: "lg" | "sm" | "panel" }) {
  const { business } = useSiteConfig();
  const heights = { lg: "h-[88px]", sm: "h-[60px]", panel: "h-14" };

  if (!business.logo) {
    return (
      <span className="font-serif font-bold text-2xl text-navy leading-none">
        {business.name}
      </span>
    );
  }

  return (
    <Image
      src={business.logo}
      alt={business.logoAlt}
      width={260}
      height={280}
      priority
      className={`w-auto object-contain transition-all duration-500 ${heights[size]}`}
    />
  );
}

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { contact } = useSiteConfig();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navLinks = [
    { label: t.nav.services,     href: "#services" },
    { label: t.nav.plans,        href: "#plans" },
    { label: t.nav.testimonials, href: "#testimonials" },
    { label: t.nav.serviceAreas, href: "#service-areas" },
    { label: t.nav.about,        href: "#about" },
    { label: t.nav.contact,      href: "#contact" },
  ];

  return (
    <>
      {/* ── TOP BAR (desktop) ─────────────────────────────────────────── */}
      <div className="hidden lg:block bg-navy text-white/80 text-xs">
        <div className="max-w-7xl mx-auto px-8 h-9 flex items-center justify-between">
          <span className="tracking-wide">{t.footer.insured} · {contact.hours}</span>
          <div className="flex items-center gap-6">
            <a href={`mailto:${contact.email}`} className="hover:text-gold transition-colors">{contact.email}</a>
            <a href={`tel:${contact.phoneRaw}`} className="flex items-center gap-1.5 text-gold hover:text-white transition-colors font-semibold">
              <Phone className="w-3.5 h-3.5" />
              {contact.phone}
            </a>
          </div>
        </div>
      </div>

      {/* ── NAVBAR ───────────────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-[0_10px_30px_-20px_rgba(14,31,61,0.35)] border-b border-gold-muted/60"
            : "bg-ivory/80 backdrop-blur-md"
        }`}
      >
        <div className={`max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-8 transition-all duration-500 ${scrolled ? "h-[76px]" : "h-[104px]"}`}>
          {/* Logo */}
          <a href="#" className="flex items-center flex-shrink-0" aria-label="Home">
            <span className="hidden sm:block"><BrandMark size={scrolled ? "sm" : "lg"} /></span>
            <span className="sm:hidden"><BrandMark size="sm" /></span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[14px] font-medium tracking-wide text-navy/75 hover:text-navy transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="#contact" className="btn-primary !px-6 !py-3 text-sm">
              {t.nav.getQuote}
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2.5 rounded-full text-navy hover:bg-gold-light transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.header>

      {/* ── MOBILE SLIDE-IN PANEL ──────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-navy/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[84vw] max-w-xs bg-ivory shadow-2xl flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-gold-muted">
                <BrandMark size="panel" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-navy hover:text-gold-dark transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-4 py-4">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between font-serif text-2xl text-navy py-3 px-2 border-b border-gold-muted/50 hover:text-gold-dark transition-colors"
                  >
                    {link.label}
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  </motion.a>
                ))}
              </nav>

              <div className="px-4 pb-6 pt-3 flex flex-col gap-2.5">
                <a href="#contact" onClick={() => setMobileOpen(false)} className="btn-primary w-full">
                  {t.nav.getQuote}
                </a>
                <a href={`tel:${contact.phoneRaw}`} className="btn-outline w-full">
                  <Phone className="w-4 h-4" />
                  {contact.phone}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── MOBILE STICKY BOTTOM BAR ──────────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gold-muted px-4 py-2.5 flex gap-2.5">
        <a
          href={`tel:${contact.phoneRaw}`}
          className="flex-1 flex items-center justify-center gap-1.5 border border-navy/20 text-navy font-semibold py-3 rounded-full text-sm"
        >
          <Phone className="w-4 h-4" />
          {t.nav.call}
        </a>
        <a href="#contact" className="flex-1 btn-primary !py-3 text-sm">
          {t.nav.freeQuote}
        </a>
      </div>
    </>
  );
}
