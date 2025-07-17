import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddToCartModal, type ProductForModal } from "./add-to-cart-modal"
import { Badge } from "../ui/badge"
import { useWishlist } from "../providers/wishlist-provider"

interface ProductCardProps {
  product: {
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
    variants?: Array<{
      id: number
      name: string
      options: string[]
    }>
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsModalOpen(true)
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
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

  const isInWishlistState = isInWishlist(product.id)

  // Convert product to modal format
  const productForModal: ProductForModal = {
    ...product,
    inStock: product.inStock ?? true, // Default to true if not specified
  }

  return (
    <>
      <Link to={`/product/${product.id}`} className="group block">
        <div className="bg-background rounded-md overflow-hidden border border-gray-100">
          <div className="relative aspect-square overflow-hidden">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.badge && <Badge className="absolute top-2 left-2 z-10">{product.badge}</Badge>}
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-2 right-2 z-10 bg-white/80 hover:bg-white ${
                isInWishlistState ? "text-red-500" : "text-muted-foreground"
              }`}
              onClick={handleWishlistToggle}
            >
              <Heart className={`h-4 w-4 ${isInWishlistState ? "fill-current" : ""}`} />
            </Button>
          </div>

          <div className="p-4">
            <div className="mb-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{product.category}</p>
              <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{product.name}</h3>
            </div>

            {product.rating && (
              <div className="flex items-center gap-1 mb-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(product.rating!) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">({product.reviews})</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                )}
              </div>
              <Button
                size="sm"
                onClick={handleAddToCart}
                className=""
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </div>
      </Link>

      <AddToCartModal
        product={productForModal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
