-- ============================================================
-- Brinexa Admin Panel — Supabase Schema
-- Run this in your Supabase SQL Editor after creating a project
-- ============================================================

-- Leads / Contact Form Submissions
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'NEW' CHECK (status IN ('NEW', 'IN_PROGRESS', 'CLOSED')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Posts
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT DEFAULT 'General',
  excerpt TEXT,
  cover_image TEXT,
  body TEXT,
  status TEXT NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PUBLISHED')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Portfolio Projects
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  category TEXT,
  result TEXT,
  tagline TEXT,
  challenge TEXT,
  solution TEXT,
  services JSONB DEFAULT '[]',
  metrics JSONB DEFAULT '[]',
  testimonial JSONB DEFAULT NULL,
  cover_image TEXT,
  icon TEXT DEFAULT 'Star',
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Settings (key-value store)
CREATE TABLE IF NOT EXISTS public.settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Login Attempts (for rate limiting)
CREATE TABLE IF NOT EXISTS public.login_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  attempted_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.login_attempts ENABLE ROW LEVEL SECURITY;

-- Leads: anyone can insert (contact form), only authenticated can read/update/delete
CREATE POLICY "public_insert_leads" ON public.leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "auth_select_leads" ON public.leads
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "auth_update_leads" ON public.leads
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "auth_delete_leads" ON public.leads
  FOR DELETE USING (auth.role() = 'authenticated');

-- Posts: anyone can read published, authenticated manage all
CREATE POLICY "public_read_published_posts" ON public.posts
  FOR SELECT USING (status = 'PUBLISHED' OR auth.role() = 'authenticated');

CREATE POLICY "auth_insert_posts" ON public.posts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "auth_update_posts" ON public.posts
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "auth_delete_posts" ON public.posts
  FOR DELETE USING (auth.role() = 'authenticated');

-- Projects: anyone can read published, authenticated manage all
CREATE POLICY "public_read_published_projects" ON public.projects
  FOR SELECT USING (published = TRUE OR auth.role() = 'authenticated');

CREATE POLICY "auth_insert_projects" ON public.projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "auth_update_projects" ON public.projects
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "auth_delete_projects" ON public.projects
  FOR DELETE USING (auth.role() = 'authenticated');

-- Settings: authenticated only
CREATE POLICY "auth_all_settings" ON public.settings
  FOR ALL USING (auth.role() = 'authenticated');

-- Login attempts: public insert and read (for rate limiting from API routes)
CREATE POLICY "public_insert_attempts" ON public.login_attempts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "public_read_attempts" ON public.login_attempts
  FOR SELECT USING (true);

-- ============================================================
-- Supabase Storage: media bucket for image uploads
-- ============================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "public_read_media" ON storage.objects
  FOR SELECT USING (bucket_id = 'media');

CREATE POLICY "auth_upload_media" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');

CREATE POLICY "auth_update_media" ON storage.objects
  FOR UPDATE USING (bucket_id = 'media' AND auth.role() = 'authenticated');

CREATE POLICY "auth_delete_media" ON storage.objects
  FOR DELETE USING (bucket_id = 'media' AND auth.role() = 'authenticated');

-- Services (fully admin-managed)
CREATE TABLE IF NOT EXISTS public.services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT DEFAULT 'Star',
  title TEXT NOT NULL,
  short TEXT DEFAULT '',
  description TEXT DEFAULT '',
  h1 TEXT DEFAULT '',
  sub TEXT DEFAULT '',
  included JSONB DEFAULT '[]',
  process JSONB DEFAULT '[]',
  faq JSONB DEFAULT '[]',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Idempotent migrations: add any columns that may be missing from an older schema run
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS short TEXT DEFAULT '';
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS description TEXT DEFAULT '';
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS h1 TEXT DEFAULT '';
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS sub TEXT DEFAULT '';
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS included JSONB DEFAULT '[]';
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS process JSONB DEFAULT '[]';
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS faq JSONB DEFAULT '[]';
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_active_services" ON public.services;
DROP POLICY IF EXISTS "auth_insert_services" ON public.services;
DROP POLICY IF EXISTS "auth_update_services" ON public.services;
DROP POLICY IF EXISTS "auth_delete_services" ON public.services;

CREATE POLICY "public_read_active_services" ON public.services
  FOR SELECT USING (is_active = TRUE OR auth.role() = 'authenticated');

CREATE POLICY "auth_insert_services" ON public.services
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "auth_update_services" ON public.services
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "auth_delete_services" ON public.services
  FOR DELETE USING (auth.role() = 'authenticated');

-- Seed: existing 6 services
INSERT INTO public.services (slug, icon, title, short, description, h1, sub, included, process, faq, display_order) VALUES
(
  'design-branding', 'Palette', 'Brand Identity & Design',
  'Logos, brand kits, and visuals that speak for you',
  'Creative design solutions that build memorable brands - logo design, full brand identity kits, social media templates, packaging design, and beyond.',
  'Design That Makes Your Brand Unforgettable',
  'First impressions matter. We create visual identities that tell your brand''s story at a glance.',
  '["Logo Design (Primary + Variations + Favicon)", "Brand Color Palette & Typography System", "Brand Style Guide / Brand Kit (PDF)", "Social Media Templates (Posts, Stories, Highlights)", "Packaging & Label Design", "Business Cards, Letterheads & Stationery", "Banner & Ad Creative Design", "Website UI/UX Design"]',
  '["Discovery Call", "Brand Questionnaire", "Mood Board", "3 Concepts", "Revisions", "Final Delivery"]',
  '[{"q": "How long does a full brand identity take?", "a": "Typically 2-3 weeks depending on scope and revision rounds."}, {"q": "How many logo concepts do I get?", "a": "You''ll receive 3 initial concepts, then we refine your favourite."}, {"q": "What files will I receive?", "a": "Editable source files plus AI, PNG, SVG and PDF exports for every use case."}, {"q": "Do you design social media templates too?", "a": "Yes - posts, stories and highlight covers are included in our kits."}]',
  1
),
(
  'web-development', 'Code2', 'Web Development',
  'Fast, modern websites that convert visitors into clients',
  'Custom websites built for speed, design, and conversions - from landing pages to full eCommerce stores.',
  'Websites That Work As Hard As You Do',
  'Modern, fast, mobile-first websites built to turn visitors into paying customers.',
  '["Business / Portfolio Websites", "eCommerce Stores (Shopify, WooCommerce)", "Landing Pages for Lead Generation", "Custom Web Applications", "Website Redesigns & Speed Optimization", "Mobile-responsive & SEO-friendly builds", "Contact forms & Google Analytics setup", "30-day post-launch support"]',
  '["Discovery & Planning", "Wireframe & Design", "Development", "Content & SEO", "QA & Testing", "Launch & Support"]',
  '[{"q": "What tech stack do you use?", "a": "WordPress, Shopify, React, Next.js, WooCommerce or Webflow - chosen to fit your needs."}, {"q": "Will my site be mobile-friendly?", "a": "Always. Every build is fully responsive from 320px to large desktops."}, {"q": "Do you offer post-launch support?", "a": "Yes - every project includes 30 days of post-launch support."}, {"q": "Can you redesign my existing site?", "a": "Absolutely. Redesigns and speed optimization are among our most-requested services."}]',
  2
),
(
  'digital-marketing', 'TrendingUp', 'Digital Marketing',
  'Organic growth through content, SEO & social media',
  'Content strategy, SEO, social media management, and community building to grow your audience organically.',
  'Grow Your Audience. Build Your Brand. Without Paid Ads.',
  'Sustainable, long-term growth through content, SEO, and smart social media strategy.',
  '["Social Media Management (Facebook, Instagram, TikTok, LinkedIn)", "Content Strategy & Monthly Calendar", "SEO - On-page, Off-page, Technical SEO", "Blog Writing & Content Marketing", "Community Management & Engagement", "Influencer Outreach & Collaboration"]',
  '["Audit & Research", "Strategy & Calendar", "Content Creation", "Publish & Engage", "Analyze", "Optimize"]',
  '[{"q": "How soon will I see organic results?", "a": "Organic growth compounds - most clients see meaningful traction in 2-3 months."}, {"q": "Which platforms do you manage?", "a": "Facebook, Instagram, TikTok and LinkedIn, tailored to where your audience is."}, {"q": "Do you write the content too?", "a": "Yes - strategy, captions, blogs and creative are all handled by our team."}, {"q": "Is SEO included?", "a": "On-page, off-page and technical SEO are all part of our organic packages."}]',
  3
),
(
  'paid-ads', 'Target', 'Paid Advertising',
  'Meta, TikTok, Google, LinkedIn - ads that actually work',
  'High-ROI campaigns on Meta, TikTok, Google, LinkedIn & Amazon PPC - managed by certified ad specialists.',
  'Ads That Actually Convert. ROI You Can See.',
  'Stop wasting budget on ineffective ads. We build, manage & optimize campaigns that deliver real results.',
  '["Meta Ads (Facebook & Instagram) - lead gen, eCommerce, retargeting", "TikTok Ads - short-form video ads for reach & conversions", "Google Ads - Search, Display, Shopping & YouTube", "LinkedIn Ads - B2B lead generation & sponsored content", "Amazon PPC - Sponsored Products, Brands & Display", "Campaign setup, creative & audience targeting", "A/B testing & budget optimization", "Weekly performance reports"]',
  '["Goal & Audience Research", "Creative & Copy", "Campaign Setup", "Launch", "A/B Test & Optimize", "Report & Scale"]',
  '[{"q": "What ad budget do I need?", "a": "We work with a range of budgets and will recommend a starting point during your consultation."}, {"q": "Which platforms do you run ads on?", "a": "Meta, TikTok, Google, LinkedIn and Amazon PPC."}, {"q": "How often will I get reports?", "a": "Weekly performance reports, plus a real-time view on premium plans."}, {"q": "Do you create the ad creative?", "a": "Yes - ad copy and creative are included in campaign management."}]',
  4
),
(
  'amazon-ecommerce', 'ShoppingCart', 'Amazon & eCommerce',
  'Full account management, listings & PPC campaigns',
  'Complete Amazon account management - product listings, A+ content, PPC campaigns, brand registry & review strategies.',
  'Sell More on Amazon. We''ll Handle the Rest.',
  'From listing creation to PPC management - we are your complete Amazon growth partner.',
  '["Amazon Account Setup & Management", "Product Listing Creation & Optimization", "A+ Content / Enhanced Brand Content", "Amazon Brand Registry", "Amazon PPC Campaign Management", "Keyword Research & Ranking Strategy", "FBA Consultation & Inventory Support", "Competitor Analysis"]',
  '["Account Audit", "Keyword Research", "Listing Optimization", "A+ Content", "PPC Launch", "Rank & Scale"]',
  '[{"q": "Do you handle brand registry?", "a": "Yes - we guide you through Amazon Brand Registry end to end."}, {"q": "Can you optimize my existing listings?", "a": "Definitely - listing and A+ content optimization is a core service."}, {"q": "Do you manage PPC campaigns?", "a": "Yes - Sponsored Products, Brands and Display, fully managed and optimized."}, {"q": "Do you offer FBA support?", "a": "We provide FBA consultation and inventory support as part of our packages."}]',
  5
),
(
  'video-editing', 'Clapperboard', 'Video Editing',
  'Scroll-stopping reels, ads & brand videos',
  'Professional video editing for social media, ads, YouTube, and brand content - reels, short-form videos & promo ads.',
  'Video Content That Stops the Scroll.',
  'From raw footage to scroll-stopping content - we edit videos that get watched, shared & remembered.',
  '["Instagram & TikTok Reels", "YouTube Videos (Long-form & Shorts)", "Facebook & Google Video Ads", "Brand Promo Videos", "Product Demo Videos", "Event Highlight Reels", "Color grading, captions & sound design", "Motion graphics & thumbnail design"]',
  '["Brief & Footage", "Rough Cut", "Editing & Effects", "Color & Sound", "Revisions", "Final Export"]',
  '[{"q": "What''s your turnaround time?", "a": "Most short-form edits are delivered in 2-4 days depending on volume."}, {"q": "Do you add captions and subtitles?", "a": "Yes - captions, subtitles and sound design are all included."}, {"q": "Can you export for every platform?", "a": "We deliver platform-optimized exports for Reels, TikTok, YouTube and ads."}, {"q": "Do you design thumbnails too?", "a": "Yes - thumbnail design is included for YouTube content."}]',
  6
)
ON CONFLICT (slug) DO NOTHING;

-- Service Pricing Plans (per-service, admin-managed)
CREATE TABLE IF NOT EXISTS public.service_pricing (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_slug TEXT NOT NULL,
  name TEXT NOT NULL,
  price TEXT NOT NULL DEFAULT 'Contact for Price',
  billing TEXT DEFAULT '',
  features JSONB DEFAULT '[]',
  is_featured BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.service_pricing ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_service_pricing" ON public.service_pricing;
DROP POLICY IF EXISTS "auth_insert_service_pricing" ON public.service_pricing;
DROP POLICY IF EXISTS "auth_update_service_pricing" ON public.service_pricing;
DROP POLICY IF EXISTS "auth_delete_service_pricing" ON public.service_pricing;

-- Anyone can read (needed for public service detail pages)
CREATE POLICY "public_read_service_pricing" ON public.service_pricing
  FOR SELECT USING (true);

CREATE POLICY "auth_insert_service_pricing" ON public.service_pricing
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "auth_update_service_pricing" ON public.service_pricing
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "auth_delete_service_pricing" ON public.service_pricing
  FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================================
-- Initial Settings Seed
-- ============================================================

INSERT INTO public.settings (key, value) VALUES
  ('site', '{"name":"Brinexa Solutions","email":"brinexasolutions@gmail.com","phone":"+92 317 0796913","location":"Faisalabad, Punjab, Pakistan","hours":"Mon-Sat, 9:00 AM - 6:00 PM PKT"}'::jsonb),
  ('socials', '{"facebook":"https://www.facebook.com/profile.php?id=61581051916636","instagram":"#","tiktok":"#","linkedin":"#","youtube":"#"}'::jsonb),
  ('testimonials', '[{"name":"Ayesha Khan","position":"Founder, Luxe Threads","quote":"Brinexa completely transformed our brand. From the logo to our website to our ad campaigns - everything finally feels consistent and premium.","image":"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80&auto=format&fit=crop&crop=faces"},{"name":"Bilal Ahmed","position":"CEO, NovaGoods","quote":"Our Amazon sales doubled within three months. Their PPC management and listing optimization is genuinely next level.","image":"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop&crop=faces"},{"name":"Sara Malik","position":"Marketing Lead, FitFuel","quote":"Finally an agency that communicates. Weekly reports, real results, and a team that actually cares about our growth.","image":"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80&auto=format&fit=crop&crop=faces"}]'::jsonb),
  ('team', '[{"name":"Hamza Raza","role":"Founder & Creative Director","linkedin":""},{"name":"Zoya Sheikh","role":"Head of Marketing","linkedin":""},{"name":"Usman Tariq","role":"Lead Web Developer","linkedin":""},{"name":"Mahnoor Ali","role":"Brand Designer","linkedin":""}]'::jsonb)
ON CONFLICT (key) DO NOTHING;
