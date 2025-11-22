"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'

const ProductReview = ({item}) => {
  const [isreview, setIsReview] = useState(false)

  const sendReview = () => {
    setIsReview((prev)=>!prev)
  }
  return (
    <>
    <section className='text-center'>
      <p className='text-4xl font-bold'>
        Customer Reviews ({item?.reviews?.length || "0"})
      </p>
      <div className='my-5 text-xl'>
        {item?.reviews ? (
          item?.reviews?.map((review:string,index:number) => 
            <li>
              {review}
            </li>
          )
        ):(
          <p>
            No reviews yet. Be the first to review this product!
          </p>
        )}
      </div>
      {isreview ? (
        <div className='flex flex-col px-10 gap-5'>
          <Textarea />
          <div>
           <Button onClick={() => sendReview()} variant="secondary"> Send Review</Button>
          </div>
        </div>
      ):(
      <Button onClick={() => setIsReview((prev)=>!prev)} variant="outline">
        Write a Review
      </Button>
      )}
    </section>
    </>
  )
}

export default ProductReview