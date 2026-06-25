import LegalLayout, { LegalSection } from "@/components/LegalLayout";
import { SITE } from "@/lib/siteData";

export const metadata = {
  title: "Privacy Policy | Brinexa Solutions",
  description: "How Brinexa Solutions collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="June 2026">
      <p>
        Brinexa Solutions ("we", "us", "our") respects your privacy. This policy
        explains what information we collect when you use our website and how we
        use it.
      </p>

      <LegalSection heading="Information We Collect">
        <p>
          When you submit our contact form, we collect the details you provide -
          such as your name, email address, phone number, and your message. We
          may also collect basic, anonymous analytics about how visitors use our
          site (pages viewed, device type, and similar).
        </p>
      </LegalSection>

      <LegalSection heading="How We Use Your Information">
        <p>
          We use the information you share solely to respond to your enquiry,
          provide our services, and improve your experience. We do not sell your
          personal data to third parties.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies">
        <p>
          Our site may use cookies and similar technologies to remember
          preferences and measure performance. You can control cookies through
          your browser settings.
        </p>
      </LegalSection>

      <LegalSection heading="Third-Party Services">
        <p>
          We may use trusted third-party tools (for example analytics or form
          processing) that handle data on our behalf under their own privacy
          terms.
        </p>
      </LegalSection>

      <LegalSection heading="Your Rights">
        <p>
          You can request access to, correction of, or deletion of your personal
          data at any time by contacting us.
        </p>
      </LegalSection>

      <LegalSection heading="Contact Us">
        <p>
          Questions about this policy? Email us at{" "}
          <a href={`mailto:${SITE.email}`} className="text-brand-cyan hover:underline">
            {SITE.email}
          </a>{" "}
          or call {SITE.phone}.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
