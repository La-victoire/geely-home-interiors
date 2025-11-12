"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Eye, EyeClosed } from 'lucide-react'
import { createProfile } from '@/lib/actions'
import { toast } from 'sonner'

const Register = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  })
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  
  const changeEye = () => {
    setIsPasswordVisible((prev)=> !prev)
  }

   const handleFormSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate an API call
    setTimeout(async () => {
      try {
        const data = await createProfile("users", user)
        if (data?.error) {
          toast.error(data?.error);
          setIsLoading(false);
          return;
        } 

        sessionStorage.setItem("userToken", data?.token);
        sessionStorage.setItem("userId", data?.userData?._id);
        toast.success(`${data?.userData?.firstname} Registered successfully!`);
        console.log(data);
        setIsLoading(false);
        window.location.href = `/profile/${data?.userData?._id}`;
      } catch (error) {
        toast.error("An error occurred. Please try again.");
        console.error("Login error:", error);
        setIsLoading(false);
      }
    }, 5000);
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name , value } = e.target;
    setUser({...user, [name] : value });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='headFont text-center text-2xl md:text-4xl'>Create an account</CardTitle>
        <CardDescription className='text-center'>Enter your details to create a new account</CardDescription>
      </CardHeader>
      <form >
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className='headFont' htmlFor="firstname">First name</Label>
              <Input id="firstname" name='firstname' placeholder='John' onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label className='headFont' htmlFor="lastname">Last name</Label>
              <Input id="lastname" name='lastname' placeholder='Smith' onChange={handleChange} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label className='headFont' htmlFor="email-signup">Email</Label>
            <Input id="email-signup" name='email' type="email" placeholder="name@example.com" onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label className='headFont' htmlFor="password-signup">Password</Label>
            <div className='flex items-center gap-3'>
              <Input id="password-signup" name='password' type={!isPasswordVisible ? "text" : "password"} onChange={handleChange} placeholder='******' required />
              {isPasswordVisible ? (<EyeClosed onClick={()=> changeEye()}/>) : (<Eye onClick={()=> changeEye()}/>)} 
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex item-col mt-5' >
          <Button type="submit" onClick={handleFormSubmit} className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
          <div className="flex w-full items-center justify-center space-x-2">
            <Checkbox id="terms" required />
            <Label htmlFor="terms" className="md:text-sm text-xs font-normal">
              <p> I agree to the <Link href="#" className="text-primary font-semibold hover:underline">
              Terms of service</Link> and <Link href="#" className="text-primary font-semibold hover:underline">
              Privacy policy</Link> </p>
                
            </Label>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}

export default Register