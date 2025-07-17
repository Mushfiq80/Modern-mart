import { useState } from "react"
import { User, Package, MapPin, Heart, Settings, LogOut, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const orders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "Delivered",
    total: 45.99,
    items: 3,
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "Processing",
    total: 78.5,
    items: 5,
  },
  {
    id: "ORD-003",
    date: "2024-01-05",
    status: "Shipped",
    total: 32.25,
    items: 2,
  },
]

const addresses = [
  {
    id: 1,
    type: "Home",
    name: "John Doe",
    address: "123 Future Street, Tech City, TC 12345",
    phone: "+1 (555) 123-4567",
    isDefault: true,
  },
  {
    id: 2,
    type: "Work",
    name: "John Doe",
    address: "456 Innovation Ave, Digital District, DD 67890",
    phone: "+1 (555) 987-6543",
    isDefault: false,
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold ">John Doe</h3>
                  <p className="text-sm text-gray-500">Premium Member</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant={activeTab === "overview" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("overview")}
              >
                <Package className="h-4 w-4 mr-2" />
                Overview
              </Button>
              <Button
                variant={activeTab === "orders" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("orders")}
              >
                <Package className="h-4 w-4 mr-2" />
                Orders
              </Button>
              <Button
                variant={activeTab === "addresses" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("addresses")}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Addresses
              </Button>
              {/* <Button
                variant={activeTab === "wishlist" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("wishlist")}
              >
                <Heart className="h-4 w-4 mr-2" />
                Wishlist
              </Button> */}
              <Button
                variant={activeTab === "profile" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("profile")}
              >
                <Settings className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Separator className="my-4" />
              <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-400">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold ">Dashboard Overview</h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Orders</p>
                        <p className="text-2xl font-bold ">12</p>
                      </div>
                      <Package className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Spent</p>
                        <p className="text-2xl font-bold ">$456.74</p>
                      </div>
                      <CreditCard className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Wishlist Items</p>
                        <p className="text-2xl font-bold ">8</p>
                      </div>
                      <Heart className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="">
                <CardHeader>
                  <CardTitle className="">Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                        <div>
                          <p className="font-semibold ">{order.id}</p>
                          <p className="text-sm text-gray-500">
                            {order.date} • {order.items} items
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold ">${order.total}</p>
                          <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>{order.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold ">Order History</h1>

              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id} className="">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold  text-lg">{order.id}</h3>
                          <p className="text-gray-500">Placed on {order.date}</p>
                        </div>
                        <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>{order.status}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-gray-500">{order.items} items</p>
                        <p className="font-semibold  text-lg">${order.total}</p>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Track Order
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "addresses" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold ">Saved Addresses</h1>
                <Button>Add New Address</Button>
              </div>

              <div className="grid gap-4">
                {addresses.map((address) => (
                  <Card key={address.id} className="">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold ">{address.type}</h3>
                            {address.isDefault && <Badge className="bg-blue-500/20 text-blue-500">Default</Badge>}
                          </div>
                          <p className="">{address.name}</p>
                          <p className="text-gray-500">{address.address}</p>
                          <p className="text-gray-500">{address.phone}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 bg-transparent">
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold ">Profile Settings</h1>

              <Card className="">
                <CardHeader>
                  <CardTitle className="">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="">
                        First Name
                      </Label>
                      <Input id="firstName" defaultValue="John" className="" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="">
                        Last Name
                      </Label>
                      <Input id="lastName" defaultValue="Doe" className="" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="">
                      Email
                    </Label>
                    <Input id="email" type="email" defaultValue="john@example.com" className="" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="">
                      Phone
                    </Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" className="" />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
