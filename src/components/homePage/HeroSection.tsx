import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"


const slides = [
  {
    id: 1,
    title: "Fresh Organic Produce",
    subtitle: "Farm to Table Excellence",
    description: "Discover the finest selection of organic fruits and vegetables, sourced directly from local farms.",
    image: "./bg1.jpg",
    cta: "Shop Organic",
    ctaSecondary: "Learn More",
  },
  {
    id: 2,
    title: "Premium Quality Guaranteed",
    subtitle: "Exceptional Standards",
    description: "Every product meets our rigorous quality standards, ensuring you get the best value for your money.",
    image: "./bg2.jpg",
    cta: "Explore Products",
    ctaSecondary: "Quality Promise",
  },
  {
    id: 3,
    title: "Fast & Free Delivery",
    subtitle: "Convenience at Your Door",
    description: "Enjoy free delivery on orders over $50 with our lightning-fast shipping service.",
    image: "./bg3.jpg",
    cta: "Order Now",
    ctaSecondary: "Delivery Info",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative h-[70vh] overflow-hidden rounded-lg mx-4 mt-4">
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-2xl px-4">
                <p className="text-sm font-medium mb-2 opacity-90">{slide.subtitle}</p>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                <p className="text-lg mb-8 opacity-90">{slide.description}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    {slide.cta}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-black bg-transparent"
                  >
                    {slide.ctaSecondary}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </section>
  )
}
