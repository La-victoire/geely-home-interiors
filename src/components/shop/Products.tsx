"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useMediaQuery } from 'react-responsive';
import { ArrowUpRight, Filter } from 'lucide-react';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import { products } from '../constants';
import CollectionCard from "./Mini-Components/CollectionCard"
import SearchForm from './Mini-Components/SearchForm';
import searchItems from '@/lib/searchItems';

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
   const [query, setQuery] = useState("")
   const isMobile = useMediaQuery({maxWidth: 767 });

   const categoryFilter = (arr:products, categoryKey = "category") => {
    const seen = new Set();
    return arr.filter((obj:any) => {
      const category = obj[categoryKey];
      if (seen.has(category)) {
        return false; 
      }
      seen.add(category);
      return true
    });
   };

   const filteredProducts = searchItems(products, query, ["name","category"]);

  return (
    <section className='md:p-10 px-5 py-10 w-full flex item-col'>

      {/* Collection header section */}

      <div className='md:text-4xl text-3xl flex gap-10 justify-between headFont w-full '>
        <h1>Collections</h1>
        <Drawer>
          <DrawerTrigger>
            <Button>
              {!isMobile ? "Filter" : (
                <Filter />
              )}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className='mx-auto w-full max-w-sm'>
              <DrawerHeader>
                <DrawerTitle className='headFont'>Categories</DrawerTitle>
                <DrawerDescription>Select your desired home asset</DrawerDescription>
              </DrawerHeader>
              <div className='w-full'>
                {categoryFilter(products).map((data:product,index:number)=> (
                  <div key={index} className='flex hover:bg-accent p-5 justify-between w-full'>
                    <p>{data.category}</p>
                    <ArrowUpRight />
                  </div>
                ))}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      <div>
        <SearchForm setQuery={setQuery} query={query}/>
        <div className='text-3xl text-center my-10 font-bold'>
        {
          !query ? (
            <h2>
              All Products
            </h2>
          ) : (
            <h2>
              Showing Results of "<span className="text-blue-500">{query}</span>"
            </h2>
          )
        }
        </div>
      </div>

      {/* Collection products section */}

      <section className=''>
       <div className='grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-5'>
        {!query ? (
          products.slice(0,15).map((data:product,index:number) => (
           <CollectionCard key={index} product={data}/>
         ))
        ) : (
         filteredProducts.map((data:product,index:number) => (
           <CollectionCard key={index} product={data}/>
         ))
        )
        }
        </div> 
      </section>

    <Pagination className='pt-5'>
       <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" >
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
    </section>
  )
}

export default Products