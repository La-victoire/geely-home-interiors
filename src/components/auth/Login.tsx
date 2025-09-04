"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import Link from 'next/link'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Eye, EyeClosed } from 'lucide-react'

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const changeEye = () => {
    setIsPasswordVisible((prev)=> !prev)
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
            <Input id="email" type="email" placeholder="name@example.com"   required />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className='headFont' htmlFor="password">Password</Label>
              <Link href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className='flex items-center gap-3'>
              <Input id="password" type={!isPasswordVisible ? "text" : "password"} placeholder='******' required />
              {isPasswordVisible ? (<EyeClosed onClick={()=> changeEye()}/>) : (<Eye onClick={()=> changeEye()}/>)} 
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex relative not-lg:flex-col pt-5 gap-2">
          <Button type="submit" className="lg:w-3/5 w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"} 
          </Button>
          <div className='border-0 border-b flex md:hidden w-full my-5'/>
          <p className='text-xs not-md:absolute top-19 not-md:bg-background px-2 text-foreground/50'>or</p>
           <Button type="button" className="lg:w-1/3 w-full bg-accent-foreground border text-background hover:text-white" >
              Sign in with Google 
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default Login