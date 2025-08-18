import React from 'react'
import { Button } from '../ui/button'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import Link from 'next/link';

const Hero = () => {
    useGSAP(()=> {
     gsap.set('#video-frame', {
      clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
      borderRadius: '0 0 40% 10%',
    })

    const splitText = SplitText.create('#text', {
      type:"chars"
    })
    

    const tl = gsap.timeline({
      scrollTrigger:{
        trigger: '#video-frame',
        start: 'center center',
        end: 'bottom center',
        scrub: true
    }})

    gsap.from(splitText.chars, {
          opacity: 0,
          scale: 0.9,
          stagger: 0.02,
          duration: 0.3,
          ease: "power1.inOut",
        })

    tl.from('#video-frame', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      borderRadius: '0 0 0 0',
      ease: 'power1.inOut',
    })

})
  return (
    <section>
    <div id='video-frame' className="relative z-10 h-dvh w-screen overflow-hidden bg-[#dfdff2]">
      <video
        muted
        autoPlay
        
        className="h-full relative w-full object-cover"
        src="/videos/Bright-parlor.mp4" 
        />

        <div className="abs-center w-full flex-center gap-10 flex item-col z-20 ">
        <div className=" z-20 abs-center bg-black/30 pointer-events-none blur-3xl rounded-full h-[70dvh] w-1/3"/>
        <h2 id="text" className='headFont text-[#020618] text-3xl md:text-5xl text-center p-15'>
          Transform Your Space into Your Sanctuary
        </h2>
        <Link href={`shop/products`} className="flex flex-center items-center">
          <Button variant="outline" className="md:scale-125 border-0 shadow-2xl dark:bg-foreground bg-foreground text-accent">Explore Collections</Button>
        </Link>
        </div>
    </div>
    <div className="abs-center w-full flex-center flex item-col z-0 ">
    <h2 className='headFont text-3xl md:text-5xl text-center flex flex-wrap p-15'>
      Transform Your Space into Your Sanctuary
    </h2>
    </div>
  </section>
  )
}

export default Hero