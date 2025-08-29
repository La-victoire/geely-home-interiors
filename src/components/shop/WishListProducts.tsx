"use client"
import React from 'react'
import { Card } from '../ui/card'
import Link from 'next/link'
import { Button } from '../ui/button'
import { ShoppingCart, X } from 'lucide-react'
import { wishList } from '@/lib/wishList'
import { product } from './Mini-Components/CollectionCard'
import { cart } from '@/lib/cart'

const WishListProducts = () => {
  const products = wishList.getWishList()
  return (
    <div className='border rounded flex item-col gap-5 p-5'>
      {products?.map((product:product, index:number)=> (
        <Card key={index} className='flex w-full border-0 border-b rounded-none bg-transparent p-5 flex-row '>
            <img className='md:w-[120px] h-[100px] w-[87px] not-sm:object-cover rounded-xl' src={product?.images[0]} alt={product.id} />
            <div className='flex justify-between w-full'>
              <Link href={`/shop/products/${product.id}`}>
                <p className='font-bold'>{product?.name}</p>
                <p>stock: {product.stock}</p>
                <p>Price: ${product?.price}</p>
              </Link>
              <div>
                <div className='flex items-center'>
                      <div className='flex items-center item-col'>
                        <div className='flex'>
                          <Button variant="default" onClick={() => (cart.addToCart(product.id, 1))} className='text-white'>
                            <ShoppingCart />
                          </Button>
                        </div>
                        <Button variant="destructive" onClick={()=> (wishList.removeFromWishList(product.id))} className=' text-white'>
                          <X />
                        </Button> 
                      </div>
                </div>
              </div>
            </div>
          </Card>
      ))}
    </div>
  )
}

export default WishListProducts