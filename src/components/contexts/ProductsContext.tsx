"use client"
import React, { useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
import { getData } from '@/lib/actions';
import useSWR from 'swr';
import { product } from '../shop/Mini-Components/CollectionCard';

const ProductContext = createContext({});

export function ProductsProvider({ children}: {children:React.ReactNode}) {
  const fetcher = async (url: string) => await getData<any>(url);
  const [products, setProducts] = useState<product[]>([]);
  const [pages, setPages] = useState();
  const { data, error:productsError, isLoading:productsLoading } = useSWR("/products", fetcher, { refreshInterval: 300000, revalidateOnFocus: false, revalidateIfStale: false });

  useEffect(() => {
    if (data)
      setProducts(data.products || []);
      setPages(data);
  }, [data]);
  return (
    <ProductContext.Provider value={{products,productsError,productsLoading,pages}}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used inside ProductsProvider");
  }
  return context;
}
