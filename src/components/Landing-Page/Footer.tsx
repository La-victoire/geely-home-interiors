"use client"
import React from 'react'
import { useMediaQuery } from 'react-responsive';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Footer_Links } from '../constants';
import Link from 'next/link';
import { Input } from '../ui/input';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
   const isMobile = useMediaQuery({maxWidth: 767 });

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
                  {content.map((text,index) => 
                    <Link key={index} href={`/${text}`}>{text}</Link>
                  )}
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
                  {content.map((item) => (
                    <Link href={`/${item.toLowerCase()}`}>
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
              )))}
            </div>
          )}
        </div>
        <div className='flex item-col gap-10'>
          <label htmlFor='email' className=''>GET EXCLUSIVE TIPS & OFFERS</label>
          <Input 
          className='-mt-5'
          placeholder='Enter email address'
          />
          <p>
            JOIN OUR COMMUNITY
          </p>
          <div className='flex -mt-5 gap-5'>
              <Instagram />
              <Facebook />
              <Twitter />
          </div>
        </div>
      </section>
      <section className='py-5 border-t border-foreground flex md:item-row item-col justify-between px-12'>
      <p className='headFont text-2xl'>
          <span className='text-white dark:text-white/50'>Geely</span> Home Interiors
      </p>
      <div className='flex md:item-row item-col md:gap-10'>
        <p>Copyright &copy;2025</p>
        <p>Developed by <span className='headFont'> La_Victoire&trade;</span></p>
      </div>
      </section>
    </footer>
  )
}

export default Footer