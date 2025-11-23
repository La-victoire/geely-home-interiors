"use client"
import React, { useState, useEffect } from 'react'
import { Card, CardHeader } from '../ui/card'
import { Button } from '../ui/button'
import { cart } from '@/lib/cart'
import { useCart } from '../contexts/CartContext'
import { cartProduct, User } from '@/lib/types'
import axios from 'axios'
import PaystackPop from '@paystack/inline-js'
import { useUsers } from '../contexts/UserContext'
import { usePaystack } from './Mini-Components/usePaystack'
import { toast } from 'sonner'
import { createProfile, deleteProduct } from '@/lib/actions';

const CartTotal = () => {
  const {cartProducts} = useCart() as {cartProducts:cartProduct[]};
  const [loaded, setLoaded] = useState(false)
  const {users, setUsers} = useUsers() as {users:User, setUsers:React.Dispatch<React.SetStateAction<User>>};
  const [orderData, setOrderData] = useState({
    client: "",
    name: "",
    amount: 0,
    items: [],
    metadata: {}
  });

  useEffect(()=> {
    if (!cartProducts.length) return;
    if (users === null) return;

    const items = cartProducts.map((product:any) => ({
      productId: product.product._id,
      name: product.product.name,
      quantity: product.quantity,
      price: product.price,
    }))

    const amount = cartProducts?.map((product:any) => Math.ceil(product.price * product.quantity)).reduce((a, b) => a + b, 0);

    setOrderData({ ...orderData, client:users?.email, amount, items, name: users?.firstname, metadata: users?._id})
  },[cartProducts, users])


  useEffect(()=> {
    if (!window.PaystackPop) {
        const script = document.createElement('script');
        script.src = "https://js.paystack.co/v2/inline.js";
        script.async = true;
        script.onload = () => setLoaded(true);
        script.onerror = () => toast.error('Failed to load Paystack');
        document.body.appendChild(script);
        return () => { document.body.removeChild(script); }
    } else {
        setLoaded(true)    
    }
  },[])


  const handlePayment = async () => {

    
    if (!loaded) {
      toast.error("Payment gateway is not loaded. Please try again later.");
      return;
    }

    if (!orderData.client) {
    toast.error('User Unavailable');
    return;    
    }
    
    if (users.phone === "" || users.addresses.length < 1) {
        toast.message("Please provide your complete contact information before paying.") 
    return;
}

    if (!window.PaystackPop ) {
      toast.error("Paystack is not available. Please try again later.");
      return;
    }

    try {
      const res = await createProfile(`/orders/initiate`, orderData)
  
      const {authorization_url, reference} = res;
      const paystack = new window.PaystackPop();
      let paymentOpened = true;

      paystack.newTransaction({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email: orderData.client,
        amount: orderData.amount * 100,
        currency: 'NGN',
        ref: reference,
        onSuccess: async (response: any) => {
          paymentOpened = false;
          await deleteProduct('/carts/clear')
          toast.success(`Payment ${response.status}!`);
          console.log("Payment Response:", response);
          window.location.href = "/shop/products";
        },
        onCancel: () => {
        if (onCancel) onCancel();
        paymentOpened = false;
        toast.info("Payment window closed");
    }
    });
    
    setTimeout(() => {
        if (paymentOpened)
        toast.info("Payment window closed");
    }, 10000)
    } catch (error) {
        toast.error(error);
        console.error(error);    
    }
};
  return (
   <Card className='px-5 w-full rounded-md'>
    <CardHeader className='not-sm:text-xl text-3xl headFont'> Order Summary</CardHeader>
    <div className='flex justify-between border-0 border-b pb-5 px-5'>
      <div>
        <p>Subtotal ({cartProducts.length} items)</p>
        <p>Shipping cost</p>
      </div>

      <div>
        <p>₦{cartProducts.map((product:any) => Math.ceil(product.price * product.quantity)).reduce((a, b) => a + b, 0)}</p>
        <p>₦0</p>
      </div>
    </div>
    <div className='flex justify-between px-5'>
      <p className='font-bold text-lg'>Sum Total</p>
      <p>₦{ 0 + cartProducts.map((product:any) => Math.ceil(product.price * product.quantity)).reduce((a, b) => a + b, 0)}</p>
    </div>
      <Button onClick={handlePayment}>
        Pay
      </Button>
   </Card>
  )
}

export default CartTotal
