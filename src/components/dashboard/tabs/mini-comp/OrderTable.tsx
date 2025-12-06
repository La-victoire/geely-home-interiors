"use client"
import { Button } from '@/components/ui/button'
import { Order } from '@/lib/types'
import { Trash2 } from 'lucide-react'
import React from 'react'

const OrderTable = ({order,onDelete}:{order:Order, onDelete:(id:string) => void}) => {
    const date = new Date(order?.createdAt)
  return (
    <tr className='border-0 border-b'>
      <td className='pl-3'>{order.orderId || order._id}</td>
      <td className=''>{order.client}</td>
      <td className=''>{order?.createdAt ? date.toLocaleDateString() : "No Date Available"}</td>
      <td className=' p-3'>₦{order.amount}</td>
      <td className={`p-3`}>
        <div className={`border font-semibold not-sm:p-2 py-2 text-center rounded ${order.status === "shipped" ? "text-green-300 border-green-500 ": order.status === "paid" ? "text-blue-300 border-blue-500" : order.status === "pending" ? "text-yellow-300 border-yellow-500" : "text-red-300 border-red-500 "}`}>
          {order.status}
        </div>
      </td>
      <td className=' flex flex-center py-3 space-x-3'>
        <Button 
          onClick={() => onDelete(order._id)}
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
