import { Star } from "lucide-react"

export default function ReviewsPage() {
  const reviews = [
    {
      name: "Margaret Thompson",
      role: "Homeowner",
      rating: 5,
      text: "Geely Home Interiors transformed my living space into a sophisticated sanctuary. The attention to detail and personalized service were exceptional.",
      img: "professional woman portrait elegant",
    },
    {
      name: "David Chen",
      role: "Real Estate Developer",
      rating: 5,
      text: "Working with Geely on multiple projects has been outstanding. Their team brings creativity and professionalism to every project.",
      img: "professional man portrait business",
    },
    {
      name: "Victoria Rodriguez",
      role: "Interior Design Enthusiast",
      rating: 5,
      text: "The quality of the furniture and the design consultation were outstanding. I love how they blend timeless elegance with modern functionality.",
      img: "sophisticated woman portrait luxury",
    },
    {
      name: "James Mitchell",
      role: "Commercial Property Owner",
      rating: 5,
      text: "Geely Home Interiors delivered an exceptional office redesign that impressed both my team and clients. Highly recommended for commercial projects.",
      img: "executive man portrait confident",
    },
    {
      name: "Elena Fontaine",
      role: "Interior Designer",
      rating: 5,
      text: "As a fellow designer, I appreciate their commitment to excellence and collaboration. Their collection is curated beautifully.",
      img: "designer woman portrait creative",
    },
    {
      name: "Robert Harper",
      role: "Homeowner",
      rating: 5,
      text: "From initial consultation to final installation, everything was flawless. Geely's team made the entire process seamless and enjoyable.",
      img: "man portrait satisfied happy",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-light text-foreground mb-4">Customer Reviews</h1>
          <p className="text-muted-foreground">
            See what our clients say about their experience with Geely Home Interiors
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-light text-primary mb-2">4.9/5</div>
              <div className="flex justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light text-primary mb-2">500+</div>
              <p className="text-muted-foreground">Satisfied Clients</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light text-primary mb-2">98%</div>
              <p className="text-muted-foreground">Recommendation Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
              <div key={idx} className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">{review.text}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted flex-shrink-0 flex items-center justify-center">
                    <img
                      src={`/.jpg?height=48&width=48&query=${review.img}`}
                      alt={review.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-6">
            Join Our Community of Satisfied Clients
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Experience the Geely difference and transform your space into something extraordinary.
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary hover:bg-accent text-primary-foreground font-medium px-8 py-3 rounded-lg transition-colors"
          >
            Start Your Journey Today
          </a>
        </div>
      </section>
    </main>
  )
}
