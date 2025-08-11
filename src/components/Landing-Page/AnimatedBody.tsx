import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'
import React, { useLayoutEffect, useRef } from 'react'
import { Card } from '../ui/card'
import { useMediaQuery } from 'react-responsive'
import { Button } from '../ui/button'
  
const AnimatedBody = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textItemsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const isMobile = useMediaQuery({maxWidth: 767 });

  const words = ['Design Elegance, Crafted','Spaces, Timeless Quality']
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(()=> {
      textItemsRef.current.forEach((item, i)=> {
        if (!item) return;

        gsap.set(item, {
          y: -300,
          opacity: 0,
          scale: isMobile ? 0.4 : 0.8
        });
      });
  
      // First animation: Form two lines
      const firstAnimation = gsap.to(textItemsRef.current, {
        opacity: 1,
        scale: isMobile ? 0.6 : 1,
        width: isMobile && 400,
        duration: 1.2,
        stagger: 0.15,
        x: (i) => {
          //Calculate horizontal position based on line position
          const positionInline = 1 % 2;
          const lineOffset = positionInline === 0 ? -200 : positionInline === 1 ? 0 :200;

          return lineOffset;
        },
        y: i => i = 1 ? -70 : 70,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'center center',
          scrub:1,
        }
      })

      // second animation: Form two lines
      const secondAnimation = gsap.to(textItemsRef.current, {
        x: (i) => {
          const spacing = window.innerWidth / (words.length + 1);
          return ((i + 1) * spacing) - (window.innerWidth / 2);
        },
        duration: 1.5,
        stagger: 0.1,
        y: -window.innerHeight * 0.4,
        scrollTrigger: {
          trigger: containerRef.current,
          start: firstAnimation.scrollTrigger?.end,
          end: 'bottom center',
          scrub:1,
          pin: true,
        }
      })
    }, containerRef);

    return () => ctx.revert();
  }, []);
  
  return (
    <section className='mt-12'>
      <div ref={containerRef}>
       <div id='Text' className='md:text-5xl md:text-center lg:px-50 headFont w-dvw flex item-col min-h-screen flex-center'>
         <div className=" z-20 abs-center bg-foreground/5 pointer-events-none blur-3xl rounded-full h-[70dvh] w-1/3"/>
          {words.map((text,i) => (
            <span key={i} ref={el => textItemsRef.current[i] = el} className="w-full not-sm:text-3xl">
              {text}
            </span>
          ))}
        </div>
      </div>
      <div className='flex md:item-row item-col -mt-100 md:-mt-130 w-full flex-center md:justify-around'>
        <img className='object-cover max-h-[70dvh] w-9/10 md:w-1/2 rounded-2xl' src="/images/IMG_20250622_191209_748.jpg" alt="flower" />
        <div className='flex item-col gap-7 justify-center w-8/10 md:w-1/3'>
          <h2 className='text-4xl text-center headFont'>
            Our Vision
          </h2>
          <div className='not-sm:flex-center flex item-col gap-8'>
          <p >
            At Geely Home Interiors, we believe that exceptional design transforms spaces and elevate experiences. We are dedicated to sourcing and curating the finest interior decoration pieces from around the globe, bringing unparalleled luxury and style to your business. <span className='mt-5'/> Our mission is to empower businesses to create environment that inspire, impress, and reflect their unique brand identity.
          </p>
          <div>
          <Button variant="outline">
            LEARN MORE
          </Button>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AnimatedBody