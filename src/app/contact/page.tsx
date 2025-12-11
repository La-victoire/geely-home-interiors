"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    }, 3000)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="relative bg-secondary py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl headFont text-foreground leading-tight">Get in Touch</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              We'd love to hear from you. Whether you have questions about our designs or need assistance, our team is
              here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Email Contact */}
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold headFont text-foreground">Email</h3>
              <p className="text-muted-foreground">geelyinteriors@gmail.com</p>
              <Link
                href="mailto:geelyinteriors@gmail.com"
                className="text-primary hover:text-accent transition-colors inline-block"
              >
                Send an email
              </Link>
            </div>

            {/* Phone Contact */}
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold headFont text-foreground">Phone</h3>
              <p className="text-muted-foreground">+234-906-682-4344 </p>
              <Link href="tel:+2349066824344" className="text-primary hover:text-accent transition-colors inline-block">
                Call us now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      {/* <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-light headFont text-foreground mb-4">Send us a Message</h2>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="bg-background border-border focus:border-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="bg-background border-border focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-foreground">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className="bg-background border-border focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-foreground">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="bg-background border-border focus:border-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  className="bg-background border-border focus:border-primary min-h-40"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-accent text-primary-foreground font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </Button>

              {submitted && (
                <div className="p-4 bg-secondary text-foreground rounded-lg text-center animate-in fade-in">
                  Thank you! We've received your message and will be in touch soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-light headFont text-foreground mb-12">Frequently Asked Questions</h2>

          <div className="space-y-8">
            <div className="border-b border-border pb-8">
              <h3 className="text-lg font-semibold text-foreground mb-3">What are your business hours?</h3>
              <p className="text-muted-foreground">
                We're available Monday to Friday, 9 AM to 6 PM WAT. For urgent matters, please call our emergency line.
              </p>
            </div>

            <div className="border-b border-border pb-8">
              <h3 className="text-lg font-semibold text-foreground mb-3">Do you offer consultation services?</h3>
              <p className="text-muted-foreground">
                No! We do not offer consultations at this time.
              </p>
            </div>

            <div className="border-b border-border pb-8">
              <h3 className="text-lg font-semibold text-foreground mb-3">What's your response time?</h3>
              <p className="text-muted-foreground">
                We aim to respond to all inquiries within 24 business hours. For more urgent matters, we offer priority
                support.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Do you ship internationally?</h3>
              <p className="text-muted-foreground">
                No! We currently ship only in lagos state Nigeria. Although our customers will be notified upon changes in our shipping jurisdiction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl headFont font-light text-foreground mb-6">Still have questions?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our customer service team is here to help with any inquiries about our products and services.
          </p>
          <Button asChild className="bg-primary hover:bg-foreground text-primary-foreground font-medium px-8 py-3">
            <Link href="mailto:geelyinteriors@gmail.com">Contact Us Today</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
