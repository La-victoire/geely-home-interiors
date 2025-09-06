"use client"
import React from 'react'
import { Order } from '@/lib/types'

const Orders = ({order}:{order:Order}) => {
  return (
    <tr className='border-0 border-b'>
      <td className='border text-center p-3'>{order.id}</td>
      <td className='border text-center'>{order.items.map((item, index)=> (<li className={`list-none p-2 ${index !== 0 && "border-0 border-t-2" }`} key={index}>{item.name} x {item.quantity}</li>))}</td>
      <td className='border text-center'>{order.items.map((item, index)=> (<li className={`list-none p-2 ${index !== 0 && "border-0 border-t-2" }`} key={index}>${item.price}</li>))}</td>
      <td className='border text-center p-3'>{new Date(order.date).toLocaleDateString()}</td>
      <td className={`border md:px-5 px-2 py-3`}>
        <div className={`border font-semibold p-2 text-center text-white rounded-full ${order.status === "delivered" ? "bg-green-300 border-green-500 text-green-600": order.status === "shipped" ? "bg-blue-300 border-blue-500 text-blue-600": order.status === "processing" ? "bg-yellow-200 border-yellow-400 text-yellow-500" : "bg-red-300 border-red-500 text-red-600"}`}>
          {order.status}
        </div>
      </td>
    </tr>
  )
}

export default Orders