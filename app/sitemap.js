import { BLOG_POSTS } from "@/lib/siteData";
import { getServiceSlugs } from "@/lib/getServices";
import { createClient } from "@supabase/supabase-js";

const BASE = "https://brinexasolutions.com";

async function getPublishedSlugs() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return [];
    const supabase = createClient(url, key);
    const { data } = await supabase
      .from("posts")
      .select("slug, updated_at")
      .eq("status", "PUBLISHED");
    return data || [];
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const staticPages = [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/portfolio`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/pricing`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const serviceSlugs = await getServiceSlugs();
  const servicePages = serviceSlugs.map((slug) => ({
    url: `${BASE}/services/${slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Blog posts — prefer Supabase, fall back to siteData
  const dbPosts = await getPublishedSlugs();
  const blogPages =
    dbPosts.length > 0
      ? dbPosts.map((p) => ({
          url: `${BASE}/blog/${p.slug}`,
          lastModified: p.updated_at,
          changeFrequency: "weekly",
          priority: 0.7,
        }))
      : BLOG_POSTS.map((p) => ({
          url: `${BASE}/blog/${p.slug}`,
          changeFrequency: "weekly",
          priority: 0.7,
        }));

  return [...staticPages, ...servicePages, ...blogPages];
}
