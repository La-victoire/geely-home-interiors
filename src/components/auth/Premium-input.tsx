"use client"

import { forwardRef, type InputHTMLAttributes } from "react"

interface PremiumInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const PremiumInput = forwardRef<HTMLInputElement, PremiumInputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && <label className="block text-sm text-muted-foreground tracking-wide">{label}</label>}
        <input
          ref={ref}
          className={`
            w-full
            px-5 py-4
            bg-secondary/50
            border border-border/50
            rounded-xl
            text-foreground
            placeholder:text-muted-foreground/60
            transition-all duration-300
            focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20
            shadow-[0_2px_10px_rgba(0,0,0,0.04)]
            ${error ? "border-destructive/50 focus:border-destructive focus:ring-destructive/20" : ""}
            ${className}
          `}
          {...props}
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    )
  },
)

PremiumInput.displayName = "PremiumInput"
