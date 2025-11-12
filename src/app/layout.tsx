import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Provider from "@/components/contexts/Provider";

export const metadata: Metadata = {
  title: "Geely Home Interiors and Accessories",
  description: "Transform your business space with our curated collection of luxury furniture, lighting, and accessories. Premium interior decoration solutions for discerning clients.",
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
        <Provider>
          {children}
        </Provider>
      </ThemeProvider>
      </body>
    </html>
  );
}
