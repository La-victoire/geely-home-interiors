import UserProfile from '@/components/profile/UserProfile'
import React from 'react'

const page = async ({ params }: { params: Promise<{ id: string}>}) => {
  const id = (await params).id;
  return (
    <main className='pt-20 px-5 md:px-10'>
      <UserProfile id={id}/>
    </main>
  )
}

export default page