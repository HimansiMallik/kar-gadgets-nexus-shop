
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PackageSearch, Users, ShoppingBag, DollarSign, ChevronDown, Package, Plus, Edit, Trash } from "lucide-react";

// Mock data
const productList = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 175000,
    category: "brand-new",
    stock: 15,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484429be?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Samsung Galaxy S23 Ultra",
    price: 155000,
    category: "brand-new",
    stock: 8,
    image: "https://images.unsplash.com/photo-1676315115808-b2a583f6e809?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "iPhone 13 (Used)",
    price: 80000,
    category: "used",
    stock: 3,
    image: "https://images.unsplash.com/photo-1632633173522-47456de71b76?q=80&w=600&auto=format&fit=crop",
  },
];

const userList = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    orders: 5,
    lastActive: "2023-05-10",
    avatar: "https://i.pravatar.cc/150?u=john",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    orders: 2,
    lastActive: "2023-05-15",
    avatar: "https://i.pravatar.cc/150?u=jane",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    orders: 8,
    lastActive: "2023-05-18",
    avatar: "https://i.pravatar.cc/150?u=mike",
  },
];

const orderList = [
  {
    id: "ORD-001",
    customer: "John Doe",
    date: "2023-05-18",
    total: 175000,
    status: "Delivered",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    date: "2023-05-17",
    total: 80000,
    status: "Processing",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    date: "2023-05-16",
    total: 45000,
    status: "Shipped",
  },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Product
            </Button>
          </div>
          
          <Tabs defaultValue="overview" onValueChange={setActiveTab}>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Sidebar Navigation */}
              <Card className="w-full md:w-64 shrink-0">
                <CardContent className="p-4">
                  <TabsList className="flex flex-col h-auto gap-2 bg-transparent">
                    <TabsTrigger
                      value="overview"
                      className={`w-full justify-start px-4 py-3 ${
                        activeTab === "overview" ? "" : "data-[state=active]:bg-muted"
                      }`}
                    >
                      <DollarSign className="h-5 w-5 mr-2" />
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="products"
                      className={`w-full justify-start px-4 py-3 ${
                        activeTab === "products" ? "" : "data-[state=active]:bg-muted"
                      }`}
                    >
                      <PackageSearch className="h-5 w-5 mr-2" />
                      Products
                    </TabsTrigger>
                    <TabsTrigger
                      value="users"
                      className={`w-full justify-start px-4 py-3 ${
                        activeTab === "users" ? "" : "data-[state=active]:bg-muted"
                      }`}
                    >
                      <Users className="h-5 w-5 mr-2" />
                      Users
                    </TabsTrigger>
                    <TabsTrigger
                      value="orders"
                      className={`w-full justify-start px-4 py-3 ${
                        activeTab === "orders" ? "" : "data-[state=active]:bg-muted"
                      }`}
                    >
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      Orders
                    </TabsTrigger>
                  </TabsList>
                </CardContent>
              </Card>
              
              {/* Main Content */}
              <div className="flex-grow">
                {/* Overview Tab */}
                <TabsContent value="overview" className="m-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>Total Products</CardDescription>
                        <CardTitle className="text-4xl">128</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-muted-foreground">
                          <span className="text-green-500 font-medium">+12%</span> from last month
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>Total Users</CardDescription>
                        <CardTitle className="text-4xl">842</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-muted-foreground">
                          <span className="text-green-500 font-medium">+4.6%</span> from last month
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>Revenue (This Month)</CardDescription>
                        <CardTitle className="text-4xl">₹980K</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-muted-foreground">
                          <span className="text-green-500 font-medium">+18.2%</span> from last month
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {orderList.slice(0, 3).map((order) => (
                            <div key={order.id} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                              <div>
                                <p className="font-medium">{order.id}</p>
                                <p className="text-sm text-muted-foreground">{order.customer}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">₹{order.total.toLocaleString()}</p>
                                <p className={`text-sm ${
                                  order.status === "Delivered" 
                                    ? "text-green-500"
                                    : order.status === "Processing"
                                    ? "text-amber-500"
                                    : "text-blue-500"
                                }`}>
                                  {order.status}
                                </p>
                              </div>
                            </div>
                          ))}
                          
                          <Button variant="outline" className="w-full">
                            View All Orders
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Low Stock Items</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {productList.filter(p => p.stock < 10).map((product) => (
                            <div key={product.id} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                              <div className="flex items-center">
                                <img 
                                  src={product.image} 
                                  alt={product.name} 
                                  className="w-10 h-10 rounded object-cover"
                                />
                                <p className="ml-3 font-medium">{product.name}</p>
                              </div>
                              <div>
                                <p className={`text-sm font-medium ${
                                  product.stock < 5 ? "text-red-500" : "text-amber-500"
                                }`}>
                                  {product.stock} in stock
                                </p>
                              </div>
                            </div>
                          ))}
                          
                          <Button variant="outline" className="w-full">
                            Manage Inventory
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                {/* Products Tab */}
                <TabsContent value="products" className="m-0">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Product Management</CardTitle>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Product
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left font-medium p-2 pl-0">Product</th>
                              <th className="text-left font-medium p-2">Category</th>
                              <th className="text-left font-medium p-2">Price</th>
                              <th className="text-left font-medium p-2">Stock</th>
                              <th className="text-right font-medium p-2 pr-0">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {productList.map((product) => (
                              <tr key={product.id}>
                                <td className="py-3">
                                  <div className="flex items-center">
                                    <img
                                      src={product.image}
                                      alt={product.name}
                                      className="w-10 h-10 rounded object-cover mr-3"
                                    />
                                    <span className="font-medium">{product.name}</span>
                                  </div>
                                </td>
                                <td className="p-2 capitalize">{product.category}</td>
                                <td className="p-2">₹{product.price.toLocaleString()}</td>
                                <td className="p-2">
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    product.stock > 10 
                                      ? "bg-green-100 text-green-700"
                                      : product.stock > 0
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-red-100 text-red-700"
                                  }`}>
                                    {product.stock} units
                                  </span>
                                </td>
                                <td className="p-2 pr-0 text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button size="icon" variant="ghost">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" variant="ghost">
                                      <Trash className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Users Tab */}
                <TabsContent value="users" className="m-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>User Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left font-medium p-2 pl-0">User</th>
                              <th className="text-left font-medium p-2">Email</th>
                              <th className="text-left font-medium p-2">Orders</th>
                              <th className="text-left font-medium p-2">Last Active</th>
                              <th className="text-right font-medium p-2 pr-0">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {userList.map((user) => (
                              <tr key={user.id}>
                                <td className="py-3">
                                  <div className="flex items-center">
                                    <img
                                      src={user.avatar}
                                      alt={user.name}
                                      className="w-8 h-8 rounded-full object-cover mr-3"
                                    />
                                    <span className="font-medium">{user.name}</span>
                                  </div>
                                </td>
                                <td className="p-2">{user.email}</td>
                                <td className="p-2">{user.orders}</td>
                                <td className="p-2">{user.lastActive}</td>
                                <td className="p-2 pr-0 text-right">
                                  <Button size="sm" variant="outline">
                                    View Details
                                    <ChevronDown className="h-4 w-4 ml-1" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Orders Tab */}
                <TabsContent value="orders" className="m-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left font-medium p-2 pl-0">Order ID</th>
                              <th className="text-left font-medium p-2">Customer</th>
                              <th className="text-left font-medium p-2">Date</th>
                              <th className="text-left font-medium p-2">Total</th>
                              <th className="text-left font-medium p-2">Status</th>
                              <th className="text-right font-medium p-2 pr-0">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {orderList.map((order) => (
                              <tr key={order.id}>
                                <td className="py-3 font-medium">{order.id}</td>
                                <td className="p-2">{order.customer}</td>
                                <td className="p-2">{order.date}</td>
                                <td className="p-2">₹{order.total.toLocaleString()}</td>
                                <td className="p-2">
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    order.status === "Delivered" 
                                      ? "bg-green-100 text-green-700"
                                      : order.status === "Processing"
                                      ? "bg-amber-100 text-amber-700"
                                      : "bg-blue-100 text-blue-700"
                                  }`}>
                                    {order.status}
                                  </span>
                                </td>
                                <td className="p-2 pr-0 text-right">
                                  <Button size="sm" variant="outline">
                                    Details
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default AdminDashboard;
