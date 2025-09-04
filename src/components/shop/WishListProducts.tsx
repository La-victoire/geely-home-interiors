"use client"
import React, { useEffect, useState } from 'react'
import { Card } from '../ui/card'
import Link from 'next/link'
import { Button } from '../ui/button'
import { ShoppingCart, X } from 'lucide-react'
import { wishList } from '@/lib/wishList'
import { product } from './Mini-Components/CollectionCard'
import { cart } from '@/lib/cart'
import WishCard from './Mini-Components/WishCard'

const WishListProducts = () => {
  const [products, setProducts] = useState<product[]>([])
  useEffect(() => {
    setProducts(wishList.getWishList())
  },[])
  return (
    <div className='border rounded flex item-col gap-5 p-5'>
      {products.length > 0 ?
        products.map((product:product, index:number)=> (
          <WishCard 
            product={product}
            key={index}
            setProducts={setProducts}
          />
        )) : (
          <div className='headFont text-3xl text-center'>
            <p>No Products Currently In Wishlist</p>
          </div>
        )}
    </div>
  )
}

export default WishListProducts