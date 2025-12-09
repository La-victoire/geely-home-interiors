"use client";

import React, { useEffect, useMemo } from "react";
import { Button } from "../ui/button";
import { useMediaQuery } from "react-responsive";
import { ArrowUpRight, Filter } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Skeleton } from "../ui/skeleton";

import CollectionCard from "./Mini-Components/CollectionCard";
import ErrorState from "./Mini-Components/ErrorState";
import SearchForm from "./Mini-Components/SearchForm";
import { useSearchParams, useRouter } from "next/navigation";
import { INTERIOR_CATEGORIES } from "../constants"
import { DiscountCarousel } from "./discount-carousel";
import { useProducts } from "../contexts/ProductsContext";
import ProductNotFound from "./Mini-Components/ProductNotFound";

const Products = () => {
  const {
    products,
    loading,
    error,
    page,
    limit,
    totalPages,
    hasNextPage,
    hasPrevPage,
  } = useProducts(); // <-- NEW STRUCTURE

  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const category = searchParams.get("category") || "";
  const query = searchParams.get("search") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const updateParams = (params: Record<string, string | number | null>) => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (!value || value === "" || value === "all") newParams.delete(key);
      else newParams.set(key, String(value));
    });

    router.push(`?${newParams.toString()}`);
  };

  const handleCategorySelect = (cat: string) => {
    updateParams({ category: cat, page: 1 });
  };

  const setQuery = (val: string) => {
    updateParams({ search: val, page: 1 });
  };

  const goPrev = () => {
    if (hasPrevPage) updateParams({ page: currentPage - 1 });
  };

  const goNext = () => {
    if (hasNextPage) updateParams({ page: currentPage + 1 });
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const delta = 2;

    for (
      let i = Math.max(1, currentPage - delta);
      i <= Math.min(totalPages, currentPage + delta);
      i++
    ) {
      pages.push(i);
    }

    if (pages[0] !== 1) {
      if ((pages[0] as number) > 2) pages.unshift("ellipsis-start");
      pages.unshift(1);
    }

    if (pages[pages.length - 1] !== totalPages) {
      if ((pages[pages.length - 1] as number) < totalPages - 1)
        pages.push("ellipsis-end");
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const xmasProducts = products.filter((p)=> p.isXmasDeal)

  // -------------------------
  // LOADING STATE
  // -------------------------

  if (loading) {
    return (
      <section className="md:p-10 px-5 py-10 w-full flex item-col">
        <div className="md:text-4xl text-3xl flex gap-10 justify-between headFont w-full mb-6">
          <h1>Collections</h1>
          <div>
            <Button>{!isMobile ? "Filter" : <Filter />}</Button>
          </div>
        </div>

        <SearchForm setQuery={setQuery} query={query} updateParams={updateParams} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-5 mt-10">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="w-full p-4">
              <Skeleton className="h-48 w-full rounded mb-3" />
              <Skeleton className="h-6 w-3/4 rounded mb-2" />
              <Skeleton className="h-4 w-1/2 rounded" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // -------------------------
  // ERROR OR EMPTY
  // -------------------------

  if (error) return <ErrorState message="Unable to load products." />;
  if (!products || products.length === 0) return <ProductNotFound />;

  // -------------------------
  // MAIN RENDER
  // -------------------------

  return (
    <section className="md:p-10 px-5 py-10 w-full flex item-col">
      <DiscountCarousel products={xmasProducts} />

      <div className="md:text-4xl text-3xl flex gap-10 justify-between headFont w-full">
        <h1>Collections</h1>

        <Drawer>
          <DrawerTrigger asChild>
            <Button>{!isMobile ? "Filter" : <Filter />}</Button>
          </DrawerTrigger>

          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle className="headFont">Categories</DrawerTitle>
                <DrawerDescription>Select your desired item</DrawerDescription>
              </DrawerHeader>

              <div className="px-3 py-4 space-y-3">
                <DrawerClose asChild>
                  <Button onClick={() => handleCategorySelect("all")}>
                    All <ArrowUpRight />
                  </Button>
                </DrawerClose>

                {(INTERIOR_CATEGORIES || []).map((data, i: number) => (
                  <DrawerClose asChild key={i}>
                    <Button className="m-3" onClick={() => handleCategorySelect(data.category)}>
                      {data.category} <ArrowUpRight />
                    </Button>
                  </DrawerClose>
                ))}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      <p className="text-primary">
        Discover our curated collection of luxury home furnishings
      </p>

      <SearchForm setQuery={setQuery} query={query} updateParams={updateParams} />

      <div className="text-3xl text-center my-10 font-bold">
        {!query ? (
          <h2>All {category || "Products"}</h2>
        ) : (
          <h2>
            Results for "<span className="text-blue-500">{query}</span>"
          </h2>
        )}
      </div>

      <section className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((p, i) => (
            <CollectionCard key={p._id ?? i} product={p} />
          ))}
        </div>
      </section>

      <Pagination className="pt-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={goPrev}
              className={!hasPrevPage ? "opacity-50 pointer-events-none" : ""}
              href="#"
            />
          </PaginationItem>

          {pageNumbers.map((num, i) =>
            num.toString().includes("ellipsis") ? (
              <PaginationItem key={`e-${i}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={num}>
                <PaginationLink
                  href="#"
                  isActive={num === currentPage}
                  onClick={() => updateParams({ page: num })}
                >
                  {num}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              onClick={goNext}
              className={!hasNextPage ? "opacity-50 pointer-events-none" : ""}
              href="#"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
};

export default Products;

