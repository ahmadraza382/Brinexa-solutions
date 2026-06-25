import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Quote } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import CTASection from "@/components/CTASection";
import Icon from "@/components/Icon";
import { PORTFOLIO, PORTFOLIO_DETAILS } from "@/lib/siteData";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 60;

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const catGradient = {
  Branding: "from-[#6C3FD4] to-[#9B6BFF]",
  "Web Design": "from-[#00C9A7] to-[#23B6D9]",
  "Social Media": "from-[#6C3FD4] to-[#00C9A7]",
  "Paid Ads": "from-[#9B6BFF] to-[#00C9A7]",
  Amazon: "from-[#23B6D9] to-[#6C3FD4]",
  Video: "from-[#00C9A7] to-[#6C3FD4]",
};

async function getDbProject(slugOrId) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    const supabase = createClient(url, key);
    const column = UUID_RE.test(slugOrId) ? "id" : "slug";
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq(column, slugOrId)
      .eq("published", true)
      .single();
    return data || null;
  } catch {
    return null;
  }
}

export function generateStaticParams() {
  return PORTFOLIO.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (UUID_RE.test(slug)) {
    const project = await getDbProject(slug);
    if (!project) return {};
    return { title: `${project.title} | Brinexa Portfolio`, description: project.result };
  }
  const item = PORTFOLIO.find((p) => p.slug === slug);
  const detail = PORTFOLIO_DETAILS[slug];
  if (!item || !detail) return {};
  return {
    title: `${item.title} | Brinexa Portfolio`,
    description: detail.tagline,
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;

  // --- DB project (slug or UUID) ---
  const isUUID = UUID_RE.test(slug);
  if (isUUID || !PORTFOLIO.find((p) => p.slug === slug)) {
    const project = await getDbProject(slug);
    if (!project) notFound();

    const grad = catGradient[project.category] || "from-brand-purple to-brand-cyan";
    const hasFullContent = project.challenge || project.solution;

    return (
      <>
        <PageHero eyebrow={project.category} title={project.title} subtitle={project.tagline || project.result} />

        <section className="section-pad">
          <div className="container-x">
            {/* Visual */}
            <Reveal>
              {project.cover_image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={project.cover_image} alt={project.title} className="w-full rounded-2xl object-cover max-h-[420px] mb-12" />
              ) : (
                <div className={`w-full h-56 md:h-72 rounded-2xl bg-gradient-to-br ${grad} flex items-center justify-center mb-12 relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 30%, white 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
                  <Icon name={project.icon || "Star"} className="w-24 h-24 text-white/80" />
                </div>
              )}
            </Reveal>

            {/* Meta */}
            <div className="flex flex-wrap gap-3 mb-12">
              {project.category && <span className="badge-pill">{project.category}</span>}
            </div>

            {/* Metrics */}
            {project.metrics?.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
                {project.metrics.map((m, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <div className="glass-card p-6 text-center">
                      <p className="text-3xl font-heading font-extrabold gradient-text">{m.value}</p>
                      <p className="text-text-secondary text-sm mt-1">{m.label}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}

            {/* Fallback single metric */}
            {!project.metrics?.length && project.result && (
              <div className="glass-card p-8 text-center mb-14">
                <p className="text-4xl font-heading font-extrabold gradient-text">{project.result}</p>
                <p className="text-text-secondary mt-2">Key Result</p>
              </div>
            )}

            {/* Challenge + Solution */}
            {hasFullContent && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
                {project.challenge && (
                  <Reveal>
                    <div className="surface-card p-8 h-full">
                      <h3 className="font-heading font-bold text-xl text-white mb-4">The Challenge</h3>
                      <p className="text-text-secondary leading-relaxed">{project.challenge}</p>
                    </div>
                  </Reveal>
                )}
                {project.solution && (
                  <Reveal delay={0.1}>
                    <div className="surface-card p-8 h-full">
                      <h3 className="font-heading font-bold text-xl text-white mb-4">Our Solution</h3>
                      <p className="text-text-secondary leading-relaxed">{project.solution}</p>
                    </div>
                  </Reveal>
                )}
              </div>
            )}

            {/* Services */}
            {project.services?.length > 0 && (
              <Reveal>
                <div className="surface-card p-8 mb-14">
                  <h3 className="font-heading font-bold text-xl text-white mb-5">Services Delivered</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.services.map((s, i) => (
                      <span key={i} className="flex items-center gap-2 bg-[#6C3FD4]/15 border border-[#6C3FD4]/30 text-sm text-white rounded-full px-4 py-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {/* Testimonial */}
            {project.testimonial?.quote && (
              <Reveal>
                <div className="glass-card p-8 mb-6 relative">
                  <Quote className="w-8 h-8 text-brand-purple/40 mb-4" />
                  <p className="text-text-secondary text-lg leading-relaxed italic mb-6">"{project.testimonial.quote}"</p>
                  <div>
                    <p className="text-white font-semibold">{project.testimonial.name}</p>
                    <p className="text-text-secondary text-sm">{project.testimonial.role}</p>
                  </div>
                </div>
              </Reveal>
            )}

            <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white transition-colors mt-4">
              <ArrowLeft className="w-4 h-4" /> Back to Portfolio
            </Link>
          </div>
        </section>

        <CTASection title="Like What You See?" subtitle="Let's build something this impressive for your brand." primaryLabel="Start Your Project" />
      </>
    );
  }

  // --- Static portfolio item ---
  const item = PORTFOLIO.find((p) => p.slug === slug);
  const detail = PORTFOLIO_DETAILS[slug];
  if (!item || !detail) notFound();

  const grad = catGradient[item.category] || "from-brand-purple to-brand-cyan";

  return (
    <>
      <PageHero eyebrow={item.category} title={item.title} subtitle={detail.tagline} />

      <section className="section-pad">
        <div className="container-x">
          {/* Visual banner */}
          <Reveal>
            <div className={`w-full h-56 md:h-72 rounded-2xl bg-gradient-to-br ${grad} flex items-center justify-center mb-14 relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 30%, white 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
              <Icon name={item.icon} className="w-24 h-24 text-white/80" />
            </div>
          </Reveal>

          {/* Meta row */}
          <div className="flex flex-wrap gap-3 mb-12">
            <span className="badge-pill">{item.category}</span>
            <span className="badge-pill">{detail.client}</span>
            <span className="badge-pill">{detail.year}</span>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
            {detail.metrics.map((m, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="glass-card p-6 text-center">
                  <p className="text-3xl font-heading font-extrabold gradient-text">{m.value}</p>
                  <p className="text-text-secondary text-sm mt-1">{m.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Challenge + Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
            <Reveal>
              <div className="surface-card p-8 h-full">
                <h3 className="font-heading font-bold text-xl text-white mb-4">The Challenge</h3>
                <p className="text-text-secondary leading-relaxed">{detail.challenge}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="surface-card p-8 h-full">
                <h3 className="font-heading font-bold text-xl text-white mb-4">Our Solution</h3>
                <p className="text-text-secondary leading-relaxed">{detail.solution}</p>
              </div>
            </Reveal>
          </div>

          {/* Services used */}
          <Reveal>
            <div className="surface-card p-8 mb-14">
              <h3 className="font-heading font-bold text-xl text-white mb-5">Services Delivered</h3>
              <div className="flex flex-wrap gap-3">
                {detail.services.map((s, i) => (
                  <span key={i} className="flex items-center gap-2 bg-[#6C3FD4]/15 border border-[#6C3FD4]/30 text-sm text-white rounded-full px-4 py-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Testimonial */}
          {detail.testimonial && (
            <Reveal>
              <div className="glass-card p-8 mb-6 relative">
                <Quote className="w-8 h-8 text-brand-purple/40 mb-4" />
                <p className="text-text-secondary text-lg leading-relaxed italic mb-6">
                  "{detail.testimonial.quote}"
                </p>
                <div>
                  <p className="text-white font-semibold">{detail.testimonial.name}</p>
                  <p className="text-text-secondary text-sm">{detail.testimonial.role}</p>
                </div>
              </div>
            </Reveal>
          )}

          {/* Back link */}
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white transition-colors mt-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Link>
        </div>
      </section>

      <CTASection
        title="Ready for Results Like These?"
        subtitle="Let's discuss your project and build something worth showing off."
        primaryLabel="Start Your Project"
      />
    </>
  );
}
