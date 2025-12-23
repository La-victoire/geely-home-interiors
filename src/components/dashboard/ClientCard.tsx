"use client"
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Box, UsersIcon } from 'lucide-react'
import { User } from '@/lib/types'
import { getProfile } from '@/lib/actions'
import useSWR from 'swr'

const ClientCard = () => {
  const usersFetcher = (url:string) => getProfile<any>(url);
  const {data, error, isLoading}:User[] = useSWR('/users', usersFetcher);

  isLoading && <div>Loading...</div>
  error && <div>Error loading data</div>
  return (
    <Card className='w-full'>
      <CardHeader className='flex justify-between'>
        <CardTitle>Admin Users</CardTitle>  <UsersIcon className="text-muted-foreground"/> </CardHeader>
      <CardContent>{data?.users?.filter((p) => p.role === "Admin").length}</CardContent>
      <CardFooter className='text-muted-foreground text-sm'>{data?.users?.length} users in total</CardFooter>
    </Card>
  )
}

export default ClientCard
