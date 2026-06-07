import type { Metadata } from "next";
import { Bebas_Neue, Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.scss";

const bebas = Bebas_Neue({ weight: "400", variable: "--font-bebas", subsets: ["latin"] });
const barlow = Barlow({ weight: ["400", "600", "700", "800"], variable: "--font-barlow", subsets: ["latin"] });
const barlowCond = Barlow_Condensed({ weight: ["700", "800"], variable: "--font-barlow-cond", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Turbo Bites | Attock's Finest Fast Food",
  description: "Experience flavor at max speed! Crave-worthy fast food prepared fresh every single night. Order Pizza, Burgers, Wraps, Fries, and more in Attock.",
  keywords: "fast food, pizza, burger, attock, delivery, turbo bites",
  openGraph: {
    title: "Turbo Bites | Attock's Finest Fast Food",
    description: "Experience flavor at max speed! Crave-worthy fast food prepared fresh every single night.",
    url: "https://turbo-bites.netlify.app",
    siteName: "Turbo Bites",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Turbo Bites",
    "description": "Experience flavor at max speed! Crave-worthy fast food prepared fresh every single night.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kamra Road",
      "addressLocality": "Attock",
      "addressCountry": "PK"
    },
    "openingHours": "Mo-Su 10:00-04:00",
    "telephone": "+923101777790",
    "menu": "https://turbo-bites.netlify.app",
    "servesCuisine": "Fast Food"
  };

  return (
    <html lang="en" className={`${bebas.variable} ${barlow.variable} ${barlowCond.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
