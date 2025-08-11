import React from 'react'
import { Card } from '../ui/card'
import { CLIENT_REVIEWS, VALUE_PROPS } from '../constants'
import { useMediaQuery } from 'react-responsive';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';

const Reviews = () => {

   const isMobile = useMediaQuery({maxWidth: 767 });


    useGSAP(()=> {

    const profSplit = new SplitText('#subtext', {type:'chars, words'});
    

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#container",
          start: "top center",
          end: "bottom center",
          scrub: 1
        }
      })
        tl.from("#headtext", {
          opacity: 0,
          scale: 0.4,
          duration: 2,
          ease: "expo.Out",
        })
        .from(profSplit.chars, {
          opacity: 0,
          scale: 0.5,
          stagger: 0.05,
          delay: 1,
          duration: 1,
          ease: "power1.inOut",
        })
        .from("#reviews", {
          opacity: 0,
          scale: 0.5,
          stagger: 0.3,
          delay: 2,
          duration: 1.6,
          ease: "power1.inOut",
        })

        const valueTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#value-container",
          start: "top bottom",
        }
      })

      valueTimeline
      .from("#value-cards", {
          opacity: 0,
          rotateX: 100,
          x: -500,
          scale: 0.5,
          stagger: 0.3,
          duration: 1,
          ease: "expo.out",
        })

    },[]);


  return (
    <>
    <section className='mt-50'>
      <div id="container">
        <h2 id="headtext" className='headFont text-3xl md:text-5xl mb-5 text-center'>Happy Clients. <br/> Beautiful Designs.</h2>
        <p id='subtext' className='text-muted-foreground text-xl px-7 text-center'>Our customers love our professional delivery and customer service and here's why.</p>
      </div>
      <div className='h-dvh mt-15'>
        <img
        className='absolute object-cover h-full w-screen' 
        src="/images/Bedroom.jpg"
        alt="" 
        />
        <div className='h-full w-full dark:flex hidden bg-black/40 pointer-events-none absolute z-0 ' />
        {isMobile ? (
          <Carousel
          plugins={[
          Autoplay({
            delay:5000,
          })
          ]}
          opts={{
          loop: true
          }}
          >
          <CarouselContent className='mt-30'>
            {CLIENT_REVIEWS.map(({name,location,review},index)=> (
            <CarouselItem key={name} className='px-10'>
              <Card key={name} className='gap-20 bg-white/85 px-5 py-10'>
                <p className='text-black/40'>
                  {review}
                </p>
                <div className='flex gap-1 item-col w-full'>
                  <p className='text-md text-black headFont'>{name}</p>
                  <p className='text-black/40 text-xs'>{location}</p>
                </div>
              </Card>
            </CarouselItem>
            ))}
          </CarouselContent>
          </Carousel>
        ) : (
        <div className='grid md:grid-cols-2 grid-cols-1 absolute w-full px-80 mt-10 gap-10'>
          {CLIENT_REVIEWS.map(({name,location,review},index)=> (
          <Card id='reviews' key={name} className='flex flex-center bg-white/85 px-5 py-10'>
            <p className='text-black/40'>
              {review}
            </p>
            <div className='flex gap-1 item-col w-full'>
              <p className='text-md text-black'>{name}</p>
              <p className='text-black/40 text-xs'>{location}</p>
            </div>
          </Card>
          ))}
        </div>
        )}
      </div>
      <p className='underline text-center pb-15 text-2xl text-[#ed9e59]'>
        SEE MORE REVIEWS
      </p>

    </section>

    <section id='value-container' className='px-10'>
      <div className='flex md:item-row item-col gap-13 md:gap-5 w-full'>
        {VALUE_PROPS.map(({title, description, icon},index) => (
          <Card id='value-cards' key={index} className='border-[#ed9e59] lg:w-1/2 border-1 px-10 py-5 gap-2'>
            <div className='relative w-20 h-20 flex flex-center left-1/3 -top-15 bg-background rounded-full'>
              <h2 className='text-center text-3xl'>{icon}</h2>
            </div>
            <h3 className='text-4xl text-center mb-5 headFont'>{title}</h3>
            <p className='text-muted-foreground text-center'> {description}</p>
          </Card>
        ))}
      </div>
    </section>
    </>
  )
}

export default Reviews