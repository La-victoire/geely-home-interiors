import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Heart, Menu, Moon, ShoppingCart, Sun, User2, X } from 'lucide-react'
import { useTheme } from 'next-themes';
import { Header_Menu, sideMenu } from '../constants';
import Link from 'next/link';
import { Card } from '../ui/card';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';


const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleOpenSidebar = () => {
    setIsActive(true);
  }
  const handleCloseSidebar = () => {
    setIsActive(false)
  }
  useEffect(() => setMounted(true), []);
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
    <nav className='flex w-full px-5 not-sm:gap-6 md:px-10 item-row absolute z-50 h-[10dvh] justify-between items-center'>
      <p className='headFont text-md md:text-xl'>
        <span className='text-white/50'>Geely</span> Home Interiors
      </p>

      <div className='md:flex hidden gap-10'>
        {Header_Menu.map(({name,link},index)=> (
          <Link key={index} href={`${link}`}>{name}</Link>
        ))}
      </div>
      <div className='md:flex hidden gap-3'>
        <Link href={`/shop/cart`}>
          <Button className='text-foreground rounded-4xl bg-background hover:text-accent'>
            <ShoppingCart />
          </Button>
        </Link>
        <Link href={`/shop/wishlist`}>
          <Button className='text-foreground rounded-4xl bg-background hover:text-accent'>
            <Heart />
          </Button>
        </Link>
        <Link href={`/profile`}>
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

        <Link href={`/profile`}>
          <Button className='text-foreground rounded-4xl bg-background hover:text-accent'>
            <User2 />
          </Button>
        </Link>

        <div>
          <Button onClick={handleOpenSidebar} className='text-foreground rounded-full bg-background hover:text-accent'>
            <Menu />
          </Button>
          {isActive && (
            <Card id='sidebar' className='absolute bg-black/30 px-10 py-2 w-dvw left-0.5 top-0.5 z-50 h-dvh'>
              <div className='w-full flex justify-end'>
                <Button className='rounded-full p-0' onClick={handleCloseSidebar}>
                  <X />
                </Button>
              </div>
            {sideMenu.map(({name,link},index)=> (
              <div key={index} className='flex'>
                <Link className='hover:text-background hover:mb-2 duration-300 border-b' href={`${link}`}>{name}</Link>
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