"use client"
import React, { useEffect, useState } from 'react'
import AddressBook from '@/components/profile/AddressBook'
import EditProfile from '@/components/profile/EditProfile'
import Orders from '@/components/profile/Orders'
import UserDetails from '@/components/profile/UserDetails'
import { Order, User } from '@/lib/types'
import { Button } from '../ui/button'
import { getProfile } from '@/lib/actions'
import useSWR from 'swr'
import { useUsers } from '../contexts/UserContext'

const UserProfile = ({id}:{id:string}) => {
  const fetcher = async (url: string) => await getProfile<any>(url);
  const { data:profile, error:profileError, isLoading:profileLoading } = useSWR(`/users/${id}`, fetcher);
  const {users,setUsers}:User = useUsers();
  
  useEffect(() => {
    if (profile) {
      setUsers(profile);
    }
  }, [profile, id]);

  if (profileLoading) return <p>Loading...</p>;
  if (profileError) return <p>Error loading profile.</p>;

  return (
    <div>
      <h1 className='headFont text-center text-3xl md:text-4xl'>Account Overview <EditProfile person={users} setPerson={setUsers}/> </h1>
      <div className='my-10 flex item-col flex-center'>
          <div className='w-[80dvw]'>
            <div className='flex w-full not-sm:item-col gap-5'>
              <UserDetails user={users}/>
              <AddressBook user={users}/>
            </div>
            <p className='headFont text-center text-3xl md:text-4xl py-10'>Orders</p>
            {profile?.orders?.length > 0 ? (
              <div className='flex flex-center'>
                <div className='md:border overflow-scroll not-md:w-[120dvw] w-full space-y-5 rounded-md p-5'>
                  <table className='w-full px-5 not-sm:text-sm'>
                    <thead>
                      <tr className=''>
                        <th className='md:px-4 px-1 py-2 border'>Order ID</th>
                        <th className='md:px-4 px-1 py-2 border'>Prod1uct</th>
                        <th className='md:px-4 px-1 py-2 border'>Price</th>
                        <th className='md:px-4 px-1 py-2 border'>Date</th>
                        <th className='md:px-4 px-1 py-2 border'>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                    {profile?.orders?.map((order:Order, index:string)=> (
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
       <div className="py-10 w-full flex justify-center item-center">
        <Button className="hover:cursor-pointer"> Log Out</Button>
    </div>
    </div>
    )
}

export default UserProfile
