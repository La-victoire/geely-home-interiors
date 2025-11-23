"use client"
import { Card } from '@/components/ui/card'
import React, { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Heart, X } from 'lucide-react'
import { wishList } from '@/lib/wishList'
import Link from 'next/link'
import { useCart } from '@/components/contexts/CartContext'
import { useProducts } from '@/components/contexts/ProductsContext'
import { toast } from 'sonner'
import { cartProduct } from '@/lib/types'

const CartCard = ({item, index, onChildData, onChildQuantity, onChildRemoval,onChildId}:{item:cartProduct,index:number,onChildData:any,onChildQuantity:any,onChildRemoval:any,onChildId:any}) => {
    const [quantity, setQuantity] = useState<number>(item?.quantity)
    const {setWishListCount, cartProducts} = useCart() as {setWishListCount:React.Dispatch<React.SetStateAction<number>>, cartProducts:cartProduct[]};
    const {products} = useProducts() as any

    const quantityReduce = () => {
  setQuantity((prev) => {
    const newQty = Math.max(1, prev - 1);
    onChildData(item.product._id, newQty);
    if (newQty < 1) onChildRemoval(item.product._id);
    return newQty;
  });
};
    
    const quantityIncrease = (stock: number) => {
  setQuantity((prev) => {
    const newQty = Math.min(stock, prev + 1);
    onChildData(item.product._id, newQty);
    return newQty;
  });
};
    
    const addToWishList = () => {
      const data = wishList.getWishList().find((p) => p.id === item.product._id)
      if (data) {
        toast.message(
          "Product already in watchlist"
        )
      } else {
        setWishListCount((prev) => prev + 1)
        wishList.addToWishList(item.product._id) 
      }
    }

    useMemo(() => {
      onChildQuantity(quantity)
      onChildId(item?.product?._id)

    console.log(item)
     }, [quantity])
    const image = useMemo(() => {
        if (!item || !item.product) {
    return [];}
     const match = products.find((prod)=> prod._id === item.product._id)
            console.log(match)
            return match ? match.images : []; 
    },[products, item])

  return (
    <Card key={index} className='flex w-full border-0 border-b rounded-none bg-transparent p-5 flex-row '>
    <img className='md:w-[120px] h-[100px] w-[87px] not-sm:object-cover rounded-xl' src={image[0]?.url} alt={item.product?.name} /> 
      <div className='flex justify-between w-full'>
        <Link href={`/shop/products/${item.product?._id}`}>
          <p className='font-bold'>{item.product?.name}</p>
          <p>Quantity: {quantity}</p>
          <p>Price: ₦{item?.price}</p>
        </Link>
        <div>
          <p> <span className='font-bold'>Total:</span> {Math.ceil(item?.price * quantity)} USD</p>
            <div className='flex gap-5 item-col md:item-row mt-2 items-center'>
              <div className='flex gap-2 border rounded-2xl items-center'>
                <Button onClick={()=> quantityReduce()} variant="ghost">-</Button>
                <p>{quantity}</p>
                <Button onClick={()=> quantityIncrease(item.product.stock)} variant="ghost">+</Button>
              </div>
                <div className='flex gap-4'>
                  <Button onClick={()=> (onChildRemoval(item.product._id))} className='bg-[#ed9e59] text-white'>
                    <X />
                  </Button>
                  <Button onClick={() => addToWishList()}>
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
