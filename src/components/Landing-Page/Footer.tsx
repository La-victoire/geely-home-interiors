"use client"
import React from 'react'
import { useMediaQuery } from 'react-responsive';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Footer_Links } from '../constants';
import Link from 'next/link';
import { Input } from '../ui/input';
import { FaFacebook, FaInstagram, FaTiktok, FaXTwitter } from 'react-icons/fa6';
import { Button } from '../ui/button';
import { signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import { useUsers } from '../contexts/UserContext';
import { User } from '@/lib/types';

const Footer = () => {
  const {users}:{users:User} = useUsers();
  const isMobile = useMediaQuery({maxWidth: 767 });
  const currentYear = new Date().getFullYear();
  const authUser = typeof window === "undefined" ? [] : sessionStorage.getItem("userId");
  const isAuthenticated = users?._id || authUser;

  return (
    <footer className='bg-accent w-screen'> 
      <section className='py-15 flex md:item-row item-col justify-between px-12'>
        <div>
          {isMobile ? (
          <div className=''>
            <Accordion
            type="single"
            collapsible
            className='flex item-col no-underline'
            >
            {Footer_Links.map(({title,content}, index) => 
            (
              <AccordionItem key={index} value={title}>
                <AccordionTrigger>
                {title}
                </AccordionTrigger>
                <AccordionContent className='flex gap-8 item-col p-5'>
                  {title === "Categories"
                  ? 
                  content.map((item,index) => (
                    <Link key={index} 
                     href={`/shop/products?page=1&category=${item.toString()}`}>
                      {item}
                    </Link>
                  ))
                  :
                  content.map((item,index) => (
                    <Link key={index} 
                     href={`/${item.toLocaleLowerCase()}` }>
                      {item}
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            )
            )}
            </Accordion>
          </div>
          ) : (
            <div className='grid grid-cols-2 gap-20'>
              {Footer_Links.map((({title,content},index) => (
              <div key={index} className=''>
                <p>{title}</p>
                <div className='flex gap-3 pt-5 px-3 item-col'>
                  {title === "Categories"
                  ? 
                  content.map((item,index) => (
                    <Link key={index} 
                     href={`/shop/products?page=1&category=${item.toString()}`}>
                      {item}
                    </Link>
                  ))
                  :
                  content.map((item,index) => (
                    <Link key={index} 
                     href={`/${item.toLocaleLowerCase()}` }>
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
              )))}
            </div>
          )}
        </div>
        <div className='flex item-col gap-7'>
          <label htmlFor='email' className=''>GET EXCLUSIVE TIPS & OFFERS</label>
          <Input 
          className=''
          placeholder='Enter email address'
          />
          <Button className='w-max -mt-3 px-10 bg-foreground text-background hover:bg-foreground/80'>
            Subscribe
          </Button>
          <p>
            JOIN OUR COMMUNITY
          </p>
          <div className='flex -mt-4 gap-5'>
              <a href="https://www.instagram.com/geelyinteriors/"><FaInstagram size={20}/></a>
              <a href="https://web.facebook.com/geelydecorwallpapers"><FaFacebook size={20}/></a>
              <a href="https://x.com/geelyInteriors"><FaXTwitter size={20}/></a>
              <a href="https://tiktok.com/@geelyInteriors?_r=1&_t=ZS-91cma6zQagC"><FaTiktok size={20}/></a>
          </div>
          {isAuthenticated ? 
            <Button onClick={() => signOut()} className='w-max px-10 bg-foreground text-background hover:bg-foreground/80'>
             Log Out
            </Button>
          :
           <Button asChild className='w-max px-10 bg-foreground text-background hover:bg-foreground/80'>
            <Link href="/auth">
                Log In
            </Link>
          </Button>
           }
        </div>
      </section>
      <section className='py-5 border-t border-foreground flex md:item-row item-col justify-between px-12'>
      <p className='headFont text-2xl'>
          <span className='text-white dark:text-white/50'>Geely</span> Home Interiors
      </p>
      <div className='flex md:item-row item-col md:gap-10'>
        <p>Copyright &copy;{currentYear}</p>
        <p>Developed by <a href="https://la-victoireportfolio.vercel.app/"><span className='headFont'> La_Victoire&trade;</span></a></p>
      </div>
      </section>
    </footer>
  )
}

export default Footer
