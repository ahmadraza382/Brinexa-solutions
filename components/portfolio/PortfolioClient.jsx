"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import StatsCounter from "@/components/StatsCounter";
import CTASection from "@/components/CTASection";
import Icon from "@/components/Icon";
import { PORTFOLIO, PORTFOLIO_FILTERS } from "@/lib/siteData";

// accepts optional props from server component (Supabase data); falls back to siteData
const catGradient = {
  Branding: "from-[#6C3FD4] to-[#9B6BFF]",
  "Web Design": "from-[#00C9A7] to-[#23B6D9]",
  "Social Media": "from-[#6C3FD4] to-[#00C9A7]",
  "Paid Ads": "from-[#9B6BFF] to-[#00C9A7]",
  Amazon: "from-[#23B6D9] to-[#6C3FD4]",
  Video: "from-[#00C9A7] to-[#6C3FD4]",
};

export default function PortfolioClient({ initialProjects, initialFilters }) {
  const projectData = initialProjects ?? PORTFOLIO;
  const filterData = initialFilters ?? PORTFOLIO_FILTERS;
  const [active, setActive] = useState("All");
  const items =
    active === "All" ? projectData : projectData.filter((p) => p.category === active);

  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="Work That Speaks for Itself"
        subtitle="A look at some of our projects across design, development, and digital marketing."
      />

      <section className="pb-4">
        <div className="container-x">
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filterData.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 border ${
                  active === f
                    ? "bg-gradient-brand text-white border-transparent shadow-glow-purple"
                    : "border-brand-border text-text-secondary hover:text-white hover:border-brand-purple/50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {items.map((p, i) => (
                <motion.div
                  layout
                  key={p.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
                  whileHover={{ y: -6 }}
                >
                <Link
                  href={`/portfolio/${p.slug || p.id || p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="surface-card group overflow-hidden cursor-pointer block h-full"
                >
                  {/* gradient mockup thumbnail */}
                  <div className={`relative h-48 bg-gradient-to-br ${catGradient[p.category] || "from-brand-purple to-brand-cyan"} overflow-hidden`}>
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 30%, white 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon name={p.icon} className="w-14 h-14 text-white/90 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <span className="absolute top-3 left-3 rounded-full bg-black/40 backdrop-blur px-3 py-1 text-xs font-medium text-white">
                      {p.category}
                    </span>
                  </div>
                  {/* body */}
                  <div className="p-6">
                    <h4 className="font-heading font-semibold text-lg text-white mb-2">
                      {p.title}
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                      {p.result}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-cyan group-hover:gap-3 transition-all duration-300">
                      View Case Study <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <SectionHeading
        eyebrow="By the Numbers"
        title="Results We're Proud Of"
        className="mt-20"
      />
      <StatsCounter />

      <CTASection
        title="Your Project Could Be Next"
        subtitle="Let's create work worth showing off. Tell us what you're building."
        primaryLabel="Start Your Project"
      />
    </>
  );
}
