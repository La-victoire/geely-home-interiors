"use client"
import { useUsers } from '@/components/contexts/UserContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { editProfile } from '@/lib/actions'
import { User } from '@/lib/types'
import React, { useState } from 'react'
import { toast } from 'sonner'

const AddressCard = () => {
   const {users,setUsers} = useUsers() as {users:User, setUsers:React.Dispatch<React.SetStateAction<User>>};
   const [isEditing, setIsEditing] = useState(false);
    const handleAddress = (index:number, key:string, value:string) => {
    setIsEditing(true);
    setUsers({...users, addresses: users.addresses.map((addr, idx) => idx === index ? {...addr, [key]: value } : addr) })
    console.log("Address Update:", users.addresses);
  }
    const handleProfile = async () => {
        try {
            const data:User = await editProfile(`users/${users._id}`, {addresses:users.addresses})
            if (!data.error)
                toast.success("Address Updated Successfully")
                setIsEditing(false);
        } catch (error) {
            console.error(error);
            toast.error("Problem saving Address!")
            setIsEditing(true);
        }
    }
  
  return (
    <Card className="w-full rounded-md px-7">
        <CardHeader className='headFont not-sm:text-xl text-3xl flex'> Shipping Address</CardHeader>
        <CardContent className='flex flex-col gap-5 p-5'>
            <div className='grid gap-3'>
              <Label htmlFor='Street'>Street*</Label>
              <Input id='street' name='street' value={users?.addresses[0]?.street} onChange={(e) => handleAddress(0, "street", e.target.value)}  placeholder="123 Oak street" required/>
            </div>
            <div className='grid grid-cols-2 gap-5'>
              <div className='grid gap-3'>
                <Label htmlFor='state'>State*</Label>
                <Input id='state' name='state' value={users?.addresses[0]?.state} onChange={(e) => handleAddress(0, "state", e.target.value)} placeholder="Lagos" required/>
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='city'>City*</Label>
                <Input id='city' name='city' value={users?.addresses[0]?.city} onChange={(e) => handleAddress(0, "city", e.target.value)} placeholder="Ikeja" required/>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-5'>
              <div className='grid gap-3'>
                <Label htmlFor='postalCode'>Postal Code*</Label>
                <Input id='postalCode' name='postalCode' value={users?.addresses[0]?.postalCode} onChange={(e) => handleAddress(0, "postalCode", e.target.value)} placeholder="10001" required/>
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='country'>Country*</Label>
                <Input id='country' name='country' value={users?.addresses[0]?.country} onChange={(e) => handleAddress(0, "country", e.target.value)} placeholder="Nigeria" required/>
              </div>
          </div>
        </CardContent>
        {isEditing && (
            <CardFooter className='flex justify-end p-5'>
                <Button onClick={handleProfile}>Save Address</Button>
            </CardFooter>
        )}
    </Card>
  )
}

export default AddressCard