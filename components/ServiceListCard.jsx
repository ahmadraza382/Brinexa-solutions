"use client";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Icon from "@/components/Icon";

export default function ServiceListCard({ service, index = 0 }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), {
    stiffness: 200,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), {
    stiffness: 200,
    damping: 25,
  });

  function handleMouseMove(e) {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) / r.width);
    my.set((e.clientY - r.top - r.height / 2) / r.height);
  }

  function handleMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.12 }}
      style={{ perspective: 1200 }}
      className="h-full"
    >
      <motion.div
        ref={ref}
        className="group relative h-full rounded-2xl overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          background: "linear-gradient(145deg, #11111F 0%, #0C0C18 100%)",
          border: "1px solid rgba(46,46,74,0.8)",
        }}
        whileHover={{
          boxShadow:
            "0 24px 64px rgba(108,63,212,0.18), 0 0 0 1px rgba(108,63,212,0.45)",
        }}
        transition={{ boxShadow: { duration: 0.3 } }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={() => { mx.set(0); my.set(0); }}
      >
        {/* Ambient glow */}
        <div
          className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
          style={{ background: "#6C3FD4", filter: "blur(70px)" }}
        />

        {/* Bottom-left accent */}
        <div
          className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
          style={{ background: "#00C9A7", filter: "blur(60px)" }}
        />

        <Link
          href={`/services/${service.slug}`}
          className="block p-8 md:p-10 h-full relative"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Top row: icon + outlined number */}
          <div className="flex items-start justify-between mb-7">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
              style={{
                background:
                  "linear-gradient(135deg, rgba(108,63,212,0.25), rgba(0,201,167,0.1))",
                border: "1px solid rgba(108,63,212,0.28)",
                boxShadow: "0 4px 20px rgba(108,63,212,0.12)",
              }}
            >
              <Icon name={service.icon} className="w-7 h-7 text-brand-cyan" />
            </div>

            {/* Outlined number */}
            <span
              className="font-heading font-black leading-none select-none group-hover:opacity-80 transition-opacity duration-300"
              style={{
                fontSize: "4.5rem",
                color: "transparent",
                WebkitTextStroke: "1.5px rgba(108,63,212,0.4)",
                letterSpacing: "-0.02em",
              }}
            >
              {num}
            </span>
          </div>

          {/* Divider */}
          <div
            className="w-10 h-px mb-5 group-hover:w-16 transition-all duration-300"
            style={{ background: "linear-gradient(90deg, #6C3FD4, #00C9A7)" }}
          />

          {/* Title */}
          <h3 className="font-heading font-semibold text-xl md:text-2xl text-white mb-3 group-hover:text-brand-cyan transition-colors duration-300">
            {service.title}
          </h3>

          {/* Description */}
          <p
            className="text-text-secondary leading-relaxed text-sm mb-8"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {service.short || service.desc}
          </p>

          {/* CTA */}
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-cyan group-hover:gap-3 transition-all duration-300">
            Explore Service <ArrowRight className="w-4 h-4" />
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
