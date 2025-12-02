"use client"

import { Snowflake } from "lucide-react"

export function GeelyLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {/* Minimal gold line logo with Christmas wreath styling */}
      <div className="relative">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-gold"
        >
          {/* Abstract home/interior symbol */}
          <path d="M24 6L6 20V42H42V20L24 6Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M18 42V28H30V42" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="24" cy="20" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
        {/* Subtle gold glow */}
        <div className="absolute inset-0 bg-gold/10 blur-xl rounded-full" />
        <Snowflake
          className="absolute -top-1 -right-1 w-4 h-4 text-primary/70 animate-spin"
          style={{ animationDuration: "4s" }}
        />
        <Snowflake
          className="absolute -bottom-1 -left-1 w-3 h-3 text-primary/60 animate-spin"
          style={{ animationDuration: "5s" }}
        />
      </div>
      <span className="font-serif text-lg tracking-[0.2em] text-muted-foreground">GEELY</span>
      <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">Home Interiors</span>
    </div>
  )
}
