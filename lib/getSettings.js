import { createClient } from "@/lib/supabase/server";
import { TESTIMONIALS, TEAM } from "@/lib/siteData";

export async function getTestimonials() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "testimonials")
      .single();
    if (data?.value && Array.isArray(data.value) && data.value.length > 0)
      return data.value;
    return TESTIMONIALS;
  } catch {
    return TESTIMONIALS;
  }
}

export async function getTeam() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "team")
      .single();
    if (data?.value && Array.isArray(data.value) && data.value.length > 0)
      return data.value;
    return TEAM;
  } catch {
    return TEAM;
  }
}
