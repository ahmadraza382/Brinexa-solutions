"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { PROCESS } from "@/lib/siteData";

export default function ProcessSection() {
  return (
    <section className="section-pad relative">
      <div className="container-x">
        <SectionHeading
          eyebrow="How We Work"
          title="A Simple Process That Delivers"
          subtitle="Four clear steps from first hello to measurable growth."
        />

        <div className="relative mt-16">
          {/* connecting line (desktop) */}
          <div
            className="hidden lg:block absolute top-[34px] left-[12%] right-[12%] h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, #6C3FD4, #00C9A7, transparent)",
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative text-center"
              >
                <div className="relative z-10 mx-auto mb-6 flex items-center justify-center w-[68px] h-[68px] rounded-full bg-brand-navy border border-brand-border">
                  <span className="font-heading font-extrabold text-2xl gradient-text">
                    {p.step}
                  </span>
                  <span className="absolute inset-0 rounded-full animate-pulse-glow" style={{ boxShadow: "0 0 24px rgba(108,63,212,0.4)" }} />
                </div>
                <h4 className="font-heading font-semibold text-lg text-white mb-2">
                  {p.title}
                </h4>
                <p className="text-text-secondary text-sm leading-relaxed max-w-[220px] mx-auto">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
