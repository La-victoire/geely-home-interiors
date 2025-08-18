import { products } from '@/components/constants';
import ProductHero from '@/components/shop/ProductHero';
import ProductInfo from '@/components/shop/ProductInfo';
import ProductReview from '@/components/shop/ProductReview';
import React from 'react'

const page = async ({ params }: { params: Promise<{ id: string}>}) => {
  const id = (await params).id;

  const product = products.filter((item) => item.id === id)
  return (
    <>
     {product.map((item,index)=> (
      <section key={index} className='py-20 flex item-col  px-4 md:px-8'>
        <ProductHero 
        item={item}
        index={index}
        />
        <ProductInfo 
        item={item}
        />
        <ProductReview 
        item={item}
        />
      </section>
     ))}
    </>
  )
}

export default page