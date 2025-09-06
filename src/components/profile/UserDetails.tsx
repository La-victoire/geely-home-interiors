"use client"
import { User } from '@/lib/types'
import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'

const UserDetails = ({user}:{user:User}) => {
  return (
    <Card className='lg:w-full h-[40dvh]'>
      <CardHeader className='text-2xl md:text-3xl text-center headFont border-0 border-b'>{user.firstname} {user.lastname}</CardHeader>
      <CardContent className=''>
        <p>{user.email}</p>
        <p>{user.phone}</p>
      </CardContent>
    </Card>
  )
}

export default UserDetails