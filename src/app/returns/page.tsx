import { RETURNS_POLICY } from "@/components/constants"
import Link from "next/link"

export default function ReturnsRefundsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-light headFont text-foreground mb-4">Returns & Refunds</h1>
          <p className="text-muted-foreground">Last updated: {RETURNS_POLICY.effectiveDate}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="space-y-8">

            <div>
              <h2 className="text-2xl font-semibold headFont text-foreground mb-4">Return Eligibility</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">Items must be:</p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Unused and in original packaging</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Reported within first 24hrs of purchase</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>With all original accessories and documentation</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold headFont text-foreground mb-4">Non-Returnable Items</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">The following items cannot be returned:</p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Items damaged by client</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Clearance or final sale items</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Items purchased more than 2 days ago</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold headFont text-foreground mb-4">How to Initiate a Return</h2>
              <ol className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary">1.</span>
                  <span>Email geelyinteriors@gmail.com
 or WhatsApp +234-7049539860 within 24 hours of delivery with photos and a description of the issue.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">2.</span>
                  <span>If we approve the return you would be notified, and we would issue a pickup through our dispatch rider. Do not ship back items without our prior authorization. The rider will collect the item from your address.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">3.</span>
                  <span>Items must be returned in the condition they were received, with packaging and all accessories where possible.</span>
                </li>
              </ol>
            </div>

            <div>
              <h2 className="text-2xl font-semibold headFont text-foreground mb-4">Refund Processing</h2>
              <p className="text-muted-foreground leading-relaxed">
                We accept returns only for defective, damaged, or incorrect items delivered to you. Change-of-mind returns are not accepted. Returns are tightly scoped because we operate as an agent/reseller and do not manage inventory stock ourselves. <br/>
                Returns must be requested within {RETURNS_POLICY.window} of delivery. To initiate a return, contact support immediately with photos and order details.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold headFont text-foreground mb-4">Return Conditions & Exchanges</h2>
              <p className="text-muted-foreground leading-relaxed">
                Items returns are valid under these conditions:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                {RETURNS_POLICY.conditions.map((condition, index)=>(
                <li key={index} className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>{condition}</span>
                </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold headFont text-foreground mb-4">Questions About Returns?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Please{" "}
                <Link href="/contact" className="text-primary hover:text-accent transition-colors">
                  contact us
                </Link>{" "}
                with any questions about our return policy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
