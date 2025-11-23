"use client"
import { useUsers } from '@/components/contexts/UserContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { editProfile } from '@/lib/actions'
import { User } from '@/lib/types'
import React, { useState } from 'react'
import { toast } from 'sonner'

const ContactCard = () => {
   const [phone, setPhone] = useState<string>();
   const {users,setUsers} = useUsers() as {users:User, setUsers:React.Dispatch<React.SetStateAction<User>>};
    const phoneSubmit = async () => {
        try {
            console.log(phone)
            const data:User = await editProfile(`users/${users._id}`, {phone:phone})
            if (!data.error)
                setUsers({...users, phone:phone!})
                toast.success("Phone Number Updated Successfully")
                setPhone(data.phone)
        } catch (error) {
            console.error(error);
            toast.error("Problem saving phone number!")
        }
    }
  return (
    <Card className="w-full rounded-md px-7">
        <CardHeader className='headFont not-sm:text-xl text-3xl flex'> Contact Information</CardHeader>
        <CardContent className='flex flex-col gap-5 bg-accent-foreground/10 p-5 rounded-lg'>
            <div className='flex justify-between py-1 border-0 border-b'>
                <p>Email</p>
                <p>{users?.email || "null"}</p>
            </div>
            <div className='flex justify-between py-1 border-0 border-b'>
                <p>Name</p>
                <p>{users?.firstname} {users?.lastname || "null"}</p>
            </div>
            <div className='flex justify-between py-1'>
                <p>Phone</p>
                {users?.phone ? (
                    <p>{users?.phone}</p>
                ):(
                    <div className='flex gap-3'>
                        <Input className='flex-1/2' placeholder='+234-###########' type={'text'} onChange={(e)=> setPhone(e.target.value)}/>
                        <Button className='flex-1/3' onClick={phoneSubmit}>Save</Button>
                    </div>
                )}
            </div>
        </CardContent>
    </Card>
  )
}

export default ContactCard
