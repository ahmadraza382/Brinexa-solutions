"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import HeroCanvas from "@/components/HeroCanvas";
import Button from "@/components/Button";
import { SITE } from "@/lib/siteData";

const headline = ["Your", "Brand's", "New", "Best", "Friend"];

export default function HomeHero() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* 3D animated background */}
      <HeroCanvas />

      {/* dark gradient vignette so text stays readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(13,13,13,0.6) 70%, #0D0D0D 100%)",
        }}
      />

      {/* giant faded brand word behind */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.span
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.04, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="font-heading font-extrabold text-white whitespace-nowrap"
          style={{ fontSize: "clamp(6rem, 22vw, 22rem)", letterSpacing: "-0.04em" }}
        >
          BRINEXA
        </motion.span>
      </div>

      {/* content */}
      <div className="container-x relative z-10 text-center py-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <span className="badge-pill">
            <Sparkles className="w-3.5 h-3.5" />
            Full-Service Digital Agency · Pakistan
          </span>
        </motion.div>

        <h1 className="font-heading font-extrabold leading-[1.05] hero-glow text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          {headline.map((word, i) => (
            <motion.span
              key={i}
              className={`inline-block mr-[0.25em] ${
                word === "Best" || word === "Friend" ? "gradient-text" : "text-white"
              }`}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-7 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto"
        >
          From Brand Identity to Business Growth — We Handle Everything Digital
          So You Can Focus on What Matters.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.15 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="/contact">Get a Free Consultation</Button>
          <Button href="/portfolio" variant="ghost">
            See Our Work
          </Button>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 rounded-full border-2 border-text-muted/40 flex justify-center p-1.5">
          <motion.div
            className="w-1 h-2 rounded-full bg-brand-cyan"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
