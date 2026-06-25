import LegalLayout, { LegalSection } from "@/components/LegalLayout";
import { SITE } from "@/lib/siteData";

export const metadata = {
  title: "Terms of Service | Brinexa Solutions",
  description: "The terms governing the use of Brinexa Solutions' website and services.",
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" updated="June 2026">
      <p>
        These terms govern your use of the Brinexa Solutions website and the
        services we provide. By using our site or engaging our services, you
        agree to these terms.
      </p>

      <LegalSection heading="Our Services">
        <p>
          Brinexa Solutions provides branding, web development, digital
          marketing, paid advertising, Amazon management, and video editing
          services. Specific deliverables, timelines, and scope are agreed in
          writing before any project begins.
        </p>
      </LegalSection>

      <LegalSection heading="Payments">
        <p>
          Fees, payment schedules, and any milestones are defined in your
          individual proposal or retainer agreement. Retainers are billed
          monthly unless otherwise agreed.
        </p>
      </LegalSection>

      <LegalSection heading="Intellectual Property">
        <p>
          Upon full payment, final approved deliverables are transferred to you.
          We may showcase completed work in our portfolio unless you request
          otherwise in writing.
        </p>
      </LegalSection>

      <LegalSection heading="Limitation of Liability">
        <p>
          We deliver our services with professional care, but we are not liable
          for indirect or consequential losses arising from the use of our
          services to the extent permitted by law.
        </p>
      </LegalSection>

      <LegalSection heading="Contact Us">
        <p>
          Questions about these terms? Email us at{" "}
          <a href={`mailto:${SITE.email}`} className="text-brand-cyan hover:underline">
            {SITE.email}
          </a>{" "}
          or call {SITE.phone}.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
