"use client"

import { X } from "lucide-react"
import { useState } from "react"

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-primary text-primary-foreground py-2 px-4 text-center text-sm relative">
      <p>🎉 Free shipping on orders over $50! Use code: FREESHIP</p>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
