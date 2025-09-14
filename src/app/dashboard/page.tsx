import { products, users } from '@/components/constants'
import ClientCard from '@/components/dashboard/ClientCard'
import ManagementTabs from '@/components/dashboard/ManagementTabs'
import TotalCard from '@/components/dashboard/TotalCard'
import React from 'react'

const page = () => {
  return (
    <main className='px-10 py-20'>
      <h1 className='headFont text-2xl md:text-4xl'>Dashboard</h1>
      <h2 className='text-md md:text-2xl'>Manage Your interior decor business</h2>
      <div className='flex not-sm:flex-center'>
        <div className='flex not-sm:item-col w-[80dvw] my-10 gap-5'>
          <TotalCard data={products}/>
          <ClientCard data={users}/>
        </div>
      </div>
      <ManagementTabs />
    </main>
  )
}

export default page