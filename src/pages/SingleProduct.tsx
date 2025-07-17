import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Heart, ShoppingCart, Star, Minus, Plus, Truck, Shield, RotateCcw, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/components/providers/cart-provider"
import { useWishlist } from "@/components/providers/wishlist-provider"
import { ProductCard } from "@/components/shared/product-card"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { ImageZoom } from "@/utility/image-zoom"

// Mock product data
const product = {
  id: "1",
  name: "Quantum Organic Avocados",
  price: 4.99,
  originalPrice: 6.99,
  images: [
    "/fp1.jpg",
    "/fp2.jpg",
    "/fp3.jpg",
    "/fp4.jpg",
  ],
  category: "Fruits",
  rating: 4.8,
  reviews: 124,
  badge: "Organic",
  description:
    "Premium organic avocados grown using advanced hydroponic technology. These nutrient-rich fruits are perfect for your healthy lifestyle.",
  variants: [
    {
      id: 1,
      name: "Ripeness Level",
      options: ["Ready to Eat", "Firm (2-3 days)", "Extra Firm (4-5 days)"]
    },
    {
      id: 2,
      name: "Pack Size",
      options: ["Single (1 piece)", "Small Pack (3 pieces)", "Family Pack (6 pieces)", "Bulk Pack (12 pieces)"]
    }
  ],
  features: [
    "100% Organic Certified",
    "Grown with Hydroponic Technology",
    "Rich in Healthy Fats",
    "Perfect Ripeness Guaranteed",
    "Sustainably Sourced",
  ],
  nutrition: {
    calories: "160 per avocado",
    fat: "15g",
    carbs: "9g",
    protein: "2g",
    fiber: "7g",
  },
  specifications: [
    { id: 1, name: "Origin", value: "California, USA" },
    { id: 2, name: "Season", value: "Year-round" },
    { id: 3, name: "Storage", value: "Room temperature" },
    { id: 4, name: "Shelf Life", value: "3-5 days" },
    { id: 5, name: "Weight", value: "150-200g each" },
    { id: 6, name: "Certification", value: "USDA Organic" },
  ],
  categories: [
    { id: 1, name: "Organic Fruits" },
    { id: 2, name: "Fresh Produce" },
    { id: 3, name: "Healthy Foods" },
  ],
  inStock: true,
  stockCount: 25,
}

const similarProducts = [
  {
    id: "2",
    name: "Neo-Fresh Salmon Fillet",
    price: 18.99,
    image: "/fp2.jpg",
    category: "Seafood",
    rating: 4.9,
    reviews: 89,
    badge: "Fresh",
    inStock: true,
    stockCount: 8,
    variants: [
      {
        id: 1,
        name: "Cut Type",
        options: ["Fillet", "Steaks"]
      },
      {
        id: 2,
        name: "Weight",
        options: ["250g", "500g"]
      }
    ],
  },
  {
    id: "3",
    name: "Cyber Sourdough Bread",
    price: 5.49,
    image: "/fp3.jpg",
    category: "Bakery",
    rating: 4.7,
    reviews: 156,
    badge: "Artisan",
    inStock: true,
    stockCount: 6,
    variants: [
      {
        id: 1,
        name: "Size",
        options: ["Small Loaf", "Large Loaf"]
      }
    ],
  },
  {
    id: "4",
    name: "Stellar Greek Yogurt",
    price: 3.99,
    image: "/fp4.jpg",
    category: "Dairy",
    rating: 4.6,
    reviews: 203,
    badge: "Premium",
    inStock: true,
    stockCount: 15,
    variants: [
      {
        id: 1,
        name: "Flavor",
        options: ["Plain", "Vanilla", "Strawberry"]
      },
      {
        id: 2,
        name: "Size",
        options: ["150g", "500g"]
      }
    ],
  },
  {
    id: "5",
    name: "Hydroponic Baby Spinach",
    price: 2.99,
    image: "/fp5.jpg",
    category: "Vegetables",
    rating: 4.8,
    reviews: 78,
    badge: "Organic",
    inStock: true,
    stockCount: 20,
    variants: [
      {
        id: 1,
        name: "Package Size",
        options: ["100g", "250g"]
      }
    ],
  },
]

const reviews = [
  {
    id: 1,
    name: "Sarah Chen",
    rating: 5,
    date: "2024-01-15",
    comment: "Amazing quality! These avocados are perfectly ripe and taste incredible. Will definitely order again.",
    verified: true,
  },
  {
    id: 2,
    name: "Mike Johnson",
    rating: 5,
    date: "2024-01-10",
    comment:
      "Best avocados I've ever had. The hydroponic growing method really makes a difference in taste and texture.",
    verified: true,
  },
  {
    id: 3,
    name: "Emily Davis",
    rating: 4,
    date: "2024-01-08",
    comment: "Great product, arrived fresh and well-packaged. Slightly expensive but worth it for the quality.",
    verified: true,
  },
]

export default function ProductDetailPage() {
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({
    "Ripeness Level": "Ready to Eat",
    "Pack Size": "Single (1 piece)"
  })
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  console.log("Selected Variants:", product.images[selectedImage])
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category,
        variants: selectedVariants,
      })
    }
  }

  const handleBuyNow = () => {
    handleAddToCart()
    // Redirect to checkout page
    navigate('/checkout')
  }

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category,
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
          { name: product.category, href: `/category/${product.category.toLowerCase()}` },
          { name: product.name, href: `/product/${product.id}` },
        ]}
      />

      <div className="space-y-6 mr-2 mb-10">
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <ImageZoom
                    src={product.images[selectedImage] || "/placeholder.svg?width=600&height=600&query=No+Image"}
                    alt={product.name}
                    width={600}
                    height={600}
                    zoomLevel={2}
                    containerClassName="aspect-square rounded-lg"
                    className="rounded-lg"
                  />
                </div>
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 ${selectedImage === index ? "border-primary" : "border-muted"
                          }`}
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Product image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {product.badge && <Badge variant="outline">{product.badge}</Badge>}
                    {!product.inStock && <Badge variant="destructive">Out of Stock</Badge>}
                  </div>
                  <h1 className="text-3xl font-bold cursor-pointer">
                    {product.name}
                  </h1>
                  {product.rating && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                              }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {product.rating.toFixed(1)} ({product.reviews} reviews)
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <>
                        <span className="text-xl text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                        <Badge variant="destructive">
                          Save ${(product.originalPrice - product.price).toFixed(2)}
                        </Badge>
                      </>
                    )}
                  </div>
                  {product.originalPrice && (
                    <p className="text-sm text-green-600">You save ${(product.originalPrice - product.price).toFixed(2)}</p>
                  )}
                </div>

                {product.variants && product.variants.length > 0 && (
                  <div className="space-y-4">
                    {product.variants.map((variant) => (
                      <div key={variant.id}>
                        <label className="text-sm font-medium mb-2 block">{variant.name}</label>
                        <div className="flex flex-wrap gap-2">
                          {variant.options.map((option) => (
                            <Button
                              key={option}
                              variant={selectedVariants[variant.name] === option ? "default" : "outline"}
                              onClick={() => setSelectedVariants((prev) => ({ ...prev, [variant.name]: option }))}
                              className="text-sm"
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">Quantity:</span>
                    <div className="flex items-center border rounded-lg border-muted">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="rounded-r-none"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-4 py-2 min-w-[3rem] text-center border-x border-muted">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQuantity(quantity + 1)}
                        className="rounded-l-none"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Stock: {product.stockCount} available
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Minimum order quantity: 1
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                    <Button size="lg" className="flex-1" variant="secondary" onClick={handleBuyNow}>
                      Buy Now
                    </Button>
                  </div>
                  <div className="flex items-center gap-4 justify-center">
                    <Button variant="outline" size="lg" onClick={handleWishlistToggle}>
                      <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-current text-red-500" : ""}`} />
                    </Button>
                    <Button variant="outline" size="lg">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span>Quality Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <RotateCcw className="h-4 w-4 text-muted-foreground" />
                    <span>Easy Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="grid w-full grid-cols-3 bg-secondary border-muted">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Categories & Specifications</TabsTrigger>
            {/* <TabsTrigger value="categories">Categories</TabsTrigger> */}
            <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {product.categories.map((category) => (
                    <Badge key={category.id} variant="secondary">
                      {category.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.specifications.map((spec) => (
                    <div key={spec.id} className="flex justify-between py-2 border-b border-muted">
                      <span className="font-medium">{spec.name}</span>
                      <span className="text-muted-foreground">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-muted pb-4 last:border-b-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                              }`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">{review.name}</span>
                      {review.date && <span className="text-sm text-muted-foreground">{review.date}</span>}
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Similar Products */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Similar Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {similarProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
