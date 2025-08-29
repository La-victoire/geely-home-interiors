import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/Landing-Page/Footer";
import Navbar from "@/components/Landing-Page/Navbar";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Toaster } from "sonner";
import { CartProvider } from "@/components/contexts/CartContext";

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
      <CartProvider>
       <LayoutWrapper>
          {children}
        <Toaster position='bottom-right' richColors closeButton />
       </LayoutWrapper>
      </CartProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}
