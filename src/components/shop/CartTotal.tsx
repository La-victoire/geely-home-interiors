"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { cart } from "@/lib/cart";
import { useCart } from "../contexts/CartContext";
import { cartProduct, Order, OrderItem, User } from "@/lib/types";
import PaystackPop from "@paystack/inline-js";
import { useUsers } from "../contexts/UserContext";
import { toast } from "sonner";
import { createProfile, deleteProduct } from "@/lib/actions";
import { useOrder } from "../contexts/OrderContext";

const calculateSubtotal = (items: cartProduct[]) =>
  items.reduce(
    (sum, product) =>
      sum + Math.ceil(Number(product.price) * (product.quantity || 1)),
    0
  );

const calculateShipping = (user: User | null) => {
  if (!user?.addresses?.length) return 0;
  const state = user.addresses[0]?.state?.toLowerCase() || "";
  return state.includes("lagos") ? 0 : 20000;
};

const CartTotal = () => {
  const { cartProducts, setCartProducts } = useCart() as {
    cartProducts: cartProduct[];
    setCartProducts: React.Dispatch<React.SetStateAction<cartProduct[]>>;
  };

  const { users } = useUsers() as { users: User };
  const { setOrder } = useOrder() as any;

  const [loaded, setLoaded] = useState(false);
  const [localCart, setLocalCart] = useState<cartProduct[]>([]);
  const [orderData, setOrderData] = useState<Order>({
    client: "",
    name: "",
    amount: 0,
    items: [],
    subCategory: "",
    metadata: {},
  });

  const sessionCart = cart.getCart() as unknown as cartProduct[];
  const activeCart = cartProducts.length ? cartProducts : localCart;

  const subtotal = calculateSubtotal(activeCart);
  const shippingFee = 0
  // calculateShipping(users);
  const totalAmount = subtotal + shippingFee;

  useEffect(() => {
    const storedCart = sessionStorage.getItem("geely_cart");
    if (storedCart) setLocalCart(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    if (!cartProducts.length || !users) return;

    const items: OrderItem[] = cartProducts.map((product) => ({
      productId: product.product?._id || product._id,
      name: product.product?.name || product.name,
      quantity: product.quantity || 1,
      price: Number(product.price),
    }));

    setOrderData({
      client: users.email,
      name: users.firstname,
      amount: totalAmount,
      items,
      subCategory: cartProducts[0]?.subCategory,
      metadata: {
        id: users._id || "guest",
        phone: users.phone,
        address: [users.addresses[0]],
      },
    });
  }, [cartProducts, users, totalAmount]);

  useEffect(() => {
    if (!window.PaystackPop) {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v2/inline.js";
      script.async = true;
      script.onload = () => setLoaded(true);
      script.onerror = () => toast.error("Failed to load Paystack");
      document.body.appendChild(script);
      return () => document.body.removeChild(script);
    } else {
      setLoaded(true);
    }
  }, []);

  const isLagos = React.useMemo(() => {
  const state = users?.addresses?.[0]?.state;
  if (!state) return false;
  return state.trim().toLowerCase().includes("lagos");
}, [users?.addresses]);

console.log(users);

  const handlePayment = async () => {
    if (!loaded) return toast.error("Payment gateway not loaded");
    if (!activeCart.length) return toast.error("Your cart is empty");

    if (
      !users?.firstname ||
      !users?.lastname ||
      !users?.email ||
      !users?.phone ||
      !users?.addresses?.length
    ) {
      return toast.error("Please complete your profile before paying");
    }

   if (!isLagos) {
  return toast.info(
    "Sorry, orders outside Lagos must be completed via WhatsApp or Instagram"
  );
}

    try {
      const res = await createProfile("/orders/initiate", orderData);
      const { authorization_url, reference } = res;

      const paystack = new PaystackPop();

      paystack.newTransaction({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
        email: orderData.client,
        amount: totalAmount * 100,
        currency: "NGN",
        ref: reference,
        onSuccess: async () => {
          setOrder(orderData);
          if (users._id) await deleteProduct("/carts/clear");
          cart.clearCart();
          setCartProducts([]);
          toast.success("Payment successful");
          window.location.href = "/thank-you";
        },
        onCancel: () => toast.info("Payment cancelled"),
      });
    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
    }
  };

  return (
    <Card className="px-5 w-full rounded-md">
      <CardHeader className="not-sm:text-xl text-3xl headFont">
        Order Summary
      </CardHeader>

      <div className="flex justify-between border-b pb-5 px-5">
        <div>
          <p>Subtotal ({activeCart.length} items)</p>
          <p>Shipping cost</p>
        </div>

        <div>
          <p>₦{subtotal.toLocaleString()}</p>
          <p>₦{shippingFee.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex justify-between px-5">
        <p className="font-bold text-lg">Sum Total</p>
        <p>₦{totalAmount.toLocaleString()}</p>
      </div>

      <Button
        className="mt-4"
        disabled={!users?.addresses?.length || !users?.phone}
        onClick={handlePayment}
      >
        Pay
      </Button>
    </Card>
  );
};

export default CartTotal;

