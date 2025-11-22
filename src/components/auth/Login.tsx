"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import Link from 'next/link'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Eye, EyeClosed } from 'lucide-react'
import { createProfile } from '@/lib/actions'
import { toast } from 'sonner'
import { useUsers } from '../contexts/UserContext'
import { User } from '@/lib/types'
import { signIn } from 'next-auth/react'
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const {users,setUsers} = useUsers() as UserContextType
  interface UserContextType {
    users: User;
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  }
  
  const auth = async () => {
    const data = await signIn("google", { callbackUrl: "/" })
  }
    
  const changeEye = () => {
    setIsPasswordVisible((prev)=> !prev)
  }

  const handleFormSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    // Simulate an API call
    setTimeout(async () => {
      setIsLoading(true);
      try {
        const data = await createProfile("users/login", user)
        if (data?.error) {
          toast.error(data?.error);
          setIsLoading(false);
          return;
        } 

        sessionStorage.setItem("userToken", data?.token!);
        sessionStorage.setItem("userId", data?.userData?._id!);
        toast.success(`Welcome, ${data?.userData?.firstname}!`);
        setIsLoading(false);
        if (data?.userData?.role === "Admin") {
          window.location.href = "/dashboard";
          return;
        }
        window.location.href = `/profile/${data?.userData?._id}`;
      } catch (error) {
        toast.error("An error occurred. Please try again later.");
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
        <CardTitle className='headFont text-2xl text-center md:text-4xl'>LOG IN</CardTitle>
        <CardDescription className='text-center'>Enter your email and password to access your account</CardDescription>
      </CardHeader>
      <form >
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className='headFont' htmlFor="email">Email</Label>
            <Input id="email" name='email' type="email" placeholder="name@example.com" onChange={handleChange}  required />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className='headFont' htmlFor="password">Password</Label>
              <Link href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className='flex items-center gap-3'>
              <Input id="password" name='password' type={!isPasswordVisible ? "text" : "password"} onChange={handleChange} placeholder='******' required />
              {isPasswordVisible ? (<EyeClosed onClick={()=> changeEye()}/>) : (<Eye onClick={()=> changeEye()}/>)} 
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex relative not-lg:flex-col pt-5 gap-2">
          <Button type="submit" className="lg:w-3/5 w-full" onClick={handleFormSubmit} disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"} 
          </Button>
          <div className='border-0 border-b flex md:hidden w-full my-5'/>
          <p className='text-xs not-md:absolute top-19 not-md:bg-background px-2 text-foreground/50'>or</p>
           <Button
            type="button"
            onClick={auth}
            className="lg:w-1/3 w-full bg-accent-foreground border text-background hover:text-white" >
             <FcGoogle /> Sign in with Google 
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default Login
