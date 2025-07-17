import { useEffect, useState } from "react"
import { Star } from "lucide-react"


const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, NY",
    rating: 5,
    comment: "The quality of products is exceptional! Fresh delivery every time.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "San Francisco, CA",
    rating: 5,
    comment: "Best organic selection in the city. Highly recommend!",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "Emily Davis",
    location: "Austin, TX",
    rating: 5,
    comment: "Fast delivery and amazing customer service. Love shopping here!",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 4,
    name: "David Wilson",
    location: "Seattle, WA",
    rating: 5,
    comment: "Premium quality at reasonable prices. My go-to grocery store!",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    location: "Miami, FL",
    rating: 5,
    comment: "Fresh produce delivered right to my door. Couldn't be happier!",
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export function TestimonialsSection() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setOffset((prev) => prev - 1)
    }, 50)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-16 px-4 bg-muted/30 overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for their grocery needs.
          </p>
        </div>

        <div className="relative">
          <div className="flex gap-6 animate-marquee" style={{ transform: `translateX(${offset}px)` }}>
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0 w-80 bg-background rounded-lg p-6 shadow-sm"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width="48"
                    height="48"
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm">{testimonial.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
