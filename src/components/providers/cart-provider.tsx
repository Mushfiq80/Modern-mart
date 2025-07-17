import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  category: string
  variants?: Record<string, string>
  cartItemId?: string // Add unique cart item identifier
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity" | "cartItemId">) => void
  removeItem: (cartItemId: string) => void
  updateQuantity: (cartItemId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addItem = (newItem: Omit<CartItem, "quantity" | "cartItemId">) => {
    setItems((prev) => {
      // Create a unique key based on id and variants
      const generateCartItemId = (item: typeof newItem) => {
        return item.variants 
          ? `${item.id}-${JSON.stringify(item.variants)}` 
          : item.id
      }
      
      const cartItemId = generateCartItemId(newItem)
      const existingItem = prev.find((item) => 
        (item.cartItemId || generateCartItemId(item)) === cartItemId
      )
      
      if (existingItem) {
        return prev.map((item) => {
          const itemCartId = item.cartItemId || generateCartItemId(item)
          return itemCartId === cartItemId
            ? { ...item, quantity: item.quantity + 1, cartItemId } 
            : item
        })
      }
      
      return [...prev, { ...newItem, quantity: 1, cartItemId }]
    })
  }

  const removeItem = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => 
      (item.cartItemId || `${item.id}-${JSON.stringify(item.variants || {})}`) !== cartItemId
    ))
  }

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(cartItemId)
      return
    }
    setItems((prev) => prev.map((item) => {
      const itemCartId = item.cartItemId || `${item.id}-${JSON.stringify(item.variants || {})}`
      return itemCartId === cartItemId 
        ? { ...item, quantity, cartItemId: itemCartId } 
        : item
    }))
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
