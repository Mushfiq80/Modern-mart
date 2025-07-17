import { Award, Users, Truck, Shield, Heart, Leaf, Globe, Star, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Link } from "react-router-dom"

const stats = [
    {
        icon: Users,
        value: "50K+",
        label: "Happy Customers",
        description: "Satisfied customers worldwide"
    },
    {
        icon: Award,
        value: "5+",
        label: "Years Experience",
        description: "In premium food delivery"
    },
    {
        icon: Truck,
        value: "100K+",
        label: "Orders Delivered",
        description: "Fresh products delivered"
    },
    {
        icon: Star,
        value: "4.9",
        label: "Average Rating",
        description: "Customer satisfaction score"
    }
]

const values = [
    {
        icon: Leaf,
        title: "Sustainability",
        description: "We're committed to eco-friendly practices and sustainable sourcing from local farms and ethical suppliers.",
        color: "from-green-500 to-emerald-600"
    },
    {
        icon: Shield,
        title: "Quality Assurance",
        description: "Every product undergoes rigorous quality checks to ensure you receive only the freshest, highest-quality items.",
        color: "from-blue-500 to-cyan-600"
    },
    {
        icon: Heart,
        title: "Customer First",
        description: "Your satisfaction is our priority. We go above and beyond to deliver exceptional service and support.",
        color: "from-red-500 to-pink-600"
    },
    {
        icon: Globe,
        title: "Global Reach",
        description: "Connecting communities worldwide with premium food products while supporting local producers.",
        color: "from-purple-500 to-indigo-600"
    }
]

const team = [
    {
        name: "Sarah Chen",
        role: "Founder & CEO",
        image: "/placeholder-user.jpg",
        description: "Visionary leader with 15+ years in sustainable food industry"
    },
    {
        name: "Michael Rodriguez",
        role: "Head of Operations",
        image: "/placeholder-user.jpg",
        description: "Logistics expert ensuring seamless delivery experiences"
    },
    {
        name: "Emily Thompson",
        role: "Quality Director",
        image: "/placeholder-user.jpg",
        description: "Food safety specialist maintaining our high standards"
    },
    {
        name: "David Kim",
        role: "Technology Lead",
        image: "/placeholder-user.jpg",
        description: "Tech innovator building the future of online grocery"
    }
]

const milestones = [
    {
        year: "2019",
        title: "Company Founded",
        description: "Started with a vision to revolutionize online grocery shopping"
    },
    {
        year: "2020",
        title: "First 1K Customers",
        description: "Reached our first milestone of 1,000 satisfied customers"
    },
    {
        year: "2021",
        title: "Sustainable Partnerships",
        description: "Formed partnerships with 50+ local organic farms"
    },
    {
        year: "2022",
        title: "Quality Certification",
        description: "Achieved ISO 22000 food safety management certification"
    },
    {
        year: "2023",
        title: "National Expansion",
        description: "Expanded delivery services to 100+ cities nationwide"
    },
    {
        year: "2024",
        title: "50K+ Customers",
        description: "Celebrating our growing community of food enthusiasts"
    }
]

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <Breadcrumbs
                    items={[
                        { name: "Home", href: "/" },
                        { name: "About", href: "/about" },
                    ]}
                />

                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                            About ModernMart
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                            We're more than just an online grocery store. We're your trusted partner in bringing fresh,
                            high-quality products directly to your doorstep while supporting sustainable farming practices
                            and local communities.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="px-8">
                                <Link to="/products">Shop Now</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="px-8">
                                <Link to="/contact">Get in Touch</Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                    {stats.map((stat, index) => (
                        <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex justify-center mb-4">
                                    <div className="p-3 bg-primary/10 rounded-full">
                                        <stat.icon className="h-8 w-8 text-primary" />
                                    </div>
                                </div>
                                <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                                <p className="font-semibold mb-1">{stat.label}</p>
                                <p className="text-sm text-muted-foreground">{stat.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Timeline Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Key milestones that shaped our company
                        </p>
                    </div>

                    <div className="relative">
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border"></div>
                        <div className="space-y-8">
                            {milestones.map((milestone, index) => (
                                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                                        <Card className="hover:shadow-lg transition-shadow">
                                            <CardContent className="p-6">
                                                <Badge className="mb-2">{milestone.year}</Badge>
                                                <h3 className="font-bold text-lg mb-2">{milestone.title}</h3>
                                                <p className="text-muted-foreground">{milestone.description}</p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                    <div className="relative flex items-center justify-center w-8 h-8 bg-primary rounded-full border-4 border-background z-10">
                                        <div className="w-2 h-2 bg-background rounded-full"></div>
                                    </div>
                                    <div className="w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Story Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold">Our Story</h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                Founded in 2019, ModernMart began with a simple yet powerful vision: to make fresh,
                                high-quality food accessible to everyone while supporting sustainable farming practices.
                                What started as a local initiative has grown into a nationwide platform connecting
                                conscious consumers with premium products.
                            </p>
                            <p>
                                Our journey has been driven by the belief that everyone deserves access to nutritious,
                                ethically-sourced food. We work directly with local farmers, artisans, and producers
                                who share our commitment to quality and sustainability.
                            </p>
                            <p>
                                Today, we're proud to serve over 50,000 customers across the country, delivering not
                                just products, but a promise of quality, freshness, and ethical sourcing in every order.
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="text-sm font-medium">Certified Organic Partner</span>
                        </div>
                    </div>

                    <div className="relative">
                        <Card className="overflow-hidden">
                            <CardContent className="p-0">
                                <img
                                    src="https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Our organic farm partners"
                                    width={600}
                                    height={400}
                                    className="w-full h-80 object-cover"
                                />
                            </CardContent>
                        </Card>
                        <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
                            <p className="font-bold text-lg">Est. 2019</p>
                            <p className="text-sm opacity-90">Trusted Partner</p>
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            The principles that guide everything we do, from sourcing to delivery
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {values.map((value, index) => (
                            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                                <div className={`bg-gradient-to-br ${value.color} p-6 text-white`}>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <value.icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-xl font-bold">{value.title}</h3>
                                    </div>
                                </div>
                                <CardContent className="p-6">
                                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Team Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            The passionate people behind ModernMart's success
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((member, index) => (
                            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="relative mb-4">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            width={120}
                                            height={120}
                                            className="w-24 h-24 rounded-full mx-auto object-cover"
                                        />
                                    </div>
                                    <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                                    <Badge variant="secondary" className="mb-3">{member.role}</Badge>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {member.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <Card className="max-w-3xl mx-auto">
                        <CardContent className="p-12">
                            <h2 className="text-3xl font-bold mb-4">Ready to Experience the Difference?</h2>
                            <p className="text-xl text-muted-foreground mb-8">
                                Join thousands of satisfied customers who trust ModernMart for their grocery needs.
                                Discover fresh, quality products delivered right to your door.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button asChild size="lg" className="px-8">
                                    <Link to="/products">Start Shopping</Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="px-8">
                                    <Link to="/categories">Browse Categories</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
