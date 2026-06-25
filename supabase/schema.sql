-- Brinexa Solutions — Supabase schema for the contact form
-- Run this in your Supabase project's SQL Editor.

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  service text,
  message text not null,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.contact_messages enable row level security;

-- Allow anonymous visitors to INSERT (submit the form) but not read.
create policy "Allow anonymous inserts"
  on public.contact_messages
  for insert
  to anon
  with check (true);

-- (Optional) Allow only authenticated/admin users to read submissions.
-- create policy "Admins can read"
--   on public.contact_messages
--   for select
--   to authenticated
--   using (true);
