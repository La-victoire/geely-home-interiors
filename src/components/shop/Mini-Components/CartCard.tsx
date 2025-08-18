"use client"
import { Card } from '@/components/ui/card'
import React, { useMemo, useState } from 'react'
import { product } from './CollectionCard'
import { Button } from '@/components/ui/button'
import { cart } from '@/lib/cart'
import { Heart, X } from 'lucide-react'
import { wishList } from '@/lib/wishList'
import Link from 'next/link'

const CartCard = ({product, index, onChildData, onChildQuantity, onChildId}:{product:product,index:number,onChildData:any,onChildQuantity:any,onChildId:any}) => {
    const [quantity, setQuantity] = useState<number>(product.quantity)
    
    const quantityReduce = () => (
      setQuantity((prev)=> Math.max(1 ,prev - 1)),
      onChildData(product.id, product.quantity)
    )
    
    const quantityIncrease = (stock:number) => (
      setQuantity((prev)=> Math.min(stock ,prev + 1)),
      onChildData(product.id, product.quantity)
    )
    useMemo(() => {
      onChildQuantity(quantity)
      onChildId(product.id)

     }, [quantity])
  return (
        <Card key={index} className='flex w-full border-0 border-b rounded-none bg-transparent p-5 flex-row '>
          <img className='md:w-[120px] h-[100px] w-[87px] not-sm:object-cover rounded-xl' src={product?.images[0]} alt={product.id} />
          <div className='flex justify-between w-full'>
            <Link href={`/shop/products/${product.id}`}>
              <p className='font-bold'>{product?.name}</p>
              <p>Quantity: {quantity}</p>
              <p>Price: ${product?.price}</p>
            </Link>
            <div>
              <p> <span className='font-bold'>Total:</span> {Math.ceil(product?.price * quantity)} USD</p>
               <div className='flex gap-5 item-col md:item-row mt-2 items-center'>
                  <div className='flex gap-2 border rounded-2xl items-center'>
                    <Button onClick={()=> quantityReduce()} variant="ghost">-</Button>
                    <p>{quantity}</p>
                    <Button onClick={()=> quantityIncrease(product.stock)} variant="ghost">+</Button>
                  </div>
                    <div className='flex gap-4'>
                      <Button onClick={()=> (cart.removeFromCart(product.id), onChildData(true))} className='bg-[#ed9e59] text-white'>
                        <X />
                      </Button>
                      <Button onClick={() => (wishList.addToWishList(product.id))}>
                        <Heart />
                      </Button>
                    </div>
                </div>
            </div>
          </div>
        </Card>
  )
}

export default CartCard