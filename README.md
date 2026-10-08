# Lidia's Cleaner Service — Website

Site institucional premium da **Lidia's Cleaner Service** (Greater Boston, MA), criado pela Digi Agency Marketing a partir do template MW Cleaning (Next.js + Tailwind + Supabase).

## Onde editar

| O quê | Arquivo |
|---|---|
| Contato, redes, imagens, cidades, depoimentos, galeria, SEO | `src/lib/site.config.ts` (ou pelo painel `/admin`) |
| Textos do site (inglês) | `src/lib/translations.ts` |
| Paleta (azul da logo + dourado) e tipografia | `src/app/globals.css`, `src/app/layout.tsx` |
| Logo | `public/logo.png` (fundo removido). Original em `logo-input/` |

**Fotos dos trabalhos:** adicione em `gallery` no `site.config.ts` — a seção "Our Work" aparece automaticamente quando houver fotos.

## Variáveis de ambiente (Vercel)

`SITE_ID`, `ADMIN_PASSWORD`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` e, para o formulário, `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`.

## Rodar localmente

```bash
npm install
npm run dev
```
