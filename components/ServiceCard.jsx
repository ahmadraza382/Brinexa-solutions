"use client";

import { motion } from "framer-motion";
import Icon from "./Icon";
import { AnimatedProfileCard } from "./ui/animated-profile-card";

export default function ServiceCard({ service, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="h-full"
    >
      <AnimatedProfileCard
        name={service.title}
        role="Service"
        bio={service.short || service.desc}
        href={`/services/${service.slug}`}
        ctaLabel="Learn More"
        icon={
          <Icon name={service.icon} className="w-8 h-8 text-brand-cyan" strokeWidth={2} />
        }
      />
    </motion.div>
  );
}
