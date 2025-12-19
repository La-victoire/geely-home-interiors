"use client"
import { Card } from '@/components/ui/card'
import React, { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Heart, X } from 'lucide-react'
import { wishList } from '@/lib/wishList'
import Link from 'next/link'
import { useCart } from '@/components/contexts/CartContext'
import { useProducts } from '@/components/contexts/ProductsContext'
import { toast } from 'sonner'
import { cartProduct } from '@/lib/types'
import { product } from './CollectionCard'

const CartCard = ({ item, index, onChildData, onChildQuantity, onChildRemoval, onChildId }: {
  item: cartProduct,
  index: number,
  onChildData: any,
  onChildQuantity: any,
  onChildRemoval: any,
  onChildId: any
}) => {

  // ❗ FIX 1 — remove the forced setQuantity during render
  const [quantity, setQuantity] = useState<number>(item?.quantity || 1)

  const { setWishListCount } = useCart()
  const { products } = useProducts()

  // ❗ FIX 2 — sync with sessionStorage ONLY ONCE using useEffect
  useEffect(() => {
    const cart = sessionStorage.getItem("geely_cart")
    if (!cart) return
    const parsed = JSON.parse(cart)

    const match = parsed.find((c: any) => c.productId === item.product?._id)
    if (match?.quantity && match.quantity !== quantity) {
      setQuantity(match.quantity)
    }
  }, [])
  // ❗ FIX 3 — move parent communication into an effect, NOT useMemo
  useEffect(() => {
    onChildQuantity(quantity)
    onChildId(item.product?._id)
  }, [quantity])

  // safe memo — no callbacks inside
  const image = useMemo(() => {
    if (!products || !item?.product) return []
    const match = products.find((prod) => prod._id === item.product._id)
    return match ? match.images : item.images || []
  }, [products, item])

  const MAX_ORDER_LIMIT = 10

  const quantityReduce = () => {
    setQuantity((prev) => {
      const newQty = Math.max(1, prev - 1)
      onChildData(item.product?._id, newQty)
      if (newQty < 1) onChildRemoval(item.product?._id)
      return newQty
    })
  }

  const quantityIncrease = () => {
    setQuantity((prev) => {
      const newQty = Math.min(MAX_ORDER_LIMIT, prev + 1)
      onChildData(item.product?._id, newQty)
      if (newQty > MAX_ORDER_LIMIT) {
        toast.info("The max order limit is 10 per item")
    }
      return newQty
    })
  }
    

  const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-NG").format(price);


  const addToWishList = () => {
    const exists = wishList.getWishList().find((p: product) => p._id === item.product._id)
    if (exists) {
      toast.message("Product already in watchlist")
    } else {
      setWishListCount((prev) => prev + 1)
      wishList.addToWishList(item)
    }
  }

  useMemo(() => {
      onChildQuantity(quantity)
      onChildId(item?.product?._id)

     }, [quantity])

  return (
    <Card key={index} className='flex w-full border-0 border-b rounded-none bg-transparent p-5 flex-row '>
    <img className='md:w-[120px] h-[100px] w-[87px] not-sm:object-cover rounded-xl' src={image[0]?.url || "/images/sketch.jpg"} alt={item.product?.name || item.name} /> 
      <div className='flex justify-between w-full'>
        <Link href={`/shop/products/${item.product?._id || item._id}`}>
          <p className='font-bold'>{item.product?.name || item.name}</p>
          <p>Quantity: {quantity}</p>
          <p>Price: ₦{formatPrice(item?.price)}</p>

        </Link>

        <div>
          <p><span className='font-bold'>Total:</span> {formatPrice(Math.ceil(item.price * quantity))} NGN</p>

          <div className='flex gap-5 item-col md:item-row mt-2 items-center'>
            <div className='flex gap-2 border rounded-2xl items-center'>
              <Button onClick={quantityReduce} variant="ghost">-</Button>
              <p>{quantity}</p>
              <Button onClick={quantityIncrease} variant="ghost">+</Button>
            </div>

            <div className='flex gap-4'>
              <Button onClick={() => onChildRemoval(item.product?._id || item._id)} className='bg-[#ed9e59] text-white'>
                <X />
              </Button>

              <Button onClick={addToWishList}>
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

