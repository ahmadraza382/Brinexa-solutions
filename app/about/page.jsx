import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import CTASection from "@/components/CTASection";
import { VALUES, TEAM } from "@/lib/siteData";
import { Target, Eye, Linkedin } from "lucide-react";

export const metadata = {
  title: "About Brinexa Solutions | Who We Are",
  description:
    "Brinexa Solutions is a full-service digital agency from Pakistan dedicated to helping brands grow through design, marketing & technology.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Building Digital Futures Together"
        subtitle="We are Brinexa Solutions — a creative agency born from a passion for helping brands thrive in the digital world."
      />

      {/* Our Story */}
      <section className="section-pad">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative">
              <div className="glass-card p-10 relative overflow-hidden">
                <div
                  className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-30 animate-pulse-glow"
                  style={{ background: "#6C3FD4", filter: "blur(80px)" }}
                />
                <span className="badge-pill mb-5">Our Story</span>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-5">
                  One Team. One Vision. Everything Digital.
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  We started Brinexa Solutions with one mission: to give every
                  brand — big or small — access to world-class digital support
                  without the big agency price tag.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  We saw too many businesses juggling one freelancer for design,
                  another for marketing, someone else for their website, and yet
                  another for ads. It was chaotic, expensive, and inconsistent.
                  So we built Brinexa — one team, one vision, everything digital
                  under one roof.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-5">
            <Reveal delay={0.1}>
              <div className="surface-card p-8 h-full">
                <div className="icon-gradient-box mb-5">
                  <Target className="w-6 h-6 text-brand-cyan" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-white mb-3">
                  Our Mission
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  To deliver end-to-end digital solutions that help brands grow,
                  compete, and win — with clarity, creativity, and data.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="surface-card p-8 h-full sm:mt-10">
                <div className="icon-gradient-box mb-5">
                  <Eye className="w-6 h-6 text-brand-cyan" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-white mb-3">
                  Our Vision
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  To become the go-to digital partner for brands across Pakistan
                  and South Asia.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none"
          style={{ background: "#00C9A7", filter: "blur(130px)" }}
        />
        <div className="container-x relative">
          <SectionHeading
            eyebrow="Our Values"
            title="What We Stand For"
            subtitle="The principles behind every project we take on."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 0.1}>
                <div className="surface-card p-8 h-full">
                  <div className="icon-gradient-box mb-5">
                    <Icon name={v.icon} className="w-6 h-6 text-brand-cyan" />
                  </div>
                  <h4 className="font-heading font-semibold text-lg text-white mb-2">
                    {v.title}
                  </h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our Team"
            title="Meet the People Behind Brinexa"
            subtitle="A small, senior team that treats your brand like our own."
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={(i % 4) * 0.1}>
                <div className="surface-card p-6 text-center group">
                  <div className="relative mx-auto mb-5 w-24 h-24">
                    <div className="absolute inset-0 rounded-full bg-gradient-brand opacity-80 group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-[3px] rounded-full bg-brand-navy flex items-center justify-center">
                      <span className="font-heading font-extrabold text-2xl gradient-text">
                        {m.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                  </div>
                  <h4 className="font-heading font-semibold text-white">
                    {m.name}
                  </h4>
                  <p className="text-text-muted text-xs mt-1 mb-3">{m.role}</p>
                  <a
                    href="#"
                    aria-label={`${m.name} on LinkedIn`}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-brand-border text-text-secondary hover:text-white hover:border-brand-purple transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want to Work With Us?"
        subtitle="Let's talk about your brand and where you want to take it."
        primaryLabel="Get a Free Consultation"
      />
    </>
  );
}
