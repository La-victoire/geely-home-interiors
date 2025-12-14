"use client"
import { deleteProduct, getData, postData } from "@/lib/actions";
import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { wishList } from '@/lib/wishList';
import { useProducts } from './ProductsContext'
import { cartProduct, User } from '@/lib/types';
import { cart } from "@/lib/cart";
import { useUsers } from "./UserContext";

const CartContext = createContext({});

export function CartProvider({ children }: { children: React.ReactNode }) {

  const [cartProducts, setCartProducts] = useState<cartProduct[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);
  const { users } = useUsers() as {users: User};
  const { products } = useProducts() as any;

  const [wishListCount, setWishListCount] = useState<number>(0)

  useEffect(() => {
  if (users) return; // 🔴 IMPORTANT: logged-in users must NOT use session cart
  if (!products || products.length === 0) return;

  const sessionCart = cart.getCart();

  const merged = sessionCart
    .map(item => {
      const product = products.find(p => p._id === item.productId);
      if (!product) return null;

      return {
        product,
        quantity: item.quantity,
        price: item.price
      };
    })
    .filter(Boolean);

  setCartProducts(merged);
  setCartCount(merged.length);
}, [products, users]);

  
  useEffect(() => {
    // ------- Fetch Cart from Server -------
    const fetcher = async () => {
      const data = await getData("/carts");
  
      if (data && !data.error) {
        setCartProducts(data || []);
        setCartCount(data?.length || 0);
      }
    };
  
    if (users || sessionStorage.getItem("userId")) {
      fetcher();
    }
  
    const wishlist = wishList.getWishList();
    setWishListCount(wishlist?.length || 0);

  }, [])

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

