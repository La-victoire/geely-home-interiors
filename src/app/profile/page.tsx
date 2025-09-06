import { users } from '@/components/constants'
import AddressBook from '@/components/profile/AddressBook'
import Orders from '@/components/profile/Orders'
import UserDetails from '@/components/profile/UserDetails'
import { Order } from '@/lib/types'
import React from 'react'

const page = () => {
  return (
    <main className='pt-20 px-5 md:px-10'>
      <h1 className='headFont text-center text-3xl md:text-4xl'>Account Overview</h1>
      <div className='my-10 flex item-col flex-center'>
        {users.map((user,index) => (
          <div key={index} className='w-[80dvw]'>
            <div className='flex w-full not-sm:item-col gap-5'>
              <UserDetails user={user}/>
              <AddressBook user={user}/>
            </div>
            <p className='headFont text-center text-3xl md:text-4xl py-10'>Orders</p>
            <div className='md:border flex flex-col flex-center w-full space-y-5 rounded-md p-5'>
              <table className='md:w-full px-5 not-sm:text-sm'>
                <thead>
                  <tr className=''>
                    <th className='md:px-4 px-1 py-2 border'>Order ID</th>
                    <th className='md:px-4 px-1 py-2 border'>Product</th>
                    <th className='md:px-4 px-1 py-2 border'>Price</th>
                    <th className='md:px-4 px-1 py-2 border'>Date</th>
                    <th className='md:px-4 px-1 py-2 border'>Status</th>
                  </tr>
                </thead>
                <tbody>
                {user.orders.map((order, index)=> (
                  <Orders key={index} order={order}/>
                ))}
                </tbody>
              </table>
            </div>
          </div>
          ))}
      </div>
    </main>
  )
}

export default page