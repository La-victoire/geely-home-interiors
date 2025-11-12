import { PRIVACY_POLICY } from "@/components/constants";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl headFont font-light text-foreground mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: {PRIVACY_POLICY.effectiveDate}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-foreground headFont mb-4">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Geely Home Interiors ("we", "us", "our", or "Company") operates the website. This page informs you of
                our policies regarding the collection, use, and disclosure of personal data when you use our service and
                the choices you have associated with that data.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground headFont mb-4">Information Collection and Use</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect several different types of information for various purposes to provide and improve our
                service to you.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                {PRIVACY_POLICY.dataCollected.map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground headFont mb-4">Use of Data</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Geely Home Interiors uses the collected data for:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                {PRIVACY_POLICY.purposes.map((item, index) => (
                  <ul key={index} className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>{item}</span>
                  </ul>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground headFont mb-4">Security of Data</h2>
              <p className="text-muted-foreground leading-relaxed">
                The security of your data is important to us but remember that no method of transmission over the
                Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable
                means to protect your personal data, we cannot guarantee its absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground headFont mb-4">Lawful Basis</h2>
              <p className="text-muted-foreground leading-relaxed">
                Processing is necessary to fulfill your order (performance of contract) and for our legitimate business interests (fraud prevention, customer support). Marketing messages are sent only with your opt-in consent.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground headFont mb-4">Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">You have the right to:</p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Access the personal data we hold about you</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Request correction of inaccurate data</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Request deletion of your data</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Opt-out of marketing communications</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground headFont mb-4">Sharing & Third Parties</h2>
              <p className="text-muted-foreground leading-relaxed">
                We share personal data with
              </p>
              <ul className="space-y-3 text-muted-foreground">
                {PRIVACY_POLICY.thirdParties.map((item, index) => (
                  <ul key={index} className="flex gap-3">
                    <span className="text-primary">•</span>
                    <span>{item}</span>
                  </ul>
                ))}
                <p className="mt-2"> We do not sell your personal data</p>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground headFont mb-4">Cookies & tracking</h2>
              <p className="text-muted-foreground leading-relaxed">
                We currently do not deploy analytics or marketing cookies. Essential cookies or session handling used by the site/platform are limited to what’s required for the site to function.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground headFont mb-4">Data retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain order and transactional data for 7 years for business, tax, and dispute resolution purposes. Account data will be retained until you request deletion, subject to legal retention obligations.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground headFont mb-4">Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We apply reasonable technical and organizational safeguards (encrypted transmission, secure database). However, no system is perfectly secure; report suspected breaches to <strong>levrstudios@gmail.com</strong> immediately.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground headFont mb-4">Children</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our services are for users aged 18+. We do not knowingly collect data from minors.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground headFont mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at {PRIVACY_POLICY.contact}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
