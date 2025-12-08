"use clent"
import React, { useEffect, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Edit } from 'lucide-react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { User } from '@/lib/types'
import { editProfile } from '@/lib/actions'
import { toast } from 'sonner'

const EditProfile = ({setPerson, person}:{setPerson:any, person:User}) => {
  const [ind, setInd]:User = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (person) {
      setInd({...person, addresses: person?.addresses?.length > 0 ? person.addresses : [{ street: '', city: '', state: '', postalCode: '', country: '' }]});
    }
  }, [person]);
  
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name , value } = e.target;
    setInd({...ind, [name] : value });
  }
  const handleAddress = (index:number, key:string, value:string) => {
    setInd({...ind, addresses: ind.addresses.map((addr, idx) => idx === index ? {...addr, [key]: value } : addr) })
    console.log("Address Update:", ind.addresses);
  }
  const handleFormSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setPerson(ind)
    const data =  await editProfile(`/users/${ind._id}`, ind);
    if (data?.error || !data) {
      toast.error(`An error occured, Please try again!`);
      setIsLoading(false)
      return;
    }
    toast.success("Profile Edited Successfully!");
    setIsLoading(false)
    setOpen(false)
  }

return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="ml-3"> Edit
        <Edit className='ml-3 hover:text-background/70' />
      </DialogTrigger>
      <DialogContent className='max-h-[70dvh] overflow-y-scroll'>
        <form onSubmit={handleFormSubmit}>
          <DialogHeader>
            <DialogTitle className='headFont text-3xl'>Edit Profile</DialogTitle>
            <DialogDescription>Customize your identity</DialogDescription>
          </DialogHeader>
          <div className='grid gap-5 my-5'>
            <div className='grid grid-cols-2 gap-5'>
              <div className='grid gap-3'>
                <Label htmlFor='firstname'>Firstname*</Label>
                <Input id='firstname' name='firstname' value={ind?.firstname} onChange={handleChange} placeholder="John" required/>
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='lastname'>Lastname*</Label>
                <Input id='lastname' name='lastname' value={ind?.lastname} onChange={handleChange} placeholder="Smith" required/>
              </div>
            </div>
            <div className='grid gap-3'>
                <Label htmlFor='email'>Email Address*</Label>
                <Input id='email' name='email' value={ind?.email} onChange={handleChange} placeholder="johnsmith@email.com" required/>
            </div>
            <div className='grid gap-3'>
                <Label htmlFor='phone-number'>Phone*</Label>
                <Input id='phone-number' name='phone' value={ind?.phone} onChange={handleChange} placeholder="+234-########" required/>
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='Street'>Street*</Label>
              <Input id='street' name='street' value={ind?.addresses[0]?.street} onChange={(e) => handleAddress(0, "street", e.target.value)}  placeholder="123 Oak street" required/>
            </div>
            <div className='grid grid-cols-2 gap-5'>
              <div className='grid gap-3'>
                <Label htmlFor='state'>State*</Label>
                <Input id='state' name='state' value={ind?.addresses[0]?.state} onChange={(e) => handleAddress(0, "state", e.target.value)} placeholder="Lagos" required/>
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='city'>City*</Label>
                <Input id='city' name='city' value={ind?.addresses[0]?.city} onChange={(e) => handleAddress(0, "city", e.target.value)} placeholder="Ikeja" required/>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-5'>
              <div className='grid gap-3'>
                <Label htmlFor='postalCode'>Postal Code*</Label>
                <Input id='postalCode' name='postalCode' value={ind?.addresses[0]?.postalCode} onChange={(e) => handleAddress(0, "postalCode", e.target.value)} placeholder="10001" required/>
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='country'>Country*</Label>
                <Input id='country' name='country' value={ind?.addresses[0]?.country} onChange={(e) => handleAddress(0, "country", e.target.value)} placeholder="Nigeria" required/>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}> {isLoading ? "Editing..." : "Edit Profile"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfile
