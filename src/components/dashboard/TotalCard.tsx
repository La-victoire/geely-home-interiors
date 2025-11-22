"use client"
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Box } from 'lucide-react'
import { product } from '../shop/Mini-Components/CollectionCard'
import { getData } from '@/lib/actions'
import useSWR from 'swr'

const TotalCard = () => {
  const productsFetcher = (url:string) => getData<any>(url);
  const {data, error, isLoading}:product[] = useSWR('/products', productsFetcher);

  return (
    <Card className='w-full'>
      <CardHeader className='flex justify-between'>
        <CardTitle>Total Products</CardTitle>  <Box className="text-muted-foreground"/> </CardHeader>
      <CardContent>{data?.length}</CardContent>
      <CardFooter className='text-muted-foreground text-sm'>{data?.filter((p) => p.status === "In Stock").length} in stock</CardFooter>
    </Card>
  )
}

export default TotalCard