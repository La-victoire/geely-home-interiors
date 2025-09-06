"use client"
import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { User } from '@/lib/types'

const AddressBook = ({user}:{user:User}) => {
  return (
     <Card className='w-full h-[40dvh]'>
      <CardHeader className='text-2xl md:text-3xl text-center headFont border-0 border-b'>Address Book</CardHeader>
      <CardContent className=''>
        <p className='font-bold mb-3'>Your Shipping Address:</p>
        {user.addresses.map((item)=> (
          <div key={item.id}>
            <p>{item.street}</p>
            <p>{item.city},{item.state}</p>
            <p>{item.country}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default AddressBook