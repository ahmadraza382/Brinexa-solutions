"use client";

// Adapted from the 21st.dev / Aceternity UI "Card Spotlight".
// A radial brand-colored glow follows the cursor across the card surface.
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export function CardSpotlight({
  children,
  radius = 350,
  color = "rgba(108, 63, 212, 0.25)",
  className,
  ...props
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hovering, setHovering] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group/spotlight relative overflow-hidden rounded-card surface-card",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 rounded-card opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, ${color}, transparent 70%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
