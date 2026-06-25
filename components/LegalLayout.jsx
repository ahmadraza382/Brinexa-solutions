import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";

export default function LegalLayout({ title, updated, children }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} />
      <section className="pb-24">
        <div className="container-x max-w-3xl">
          <Reveal>
            <p className="text-text-muted text-sm mb-10">Last updated: {updated}</p>
            <div className="space-y-8 text-text-secondary leading-relaxed">
              {children}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export function LegalSection({ heading, children }) {
  return (
    <div>
      <h2 className="font-heading font-semibold text-xl text-white mb-3">
        {heading}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
