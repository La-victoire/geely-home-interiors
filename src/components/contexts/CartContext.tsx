"use client"
import { deleteProduct, getData, postData } from "@/lib/actions";
import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { wishList } from '@/lib/wishList';
import { cartProduct, User } from '@/lib/types';

const CartContext = createContext({});

export function CartProvider({ children}: {children:React.ReactNode}) {

  const [cartProducts, setCartProducts] = useState<cartProduct[]>([]);
  const [cartCount, setCartCount] = useState<number>(0)
  const [wishListCount, setWishListCount] = useState<number>(0)
  useEffect(() => {
    const fetcher = async () => {
    const data = await getData("/carts")
    if (!data.error) {
    setCartProducts(data?.cart || [])
    setCartCount(data?.cart.length || 0)    
    }};
    
    fetcher();

    const wishlist = wishList.getWishList();
    setWishListCount(wishlist?.length)
  }, [])

  return (
    <CartContext.Provider value={{cartProducts, setCartProducts, wishListCount, setWishListCount, cartCount, setCartCount}}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
