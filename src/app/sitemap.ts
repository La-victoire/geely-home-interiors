// app/sitemap.ts
import axios from "axios";
import { MetadataRoute } from "next";

async function getProducts() {
  try {
    const apiRes = await axios.get(`${process.env.SERVER_URL}/products`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json",
      },
    });

    // Extract only the products array
    const products = apiRes.data?.products || [];
    // Filter out invalid products
    return products.filter((p: any) => p._id);
  } catch (err) {
    console.error("Sitemap product fetch failed:", err);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  const products = await getProducts();

  const productEntries: MetadataRoute.Sitemap = products.map((product: any) => ({
    url: `${baseUrl}/shop/products/${product._id}`,
    lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/shop/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  return [...staticEntries, ...productEntries];
}