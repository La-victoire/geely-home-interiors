import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/dashboard" // or any admin route you want hidden
    },
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`
  };
}
