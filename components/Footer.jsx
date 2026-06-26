"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube, Phone, Mail, MapPin } from "lucide-react";
import { SITE, NAV_LINKS, SERVICES } from "@/lib/siteData";

function TikTokIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const socialIcons = [
  { Cmp: Facebook, href: SITE.socials.facebook, label: "Facebook" },
  { Cmp: Instagram, href: SITE.socials.instagram, label: "Instagram" },
  { Cmp: TikTokIcon, href: SITE.socials.tiktok, label: "TikTok" },
  { Cmp: Linkedin, href: SITE.socials.linkedin, label: "LinkedIn" },
  { Cmp: Youtube, href: SITE.socials.youtube, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="relative mt-10 border-t border-brand-border bg-brand-dark">
      <div className="gradient-divider" />
      <div className="container-x py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1 — brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Brinexa Solutions"
                width={36}
                height={36}
                className="w-32 h-16 object-cover"
              />
              
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              {SITE.tagline} — your full-service digital partner for branding,
              web, marketing, ads & Amazon.
            </p>
            <div className="flex gap-3 mt-5">
              {socialIcons.map(({ Cmp, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-lg border border-brand-border text-text-secondary hover:text-white hover:border-brand-purple hover:bg-brand-purple/10 transition-all duration-300"
                >
                  <Cmp className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {[...NAV_LINKS, { label: "Contact", href: "/contact" }].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-text-secondary hover:text-brand-cyan transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-3 text-sm">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-text-secondary hover:text-brand-cyan transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Get in Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-text-secondary">
                <Phone className="w-4 h-4 mt-0.5 text-brand-cyan shrink-0" />
                <a href={`tel:${SITE.phoneRaw}`} className="hover:text-white transition-colors">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-text-secondary">
                <Mail className="w-4 h-4 mt-0.5 text-brand-cyan shrink-0" />
                <a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors break-all">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-text-secondary">
                <MapPin className="w-4 h-4 mt-0.5 text-brand-cyan shrink-0" />
                <span>{SITE.location}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-border">
        <div className="container-x py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-text-muted">
          <p>© 2025 Brinexa Solutions. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
