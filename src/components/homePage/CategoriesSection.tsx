import { Link } from "react-router-dom"

const categories = [
  {
    id: 1,
    name: "Fresh Fruits",
    itemCount: 45,
    image: "./food1.jpg",
    href: "/category/fruits",
  },
  {
    id: 2,
    name: "Vegetables",
    itemCount: 62,
    image: "./vegetable.jpg",
    href: "/category/vegetables",
  },
  {
    id: 3,
    name: "Dairy Products",
    itemCount: 28,
    image: "./dairy.jpg",
    href: "/category/dairy",
  },
  {
    id: 4,
    name: "Meat & Seafood",
    itemCount: 34,
    image: "./fish.jpg",
    href: "/category/meat",
  },
  {
    id: 5,
    name: "Beverages",
    itemCount: 56,
    image: "./beverage.jpg",
    href: "/category/beverages",
  },
  {
    id: 6,
    name: "Bakery",
    itemCount: 23,
    image: "./bakery.jpg",
    href: "/category/bakery",
  },
]

export function CategoriesSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of fresh, high-quality products organized by category for your convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.href}
              className="group relative overflow-hidden rounded-lg bg-muted hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-square relative">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm opacity-90">{category.itemCount} items</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
