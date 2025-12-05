"use client"

import { useState, useEffect } from "react"

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date("2026-01-05T00:00:00").getTime()
      const now = Date.now()
      const difference = targetDate - now

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div
      className="
      p-3 rounded-xl border 
      bg-white/70 border-black/10 
      dark:bg-black/40 dark:border-white/10
    "
    >
      <div className="w-full max-w-[260px] mx-auto">
        <div className="flex items-center justify-center gap-3">

          {/* Days */}
          <div className="text-center">
            <div className="text-sm md:text-lg font-bold text-black dark:text-white tabular-nums">
              {String(timeLeft.days).padStart(2, "0")}
            </div>
            <p className="text-[10px] uppercase tracking-wider text-black/60 dark:text-white/70">
              Days
            </p>
          </div>

          <div className="text-lg md:text-2xl text-black/50 dark:text-white/50">:</div>

          {/* Hours */}
          <div className="text-center">
            <div className="text-sm md:text-lg font-bold text-black dark:text-white tabular-nums">
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <p className="text-[10px] uppercase tracking-wider text-black/60 dark:text-white/70">
              Hours
            </p>
          </div>

          <div className="text-lg md:text-2xl text-black/50 dark:text-white/50">:</div>

          {/* Minutes */}
          <div className="text-center">
            <div className="text-sm md:text-lg font-bold text-black dark:text-white tabular-nums">
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <p className="text-[10px] uppercase tracking-wider text-black/60 dark:text-white/70">
              Minutes
            </p>
          </div>

          <div className="text-lg md:text-2xl text-black/50 dark:text-white/50">:</div>

          {/* Seconds */}
          <div className="text-center">
            <div className="text-sm md:text-lg font-bold text-black dark:text-white tabular-nums">
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
            <p className="text-[10px] uppercase tracking-wider text-black/60 dark:text-white/70">
              Seconds
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

