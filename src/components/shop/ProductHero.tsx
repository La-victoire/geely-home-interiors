"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { ArrowLeft, Heart, ShoppingCart } from 'lucide-react'
import { useMediaQuery } from 'react-responsive'
import { cart } from '@/lib/cart'
import { toast } from 'sonner'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import { useCart } from '../contexts/CartContext'
import { wishList } from '@/lib/wishList'

const ProductHero = ({item,index}) => {
  const [quantity, setQuantity] = useState(1)
  const [isVisble, setIsVisible] = useState(item.images[0])
  const {setCartCount, setWishListCount} = useCart()
  const isMobile = useMediaQuery({maxWidth: 767 });

  const handleCart = () => {
     const data = cart.getCart().find((p) => p.id === item.id)
        if (!data) {
          cart.addToCart(item.id, quantity);
          setCartCount((prev:number) => prev + 1)
        } {
          cart.addToCart(item.id, quantity);
        }
    setQuantity(1)
  };

  const addToWishList = () => {
      const data = wishList.getWishList().find((p) => p.id === item.id)
      if (data) {
        toast.message(
          "Product already in watchlist"
        )
      } else {
        setWishListCount((prev) => prev + 1)
        wishList.addToWishList(item.id) 
      }
    }

  return (
    <div>
      {
        isMobile ? (
          <div key={index} className='flex flex-col-reverse gap-5'>
              <div className=''>
                <Button variant="outline" onClick={() => history.back()}>
                  <ArrowLeft />
                  Go Back 
                </Button>
                <div className='flex item-col h-full gap-5'>
                  <p className='text-5xl headFont py-5'>{item.name}</p>
                  <div>
                    <Carousel className=''>
                    <CarouselContent className=''>
                      {item.images.map((image:string,index:number)=> (
                      <CarouselItem key={index} className='basis-1/4'>
                        <img onClick={()=> setIsVisible(image)} src={image} alt="mini-image" className='w-[110px] bg-black/20 h-[100px] rounded-2xl' />
                      </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                    <div className='flex gap-5 items-end'>
                      <p className='text-[#ed9e59] text-3xl'>${item.price}</p>
                      <p>{item.rating} ({item.reviewsCount} reviews)</p>
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
          <div key={index} className='flex gap-5'>
              <div className='w-1/2'>
                <Button variant="outline" onClick={() => history.back()}>
                  <ArrowLeft />
                  Go Back 
                </Button>
                <div className='flex item-col h-full relative justify-between'>
                  <p className='text-5xl headFont py-5'>{item.name}</p>
                  <div>
                  <Carousel className='-mr-45 mb-3'>
                    <CarouselContent className='flex flex-row-reverse'>
                      {item.images.map((image:string,index:number)=> (
                      <CarouselItem key={index} className='basis-1/5 -ml-7'>
                        <img src={image} onClick={()=> setIsVisible(image)} alt="mini-image" className='w-[110px] bg-black/20 h-[100px] rounded-2xl' />
                      </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                    <div className='flex gap-5 items-end'>
                      <p className='text-[#ed9e59] text-3xl'>${item.price}</p>
                      <p>{item.rating} ({item.reviewsCount} reviews)</p>
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
                     <Button onClick={()=> setQuantity((prev)=> Math.max(1 ,prev - 1))} variant="ghost">-</Button>
                      <p>{quantity}</p>
                     <Button onClick={()=> setQuantity((prev)=> Math.min(item.stock ,prev + 1))} variant="ghost">+</Button>
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