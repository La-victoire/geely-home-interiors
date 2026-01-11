import type { DecorStyle } from "@/lib/decor-styles"

interface Props {
  style: DecorStyle
}

export default function StyleStory({ style }: Props) {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <h2 className="headFont text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
          The Art of {style.title}
        </h2>

        <div className="space-y-8">
          {/* What Defines It */}
          <div>
            <h3 className="headFont text-xl font-semibold text-foreground mb-3">What Defines This Style</h3>
            <p className="text-muted-foreground leading-relaxed">{style.story.defines}</p>
          </div>

          {/* Common Mistakes */}
          <div>
            <h3 className="headFont text-xl font-semibold text-foreground mb-3">Common Mistakes to Avoid</h3>
            <p className="text-muted-foreground leading-relaxed">{style.story.mistakes}</p>
          </div>

          {/* How to Combine */}
          <div>
            <h3 className="headFont text-xl font-semibold text-foreground mb-3">How to Combine Pieces</h3>
            <p className="text-muted-foreground leading-relaxed">{style.story.combining}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
