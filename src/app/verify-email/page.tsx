"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { GeelyLogo } from "@/components/order/geely-logo"
import { AuthCard } from "@/components/auth/Auth-card"
import { PremiumButton } from "@/components/order/premium-button"
import { PremiumInput } from "@/components/auth/Premium-input"
import { Mail, ArrowRight } from "lucide-react"
import { useUsers } from "@/components/contexts/UserContext"
import { User } from "@/lib/types"
import { createProfile } from "@/lib/actions"
import { toast } from "sonner"

export default function VerifyEmailPage() {
  const {users}:{users:User} = useUsers();
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [error, setError] = useState("")

   useEffect(()=>{
      if(users?.email && users?.email !== "")
       setEmail(users.email)
    },[])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email) {
      setError("Please enter your email address")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    try {
      const data = await createProfile("/users/send-verification", {email})
      if (data?.message) {
        toast.message(`${data.message}`)
      }
    } catch(error) {
      console.error(error);
      setIsLoading(false)
      toast.error("Something went wrong.")
      setIsSent(false)
      return;
    }

    setIsLoading(false)
    setIsSent(true)
  }

  if (isSent) {
    return (
      <AuthCard>
        <div className="text-center space-y-6">
          <GeelyLogo />

          <div className="pt-6 space-y-3">
            <div className="w-16 h-16 mx-auto bg-gold/10 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-gold" />
            </div>
            <h1 className="font-serif text-2xl text-foreground">Check Your Inbox</h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We&apos;ve sent a verification link to
              <br />
              <span className="text-foreground font-medium">{email}</span>
            </p>
          </div>

          <div className="pt-4 space-y-3">
            <PremiumButton variant="outline" onClick={() => setIsSent(false)}>
              Use a different email
            </PremiumButton>

            <p className="text-xs text-muted-foreground">
              Didn&apos;t receive the email?{" "}
              <button
                type="button"
                className="text-gold hover:text-gold/80 transition-colors underline underline-offset-2"
                onClick={() => {
                  setIsLoading(true)
                  setTimeout(() => setIsLoading(false), 1500)
                }}
              >
                Resend
              </button>
            </p>
          </div>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard>
      <div className="text-center space-y-6">
        <GeelyLogo />

        <div className="pt-4 space-y-2">
          <h1 className="font-serif text-2xl md:text-3xl text-foreground">Verify Your Email</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Enter your email so we can send you a verification link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="pt-2 space-y-5">
          <PremiumInput
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
            aria-label="Email address"
          />

          <PremiumButton type="submit" isLoading={isLoading}>
            <span>Send Verification Link</span>
            <ArrowRight className="w-5 h-5" />
          </PremiumButton>
        </form>

        <p className="text-xs text-muted-foreground pt-2">
          Already verified?{" "}
          <a href="/shop/products" className="text-gold hover:text-gold/80 transition-colors underline underline-offset-2">
            Continue shopping
          </a>
        </p>
      </div>
    </AuthCard>
  )
}
