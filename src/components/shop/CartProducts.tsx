"use client";
import React, { useState, useRef } from 'react';
import CartCard from './Mini-Components/CartCard';
import { useCart } from '../contexts/CartContext';
import { cartProduct } from '@/lib/types';
import { editProfile } from '@/lib/actions';
import { debounce } from '@/lib/debounce';
import { Button } from '../ui/button';
import Link from 'next/link';

const CartProducts = () => {
  const [childQuantity, setChildQuantity] = useState<number>();
  const [childId, setChildId] = useState<string>("");
  const { cartProducts, setCartProducts, setCartCount } = useCart() as {
    cartProducts: cartProduct[];
    setCartProducts: React.Dispatch<React.SetStateAction<cartProduct[]>>;
    setCartCount: React.Dispatch<React.SetStateAction<number>>;
  };

  // ----- FIXED DEBOUNCE LOGIC -----
  const debounceRef = useRef<any>(null);

  const debounceCartUpdate = (fn, delay = 600) => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(fn, delay);
  };

  const handleCartUpdate = (id: string, newQty: number) => {
    // Optimistic UI
    setCartProducts((prev) =>
      prev.map((item) =>
        item.product._id === id ? { ...item, quantity: newQty } : item
      )
    );

    // Debounced API call
    debounceCartUpdate(async () => {
      try {
        await editProfile(`/carts/update/${id}`, { quantity: newQty });
        console.log("✅ Cart updated:", id, newQty);
      } catch {
        console.error("❌ Failed to update cart item quantity.");
      }
    });
  };

  const handleCartRemoval = (id: string) => {
    setCartProducts((prev) => prev.filter((item) => item.product._id !== id));
    setCartCount((prev: number) => prev - 1);
  };

  return (
    <section className="border rounded flex item-col flex-2/3 gap-5 p-5">
      {cartProducts?.length > 0 ? (
        cartProducts.map((item: cartProduct, index: number) => (
          <div key={index}>
            <CartCard
              item={item}
              index={index}
              onChildData={handleCartUpdate}
              onChildQuantity={setChildQuantity}
              onChildId={setChildId}
              onChildRemoval={handleCartRemoval}
            />
          </div>
        ))
      ) : (
        <div className="text-3xl headFont h-full flex flex-center">
          <p>Cart Empty</p>
        </div>
      )}

      {cartProducts?.length > 0 && (
        <Link href={"/shop/checkout"} className='flex justify-center items-center' >
          <Button variant="secondary">
            Proceed to checkout
          </Button>
        </Link>
      )}
    </section>
  );
};

export default CartProducts;

