import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, category, status, published_at, created_at")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { title, slug, category, excerpt, cover_image, body: postBody, status } = body;

  if (!title || !slug) {
    return NextResponse.json({ error: "Title and slug are required." }, { status: 400 });
  }

  const published_at = status === "PUBLISHED" ? new Date().toISOString() : null;

  const { data, error } = await supabase
    .from("posts")
    .insert([{ title, slug, category, excerpt, cover_image, body: postBody, status: status || "DRAFT", published_at }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
