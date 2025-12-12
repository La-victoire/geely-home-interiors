// app/sitemap.ts (Optimized)
import { NextResponse } from "next/server";
import axios from "axios";

// Define a type interface for clarity
interface Product {
  _id: string;
  // ... other product fields you might use
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://yourdefaultdomain.com'; // Add a fallback

  let products: Product[] = [];
  try {
    // Use the Fetch API built into Next.js/Node.js, if possible, instead of axios
    const serverUrl = process.env.SERVER_URL;
    if (serverUrl) {
        const res = await fetch(`${serverUrl}/products`, {
            // Next.js handles user-agent headers implicitly, simpler to omit
            headers: {
                Accept: "application/json",
            },
            // Optional: configure caching for the fetch request
            next: { revalidate: 3600 }, // Revalidate data every hour
        });
        
        if (!res.ok) {
            throw new Error(`API fetch failed with status: ${res.status}`);
        }

        const data = await res.json();
        products = data.products || [];

    } else {
        console.error("SERVER_URL environment variable is not set.");
    }

  } catch (err) {
    console.error("Sitemap product fetch failed:", err);
    // Continue building sitemap even if products fail to load
  }

  const urls = [
    `${baseUrl}`,
    `${baseUrl}/contact`,
    `${baseUrl}/shop/products`,
    ...products
      .filter((p) => p._id)
      .map((p) => `${baseUrl}/shop/products/${p._id}`),
  ];

  // The XML generation logic remains the same
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls
  .map(
    (url) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join("")}
</urlset>`;

  return new NextResponse(sitemapXml, {
    headers: { "Content-Type": "application/xml" },
  });
}
