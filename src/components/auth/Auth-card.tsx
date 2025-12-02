"use client"

import type { ReactNode } from "react"

interface AuthCardProps {
  children: ReactNode
  className?: string
}

export function AuthCard({ children, className = "" }: AuthCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-background via-background to-secondary/30">
      {/* Soft ambient glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div
        className={`
          relative w-full max-w-md
          bg-card/80 backdrop-blur-sm
          rounded-2xl
          shadow-[0_4px_40px_rgba(0,0,0,0.06)]
          border border-border/50
          p-8 md:p-10
          ${className}
        `}
      >
        {children}
      </div>
    </div>
  )
}
