"use client";

// Adapted from the 21st.dev / Aceternity UI "Infinite Moving Cards" component.
// Brand-matched (glassmorphism, purple/cyan) for Brinexa Solutions.
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { Star, Quote } from "lucide-react";

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}) {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const dup = item.cloneNode(true);
        scrollerRef.current.appendChild(dup);
      });
      // direction
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
      // speed
      const dur =
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "60s";
      containerRef.current.style.setProperty("--animation-duration", dur);
      setStart(true);
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-4",
          start && "animate-infinite-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="relative w-[320px] max-w-full shrink-0 rounded-2xl px-8 py-6 md:w-[420px] glass-card"
          >
            <Quote className="w-7 h-7 text-brand-purple/60 mb-3" />
            <div className="flex gap-1 mb-3">
              {Array.from({ length: item.rating || 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-brand-cyan text-brand-cyan"
                />
              ))}
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              "{item.quote}"
            </p>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-brand font-heading font-bold text-white text-sm">
                {item.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-white text-sm">{item.name}</p>
                <p className="text-text-muted text-xs">{item.position}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
