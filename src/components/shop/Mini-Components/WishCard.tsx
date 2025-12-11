"use client"
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cart } from '@/lib/cart'
import { wishList } from '@/lib/wishList'
import { ShoppingCart, X } from 'lucide-react'
import Link from 'next/link'
import React, { Dispatch, SetStateAction } from 'react'
import { product } from './CollectionCard'
import { useCart } from '@/components/contexts/CartContext'

const WishCard = ({product,setProducts}:{product:product, setProducts: any}) => {
  const {setWishListCount, setCartCount} = useCart()

  const handleCart = () => {
      const data = cart.getCart().find((p) => p.productId === product._id)
      if (!data) {
        cart.addToCart(product, 1);
        setCartCount((prev:number) => prev + 1)
      } else {
        cart.addToCart(product, 1);
      }
    };
  return (
     <Card className='flex w-full border-0 border-b rounded-none bg-transparent p-5 flex-row '>
            <img className='md:w-[120px] h-[100px] w-[87px] not-sm:object-cover rounded-xl' src={product?.images[0]?.url || "/images/sketch.jpg"} alt={product.name} />
            <div className='flex justify-between w-full'>
              <Link href={`/shop/products/${product._id}`}>
                <p className='font-bold'>{product?.name}</p>
                <p className='text-sm'>{product.subCategory}</p>
                <p>Price:₦{product?.price}</p>
              </Link>
              <div>
                <div className='flex items-center'>
                      <div className='flex items-center item-col'>
                        <div className='flex'>
                          <Button variant="default" 
                            onClick={handleCart} 
                          >
                            <ShoppingCart />
                          </Button>
                        </div>
                        <Button variant="destructive" onClick={()=> {
                            wishList.removeFromWishList(product._id),
                            setWishListCount((prev:number) => prev - 1),
                            setProducts((prev:product[]) => prev.filter((item)=> item?._id !== product._id))
                        }} 
                          className=' text-white'>
                          <X />
                        </Button> 
                      </div>
                </div>
              </div>
            </div>
          </Card>
  )
}

export default WishCard
