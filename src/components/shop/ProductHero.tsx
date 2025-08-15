"use client"
import React from 'react'
import { Button } from '../ui/button'
import { Heart, ShoppingCart } from 'lucide-react'
import { useMediaQuery } from 'react-responsive'

const ProductHero = ({item,index}) => {
  const isMobile = useMediaQuery({maxWidth: 767 });

  return (
    <div>
      {
        isMobile ? (
          <div key={index} className='flex flex-col-reverse gap-5'>
              <div className=''>
                <div className='flex item-col h-full gap-5'>
                  <p className='text-5xl headFont py-10'>{item.name}</p>
                  <div>
                    <div className='flex mb-5 gap-2'>
                      {item.images.map((image:string)=> (
                        <img src={image} alt="mini-image" className='w-[130px] h-[100px] rounded-2xl' />
                      ))}
                    </div>
                    <div className='flex gap-5 items-end'>
                      <p className='text-[#ed9e59] text-3xl'>${item.price}</p>
                      <p>{item.rating} ({item.reviewsCount} reviews)</p>
                    </div>
                    <p className='mb-5'>{item.description}</p>
                    <div className='flex gap-5'>
                      <Button className='bg-[#ed9e59] text-white'>
                        <ShoppingCart />
                        Add to Cart
                      </Button>
                      <Button>
                        <Heart />
                        Add to Wishlist
                      </Button>
                    </div>
                  <div className='flex gap-3 mt-5 items-center'>
                    <p>Quantity:</p>
                    <div className='flex gap-2 border rounded-2xl items-center'>
                      <Button variant="ghost">-</Button>
                      <p>2</p>
                      <Button variant="ghost">+</Button>
                    </div>
                  </div>
                </div>
                </div>   
              </div>
              <div className="rounded-2xl h-[90dvh] overflow-hidden">
                <img src={item.images[0]} alt="Styled Chair" className="w-full h-full object-cover" />
              </div>
          </div>
        ) : (
          <div key={index} className='flex gap-5'>
              <div className='w-1/2'>
                <div className='flex item-col h-full relative justify-between'>
                  <p className='text-5xl headFont py-20'>{item.name}</p>
                  <div>
                    <div className='flex absolute bottom-1/3 left-70 gap-2'>
                      {item.images.map((image:string)=> (
                        <img src={image} alt="mini-image" className='w-[130px] h-[100px] rounded-2xl' />
                      ))}
                    </div>
                    <div className='flex gap-5 items-end'>
                      <p className='text-[#ed9e59] text-3xl'>${item.price}</p>
                      <p>{item.rating} ({item.reviewsCount} reviews)</p>
                    </div>
                    <p className='mb-5 w-[30dvw]'>{item.description}</p>
                    <div className='flex gap-5'>
                      <Button className='bg-[#ed9e59] text-white'>
                        <ShoppingCart />
                        Add to Cart
                      </Button>
                      <Button>
                        <Heart />
                        Add to Wishlist
                      </Button>
                    </div>
                  <div className='flex gap-3 mt-5 items-center'>
                    <p>Quantity:</p>
                    <div className='flex gap-2 border rounded-2xl items-center'>
                      <Button variant="ghost">-</Button>
                      <p>2</p>
                      <Button variant="ghost">+</Button>
                    </div>
                  </div>
                </div>
                </div>   
              </div>
              <div className="w-1/2 rounded-2xl clip-irregular-frame h-[90dvh] overflow-hidden">
                <img src={item.images[0]} alt="Styled Chair" className="w-full h-full object-cover" />
              </div>
          </div>
        )
      }
    </div>
        
  )
}

export default ProductHero