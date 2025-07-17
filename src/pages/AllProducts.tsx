import { useState } from "react"
import { Filter, Grid, List, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ProductCard } from "@/components/shared/product-card"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  badge?: string;
  description?: string;
}

export const allProducts: Product[] = [
  // Fruits
  {
    id: "1",
    name: "Quantum Organic Avocados",
    price: 4.99,
    originalPrice: 6.99,
    image: "https://images.pexels.com/photos/2228553/pexels-photo-2228553.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Fruits",
    rating: 4.8,
    reviews: 124,
    badge: "Organic",
    description: "Perfectly ripe, creamy organic avocados grown with sustainable farming practices."
  },
  {
    id: "2",
    name: "Nano Blueberries",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Fruits",
    rating: 4.8,
    reviews: 67,
    badge: "Fresh",
    description: "Sweet, antioxidant-rich blueberries perfect for smoothies and snacking."
  },
  {
    id: "3",
    name: "Solar Strawberries",
    price: 6.49,
    image: "https://images.pexels.com/photos/46174/strawberries-berries-fruit-freshness-46174.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Fruits",
    rating: 4.9,
    reviews: 89,
    badge: "Premium",
    description: "Juicy, vine-ripened strawberries with exceptional sweetness and flavor."
  },
  {
    id: "4",
    name: "Cosmic Bananas",
    price: 2.99,
    image: "https://images.pexels.com/photos/5946066/pexels-photo-5946066.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Fruits",
    rating: 4.6,
    reviews: 145,
    badge: "Organic",
    description: "Perfectly yellow bananas packed with potassium and natural energy."
  },
  {
    id: "5",
    name: "Stellar Apples",
    price: 4.49,
    originalPrice: 5.99,
    image: "https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Fruits",
    rating: 4.7,
    reviews: 203,
    badge: "Sale",
    description: "Crisp, sweet apples with the perfect balance of tartness and sugar."
  },

  // Vegetables
  {
    id: "6",
    name: "Hydroponic Baby Spinach",
    price: 2.99,
    image: "https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Vegetables",
    rating: 4.8,
    reviews: 78,
    badge: "Organic",
    description: "Tender, nutrient-dense baby spinach grown in controlled hydroponic environments."
  },
  {
    id: "7",
    name: "Rainbow Bell Peppers",
    price: 3.99,
    image: "https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Vegetables",
    rating: 4.6,
    reviews: 92,
    badge: "Fresh",
    description: "Colorful mix of red, yellow, and green bell peppers for vibrant dishes."
  },
  {
    id: "8",
    name: "Quantum Carrots",
    price: 2.49,
    image: "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Vegetables",
    rating: 4.7,
    reviews: 134,
    badge: "Organic",
    description: "Sweet, crunchy carrots perfect for snacking, cooking, or juicing."
  },
  {
    id: "9",
    name: "Bio-Enhanced Broccoli",
    price: 3.49,
    image: "https://images.pexels.com/photos/47347/broccoli-vegetable-food-healthy-47347.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Vegetables",
    rating: 4.5,
    reviews: 67,
    badge: "Fresh",
    description: "Fresh, crisp broccoli crowns packed with vitamins and minerals."
  },

  // Seafood
  {
    id: "10",
    name: "Neo-Fresh Salmon Fillet",
    price: 18.99,
    image: "https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Seafood",
    rating: 4.9,
    reviews: 89,
    badge: "Fresh",
    description: "Premium Atlantic salmon fillets, sustainably sourced and ocean-fresh."
  },
  {
    id: "11",
    name: "Arctic Shrimp",
    price: 15.99,
    image: "https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Seafood",
    rating: 4.7,
    reviews: 156,
    badge: "Premium",
    description: "Succulent, wild-caught shrimp with natural sweetness and firm texture."
  },

  // Bakery
  {
    id: "12",
    name: "Cyber Sourdough Bread",
    price: 5.49,
    image: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Bakery",
    rating: 4.7,
    reviews: 156,
    badge: "Artisan",
    description: "Hand-crafted sourdough with a perfect crust and tangy, complex flavor."
  },
  {
    id: "13",
    name: "Galactic Croissants",
    price: 8.99,
    image: "https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Bakery",
    rating: 4.8,
    reviews: 203,
    badge: "Fresh",
    description: "Buttery, flaky croissants made with premium French butter and technique."
  },
  {
    id: "14",
    name: "Artisan Baguettes",
    price: 3.99,
    image: "https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Bakery",
    rating: 4.6,
    reviews: 124,
    badge: "Traditional",
    description: "Authentic French baguettes with crispy crust and airy interior."
  },

  // Dairy
  {
    id: "15",
    name: "Stellar Greek Yogurt",
    price: 3.99,
    originalPrice: 4.99,
    image: "https://images.pexels.com/photos/1446320/pexels-photo-1446320.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Dairy",
    rating: 4.6,
    reviews: 203,
    badge: "Premium",
    description: "Thick, creamy Greek yogurt with live probiotics and rich protein content."
  },
  {
    id: "16",
    name: "Farm Fresh Eggs",
    price: 4.49,
    image: "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Dairy",
    rating: 4.8,
    reviews: 289,
    badge: "Free-Range",
    description: "Grade A large eggs from free-range hens with bright orange yolks."
  },
  {
    id: "17",
    name: "Organic Whole Milk",
    price: 4.99,
    image: "https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Dairy",
    rating: 4.7,
    reviews: 167,
    badge: "Organic",
    description: "Rich, creamy organic whole milk from grass-fed cows."
  },

  // Beverages
  {
    id: "18",
    name: "Plasma Orange Juice",
    price: 6.99,
    image: "https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Beverages",
    rating: 4.5,
    reviews: 92,
    badge: "Cold-Pressed",
    description: "100% pure cold-pressed orange juice with no added sugars or preservatives."
  },
  {
    id: "19",
    name: "Cosmic Coffee Beans",
    price: 12.99,
    image: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Beverages",
    rating: 4.9,
    reviews: 234,
    badge: "Premium",
    description: "Single-origin coffee beans with rich, complex flavor notes and perfect roast."
  },
  {
    id: "20",
    name: "Herbal Tea Blend",
    price: 8.49,
    image: "https://images.pexels.com/photos/230477/pexels-photo-230477.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Beverages",
    rating: 4.6,
    reviews: 78,
    badge: "Organic",
    description: "Soothing blend of chamomile, lavender, and mint for relaxation."
  },

  // Health Foods
  {
    id: "21",
    name: "Fusion Quinoa Bowl",
    price: 8.99,
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Health Foods",
    rating: 4.7,
    reviews: 45,
    badge: "New",
    description: "Ready-to-eat quinoa bowl with fresh vegetables and tahini dressing."
  },
  {
    id: "22",
    name: "Protein Power Seeds",
    price: 7.99,
    image: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Health Foods",
    rating: 4.8,
    reviews: 156,
    badge: "Superfood",
    description: "Mix of chia, flax, and hemp seeds packed with omega-3 and protein."
  },
  {
    id: "23",
    name: "Activated Charcoal Detox",
    price: 11.99,
    image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Health Foods",
    rating: 4.4,
    reviews: 89,
    badge: "Trending",
    description: "Natural detox blend with activated charcoal and superfoods."
  },

  // Meat
  {
    id: "24",
    name: "Prime Ribeye Steak",
    price: 24.99,
    image: "https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Meat",
    rating: 4.9,
    reviews: 178,
    badge: "Premium",
    description: "USDA Prime ribeye steaks with exceptional marbling and tenderness."
  },
  {
    id: "25",
    name: "Organic Ground Turkey",
    price: 8.99,
    image: "https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Meat",
    rating: 4.6,
    reviews: 134,
    badge: "Organic",
    description: "Lean, organic ground turkey perfect for healthy meal preparation."
  },

  // Snacks
  {
    id: "26",
    name: "Cosmic Trail Mix",
    price: 5.99,
    image: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Snacks",
    rating: 4.7,
    reviews: 203,
    badge: "Energy",
    description: "Premium mix of nuts, dried fruits, and dark chocolate for sustained energy."
  },
  {
    id: "27",
    name: "Artisan Granola",
    price: 7.49,
    image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Snacks",
    rating: 4.8,
    reviews: 167,
    badge: "Handmade",
    description: "Small-batch granola with honey, oats, and seasonal fruits."
  }
];

const categories = [
  "All",
  "Fruits",
  "Vegetables", 
  "Seafood",
  "Bakery",
  "Dairy",
  "Beverages",
  "Health Foods",
  "Meat",
  "Snacks"
];
const brands = ["Quantum Foods", "Neo Fresh", "Cyber Bakery", "Stellar Dairy", "Hydroponic Farms"]

export default function ProductsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 50])
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = allProducts.filter((product) => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category)
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]
    return categoryMatch && priceMatch
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-3 text-foreground">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCategories([...selectedCategories, category])
                          } else {
                            setSelectedCategories(selectedCategories.filter((c) => c !== category))
                          }
                        }}
                      />
                      <Label htmlFor={category} className="text-muted-foreground text-sm">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold mb-3 text-foreground">Price Range</h3>
                <div className="space-y-3">
                  <Slider value={priceRange} onValueChange={setPriceRange} max={50} step={1} className="w-full" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Brands */}
              <div>
                <h3 className="font-semibold mb-3 text-foreground">Brands</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={brand}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedBrands([...selectedBrands, brand])
                          } else {
                            setSelectedBrands(selectedBrands.filter((b) => b !== brand))
                          }
                        }}
                      />
                      <Label htmlFor={brand} className="text-muted-foreground text-sm">
                        {brand}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Section */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">All Products</h1>
              <p className="text-muted-foreground mt-1">
                Showing {filteredProducts.length} of {allProducts.length} products
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-card border-border">
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

              <div className="flex border border-border rounded-lg">
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

          {/* Products Grid */}
          <div
            className={`grid gap-6 ${
              viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
              <Button
                onClick={() => {
                  setSelectedCategories([])
                  setSelectedBrands([])
                  setPriceRange([0, 50])
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
