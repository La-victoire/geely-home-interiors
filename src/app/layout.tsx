import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Provider from "@/components/contexts/Provider";
import { SITE_META } from "@/components/constants";

export const metadata: Metadata = {
  title: {
    default: SITE_META.name,
    template: "%s | Geely Home Interiors"
  },
  description: SITE_META.description,
  icons: {
    icon: '/favicon.svg'
  },
  keywords: SITE_META.keywords,
  authors: [{
    name: "Geely Home Interiors",
    url: SITE_META.domain
  }],
  creator: "Levr_Studios",
  publisher: "Levr_Studios",
  openGraph: {
    title: "Geely Home Interiors | Luxury Interior Accessories",
    description: SITE_META.description,
    url: SITE_META.domain,
    siteName: "Geely Home Interiors",
    images: [{
      url: "/couch.jpg",
      width: 1200,
      height: 630,
      alt: "Luxury Interiors by Geely"
    }],
    locale:"en_NG",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Geely Home Interiors | Luxury Interior Accessories",
    description:
      "Luxury home accessories and elegant decor collections to elevate your space.",
    creator: "@geelyinteriors",
    images: ["/couche.jpg"]
  },
  alternates: {
    canonical: "https://www.geelyhomeinteriors.com",
    languages: {
      "en-US": "https://www.geelyhomeinteriors.com/en",
      "en-NG": "https://www.geelyhomeinteriors.com/ng"
    }
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  manifest: "/site.webmanifest",
  category: "Interior Design",
  other: {
    "application-name": "Geely Home Interiors",
    "theme-color": "#ffffff",
    "msapplication-TileColor": "#ffffff"
  }

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`antialiased`}
      >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Provider>
          {children}
        </Provider>
      </ThemeProvider>
      </body>
    </html>
  );
}
