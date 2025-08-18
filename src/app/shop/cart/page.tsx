import CartProducts from '@/components/shop/CartProducts'
import BackButton from '@/components/shop/Mini-Components/BackButton'
import React from 'react'

const page = () => {

  return (
    <main className='md:px-10 px-2 py-20'>
    <div className='m-5 not-sm:-mt-3'>
      <BackButton />
    </div>
    <section className='flex gap-2 not-sm:px-3 mb-10 item-col'>
      <h1 className='text-5xl headFont'>My Cart</h1>
      <p>Products in Your cart</p>
    </section>
    <section>
      <CartProducts />
    </section>
    </main>
  )
}

export default page