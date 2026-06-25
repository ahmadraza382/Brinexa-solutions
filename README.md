# Brinexa Solutions — Website

A fully animated, premium **dark tech-agency** website built with **Next.js 16**, **Tailwind CSS**, **Framer Motion**, and **Three.js** (3D hero).

> Tagline: *Your Brand's New Best Friend*

---

## ✨ What's inside

**Core pages (fully built):**

- `/` — **Home**: 3D animated hero (Three.js particles + wireframe), trust-bar ticker, services grid, why-choose, 4-step process, animated stat counters, glassmorphism testimonials, final CTA
- `/about` — story, mission/vision, values, team grid
- `/services` — overview of all 6 services
- `/services/[slug]` — **6 full service detail pages** (what's included, process, pricing tiers, FAQ accordion, CTA)
- `/contact` — animated contact form (validation + success state, Supabase-ready) + info card

**Supporting pages (fully built):** `/portfolio` (filterable project grid), `/pricing` (packages + FAQ), `/blog` (post grid + `/blog/[slug]` articles), `/privacy`, `/terms`, plus a custom **404**.

**Global:** sticky glassmorphism navbar with mobile drawer, 4-column footer, floating WhatsApp button, scroll-progress bar.

---

## 🎨 Design system (from the brief)

| Token | Value |
|---|---|
| Primary (purple) | `#6C3FD4` |
| Accent (cyan) | `#00C9A7` |
| Background | `#0D0D0D` |
| Surface (navy) | `#1A1A2E` |
| Border | `#2E2E4A` |
| Headings | Poppins (600/700/800) |
| Body | Inter (400/500/600) |

All tokens live in `tailwind.config.js` and `app/globals.css`. Animations respect `prefers-reduced-motion`.

---

## 🚀 Run it locally

> Requires **Node.js 18.18+** (Node 20+ recommended).

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open http://localhost:3000
```

Build for production:

```bash
npm run build
npm start
```

---

## 🗄️ Contact form & Supabase

The contact form currently runs in **dummy mode** — it validates input and shows a success message without sending anywhere. To wire it to **Supabase**:

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL Editor, run `supabase/schema.sql` (creates the `contact_messages` table + insert policy).
3. Copy `.env.example` → `.env.local` and fill in:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```
4. In `components/ContactForm.jsx`, set `USE_SUPABASE = true`.

That's it — submissions will then be stored in your Supabase table.

---

## 📁 Project structure

```
brinexa-website/
├── app/
│   ├── layout.jsx              # Root layout (nav + footer + WhatsApp + SEO)
│   ├── page.jsx                # Home
│   ├── about/page.jsx
│   ├── services/page.jsx
│   ├── services/[slug]/page.jsx  # 6 dynamic service pages
│   ├── contact/page.jsx
│   ├── portfolio | pricing | blog | privacy | terms / page.jsx
│   ├── not-found.jsx
│   └── globals.css
├── components/                 # Navbar, Footer, HeroCanvas (3D), cards, motion, etc.
├── lib/
│   ├── siteData.js             # All site content (edit text/services here)
│   └── supabaseClient.js
├── supabase/schema.sql
├── tailwind.config.js
└── next.config.mjs
```

---

## ✏️ Editing content

Almost all text, services, testimonials, team members, stats and pricing live in **`lib/siteData.js`** — edit there and it updates everywhere.

---

## 🖼️ Images

The site uses CSS gradients, 3D canvas and initials-based avatars as high-quality placeholders. Replace with real assets by dropping files in `public/` and updating the relevant components.

---

Built with the **UI/UX Pro Max** design system. © 2025 Brinexa Solutions.
