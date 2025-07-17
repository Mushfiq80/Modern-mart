import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useCart } from "../providers/cart-provider"

interface CartDrawerProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function CartDrawer({ isOpen, onOpenChange }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart()

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full mt-6">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-4">Add some products to get started!</p>
                <Button onClick={() => onOpenChange(false)} asChild>
                  <Link to="/">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto pr-2 -mr-2">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.cartItemId || item.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img 
                          src={item.image || "/placeholder.svg"} 
                          alt={item.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                        <p className="text-sm font-semibold mt-1">${item.price.toFixed(2)}</p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => updateQuantity(item.cartItemId || item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-xs w-8 text-center font-medium">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => updateQuantity(item.cartItemId || item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.cartItemId || item.id)}
                          className="text-red-500 hover:text-red-700 p-1 h-auto"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>

                        <p className="text-sm font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer - Order Summary */}
              <div className="border-t pt-6 mt-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{totalPrice > 50 ? "Free" : "$5.99"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${(totalPrice * 0.08).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${(totalPrice + (totalPrice > 50 ? 0 : 5.99) + totalPrice * 0.08).toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => onOpenChange(false)}
                    asChild
                  >
                    <Link to="/checkout">
                      Proceed to Checkout
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => onOpenChange(false)}
                    asChild
                  >
                    <Link to="/cart">
                      View Full Cart
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
