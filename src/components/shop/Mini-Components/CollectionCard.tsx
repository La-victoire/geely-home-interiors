import { useCart } from '@/components/contexts/CartContext';
import { useUsers } from '@/components/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getData, createProfile } from '@/lib/actions';
import { cart } from '@/lib/cart';
import { cartProduct, getDiscountBadges, User } from '@/lib/types';
import { Star } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'
import Image from "next/image"
import { ShoppingBag, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from 'sonner';
import { MultiBadge } from './discount-badge';

export type product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    category: string;
    categoryId: string;
    images: [{
      url: string,
      public_url: string
    }];
    stock:number;
    status:string;
    sku?: string;
    quantity?:number;
    rating?: number;
    dimensions:{};
    reviewsCount?: number;
    features: string[];
    colors?: string[];
}

interface products { 
  product:product;
  variant?: "default" | "carousel";
  className?: string;
}

function CollectionCard({ product, variant = "default", className }: products) {
  const {cartProducts, setCartCount} = useCart() as {cartProducts:cartProduct[],setCartCount:React.Dispatch<React.SetStateAction<number>>};
  const {users} = useUsers() as {users:User};
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const badges = getDiscountBadges(product)
  const isCarousel = variant === "carousel"

  const handleCart = () => {
    if (users) {
       const exists = cartProducts.find((p) => p.product?._id === product?._id);
  
      if (exists) {
         createProfile('/carts/add', {
           product: product._id,
           quantity: 1,
           price: product.price
         });
         toast.success("Product quantity updated in cart");
         return;
       }
  
       setCartCount((prev: number) => prev + 1);
       createProfile('/carts/add', {
         product: product._id,
         quantity: 1,
         price: product.price
       });
       toast.success("Product Added to cart");
       return;
     }
  
     // guest flow
     const exists = cartProducts.find((p) => p.product?._id === product?._id);
  
     if (exists) {
       cart.addToCart(product, 1);
       setCartCount((prev: number) => prev + 1);
     } else {
       cart.addToCart(product, 1);
     }
   };

  return (

        <article
      className={cn(
        "group relative flex flex-col bg-card rounded-2xl overflow-hidden transition-all duration-300",
        "hover:shadow-xl hover:shadow-black/5 hover:scale-[1.02]",
        isCarousel ? "min-w-[280px] sm:min-w-[320px] lg:min-w-[340px]" : "",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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

        {/* Mobile Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 sm:bg-transparent"></div>

        {/* Gradient Overlay for Carousel */}
        {isCarousel && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        )}

        {/* Discount Badges */}
        {badges.length > 0 && (
          <div className="absolute top-3 left-3 z-10">
            <MultiBadge badges={badges} size={isCarousel ? "md" : "sm"} />
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={cn(
            "absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm",
            "transition-all duration-200 hover:bg-white hover:scale-110",
            "opacity-0 group-hover:opacity-100",
            isWishlisted && "opacity-100",
          )}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={cn("w-4 h-4 transition-colors", isWishlisted ? "fill-sale text-sale" : "text-foreground")}
          />
        </button>

        {/* Quick Add Button - appears on hover */}
        <div
          className={cn(
            "absolute bottom-20 md:bottom-9 left-4 right-4 z-10 transition-all duration-300",
            "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0",
          )}
        >
          <Button
            className={cn(
              "w-full bg-primary/95 hover:bg-primary text-primary-foreground backdrop-blur-sm",
              "rounded-xl py-4 font-medium tracking-wide",
              "text-sm sm:text-base"
            )}
            disabled={product.status !== "In Stock" || users?.role === "Admin" && true } onClick={()=> handleCart()}
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
          "sm:bg-secondary bg-gradent-to-t from-black/60 via-transparent to-transparent",
        )}
      >
        {/* Category */}
        <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium">
          {product?.subcategory}
        </span>

        {/* Title */}
        <h3
          className={cn(
            "font-medium leading-tight text-balance",
            isCarousel ? "text-base" : "text-sm",
          )}
        >
          {product.name}
        </h3>

        {/* Rating */}

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className={cn("font-semibold", isCarousel ? "text-xl" : "text-lg")}>
            ₦{product.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          {product?.isDiscountDeal && (
            <span className="text-sm text-muted-foreground line-through">
              ₦{product?.initialPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          )}
        </div>
      </div>
    </article>

    // <Card className='lg:w-[30dvw] border-r-8 hover:border-r-2 duration-200 relative gap-0 p-0 h-[70dvh]'>
    //   <img 
    //   src={product?.images[0]?.url}
    //   loading='lazy'
    //   alt='product-image'
    //   className='w-full relative rounded-t-2xl h-full not-sm:rounded-2xl md:h-1/2 object-cover'
    //   />
    //   <div className='absolute not-sm:flex hidden item-col pointer-events-none justify-end py-3 rounded-2xl bg-black/40 w-full h-full'/> 
    //   <div className='flex not-sm:text-white w-full p-5 not-sm:absolute bottom-0 text-center item-col gap-3'>
    //     <p className='headFont text-xl'>{product.name}</p>
    //     <p className='text-sm'>{product.description}</p>
    //     <div className='flex justify-between'>
    //       <p className='text-[#ed9e59] font-bold text-xl'>₦{product.price}</p>
    //       <p className='flex gap-2 flex-center'> <span className={product.status === "In Stock" ? "text-green-400" : "text-red-400"}>{product.status}</span> ({product.stock | 0})</p>
    //     </div>
    //     <div className='flex w-full justify-between'>
    //       <Link href={`products/${product._id}`}>
    //         <Button>View Details</Button>
    //       </Link>
    //       <Button disabled={product.status !== "In Stock" || users?.role === "Admin" && true } onClick={()=> handleCart()} className='bg-[#ed9e59] hover:bg-amber-300 text-white'>Add to Cart</Button>
    //     </div>
    //   </div>
    // </Card>
  )
}

export default CollectionCard;

