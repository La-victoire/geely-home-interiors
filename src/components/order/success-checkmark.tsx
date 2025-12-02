"use client"

import { useEffect, useState } from "react"
import { Check } from "lucide-react"

interface SuccessCheckmarkProps {
  size?: "sm" | "md" | "lg"
  showGlow?: boolean
}

export function SuccessCheckmark({ size = "lg", showGlow = true }: SuccessCheckmarkProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  }

  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  return (
    <div className="relative flex items-center justify-center">
      {/* Glowing background aura */}
      {showGlow && (
        <div
          className={`
            absolute
            ${sizeClasses[size]}
            bg-gold/20
            rounded-full
            blur-2xl
            transition-all duration-1000
            ${isVisible ? "scale-150 opacity-100" : "scale-100 opacity-0"}
          `}
        />
      )}

      {/* Outer ring */}
      <div
        className={`
          relative
          ${sizeClasses[size]}
          rounded-full
          border-2 border-gold
          flex items-center justify-center
          transition-all duration-500 ease-out
          ${isVisible ? "scale-100 opacity-100" : "scale-50 opacity-0"}
        `}
      >
        {/* Inner fill */}
        <div
          className={`
            absolute inset-2
            bg-gradient-to-br from-gold/20 to-gold/5
            rounded-full
            transition-all duration-700 delay-200
            ${isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"}
          `}
        />

        {/* Checkmark */}
        <Check
          className={`
            ${iconSizes[size]}
            text-gold
            stroke-[2.5]
            transition-all duration-500 delay-300
            ${isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"}
          `}
        />
      </div>
    </div>
  )
}
