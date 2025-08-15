"use client"
import React, { useMemo, useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { useMediaQuery } from 'react-responsive';
import { ArrowUpRight, Filter } from 'lucide-react';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import { products } from '../constants';
import CollectionCard from "./Mini-Components/CollectionCard"
import SearchForm from './Mini-Components/SearchForm';
import searchItems from '@/lib/searchItems';
import { useSearchParams, useRouter } from 'next/navigation';

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
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  const categoryFilter = (arr:products, categoryKey = "category") => {
    const seen = new Set();
    return arr.filter((obj:any) => {
      const categoryVal = obj[categoryKey];
      if (seen.has(categoryVal)) return false; 
      seen.add(categoryVal);
      return true
    });
  };

  // Filter first (category -> search), then paginate
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => !category || p.category === category)
      .filter(p => !query || p.name.toLowerCase().includes(query.toLowerCase()));
  }, [products, category, query]);

  const totalPage = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage));

  // clamp page if filters shrink results
  useEffect(() => {
    if (page > totalPage) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(totalPage));
      router.push(`?${params.toString()}`);
    }
  }, [totalPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(start, start + productsPerPage);
  }, [filteredProducts, currentPage, productsPerPage]);

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

  return (
    <section className='md:p-10 px-5 py-10 w-full flex item-col'>

      {/* Collection header section */}
      <div className='md:text-4xl text-3xl flex gap-10 justify-between headFont w-full '>
        <h1>Collections</h1>
        <Drawer
        
        >
          <DrawerTrigger>
            <Button>
              {!isMobile ? "Filter" : (<Filter />)}
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
                {categoryFilter(products).map((data:product,index:number)=> (
                  <DrawerClose asChild>
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

      <div>
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
      <section className=''>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-5'>
          {paginatedProducts.map((data:product,index:number) => (
            <CollectionCard key={index} product={data}/>
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
