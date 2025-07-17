import { useState, useEffect } from "react"
import { Heart, Minus, Plus, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useWishlist } from "../providers/wishlist-provider"
import { useCart } from "../providers/cart-provider"


export interface ProductVariant {
  id: number
  name: string
  options: string[]
}

export interface ProductForModal {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating?: number
  reviews?: number
  badge?: string
  inStock?: boolean
  stockCount?: number
  variants?: ProductVariant[]
}

interface AddToCartModalProps {
  product: ProductForModal | null
  isOpen: boolean
  onClose: () => void
}

export function AddToCartModal({ product, isOpen, onClose }: AddToCartModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()

  // Initialize selected variants when product changes
  useEffect(() => {
    if (product?.variants) {
      const initialVariants: Record<string, string> = {}
      product.variants.forEach((variant) => {
        if (variant.options.length > 0) {
          initialVariants[variant.name] = variant.options[0]
        }
      })
      setSelectedVariants(initialVariants)
    }
  }, [product])

  const handleAddToCart = () => {
    if (!product) return

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        variants: Object.keys(selectedVariants).length > 0 ? selectedVariants : undefined,
      })
    }
    
    // Reset modal state and close
    setQuantity(1)
    onClose()
  }

  const handleWishlistToggle = () => {
    if (!product) return
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      })
    }
  }

  if (!product) return null

  const isInWishlistState = isInWishlist(product.id)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Add to Cart
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="aspect-square rounded-lg overflow-hidden bg-muted relative">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <Badge className="absolute top-2 left-2 z-10">{product.badge}</Badge>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  {product.category}
                </p>
                {!product.inStock && (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
              <h3 className="text-xl font-semibold">{product.name}</h3>
              
              {product.rating && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(product.rating!) 
                            ? "fill-yellow-400 text-yellow-400" 
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    ({product.reviews})
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-sm text-green-600">
                  You save ${(product.originalPrice - product.price).toFixed(2)}
                </p>
              )}
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-3">
                {product.variants.map((variant) => (
                  <div key={variant.id}>
                    <label className="text-sm font-medium mb-2 block">
                      {variant.name}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {variant.options.map((option) => (
                        <Button
                          key={option}
                          variant={
                            selectedVariants[variant.name] === option 
                              ? "default" 
                              : "outline"
                          }
                          size="sm"
                          onClick={() =>
                            setSelectedVariants((prev) => ({
                              ...prev,
                              [variant.name]: option,
                            }))
                          }
                          className="text-xs"
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-8 w-8 rounded-r-none"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="px-3 py-1 text-sm border-x min-w-[2.5rem] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-8 w-8 rounded-l-none"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              {product.stockCount && (
                <div className="text-xs text-muted-foreground">
                  {product.stockCount} items available
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <Button
                className="w-full"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleWishlistToggle}
                  className="flex-1"
                >
                  <Heart 
                    className={`h-4 w-4 mr-2 ${
                      isInWishlistState ? "fill-current text-red-500" : ""
                    }`} 
                  />
                  {isInWishlistState ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
