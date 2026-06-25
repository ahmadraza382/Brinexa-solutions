// Supabase client — ready for when you connect a project.
// The contact form currently runs in "dummy" mode (frontend success message).
// To enable real submissions:
//   1. Create a Supabase project at https://supabase.com
//   2. Copy .env.example to .env.local and fill in the two values
//   3. Run the SQL in /supabase/schema.sql to create the `contact_messages` table
//   4. In components/ContactForm.jsx, flip USE_SUPABASE to true

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  url && anonKey ? createClient(url, anonKey) : null;
