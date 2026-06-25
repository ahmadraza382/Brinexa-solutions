"use client";

import { motion } from "framer-motion";

/**
 * Inner-page hero — animated mesh gradient blobs + word-reveal heading.
 * Used on About / Services / Contact for visual consistency with Home.
 */
export default function PageHero({ eyebrow, title, subtitle, children }) {
  const words = title.split(" ");

  return (
    <section className="relative overflow-hidden pt-32 pb-14 md:pt-40 md:pb-20">
      {/* Mesh blobs */}
      <div className="mesh-bg">
        <div
          className="mesh-blob animate-pulse-glow"
          style={{
            width: 480,
            height: 480,
            top: -120,
            left: -80,
            background: "#6C3FD4",
          }}
        />
        <div
          className="mesh-blob animate-pulse-glow"
          style={{
            width: 420,
            height: 420,
            top: -60,
            right: -100,
            background: "#00C9A7",
            animationDelay: "2s",
          }}
        />
      </div>

      {/* grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(108,63,212,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(108,63,212,0.25) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div className="container-x relative text-center">
        {eyebrow && (
          <motion.span
            className="badge-pill mb-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {eyebrow}
          </motion.span>
        )}

        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl leading-[1.1] hero-glow max-w-4xl mx-auto">
          {words.map((w, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.25em]"
              initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            >
              {w}
            </motion.span>
          ))}
        </h1>

        {subtitle && (
          <motion.p
            className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + words.length * 0.08 }}
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + words.length * 0.08 }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
