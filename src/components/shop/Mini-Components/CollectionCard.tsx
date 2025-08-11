import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
import React from 'react'

export type product = {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    category: string;
    categoryId: string;
    images: string[];
    sku?: string;
    rating?: number;
    reviewsCount?: number;
    features: string[];
    colors?: string[];
}

interface products { 
  product:product
}

const CollectionCard:React.FC<products>  = ({product}) => {
  return (
    <Card className='lg:w-[30dvw] relative gap-0 p-0 h-[70dvh]'>
      <img 
      src={product.images[0]}
      alt='product-image'
      className='w-full relative rounded-t-2xl h-full not-sm:rounded-2xl md:h-1/2 object-cover'
      />
      <div className='absolute not-sm:flex hidden item-col pointer-events-none justify-end py-3 rounded-2xl bg-black/40 w-full h-full'/> 
      <div className='flex not-sm:text-white p-5 not-sm:absolute bottom-0 text-center item-col gap-3'>
        <p className='headFont'>{product.name}</p>
        <p>{product.description}</p>
        <div className='flex justify-between'>
          <p className='text-[#ed9e59] font-bold text-xl'>${product.price}</p>
          <p className='flex gap-2 flex-center'><Star fill='#ed9e59' className='text-[#ed9e59]' /> {product.rating} ({product.reviewsCount})</p>
        </div>
        <Button>View Details</Button>
      </div>
    </Card>
  )
}

export default CollectionCard