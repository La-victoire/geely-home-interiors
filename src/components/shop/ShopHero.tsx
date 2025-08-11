import React from 'react'

const ShopHero = () => {
  return (
    <section className='h-[80dvh] bg-gradient-to-br relative from-[#e84a5f] via-[#5d54a4] to-[#1a1f71] w-screen'>
      <img className='h-full w-full object-cover absolute' src="/images/couch.jpg" alt="shop-hero-bg" />
      <div className='abs-center text-white flex not-sm:w-[60dvh] w-full flex-wrap item-col text-center'>
        <h1 className='md:text-5xl w-full text-2xl headFont'>Demand More From Your Decor.</h1>
        <p className='md:text-xl mt-7'>Functional luxury for interiors that perform.</p>
      </div>
    </section>
  )
}

export default ShopHero