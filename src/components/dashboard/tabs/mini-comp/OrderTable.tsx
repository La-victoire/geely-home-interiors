"use client"
import { Button } from '@/components/ui/button'
import { Order } from '@/lib/types'
import { Trash2 } from 'lucide-react'
import React from 'react'

const OrderTable = ({order,onDelete}:{order:Order, onDelete:(id:string) => void}) => {
  return (
    <tr className='border-0 border-b'>
      <td className='pl-3'>{order.id}</td>
      <td className=''>{order.client}</td>
      <td className=''>{new Date(order.date).toLocaleDateString()}</td>
      <td className=' p-3'>${order?.payment?.amount}</td>
      <td className={`py-3`}>
        <div className={`border font-semibold not-sm:p-2 py-2 text-center text-white rounded-full ${order.status === "shipped" ? "bg-green-300 border-green-500 ": order.status === "delivered" ? "bg-blue-300 border-blue-500" : order.status === "processing" ? "bg-yellow-300 border-yellow-500" : "bg-red-300 border-red-500 "}`}>
          {order.status}
        </div>
      </td>
      <td className=' flex flex-center py-3 space-x-3'>
        <Button 
          onClick={() => onDelete(order.id)}
          variant="outline"
          className='hover:bg-red-500 hover:text-white'
          >
            <Trash2 />
          </Button>
      </td>
    </tr>
  )
}

export default OrderTable