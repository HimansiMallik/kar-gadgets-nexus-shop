import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PackageSearch, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  ChevronDown, 
  Plus, 
  Edit, 
  Trash, 
  Search,
  SlidersHorizontal 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";

// Mock data
const initialProductList = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 175000,
    category: "brand-new",
    stock: 15,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484429be?q=80&w=600&auto=format&fit=crop",
    description: "Latest iPhone with cutting edge features and revolutionary camera.",
  },
  {
    id: 2,
    name: "Samsung Galaxy S23 Ultra",
    price: 155000,
    category: "brand-new",
    stock: 8,
    image: "https://images.unsplash.com/photo-1676315115808-b2a583f6e809?q=80&w=600&auto=format&fit=crop",
    description: "Flagship Android smartphone with incredible camera capabilities.",
  },
  {
    id: 5,
    name: "iPhone 13 (Used)",
    price: 80000,
    category: "used",
    stock: 3,
    image: "https://images.unsplash.com/photo-1632633173522-47456de71b76?q=80&w=600&auto=format&fit=crop",
    description: "Pre-owned iPhone 13 in excellent condition.",
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
  const [productList, setProductList] = useState(initialProductList);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if not admin
    if (!user || !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You do not have permission to access the admin dashboard",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [user, isAdmin, navigate, toast]);
  
  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };
  
  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };
  
  const handleDeleteProduct = (id: number) => {
    setProductList(productList.filter((p) => p.id !== id));
    toast({
      title: "Product Deleted",
      description: "The product has been successfully removed",
    });
  };
  
  const handleProductSubmit = (product: any) => {
    if (editingProduct) {
      // Update existing product
      setProductList(
        productList.map((p) => (p.id === product.id ? product : p))
      );
      toast({
        title: "Product Updated",
        description: "The product has been successfully updated",
      });
    } else {
      // Add new product
      setProductList([...productList, product]);
      toast({
        title: "Product Added",
        description: "The new product has been successfully added",
      });
    }
    setShowProductForm(false);
    setEditingProduct(null);
  };
  
  const filteredProducts = productList.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const tabAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut" 
      }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: { 
        duration: 0.2,
        ease: "easeIn" 
      }
    }
  };
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <motion.h1 
              className="text-3xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Admin Dashboard
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button onClick={handleAddProduct}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
            </motion.div>
          </div>
          
          <Tabs defaultValue="overview" onValueChange={setActiveTab}>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Sidebar Navigation */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
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
              </motion.div>
              
              {/* Main Content */}
              <div className="flex-grow">
                <AnimatePresence mode="wait">
                  {/* Overview Tab */}
                  {activeTab === "overview" && (
                    <motion.div
                      key="overview"
                      variants={tabAnimation}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <Card>
                            <CardHeader className="pb-2">
                              <CardDescription>Total Products</CardDescription>
                              <CardTitle className="text-4xl">{productList.length}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-sm text-muted-foreground">
                                <span className="text-green-500 font-medium">+12%</span> from last month
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Card>
                            <CardHeader className="pb-2">
                              <CardDescription>Total Users</CardDescription>
                              <CardTitle className="text-4xl">{userList.length}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-sm text-muted-foreground">
                                <span className="text-green-500 font-medium">+4.6%</span> from last month
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
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
                        </motion.div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
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
                        </motion.div>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
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
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                
                  {/* Products Tab */}
                  {activeTab === "products" && (
                    <motion.div
                      key="products"
                      variants={tabAnimation}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <Card>
                        <CardHeader>
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <CardTitle>Product Management</CardTitle>
                            <div className="flex flex-col md:flex-row gap-2">
                              <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                  placeholder="Search products..."
                                  value={searchTerm}
                                  onChange={(e) => setSearchTerm(e.target.value)}
                                  className="pl-9 w-full md:w-[200px]"
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="icon">
                                  <SlidersHorizontal className="h-4 w-4" />
                                </Button>
                                <Button size="sm" onClick={handleAddProduct}>
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add Product
                                </Button>
                              </div>
                            </div>
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
                                <AnimatePresence>
                                  {filteredProducts.map((product) => (
                                    <motion.tr 
                                      key={product.id}
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      exit={{ 
                                        opacity: 0,
                                        height: 0,
                                        overflow: "hidden"
                                      }}
                                      transition={{ duration: 0.2 }}
                                      layout
                                    >
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
                                          <Button 
                                            size="icon" 
                                            variant="ghost"
                                            onClick={() => handleEditProduct(product)}
                                          >
                                            <Edit className="h-4 w-4" />
                                          </Button>
                                          <Button 
                                            size="icon" 
                                            variant="ghost"
                                            onClick={() => handleDeleteProduct(product.id)}
                                          >
                                            <Trash className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </td>
                                    </motion.tr>
                                  ))}
                                </AnimatePresence>
                                
                                {filteredProducts.length === 0 && (
                                  <tr>
                                    <td colSpan={5} className="py-4 text-center text-muted-foreground">
                                      No products found
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                  
                  {/* Other tabs content (Users and Orders) remains the same */}
                  {activeTab === "users" && (
                    <motion.div
                      key="users"
                      variants={tabAnimation}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
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
                                  <motion.tr 
                                    key={user.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                  >
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
                                  </motion.tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                  
                  {activeTab === "orders" && (
                    <motion.div
                      key="orders"
                      variants={tabAnimation}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
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
                                  <motion.tr 
                                    key={order.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                  >
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
                                  </motion.tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Tabs>
        </motion.div>
      </div>
      
      <AnimatePresence>
        {showProductForm && (
          <ProductForm
            onSubmit={handleProductSubmit}
            onCancel={() => {
              setShowProductForm(false);
              setEditingProduct(null);
            }}
            initialData={editingProduct}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default AdminDashboard;
