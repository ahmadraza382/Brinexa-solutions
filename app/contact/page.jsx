import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/lib/siteData";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  MessageCircle,
} from "lucide-react";

export const metadata = {
  title: "Contact Brinexa Solutions | Get a Free Consultation",
  description:
    "Get in touch with Brinexa Solutions for a free consultation. We respond within 24 hours.",
};

function TikTokIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const contactItems = [
  { icon: Phone, label: "Phone / WhatsApp", value: SITE.phone, href: `tel:${SITE.phoneRaw}` },
  { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: MapPin, label: "Location", value: SITE.location },
  { icon: Clock, label: "Working Hours", value: SITE.hours },
];

const socials = [
  { Cmp: Facebook, href: SITE.socials.facebook, label: "Facebook" },
  { Cmp: Instagram, href: SITE.socials.instagram, label: "Instagram" },
  { Cmp: TikTokIcon, href: SITE.socials.tiktok, label: "TikTok" },
  { Cmp: Linkedin, href: SITE.socials.linkedin, label: "LinkedIn" },
  { Cmp: Youtube, href: SITE.socials.youtube, label: "YouTube" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Build Something Great Together"
        subtitle="Have a project in mind? Fill out the form or reach us directly — we respond within 24 hours."
      />

      <section className="pb-24">
        <div className="container-x grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <Reveal className="lg:col-span-3">
            <ContactForm />
          </Reveal>

          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            <Reveal delay={0.1}>
              <div className="surface-card p-8">
                <h3 className="font-heading font-semibold text-xl text-white mb-6">
                  Contact Information
                </h3>
                <ul className="space-y-5">
                  {contactItems.map((c) => (
                    <li key={c.label} className="flex items-start gap-4">
                      <div className="icon-gradient-box shrink-0">
                        <c.icon className="w-5 h-5 text-brand-cyan" />
                      </div>
                      <div>
                        <p className="text-text-muted text-xs mb-0.5">{c.label}</p>
                        {c.href ? (
                          <a
                            href={c.href}
                            className="text-white text-sm hover:text-brand-cyan transition-colors break-all"
                          >
                            {c.value}
                          </a>
                        ) : (
                          <p className="text-white text-sm">{c.value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="gradient-divider my-7" />

                <p className="text-text-muted text-xs mb-3">Follow us</p>
                <div className="flex gap-3">
                  {socials.map(({ Cmp, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex items-center justify-center w-10 h-10 rounded-lg border border-brand-border text-text-secondary hover:text-white hover:border-brand-purple hover:bg-brand-purple/10 transition-all"
                    >
                      <Cmp className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="surface-card p-6 flex items-center gap-4 group !border-brand-cyan/30 hover:!border-brand-cyan"
              >
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
                  style={{ background: "#25D366" }}
                >
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-white">
                    Prefer WhatsApp?
                  </p>
                  <p className="text-text-secondary text-sm">
                    Chat with us instantly →
                  </p>
                </div>
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
