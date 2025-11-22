import React from 'react'
import { Button } from '../ui/button'
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';
import gsap from 'gsap';
import Link from 'next/link';

const CTA = () => {

    useGSAP(()=> {

    const ctaText = new SplitText('#cta', {type:'chars, words'});
    

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#cta-container",
          start: "top bottom",
        }
      })
        tl.from("#cta-Card", {
          opacity: 0,
          duration: 1.2,
          ease: "expo.Out",
        })
        .from(ctaText.chars, {
          opacity: 0,
          scale: 0.8,
          stagger: 0.05,
          duration: 0.3,
          ease: "power1.inOut",
        })

    },[]);

  return (
    <>
    <section id="cta-container" className='lg:px-10 px-3'>
    <div id='cta-Card' className='flex my-20 rounded-2xl md:h-[80dvh] md:item-row bg-accent item-col'>
      <img
      className='md:w-1/2 h-full object-cover not-sm:rounded-t-2xl md:rounded-l-2xl'
      src="/images/white-bedroom.jpg" 
      alt="white-bed" />
      <div className='text-center h-full py-15 px-5 md:px-20 w-full flex item-col flex-center'>
        <p id='cta' className=' headFont text-2xl md:text-3xl'>Think you can't afford beautiful interior design? <br /> Think again.</p>
        <Button asChild className='w-full bg-primary hover:bg-foreground text-md md:text-lg' >
          <Link href={'/shop/products'}>
            ORDER NOW
          </Link>
        </Button>
      </div>
    </div>
    </section>
    </>
  )
}

export default CTA