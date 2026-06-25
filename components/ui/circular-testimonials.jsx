"use client";

// Circular Testimonials — from 21st.dev, adapted to JSX.
// Rotating 3D image stack on one side, word-animated quote + arrow nav on the
// other. Brand-themed defaults (dark). Icons via lucide-react.
import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

function calculateGap(width) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return maxGap;
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export function CircularTestimonials({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
}) {
  const colorName = colors.name ?? "#FFFFFF";
  const colorDesignation = colors.designation ?? "#888888";
  const colorTestimony = colors.testimony ?? "#AAAAAA";
  const colorArrowBg = colors.arrowBackground ?? "#1A1A2E";
  const colorArrowFg = colors.arrowForeground ?? "#FFFFFF";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#6C3FD4";

  const fontSizeName = fontSizes.name ?? "1.5rem";
  const fontSizeDesignation = fontSizes.designation ?? "0.9rem";
  const fontSizeQuote = fontSizes.quote ?? "1.125rem";

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef(null);
  const autoplayRef = useRef(null);

  const len = useMemo(() => testimonials.length, [testimonials]);
  const active = useMemo(() => testimonials[activeIndex], [activeIndex, testimonials]);

  useEffect(() => {
    function update() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleNext = useCallback(
    () => setActiveIndex((p) => (p + 1) % len),
    [len]
  );
  const handlePrev = useCallback(
    () => setActiveIndex((p) => (p - 1 + len) % len),
    [len]
  );

  useEffect(() => {
    if (!autoplay) return;
    autoplayRef.current = setInterval(handleNext, 5000);
    return () => clearInterval(autoplayRef.current);
  }, [autoplay, handleNext]);

  function getImageStyle(index) {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + len) % len === index;
    const isRight = (activeIndex + 1) % len === index;
    const base = {
      position: "absolute",
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "1.5rem",
      border: "1px solid rgba(108,63,212,0.25)",
      boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
      transition: "all 0.8s cubic-bezier(0.4,0.2,0.2,1)",
    };
    if (isActive)
      return { ...base, zIndex: 3, opacity: 1, transform: "translateX(0) translateY(0) scale(1) rotateY(0deg)" };
    if (isLeft)
      return { ...base, zIndex: 2, opacity: 1, transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)` };
    if (isRight)
      return { ...base, zIndex: 2, opacity: 1, transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)` };
    return { ...base, zIndex: 1, opacity: 0, transform: "translateX(0) translateY(0) scale(0.8)" };
  }

  const words = active.quote.split(" ");

  return (
    <div className="mx-auto w-full max-w-5xl px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Image stack */}
        <div
          ref={imageContainerRef}
          className="relative w-full"
          style={{ height: "360px", perspective: "1000px" }}
        >
          {testimonials.map((t, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={index}
              src={t.src}
              alt={t.name}
              style={getImageStyle(index)}
              draggable={false}
            />
          ))}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between" style={{ minHeight: "300px" }}>
          <div>
            <h3 className="font-heading font-bold" style={{ color: colorName, fontSize: fontSizeName }}>
              {active.name}
            </h3>
            <p style={{ color: colorDesignation, fontSize: fontSizeDesignation, marginBottom: "1.5rem" }}>
              {active.designation}
            </p>
            <motion.p
              key={activeIndex}
              style={{ color: colorTestimony, fontSize: fontSizeQuote, lineHeight: 1.7 }}
            >
              {words.map((w, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, filter: "blur(8px)", y: 6 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut", delay: 0.022 * i }}
                  style={{ display: "inline-block" }}
                >
                  {w}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </div>

          <div className="flex gap-6 pt-10">
            <button
              onClick={handlePrev}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              aria-label="Previous testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-300"
              style={{ backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg, border: "1px solid #2E2E4A" }}
            >
              <ArrowLeft size={20} color={colorArrowFg} />
            </button>
            <button
              onClick={handleNext}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              aria-label="Next testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-300"
              style={{ backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg, border: "1px solid #2E2E4A" }}
            >
              <ArrowRight size={20} color={colorArrowFg} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
