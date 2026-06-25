import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import Icon from "@/components/Icon";
import CTASection from "@/components/CTASection";
import { SERVICES } from "@/lib/siteData";

export const metadata = {
  title: "Our Services | Brinexa Solutions — Digital Agency Pakistan",
  description:
    "Branding, web development, digital marketing, paid ads, Amazon management & video editing. Full-service digital solutions from Brinexa Solutions.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Full-Service Digital Solutions for Modern Brands"
        subtitle="We cover every digital need your brand has — so you never have to look elsewhere."
      />

      <section className="pb-4">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 2) * 0.1}>
                <Link
                  href={`/services/${s.slug}`}
                  className="surface-card group block h-full p-9 md:p-10 cursor-pointer relative overflow-hidden"
                >
                  <div
                    className="absolute -top-16 -right-16 w-44 h-44 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "#6C3FD4", filter: "blur(60px)" }}
                  />
                  <div className="relative">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="icon-gradient-box w-14 h-14 group-hover:scale-110 transition-transform duration-300">
                        <Icon name={s.icon} className="w-7 h-7 text-brand-cyan" />
                      </div>
                      <span className="font-heading text-5xl font-extrabold text-white/5">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="font-heading font-semibold text-2xl text-white mb-3">
                      {s.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed mb-6">
                      {s.desc}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-cyan group-hover:gap-3 transition-all duration-300">
                      Explore Service <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Not Sure Which Service You Need?"
        subtitle="Let's talk. We'll analyze your brand and suggest the right solutions."
        primaryLabel="Book a Free Consultation"
      />
    </>
  );
}
