import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { product } from './Mini-Components/CollectionCard'

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
              <li>Stock: {item?.stock || "Out of Stock"}</li>
              <li>Colors Available: 
                <div className='pt-2'>
                  {item.colors.map((color:string)=>
                  <p className='px-10'>{color},</p>
                  )}
                </div>
              </li>
              <li>Dimensions: W:{item.dimensions.width}, H:{item.dimensions.height}, D:{item.dimensions.depth} </li>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="feature">
            <AccordionTrigger>
             Features
            </AccordionTrigger>
            <AccordionContent className='flex gap-2 item-col p-5'>
              {item.features.map((feature:string)=> <li>{feature}</li>)}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="shipping-details">
            <AccordionTrigger>
             Shipping & Returns
            </AccordionTrigger>
            <AccordionContent className='p-5'>
              <p>
                We offer fast and reliable shipping options. Estimated delivery times vary by location. Returns are accepted within 30 days
                of purchase, provided the item is in its original condition.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
    </section>
    </>
  )
}

export default ProductInfo