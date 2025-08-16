import { products } from '@/components/constants';
import ProductHero from '@/components/shop/ProductHero';
import React from 'react'

const page = async ({ params }: { params: Promise<{ id: string}>}) => {
  const id = (await params).id;

  const product = products.filter((item) => item.id === id)
  return (
    <>
    <section className='py-10 px-4 md:px-8'>
     {product.map((item,index)=> (
      <ProductHero 
       key={index}
       item={item}
       index={index}
      />
     ))}
    </section>
    </>
  )
}

export default page