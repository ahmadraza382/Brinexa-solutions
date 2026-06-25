"use client";

// Animated Profile Card — 21st.dev style, adapted to JSX & brand theme.
// Spinning conic-gradient ring avatar, animated background blobs, status dot,
// hover lift, and a CTA. Generic props so it can represent a service or person.
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function AnimatedProfileCard({
  name,
  role,
  bio,
  icon,
  href = "#",
  ctaLabel = "Learn More",
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Link
        href={href}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-border bg-brand-navy/60 p-8 backdrop-blur-xl transition-colors duration-500 hover:border-brand-purple/40"
      >
        {/* animated gradient blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 -right-12 h-44 w-44 rounded-full bg-brand-purple/30 blur-3xl animate-pulse-glow" />
          <div
            className="absolute -bottom-20 -left-12 h-44 w-44 rounded-full bg-brand-cyan/20 blur-3xl animate-pulse-glow"
            style={{ animationDelay: "1.5s" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col items-center text-center">
          {/* avatar with spinning gradient ring */}
          <div className="relative mb-6 h-24 w-24">
            <div
              className="absolute inset-0 rounded-full animate-[spin_6s_linear_infinite]"
              style={{
                background:
                  "conic-gradient(from 0deg, #6C3FD4, #00C9A7, #6C3FD4, #00C9A7, #6C3FD4)",
              }}
            />
            <div className="absolute inset-[3px] flex items-center justify-center rounded-full bg-brand-dark">
              <div className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                {icon}
              </div>
            </div>
            {/* online status dot */}
            <span className="absolute bottom-1.5 right-1.5 z-10 h-4 w-4 rounded-full border-2 border-brand-dark bg-brand-cyan">
              <span className="absolute inset-0 rounded-full bg-brand-cyan animate-ping" />
            </span>
          </div>

          <h4 className="font-heading text-xl font-semibold text-white">
            {name}
          </h4>
          {role && <span className="badge-pill mt-2 mb-4">{role}</span>}
          <p className="mb-6 text-sm leading-relaxed text-text-secondary">
            {bio}
          </p>

          <span className="mt-auto inline-flex items-center gap-2 rounded-full border border-brand-purple/40 px-5 py-2 text-sm font-medium text-white transition-all duration-300 group-hover:gap-3 group-hover:bg-brand-purple/15 group-hover:shadow-glow-purple">
            {ctaLabel} <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
