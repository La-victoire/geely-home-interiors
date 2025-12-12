// app/robots.ts
import { NextResponse } from "next/server";

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /dashboard

Sitemap: ${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`;

  return new NextResponse(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
}