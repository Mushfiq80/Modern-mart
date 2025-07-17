import { ProductCard } from "@/components/shared/product-card"

const featuredProducts = [
  {
    id: "1",
    name: "Organic Avocados",
    price: 4.99,
    originalPrice: 6.99,
    image: "/fp1.jpg",
    category: "Fruits",
    rating: 4.8,
    reviews: 124,
    badge: "Organic",
    inStock: true,
    stockCount: 25,
    variants: [
      {
        id: 1,
        name: "Ripeness Level",
        options: ["Ready to Eat", "Firm (2-3 days)", "Extra Firm (4-5 days)"]
      },
      {
        id: 2,
        name: "Pack Size",
        options: ["Single (1 piece)", "Small Pack (3 pieces)", "Family Pack (6 pieces)"]
      }
    ],
  },
  {
    id: "2",
    name: "Fresh Salmon Fillet",
    price: 18.99,
    image: "/fp2.jpg",
    category: "Seafood",
    rating: 4.9,
    reviews: 89,
    badge: "Fresh",
    inStock: true,
    stockCount: 12,
    variants: [
      {
        id: 1,
        name: "Cut Type",
        options: ["Fillet", "Steaks", "Whole Side"]
      },
      {
        id: 2,
        name: "Weight",
        options: ["250g", "500g", "1kg"]
      }
    ],
  },
  {
    id: "3",
    name: "Artisan Sourdough Bread",
    price: 5.49,
    image: "/fp3.jpg",
    category: "Bakery",
    rating: 4.7,
    reviews: 156,
    badge: "Artisan",
    inStock: true,
    stockCount: 8,
    variants: [
      {
        id: 1,
        name: "Bread Type",
        options: ["Classic Sourdough", "Whole Wheat", "Rye Sourdough"]
      },
      {
        id: 2,
        name: "Size",
        options: ["Small Loaf", "Large Loaf"]
      }
    ],
  },
  {
    id: "4",
    name: "Premium Greek Yogurt",
    price: 3.99,
    originalPrice: 4.99,
    image: "/fp4.jpg",
    category: "Dairy",
    rating: 4.6,
    reviews: 203,
    badge: "Premium",
    inStock: true,
    stockCount: 30,
    variants: [
      {
        id: 1,
        name: "Flavor",
        options: ["Plain", "Vanilla", "Strawberry", "Blueberry"]
      },
      {
        id: 2,
        name: "Size",
        options: ["150g", "500g", "1kg"]
      }
    ],
  },
  {
    id: "5",
    name: "Organic Baby Spinach",
    price: 2.99,
    image: "/fp5.jpg",
    category: "Vegetables",
    rating: 4.8,
    reviews: 78,
    badge: "Organic",
    inStock: true,
    stockCount: 15,
    variants: [
      {
        id: 1,
        name: "Package Size",
        options: ["100g", "250g", "500g"]
      }
    ],
  },
  {
    id: "6",
    name: "Cold-Pressed Orange Juice",
    price: 6.99,
    image: "/fp6.jpg",
    category: "Beverages",
    rating: 4.5,
    reviews: 92,
    badge: "Cold-Pressed",
    inStock: true,
    stockCount: 20,
    variants: [
      {
        id: 1,
        name: "Size",
        options: ["250ml", "500ml", "1L"]
      }
    ],
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium products, chosen for their exceptional quality and value.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
