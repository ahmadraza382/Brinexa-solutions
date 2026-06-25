import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MIN = 15;

export async function POST(request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  // Rate limiting: check recent failed attempts
  const windowStart = new Date(
    Date.now() - RATE_LIMIT_WINDOW_MIN * 60 * 1000
  ).toISOString();

  const { count } = await supabase
    .from("login_attempts")
    .select("*", { count: "exact", head: true })
    .eq("email", email.toLowerCase())
    .gte("attempted_at", windowStart);

  if (count >= RATE_LIMIT_MAX) {
    return NextResponse.json(
      {
        error: `Too many failed attempts. Please wait ${RATE_LIMIT_WINDOW_MIN} minutes before trying again.`,
      },
      { status: 429 }
    );
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    // Record failed attempt
    await supabase.from("login_attempts").insert({ email: email.toLowerCase() });
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 }
    );
  }

  return NextResponse.json({ ok: true });
}
