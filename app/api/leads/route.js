import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request) {
  const body = await request.json();
  const { name, email, phone, service, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { error } = await supabase
    .from("leads")
    .insert([{ name, email, phone: phone || null, service: service || null, message }]);

  if (error) {
    console.error("Lead insert error:", error);
    return NextResponse.json({ error: "Failed to save. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
