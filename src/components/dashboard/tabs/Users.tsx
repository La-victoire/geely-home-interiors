"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import UserTable from './mini-comp/UserTable'
import { users } from '@/components/constants'
import { User } from '@/lib/types'
import { deleteProfile, getProfile } from '@/lib/actions'
import { toast } from 'sonner'

const Users = () => {
  const [clients, setClient] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(()=> {
    const fetcher = async () => {
      try {
        const data = await getProfile<User[]>("/users");
        setLoading(true);
        if (data.users.length > 0) {
        setClient(data.users)
        setLoading(false);    
    }
        setLoading(false)
      } catch (error) {
        console.error(error);
        setLoading(false)
        toast.error("Failed to fetch user data")
      }
    }
    fetcher();
  },[])

  const handleDelete = async (id:string) => {
    try {
      const response = await deleteProfile(`/users/${id}`);
      console.log(response)
      if (response) {
        toast.error(response)
      } else {
        toast.success("User Successfully deleted")
      }
    } catch (error) {
      console.error("Error deleting User:", error);
      toast.error(`An error occurred: ${error}`);
    }
  setClient((prev)=>
    prev.filter((item) => item._id !== id)
  )
  };
  return (
    <Card className='max-h-[60dvh]'>
      <CardHeader>
        <CardTitle className='headFont'>Client Accounts</CardTitle>
        <p>View and manage your client database</p>
      </CardHeader>
      <CardContent className='overflow-scroll'>
        {clients.length < 1 && !loading ? (
          <p className='text-center headFont text-3xl'>
            No User Data
          </p>
        ): loading ? (
            <p className='text-center animate-pulse headFont text-3xl'>
            Loading...
          </p>       
        ) : (
          <table className='not-md:w-[150dvw] w-full px-5 not-sm:text-sm'>
            <thead>
              <tr className=''>
                <th className='md:px-4 px-2 py-2 border-0 border-b'>Name</th>
                <th className='md:px-4 px-2 py-2 border-0 border-b'>Email</th>
                <th className='md:px-4 px-2 py-2 border-0 border-b'>Phone</th>
                <th className='md:px-4 px-2 py-2 border-0 border-b'>Join Date</th>
                <th className='md:px-4 px-2 py-2 border-0 border-b'>Products Ordered</th>
                <th className='md:px-4 px-2 py-2 border-0 border-b'>Role</th>
                <th className='md:px-4 px-2 py-2 border-0 border-b'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients?.map((data:User,index)=> (
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
