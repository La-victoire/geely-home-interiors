"use client"
import React from 'react'
import ProductHero from './ProductHero'
import ProductInfo from './ProductInfo'
import ProductReview from './ProductReview'
import { getData } from '@/lib/actions'
import useSWR from 'swr'
import ProductHeroSkeleton from './Mini-Components/ProductLoading'
import ErrorState from './Mini-Components/ErrorState'
import ProductNotFound from './Mini-Components/ProductNotFound'

const ProductDetails = ({id}:{id:string}) => {

  const fetcher = async (url: string) => await getData<any>(url);
  const { data:product, error:productError, isLoading:productLoading } = useSWR(`/products/${id}`, fetcher);

  if(productLoading) return <ProductHeroSkeleton />
  if(productError) return <ErrorState />
  if(!product) return <ProductNotFound />
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