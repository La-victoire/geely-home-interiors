"use client"
import React, { useEffect, useState } from 'react'
import { product } from './Mini-Components/CollectionCard'
import { Button } from '../ui/button'
import CartCard from './Mini-Components/CartCard'
import { cart } from '@/lib/cart'
import CartTotal from './CartTotal'

const CartProducts = () => {
  const [childData, setChildData] = useState(false);
  const [childQuantity, setChildQuantity] = useState<number>();
  const [childId, setChildId] = useState<string>("");
  const [cartProducts, setCartProducts] = useState([]);
  
  useEffect(()=> {
    setCartProducts(cart.getCart())
  },[]);
  
  const handleChildData = (data:boolean) => {
    setChildData(data);
  }
  const handleChildQuantity = (data:any) =>  {
    setChildQuantity(data);
  }
  const handleChildId = (data:any) =>  {
    setChildId(data);
  }
  const handleCartUpdate = (id:string, newQty:number) => {
    setCartProducts((prev) => 
      prev.map(item => item.id === id ? {...item, quantity: newQty} : item)
    );
    cart.updateCartQuantity(childId, childQuantity)
  };
  const handleCartRemoval = (id:string) => {
    setCartProducts((prev) => 
    prev.filter((item) => item.id !== id) )
    cart.removeFromCart(id)
  }

  return (
    <main className='flex gap-10 md:item-row item-col'>
      <section className='border rounded flex item-col flex-2/3 gap-5 p-5'>
        { 
        cartProducts?.length > 0 ? 
          cartProducts?.map((product:product,index:number)=> (
            <div key={index}>
              <CartCard 
              product={product}
              onChildData={handleCartUpdate}
              onChildQuantity={handleChildQuantity}
              onChildId={handleChildId}
              onChildRemoval={handleCartRemoval}
              index={index}
              />
            
              
            </div>
        )):(
          <div className='text-4xl headFont h-full flex flex-center'>
            <p>Cart Empty</p>
          </div>
        )} 
      </section>  
      {
        cartProducts?.length > 0 && (
        <div className='flex flex-1/3 h-[50dvh]'>
          <CartTotal />
        </div>
        )
      }
    </main>
  )
}

export default CartProducts