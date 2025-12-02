"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { GeelyLogo } from "@/components/order/geely-logo"
import { AuthCard } from "@/components/auth/Auth-card"
import { PremiumButton } from "@/components/order/premium-button"
import { SuccessCheckmark } from "@/components/order/success-checkmark"
import { ShieldCheck } from "lucide-react"

export default function VerifyOTPPage() {
  const router = useRouter()
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  const handleVerify = async () => {
    setError("")

    if (otp.length !== 6) {
      setError("Please enter the complete 6-digit code")
      return
    }

    setIsLoading(true)

    // Simulate API verification
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulate validation (in real app, verify with backend)
    if (otp === "123456") {
      setIsSuccess(true)
      setTimeout(() => {
        router.push("/verified")
      }, 2000)
    } else {
      setError("Invalid verification code. Please try again.")
      setIsLoading(false)
    }
  }

  const handleResend = () => {
    if (resendCooldown > 0) return
    setResendCooldown(60)
    setOtp("")
    setError("")
  }

  if (isSuccess) {
    return (
      <AuthCard>
        <div className="text-center space-y-6 py-8">
          <SuccessCheckmark size="md" />
          <div className="space-y-2">
            <h2 className="font-serif text-2xl text-foreground">Verified!</h2>
            <p className="text-muted-foreground text-sm">Redirecting you...</p>
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
          <div className="w-14 h-14 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="w-7 h-7 text-gold" />
          </div>
          <h1 className="font-serif text-2xl md:text-3xl text-foreground">Enter Verification Code</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            We sent a 6-digit code to your email.
            <br />
            <span className="text-xs text-muted-foreground/70">(Hint: use 123456 for demo)</span>
          </p>
        </div>

        <div className="pt-4 space-y-6">
          {/* <OTPInput value={otp} onChange={setOtp} error={!!error} /> */}

          {error && (
            <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1 duration-300">{error}</p>
          )}

          <PremiumButton onClick={handleVerify} isLoading={isLoading} disabled={otp.length !== 6}>
            Verify Email
          </PremiumButton>
        </div>

        <div className="pt-2 space-y-3">
          <p className="text-xs text-muted-foreground">
            Didn&apos;t receive the code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={resendCooldown > 0}
              className={`
                transition-colors underline underline-offset-2
                ${resendCooldown > 0 ? "text-muted-foreground/50 cursor-not-allowed" : "text-gold hover:text-gold/80"}
              `}
            >
              {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend Code"}
            </button>
          </p>
        </div>
      </div>
    </AuthCard>
  )
}
