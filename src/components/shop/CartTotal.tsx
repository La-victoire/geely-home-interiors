"use client"
import React from 'react'
import { Card, CardHeader } from '../ui/card'
import { Button } from '../ui/button'
import { cart } from '@/lib/cart'

const CartTotal = () => {
  const cartData = cart.getCart();
  return (
   <Card className='px-5 w-full rounded-md'>
    <CardHeader className='text-3xl headFont'> Order Summary</CardHeader>
    <div className='flex justify-between border-0 border-b pb-5 px-5'>
      <div>
        <p>items:</p>
        <p>Delivery cost:</p>
        <p>Tax:</p>
        <p>Total</p>
      </div>

      <div>
        <p>{cartData.map((data:any) => data.quantity).reduce((a, b) => a + Number(b), 0)}</p>
        <p>$5</p>
        <p>$0.00</p>
        <p>${cartData.map((product:any) =>Math.ceil(product.price * product.quantity)).reduce((a, b) => a + b, 0)}</p>
      </div>
    </div>
    <div className='flex justify-between px-5'>
      <p className='font-bold text-lg'>Sum Total</p>
      <p>${ 5 + cartData.map((product:any) =>Math.ceil(product.price * product.quantity)).reduce((a, b) => a + b, 0)}</p>
    </div>
      <Button>
        Proceed to checkout
      </Button>
   </Card>
  )
}

export default CartTotal