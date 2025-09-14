"use client"
import { Button } from '@/components/ui/button'
import { Order } from '@/lib/types'
import { Star, Trash2 } from 'lucide-react'
import React from 'react'

const ReviewTable = ({order}:{order:Order}) => {
  return (
    <tr className='border-0 border-b'>
      <td className='pl-3'>{order?.name}</td>
      <td className=''>{order.client}</td>
      <td className=''>{order?.rating} <Star color='gold' fill='true'/></td>
      <td className=' p-3'>{order?.comment}</td>
      <Button variant="outline" className='hover:bg-red-500 hover:text-white'><Trash2 /></Button>
    </tr>
  )
}

export default ReviewTable