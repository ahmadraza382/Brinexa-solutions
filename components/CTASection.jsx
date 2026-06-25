"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Button from "./Button";
import { SITE } from "@/lib/siteData";

export default function CTASection({
  title = "Ready to Build Your Digital Future?",
  subtitle = "Let's jump on a free call and discuss your goals — no strings attached.",
  primaryLabel = "Book a Free Call",
  primaryHref = "/contact",
  showWhatsApp = true,
}) {
  return (
    <section className="section-pad">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[28px] border border-brand-border px-6 py-16 md:py-20 text-center"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(108,63,212,0.18), rgba(26,26,46,0.6))",
          }}
        >
          {/* animated glow blobs */}
          <div
            className="absolute -top-24 left-1/4 w-72 h-72 rounded-full opacity-40 pointer-events-none animate-pulse-glow"
            style={{ background: "#6C3FD4", filter: "blur(100px)" }}
          />
          <div
            className="absolute -bottom-24 right-1/4 w-72 h-72 rounded-full opacity-30 pointer-events-none animate-pulse-glow"
            style={{ background: "#00C9A7", filter: "blur(100px)", animationDelay: "1.5s" }}
          />

          <div className="relative">
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-white max-w-3xl mx-auto leading-tight">
              {title}
            </h2>
            <p className="mt-4 text-text-secondary text-lg max-w-xl mx-auto">
              {subtitle}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Button href={primaryHref}>{primaryLabel}</Button>
              {showWhatsApp && (
                <Button href={SITE.whatsapp} variant="ghost" external>
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Us
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
