"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Heart, Menu, Moon, ShoppingCart, Sun, User2, X } from 'lucide-react'
import { useTheme } from 'next-themes';
import { Header_Menu, sideMenu } from '../constants';
import Link from 'next/link';
import { Card } from '../ui/card';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Badge } from '../ui/badge';
import { useCart } from '../contexts/CartContext';
import { useUsers } from '../contexts/UserContext';
import { useSession } from 'next-auth/react';


const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { theme, setTheme } = useTheme();
  const {cartCount, wishListCount} = useCart();
  const {users} = useUsers();
  const { data: session } = useSession();
  const handleOpenSidebar = () => {
    setIsActive(true);
  }
  const handleCloseSidebar = () => {
    setIsActive(false)
  }
  useEffect(() => 
    setMounted(true),
   []);

  useGSAP(()=> {
    isActive ? (
      gsap.from("#sidebar", {
        xPercent: 500,
        duration: 1.2,
        ease: "expo.Out"
      })
    ) : (
      gsap.to("#sidebar", {
      xPercent: -500,
      duration: 1.2,
      ease: "expo.in",
      })
    )
  },[isActive]);

  if (!mounted) return null; // prevent hydration mismatch


  return (
    <nav className='flex w-dvw px-2 bg-black/30 lg:px-5 not-sm:gap-6 md:px-10 item-row fixed z-50 h-[10dvh] justify-between items-center'>
      <p className='headFont text-md md:text-xl'>
        <span className='text-accent'>Geely</span> Home Interiors
      </p>

      <div className='md:flex hidden gap-10'>
        {Header_Menu.map(({name,link},index)=> (
          <Link key={index} href={`${link}`}>{name}</Link>
        ))}
      </div>
      <div className='md:flex hidden gap-3'>
        <Link href={`/shop/cart`}>
          <Button className='text-foreground rounded-4xl bg-background hover:text-accent'>
            {cartCount > 0 && (
              <Badge variant="destructive" className='rounded-full'>{cartCount}</Badge>
            )}
            <ShoppingCart />
          </Button>
        </Link>
        <Link href={`/shop/wishlist`}>
          <Button className='text-foreground rounded-4xl bg-background hover:text-accent'>
            {wishListCount > 0 && (
              <Badge variant="destructive" className='rounded-full'>{wishListCount}</Badge>
            )}
            <Heart />
          </Button>
        </Link>
        <Link href={users?.role === "Client" ? `/profile/${users?._id}` : users?.role === "Admin" ? "/dashboard" : session ? `/profile/${session?.userId}`: "/auth" }>
          <Button className='text-foreground rounded-4xl bg-background hover:text-accent'>
            <User2 />
          </Button>
        </Link>

          <Button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="border rounded-full"
        >
          {theme === "dark" ? (
            <Sun />
          ) : (
            <Moon />
          )}
        </Button>
      </div>

      <div className='md:hidden gap-3 flex'>
        <Button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full"
        >
          {theme === "dark" ? (
            <Sun />
          ) : (
            <Moon />
          )}
        </Button>

        <Link href={users?.role === "Client" ? `/profile/${users?._id}` : users?.role === "Admin" ? "/dashboard" : "/auth" }>
          <Button className='text-foreground rounded-4xl bg-background hover:text-accent'>
            <User2 />
          </Button>
        </Link>

        <div>
          <Button onClick={handleOpenSidebar} className='text-foreground relative rounded-full bg-background hover:text-accent'>
            <Menu />
            {(cartCount) > 0 && (
              <div className='rounded-full bg-red-500 absolute top-1 right-2 h-1 w-1 '/>
            )}
          </Button>
          {isActive && (
            <Card id='sidebar' className='absolute bg-black/70 px-10 py-2 w-dvw -left-0 top-0.5 z-50 h-dvh'>
              <div className='w-full flex justify-end'>
                <Button className='rounded-full p-0' onClick={handleCloseSidebar}>
                  <X />
                </Button>
              </div>
            {sideMenu.map(({name,link},index)=> (
              <div key={index} className='flex'>
                <Link className='hover:text-background text-white flex hover:mb-2 duration-300 border-b' href={`${link}`}>
                {name}
                </Link>
                {cartCount > 0 && index === 3 && (
                  <Badge variant="destructive" className='ml-3 rounded-full'>{cartCount}</Badge>
                )}

                {wishListCount > 0 && index === 2 && (
                  <Badge variant="destructive" className='ml-3 rounded-full'>{wishListCount}</Badge>
                )}
              </div>
            ))}
            </Card>
          )
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar
