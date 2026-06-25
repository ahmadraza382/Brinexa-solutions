import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import CTASection from "@/components/CTASection";
import { BLOG_POSTS } from "@/lib/siteData";
import { createClient } from "@supabase/supabase-js";

export const metadata = {
  title: "Digital Marketing Blog | Brinexa Solutions",
  description:
    "Tips, guides, and insights on digital marketing, branding, web development & growing your business online.",
};

export const revalidate = 60;

const catGradient = {
  "Social Media": "from-[#6C3FD4] to-[#00C9A7]",
  "Paid Ads": "from-[#9B6BFF] to-[#00C9A7]",
  "Web Development": "from-[#00C9A7] to-[#23B6D9]",
  Amazon: "from-[#23B6D9] to-[#6C3FD4]",
  Branding: "from-[#6C3FD4] to-[#9B6BFF]",
};

async function getPosts() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    const supabase = createClient(url, key);
    const { data } = await supabase
      .from("posts")
      .select("id, title, slug, category, excerpt, published_at")
      .eq("status", "PUBLISHED")
      .order("published_at", { ascending: false });
    return data?.length ? data : null;
  } catch {
    return null;
  }
}

export default async function BlogPage() {
  const dbPosts = await getPosts();
  const posts = dbPosts
    ? dbPosts.map((p) => ({
        slug: p.slug,
        title: p.title,
        category: p.category || "General",
        date: p.published_at
          ? new Date(p.published_at).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "",
        excerpt: p.excerpt || "",
      }))
    : BLOG_POSTS;

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Insights to Grow Your Brand"
        subtitle="Stay ahead with practical guides, industry updates & marketing tips from our team."
      />

      <section className="pb-4">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 0.08}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="surface-card group flex h-full flex-col overflow-hidden cursor-pointer"
                >
                  {/* gradient featured header */}
                  <div className={`relative h-44 bg-gradient-to-br ${catGradient[post.category] || "from-brand-purple to-brand-cyan"} overflow-hidden`}>
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                    <span className="absolute top-3 left-3 rounded-full bg-black/40 backdrop-blur px-3 py-1 text-xs font-medium text-white">
                      {post.category}
                    </span>
                    <span className="absolute bottom-3 right-3 font-heading font-extrabold text-white/30 text-5xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  {/* body */}
                  <div className="p-6 flex flex-1 flex-col">
                    <div className="flex items-center gap-2 text-xs text-text-muted mb-3">
                      <Calendar className="w-3.5 h-3.5" /> {post.date}
                    </div>
                    <h4 className="font-heading font-semibold text-lg text-white mb-2 leading-snug group-hover:text-brand-cyan transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed mb-5 flex-1">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-cyan group-hover:gap-3 transition-all duration-300">
                      Read More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want Content Like This for Your Brand?"
        subtitle="Our team writes, designs, and ranks content that actually drives traffic."
        primaryLabel="Talk to Us"
      />
    </>
  );
}
