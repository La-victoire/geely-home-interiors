"use client"
import { deleteProduct, getData, postData } from "@/lib/actions";
import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { wishList } from '@/lib/wishList';
import { useProducts } from './ProductsContext'
import { cartProduct } from '@/lib/types';
import { cart } from "@/lib/cart";

const CartContext = createContext({});

export function CartProvider({ children }: { children: React.ReactNode }) {

  const [cartProducts, setCartProducts] = useState<cartProduct[]>([]);
  const [cartCount, setCartCount] = useState<number>(0)
  const { products } = useProducts() as any;

  const [wishListCount, setWishListCount] = useState<number>(0)

  useEffect(() => {
    if (!products || products.length === 0) return;

    // ------- Load Session Cart Products -------
    const sessionCart = cart.getCart() as unknown as cartProduct[];
    const ids = new Set(sessionCart.map(i => i.productId as any));
    const filtered = products?.filter((prod: any) => ids.has(prod._id));

    if (sessionCart.length > 0) {
      setCartProducts(filtered);
      setCartCount(sessionCart.length);
    }

    // ------- Fetch Cart from Server -------
    const fetcher = async () => {
      const data = await getData("/carts");

      if (data && !data.error) {
        setCartProducts(data || []);
        setCartCount(data?.length || 0);
      }
    };

    if (sessionStorage.getItem("userId")) {
      fetcher();
    }

    const wishlist = wishList.getWishList();
    setWishListCount(wishlist?.length || 0);

  }, [products]); // <-- FIXED
  return (
    <CartContext.Provider
      value={{
        cartProducts, setCartProducts,
        wishListCount, setWishListCount,
        cartCount, setCartCount
      }}>
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

