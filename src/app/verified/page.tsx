"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { GeelyLogo } from "@/components/order/geely-logo"
import { AuthCard } from "@/components/auth/Auth-card"
import { PremiumButton } from "@/components/order/premium-button"
import { SuccessCheckmark } from "@/components/order/success-checkmark"
import { Sparkles } from "lucide-react"

export default function VerifiedPage() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AuthCard>
      <div className="text-center space-y-8">
        <div
          className={`
            transition-all duration-700
            ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          <GeelyLogo />
        </div>

        <div className="py-4">
          <SuccessCheckmark size="lg" showGlow />
        </div>

        <div
          className={`
            space-y-3
            transition-all duration-700 delay-300
            ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          <h1 className="font-serif text-2xl md:text-3xl text-foreground">Your Email Has Been Verified</h1>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Thank you! Your account is now active.
            <br />
            Welcome to Geely Home Interiors.
          </p>
        </div>

        <div
          className={`
            pt-4 space-y-4
            transition-all duration-700 delay-500
            ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          <Link href="/products">
            <PremiumButton>
              <Sparkles className="w-5 h-5" />
              <span>Continue Shopping</span>
            </PremiumButton>
          </Link>

          <p className="text-xs text-muted-foreground">Explore our curated collection of luxury home interiors</p>
        </div>
      </div>
    </AuthCard>
  )
}
