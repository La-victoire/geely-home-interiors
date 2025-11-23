"use client"

import React, { useMemo, useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { useMediaQuery } from 'react-responsive';
import { ArrowUpRight, Filter } from 'lucide-react';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import { Skeleton } from '../ui/skeleton'
import CollectionCard from "./Mini-Components/CollectionCard"
import ErrorState from './Mini-Components/ErrorState'
import SearchForm from './Mini-Components/SearchForm';
import searchItems from '@/lib/searchItems';
import { useSearchParams, useRouter } from 'next/navigation';
import { getData } from '@/lib/actions';
import useSWR from "swr"
import { useProducts } from '../contexts/ProductsContext';

interface product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  categoryId: string;
  images?: string[];
  sku?: string;
  rating?: number;
  reviewsCount?: number;
  features: string[];
  colors?: string[];
}
type products = product[] 

const Products = () => {
  const {products, productsLoading, productsError} = useProducts() as {products:products, productsLoading:boolean, productsError:any};
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory] = useState("");
  const [productsPerPage] = useState(15);

  const searchParams = useSearchParams();
  const router = useRouter();
  const isMobile = useMediaQuery({maxWidth: 767 });

  // URL state (single source of truth)
  const category = searchParams.get("category") || "";
  const query = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  // keep local currentPage in sync with URL page
  useEffect(() => {
    if (currentPage !== page) setCurrentPage(page);
  }, [page]); // intentionally only sync from URL -> local

  // Defensive category filter: returns unique categories from array
  const categoryFilter = (arr: products | undefined, categoryKey = "category") => {
    if (!Array.isArray(arr) || arr.length === 0) return [];
    const seen = new Set<string>();
    return arr.filter((obj: any) => {
      const categoryVal = obj?.[categoryKey] ?? "";
      if (seen.has(categoryVal)) return false;
      seen.add(categoryVal);
      return true;
    });
  };

  // -----------------------
  // Memoized filtering
  // -----------------------
  const filteredProducts = useMemo(() => {
    // defensive: ensure products is an array
    if (!Array.isArray(products)) return [];

    const normalizedQuery = (query || "").toLowerCase().trim();

    return products
      .filter((p) => {
        // if category is absent or explicitly empty => allow all
        if (!category || category === "") return true;
        // p.category might be undefined — guard it
        return String(p.category) === String(category);
      })
      .filter((p) => {
        if (!normalizedQuery) return true;
        return String(p.name || "").toLowerCase().includes(normalizedQuery);
      });
  }, [products, category, query]);

  const totalPage = Math.max(1, Math.ceil((filteredProducts?.length || 0) / productsPerPage));

  // clamp page if filters shrink results
  useEffect(() => {
    if (page > totalPage) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(totalPage));
      router.push(`?${params.toString()}`);
    }
  }, [totalPage, page, router, searchParams]);

  // -----------------------
  // Memoized pagination slice
  // -----------------------
  const paginatedProducts = useMemo(() => {
    if (!Array.isArray(filteredProducts) || filteredProducts.length === 0) return [];
    // clamp currentPage to valid range defensively
    const safeCurrent = Math.min(Math.max(1, currentPage), Math.max(1, totalPage));
    const start = (safeCurrent - 1) * productsPerPage;
    return filteredProducts.slice(start, start + productsPerPage);
  }, [filteredProducts, currentPage, productsPerPage, totalPage]);

  const updateParams = (newParams: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key,value]) => {
      if (value === null || value === "" || value === "all") params.delete(key);
      else params.set(key, String(value));
    });
    router.push(`?${params.toString()}`);
  };

  const handleCategorySelect = (selectedCategory: string) => {
    updateParams({ category: selectedCategory, page: 1 });
  };

  // expose setQuery for SearchForm without changing the component
  const setQuery = (val: string) => updateParams({ search: val, page: 1 });

  const getPageNumbers = () => {
    const pagesArr: (number | string)[] = [];
    const delta = 2;
    for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPage, currentPage + delta); i++) {
      pagesArr.push(i);
    }
    if (pagesArr[0] !== 1) {
      if ((pagesArr[0] as number) > 2) pagesArr.unshift("ellipsis-start");
      pagesArr.unshift(1);
    }
    if (pagesArr[pagesArr.length - 1] !== totalPage) {
      if ((pagesArr[pagesArr.length - 1] as number) < totalPage - 1) pagesArr.push("ellipsis-end");
      pagesArr.push(totalPage);
    }
    return pagesArr;
  };
  const pageNumbers = getPageNumbers();

  const goPrev = () => {
    if (currentPage > 1) updateParams({ page: currentPage - 1 });
  };

  const goNext = () => {
    if (currentPage < totalPage) updateParams({ page: currentPage + 1 });
  };

  // -----------------------
  // Render
  // -----------------------
  if (productsLoading) {
    // show skeleton grid while loading
    const skeletonItems = Array.from({ length: Math.min(productsPerPage, 9) });
    return (
      <section className='md:p-10 px-5 py-10 w-full flex item-col'>
        <div className='md:text-4xl text-3xl flex gap-10 justify-between headFont w-full mb-6'>
          <h1>Collections</h1>
          <div>
            <Button>
              {!isMobile ? "Filter" : <Filter />}
            </Button>
          </div>
        </div>

        <div className='w-full mb-6'>
          <SearchForm 
            setQuery={setQuery}
            query={query}
            updateParams={updateParams}
          />
        </div>

        <div className='text-3xl text-center my-10 font-bold'>
          { (!query) ? (
            <h2>All {category || "Products"}</h2>
          ) : (
            <h2>
              Showing Results of "<span className="text-blue-500">{query}</span>"
            </h2>
          )}
        </div>

        <section className='w-full'>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-5'>
            {skeletonItems.map((_, i) => (
              <div key={i} className="w-full rounded-lg p-4">
                <Skeleton className="h-48 w-full rounded-md mb-3" />
                <Skeleton className="h-6 w-3/4 rounded mb-2" />
                <Skeleton className="h-4 w-1/2 rounded" />
              </div>
            ))}
          </div>
        </section>
      </section>
    )
  } else if (productsError) {
    return (
  <ErrorState
    message="Failed to fetch products. Check your connection or try again."
    onRetry={loadProducts}
  />
    )
  }

  return (
    <section className='md:p-10 px-5 py-10 w-full flex item-col'>

      {/* Collection header section */}
      <div className='md:text-4xl text-3xl flex gap-10 justify-between headFont w-full '>
        <h1>Collections</h1>
        <Drawer>
          <DrawerTrigger asChild>
            <Button>
              {!isMobile ? "Filter" : <Filter />}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className='mx-auto w-full max-w-sm'>
              <DrawerHeader>
                <DrawerTitle className='headFont'>Categories</DrawerTitle>
                <DrawerDescription>Select your desired home asset</DrawerDescription>
              </DrawerHeader>
              <div className='flex item-col hover:bg-accent px-2 gap-3 mb-20 w-full'>
                <DrawerClose asChild>
                  <Button onClick={()=> handleCategorySelect("all")}>
                    <p>All</p>
                    <ArrowUpRight />
                  </Button>
                </DrawerClose>

                {categoryFilter(products).map((data:product, index:number)=> (
                  <DrawerClose asChild key={`cat-${data?.category ?? index}`}>
                    <Button onClick={()=> updateParams({ category: `${data.category}`, page: 1 })}>
                      <p>{data.category}</p>
                      <ArrowUpRight />
                    </Button>
                  </DrawerClose>
                ))}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      <div className='w-full'>
        <SearchForm 
          setQuery={setQuery}
          query={query}
          updateParams={updateParams}
        />
        <div className='text-3xl text-center my-10 font-bold'>
          { (!query) ? (
            <h2>All {category || "Products"}</h2>
          ) : (
            <h2>
              Showing Results of "<span className="text-blue-500">{query}</span>"
            </h2>
          )}
        </div>
      </div>

      {/* Collection products section */}
      <section className='w-full'>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-5'>
          {(paginatedProducts ?? []).map((data:product, index:number) => (
            <CollectionCard key={data?.id ?? index} product={data}/>
          ))}
        </div> 
      </section>

      <Pagination className='pt-5'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={goPrev}
              className={`${currentPage === 1 && "opacity-60 pointer-events-none"}`}
              href="#"
            />
          </PaginationItem>

          {pageNumbers.map((number, index) => 
            number.toString().includes("ellipsis") ? (
              <PaginationItem key={`e-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={number as number}>
                <PaginationLink
                  href="#"
                  isActive={number === currentPage}
                  onClick={() => updateParams({ page: number as number })}
                >
                  {number}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              onClick={goNext}
              className={`${currentPage === totalPage && "opacity-60 pointer-events-none"}`}
              href="#"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  )
}

export default Products

