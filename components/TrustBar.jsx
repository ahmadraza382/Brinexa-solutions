"use client";

const LOGOS = [
  "Luxe Threads",
  "NovaGoods",
  "FitFuel",
  "Zenith Co",
  "Bloom & Co",
  "Apex Media",
  "Urban Cart",
  "PrimePay",
];

export default function TrustBar() {
  // duplicate the list so the scroll loops seamlessly (-50%)
  const items = [...LOGOS, ...LOGOS];

  return (
    <section className="py-10 border-y border-brand-border/60 bg-brand-navy/30">
      <p className="text-center text-sm text-text-muted mb-6">
        Trusted by brands across Pakistan &amp; beyond
      </p>
      <div className="relative overflow-hidden">
        {/* edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-brand-dark to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-brand-dark to-transparent" />

        <div className="flex w-max animate-scroll-x gap-14 items-center">
          {items.map((name, i) => (
            <span
              key={i}
              className="font-heading font-bold text-xl whitespace-nowrap text-text-secondary/60 hover:text-white transition-colors"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
