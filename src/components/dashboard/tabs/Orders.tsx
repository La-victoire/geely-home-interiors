"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect, useMemo, useState } from 'react'
import { users } from '@/components/constants'
import { Order, User } from '@/lib/types'
import OrderTable from './mini-comp/OrderTable'
import { Input } from '@/components/ui/input'
import { deleteProfile, getData } from '@/lib/actions'
import useSWR from 'swr'
import { toast } from 'sonner'


const Orders = () => {
   const [order, setOrder] = useState<Order[]>([]);
   const [search, setSearch] = useState("")
   const [loading, setLoading] = useState(false);
    
    useEffect(()=> {
    const fetcher = async () => {
      try {
        const data = await getData<Order[]>("/orders");
        setLoading(true);
        if (data.length > 0) {
        setOrder(data)
        setLoading(false);    
    }
        setLoading(false)
      } catch (error) {
        console.error(error);
        setLoading(false)
        toast.error("Failed to fetch Order data")
      }
    }
    fetcher();
  },[])
    
    const handleDelete = async (id:string) => {
    setOrder((prev)=>
      prev.filter((item) => item?._id !== id)
    )
    try {
      await deleteProfile(`/orders/${id}`)
      toast.info("Order Deleted")
    } catch (error) {
      console.log(error);
      toast.error("Error deleting Order record");
    }

    };

    const queriedResults = useMemo(() => {
      return order
        .filter(p => p.client?.toLowerCase().includes(search?.toLowerCase()));
    }, [order,search]);
  return (
    <Card className='max-h-[60dvh]'>
      <CardHeader>
        <CardTitle className='headFont mb-3'>Order Collection</CardTitle>
        <p>Monitor Your Sales</p>
      </CardHeader>
      {loading ? 
      <div className="flex justify-center items-center">
        <p className='text-center text-3xl animate-pulse'>
          Loading...
        </p>
      </div>
      :
      <CardContent className='overflow-x-scroll'>
        <div className='md:w-1/4 w-1/2'>
          <Input
            type='search'
            placeholder='Search...' 
            value={search}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
        </div>
        <table className='not-md:w-[150dvw] w-full not-sm:text-sm'>
          <thead>
            <tr className=''>
              <th className=' p-4 text-start border-0 border-b'>Order ID</th>
              <th className=' py-2 text-start border-0 border-b'>Client</th>
              <th className=' py-2 text-start border-0 border-b'>Date</th>
              <th className=' py-2 text-start border-0 border-b'>Price</th>
              <th className=' py-2 border-0 border-b'>Status</th>
              <th className=' py-2 border-0 border-b'>Action</th>
            </tr>
          </thead>
          <tbody className='overflow-y-scroll'>
            {queriedResults.length > 0 && (
                queriedResults.map((order,index) => (
                  <OrderTable order={order} onDelete={handleDelete} key={index}/>

              ))
            )}
          </tbody>
        </table>
        {queriedResults.length < 1 && (
          <div className='text-center mt-5 headFont text-3xl'>
            No Order Found 
          </div>
        )}
      </CardContent>
      }
    </Card>
  )
}

export default Orders
