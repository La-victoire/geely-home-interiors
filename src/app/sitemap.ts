// app/sitemap.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  let products: any[] = [];
  try {
    const res = await axios.get(`${process.env.SERVER_URL}/products`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json",
      },
    });
    products = res.data.products || [];
  } catch (err) {
    console.error("Sitemap product fetch failed:", err);
  }

  const urls = [
    `${baseUrl}`,
    `${baseUrl}/contact`,
    `${baseUrl}/shop/products`,
    ...products.filter((p) => p._id).map((p) => `${baseUrl}/shop/products/${p._id}`),
  ];

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