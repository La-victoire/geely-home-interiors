import Link from "next/link"
import type { DecorStyle } from "@/lib/decor-styles"

interface Props {
  currentStyle?: DecorStyle
  allStyles: DecorStyle[]
}

export default function SimilarStyles({ currentStyle, allStyles }: Props) {
  const similar = currentStyle ? allStyles.filter((s) => s.id !== currentStyle.id).slice(0, 3) : allStyles

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold headFont text-foreground mb-12 ${currentStyle && "text-center"}`}>
          {currentStyle? "Similar Styles You'll Love" : "Decor Styles We Offer"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {similar.map((style) => (
            <Link key={style.id} href={`/shop/styles/${style.slug}`}>
              <div className="group cursor-pointer rounded-2xl overflow-hidden bg-card shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                {/* Hero Image */}
                <div className="relative h-48 md:h-64 overflow-hidden bg-muted">
                  <img
                    src={ style.heroImage }
                    alt={style.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/60" />
                </div>

                {/* Content */}
                <div className="relative inset-0 flex flex-col justify-end p-6">
                  <h3 className="font-serif text-2xl font-bold mb-2">{style.title}</h3>
                  <p className="text-foreground/80 text-sm">{style.vibe}</p>
                </div> 
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
