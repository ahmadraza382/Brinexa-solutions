"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import Icon from "@/components/Icon";
import HighlightCard from "@/components/ui/highlight-card";
import { WHY_CHOOSE } from "@/lib/siteData";

export default function WhyChoose() {
  return (
    <section className="section-pad relative overflow-hidden">
      {/* glow */}
      <div
        className="absolute top-1/2 -left-40 w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none"
        style={{ background: "#6C3FD4", filter: "blur(120px)" }}
      />
      <div
        className="absolute bottom-0 -right-40 w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none"
        style={{ background: "#00C9A7", filter: "blur(130px)" }}
      />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Why Brinexa"
          title="We Don't Just Deliver Work — We Deliver Results"
          subtitle="Everything your brand needs, handled by one team that actually cares."
        />

        <div className="flex flex-wrap justify-center gap-8 mt-16">
          {WHY_CHOOSE.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
            >
              <HighlightCard
                title={item.title}
                description={item.desc}
                icon={<Icon name={item.icon} className="w-8 h-8 text-white" />}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
