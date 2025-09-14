"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import UserTable from './mini-comp/UserTable'
import { users } from '@/components/constants'
import { User } from '@/lib/types'

const Users = () => {
  const [clients, setClient] = useState<User[]>([]);
  useEffect(()=> {
    setClient(users)
  },[])

  const handleDelete = (id:string) => {
  setClient((prev)=>
    prev.filter((item) => item.id !== id)
  )
  };
  return (
    <Card className='max-h-[60dvh]'>
      <CardHeader>
        <CardTitle className='headFont'>Client Accounts</CardTitle>
        <p>View and manage your client database</p>
      </CardHeader>
      <CardContent className='overflow-scroll'>
        {clients.length < 1 ? (
          <p className='text-center headFont text-3xl'>
            No User Data
          </p>
        ):(
          <table className='not-md:w-[150dvw] w-full px-5 not-sm:text-sm'>
            <thead>
              <tr className=''>
                <th className='md:px-4 px-2 py-2 border-0 border-b'>Name</th>
                <th className='md:px-4 px-2 py-2 border-0 border-b'>Email</th>
                <th className='md:px-4 px-2 py-2 border-0 border-b'>Phone</th>
                <th className='md:px-4 px-2 py-2 border-0 border-b'>Join Date</th>
                <th className='md:px-4 px-2 py-2 border-0 border-b'>Products Ordered</th>
                <th className='md:px-4 px-2 py-2 border-0 border-b'>Status</th>
                <th className='md:px-4 px-2 py-2 border-0 border-b'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((data:User,index)=> (
                <UserTable user={data} onDelete={handleDelete} key={index}/>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>
    </Card>
  )
}

export default Users