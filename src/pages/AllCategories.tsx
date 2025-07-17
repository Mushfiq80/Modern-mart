import { ShoppingBag, TrendingUp, Star, Package } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { allProducts } from "./AllProducts"
import { Link } from "react-router-dom"


const categories = [
  {
    id: "fruits",
    name: "Fresh Fruits",
    description: "Premium organic fruits sourced from sustainable farms",
    icon: "🍎",
    color: "from-green-500 to-emerald-600",
    slug: "fruits"
  },
  {
    id: "vegetables",
    name: "Fresh Vegetables",
    description: "Garden-fresh vegetables packed with nutrients",
    icon: "🥕",
    color: "from-green-600 to-lime-600",
    slug: "vegetables"
  },
  {
    id: "seafood",
    name: "Premium Seafood",
    description: "Ocean-fresh seafood sustainably sourced",
    icon: "🐟",
    color: "from-blue-500 to-cyan-600",
    slug: "seafood"
  },
  {
    id: "bakery",
    name: "Artisan Bakery",
    description: "Freshly baked goods with traditional techniques",
    icon: "🍞",
    color: "from-amber-500 to-orange-600",
    slug: "bakery"
  },
  {
    id: "dairy",
    name: "Farm Fresh Dairy",
    description: "Premium dairy from grass-fed farms",
    icon: "🥛",
    color: "from-blue-400 to-indigo-500",
    slug: "dairy"
  },
  {
    id: "beverages",
    name: "Premium Beverages",
    description: "Refreshing drinks and premium coffee",
    icon: "☕",
    color: "from-purple-500 to-pink-600",
    slug: "beverages"
  },
  {
    id: "health-foods",
    name: "Health & Wellness",
    description: "Nutritious superfoods and health options",
    icon: "🥗",
    color: "from-emerald-500 to-teal-600",
    slug: "health-foods"
  },
  {
    id: "meat",
    name: "Premium Meats",
    description: "High-quality, ethically sourced meats",
    icon: "🥩",
    color: "from-red-500 to-rose-600",
    slug: "meat"
  },
  {
    id: "snacks",
    name: "Gourmet Snacks",
    description: "Artisanal snacks and treats",
    icon: "🍿",
    color: "from-yellow-500 to-amber-600",
    slug: "snacks"
  }
]

export default function CategoriesPage() {
  // Get stats for each category
  const getCategoryStats = (categoryName: string) => {
    const categoryProducts = allProducts.filter(product => 
      product.category.toLowerCase() === categoryName.toLowerCase()
    )
    
    const totalProducts = categoryProducts.length
    const avgRating = totalProducts > 0 
      ? (categoryProducts.reduce((acc, p) => acc + p.rating, 0) / totalProducts).toFixed(1)
      : "0.0"
    const hasNewProducts = categoryProducts.some(p => p.badge === "New")
    const hasSale = categoryProducts.some(p => p.originalPrice && p.originalPrice > p.price)
    
    return { totalProducts, avgRating, hasNewProducts, hasSale }
  }

  const totalProducts = allProducts.length
  const totalCategories = categories.length

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Categories", href: "/categories" },
          ]}
        />

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Shop by Category</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover our carefully curated selection of premium products across all categories
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Package className="h-5 w-5 text-primary mr-2" />
                  <span className="font-bold text-lg">{totalProducts}</span>
                </div>
                <p className="text-sm text-muted-foreground">Total Products</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <ShoppingBag className="h-5 w-5 text-primary mr-2" />
                  <span className="font-bold text-lg">{totalCategories}</span>
                </div>
                <p className="text-sm text-muted-foreground">Categories</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-5 w-5 text-primary mr-2" />
                  <span className="font-bold text-lg">4.7</span>
                </div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-5 w-5 text-primary mr-2" />
                  <span className="font-bold text-lg">New</span>
                </div>
                <p className="text-sm text-muted-foreground">Daily Arrivals</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const stats = getCategoryStats(category.name.split(' ').pop() || category.name)
            
            return (
              <Card key={category.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className={`bg-gradient-to-br ${category.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{category.icon}</div>
                    <div className="flex gap-2">
                      {stats.hasNewProducts && (
                        <Badge className="bg-white/20 text-white border-white/30">New</Badge>
                      )}
                      {stats.hasSale && (
                        <Badge className="bg-white/20 text-white border-white/30">Sale</Badge>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-sm opacity-90 mb-4">{category.description}</p>
                  
                  <div className="flex items-center justify-between text-sm opacity-80">
                    <span>{stats.totalProducts} products</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      <span>{stats.avgRating}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Starting from{" "}
                      <span className="font-semibold text-foreground">
                        ${Math.min(...allProducts
                          .filter(p => p.category.toLowerCase() === category.name.split(' ').pop()?.toLowerCase())
                          .map(p => p.price)
                        ).toFixed(2)}
                      </span>
                    </div>
                    
                    <Button asChild className="group-hover:translate-x-1 transition-transform">
                      <Link to={`/category/${category.slug}`}>
                        Browse
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
              <p className="text-muted-foreground mb-6">
                Browse all our products or use our search to find exactly what you need
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/products">View All Products</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">Contact Support</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
