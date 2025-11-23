import React, { useRef, useState } from 'react'
import { Card } from '../ui/card'
import { CATEGORIES } from '../constants'
import { Button } from '../ui/button'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'

const ShowCase = () => {
  const [IsReduced, setIsReduced] = useState<number>()

  useGSAP(()=> {
    const splitText = SplitText.create('#showcase h2', {
      type: "words"
    })

   const scrollTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#showcase",
      start: 'top center'
    }
   })

   scrollTimeline
   .from(splitText.words, {
    opacity: 0,
    duration: 0.5,
    yPercent: 100,
    ease: "expo.out",
    stagger: 0.03
   })
   .from('#grid-cards', {
    opacity: 0,
    duration: 0.5,
    ease: "power1.inOut",
    stagger: 0.18
   }, '-=0.7')
  },[])

  const increase = (index:number) => {
    setIsReduced(index)
  }
  const imageRef = useRef<(HTMLSpanElement | null)[]>([]);

    const handleEnter = (index:number) => {
      gsap.to(imageRef.current[index], {
        scale: 1.2,
        duration: 0.4,
        ease: "expo.inOut"
      })
    }

    const handleExit = (index:number) => {
      gsap.to(imageRef.current[index], {
        scale: 1,
        duration: 0.4,
        ease: "expo.out"
      })
    }
  return (
    <section id='showcase' className='mt-45 md:px-7'>
      <h2 className='text-3xl text-center px-5 mb-25 -mt-33 headFont md:text-5xl'>
        Explore What We Have To Offer.
      </h2>
      <div className=' md:grid-cols-3 grid xl:grid-cols-12 mb-5 md:px-0 grid-cols-1 gap-3 px-5'>
        {CATEGORIES.map(({title,image,description,slug}, index)=> (
        <Card id="grid-cards" key={index} className={` ${index % 2 ? "md:col-span-6" : 'md:col-span-3'} ${index === 4 && "md:col-span-6"}  p-0 relative max-h-[70dvh] overflow-hidden w-auto`}>
          <img
           ref={el => imageRef.current[index] = el}
           className='relative not-sm:p-1 h-full object-cover rounded-2xl' 
           onMouseEnter={() => handleEnter(index)}
           onMouseLeave={() => handleExit(index)}
           src={image} alt={slug} />
          <div className='absolute flex item-col pointer-events-none justify-end py-3 rounded-2xl bg-black/40 w-full h-full'/> 
          <div className='absolute bottom-5 px-7 z-30 w-full flex item-col gap-4'>
            <h2 className='text-2xl text-[#ed9e59] headFont'>{title}</h2>
            <p 
             className='text-white cursor-pointer text-base'
             onClick={() => increase(index)}
            >
              {IsReduced == index ? description : (description.slice(0, 50) + " ...See More") }
            </p>
          </div>
        </Card>
        ))}
      </div>
    </section>
  )
}

export default ShowCase
