import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { product } from './Mini-Components/CollectionCard'
import { SHIPPING_POLICY } from '../constants'

const ProductInfo = ({item}) => {
  return (
    <>
    <section className='my-10'>
      <Accordion
        type="single"
        collapsible
        className='flex item-col no-underline'
        >
          <AccordionItem value="details">
            <AccordionTrigger>
             Product Details
            </AccordionTrigger>
            <AccordionContent className='flex gap-2 item-col p-5'>
              <li>Category: {item.category} </li>
              <li>Colors Available: 
                <div className='pt-2'>
                  {item.colors.map((color:string, index)=>
                  <p key={index} className='px-10'>{color},</p>
                  )}
                </div>
              </li>
              <li>Dimensions: W:{item?.dimensions?.width}, H:{item?.dimensions?.height} </li>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="feature">
            <AccordionTrigger>
             Features
            </AccordionTrigger>
            <AccordionContent className='flex gap-2 item-col p-5'>
              {item.features.map((feature:string, index)=> <li key={index}>{feature}</li>)}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="shipping-details">
            <AccordionTrigger>
             Shipping & Returns
            </AccordionTrigger>
            <AccordionContent className='p-5'>
              {SHIPPING_POLICY.overview.map((point:string,index:number) => (
                <li key={index} className='mb-2'>{point}</li>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
    </section>
    </>
  )
}

export default ProductInfo
