import PortfolioClient from "@/components/portfolio/PortfolioClient";
import { createClient } from "@supabase/supabase-js";
import { PORTFOLIO, PORTFOLIO_FILTERS } from "@/lib/siteData";

export const metadata = {
  title: "Our Work | Brinexa Solutions Portfolio",
  description:
    "See results delivered for brands across branding, web development, digital marketing & more.",
};

export const revalidate = 60;

async function getProjects() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    const supabase = createClient(url, key);
    const { data } = await supabase
      .from("projects")
      .select("id, title, category, result, cover_image, icon, published")
      .eq("published", true)
      .order("created_at", { ascending: false });
    return data?.length ? data : null;
  } catch {
    return null;
  }
}

export default async function PortfolioPage() {
  const dbProjects = await getProjects();

  const projects = dbProjects
    ? dbProjects.map((p) => ({
        id: p.id,
        slug: p.slug || p.id,
        title: p.title,
        category: p.category || "Other",
        result: p.result || "",
        icon: p.icon || "Star",
        cover_image: p.cover_image || null,
      }))
    : PORTFOLIO;

  const filters =
    dbProjects
      ? ["All", ...new Set(dbProjects.map((p) => p.category).filter(Boolean))]
      : PORTFOLIO_FILTERS;

  return <PortfolioClient initialProjects={projects} initialFilters={filters} />;
}
