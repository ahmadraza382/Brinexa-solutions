"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export default function TestimonialCard({ t, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{ y: -6 }}
      className="glass-card p-8 h-full flex flex-col"
    >
      <Quote className="w-8 h-8 text-brand-purple/60 mb-4" />
      <div className="flex gap-1 mb-4">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-brand-cyan text-brand-cyan" />
        ))}
      </div>
      <p className="text-text-secondary leading-relaxed flex-1">"{t.quote}"</p>
      <div className="mt-6 flex items-center gap-3">
        <div className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-brand font-heading font-bold text-white">
          {t.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-white text-sm">{t.name}</p>
          <p className="text-text-muted text-xs">{t.position}</p>
        </div>
      </div>
    </motion.div>
  );
}
