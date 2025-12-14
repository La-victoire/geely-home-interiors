"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { ArrowLeft, Heart, ShoppingCart } from 'lucide-react'
import { useMediaQuery } from 'react-responsive'
import { cart } from '@/lib/cart'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import { useCart } from '../contexts/CartContext'
import { wishList } from '@/lib/wishList'
import { product } from './Mini-Components/CollectionCard'
import { toast } from 'sonner'
import { createProfile } from '@/lib/actions'
import { cartProduct, getDiscountBadges, User } from '@/lib/types'
import { useUsers } from '../contexts/UserContext'
import { DiscountBadge, MultiBadge } from './Mini-Components/discount-badge'

const ProductHero = ({item}:{item:product}) => {
  const [quantity, setQuantity] = useState(1)
  const [isVisble, setIsVisible] = useState(item.images[0]?.url)
  const {users} = useUsers() as {users:User};
  const {cartProducts, setCartProducts,setCartCount, setWishListCount} = useCart() as {cartProducts:cartProduct[], setCartProducts: any, setCartCount:React.Dispatch<React.SetStateAction<number>>, setWishListCount:React.Dispatch<React.SetStateAction<number>>};
  const isMobile = useMediaQuery({maxWidth: 767 });

const handleCart = async () => {
  if (users) {
    const safeCart = Array.isArray(cartProducts) ? cartProducts : [];
    const exists = safeCart.find(p => p.product?._id === item._id);
    if (exists) {
      const updatedCart = await createProfile('/carts/add', {
          product: item._id,
          quantity,
          price: item.price
        });
      setCartProducts(updatedCart.cart);
      console.log(updatedCart.cart);
      toast.success("Product quantity updated in cart");
      setQuantity(1);
      return;
    };

    setCartCount((prev: number) => prev + 1);
     const updatedCart = await createProfile('/carts/add', {
          product: item._id,
          quantity,
          price: item.price
        });
    setCartProducts(updatedCart.cart);
    console.log(updatedCart.cart);
    toast.success("Product Added to cart");
    setQuantity(1);
    return;
  }

  // guest flow
  const safeCart = Array.isArray(cartProducts) ? cartProducts : [];
  const exists = safeCart.find(p => p.product?._id === item._id);

  if (exists) {
    cart.addToCart(item, quantity);
    setCartCount((prev: number) => prev + 1);
  } else {
    cart.addToCart(item, quantity);
  }
  setQuantity(1);
};

const badges = getDiscountBadges(item)

const addToWishList = () => {
    const data = wishList.getWishList().find((p) => p._id === item._id)
    if (data) {
      toast.message(
        "Product already in watchlist"
      )
    } else {
      setWishListCount((prev) => prev + 1)
      wishList.addToWishList(item) 
    }
  }

  return (
    <div>
      {
        isMobile ? (
          <div className='flex flex-col-reverse gap-5'>
              <div className=''>
                <Button variant="outline" onClick={() => history.back()}>
                  <ArrowLeft />
                  Go Back 
                </Button>
                <div className='flex item-col h-full gap-5'>
                  <p className='text-5xl headFont pt-5'>{item.name}</p>
                  <div className='flex gap-3'>
                    {badges.length > 0 && (
                        <MultiBadge badges={badges} size={"md"} />
                    )}
                    <span className="text-[11px] uppercase tracking-widest text-muted-foreground flex items-center font-medium">
                      {item?.subCategory}
                    </span>
                  </div>
                  <div>
                    <Carousel className=''>
                    <CarouselContent className=''>
                      {item?.images?.map((image,index:number)=> (
                      <CarouselItem key={index} className='basis-1.5/4'>
                        <img onClick={()=> setIsVisible(image?.url)} src={image.url} alt={`mini-image-${index}`} className='w-[110px] bg-black/20 h-[100px] rounded-2xl' />
                      </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                    <div className='flex my-4 flex-col-reverse items-start'>
                      <p className='text-[#ed9e59] text-3xl'>₦{item.price}</p>
                       {(item?.isDiscountDeal || item?.isXmasDeal) && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₦{item?.initialPrice?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      )}
                    </div>
                    <p className='mb-5'>{item.description}</p>
                    <div className='flex gap-5'>
                      <Button onClick={()=> handleCart()} className='bg-[#ed9e59] text-white'>
                        <ShoppingCart />
                        Add to Cart
                      </Button>
                      <Button onClick={()=> addToWishList()}>
                        <Heart />
                        Add to Wishlist
                      </Button>
                    </div>
                  <div className='flex gap-3 mt-5 items-center'>
                    <p>Quantity:</p>
                    <div className='flex gap-2 border rounded-2xl items-center'>
                      <Button onClick={()=> setQuantity((prev)=> prev - 1)} variant="ghost">-</Button>
                      <p>{quantity}</p>
                      <Button onClick={()=> setQuantity((prev)=> prev + 1)} variant="ghost">+</Button>
                    </div>
                  </div>
                </div>
                </div>   
              </div>
              <div className="rounded-xl h-[90dvh] bg-black/20 overflow-hidden">
                <img src={isVisble} alt="Product-img" className="w-full h-full object-cover" />
              </div>
          </div>
        ) : (
          <div className='flex gap-5'>
              <div className='w-1/2'>
                <Button variant="outline" onClick={() => history.back()}>
                  <ArrowLeft />
                  Go Back 
                </Button>
                <div className='flex item-col h-full relative justify-between'>
                <div className="mt-20 flex flex-col-reverse ">
                  <p className='text-5xl headFont py-5'>{item.name}</p>
                  <div className='flex gap-5 -mt-10'>
                    {badges.length > 0 && (
                        <MultiBadge badges={badges} size={"lg"} />
                    )}
                    <span className="text-[11px] uppercase tracking-widest text-muted-foreground flex items-center font-medium">
                      {item?.subCategory}
                    </span>
                  </div>
                </div>
                  <div>
                  <Carousel className='-mr-45 mb-3'>
                    <CarouselContent className='flex flex-row-reverse'>
                      {item?.images?.map((image,index:number)=> (
                      <CarouselItem key={index} className='basis-1/5 -ml-7'>
                        <img src={image.url} onClick={()=> setIsVisible(image.url)} alt="mini-image" className='w-[110px] bg-black/20 h-[100px] rounded-2xl' />
                      </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                    <div className='flex flex-col-reverse items-start'>
                      <p className='text-[#ed9e59] text-3xl'>₦{item.price}</p>
                      {(item?.isDiscountDeal || item?.isXmasDeal) && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₦{item?.initialPrice?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      )}
                    </div>
                    <p className='mb-5 w-[30dvw]'>{item.description}</p>
                    <div className='flex gap-5'>
                      <Button onClick={()=> handleCart()} className='bg-[#ed9e59] text-white'>
                        <ShoppingCart />
                        Add to Cart
                      </Button>
                      <Button onClick={()=> addToWishList()}>
                        <Heart />
                        Add to Wishlist
                      </Button>
                    </div>
                  <div className='flex gap-3 mt-5 items-center'>
                    <p>Quantity:</p>
                    <div className='flex gap-2 border rounded-2xl items-center'>
                     <Button onClick={()=> setQuantity((prev)=>prev - 1)} variant="ghost">-</Button>
                      <p>{quantity}</p>
                     <Button onClick={()=> setQuantity((prev)=>prev + 1)} variant="ghost">+</Button>
                    </div>
                  </div>
                </div>
                </div>   
              </div>
              <div className="w-1/2 rounded-2xl clip-irregular-frame bg-black/20 h-[90dvh] overflow-hidden">
                <img src={isVisble} alt="product-img" className="w-full h-full object-cover" />
              </div>
          </div>
        )
      }
    </div>
        
  )
}

export default ProductHero
