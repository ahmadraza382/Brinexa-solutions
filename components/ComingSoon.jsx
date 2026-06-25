"use client";

import { motion } from "framer-motion";
import { Construction } from "lucide-react";
import Button from "./Button";

export default function ComingSoon({ title, note }) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="mesh-bg">
        <div
          className="mesh-blob animate-pulse-glow"
          style={{ width: 400, height: 400, top: 40, left: "10%", background: "#6C3FD4" }}
        />
        <div
          className="mesh-blob animate-pulse-glow"
          style={{ width: 360, height: 360, bottom: 0, right: "10%", background: "#00C9A7", animationDelay: "2s" }}
        />
      </div>

      <div className="container-x relative text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          className="mx-auto mb-7 flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-brand shadow-glow-purple"
        >
          <Construction className="w-10 h-10 text-white" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-heading font-extrabold text-4xl md:text-5xl hero-glow"
        >
          {title} <span className="gradient-text">Coming Soon</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-5 text-text-secondary max-w-lg mx-auto"
        >
          {note ||
            "This page is part of the full 13-page build and is ready to be developed next. The design system and animations are already in place."}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-9 flex flex-wrap justify-center gap-4"
        >
          <Button href="/">Back to Home</Button>
          <Button href="/contact" variant="ghost">
            Get in Touch
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
