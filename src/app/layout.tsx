import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/Landing-Page/Footer";

export const metadata: Metadata = {
  title: "Geely Home Interiors and Accessories",
  description: "A place to find comfort and luxury for your home",
  icons: {
    icon: '/favicon.svg'
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
        {children}
        <Footer />
      </ThemeProvider>
      </body>
    </html>
  );
}
