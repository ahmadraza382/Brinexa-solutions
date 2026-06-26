import HomeHero from "@/components/home/HomeHero";
import TrustBar from "@/components/TrustBar";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import WhyChoose from "@/components/home/WhyChoose";
import ProcessSection from "@/components/home/ProcessSection";
import StatsCounter from "@/components/StatsCounter";
import CTASection from "@/components/CTASection";
import Button from "@/components/Button";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import { ArrowRight } from "lucide-react";
import { getServices } from "@/lib/getServices";
import { getTestimonials } from "@/lib/getSettings";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Brinexa Solutions | Your Brand's New Best Friend",
  description:
    "Full-service digital agency offering branding, web development, digital marketing, paid ads & Amazon management in Pakistan.",
};

export default async function HomePage() {
  const services = await getServices();
  const testimonials = await getTestimonials();

  return (
    <>
      <HomeHero />
      <TrustBar />

      {/* Services snapshot — 3D tilt + spotlight cards (21st.dev) */}
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading
            eyebrow="What We Do"
            title="Everything Your Brand Needs Under One Roof"
            subtitle="Six core services, one accountable team — no more juggling freelancers."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Button href="/services" variant="ghost">
              Explore All Services <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      <WhyChoose />
      <ProcessSection />
      <StatsCounter />

      {/* Testimonials — Circular Testimonials (21st.dev) */}
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading
            eyebrow="Testimonials"
            title="What Our Clients Say"
            subtitle="Real results, real relationships — here's what working with us feels like."
          />
          <div className="mt-16">
            <CircularTestimonials
              testimonials={testimonials.map((t) => ({
                quote: t.quote,
                name: t.name,
                designation: t.position,
                src: t.image,
              }))}
              autoplay
            />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
