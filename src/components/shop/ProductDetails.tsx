"use client"
import React from 'react'
import ProductHero from './ProductHero'
import ProductInfo from './ProductInfo'
import ProductReview from './ProductReview'
import { getData } from '@/lib/actions'
import useSWR from 'swr'

const ProductDetails = ({id}:{id:string}) => {

  const fetcher = async (url: string) => await getData<any>(url);
  const { data:product, error:productError, isLoading:productLoading } = useSWR(`/products/${id}`, fetcher);

  if(productLoading) return <div className='animate-pulse text-2xl headFont text-center'>Loading...</div>
  if(productError) return <div>Error loading product.</div>
  if(!product) return <div>No product found.</div>
  return (
     <section className='py-20 flex item-col  px-4 md:px-8'>
          <ProductHero 
          item={product}
          />
          <ProductInfo 
          item={product}
          />
          <ProductReview 
          item={product}
          />
      </section>
  )
}

export default ProductDetails