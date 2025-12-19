"use client";

import { useCart } from '@/components/contexts/CartContext';
import { useUsers } from '@/components/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { cart } from '@/lib/cart';
import { cartProduct, getDiscountBadges, User } from '@/lib/types';
import { Star, ShoppingBag, Heart } from 'lucide-react';
import Link from 'next/link';
import React, { useRef, useState } from 'react'
import Image from "next/image"
import { cn } from "@/lib/utils"
import { toast } from 'sonner';
import { MultiBadge } from './discount-badge';
import { wishList } from '@/lib/wishList';
import { createProfile } from '@/lib/actions';

export type product = {
  _id: string;
  name: string;
  description: string;
  initialPrice: number;
  price: number;
  currency: string;
  category: string;
  subCategory: string;
  images: [{
    url: string,
    public_url: string
  }];
  computedDiscountedPrice: number
  isXmasDeal: boolean;
  isDiscountDeal: boolean;
  quantity?: number;
  rating?: number;
  dimensions: {};
  discountUntil: string;
  maxDiscountCap: number;
  features: string[];
  colors?: string[];
}

interface products {
  product: product;
  variant?: "default" | "carousel";
  className?: string;
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price)
}

function CollectionCard({ product, variant = "default", className }: products) {
  const { cartProducts, setCartCount, setCartProducts,setWishListCount } = useCart() as { cartProducts: cartProduct[], setCartCount: React.Dispatch<React.SetStateAction<number>>, setCartProducts:any,setWishListCount: React.Dispatch<React.SetStateAction<number>> };
  const { users } = useUsers() as { users: User };
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const badges = getDiscountBadges(product)
  const isCarousel = variant === "carousel"

   const debounceRef = useRef<any>(null);
  
    const debounceCartUpdate = (fn:()=> void, delay = 600) => {
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(fn, delay);
    };

const handleCart = async (e: any) => {
  e.stopPropagation();
  e.preventDefault();

  const safeCart = Array.isArray(cartProducts) ? cartProducts : [];
  const exists = safeCart.find(p => p.product?._id === product._id);

  // =========================
  // AUTHENTICATED USER
  // =========================
  if (users) {
    try {
      // 🔹 Optimistic UI update (NO debounce)
      if (exists) {
        setCartProducts((prev: any[]) =>
          prev.map(item =>
            item.product._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCartProducts((prev: any[]) => [
          ...prev,
          {
            price: product.price,
            product: { name: product.name, _id: product._id },
            quantity: 1,
          },
        ]);
        setCartCount(prev => prev + 1);
      }

      toast.success("Cart updated");

      // 🔹 Debounced API sync ONLY
      debounceCartUpdate(async () => {
        await createProfile('/carts/add', {
          product: product._id,
          quantity: 1,
          price: product.price,
        });
        console.log("✅ Server cart synced");
      });

    } catch (err) {
      console.error("❌ Failed to update cart", err);
    }

    return; // ⛔ STOP guest logic from running
  }

  // =========================
  // GUEST USER
  // =========================
  if (exists) {
    cart.addToCart(product, 1);
    setCartProducts((prev: any[]) =>
      prev.map(item =>
        item.product._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  } else {
    cart.addToCart(product, 1);
    setCartProducts((prev: any[]) => [
      ...prev,
      {
        price: product.price,
        product: { name: product.name, _id: product._id },
        quantity: 1,
      },
    ]);
    setCartCount(prev => prev + 1);
  }
};


  return (
    <article
      className={cn(
        "relative group flex flex-col bg-card rounded-2xl overflow-hidden transition-all duration-300",
        "hover:shadow-xl hover:shadow-black/5 hover:scale-[1.02]",
        isCarousel ? "min-w-[280px] sm:min-w-[320px] lg:min-w-[340px]" : "",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      {/* FULL CARD CLICKABLE */}
      <Link
        href={`/shop/products/${product._id}`}
        className="absolute inset-0 z-[1]"
      />

      {/* Image Container */}
      <div
        className={cn(
          "relative overflow-hidden bg-secondary/30",
          "sm:aspect-square",
          "aspect-[3/5] h-auto"
        )}
      >

        <Image
          src={product.images[0].url || "/placeholder.svg"}
          alt={product.name}
          fill
          className={cn(
            "object-cover transition-transform duration-500",
            isHovered && "scale-105",
            "absolute inset-0 sm:relative"
          )}
        />

        <div className="absolute inset-0 bg-black/40 sm:bg-transparent"></div>

        {isCarousel && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        )}

        {badges.length > 0 && (
          <div className="absolute top-3 left-3 z-20">
            <MultiBadge badges={badges} size={isCarousel ? "md" : "sm"} />
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
             const data = wishList.getWishList().find((p) => p._id === product._id)
                if (data) {
                  toast.message(
                    "Product already in watchlist"
                  )
                } else {
                  setWishListCount((prev) => prev + 1)
                  wishList.addToWishList(product) 
                }
            setIsWishlisted(true);
          }}
          className={cn(
            "absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 backdrop-blur-sm",
            "transition-all duration-200 hover:bg-white hover:scale-110",
            "opacity-0 group-hover:opacity-100",
            isWishlisted && "opacity-100",
          )}
        >
          <Heart
            className={cn("w-4 h-4 transition-colors", isWishlisted ? "fill-sale text-sale" : "text-foreground")}
          />
        </button>

        {/* Quick Add - ALWAYS visible on mobile */}
        <div
          className={cn(
            "absolute bottom-34 md:bottom-10 left-4 right-4 z-20 transition-all duration-300",
            "opacity-100 sm:opacity-0 translate-y-2",
            "group-hover:opacity-100 group-hover:translate-y-0",
          )}
        >
          <Button
            className={cn(
              "w-full bg-primary/95 hover:bg-primary text-primary-foreground backdrop-blur-sm",
              "rounded-xl py-4 font-medium tracking-wide",
              "text-sm sm:text-base"
            )}
            disabled={users?.role === "Admin"}
            onClick={handleCart}
          >
            <ShoppingBag className="w-4 h-4 mr-2 shrink-0" />
            <span className="truncate">Add to Cart</span>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div
        className={cn(
          "flex flex-col gap-2 p-4",
          "sm:relative",
          "absolute bottom-0 left-0 right-0 z-20 text-white sm:text-primary",
          "sm:bg-secondary dark:bg-gradient-to-t from-black/60 via-transparent to-transparent",
        )}
      >
        <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium">
          {product?.subCategory}
        </span>

        <h3
          className={cn(
            "font-medium leading-tight text-balance",
            isCarousel ? "text-base" : "text-sm",
          )}
        >
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2 mt-1">
          <span className={cn("font-semibold", isCarousel ? "text-xl" : "text-lg")}>
            {formatPrice(product?.price)}
          </span>

          {(product?.isDiscountDeal || product?.isXmasDeal) && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product?.initialPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

export default CollectionCard;

