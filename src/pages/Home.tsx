import { CategoriesSection } from "../components/homePage/CategoriesSection";
import { CollectionSliders } from "../components/homePage/CollectionSliders";
import { FeaturedProducts } from "../components/homePage/FeaturedProducts";
import { HeroSection } from "../components/homePage/HeroSection";
import { TestimonialsSection } from "../components/homePage/TestimonialsSection";



export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <CollectionSliders />
      <TestimonialsSection />
    </main>
  )
}