import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/shared/product-card"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"

const newArrivals = [
  {
    id: "7",
    name: "Organic Quinoa Bowl",
    price: 8.99,
    image: "/NewArrival/p5.jpg",
    category: "Health Foods",
    rating: 4.7,
    reviews: 45,
    badge: "New",
    inStock: true,
    stockCount: 10,
    variants: [
      {
        id: 1,
        name: "Flavor",
        options: ["Mediterranean", "Asian Fusion", "Mexican Spice"]
      }
    ],
  },
  {
    id: "8",
    name: "Fresh Blueberries",
    price: 5.99,
    image: "/NewArrival/p1.jpg",
    category: "Fruits",
    rating: 4.8,
    reviews: 67,
    badge: "Fresh",
    inStock: true,
    stockCount: 25,
    variants: [
      {
        id: 1,
        name: "Package Size",
        options: ["125g", "250g", "500g"]
      }
    ],
  },
  {
    id: "9",
    name: "Almond Milk",
    price: 4.49,
    image: "/NewArrival/p4.jpg",
    category: "Dairy Alternatives",
    rating: 4.6,
    reviews: 123,
    badge: "Plant-Based",
    inStock: true,
    stockCount: 18,
    variants: [
      {
        id: 1,
        name: "Flavor",
        options: ["Original", "Vanilla", "Unsweetened"]
      },
      {
        id: 2,
        name: "Size",
        options: ["250ml", "1L"]
      }
    ],
  },
  {
    id: "10",
    name: "Grass-Fed Beef",
    price: 24.99,
    image: "/NewArrival/p2.jpg",
    category: "Meat",
    rating: 4.9,
    reviews: 34,
    badge: "Grass-Fed",
    inStock: true,
    stockCount: 6,
    variants: [
      {
        id: 1,
        name: "Cut",
        options: ["Ground Beef", "Ribeye Steak", "Sirloin Steak"]
      },
      {
        id: 2,
        name: "Weight",
        options: ["250g", "500g", "1kg"]
      }
    ],
  },
  {
    id: "11",
    name: "Organic Kale",
    price: 3.49,
    image: "/NewArrival/p3.jpg",
    category: "Vegetables",
    rating: 4.5,
    reviews: 89,
    badge: "Organic",
    inStock: true,
    stockCount: 20,
  },
]

const organicProducts = [
  {
    id: "12",
    name: "Organic Tomatoes",
    price: 4.99,
    image: "/organic/p1.jpg",
    category: "Vegetables",
    rating: 4.8,
    reviews: 156,
    badge: "Organic",
    inStock: true,
    stockCount: 30,
    variants: [
      {
        id: 1,
        name: "Variety",
        options: ["Cherry Tomatoes", "Roma Tomatoes", "Beefsteak Tomatoes"]
      }
    ],
  },
  {
    id: "13",
    name: "Organic Honey",
    price: 12.99,
    image: "/organic/p2.jpg",
    category: "Pantry",
    rating: 4.9,
    reviews: 78,
    badge: "Raw",
    inStock: true,
    stockCount: 15,
    variants: [
      {
        id: 1,
        name: "Type",
        options: ["Wildflower", "Clover", "Manuka"]
      },
      {
        id: 2,
        name: "Size",
        options: ["250g", "500g", "1kg"]
      }
    ],
  },
  {
    id: "14",
    name: "Organic Chicken Breast",
    price: 16.99,
    image: "/organic/p3.jpg",
    category: "Meat",
    rating: 4.7,
    reviews: 92,
    badge: "Free-Range",
    inStock: true,
    stockCount: 12,
    variants: [
      {
        id: 1,
        name: "Package",
        options: ["Single Breast", "2-Pack", "Family Pack (4)"]
      }
    ],
  },
  {
    id: "15",
    name: "Organic Pasta",
    price: 3.99,
    image: "/organic/p4.jpg",
    category: "Pantry",
    rating: 4.6,
    reviews: 134,
    badge: "Whole Grain",
    inStock: true,
    stockCount: 25,
    variants: [
      {
        id: 1,
        name: "Shape",
        options: ["Penne", "Spaghetti", "Fusilli", "Rigatoni"]
      }
    ],
  },
  {
    id: "16",
    name: "Organic Coconut Oil",
    price: 8.99,
    image: "/organic/p5.jpg",
    category: "Oils",
    rating: 4.8,
    reviews: 67,
    badge: "Virgin",
    inStock: true,
    stockCount: 18,
    variants: [
      {
        id: 1,
        name: "Size",
        options: ["250ml", "500ml", "1L"]
      }
    ],
  },
]

interface CollectionSliderProps {
  title: string
  products: any[]
  autoAdvance?: boolean
}

function CollectionSlider({ title, products, autoAdvance = true }: CollectionSliderProps) {
  const navPrev = `${title.replace(/\s+/g, '-')}-prev`
  const navNext = `${title.replace(/\s+/g, '-')}-next`

  return (
    <div className="mb-16 pb-4">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold">{title}</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" id={navPrev}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" id={navNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Swiper
        spaceBetween={24}
        slidesPerView={4}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        navigation={{
          prevEl: `#${navPrev}`,
          nextEl: `#${navNext}`,
        }}
        autoplay={autoAdvance ? { delay: 4000, disableOnInteraction: false } : false}
        modules={[Navigation, Autoplay]}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export function CollectionSliders() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <CollectionSlider title="New Arrivals" products={newArrivals} />
        <CollectionSlider title="Organic Products" products={organicProducts} />
      </div>
    </section>
  )
}
