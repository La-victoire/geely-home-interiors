"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import CollectionCard, { product } from "./Mini-Components/CollectionCard"

interface DiscountCarouselProps {
  products: product[]
  title?: string
  subtitle?: string
  className?: string
}

export function DiscountCarousel({
  products,
  title = "Holiday Collection",
  subtitle = "Exclusive seasonal offers on premium home pieces",
  className,
}: DiscountCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollability = () => {
    const container = scrollContainerRef.current
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0)
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScrollability()
    window.addEventListener("resize", checkScrollability)
    return () => window.removeEventListener("resize", checkScrollability)
  }, [])

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (container) {
      const scrollAmount = container.clientWidth * 0.8
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className={cn("relative py-12 lg:py-20", className)}>
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-gold" />
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Limited Time</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {title}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-md">{subtitle}</p>
          </div>

          {/* Navigation Arrows - Desktop */}
          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={cn(
                "rounded-full w-11 h-11 border-border/60 bg-card",
                "hover:bg-primary hover:text-primary-foreground hover:border-primary",
                "disabled:opacity-40 disabled:hover:bg-card disabled:hover:text-foreground",
                "transition-all duration-200",
              )}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={cn(
                "rounded-full w-11 h-11 border-border/60 bg-card",
                "hover:bg-primary hover:text-primary-foreground hover:border-primary",
                "disabled:opacity-40 disabled:hover:bg-card disabled:hover:text-foreground",
                "transition-all duration-200",
              )}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollability}
            className={cn(
              "flex gap-4 lg:gap-6 overflow-x-auto scrollbar-hide scroll-smooth",
              "snap-x snap-mandatory pb-4",
              "-mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8",
            )}
          >
            {products.map((product) => (
              <div key={product._id} className="snap-start">
                <CollectionCard product={product} variant="carousel" />
              </div>
            ))}
          </div>

          {/* Gradient Edges */}
          <div
            className={cn(
              "absolute not-sm:-left-5 -left-8 top-0 bottom-4 w-8 pointer-events-none",
              "bg-gradient-to-l from-transparent to-black",
              canScrollLeft ? "opacity-100" : "opacity-0",
              "transition-opacity duration-200",
            )}
          />
          <div
            className={cn(
              "absolute not-sm:-right-5 -right-8 top-0 bottom-4 w-8 pointer-events-none",
              "bg-gradient-to-r from-transparent to-black",
              canScrollRight ? "opacity-100" : "opacity-0",
              "transition-opacity duration-200",
            )}
          />
        </div>

        {/* Mobile Navigation */}
        <div className="flex sm:hidden items-center justify-center gap-3 mt-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="rounded-full w-10 h-10 border-border/60"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="rounded-full w-10 h-10 border-border/60"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
