import { cn } from "@/lib/utils"
import type { DiscountBadge as DiscountBadgeType } from "@/lib/types"
import { Sparkles } from "lucide-react"

interface DiscountBadgeProps {
  badge: DiscountBadgeType
  size?: "sm" | "md" | "lg"
  className?: string
}

export function DiscountBadge({ badge, size = "md", className }: DiscountBadgeProps) {
  const sizeClasses = {
    sm: "text-[10px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
    lg: "text-sm px-3 py-1.5",
  }

  const isXmas = badge.type === "xmas"

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-semibold rounded-full shadow-sm tracking-wide uppercase",
        sizeClasses[size],
        isXmas
          ? "bg-gradient-to-r from-[#8B1538] to-[#6B0F2A] text-white ring-1 ring-gold/30"
          : badge.type === "subcategory"
            ? "bg-primary text-primary-foreground"
            : "bg-gold text-gold-foreground",
        className,
      )}
    >
      {isXmas && <Sparkles className="w-3 h-3" />}
      <span>{badge.percentage}% OFF</span>
    </span>
  )
}

interface MultiBadgeProps {
  badges: DiscountBadgeType[]
  size?: "sm" | "md" | "lg"
  className?: string
}

export function MultiBadge({ badges, size = "md", className }: MultiBadgeProps) {
  if (badges.length === 0) return null

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {badges.map((badge, index) => (
        <DiscountBadge key={index} badge={badge} size={size} />
      ))}
    </div>
  )
}
