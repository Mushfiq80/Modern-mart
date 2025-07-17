import type React from "react"
import { AnnouncementBar } from "./announcement-bar"
import { Footer } from "./footer"
import { Header } from "./header"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      {children}
      <Footer />
    </div>
  )
}
