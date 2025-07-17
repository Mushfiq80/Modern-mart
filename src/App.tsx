import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/providers/theme-provider'
import { CartProvider } from './components/providers/cart-provider'
import { WishlistProvider } from './components/providers/wishlist-provider'
import { Layout } from './components/layout/layout'
import HomePage from './pages/Home'
import CartPage from './components/shared/cart'
import CheckoutPage from './pages/Checkout'
import ProductDetailPage from './pages/SingleProduct'
import ProductsPage from './pages/AllProducts'
import DashboardPage from './pages/dashboard'
import WishlistPage from './pages/Wishlist'
import CategoriesPage from './pages/AllCategories'
import CategoryPage from './pages/SingleCategory'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact'

function App() {
  return (
    <Router>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <CartProvider>
          <WishlistProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/category/:category" element={<CategoryPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                {/* Add more routes here as needed */}
              </Routes>
            </Layout>
          </WishlistProvider>
        </CartProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App
