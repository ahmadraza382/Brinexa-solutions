import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import CTASection from "@/components/CTASection";
import { BLOG_POSTS } from "@/lib/siteData";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 60;

async function getPost(slug) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    const supabase = createClient(url, key);
    const { data } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "PUBLISHED")
      .single();
    return data || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const dbPost = await getPost(slug);
  if (dbPost) {
    return { title: `${dbPost.title} | Brinexa Blog`, description: dbPost.excerpt };
  }
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: `${post.title} | Brinexa Blog`, description: post.excerpt };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const dbPost = await getPost(slug);

  if (dbPost) {
    return (
      <>
        <PageHero eyebrow={dbPost.category} title={dbPost.title} subtitle={dbPost.excerpt} />
        <article className="pb-24">
          <div className="container-x max-w-3xl">
            <Reveal>
              <div className="flex items-center gap-2 text-sm text-text-muted mb-8">
                <Calendar className="w-4 h-4" />
                {dbPost.published_at
                  ? new Date(dbPost.published_at).toLocaleDateString("en-GB", {
                      day: "numeric", month: "long", year: "numeric",
                    })
                  : ""}
                <span className="mx-1">•</span>
                <span className="badge-pill !py-1 !px-3 !text-xs">{dbPost.category}</span>
              </div>
              {dbPost.cover_image && (
                <img
                  src={dbPost.cover_image}
                  alt={dbPost.title}
                  className="w-full h-64 object-cover rounded-2xl mb-8"
                />
              )}
              <div
                className="blog-body"
                dangerouslySetInnerHTML={{ __html: dbPost.body || "<p>Content coming soon.</p>" }}
              />
              <div className="mt-12">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-medium text-brand-cyan hover:gap-3 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to all articles
                </Link>
              </div>
            </Reveal>
          </div>
        </article>
        <CTASection
          title="Let's Grow Your Brand Together"
          subtitle="Book a free consultation and let's talk strategy."
          primaryLabel="Get a Free Consultation"
        />
      </>
    );
  }

  // Fallback to static siteData
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <PageHero eyebrow={post.category} title={post.title} subtitle={post.excerpt} />
      <article className="pb-24">
        <div className="container-x max-w-3xl">
          <Reveal>
            <div className="flex items-center gap-2 text-sm text-text-muted mb-8">
              <Calendar className="w-4 h-4" /> {post.date}
              <span className="mx-1">•</span>
              <span className="badge-pill !py-1 !px-3 !text-xs">{post.category}</span>
            </div>
            <div className="prose-invert space-y-5 text-text-secondary leading-relaxed">
              <p>
                This is a sample article body for <strong className="text-white">{post.title}</strong>.
                Replace this placeholder with your full content - the layout,
                typography, and styling are already in place.
              </p>
              <p>
                At Brinexa Solutions we help brands grow through design,
                development, and data-driven marketing. In this guide we'd walk
                through practical, actionable steps you can apply to your own
                brand right away.
              </p>
              <h2 className="font-heading font-bold text-2xl text-white pt-4">Key Takeaways</h2>
              <p>
                Every strategy should start with a clear goal, a defined
                audience, and a way to measure success. From there, consistency
                and iteration are what compound results over time.
              </p>
              <h2 className="font-heading font-bold text-2xl text-white pt-4">Ready to Apply This?</h2>
              <p>
                If you'd like our team to handle it for you - from strategy to
                execution - we're one message away.
              </p>
            </div>
            <div className="mt-12">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-cyan hover:gap-3 transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Back to all articles
              </Link>
            </div>
          </Reveal>
        </div>
      </article>
      <CTASection
        title="Let's Grow Your Brand Together"
        subtitle="Book a free consultation and let's talk strategy."
        primaryLabel="Get a Free Consultation"
      />
    </>
  );
}
