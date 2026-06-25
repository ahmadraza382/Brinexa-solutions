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

-- ============================================================
-- Initial Settings Seed
-- ============================================================

INSERT INTO public.settings (key, value) VALUES
  ('site', '{"name":"Brinexa Solutions","email":"brinexasolutions@gmail.com","phone":"+92 317 0796913","location":"Faisalabad, Punjab, Pakistan","hours":"Mon-Sat, 9:00 AM - 6:00 PM PKT"}'::jsonb),
  ('socials', '{"facebook":"https://www.facebook.com/profile.php?id=61581051916636","instagram":"#","tiktok":"#","linkedin":"#","youtube":"#"}'::jsonb),
  ('testimonials', '[]'::jsonb)
ON CONFLICT (key) DO NOTHING;
