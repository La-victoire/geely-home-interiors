// app/sitemap.ts
import { product } from '@/components/shop/Mini-Components/CollectionCard';
import { getData, productsApiResponse } from '@/lib/actions';
import { MetadataRoute } from 'next';


async function getProducts(): Promise<productsApiResponse<unknown>| undefined>{
  // Replace this with your actual data fetching logic (e.g., fetching from a CMS, database, or API)
  const res = await getData("/products");
  return res;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL; // !! IMPORTANT: Replace with your actual .vercel.app domain

  const products = await getProducts();

  const productEntries: MetadataRoute.Sitemap = products?.products.map((product) => ({
    url: `${baseUrl}/shop/products/${product._id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly', // How often this page changes
    priority: 0.8, // Priority relative to other pages (0.0 to 1.0)
  }));

  // Define static pages separately
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`, // Home page
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1, // Highest priority
    },
    {
      url: `${baseUrl}/contact`, // Contact page
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/shop/products`, // Main product listing page
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    // Add your profile, about, etc. static pages here
  ];

  // Combine static and dynamic entries
  return [...staticEntries, ...productEntries];
}
