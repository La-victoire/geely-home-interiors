import BackButton from '@/components/shop/Mini-Components/BackButton'
import WishListProducts from '@/components/shop/WishListProducts'
import { Heart } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <section className='py-20 px-5'>
      <BackButton />
      <h1 className='flex item-row gap-2 items-center text-4xl my-5 headFont'>
       Wishlist <Heart size={30} /> 
      </h1>
      <section className='md:px-10 py-5'>
        <WishListProducts />
      </section>
    </section>
  )
}

export default page