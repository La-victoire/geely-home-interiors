"use client"
import React, { useState } from 'react'
import AddressBook from '@/components/profile/AddressBook'
import EditProfile from '@/components/profile/EditProfile'
import Orders from '@/components/profile/Orders'
import UserDetails from '@/components/profile/UserDetails'
import { User } from '@/lib/types'

const UserProfile = ({profile}:{profile:User[]}) => {
  const [person, setPerson] = useState(profile);
  return (
    person.map((user,index) => (
    <div key={index}>
      <h1 className='headFont text-center text-3xl md:text-4xl'>Account Overview <EditProfile user={user} setPerson={setPerson}/> </h1>
      <div className='my-10 flex item-col flex-center'>
          <div className='w-[80dvw]'>
            <div className='flex w-full not-sm:item-col gap-5'>
              <UserDetails user={user}/>
              <AddressBook user={user}/>
            </div>
            <p className='headFont text-center text-3xl md:text-4xl py-10'>Orders</p>
            {user.orders.length > 0 ? (
              <div className='flex flex-center'>
                <div className='md:border overflow-scroll not-md:w-[120dvw] w-full space-y-5 rounded-md p-5'>
                  <table className='w-full px-5 not-sm:text-sm'>
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
            ):(
              <p className='headFont text-center text-2xl'>
                No Orders Yet
              </p>
            )}
          </div>
      </div>
    </div>
    ))
  )
}

export default UserProfile