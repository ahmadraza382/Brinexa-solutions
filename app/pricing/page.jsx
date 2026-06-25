import { Check, ArrowRight, Sparkles } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import FAQ from "@/components/FAQ";
import Button from "@/components/Button";
import CTASection from "@/components/CTASection";
import { PRICING_TIERS } from "@/lib/siteData";

export const metadata = {
  title: "Pricing & Packages | Brinexa Solutions",
  description:
    "Flexible and transparent pricing for branding, web development, digital marketing & advertising.",
};

const pricingFaq = [
  { q: "Do you offer installment payments?", a: "Yes - for larger projects we can split payments into milestones. We'll agree a schedule before any work begins." },
  { q: "What exactly is in a retainer?", a: "Each retainer bundles a set scope of monthly work (content, design, ads, etc.). We tailor the exact deliverables to your goals during onboarding." },
  { q: "Can I upgrade or downgrade later?", a: "Absolutely. Plans are month-to-month and you can change tier any time as your needs grow." },
  { q: "Do you give long-term discounts?", a: "Yes - quarterly and annual commitments come with preferential rates. Ask us for a custom quote." },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Flexible Plans. Transparent Pricing."
        subtitle="Whether you're a startup or an established brand - we have a solution that fits your budget."
      />

      {/* Retainer packages */}
      <section className="pb-4">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRICING_TIERS.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 0.1}>
                <div
                  className={`surface-card p-8 h-full flex flex-col relative ${tier.featured ? "!border-brand-purple" : ""}`}
                  style={tier.featured ? { boxShadow: "0 20px 60px rgba(108,63,212,0.25)" } : undefined}
                >
                  {tier.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 badge-pill !bg-gradient-brand !text-white !border-transparent">
                      <Sparkles className="w-3.5 h-3.5" /> Most Popular
                    </span>
                  )}
                  <h3 className="font-heading font-bold text-2xl text-white mb-1">
                    {tier.name}
                  </h3>
                  <p className="gradient-text font-heading font-extrabold text-3xl mb-6">
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
                    className="w-full mt-8"
                  >
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Project-based */}
          <Reveal delay={0.1}>
            <div className="glass-card max-w-5xl mx-auto mt-8 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div>
                <h3 className="font-heading font-semibold text-xl text-white mb-2">
                  Have a one-time project?
                </h3>
                <p className="text-text-secondary text-sm max-w-xl">
                  Not every brand needs a monthly retainer. For one-off websites,
                  brand identities, or campaigns, we'll scope a custom quote.
                </p>
              </div>
              <Button href="/contact" className="shrink-0">
                Request a Custom Quote
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading
            eyebrow="FAQ"
            title="Pricing Questions, Answered"
            subtitle="Everything you need to know before getting started."
          />
          <FAQ items={pricingFaq} />
        </div>
      </section>

      <CTASection
        title="Still Have Questions?"
        subtitle="Book a free consultation and we'll recommend the right plan for your goals."
        primaryLabel="Book a Free Call"
      />
    </>
  );
}
