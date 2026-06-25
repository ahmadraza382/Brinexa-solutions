-- Run this if you already executed admin-schema.sql and need to add case study fields
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS tagline TEXT,
  ADD COLUMN IF NOT EXISTS challenge TEXT,
  ADD COLUMN IF NOT EXISTS solution TEXT,
  ADD COLUMN IF NOT EXISTS services JSONB DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS metrics JSONB DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS testimonial JSONB DEFAULT NULL;
