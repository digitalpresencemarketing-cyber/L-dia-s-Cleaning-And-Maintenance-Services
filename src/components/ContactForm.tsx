"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle, Send } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { SectionHeader } from "./Services";

type FormData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  frequency: string;
  town: string;
  message: string;
};

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

const fieldBase =
  "w-full bg-white border rounded-xl px-4 py-3.5 text-sm text-navy placeholder:text-navy/35 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-colors";

export default function ContactForm() {
  const { t } = useLanguage();
  const { contact } = useSiteConfig();
  const c = t.contact;
  const f = c.form;

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          from_phone: data.phone,
          service_type: data.service,
          frequency: data.frequency,
          town: data.town,
          message: `Frequency: ${data.frequency || "-"}\nTown: ${data.town || "-"}\n\n${data.message}`,
          to_email: contact.email,
        },
        PUBLIC_KEY
      );
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const serviceOptions = t.services.items.map((s: { title: string }) => s.title);
  const border = (hasError: boolean) => (hasError ? "border-red-400" : "border-gold-muted");

  const infoItems = [
    { icon: Phone,  label: contact.phone,   href: `tel:${contact.phoneRaw}` },
    { icon: Mail,   label: contact.email,   href: `mailto:${contact.email}` },
    { icon: MapPin, label: contact.address, href: "#service-areas" },
  ];

  return (
    <section id="contact" className="py-24 lg:py-32 bg-ivory scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={c.badge} title={c.title} accent={c.titleAccent} subtitle={c.subtitle} />

        <div className="grid lg:grid-cols-[1fr_380px] gap-8 lg:gap-10 items-start">
          {/* ── Form ── */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-[2rem] border border-gold-muted/70 shadow-[0_30px_60px_-40px_rgba(14,31,61,0.4)] p-7 sm:p-10 space-y-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            noValidate
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-navy/70 mb-2 block">
                  {f.name} <span className="text-gold-dark">*</span>
                </span>
                <input {...register("name", { required: true })} placeholder={f.namePlaceholder} autoComplete="name" className={`${fieldBase} ${border(!!errors.name)}`} />
              </label>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-navy/70 mb-2 block">
                  {f.email} <span className="text-gold-dark">*</span>
                </span>
                <input
                  {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                  placeholder={f.emailPlaceholder}
                  type="email"
                  autoComplete="email"
                  className={`${fieldBase} ${border(!!errors.email)}`}
                />
              </label>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-navy/70 mb-2 block">
                  {f.phone} <span className="text-gold-dark">*</span>
                </span>
                <input {...register("phone", { required: true })} placeholder={f.phonePlaceholder} type="tel" autoComplete="tel" className={`${fieldBase} ${border(!!errors.phone)}`} />
              </label>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-navy/70 mb-2 block">{f.town}</span>
                <input {...register("town")} placeholder={f.townPlaceholder} autoComplete="address-level2" className={`${fieldBase} border-gold-muted`} />
              </label>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-navy/70 mb-2 block">
                  {f.service} <span className="text-gold-dark">*</span>
                </span>
                <select {...register("service", { required: true })} className={`${fieldBase} ${border(!!errors.service)}`}>
                  <option value="">{f.serviceDefault}</option>
                  {serviceOptions.map((s: string) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-navy/70 mb-2 block">{f.frequency}</span>
                <select {...register("frequency")} className={`${fieldBase} border-gold-muted`}>
                  <option value="">{f.frequencyDefault}</option>
                  {f.frequencies.map((fr: string) => (
                    <option key={fr} value={fr}>{fr}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-navy/70 mb-2 block">{f.message}</span>
              <textarea {...register("message")} placeholder={f.messagePlaceholder} rows={4} className={`${fieldBase} border-gold-muted resize-none`} />
            </label>

            <button type="submit" disabled={status === "sending"} className="btn-primary w-full !py-4 text-base disabled:opacity-70 disabled:cursor-not-allowed">
              {status === "sending" ? (
                <>
                  <span className="w-4 h-4 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                  {f.submitting}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {f.submit}
                </>
              )}
            </button>

            {status === "success" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                {f.success}
              </motion.div>
            )}
            {status === "error" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {f.error}
              </motion.div>
            )}
          </motion.form>

          {/* ── Sidebar ── */}
          <motion.aside
            className="flex flex-col gap-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="bg-navy rounded-[2rem] p-7 text-white relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-blue/30 blur-2xl" />
              <h3 className="relative font-serif text-3xl font-semibold mb-6">{c.infoTitle}</h3>
              <div className="relative space-y-4">
                {infoItems.map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href} className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group">
                    <span className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center flex-shrink-0 group-hover:bg-gold group-hover:text-navy transition-colors">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="text-sm break-all">{label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gold-muted/70 rounded-[2rem] p-7">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-gold-dark" />
                <h3 className="font-serif text-2xl font-semibold text-navy">{c.info.hoursTitle}</h3>
              </div>
              <p className="text-navy/70 text-sm">{contact.hours}</p>
              <p className="text-navy/70 text-sm mt-1">{contact.hours2}</p>
            </div>

            <a href={`tel:${contact.phoneRaw}`} className="flex items-center gap-4 bg-gold text-navy rounded-[2rem] px-7 py-5 hover:bg-navy hover:text-white transition-colors duration-300 group">
              <span className="w-12 h-12 rounded-full bg-white/40 flex items-center justify-center group-hover:bg-white/10">
                <Phone className="w-5 h-5" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider opacity-80">{c.callUs}</span>
                <span className="block font-serif text-2xl font-semibold">{contact.phone}</span>
              </span>
            </a>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
