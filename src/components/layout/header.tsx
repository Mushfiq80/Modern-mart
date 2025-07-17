import { useState } from "react"
import { Link } from "react-router-dom"
import { useTheme } from "../providers/theme-provider"
import { Search, Sun, Moon, Heart, ShoppingCart, User, Menu, X, Store } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCart } from "../providers/cart-provider"
import { useWishlist } from "../providers/wishlist-provider"
import { CartDrawer } from "../shared/cart-drawer"
import { Dock, DockIcon } from "../magicui/dock"
import { cn } from "@/lib/utils"

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Categories", href: "/categories" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { totalItems } = useCart()
  const { items: wishlistItems } = useWishlist()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Store className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">ModernMart</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center gap-2 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10"
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center flex-shrink-0">
            <TooltipProvider>
              <Dock direction="middle" className="bg-transparent border-none p-0 mt-0">
                {/* Cart */}
                <DockIcon>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div 
                        className={cn(
                          "relative flex items-center justify-center size-10 rounded-full hover:bg-muted transition-colors cursor-pointer",
                          "group"
                        )}
                        onClick={() => setIsCartOpen(true)}
                      >
                        <ShoppingCart className="h-5 w-5 text-foreground transition-transform group-hover:scale-110" />
                        {totalItems > 0 && (
                          <Badge className="absolute -top-0 -right-2 h-4 w-4 flex items-center justify-center p-0 text-xs">
                            {totalItems}
                          </Badge>
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Shopping Cart ({totalItems})</p>
                    </TooltipContent>
                  </Tooltip>
                </DockIcon>

                {/* Wishlist */}
                <DockIcon>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link 
                        to="/wishlist" 
                        className={cn(
                          "relative flex items-center justify-center size-10 rounded-full hover:bg-muted transition-colors",
                          "group"
                        )}
                      >
                        <Heart className="h-5 w-5 text-foreground transition-transform group-hover:scale-110" />
                        {wishlistItems.length > 0 && (
                          <Badge className="absolute -top-0 -right-2 h-4 w-4 flex items-center justify-center p-0 text-xs">
                            {wishlistItems.length}
                          </Badge>
                        )}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Wishlist ({wishlistItems.length})</p>
                    </TooltipContent>
                  </Tooltip>
                </DockIcon>

                {/* User Account */}
                <DockIcon>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div className={cn(
                            "flex items-center justify-center size-10 rounded-full hover:bg-muted transition-colors cursor-pointer",
                            "group"
                          )}>
                            <User className="h-5 w-5 text-foreground transition-transform group-hover:scale-110" />
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to="/login">Sign In</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/register">Create Account</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/account">My Account</Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Account</p>
                    </TooltipContent>
                  </Tooltip>
                </DockIcon>

                {/* Theme Toggle */}
                <DockIcon>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={cn(
                          "flex items-center justify-center size-10 rounded-full hover:bg-muted transition-colors cursor-pointer",
                          "group"
                        )}
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                      >
                        {theme === "light" ? (
                          <Moon className="h-5 w-5 text-foreground transition-transform group-hover:scale-110" />
                        ) : (
                          <Sun className="h-5 w-5 text-foreground transition-transform group-hover:scale-110" />
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Toggle Theme</p>
                    </TooltipContent>
                  </Tooltip>
                </DockIcon>

                {/* Mobile Menu Toggle */}
                <DockIcon className="md:hidden">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={cn(
                          "flex items-center justify-center size-10 rounded-full hover:bg-muted transition-colors cursor-pointer",
                          "group"
                        )}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                      >
                        {isMenuOpen ? (
                          <X className="h-5 w-5 transition-transform group-hover:scale-110" />
                        ) : (
                          <Menu className="h-5 w-5 transition-transform group-hover:scale-110" />
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Menu</p>
                    </TooltipContent>
                  </Tooltip>
                </DockIcon>
              </Dock>
            </TooltipProvider>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col gap-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {/* Mobile Search */}
              <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-10"
                />
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onOpenChange={setIsCartOpen} />
    </header>
  )
}
