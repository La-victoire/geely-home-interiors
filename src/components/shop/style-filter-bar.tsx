"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FilterOptions {
  rooms: string[]
  budgets: { label: string; min: number; max: number }[]
  categories: string[]
}

interface Props {
  onFilter: (filters: any) => void
}

export default function StyleFilterBar({ onFilter }: Props) {
  const [activeRoom, setActiveRoom] = useState<string | null>(null)
  const [activeBudget, setActiveBudget] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const rooms = ["Living Room", "Bedroom", "Dining Room", "Home Office", "Entryway"]
  const budgets = [
    { label: "Under 100000", min: 0, max: 500 },
    { label: "100000 - 500000", min: 500, max: 1500 },
    { label: "500000 - 1500000", min: 1500, max: 3000 },
    { label: "1500000+", min: 3000, max: Number.POSITIVE_INFINITY },
  ]
  const categories = ["Furniture", "Lighting", "Decor", "Textiles", "Wall Art", "Rugs"]

  return (
    <div className="sticky top-0 z-40 bg-background border-b border-border py-4 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Room Filter */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm">
              Room Type
              <ChevronDown size={16} />
            </button>
            <div className="absolute hidden group-hover:block bg-card border border-border rounded-lg shadow-lg p-2 mt-1 min-w-40">
              {rooms.map((room) => (
                <button
                  key={room}
                  className="block w-full text-left px-3 py-2 hover:bg-muted rounded text-sm"
                  onClick={() => setActiveRoom(room)}
                >
                  {room}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Filter */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm">
              Budget
              <ChevronDown size={16} />
            </button>
            <div className="absolute hidden group-hover:block bg-card border border-border rounded-lg shadow-lg p-2 mt-1 min-w-48">
              {budgets.map((budget) => (
                <button
                  key={budget.label}
                  className="block w-full text-left px-3 py-2 hover:bg-muted rounded text-sm"
                  onClick={() => setActiveBudget(budget.label)}
                >
                  {budget.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm">
              Category
              <ChevronDown size={16} />
            </button>
            <div className="absolute hidden group-hover:block bg-card border border-border rounded-lg shadow-lg p-2 mt-1 min-w-40">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className="block w-full text-left px-3 py-2 hover:bg-muted rounded text-sm"
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Help Me Choose Button */}
          <button className="ml-auto px-4 py-2 rounded-lg bg-gold text-gold-foreground font-medium text-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            Help Me Choose
          </button>
        </div>

        {/* Active Filters Display */}
        {(activeRoom || activeBudget || activeCategory) && (
          <div className="flex flex-wrap gap-2 mt-4">
            {activeRoom && (
              <button
                onClick={() => setActiveRoom(null)}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-xs"
              >
                {activeRoom} ✕
              </button>
            )}
            {activeBudget && (
              <button
                onClick={() => setActiveBudget(null)}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-xs"
              >
                {activeBudget} ✕
              </button>
            )}
            {activeCategory && (
              <button
                onClick={() => setActiveCategory(null)}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-xs"
              >
                {activeCategory} ✕
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
