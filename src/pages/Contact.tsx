"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Users, Headphones } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+1 (555) 123-4567", "+1 (555) 123-4568"],
    description: "Mon-Fri 9AM-6PM EST"
  },
  {
    icon: Mail,
    title: "Email",
    details: ["support@modernmart.com", "info@modernmart.com"],
    description: "We'll respond within 24 hours"
  },
  {
    icon: MapPin,
    title: "Address",
    details: ["123 Commerce Street", "New York, NY 10001"],
    description: "Headquarters & Distribution Center"
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon-Fri: 9:00 AM - 6:00 PM", "Sat-Sun: 10:00 AM - 4:00 PM"],
    description: "Customer Support Available"
  }
]

const supportCategories = [
  {
    icon: MessageCircle,
    title: "General Inquiry",
    description: "Questions about our products or services"
  },
  {
    icon: Users,
    title: "Order Support",
    description: "Help with existing orders or delivery"
  },
  {
    icon: Headphones,
    title: "Technical Support",
    description: "Website or app-related issues"
  }
]

const faqs = [
  {
    question: "What are your delivery areas?",
    answer: "We deliver to over 100 cities nationwide. Enter your ZIP code during checkout to confirm delivery availability in your area."
  },
  {
    question: "How fresh are your products?",
    answer: "All products are sourced daily from our partner farms and suppliers. We guarantee freshness and quality with our 100% satisfaction policy."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for non-perishable items and immediate replacement for any damaged or unsatisfactory fresh products."
  },
  {
    question: "Do you offer same-day delivery?",
    answer: "Yes, same-day delivery is available in select metropolitan areas. Check availability during checkout or contact our support team."
  }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: ""
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Contact", href: "/contact" },
          ]}
        />

        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about our products or services? We're here to help. 
            Reach out to us through any of the channels below.
          </p>
        </div>

        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow border-border">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 border-2 border-border rounded-full">
                    <info.icon className="h-6 w-6 text-foreground" />
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-3 text-foreground">{info.title}</h3>
                <div className="space-y-1 mb-3">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-foreground font-medium">{detail}</p>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{info.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div>
            <Card className="border-border">
              <CardHeader className="border-b border-border">
                <CardTitle className="text-2xl text-foreground">Send us a Message</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-foreground">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="mt-1 border-border bg-background text-foreground"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-foreground">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="mt-1 border-border bg-background text-foreground"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-foreground">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger className="mt-1 border-border bg-background text-foreground">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border">
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="order">Order Support</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-foreground">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      className="mt-1 border-border bg-background text-foreground"
                      placeholder="Brief description of your inquiry"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-foreground">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="mt-1 min-h-[120px] border-border bg-background text-foreground"
                      placeholder="Please provide details about your inquiry..."
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-foreground text-background hover:bg-foreground/90"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Support Categories & FAQ */}
          <div className="space-y-8">
            {/* Support Categories */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">How Can We Help?</h3>
              <div className="space-y-4">
                {supportCategories.map((category, index) => (
                  <Card key={index} className="border-border hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="p-2 border border-border rounded-lg">
                          <category.icon className="h-5 w-5 text-foreground" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">{category.title}</h4>
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick FAQ */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index} className="border-border">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-foreground mb-2">{faq.question}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Response Time Info */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto border-border">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Quick Response Guarantee</h2>
              <p className="text-muted-foreground mb-6">
                We pride ourselves on excellent customer service. Our support team typically responds to inquiries within 2-4 hours during business hours, and within 24 hours on weekends.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 border border-border rounded-lg">
                  <div className="font-bold text-2xl text-foreground mb-1">2-4hrs</div>
                  <div className="text-sm text-muted-foreground">Business Hours Response</div>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <div className="font-bold text-2xl text-foreground mb-1">24hrs</div>
                  <div className="text-sm text-muted-foreground">Weekend Response</div>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <div className="font-bold text-2xl text-foreground mb-1">99%</div>
                  <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
