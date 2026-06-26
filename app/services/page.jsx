import PageHero from "@/components/PageHero";
import ServiceListCard from "@/components/ServiceListCard";
import CTASection from "@/components/CTASection";
import { getServices } from "@/lib/getServices";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Services | Brinexa Solutions — Digital Agency Pakistan",
  description:
    "Branding, web development, digital marketing, paid ads, Amazon management & video editing. Full-service digital solutions from Brinexa Solutions.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Full-Service Digital Solutions for Modern Brands"
        subtitle="We cover every digital need your brand has — so you never have to look elsewhere."
      />

      <section className="pb-4">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <ServiceListCard key={s.slug} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Not Sure Which Service You Need?"
        subtitle="Let's talk. We'll analyze your brand and suggest the right solutions."
        primaryLabel="Book a Free Consultation"
      />
    </>
  );
}
