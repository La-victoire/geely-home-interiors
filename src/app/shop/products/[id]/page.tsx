import Script from "next/script";
import axios, { AxiosRequestConfig } from "axios";
import { Suspense } from "react";
import ProductDetails from "@/components/shop/ProductDetails";
import { getData } from "@/lib/actions"; // whatever function fetches your product
import { product } from "@/components/shop/Mini-Components/CollectionCard";
import ErrorState from "@/components/shop/Mini-Components/ErrorState";
import type { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {

  const { id } = await params

  const product = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/${id}`);

  if (!product) {
    return {
      title: "Product Not Found | Geely Home Interiors",
      description: "The product you are looking for does not exist.",
    };
  }

  const url = `${process.env.NEXT_PUBLIC_APP_URL}/shop/products/${product._id}`;
  const ogImage = typeof product.images?.[0] === "string" ? product.images[0] : product.images?.[0]?.url ?? "/images/big-parlour.jpg";

  return {
    title: `${product.name}`,
    description: product.description,
    
    alternates: { canonical: url },

    openGraph: {
      title: product.name,
      description: product.description,
      url,
      siteName: "Geely Home Interiors",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: product.name
        }
      ]
    },


    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [ogImage],
    },
  };
}


export default async function Page({ params }: { params: { id: string } }) {

  const { id } = await params
  const product = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/${id}`);
  console.log(product.response)

  // This protects your SEO from invalid schema
  if (!product || !product._id) return <ErrorState />;

  const schemaData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images, // array
    description: product.description,
    offers: {
      "@type": "Offer",
      url: `${process.env.NEXT_PUBLIC_APP_URL}/shop/products/${product._id}`,
      priceCurrency: "NGN",
      price: product.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Geely Home Interiors",
      },
    },
  };

  return (
    <>
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <Suspense fallback={<div className="animate-pulse text-2xl headFont text-center">Loading...</div>}>
        <ProductDetails id={id} />
      </Suspense>
    </>
  );
}
