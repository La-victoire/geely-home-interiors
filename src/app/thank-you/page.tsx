"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { PremiumButton } from "@/components/order/premium-button"
import { SuccessCheckmark } from "@/components/order/success-checkmark"
import { Package, Truck, Calendar, MapPin, CreditCard, ArrowRight } from "lucide-react"
import { GeelyLogo } from "@/components/order/geely-logo"
import { useOrder } from "@/components/contexts/OrderContext"
import { cartProduct, Order, User } from "@/lib/types"
import { useUsers } from "@/components/contexts/UserContext"

// Mock order data
const orderData = {
  orderId: "GHI-2024-78392",
  items: [
    {
      id: 1,
      name: "Modern Navy Velvet Sofa",
      variant: "3-Seater / Navy Blue",
      price: 2450000,
      quantity: 1,
      image: "/modern-navy-blue-velvet-sofa.jpg",
    },
    {
      id: 2,
      name: "Ceramic Table Lamp",
      variant: "White & Gold / Medium",
      price: 185000,
      quantity: 2,
      image: "/white-gold-ceramic-table-lamp.jpg",
    },
  ],
  subtotal: 2820000,
  shipping: 25000,
  total: 2845000,
  deliveryEstimate: "Dec 15 - Dec 20, 2024",
  shippingAddress: "15 Admiralty Way, Lekki Phase 1, Lagos",
  paymentMethod: "Visa •••• 4242",
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price)
}

export default function ThankYouPage() {
  const [showContent, setShowContent] = useState(false)
  const {order} = useOrder() as {order: Order};
  const {users} = useUsers as unknown as {users: User}

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/30">
      {/* Ambient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div
          className={`
            text-center space-y-8 mb-12
            transition-all duration-700
            ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          <GeelyLogo />

          <div className="py-6">
            <SuccessCheckmark size="lg" showGlow />
          </div>

          <div className="space-y-3">
            <h1 className="headFont text-3xl md:text-4xl lg:text-5xl text-foreground text-balance">
              Thank You for Your Patronage
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto">
              We appreciate your order. Our team will reach out shortly with updates.
            </p>
          </div>
        </div>

        {/* Order Summary Card */}
        <div
          className={`
            bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50
            shadow-[0_4px_40px_rgba(0,0,0,0.06)]
            overflow-hidden
            transition-all duration-700 delay-200
            ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          {/* Order Header */}
          <div className="px-6 md:px-8 py-6 border-b border-border/50 bg-secondary/30">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Order Confirmed</p>
              {/*
  <p className="font-mono text-lg text-foreground">GHI-{order?.subCategory}</p>
*/}
              </div>
              <div className="flex items-center gap-2 text-gold">
                <Package className="w-5 h-5" />
                <span className="text-sm font-medium">Processing</span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          {/*
<div className="px-6 md:px-8 py-6 space-y-4">
            <h3 className="font-serif text-lg text-foreground">Order Items</h3>
            <div className="space-y-4">
              {order.items?.map((item) => (
                <div key={item.productId} className="flex gap-4 p-4 bg-secondary/30 rounded-xl">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{order.subCategory}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">{formatPrice(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>
*/}
          </div>

          {/* Order Details Grid */}
          <div className="px-6 md:px-8 py-6 border-t border-border/50 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Delivery Info */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Estimated Delivery</p>
                  <p className="font-medium text-foreground">{users?.addresses[0].state.includes("lagos") ? "2-3 Business Days" : "7-15 Business Days"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Shipping Address</p>
                  <p className="font-medium text-foreground">{users?.addresses[0].street},  {users?.addresses[0].state},{users?.addresses[0].city}</p>
                </div>
              </div>
            </div>

            {/* Price Summary 
            <div className="bg-secondary/30 rounded-xl p-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">{formatPrice(order.amount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground">{users?.addresses[0].state.includes("lagos") ? "Free" : formatPrice(20000)}.</span>
              </div>
              <div className="pt-3 border-t border-border/50 flex justify-between">
                <span className="font-serif text-lg text-foreground">Total</span>
                <span className="font-serif text-xl text-gold">{formatPrice(order.amount)}</span>
              </div>
            </div>
          </div>
*/}

          {/* Actions */}
          <div className="px-6 md:px-8 py-6 border-t border-border/50 bg-secondary/20">
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/shop/products" className="flex-1">
                <PremiumButton variant="outline">Continue Shopping</PremiumButton>
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div
          className={`
            mt-8 text-center space-y-4
            transition-all duration-700 delay-400
            ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          <div className="flex items-center justify-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-xs">Order placed today</span>
            </div>
            <div className="w-1 h-1 bg-border rounded-full" />
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="text-xs">Confirmation email sent</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Questions about your order?{" "}
            <a href="/contact" className="text-gold hover:text-gold/80 underline underline-offset-2 transition-colors">
              Contact Us
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
