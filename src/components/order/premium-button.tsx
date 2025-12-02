"use client"

import type { ReactNode, ButtonHTMLAttributes } from "react"
import { Loader2 } from "lucide-react"

interface PremiumButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  isLoading?: boolean
  variant?: "primary" | "secondary" | "outline"
}

export function PremiumButton({
  children,
  isLoading = false,
  variant = "primary",
  className = "",
  disabled,
  ...props
}: PremiumButtonProps) {
  const baseStyles = `
    w-full py-4 px-6
    rounded-xl
    font-medium tracking-wide
    transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
    flex items-center justify-center gap-2
  `

  const variantStyles = {
    primary: `
      bg-gradient-to-r from-gold via-[#E5C158] to-gold
      text-primary
      hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(212,175,55,0.3)]
      active:scale-[0.98]
    `,
    secondary: `
      bg-secondary
      text-secondary-foreground
      hover:bg-secondary/80
    `,
    outline: `
      bg-transparent
      border border-border
      text-foreground
      hover:bg-secondary/50
    `,
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Please wait...</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}
