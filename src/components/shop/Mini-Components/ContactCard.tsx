"use client"
import { useUsers } from '@/components/contexts/UserContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { editProfile } from '@/lib/actions'
import { User } from '@/lib/types'
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'

const ContactCard = () => {
   const {users,setUsers} = useUsers() as {users:User, setUsers:React.Dispatch<React.SetStateAction<User>>};
   const [info, setInfo] = useState({firstname:"", lastname:"", phone:"", email:""})
   const [authUser, setAuthUser] = useState();

   useEffect(()=> {
       const id = sessionStorage.getItem("userId");
        if (authUser) setAuthUser(id)        
    },[])
   const showButton = info.phone === "" || info?.firstname === "" || info?.lastname === "" || info?.email === "" || !users?.email || !users.phone || !users ?.firstname || !user?.lastname;

   const handleFormChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setInfo({...info, [name]:value})
    }
    const handleNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        const nameParts = value.split(" ");
        const firstName = nameParts.slice(0, -1).join(" ");
        const lastName = nameParts.slice(-1).join(" ");
        setInfo({...info, firstname:firstName, lastname:lastName})
    }
   const onSubmit = async () => {
        try {
           
             if (info.firstname === "" || info.lastname === "") {
                toast.error("PLEASE ENSURE YOUR FIRST AND LAST NAME ARE SEPARATED WITH A SPACE!") } 
             else {
                if (info.firstname !== "" && info.lastname !== "") {
                    if (!authUser) {
                        setUsers({...users, firstname:info.firstname, lastname:info.lastname})
                        setInfo({...info, firstname:"", lastname:""})
                        toast.success("User Name Updated Successfully")
                    } else {
                        const data:User = await editProfile(`users/${users._id}`, {firstname:info.firstname, lastname:info.lastname})
                        if (!data.error)
                            setUsers({...users, firstname:info.firstname, lastname:info.lastname})
                            toast.success("Name Updated Successfully")
                    }
                }
              }
   
            if (info.email !== "") {
                if (!authUser) {
                    setUsers({...users, email:info.email})
                    setInfo({...info, email:""})
                    toast.success("User Email Updated Successfully")
                    return;
                }
                const data:User = await editProfile(`users/${users._id}`, {email:info.email})
                if (!data.error)
                    setUsers({...users, email:info.email})
                    toast.success("Email Updated Successfully")
                    setInfo(data.phone ? {...info, phone:data.phone} : {...info, email:data.email})
            }
            if (info.phone !== "") {
                 if (!authUser) {
                    setUsers({...users, phone:info.phone})
                    setInfo({...info, phone:""})
                    toast.success("User Phone Number Updated Successfully")
                    return;
                }
                const data:User = await editProfile(`users/${users._id}`, {phone:info.phone})
                if (!data.error)
                    setUsers({...users, phone:info.phone!})
                    toast.success("Phone Number Updated Successfully")
                    setInfo(data.firstname && data.lastname ? {...info, firstname:data.firstname, lastname:data.lastname} : {...info, phone:data.phone})
            }
            if (info.firstname === "" && info.lastname === "" && info.phone === "" && info.email === "") {
                toast.error("Please fill in all fields before saving.")
            }
            if (info.firstname !== "" && info.lastname !== "" && info.phone !== "" && info.email !== "") {
                 if (!authUser) {
                    setUsers({...users, firstname:info.firstname, lastname:info.lastname, phone:info.phone, email:info.email})
                    toast.success("User Profile Updated Successfully")
                    return;
                }
                const data:User = await editProfile(`users/${users._id}`, {firstname:info.firstname, lastname:info.lastname, phone:info.phone, email:info.email})
                if (!data.error)
                    setUsers({...users, firstname:info.firstname, lastname:info.lastname, phone:info.phone, email:info.email})
                    toast.success("Profile Updated Successfully")
                    setInfo({firstname:data.firstname, lastname:data.lastname, phone:data.phone, email:data.email})
            }

        } catch (error) {
            console.error(error);
            toast.error("Problem Saving Profile!")
        }
    }
  return (
    <Card className="w-full rounded-md px-7">
        <CardHeader className='headFont not-sm:text-xl text-3xl flex'> Contact Information</CardHeader>
        <CardContent className='flex flex-col gap-5 bg-accent-foreground/10 p-5 rounded-lg'>
            <p className='-mb-2 text-xs'> Please Space between your first and last name</p>
            <div className='flex flex-col gap-2 justify-between py-1 border-0 border-b'>
                <p>Name:</p>
                {users?.firstname && users?.lastname ? (
                    <p>{users?.firstname} {users?.lastname}</p>
                ):(
                    <Input className='flex-1/2' placeholder='John Smith' type={'text'} onChange={(e)=> handleNameChange(e)}/>
                )}
            </div>
            <div className='flex flex-col gap-2 py-1 border-0 border-b'>
                <p>Email:</p>
                {users?.email ? (
                    <p>{users?.email}</p>
                ):(
                    <Input className='flex-1/2' placeholder='johnsmith@example.com' name="email" type={'text'} onChange={(e)=> handleFormChange(e)}/>
                )}
            </div>
            <div className='flex flex-col gap-2 justify-between py-1'>
                <p>Phone:</p>
                {users?.phone ? (
                    <p>{users?.phone}</p>
                ):(
                    <Input className='flex-1/2' placeholder='+234-###########' name="phone" type={'text'} onChange={(e)=> handleFormChange(e)}/>
                )}
            </div>
            {showButton && (
                <Button className='self-end mt-2' onClick={onSubmit}> Save Profile</Button>
            )}
        </CardContent>
        <CardFooter className='text-xs'>
            Please Ensure your contact information is accurate for order updates.
        </CardFooter>
    </Card>
  )
}

export default ContactCard
