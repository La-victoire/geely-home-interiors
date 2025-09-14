"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import ReviewTable from './mini-comp/ReviewTable'


const Review = () => {
  return (
    <Card className='max-h-[60dvh]'>
      <CardHeader>
        <CardTitle className='headFont mb-3'>Client Reviews</CardTitle>
        <p>What Your Customers Think</p>
      </CardHeader>
      <CardContent className='overflow-x-scroll'>
        <table className='not-md:w-[150dvw] w-full not-sm:text-sm'>
          <thead>
            <tr className=''>
              <th className=' p-4 text-start border-0 border-b'>Product</th>
              <th className=' py-2 text-start border-0 border-b'>Client</th>
              <th className=' py-2 text-start border-0 border-b'>Comment</th>
              <th className=' py-2 text-start border-0 border-b'>Action</th>
            </tr>
          </thead>
          <tbody className='overflow-y-scroll'>
            {[].map((data:any, index)=> (
                <ReviewTable order={data} key={index}/>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}

export default Review