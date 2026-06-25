import "./globals.css";
import { Poppins, Inter } from "next/font/google";
import LayoutShell from "@/components/LayoutShell";
import CookieBanner from "@/components/CookieBanner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://brinexasolutions.com"),
  title: {
    default: "Brinexa Solutions | Your Brand's New Best Friend",
    template: "%s | Brinexa Solutions",
  },
  description:
    "Full-service digital agency offering branding, web development, digital marketing, paid ads & Amazon management in Pakistan.",
  keywords: [
    "digital agency Pakistan",
    "branding",
    "web development",
    "digital marketing",
    "paid ads",
    "Amazon management",
    "Brinexa Solutions",
  ],
  openGraph: {
    title: "Brinexa Solutions | Your Brand's New Best Friend",
    description:
      "From Brand Identity to Business Growth — we handle everything digital so you can focus on what matters.",
    type: "website",
    locale: "en_US",
    siteName: "Brinexa Solutions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brinexa Solutions | Your Brand's New Best Friend",
    description:
      "Full-service digital agency in Pakistan — branding, web, marketing, ads & Amazon.",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#0D0D0D",
  width: "device-width",
  initialScale: 1,
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Brinexa Solutions",
  url: "https://brinexasolutions.com",
  description:
    "Full-service digital agency offering branding, web development, digital marketing, paid ads & Amazon management in Pakistan.",
  telephone: "+92 317 0796913",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Faisalabad",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <LayoutShell>{children}</LayoutShell>
        <CookieBanner />
      </body>
    </html>
  );
}
