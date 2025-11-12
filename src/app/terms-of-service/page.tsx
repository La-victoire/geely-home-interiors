import { TERMS_OF_SERVICE } from "@/components/constants";
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-light headFont text-foreground mb-4">{TERMS_OF_SERVICE.title}</h1>
          <p className="text-muted-foreground">Last updated: {TERMS_OF_SERVICE.effectiveDate}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-foreground headFont mb-4">Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using the Geely Home Interiors website and services, you accept and agree to be bound
                by the terms and provision of this agreement. If you do not agree to abide by the above, please do not
                use this service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground headFont mb-4">Who We Are</h2>
              <p className="text-muted-foreground leading-relaxed">
               Geely Home Interiors is an online brand and storefront. 
               We list and facilitate purchases of interior accessories; 
               many products are supplied and fulfilled by third-party sellers and delivered by local dispatch riders.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground headFont mb-4">Eligibility</h2>
              <p className="text-muted-foreground leading-relaxed">
               You must be at least {TERMS_OF_SERVICE.ageRequirement} years old to place orders. By using this website, you represent and warrant that you meet this requirement.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground headFont mb-4">Order & Acceptance</h2>
              <p className="text-muted-foreground leading-relaxed">
               Your order is an offer. We reserve the right to accept or refuse orders (for inventory, payment, or fraud reasons). The contract is formed when we send an order confirmation email.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground headFont mb-4">Pricing & Taxes</h2>
              <p className="text-muted-foreground leading-relaxed">
               Prices include 3% sales tax where indicated. Payment methods accepted: Paystack and manual bank transfer (for purchases arranged outside standard checkout). We do not offer Cash On Delivery.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground headFont mb-4">Payment & Fraud Prevention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may refuse or cancel orders suspected of fraud. We may require proof of payment for manual transfers and ID verification for high-value orders.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground headFont mb-4">Shipping & Delivery</h2>
              <p className="text-muted-foreground leading-relaxed">
                Shipping is available only within Lagos State. Delivery terms are in our <Link className="underline font-bold text-foreground" href={'/shipping'}>Shipping Policy</Link>. We are not liable for delays caused by third-party delivery partners.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground headFont mb-4">Returns & Refunds</h2>
              <p className="text-muted-foreground leading-relaxed">
                Returns accepted only for defective, damaged, or incorrect items reported within <span className="font-bold text-foreground">24 hours</span> of delivery. Refunds are processed within <span className="font-bold text-foreground">48 hours</span> after receipt and inspection of returned items. See our <Link className="underline font-bold text-foreground" href={'/returns'}>Returns & Refunds Policy</Link> for full details.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground headFont mb-4">Third-party Suppliers</h2>
              <p className="text-muted-foreground leading-relaxed">
                Some products are provided by third-party sellers. We act as the point of sale and facilitate fulfillment; the third party may have additional terms. We are not the manufacturer of all products sold on the site.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground headFont mb-4">Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms are governed by the laws of Lagos State, Nigeria. Disputes will be resolved in the courts of Lagos State unless otherwise agreed.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground headFont mb-4">Intellectual Property Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                Unless otherwise stated, Geely Home Interiors and/or its licensors own the intellectual property rights
                for all material on this website. All intellectual property rights are reserved. You may access this for
                your personal use subject to restrictions set in these terms and conditions.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground headFont mb-4">User Responsibilities</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">You are responsible for:</p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Maintaining the confidentiality of your account information</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>All activities that occur under your account</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Notifying us immediately of any unauthorized use of your account</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground headFont mb-4">Product Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We strive to provide accurate product descriptions and pricing. However, we do not warrant that product
                descriptions, pricing, or other content on our website is accurate, complete, or error-free. If you
                discover an error, please inform us immediately.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground headFont mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall Geely Home Interiors, nor any of its officers, directors and employees, be held liable
                for anything arising out of or in any way connected with your use of this website whether such liability
                is under contract, tort or otherwise.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground headFont mb-4">Modifications to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                Geely Home Interiors may revise these terms of service at any time without notice. By using this
                website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground headFont mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at <a href={`mailto:${TERMS_OF_SERVICE.contact.email}`} className="font-bold text-foreground underline">{TERMS_OF_SERVICE.contact.email}</a> | {TERMS_OF_SERVICE.contact.whatsapp}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
