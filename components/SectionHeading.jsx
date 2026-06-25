"use client";

import Reveal from "./motion/Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
  className = "",
}) {
  return (
    <div
      className={`${center ? "text-center mx-auto" : ""} max-w-3xl ${className}`}
    >
      {eyebrow && (
        <Reveal>
          <span className="badge-pill mb-4">{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="font-heading font-bold text-3xl md:text-5xl leading-tight text-white">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-base md:text-lg text-text-secondary">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
