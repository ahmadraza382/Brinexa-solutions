"use client";

// Adapted from the 21st.dev / Aceternity UI "Animated Testimonials".
// Photos replaced with brand gradient avatars; icons via lucide-react.
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useEffect, useState } from "react";

export function AnimatedTestimonials({ testimonials, autoplay = true }) {
  const [active, setActive] = useState(0);

  const handleNext = () => setActive((p) => (p + 1) % testimonials.length);
  const handlePrev = () =>
    setActive((p) => (p - 1 + testimonials.length) % testimonials.length);
  const isActive = (i) => i === active;

  useEffect(() => {
    if (!autoplay) return;
    const t = setInterval(handleNext, 5000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay]);

  const rotations = ["-8deg", "6deg", "-4deg", "9deg", "-6deg"];

  return (
    <div className="mx-auto max-w-5xl px-4">
      <div className="relative grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
        {/* Visual stack */}
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((t, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9, z: -100, rotate: rotations[index % rotations.length] }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.55,
                    scale: isActive(index) ? 1 : 0.92,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? "0deg" : rotations[index % rotations.length],
                    zIndex: isActive(index) ? 40 : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -form(index), 0] : 0,
                  }}
                  exit={{ opacity: 0, scale: 0.9, z: 100, rotate: rotations[index % rotations.length] }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom"
                >
                  <div className="h-full w-full rounded-[24px] glass-card flex flex-col items-center justify-center p-8 text-center">
                    <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-brand font-heading font-extrabold text-white text-4xl shadow-glow-purple">
                      {t.name.charAt(0)}
                    </div>
                    <p className="mt-5 font-heading font-semibold text-white text-lg">
                      {t.name}
                    </p>
                    <p className="text-text-muted text-sm">{t.position}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex gap-1 mb-5">
              {Array.from({ length: testimonials[active].rating || 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-brand-cyan text-brand-cyan" />
              ))}
            </div>
            <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
              "{testimonials[active].quote}"
            </p>
          </motion.div>

          <div className="flex gap-4 pt-10">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="group/btn flex h-11 w-11 items-center justify-center rounded-full surface-card"
            >
              <ArrowLeft className="h-5 w-5 text-white transition-transform duration-300 group-hover/btn:-translate-x-0.5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="group/btn flex h-11 w-11 items-center justify-center rounded-full surface-card"
            >
              <ArrowRight className="h-5 w-5 text-white transition-transform duration-300 group-hover/btn:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// small helper for subtle float amount
function form(i) {
  return 6 + (i % 3) * 2;
}
