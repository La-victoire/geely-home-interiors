"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'

const Register = () => {
  const [isLoading, setIsLoading] = useState()
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
              <Input id="firstname" placeholder='John'  required />
            </div>
            <div className="space-y-2">
              <Label className='headFont' htmlFor="lastname">Last name</Label>
              <Input id="lastname" placeholder='Smith' required />
            </div>
          </div>
          <div className="space-y-2">
            <Label className='headFont' htmlFor="email-signup">Email</Label>
            <Input id="email-signup" type="email" placeholder="name@example.com" required />
          </div>
          <div className="space-y-2">
            <Label className='headFont' htmlFor="password-signup">Password</Label>
            <Input id="password-signup" placeholder='******' type="password" required />
          </div>
        </CardContent>
        <CardFooter className='flex item-col mt-5' >
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
          <div className="flex w-full items-center justify-center space-x-2">
            <Checkbox id="terms" required />
            <Label htmlFor="terms" className="md:text-sm text-xs font-normal">
              <p> I agree to the <Link href="#" className="text-primary hover:underline">
              terms of service</Link> and <Link href="#" className="text-primary hover:underline">
              privacy policy</Link> </p>
                
            </Label>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}

export default Register