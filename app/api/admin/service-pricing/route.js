import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const service_slug = searchParams.get("service_slug");

  let query = supabase
    .from("service_pricing")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (service_slug) query = query.eq("service_slug", service_slug);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { service_slug, name, price, billing, features, is_featured, display_order } = body;

  if (!service_slug || !name) {
    return NextResponse.json({ error: "service_slug and name are required." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("service_pricing")
    .insert([{
      service_slug,
      name,
      price: price || "Contact for Price",
      billing: billing || "",
      features: features || [],
      is_featured: is_featured || false,
      display_order: display_order || 0,
    }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
