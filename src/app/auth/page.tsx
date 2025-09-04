import TabSelector from '@/components/auth/TabSelector'
import BackButton from '@/components/shop/Mini-Components/BackButton'
import React from 'react'

const page = () => {
  return (
    <>
    <main data-authentication className='h-dvh w-dvw'>
      <div className='flex w-full items-center not-md:pt-20 justify-center'>
        <div className='hidden md:flex w-1/2 h-dvh flex-1/2'>
          <img src="/images/Bedroom.jpg"/>
        </div>
        <div className='lg:w-1/2 space-y-5'>
          <BackButton />
          <TabSelector />
        </div>
      </div>
    </main>
    </>
  )
}

export default page