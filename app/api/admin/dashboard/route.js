import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [
    { count: totalLeads },
    { count: newLeads },
    { count: totalPosts },
    { count: totalProjects },
    { data: recentLeads },
  ] = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .gte("created_at", weekAgo),
    supabase
      .from("posts")
      .select("*", { count: "exact", head: true })
      .eq("status", "PUBLISHED"),
    supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .eq("published", true),
    supabase
      .from("leads")
      .select("id, name, email, service, status, created_at")
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  // Leads per day for last 7 days
  const { data: leadsRaw } = await supabase
    .from("leads")
    .select("created_at")
    .gte("created_at", weekAgo);

  const byDay = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    byDay[d.toISOString().slice(0, 10)] = 0;
  }
  (leadsRaw || []).forEach(({ created_at }) => {
    const day = created_at.slice(0, 10);
    if (day in byDay) byDay[day]++;
  });

  return NextResponse.json({
    totalLeads: totalLeads ?? 0,
    newLeads: newLeads ?? 0,
    totalPosts: totalPosts ?? 0,
    totalProjects: totalProjects ?? 0,
    recentLeads: recentLeads ?? [],
    leadsChart: Object.entries(byDay).map(([date, count]) => ({ date, count })),
  });
}
