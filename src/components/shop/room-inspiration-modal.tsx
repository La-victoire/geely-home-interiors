"use client"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import type { DecorStyle } from "@/lib/decor-styles"
import { product } from "./Mini-Components/CollectionCard"

interface RoomImage {
  id: string
  image: string
  description: string
  hotspots: Array<{
    productId: string
    x: number
    y: number
  }>
}

interface Props {
  style: DecorStyle
  products: product[]
  isOpen: boolean
  onClose: () => void
}

export default function RoomInspirationModal({ style, products, isOpen, onClose }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null)

  const roomImages: RoomImage[] = [
  {
    id: "bedroom-luxury-minimalist",
    image: "/images/hotel-inspired2.jpeg",
    description: "Luxury minimalist bedroom with clean lines and serene neutral tones",
    hotspots: [
      { productId: "1", x: 5, y: 60 },
      { productId: "4", x: 58, y: 58 },
      { productId: "2", x: 75, y: 58 },  
    ],
  },
  {
    id: "living-room-glam-soft",
    image: "/images/glam-soft2.jpeg",
    description: "Glam-soft style living room featuring plush velvet, pastel hues, and elegant gold accents",
    hotspots: [
      { productId: "2", x: 45, y: 80 },  // e.g., sofa
      { productId: "5", x: 10, y: 35 },  // e.g., accent chair
      { productId: "8", x: 70, y: 60 },  // e.g., coffee table
      { productId: "3", x: 60, y: 40 },  // e.g., chandelier or decor
    ],
  },
  {
    id: "parlour-boho",
    image: "/images/boho-mini.jpg",
    description: "Boho-style parlour with eclectic patterns, lush plants, and cozy rattan textiles",
    hotspots: [
      { productId: "694d9ae3264bf5bbc7076f40", x: 45, y: 35 },
      { productId: "9", x: 25, y: 65 }, 
      { productId: "2", x: 45, y: 75 }, 
      { productId: "1", x: 10, y: 75 }, 
    ],
  },
  {
    id: "dining-luxury-minimalist",
    image: "/images/dining.jpg",
    description: "Luxury minimalist dinning with spacious layout, marble accents, and sleek high-end furniture",
    hotspots: [
      { productId: "3", x: 25, y: 55 },  // e.g., sofa
      { productId: "10", x: 60, y: 70 }, // e.g., marble table
      { productId: "5", x: 10, y: 40 },  // e.g., artwork or lighting
      { productId: "1", x: 58, y: 34 },  // e.g., leather chair
    ],
  },
];

  const currentRoom = roomImages[currentImageIndex]
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % roomImages.length)
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + roomImages.length) % roomImages.length)

  const selectedProduct = selectedHotspot ? products.find((p) => p._id === selectedHotspot) : null

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="h-full max-w-6xl mx-auto flex flex-col md:flex-row bg-background">
        {/* Image Section */}
        <div className="relative flex-1 md:min-h-screen bg-muted">
          <img
            src={currentRoom.image || "/placeholder.svg"}
            alt={currentRoom.description}
            className="w-full h-full object-fill"
          />

          {/* Hotspots */}
          {currentRoom.hotspots.map((hotspot) => (
            <button
              key={hotspot.productId}
              onClick={() => setSelectedHotspot(hotspot.productId)}
              className={`absolute w-8 h-8 rounded-full border-2 transition-all duration-300 hover:scale-125 ${
                selectedHotspot === hotspot.productId
                  ? "bg-gold border-gold"
                  : "bg-white/20 border-white hover:bg-white/40"
              }`}
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%`, transform: "translate(-50%, -50%)" }}
              title="Click to view product"
            />
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors backdrop-blur-sm"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors backdrop-blur-sm"
          >
            <ChevronRight size={24} className="text-white" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
            {currentImageIndex + 1} / {roomImages.length}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="w-full md:w-80 border-l border-border overflow-y-auto">
          <div className="sticky top-0 bg-background border-b border-border p-4 flex justify-between items-center">
            <h3 className="headFont text-lg font-semibold">Room Details</h3>
            <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Room Description */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">Current Room</p>
              <p className="font-medium">{currentRoom.description}</p>
            </div>

            {/* Products in this room */}
            <div>
              <h4 className="text-sm font-semibold mb-3">Featured Products ({currentRoom.hotspots.length})</h4>
              <p className="text-xs mb-4"> <strong>Note:</strong> Products Shown in the display images may not be identical to products available for sale.
              </p>
              <div className="space-y-2">
                {currentRoom.hotspots.map((hotspot) => {
                  const product = products.find((p) => p._id === hotspot.productId)
                  if (!product) return null
                  return (
                    <button
                      key={product._id}
                      onClick={() => setSelectedHotspot(product._id)}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        selectedHotspot === product._id ? "border-gold bg-gold/5" : "border-border hover:border-gold/50"
                      }`}
                    >
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">N{product.price.toLocaleString()}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Selected Product Details */}
            {selectedProduct && (
              <div className="border-t border-border pt-6">
                <div className="space-y-4">
                  <img
                    src={selectedProduct.images[0].url || "/placeholder.svg"}
                    alt={selectedProduct.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="headFont text-lg font-semibold mb-2">{selectedProduct.name}</h4>
                    <p className="text-2xl font-semibold text-gold mb-4">N{selectedProduct.price.toLocaleString()}</p>
                  </div>
                  <button className="w-full bg-foreground text-background px-4 py-3 rounded-lg font-medium hover:shadow-lg transition-all hover:scale-[1.02]">
                    View Product
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
