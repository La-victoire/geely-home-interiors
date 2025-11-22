"use client"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { FAQS } from "@/components/constants"

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-light headFont text-foreground mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground">Find answers to common questions about our services and products.</p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div
                key={index}
                className="border border-border rounded-lg overflow-hidden bg-card hover:border-primary/50 transition-colors"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-foreground">{faq.q}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-primary transition-transform duration-300 flex-shrink-0 ml-4 ${
                      openItems.includes(index) ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openItems.includes(index) && (
                  <div className="px-6 py-4 bg-muted/30 border-t border-border">
                    <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16 p-8 bg-secondary rounded-lg text-center">
            <h2 className="text-2xl font-semibold headFont text-foreground mb-3">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              Don't find what you're looking for? Our customer service team is here to help.
            </p>
            <a
              href="/contact"
              className="inline-block bg-primary hover:bg-foreground text-primary-foreground font-medium px-8 py-3 rounded-lg transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
