import { SHIPPING_POLICY } from "@/components/constants"
import Link from "next/link"

export default function ShippingPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl headFont font-light text-foreground mb-4">Shipping Policy</h1>
          <p className="text-muted-foreground">Last updated: {SHIPPING_POLICY.effectiveDate}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-8 prose prose-invert">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold headFont text-foreground mb-4">Scope</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This Shipping Policy explains how Geely Home Interiors (“we”, “us”, “Geely”) handles order fulfillment and delivery for purchases made through geelyhomeinteriors.com and our authorized channels.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold headFont text-foreground mb-4">Shipping Methods</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Deliveries are completed by {SHIPPING_POLICY.deliveryMethod} engaged by our supplier/delivery partners. High-value or fragile items will normally require a recipient to sign for delivery.
              </p>
            </div> 

            <div>
              <h2 className="text-2xl font-semibold headFont text-foreground mb-4">Operating model</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Geely Home Interiors acts as an online storefront/agent that lists and facilitates purchases of interior accessories on behalf of existing suppliers. We coordinate orders and customer handoff to local dispatch riders for final delivery. We do not hold a physical showroom or large inventory; product ownership and logistics are managed by our partnered sellers/suppliers. We pass order details to our delivery partners and suppliers to fulfill purchases placed under the Geely Home Interiors name.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold headFont text-foreground mb-4">Service Area</h2>
              <p className="text-muted-foreground leading-relaxed">
                We deliver only within {SHIPPING_POLICY.serviceArea} at this time. If an address is outside {SHIPPING_POLICY.serviceArea} you will not be able to complete checkout.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold headFont text-foreground mb-4">Delivery confirmation</h2>
              <p className="text-muted-foreground leading-relaxed">
               We do not provide carrier tracking links. Instead, we provide order details and an ETA via the email and phone number you supply at checkout. Customers should present the order confirmation email or message to the dispatch rider on delivery.
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed"><strong>Customs & duties</strong>: Not applicable for Lagos-local deliveries. </p>
            <p className="text-muted-foreground leading-relaxed"><strong>Estimated delivery time (after dispatch)</strong>: For Lagos deliveries, the standard ETA is up to {SHIPPING_POLICY.eta} from dispatch. This is an estimate and may be affected by traffic, weather, or other operational delays..</p>
            <p className="text-muted-foreground leading-relaxed"><strong>Shipping cost</strong>: Shipping is provided free on delivery for customers in Lagos State (this means no shipping fee is added at checkout). Note: we charge customers the shipping cost only when they return an item (see Returns policy).</p>

            <div>
              <h2 className="text-2xl font-semibold headFont text-foreground mb-4">Order processing time</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Orders are processed within 0–2 business days after payment clears. Orders placed after our processing cutoff are handled the next business day.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold headFont text-foreground mb-4">Lost or undelivered shipments</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If delivery is marked as completed but you did not receive the item, notify us immediately. We will investigate with our dispatch partner and supplier. We require prompt notice to pursue claims.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold headFont text-foreground mb-4">Damage Claims</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We take great care in packaging all items. Should you receive a damaged product, please:
              </p>
              <ol className="space-y-2 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary">1.</span>
                  <span>Document the damage with photos</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">2.</span>
                  <span>Contact us within 24 hours of delivery at {SHIPPING_POLICY.support.email} or WhatsApp:{SHIPPING_POLICY.support.whatsapp}, and refuse delivery if packaging is heavily damaged.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">3.</span>
                  <span>We will arrange a pickup and replacement or refund per our <Link className="underline" href={'/returns'}>Returns & Refunds policy.</Link></span>
                </li>
              </ol>
            </div>

            <div>
              <h2 className="text-2xl font-semibold headFont text-foreground mb-4">Questions?</h2>
              <p className="text-muted-foreground leading-relaxed">
                For shipping inquiries, please{" "}
                <Link href="/contact" className="text-primary hover:text-foreground transition-colors">
                  contact us
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
