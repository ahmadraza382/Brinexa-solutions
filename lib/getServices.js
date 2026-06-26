import { createClient } from "@/lib/supabase/server";
import { SERVICES, SERVICE_DETAILS } from "@/lib/siteData";

export async function getServices() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("services")
      .select("id, slug, icon, title, short, description")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) return SERVICES;

    return data.map((s) => ({
      slug: s.slug,
      icon: s.icon,
      title: s.title,
      short: s.short,
      desc: s.description,
    }));
  } catch {
    return SERVICES;
  }
}

export async function getServiceBySlug(slug) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (error || !data) return _staticFallback(slug);

    return {
      slug: data.slug,
      icon: data.icon,
      title: data.title,
      short: data.short,
      desc: data.description,
      h1: data.h1,
      sub: data.sub,
      included: data.included || [],
      process: data.process || [],
      faq: data.faq || [],
    };
  } catch {
    return _staticFallback(slug);
  }
}

export async function getServiceSlugs() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("services")
      .select("slug")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) return SERVICES.map((s) => s.slug);
    return data.map((s) => s.slug);
  } catch {
    return SERVICES.map((s) => s.slug);
  }
}

function _staticFallback(slug) {
  const service = SERVICES.find((s) => s.slug === slug);
  const detail = SERVICE_DETAILS[slug];
  if (!service || !detail) return null;
  return {
    slug: service.slug,
    icon: service.icon,
    title: service.title,
    short: service.short,
    desc: service.desc,
    h1: detail.h1,
    sub: detail.sub,
    included: detail.included,
    process: detail.process,
    faq: detail.faq,
  };
}
