"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { product } from "./Mini-Components/CollectionCard"

interface Props {
  products: product[]
  isOpen: boolean
  onClose: () => void
  onRecommendations: (recommended: product[]) => void
}

type Step = 1 | 2 | 3

export default function HelpMeChooseModal({ products, isOpen, onClose, onRecommendations }: Props) {
  const [step, setStep] = useState<Step>(1)
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null)
  const [selectedMood, setSelectedMood] = useState<string | null>(null)

  const rooms = ["Living Room", "Bedroom", "Dining Room", "Home Office", "Entryway"]
  const budgets = [
    { label: "Under 100,000", value: "budget" },
    { label: "100,000 - 500,000", value: "mid" },
    { label: "500,000 - 1,500,000", value: "premium" },
    { label: "1,500,000+", value: "luxury" },
  ]
  const moods = ["Calm", "Bold", "Cozy", "Luxurious"]

  const handleComplete = () => {
    const recommended = products.filter((p) => {
      const roomMatch = !selectedRoom || p.category === selectedRoom
      const budgetMatch = !selectedBudget || p?.budgetRange === selectedBudget
      const moodMatch = !selectedMood || p?.mood === selectedMood
      return roomMatch && budgetMatch && moodMatch
    })

    onRecommendations(recommended.slice(0, 3)) // Get top 3 recommendations
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-6 flex justify-between items-center">
          <h2 className="headFont text-2xl font-semibold">Help Me Choose</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Room Selection */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-4">Which room are you decorating?</h3>
                <div className="space-y-2">
                  {rooms.map((room) => (
                    <button
                      key={room}
                      onClick={() => setSelectedRoom(room)}
                      className={`w-full p-3 rounded-lg border transition-all text-left font-medium ${
                        selectedRoom === room ? "border-yellow-300 bg-yellow-300/10" : "border-border hover:border-yellow-300/50"
                      }`}
                    >
                      {room}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!selectedRoom}
                className="w-full mt-6 bg-foreground text-background px-4 py-3 rounded-lg font-medium hover:shadow-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Budget Selection */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-4">What's your budget range?</h3>
                <div className="space-y-2">
                  {budgets.map((budget) => (
                    <button
                      key={budget.value}
                      onClick={() => setSelectedBudget(budget.value)}
                      className={`w-full p-3 rounded-lg border transition-all text-left font-medium ${
                        selectedBudget === budget.value
                          ? "border-yellow-300 bg-yellow-300/10" : "border-border hover:border-yellow-300/50"
                      }`}
                    >
                      {budget.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-muted text-foreground px-4 py-3 rounded-lg font-medium hover:bg-muted/80 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!selectedBudget}
                  className="flex-1 bg-foreground text-background px-4 py-3 rounded-lg font-medium hover:shadow-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Mood Selection */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className=" text-lg font-semibold mb-4">What's your preferred mood?</h3>
                <div className="space-y-2">
                  {moods.map((mood) => (
                    <button
                      key={mood}
                      onClick={() => setSelectedMood(mood)}
                      className={`w-full p-3 rounded-lg border transition-all text-left font-medium ${
                        selectedMood === mood ? "border-yellow-300 bg-yellow-300/10" : "border-border hover:border-yellow-300/50"
                      }`}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-muted text-foreground px-4 py-3 rounded-lg font-medium hover:bg-muted/80 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleComplete}
                  disabled={!selectedMood}
                  className="flex-1 bg-foreground text-background px-4 py-3 rounded-lg font-medium hover:shadow-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Get Recommendations
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
