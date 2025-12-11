import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ABOUT_US } from "@/components/constants"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-secondary py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-light headFont text-foreground leading-tight">
              About Geely Home Interiors
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Crafting luxurious living spaces with timeless elegance and impeccable attention to detail.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl headFont font-light text-foreground mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Founded in 2015, Geely Home Interiors began with a simple vision: to transform homes into sanctuaries of
                elegance and comfort. Our founders, with over * years of combined experience in luxury design, saw an
                opportunity to make high-end interior design accessible without compromising on quality.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we work with discerning clients who understand that a home is more than just a place to live—it's
                a reflection of their style, personality, and aspirations.
              </p>
            </div>
            <div className="bg-muted rounded-lg h-80 flex items-center justify-center">
              <img
                src="/images/small-parlour.jpg"
                alt="Geely Home Interiors showroom"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl headFont font-light text-foreground mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ABOUT_US.values.map((value, index)=> (
              <div key={index} className="bg-background p-8 rounded-lg border border-border">
                <p className="text-muted-foreground">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-light headFont text-foreground mb-12 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Nsisong Brendan Gillian", role: "Founder & Lead Market strategist", img: "/images/gillian.jpeg" },
              { name: "Oghuvbu Victory", role: "Software Engineer & Social Media Manager", img: "/images/victory.jpeg" },
              { name: "El Kaptures", role: "Content Director", img: "/images/joel.jpg" },
            ].map((member, idx) => (
              <div key={idx} className="text-center">
                <div className="bg-muted rounded-lg h-60 mb-6 flex items-center justify-center">
                  <img
                    src={`${member.img}`}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-6">Ready to Transform Your Space?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Schedule a consultation with our design team to begin your luxury home interior journey.
          </p>
          <Button asChild className="bg-primary hover:bg-foreground text-primary-foreground font-medium px-8 py-3">
            <Link href="/contact">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
