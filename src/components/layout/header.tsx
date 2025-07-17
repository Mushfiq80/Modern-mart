import { useState } from "react"
import { Link } from "react-router-dom"
import { useTheme } from "../providers/theme-provider"
import { Search, Sun, Moon, Heart, ShoppingCart, User, Menu, X, Store } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { totalItems } = useCart()
  const { items: wishlistItems } = useWishlist()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
            <Store className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl xs:block sm:text-lg md:text-xl">ModernMart</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
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

          {/* Right side actions */}
          <div className="flex items-center flex-shrink-0">
            <TooltipProvider>
              <Dock direction="middle" className="bg-transparent border-none p-0 mt-0 h-auto flex items-center">
                {/* Search */}
                <DockIcon>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div 
                        className={cn(
                          "relative flex items-center justify-center size-10 rounded-full hover:bg-muted transition-colors cursor-pointer",
                          "group"
                        )}
                        onClick={() => setIsSearchOpen(true)}
                      >
                        <Search className="h-5 w-5 text-foreground transition-transform group-hover:scale-110" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Search</p>
                    </TooltipContent>
                  </Tooltip>
                </DockIcon>

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

                {/* Wishlist - Hidden on small screens */}
                <DockIcon className="hidden sm:flex">
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

                {/* User Account - Hidden on small screens */}
                <DockIcon className="hidden md:flex">
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

                {/* Theme Toggle - Hidden on small screens */}
                <DockIcon className="hidden sm:flex">
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
                <DockIcon className="lg:hidden">
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
          <div className="lg:hidden border-t py-4">
            <nav className="flex flex-col gap-4">              
              {/* Mobile Navigation Links */}
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                {/* Wishlist - Mobile */}
                <Link
                  to="/wishlist"
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors sm:hidden"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="h-4 w-4" />
                  <span>Wishlist</span>
                  {wishlistItems.length > 0 && (
                    <Badge className="h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {wishlistItems.length}
                    </Badge>
                  )}
                </Link>

                {/* Account - Mobile */}
                <Link
                  to="/account"
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors md:hidden"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  <span>Account</span>
                </Link>

                {/* Theme Toggle - Mobile */}
                <div
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors cursor-pointer sm:hidden"
                  onClick={() => {
                    setTheme(theme === "light" ? "dark" : "light")
                    setIsMenuOpen(false)
                  }}
                >
                  {theme === "light" ? (
                    <>
                      <Moon className="h-4 w-4" />
                      <span>Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <Sun className="h-4 w-4" />
                      <span>Light Mode</span>
                    </>
                  )}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onOpenChange={setIsCartOpen} />

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-start justify-center pt-20">
          <div className="bg-background border border-border rounded-lg shadow-2xl w-full max-w-2xl mx-4 animate-in slide-in-from-top-4 duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Search Products</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(false)}
                  className="hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search for products, categories, brands..." 
                  className="pl-12 pr-4 py-3 text-lg bg-muted/50 border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  autoFocus
                />
              </div>

              {/* Quick Search Suggestions */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {["Organic Fruits", "Fresh Vegetables", "Seafood", "Bakery Items", "Dairy Products"].map((term) => (
                    <Button
                      key={term}
                      variant="outline"
                      size="sm"
                      className="text-xs hover:bg-primary hover:text-primary-foreground"
                      onClick={() => {
                        // Handle search term click
                        setIsSearchOpen(false)
                      }}
                    >
                      {term}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Recent Searches */}
              <div className="space-y-3 mt-6">
                <p className="text-sm font-medium text-muted-foreground">Recent Searches</p>
                <div className="space-y-2">
                  {["Quantum Avocados", "Neo-Fresh Salmon", "Artisan Bread"].map((term) => (
                    <div
                      key={term}
                      className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer transition-colors"
                      onClick={() => {
                        // Handle recent search click
                        setIsSearchOpen(false)
                      }}
                    >
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{term}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
