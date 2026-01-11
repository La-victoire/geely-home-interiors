"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import CollectionCard, { product } from "./Mini-Components/CollectionCard"

interface SubcategoryCouponGroupProps {
  subcategoryName: string
  products: product[]
  className?: string
}

export function SubcategoryCarouselGroup({ subcategoryName, products, className }: SubcategoryCouponGroupProps) {
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

  if (products.length === 0) return null

  return (
    <section className={cn("py-8 lg:py-12", className)}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <h3
            className="text-2xl lg:text-3xl font-medium text-foreground"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {subcategoryName}
          </h3>
          {/* Navigation Arrows - Desktop */}
          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={cn(
                "rounded-full w-9 h-9 border-border/60 bg-card",
                "hover:bg-primary hover:text-primary-foreground",
                "disabled:opacity-40",
              )}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={cn(
                "rounded-full w-9 h-9 border-border/60 bg-card",
                "hover:bg-primary hover:text-primary-foreground",
                "disabled:opacity-40",
              )}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
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
              "snap-x snap-mandatory pb-2",
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
              "absolute left-0 top-0 bottom-2 w-8 pointer-events-none",
              "bg-gradient-to-r from-background to-transparent",
              canScrollLeft ? "opacity-100" : "opacity-0",
            )}
          />
          <div
            className={cn(
              "absolute right-0 top-0 bottom-2 w-8 pointer-events-none",
              "bg-gradient-to-l from-background to-transparent",
              canScrollRight ? "opacity-100" : "opacity-0",
            )}
          />
        </div>
      </div>
    </section>
  )
}
