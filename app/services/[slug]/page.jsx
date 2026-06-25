import { notFound } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import Icon from "@/components/Icon";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Button from "@/components/Button";
import { SERVICES, SERVICE_DETAILS, PRICING_TIERS } from "@/lib/siteData";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} | Brinexa Solutions`,
    description: service.desc,
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  const detail = SERVICE_DETAILS[slug];
  if (!service || !detail) notFound();

  return (
    <>
      <PageHero eyebrow={service.title} title={detail.h1} subtitle={detail.sub}>
        <Button href="/contact">Get a Free Quote</Button>
      </PageHero>

      {/* What's Included */}
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading
            eyebrow="What's Included"
            title="Everything You Get"
            subtitle="A complete package built to move your brand forward."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 max-w-4xl mx-auto">
            {detail.included.map((item, i) => (
              <Reveal key={i} delay={(i % 2) * 0.06}>
                <div className="flex items-start gap-3 glass-card p-5">
                  <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-gradient-brand mt-0.5">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </span>
                  <span className="text-text-secondary text-sm leading-relaxed">
                    {item}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-pad relative overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
          style={{ background: "#6C3FD4", filter: "blur(140px)" }}
        />
        <div className="container-x relative">
          <SectionHeading
            eyebrow="Our Process"
            title="How We Deliver"
            subtitle="A proven workflow that keeps quality high and timelines tight."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
            {detail.process.map((step, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="surface-card p-5 text-center h-full">
                  <div className="font-heading font-extrabold text-2xl gradient-text mb-2">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="text-white text-sm font-medium leading-snug">
                    {step}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading
            eyebrow="Packages"
            title="Plans That Scale With You"
            subtitle="Transparent tiers — reach out for a custom quote on any project."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
            {PRICING_TIERS.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 0.1}>
                <div
                  className={`surface-card p-8 h-full flex flex-col relative ${
                    tier.featured ? "!border-brand-purple" : ""
                  }`}
                  style={
                    tier.featured
                      ? { boxShadow: "0 20px 60px rgba(108,63,212,0.25)" }
                      : undefined
                  }
                >
                  {tier.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 badge-pill !bg-gradient-brand !text-white !border-transparent">
                      Most Popular
                    </span>
                  )}
                  <h4 className="font-heading font-bold text-xl text-white mb-1">
                    {tier.name}
                  </h4>
                  <p className="gradient-text font-heading font-extrabold text-2xl mb-6">
                    Contact for Price
                  </p>
                  <ul className="space-y-3 flex-1">
                    {tier.points.map((p, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-text-secondary">
                        <Check className="w-4 h-4 text-brand-cyan mt-0.5 shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Button
                    href="/contact"
                    variant={tier.featured ? "primary" : "ghost"}
                    className="w-full mt-7"
                  >
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions, Answered"
            subtitle={`Common questions about our ${service.title.toLowerCase()} service.`}
          />
          <FAQ items={detail.faq} />
        </div>
      </section>

      <CTASection
        title="Ready to Get Started?"
        subtitle="Let's discuss your project and get you a free, no-obligation quote."
        primaryLabel="Get a Free Quote"
      />
    </>
  );
}
