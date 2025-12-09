"use client";

import React, { createContext, useContext } from "react";
import useSWR from "swr";
import { getData } from "@/lib/actions";
import { useSearchParams } from "next/navigation";
import { product } from "../shop/Mini-Components/CollectionCard";

type ProductsResponse = {
  products: product[];
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

type ProductsContextType = {
  products: product[];
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  loading: boolean;
  error: any;
};

const ProductsContext = createContext<ProductsContextType | null>(null);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "20";

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const subcategory = searchParams.get("subcategory") || "";

  // Dynamically choose the correct backend route
  let url = "/products";

  if (search) {
    url = `/products/search?product=${search}&page=${page}&limit=${limit}`;
  } else if (category) {
    url = `/products/category?category=${category}&page=${page}&limit=${limit}`;
  } else if (subcategory) {
    url = `/products/subcategory?subCategory=${subcategory}&page=${page}&limit=${limit}`;
  } else {
    url = `/products?page=${page}&limit=${limit}`;
  }

  const fetcher = async (url: string) => await getData<ProductsResponse>(url);

  const { data, error, isLoading } = useSWR(url, fetcher, {
    refreshInterval: 300000,
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  return (
    <ProductsContext.Provider
      value={{
        products: data?.products || [],
        page: data?.page || 1,
        limit: data?.limit || Number(limit),
        totalPages: data?.totalPages || 1,
        hasNextPage: data?.hasNextPage || false,
        hasPrevPage: data?.hasPrevPage || false,
        loading: isLoading,
        error,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used inside ProductsProvider");
  return ctx;
}

