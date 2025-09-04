"use client"
import { cart } from '@/lib/cart';
import React, { useMemo } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { product } from '../shop/Mini-Components/CollectionCard';
import { wishList } from '@/lib/wishList';

const CartContext = createContext({});

export function CartProvider({ children}: {children:React.ReactNode}) {
  const [cartProducts, setCartProducts] = useState<product[]>([]);
  const [cartCount, setCartCount] = useState<number>(0)
  const [wishListCount, setWishListCount] = useState<number>(0)
  useEffect(() => {
    const cart = sessionStorage.getItem('cart');
    const wishlist = wishList.getWishList();
    setCartProducts(
      JSON.parse(cart)
    )
    setCartCount(JSON.parse(cart)?.length)

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