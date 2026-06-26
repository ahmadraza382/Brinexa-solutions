import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("services")
    .select("id, slug, icon, title, short, description, is_active, display_order, created_at")
    .order("display_order", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { slug, icon, title, short, description, h1, sub, included, process: proc, faq, display_order } = body;

  if (!slug || !title) {
    return NextResponse.json({ error: "slug and title are required." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("services")
    .insert([{
      slug, icon: icon || "Star", title, short: short || "", description: description || "",
      h1: h1 || "", sub: sub || "",
      included: included || [], process: proc || [], faq: faq || [],
      display_order: display_order || 0, is_active: true,
    }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
