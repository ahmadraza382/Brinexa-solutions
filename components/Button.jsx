"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/**
 * Brand button — primary (gradient) or ghost (outline).
 * Renders as a Next Link when `href` is given, otherwise a <button>.
 */
export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  external = false,
  ...props
}) {
  const base = variant === "ghost" ? "btn-ghost" : "btn-primary";
  const cls = `${base} ${className}`;

  const MotionLink = motion(Link);

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
  };

  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
          {...motionProps}
          {...props}
        >
          {children}
        </motion.a>
      );
    }
    return (
      <MotionLink href={href} className={cls} {...motionProps} {...props}>
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button className={cls} {...motionProps} {...props}>
      {children}
    </motion.button>
  );
}
