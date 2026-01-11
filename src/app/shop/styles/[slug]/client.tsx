"use client"
import { useState } from "react"
import { decorStyles } from "@/lib/decor-styles"
import { useProducts } from "@/components/contexts/ProductsContext";
import StyleFilterBar from "@/components/shop/style-filter-bar"
import StyleStory from "@/components/shop/style-story"
import SimilarStyles from "@/components/shop/similar-styles"
import RoomInspirationModal from "@/components/shop/room-inspiration-modal"
import HelpMeChooseModal from "@/components/shop/help-me-choose-modal"
import CollectionCard, { product } from "@/components/shop/Mini-Components/CollectionCard"

interface Props {
  style: (typeof decorStyles)[0]
}

export default function StylePageClient({ style }: Props) {
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false)
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false)
  const [recommendedProducts, setRecommendedProducts] = useState<product[]>([])
 const {
    products,
    loading,
    error
  } = useProducts();

  // Filter products by style (you can add a style tag to products in sample-products.ts)
  // For now, showing all discounted products as example
  const styledProducts = products.filter(
    (p) => p.isXmasDeal || (p?.isDiscountDeal && p.computedDiscountedPrice > 0),
  )

  const productsToDisplay = recommendedProducts.length > 0 ? recommendedProducts : styledProducts

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen md:h-[600px] overflow-hidden">
        <img
          src={ style.heroImage }
          alt={style.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="headFont text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 text-balance">
            {style.title}
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-8">{style.description}</p>
          <p className="text-white/70 text-sm md:text-base">Curated pieces that define this style</p>
        </div>
      </section>

      {/* Metadata Panel with Room Inspiration Button */}
      <div className="bg-background py-12 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Ideal For */}
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h3 className="headFont text-lg font-semibold text-foreground mb-4">Ideal For</h3>
              <ul className="space-y-2">
                {style.idealFor.map((room) => (
                  <li key={room} className="text-sm text-muted-foreground">
                    {room}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mood */}
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h3 className="headFont text-lg font-semibold text-foreground mb-4">Mood</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{style.mood}</p>
            </div>

            {/* Color Palette */}
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h3 className="headFont text-lg font-semibold text-foreground mb-4">Color Palette</h3>
              <div className="space-y-3">
                {style.colors.map((swatch) => (
                  <div key={swatch.name} className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-full border border-border"
                      style={{ backgroundColor: swatch.color }}
                    />
                    <span className="text-xs text-muted-foreground">{swatch.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setIsRoomModalOpen(true)}
              className="bg-foreground text-background px-8 py-3 rounded-full font-medium text-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              View Room Inspiration
            </button>
            <button
              onClick={() => setIsHelpModalOpen(true)}
              className="border border-border text-foreground px-8 py-3 rounded-full font-medium text-sm hover:bg-muted transition-colors"
            >
              Help Me Choose
            </button>
          </div>
        </div>
      </div>

     {/* Filter Bar */}
 {/* <StyleFilterBar onFilter={() => {}} /> */}    

      {/* Recommended Products Section */}
      {recommendedProducts.length > 0 && (
        <section className="py-8 px-4 md:px-8 lg:px-16 bg-gold/5 border-y border-gold/20">
          <div className="max-w-7xl mx-auto">
            <h2 className="headFont text-2xl font-semibold text-foreground mb-6">Recommended For You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {recommendedProducts.map((product) => (
                <div key={product._id} className="relative">
                  <div className="absolute -top-3 -left-3 bg-gold text-gold-foreground text-xs headFont font-bold px-3 py-1 rounded-full z-10">
                    Recommended for you
                  </div>
                  <CollectionCard product={product} />
                </div>
              ))}
            </div>
            <div className="flex gap-4 justify-center">
              <button className="px-8 py-3 bg-foreground text-background rounded-full font-medium hover:shadow-lg transition-all hover:scale-[1.02]">
                Add to Wishlist
              </button>
              <button className="px-8 py-3 border border-foreground rounded-full font-medium hover:bg-foreground/5 transition-colors">
                Send to WhatsApp
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Product Grid */}
      <section className="py-12 px-4 md:px-8 lg:px-16 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="headFont text-2xl font-semibold text-foreground mb-8">Shop {style.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productsToDisplay.map((product:product) => (
              <CollectionCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Style Story Section */}
      <StyleStory style={style} />

      {/* Conversion CTA */}
      <section className="py-12 px-4 md:px-8 lg:px-16 bg-muted/30">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6 justify-center items-center">
          <button className="px-8 py-3 bg-foreground text-background rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            Shop This Style
          </button>
          <button className="px-8 py-3 border border-border rounded-full font-medium hover:bg-muted transition-colors">
            Send to WhatsApp
          </button>
        </div>
      </section>

      {/* Complete the Look Bundle */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8 headFont text-center">Complete the Look</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Add these complementary pieces to achieve the perfect {style.title} aesthetic
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {styledProducts.slice(0, 5).map((product:product) => (
              <CollectionCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Similar Styles */}
      <SimilarStyles currentStyle={style} allStyles={decorStyles} />

      {/* Modals */}
      <RoomInspirationModal
        style={style}
        products={products}
        isOpen={isRoomModalOpen}
        onClose={() => setIsRoomModalOpen(false)}
      />

      <HelpMeChooseModal
        products={styledProducts}
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        onRecommendations={(recommended: any) => {
          setRecommendedProducts(recommended)
          setIsHelpModalOpen(false)
          // Scroll to recommendations
          setTimeout(() => {
            document.querySelector("[data-recommended-section]")?.scrollIntoView({ behavior: "smooth" })
          }, 100)
        }}
      />
    </div>
  )
}
