"use client";
import React, { useState, useRef } from 'react';
import CartCard from './Mini-Components/CartCard';
import { useCart } from '../contexts/CartContext';
import { cartProduct } from '@/lib/types';
import { deleteProfile, editProfile } from '@/lib/actions';
import { Button } from '../ui/button';
import { cart } from '@/lib/cart'
import { useUsers } from '../contexts/UserContext'
import Link from 'next/link';

const CartProducts = () => {
  const [childQuantity, setChildQuantity] = useState<number>();
  const [childId, setChildId] = useState<string>("");
  const { cartProducts, setCartProducts, setCartCount } = useCart() as {
    cartProducts: cartProduct[];
    setCartProducts: React.Dispatch<React.SetStateAction<cartProduct[]>>;
    setCartCount: React.Dispatch<React.SetStateAction<number>>;
  };
  const {users} = useUsers()

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
        item.product?._id === id ? { ...item, quantity: newQty } : item
      )
    );
    // Debounced API call
    debounceCartUpdate(async () => {
    if (!users?.lastname || users?.lastname === "" ) return;
      try {
        await editProfile(`/carts/update/${id}`, { quantity: newQty });
        console.log("✅ Cart updated:", id, newQty);
      } catch {
        console.error("❌ Failed to update cart item quantity.");
      }
    });
  };

  const handleCartRemoval = async (id: string) => {
    cart.removeFromCart(id);
    if (users) {
      try {
        const remove = await deleteProfile(`/carts/${id}`)
      } catch {
        console.error("Failed to remove product from cart");
      }
    }
    setCartProducts((prev) => prev.filter((item) =>
        item._id !== id && item.product?._id !== id
    ));
    setCartCount((prev: number) => prev - 1);
  };

  return (
    <section className="border rounded flex item-col flex-2/3 gap-2 py-5 px-2">
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
        <Link href={"/shop/checkout"} className='flex justify-center items-center mt-2' >
          <Button variant="secondary">
            Proceed to checkout
          </Button>
        </Link>
      )}
    </section>
  );
};

export default CartProducts;

