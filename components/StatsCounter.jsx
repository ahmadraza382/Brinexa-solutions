"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Icon from "./Icon";
import { STATS } from "@/lib/siteData";

function Counter({ value, suffix, duration = 1800 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="section-pad relative overflow-hidden">
      {/* ambient glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full opacity-20 pointer-events-none"
        style={{ background: "#6C3FD4", filter: "blur(140px)" }}
      />
      <div className="container-x relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-brand-border bg-brand-navy/50 backdrop-blur-xl p-6 md:p-8 text-center transition-colors duration-300 hover:border-brand-purple/40"
            >
              {/* top gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-brand opacity-60 group-hover:opacity-100 transition-opacity" />
              {/* hover glow */}
              <div
                className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "#6C3FD4", filter: "blur(50px)" }}
              />

              <div className="relative">
                <div className="mx-auto mb-4 flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-brand-purple/20 to-brand-cyan/20 border border-brand-purple/30 group-hover:scale-110 transition-transform duration-300">
                  <Icon name={s.icon} className="w-6 h-6 text-brand-cyan" />
                </div>
                <div className="font-heading font-extrabold text-4xl md:text-5xl gradient-text">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm md:text-base text-text-secondary">
                  {s.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
