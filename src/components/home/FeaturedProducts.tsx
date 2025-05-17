
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const productList = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 175000,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484429be?q=80&w=600&auto=format&fit=crop",
    category: "brand-new",
    badge: "New Arrival",
    inStock: true,
  },
  {
    id: 2,
    name: "Samsung Galaxy S23 Ultra",
    price: 155000,
    image: "https://images.unsplash.com/photo-1676315115808-b2a583f6e809?q=80&w=600&auto=format&fit=crop",
    category: "brand-new",
    badge: "Best Seller",
    inStock: true,
  },
  {
    id: 3,
    name: "Google Pixel 8 Pro",
    price: 120000,
    image: "https://images.unsplash.com/photo-1696348045798-288db4d4bd18?q=80&w=600&auto=format&fit=crop",
    category: "brand-new",
    badge: null,
    inStock: true,
  },
  {
    id: 4,
    name: "MacBook Pro M2",
    price: 250000,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop",
    category: "laptops",
    badge: "Premium",
    inStock: false,
  },
  {
    id: 5,
    name: "iPhone 13 (Used)",
    price: 80000,
    image: "https://images.unsplash.com/photo-1632633173522-47456de71b76?q=80&w=600&auto=format&fit=crop",
    category: "used",
    badge: "Great Deal",
    inStock: true,
  },
  {
    id: 6,
    name: "Sony WH-1000XM4",
    price: 45000,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop",
    category: "accessories",
    badge: null,
    inStock: true,
  },
  {
    id: 7,
    name: "Dell XPS 15",
    price: 180000,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=600&auto=format&fit=crop",
    category: "laptops",
    badge: null,
    inStock: true,
  },
  {
    id: 8,
    name: "Samsung Galaxy S22 (Used)",
    price: 65000,
    image: "https://images.unsplash.com/photo-1644501648643-444daf400d4b?q=80&w=600&auto=format&fit=crop",
    category: "used",
    badge: "Certified",
    inStock: true,
  },
];

const ProductCard = ({ product }: { product: typeof productList[0] }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full border-border/40 transition-all duration-300 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/10">
        <Link to={`/product/${product.id}`}>
          <div 
            className="relative" 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="w-full h-72 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isHovered ? "scale-110" : "scale-100"
                }`}
              />
            </div>

            {/* Badge */}
            {product.badge && (
              <Badge className="absolute top-3 left-3 bg-shop-accent text-white border-none">
                {product.badge}
              </Badge>
            )}

            {/* Favorite Button */}
            <button
              onClick={toggleFavorite}
              className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                isFavorited 
                  ? "bg-red-500 text-white" 
                  : "bg-white/80 backdrop-blur-sm hover:bg-white text-gray-600 hover:text-red-500"
              }`}
            >
              <Heart className="w-4 h-4" fill={isFavorited ? "currentColor" : "none"} />
            </button>

            {/* Availability Tag */}
            <div className="absolute bottom-3 left-3">
              {!product.inStock && (
                <Badge variant="destructive" className="text-xs font-normal">
                  Out of Stock
                </Badge>
              )}
            </div>
          </div>

          <CardContent className="p-4">
            <h3 className="font-medium text-lg mb-1 line-clamp-1">{product.name}</h3>
            <p className="text-xl font-bold mb-3">
              NPR {product.price.toLocaleString()}
            </p>
            <div className="flex gap-2">
              <Button 
                variant="default" 
                className="w-full"
                disabled={!product.inStock}
              >
                View Details
              </Button>
            </div>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
};

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState<string>("all");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const filteredProducts = activeTab === "all" 
    ? productList 
    : productList.filter(product => product.category === activeTab);

  const tabs = [
    { id: "all", label: "All Products" },
    { id: "brand-new", label: "Brand New" },
    { id: "used", label: "Used Phones" },
    { id: "accessories", label: "Accessories" },
    { id: "laptops", label: "Laptops" },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our collection of premium phones, laptops, and accessories curated especially for you.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              className="relative"
              onClick={() => handleTabChange(tab.id)}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 rounded-md bg-primary/10 -z-10"
                />
              )}
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild>
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
