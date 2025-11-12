import { useProducts } from '@/components/contexts/ProductsContext';
import { product } from '@/components/shop/Mini-Components/CollectionCard';
import ProductDetails from '@/components/shop/ProductDetails';
import ProductHero from '@/components/shop/ProductHero';
import ProductInfo from '@/components/shop/ProductInfo';
import ProductReview from '@/components/shop/ProductReview';
import { getData } from '@/lib/actions';
import React, { Suspense } from 'react'
import useSWR from 'swr';

const page = async ({ params }: { params: Promise<{ id: string}>}) => {
  const id =  (await params).id;

  return (
    <>
      <Suspense fallback={<div className='animate-pulse text-2xl headFont text-center'>Loading...</div>}>
       <ProductDetails id = {id}/> 
      </Suspense>
    </>
  )
}

export default page