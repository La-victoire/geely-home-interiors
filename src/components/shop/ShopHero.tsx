import React from 'react'
import { CountdownTimer } from './Mini-Components/countdown-timer'

const ShopHero = () => {
  return (
    <section className='md:h-[65dvh] h-[40dvh] bg-gradient-to-br relative from-[#e84a5f] via-[#5d54a4] to-[#1a1f71] w-dvw'>
      <img className='md:h-[65dvh] h-[40dvh] w-dvw object-fill absolute' src="/images/banner.png" alt="shop-hero-bg" />
      <div className='absolute top-39 left-30 md:left-57 md:top-65 lg:left-90 lg:top-65 text-white flex not-sm:w-[60dvw] w-[45dvw] flex-wrap item-col text-center'>
        <CountdownTimer />
      </div>
    </section>
  )
}

export default ShopHero
