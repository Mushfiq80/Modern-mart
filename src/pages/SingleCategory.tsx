import { useState } from "react"
import { useParams } from "react-router-dom"
import { Filter, Grid, List, SlidersHorizontal, Star, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/shared/product-card"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { allProducts } from "./AllProducts"

const categoryInfo = {
  fruits: {
    title: "Fresh Fruits",
    description: "Discover our premium selection of fresh, organic fruits sourced from sustainable farms",
    icon: "🍎",
    color: "from-green-500 to-emerald-600"
  },
  vegetables: {
    title: "Fresh Vegetables",
    description: "Garden-fresh vegetables packed with nutrients and flavor",
    icon: "🥕",
    color: "from-green-600 to-lime-600"
  },
  seafood: {
    title: "Premium Seafood",
    description: "Ocean-fresh seafood sustainably sourced for quality and taste",
    icon: "🐟",
    color: "from-blue-500 to-cyan-600"
  },
  bakery: {
    title: "Artisan Bakery",
    description: "Freshly baked goods crafted with traditional techniques",
    icon: "🍞",
    color: "from-amber-500 to-orange-600"
  },
  dairy: {
    title: "Farm Fresh Dairy",
    description: "Premium dairy products from grass-fed, free-range farms",
    icon: "🥛",
    color: "from-blue-400 to-indigo-500"
  },
  beverages: {
    title: "Premium Beverages",
    description: "Refreshing drinks and premium coffee selections",
    icon: "☕",
    color: "from-purple-500 to-pink-600"
  },
  "health foods": {
    title: "Health & Wellness",
    description: "Nutritious superfoods and health-conscious options",
    icon: "🥗",
    color: "from-emerald-500 to-teal-600"
  },
  meat: {
    title: "Premium Meats",
    description: "High-quality, ethically sourced meat products",
    icon: "🥩",
    color: "from-red-500 to-rose-600"
  },
  snacks: {
    title: "Gourmet Snacks",
    description: "Artisanal snacks and treats for every occasion",
    icon: "🍿",
    color: "from-yellow-500 to-amber-600"
  }
}

const priceRanges = [
  { label: "Under $5", min: 0, max: 5 },
  { label: "$5 - $10", min: 5, max: 10 },
  { label: "$10 - $20", min: 10, max: 20 },
  { label: "$20 - $30", min: 20, max: 30 },
  { label: "Over $30", min: 30, max: 100 }
]

const badges = ["Organic", "Fresh", "Premium", "Sale", "New", "Trending", "Superfood", "Energy"]

export default function CategoryPage() {
  const params = useParams()
  const categorySlug = params.category as string
  
  // Map slugs to actual category names in the products data
  const slugToCategoryMap: Record<string, string> = {
    'fruits': 'Fruits',
    'vegetables': 'Vegetables',
    'seafood': 'Seafood',
    'bakery': 'Bakery',
    'dairy': 'Dairy',
    'beverages': 'Beverages',
    'health-foods': 'Health Foods',
    'meat': 'Meat',
    'snacks': 'Snacks'
  }
  
  const categoryName = slugToCategoryMap[categorySlug] || categorySlug.replace(/-/g, ' ')
  const categoryKey = categorySlug.replace(/-/g, ' ').toLowerCase()
  
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])
  const [selectedBadges, setSelectedBadges] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 50])
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  // Get category info
  const category = categoryInfo[categoryKey as keyof typeof categoryInfo] || {
    title: categoryName,
    description: `Explore our collection of ${categoryName.toLowerCase()}`,
    icon: "🛍️",
    color: "from-gray-500 to-gray-600"
  }

  // Filter products by category
  const categoryProducts = allProducts.filter(product => 
    product.category.toLowerCase() === categoryName.toLowerCase()
  )

  // Apply filters
  const filteredProducts = categoryProducts.filter((product) => {
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]
    const badgeMatch = selectedBadges.length === 0 || (product.badge && selectedBadges.includes(product.badge))
    const priceRangeMatch = selectedPriceRanges.length === 0 || selectedPriceRanges.some(range => {
      const priceRangeObj = priceRanges.find(r => r.label === range)
      return priceRangeObj && product.price >= priceRangeObj.min && product.price <= priceRangeObj.max
    })
    
    return priceMatch && badgeMatch && priceRangeMatch
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.id.localeCompare(a.id)
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Categories", href: "/categories" },
            { name: category.title, href: `/category/${categorySlug}` },
          ]}
        />

        {/* Category Header */}
        <div className="relative overflow-hidden rounded-xl mb-8">
          <div className={`bg-gradient-to-r ${category.color} p-8 text-white`}>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl">{category.icon}</div>
              <div>
                <h1 className="text-4xl font-bold">{category.title}</h1>
                <p className="text-lg opacity-90 mt-2">{category.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm opacity-80">
              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4" />
                <span>{categoryProducts.length} Products</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                <span>Average Rating: {(categoryProducts.reduce((acc, p) => acc + p.rating, 0) / categoryProducts.length).toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? "block" : "hidden lg:block"}`}>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price Range Slider */}
                <div>
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <div className="space-y-3">
                    <Slider 
                      value={priceRange} 
                      onValueChange={setPriceRange} 
                      max={50} 
                      step={1} 
                      className="w-full" 
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Price Range Checkboxes */}
                <div>
                  <h3 className="font-semibold mb-3">Price Categories</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <div key={range.label} className="flex items-center space-x-2">
                        <Checkbox
                          id={range.label}
                          checked={selectedPriceRanges.includes(range.label)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedPriceRanges([...selectedPriceRanges, range.label])
                            } else {
                              setSelectedPriceRanges(selectedPriceRanges.filter((r) => r !== range.label))
                            }
                          }}
                        />
                        <Label htmlFor={range.label} className="text-sm">
                          {range.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Badges */}
                <div>
                  <h3 className="font-semibold mb-3">Product Tags</h3>
                  <div className="space-y-2">
                    {badges.map((badge) => (
                      <div key={badge} className="flex items-center space-x-2">
                        <Checkbox
                          id={badge}
                          checked={selectedBadges.includes(badge)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedBadges([...selectedBadges, badge])
                            } else {
                              setSelectedBadges(selectedBadges.filter((b) => b !== badge))
                            }
                          }}
                        />
                        <Label htmlFor={badge} className="text-sm">
                          {badge}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedPriceRanges([])
                    setSelectedBadges([])
                    setPriceRange([0, 50])
                  }}
                  className="w-full"
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-semibold">Products</h2>
                <Badge variant="secondary" className="text-sm">
                  {sortedProducts.length} items
                </Badge>
              </div>

              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowFilters(!showFilters)} 
                  className="lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedPriceRanges.length > 0 || selectedBadges.length > 0) && (
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {selectedPriceRanges.map((range) => (
                  <Badge key={range} variant="secondary" className="cursor-pointer" onClick={() => 
                    setSelectedPriceRanges(selectedPriceRanges.filter(r => r !== range))
                  }>
                    {range} ×
                  </Badge>
                ))}
                {selectedBadges.map((badge) => (
                  <Badge key={badge} variant="secondary" className="cursor-pointer" onClick={() => 
                    setSelectedBadges(selectedBadges.filter(b => b !== badge))
                  }>
                    {badge} ×
                  </Badge>
                ))}
              </div>
            )}

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid" 
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4" 
                    : "grid-cols-1"
                }`}
              >
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search criteria
                </p>
                <Button
                  onClick={() => {
                    setSelectedPriceRanges([])
                    setSelectedBadges([])
                    setPriceRange([0, 50])
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
