import { users } from '@/components/constants'
import UserProfile from '@/components/profile/UserProfile'
import React from 'react'

const page = async ({ params }: { params: Promise<{ id: string}>}) => {
  const id = (await params).id;
  const profile = users.filter((user) => user.id === id)
  return (
    <main className='pt-20 px-5 md:px-10'>
      <UserProfile profile={profile}/>
    </main>
  )
}

export default page