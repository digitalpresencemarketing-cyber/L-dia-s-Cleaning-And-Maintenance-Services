"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { SiteConfig } from "@/lib/site.config";
import { siteConfig } from "@/lib/site.config";
import { deepMerge } from "@/lib/get-site-config";
import {
  Phone,
  Image as ImageIcon, Sparkles, Users, Star, BarChart3,
  Search, LogOut, Save, CheckCircle, AlertCircle,
  Plus, Trash2, ChevronDown, ChevronUp, Eye, Lock, Link, Upload,
} from "lucide-react";

// ─── helpers ─────────────────────────────────────────────────────────────────

function Input({ label, value, onChange, type = "text", placeholder = "" }: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string;
}) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
      />
    </div>
  );
}

function Textarea({ label, value, onChange, rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number;
}) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition resize-none"
      />
    </div>
  );
}

function SaveButton({ onClick, saving, saved }: { onClick: () => void; saving: boolean; saved: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm px-6 py-3 rounded-xl transition"
    >
      {saving ? (
        <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Salvando…</>
      ) : saved ? (
        <><CheckCircle className="w-4 h-4" />Salvo!</>
      ) : (
        <><Save className="w-4 h-4" />Salvar alterações</>
      )}
    </button>
  );
}

function ImagePreview({ url }: { url: string }) {
  if (!url) return null;
  return (
    <div className="mt-2 rounded-xl overflow-hidden h-24 bg-slate-100">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt="preview" className="w-full h-full object-cover" />
    </div>
  );
}

function ImageUpload({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadErr, setUploadErr] = useState("");

  async function handleFile(file: File) {
    setUploading(true);
    setUploadErr("");
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    setUploading(false);
    if (!res.ok) { setUploadErr("Erro no upload. Tente novamente."); return; }
    const { url } = await res.json() as { url: string };
    onChange(url);
  }

  return (
    <div className="mb-4">
      {/* Preview */}
      {value && (
        <div className="mb-3 rounded-2xl overflow-hidden h-40 bg-slate-100 relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="preview" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Upload button */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
      />
      <button
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 hover:border-blue-400 hover:text-blue-600 text-slate-500 rounded-2xl py-4 text-sm font-medium transition disabled:opacity-50"
      >
        <Upload className="w-4 h-4" />
        {uploading ? "Enviando foto…" : "Clique para enviar uma foto do seu celular ou computador"}
      </button>
      {uploadErr && <p className="text-red-500 text-xs mt-2">{uploadErr}</p>}

      {/* Free photo sites */}
      <div className="mt-3">
        <p className="text-xs text-slate-400 mb-2 text-center">ou busque fotos grátis em:</p>
        <div className="flex gap-2 justify-center">
          {[
            { label: "Unsplash", url: "https://unsplash.com/s/photos/house-cleaning" },
            { label: "Pexels",   url: "https://www.pexels.com/search/house%20cleaning/" },
            { label: "Pixabay",  url: "https://pixabay.com/images/search/cleaning/" },
          ].map(({ label, url }) => (
            <a key={label} href={url} target="_blank" rel="noopener noreferrer"
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition">
              {label} ↗
            </a>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-2 text-center">Escolha uma foto, copie o link e cole abaixo</p>
        <Input label="Ou cole o link de uma foto aqui" value={value}
          onChange={onChange} placeholder="https://images.unsplash.com/..." />
      </div>
    </div>
  );
}

// ─── position picker ──────────────────────────────────────────────────────────

const POSITIONS = [
  ["top left",    "top center",    "top right"],
  ["center left", "center",        "center right"],
  ["bottom left", "bottom center", "bottom right"],
];

function PositionPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const current = value || "center";
  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
        Posição da foto no quadro
      </label>
      <div className="inline-grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl">
        {POSITIONS.flat().map((pos) => (
          <button
            key={pos}
            onClick={() => onChange(pos)}
            title={pos}
            className={`w-9 h-9 rounded-lg transition-all ${
              current === pos
                ? "bg-blue-600 shadow-md"
                : "bg-white hover:bg-blue-50"
            }`}
          >
            <span className={`block w-1.5 h-1.5 rounded-full mx-auto ${current === pos ? "bg-white" : "bg-slate-400"}`}
              style={{
                marginTop:  pos.includes("top")    ? "4px"  : pos.includes("bottom") ? "auto"  : "auto",
                marginBottom: pos.includes("bottom") ? "4px" : "auto",
                alignSelf: pos.includes("top") ? "flex-start" : pos.includes("bottom") ? "flex-end" : "center",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── sidebar sections ─────────────────────────────────────────────────────────

const SECTIONS = [
  { id: "contact",  label: "Contato",        icon: Phone },
  { id: "hero",     label: "Hero / Capa",    icon: ImageIcon },
  { id: "services", label: "Serviços",       icon: Sparkles },
  { id: "team",     label: "Equipe",         icon: Users },
  { id: "reviews",  label: "Depoimentos",    icon: Star },
  { id: "stats",    label: "Estatísticas",   icon: BarChart3 },
  { id: "seo",      label: "SEO",            icon: Search },
] as const;

type SectionId = typeof SECTIONS[number]["id"];

// ─── main component ───────────────────────────────────────────────────────────

export default function AdminPage() {
  const [auth,    setAuth]    = useState<"checking" | "login" | "ok">("checking");
  const [pw,      setPw]      = useState("");
  const [loginErr,setLoginErr]= useState("");
  const [config,  setConfig]  = useState<SiteConfig | null>(null);
  const [active,  setActive]  = useState<SectionId>("contact");
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);
  const [err,     setErr]     = useState("");

  // ── check auth ──────────────────────────────────────────────────────────────
  useEffect(() => {
    fetch("/api/admin/login")
      .then(async (r) => {
        if (!r.ok) { setAuth("login"); return; }
        const raw = await (await fetch("/api/site-content")).json() as Partial<SiteConfig>;
        setConfig(deepMerge(siteConfig as unknown as SiteConfig, raw));
        setAuth("ok");
      })
      .catch(() => setAuth("login"));
  }, []);

  // ── login ───────────────────────────────────────────────────────────────────
  const handleLogin = async () => {
    setLoginErr("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    if (!res.ok) { setLoginErr("Senha incorreta. Tente novamente."); return; }
    // Load config — always deep-merge with static defaults to guard against partial DB data
    const raw = await (await fetch("/api/site-content")).json() as Partial<SiteConfig>;
    setConfig(deepMerge(siteConfig as unknown as SiteConfig, raw));
    setAuth("ok");
  };

  // ── logout ──────────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuth("login");
    setConfig(null);
    setPw("");
  };

  // ── save ────────────────────────────────────────────────────────────────────
  const handleSave = useCallback(async () => {
    if (!config) return;
    setSaving(true);
    setErr("");
    const res = await fetch("/api/site-content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    setSaving(false);
    if (!res.ok) { setErr("Erro ao salvar. Tente novamente."); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }, [config]);

  // ── update helper ───────────────────────────────────────────────────────────
  function update<K extends keyof SiteConfig>(section: K, value: SiteConfig[K]) {
    setConfig((prev) => prev ? { ...prev, [section]: value } : prev);
  }

  // ─── LOADING ───────────────────────────────────────────────────────────────
  if (auth === "checking") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  // ─── LOGIN ─────────────────────────────────────────────────────────────────
  if (auth === "login") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-blue-600" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-800">Painel Admin</h1>
            <p className="text-slate-500 text-sm mt-1">MW Cleaning Services</p>
          </div>
          <div className="mb-4">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Senha
            </label>
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="••••••••"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          {loginErr && (
            <p className="text-red-500 text-sm mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />{loginErr}
            </p>
          )}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  if (!config) return null;

  // ─── DASHBOARD ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="font-extrabold text-slate-800 text-lg">Painel Admin</h1>
          <p className="text-slate-400 text-xs">MW Cleaning Services</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition px-3 py-2 rounded-lg hover:bg-blue-50">
            <Eye className="w-3.5 h-3.5" />Ver site
          </a>
          <button onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-600 transition px-3 py-2 rounded-lg hover:bg-red-50">
            <LogOut className="w-3.5 h-3.5" />Sair
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — desktop only */}
        <aside className="w-52 bg-white border-r border-slate-200 flex-col py-4 shrink-0 hidden md:flex">
          {SECTIONS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActive(id)}
              className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-xl text-sm font-medium transition-all ${
                active === id
                  ? "bg-blue-50 text-blue-700 font-semibold"
                  : "text-slate-600 hover:bg-slate-50"
              }`}>
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </button>
          ))}
        </aside>

        {/* Content column (mobile picker + main) */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile section picker */}
          <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3">
            <div className="flex gap-2 overflow-x-auto">
              {SECTIONS.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => setActive(id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition ${
                    active === id ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"
                  }`}>
                  <Icon className="w-3.5 h-3.5" />{label}
                </button>
              ))}
            </div>
          </div>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 w-full max-w-2xl mx-auto">
          {err && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />{err}
            </div>
          )}

          {/* ── CONTACT ─────────────────────────────────────────────────── */}
          {active === "contact" && (
            <Section title="Contato & Redes Sociais">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                <Input label="Telefone exibido" value={config.contact.phone}
                  onChange={(v) => update("contact", { ...config.contact, phone: v })} placeholder="(856) 577-2940" />
                <Input label="Telefone (só números)" value={config.contact.phoneRaw}
                  onChange={(v) => update("contact", { ...config.contact, phoneRaw: v })} placeholder="8565772940" />
                <Input label="WhatsApp (com código do país)" value={config.contact.whatsapp}
                  onChange={(v) => update("contact", { ...config.contact, whatsapp: v })} placeholder="18565772940" />
                <Input label="E-mail" type="email" value={config.contact.email}
                  onChange={(v) => update("contact", { ...config.contact, email: v })} />
              </div>
              <Input label="Endereço" value={config.contact.address}
                onChange={(v) => update("contact", { ...config.contact, address: v })} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                <Input label="Horário (linha 1)" value={config.contact.hours}
                  onChange={(v) => update("contact", { ...config.contact, hours: v })} placeholder="Mon–Sat: 8:00 AM – 6:00 PM" />
                <Input label="Horário (linha 2)" value={config.contact.hours2}
                  onChange={(v) => update("contact", { ...config.contact, hours2: v })} placeholder="Sunday: By appointment" />
              </div>
              <hr className="my-4 border-slate-100" />
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Link className="w-3.5 h-3.5" />Redes Sociais
              </p>
              <Input label="Instagram (URL completo)" value={config.social.instagram}
                onChange={(v) => update("social", { ...config.social, instagram: v })} placeholder="https://www.instagram.com/..." />
              <Input label="Facebook (URL completo)" value={config.social.facebook}
                onChange={(v) => update("social", { ...config.social, facebook: v })} placeholder="https://www.facebook.com/..." />
              <SaveButton onClick={handleSave} saving={saving} saved={saved} />
            </Section>
          )}

          {/* ── HERO ──────────────────────────────────────────────────────── */}
          {active === "hero" && (
            <Section title="Foto de Capa">
              <p className="text-sm text-slate-500 mb-4">
                É a foto grande que aparece na tela inicial do site.
              </p>
              <ImageUpload
                value={config.hero.backgroundImage}
                onChange={(v) => update("hero", { ...config.hero, backgroundImage: v })}
              />
              <PositionPicker
                value={config.hero.imagePosition ?? "center"}
                onChange={(v) => update("hero", { ...config.hero, imagePosition: v })}
              />
              <hr className="my-4 border-slate-100" />
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Nome do negócio</p>
              <Input label="Nome da empresa" value={config.business.name}
                onChange={(v) => update("business", { ...config.business, name: v })} />
              <Input label="Tagline" value={config.business.tagline}
                onChange={(v) => update("business", { ...config.business, tagline: v })} />
              <SaveButton onClick={handleSave} saving={saving} saved={saved} />
            </Section>
          )}

          {/* ── SERVICES ─────────────────────────────────────────────────── */}
          {active === "services" && (
            <Section title="Serviços — Imagens & Preços">
              <p className="text-sm text-slate-500 mb-6">
                Edite a foto e o preço de cada serviço. Os títulos e descrições
                são editados no código (<code className="bg-slate-100 px-1 rounded">translations.ts</code>).
              </p>
              {config.services.map((svc, i) => (
                <div key={i} className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <p className="font-semibold text-slate-700 text-sm mb-3">Serviço {i + 1}</p>
                  <ImageUpload value={svc.image}
                    onChange={(v) => {
                      const next = [...config.services];
                      next[i] = { ...next[i], image: v };
                      update("services", next);
                    }} />
                  <PositionPicker
                    value={svc.imagePosition ?? "center"}
                    onChange={(v) => {
                      const next = [...config.services];
                      next[i] = { ...next[i], imagePosition: v };
                      update("services", next);
                    }} />
                  <Input label="Preço (ex: $129)" value={svc.price}
                    onChange={(v) => {
                      const next = [...config.services];
                      next[i] = { ...next[i], price: v };
                      update("services", next);
                    }} placeholder="$129" />
                </div>
              ))}
              <SaveButton onClick={handleSave} saving={saving} saved={saved} />
            </Section>
          )}

          {/* ── TEAM ─────────────────────────────────────────────────────── */}
          {active === "team" && (
            <Section title="Equipe">
              <p className="text-sm text-slate-500 mb-6">
                Edite as iniciais e a cor do avatar de cada membro.
                Os nomes e bios são editados em <code className="bg-slate-100 px-1 rounded">translations.ts</code>.
              </p>
              {config.team.map((member, i) => (
                <div key={i} className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center`}>
                      <span className="text-white font-extrabold text-xl">{member.initials}</span>
                    </div>
                    <p className="font-semibold text-slate-700 text-sm">Membro {i + 1}</p>
                  </div>
                  <Input label="Iniciais do avatar (1–2 letras)" value={member.initials}
                    onChange={(v) => {
                      const next = [...config.team];
                      next[i] = { ...next[i], initials: v.slice(0, 2).toUpperCase() };
                      update("team", next);
                    }} placeholder="M" />
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Cor do gradiente
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "from-pink-500 to-rose-600",
                        "from-blue-500 to-blue-700",
                        "from-purple-500 to-purple-700",
                        "from-green-500 to-green-700",
                        "from-orange-400 to-orange-600",
                        "from-teal-500 to-teal-700",
                      ].map((g) => (
                        <button key={g} onClick={() => {
                          const next = [...config.team];
                          next[i] = { ...next[i], gradient: g };
                          update("team", next);
                        }}
                          className={`w-9 h-9 rounded-full bg-gradient-to-br ${g} border-2 transition ${
                            member.gradient === g ? "border-slate-800 scale-110" : "border-transparent"
                          }`} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <SaveButton onClick={handleSave} saving={saving} saved={saved} />
            </Section>
          )}

          {/* ── REVIEWS ──────────────────────────────────────────────────── */}
          {active === "reviews" && (
            <Section title="Depoimentos de Clientes">
              <div className="space-y-4 mb-6">
                {config.reviews.map((r, i) => (
                  <ReviewCard key={i} review={r}
                    onUpdate={(updated) => {
                      const next = [...config.reviews];
                      next[i] = updated;
                      update("reviews", next);
                    }}
                    onDelete={() => {
                      const next = config.reviews.filter((_, j) => j !== i);
                      update("reviews", next);
                    }} />
                ))}
              </div>
              <button
                onClick={() => {
                  update("reviews", [
                    ...config.reviews,
                    { name: "", location: "", rating: 5, date: "", text: "", avatar: "" },
                  ]);
                }}
                className="flex items-center gap-2 border-2 border-dashed border-slate-300 text-slate-500 hover:border-blue-400 hover:text-blue-600 px-4 py-3 rounded-2xl text-sm font-medium transition w-full justify-center mb-6">
                <Plus className="w-4 h-4" />Adicionar depoimento
              </button>
              <SaveButton onClick={handleSave} saving={saving} saved={saved} />
            </Section>
          )}

          {/* ── STATS ────────────────────────────────────────────────────── */}
          {active === "stats" && (
            <Section title="Estatísticas">
              <p className="text-sm text-slate-500 mb-6">
                Números exibidos no Hero e na seção da equipe.
              </p>
              <Input label="Anos de experiência (ex: 5+)" value={config.stats.years}
                onChange={(v) => update("stats", { ...config.stats, years: v })} />
              <Input label="Clientes atendidos (ex: 200+)" value={config.stats.clients}
                onChange={(v) => update("stats", { ...config.stats, clients: v })} />
              <Input label="Taxa de satisfação (ex: 100%)" value={config.stats.satisfaction}
                onChange={(v) => update("stats", { ...config.stats, satisfaction: v })} />
              <SaveButton onClick={handleSave} saving={saving} saved={saved} />
            </Section>
          )}

          {/* ── SEO ──────────────────────────────────────────────────────── */}
          {active === "seo" && (
            <Section title="SEO — Mecanismos de Busca">
              <p className="text-sm text-slate-500 mb-6">
                Informações que aparecem no Google e nas redes sociais ao compartilhar o site.
              </p>
              <Input label="Título da página (até 60 chars)" value={config.seo.title}
                onChange={(v) => update("seo", { ...config.seo, title: v })} />
              <Textarea label="Descrição (até 160 chars)" value={config.seo.description}
                onChange={(v) => update("seo", { ...config.seo, description: v })} />
              <Input label="Palavras-chave (separadas por vírgula)" value={config.seo.keywords}
                onChange={(v) => update("seo", { ...config.seo, keywords: v })} />
              <hr className="my-4 border-slate-100" />
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Open Graph (redes sociais)</p>
              <Input label="Título para compartilhamento" value={config.seo.ogTitle}
                onChange={(v) => update("seo", { ...config.seo, ogTitle: v })} />
              <Textarea label="Descrição para compartilhamento" value={config.seo.ogDescription}
                onChange={(v) => update("seo", { ...config.seo, ogDescription: v })} rows={2} />
              <SaveButton onClick={handleSave} saving={saving} saved={saved} />
            </Section>
          )}
          </main>
        </div>
      </div>
    </div>
  );
}

// ─── sub-components ───────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-extrabold text-slate-800 mb-6">{title}</h2>
      {children}
    </div>
  );
}

type ReviewType = { name: string; location: string; rating: number; date: string; text: string; avatar: string };

function ReviewCard({ review, onUpdate, onDelete }: {
  review: ReviewType;
  onUpdate: (r: ReviewType) => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {review.avatar || "?"}
          </div>
          <div>
            <p className="font-semibold text-slate-700 text-sm">{review.name || "Novo depoimento"}</p>
            <p className="text-xs text-slate-400">{review.location}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={onDelete} className="p-2 text-slate-400 hover:text-red-500 transition">
            <Trash2 className="w-4 h-4" />
          </button>
          <button onClick={() => setOpen(!open)} className="p-2 text-slate-400 hover:text-slate-700 transition">
            {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="px-4 pb-4 border-t border-slate-100 pt-4">
          <div className="grid grid-cols-2 gap-x-4">
            <Input label="Nome" value={review.name}
              onChange={(v) => onUpdate({ ...review, name: v })} />
            <Input label="Iniciais (avatar)" value={review.avatar}
              onChange={(v) => onUpdate({ ...review, avatar: v.slice(0, 2).toUpperCase() })} placeholder="SM" />
            <Input label="Localização" value={review.location}
              onChange={(v) => onUpdate({ ...review, location: v })} placeholder="Cherry Hill, NJ" />
            <Input label="Data" value={review.date}
              onChange={(v) => onUpdate({ ...review, date: v })} placeholder="2 weeks ago" />
          </div>
          <div className="mb-4">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Nota</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => onUpdate({ ...review, rating: n })}
                  className={`text-xl transition ${n <= review.rating ? "text-yellow-400" : "text-slate-300"}`}>
                  ★
                </button>
              ))}
            </div>
          </div>
          <Textarea label="Texto do depoimento" value={review.text}
            onChange={(v) => onUpdate({ ...review, text: v })} rows={3} />
        </div>
      )}
    </div>
  );
}
