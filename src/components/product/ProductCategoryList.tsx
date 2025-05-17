
import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Check, Search, SlidersHorizontal, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  badge?: string | null;
  inStock: boolean;
}

// These categories map to the URL parameter
const categoryInfo: Record<string, { title: string; description: string }> = {
  "brand-new": {
    title: "Brand New Phones",
    description: "Latest and greatest smartphones with full warranty and all original accessories."
  },
  "used": {
    title: "Quality Used Phones",
    description: "Pre-owned smartphones, thoroughly tested and certified for quality and performance."
  },
  "accessories": {
    title: "Phone Accessories",
    description: "Enhance your smartphone experience with our range of premium accessories."
  },
  "laptops": {
    title: "Laptops & Computers",
    description: "Powerful laptops for work, gaming, and everyday computing needs."
  }
};

// Mock products data
const mockProducts: Product[] = [
  // Brand New Phones
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 175000,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484429be?q=80&w=600&auto=format&fit=crop",
    category: "brand-new",
    brand: "Apple",
    badge: "New Arrival",
    inStock: true,
  },
  {
    id: 2,
    name: "Samsung Galaxy S23 Ultra",
    price: 155000,
    image: "https://images.unsplash.com/photo-1676315115808-b2a583f6e809?q=80&w=600&auto=format&fit=crop",
    category: "brand-new",
    brand: "Samsung",
    badge: "Best Seller",
    inStock: true,
  },
  {
    id: 3,
    name: "Google Pixel 8 Pro",
    price: 120000,
    image: "https://images.unsplash.com/photo-1696348045798-288db4d4bd18?q=80&w=600&auto=format&fit=crop",
    category: "brand-new",
    brand: "Google",
    badge: null,
    inStock: true,
  },
  {
    id: 4,
    name: "OnePlus 12",
    price: 100000,
    image: "https://images.unsplash.com/photo-1676455981746-2146e00edf99?q=80&w=600&auto=format&fit=crop",
    category: "brand-new",
    brand: "OnePlus",
    badge: null,
    inStock: false,
  },
  
  // Used Phones
  {
    id: 5,
    name: "iPhone 13 (Used)",
    price: 80000,
    image: "https://images.unsplash.com/photo-1632633173522-47456de71b76?q=80&w=600&auto=format&fit=crop",
    category: "used",
    brand: "Apple",
    badge: "Great Deal",
    inStock: true,
  },
  {
    id: 6,
    name: "Samsung Galaxy S22 (Used)",
    price: 65000,
    image: "https://images.unsplash.com/photo-1644501648643-444daf400d4b?q=80&w=600&auto=format&fit=crop",
    category: "used",
    brand: "Samsung",
    badge: "Certified",
    inStock: true,
  },
  {
    id: 7,
    name: "iPhone 12 Pro (Used)",
    price: 70000,
    image: "https://images.unsplash.com/photo-1603891128711-11b4b03bb138?q=80&w=600&auto=format&fit=crop",
    category: "used",
    brand: "Apple",
    badge: null,
    inStock: true,
  },
  {
    id: 8,
    name: "Google Pixel 7 (Used)",
    price: 60000,
    image: "https://images.unsplash.com/photo-1667006050229-8c9e7ae9e724?q=80&w=600&auto=format&fit=crop",
    category: "used",
    brand: "Google",
    badge: "Like New",
    inStock: true,
  },
  
  // Accessories
  {
    id: 9,
    name: "Sony WH-1000XM4",
    price: 45000,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop",
    category: "accessories",
    brand: "Sony",
    badge: null,
    inStock: true,
  },
  {
    id: 10,
    name: "AirPods Pro",
    price: 36000,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop",
    category: "accessories",
    brand: "Apple",
    badge: "Popular",
    inStock: true,
  },
  {
    id: 11,
    name: "Samsung Galaxy Watch 6",
    price: 40000,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop",
    category: "accessories",
    brand: "Samsung",
    badge: null,
    inStock: true,
  },
  {
    id: 12,
    name: "Anker PowerCore 26800",
    price: 8000,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=600&auto=format&fit=crop",
    category: "accessories",
    brand: "Anker",
    badge: "Best Value",
    inStock: true,
  },
  
  // Laptops
  {
    id: 13,
    name: "MacBook Pro M2",
    price: 250000,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop",
    category: "laptops",
    brand: "Apple",
    badge: "Premium",
    inStock: true,
  },
  {
    id: 14,
    name: "Dell XPS 15",
    price: 180000,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=600&auto=format&fit=crop",
    category: "laptops",
    brand: "Dell",
    badge: null,
    inStock: true,
  },
  {
    id: 15,
    name: "ASUS ROG Strix G15",
    price: 195000,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=600&auto=format&fit=crop",
    category: "laptops",
    brand: "ASUS",
    badge: "Gaming",
    inStock: true,
  },
  {
    id: 16,
    name: "Lenovo ThinkPad X1 Carbon",
    price: 170000,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop",
    category: "laptops",
    brand: "Lenovo",
    badge: "Business",
    inStock: true,
  },
];

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="product-card border border-border/30 hover:border-primary/60 h-full">
        <Link to={`/product/${product.id}`}>
          <div className="relative">
            <div className="h-60 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
            {product.badge && (
              <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 text-xs font-medium rounded">
                {product.badge}
              </div>
            )}
            {!product.inStock && (
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">
                Out of Stock
              </div>
            )}
          </div>
          
          <div className="p-4">
            <div className="text-xs text-muted-foreground mb-1">{product.brand}</div>
            <h3 className="font-medium text-base mb-1">{product.name}</h3>
            <p className="text-lg font-bold">
              NPR {product.price.toLocaleString()}
            </p>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

const FilterPanel = ({ 
  brands, 
  selectedBrands, 
  setSelectedBrands,
  priceRange,
  setPriceRange,
  showInStock,
  setShowInStock,
  className = ""
}: { 
  brands: string[];
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  showInStock: boolean;
  setShowInStock: (show: boolean) => void;
  className?: string;
}) => {
  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };
  
  const clearFilters = () => {
    setSelectedBrands([]);
    setPriceRange([0, 300000]);
    setShowInStock(false);
  };
  
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg">Filters</h3>
        {(selectedBrands.length > 0 || showInStock || priceRange[0] > 0 || priceRange[1] < 300000) && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8">
            <X className="h-4 w-4 mr-1" /> Clear
          </Button>
        )}
      </div>

      {/* Price Range */}
      <div>
        <div className="flex justify-between mb-2">
          <Label htmlFor="price-range">Price Range</Label>
          <span className="text-sm text-muted-foreground">
            NPR {priceRange[0].toLocaleString()} - NPR {priceRange[1].toLocaleString()}
          </span>
        </div>
        <Slider
          id="price-range"
          min={0}
          max={300000}
          step={5000}
          value={priceRange}
          onValueChange={setPriceRange}
          className="py-4"
        />
      </div>
      
      {/* Brands */}
      <div>
        <Label className="mb-3 inline-block">Brands</Label>
        <div className="space-y-2">
          {brands.map(brand => (
            <div key={brand} className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`justify-start px-2 w-full ${
                  selectedBrands.includes(brand) ? "bg-primary/10 text-primary" : ""
                }`}
                onClick={() => toggleBrand(brand)}
              >
                <div className={`w-4 h-4 border rounded-sm mr-2 flex items-center justify-center ${
                  selectedBrands.includes(brand) 
                    ? "bg-primary border-primary" 
                    : "border-gray-400"
                }`}>
                  {selectedBrands.includes(brand) && (
                    <Check className="h-3 w-3 text-white" />
                  )}
                </div>
                {brand}
              </Button>
            </div>
          ))}
        </div>
      </div>
      
      {/* In Stock Only */}
      <div>
        <Button
          variant="ghost"
          className={`justify-start px-2 w-full ${
            showInStock ? "bg-primary/10 text-primary" : ""
          }`}
          onClick={() => setShowInStock(!showInStock)}
        >
          <div className={`w-4 h-4 border rounded-sm mr-2 flex items-center justify-center ${
            showInStock 
              ? "bg-primary border-primary" 
              : "border-gray-400"
          }`}>
            {showInStock && (
              <Check className="h-3 w-3 text-white" />
            )}
          </div>
          In Stock Only
        </Button>
      </div>
    </div>
  );
};

const ProductCategoryList = () => {
  const { categoryId = "" } = useParams<{ categoryId: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 300000]);
  const [showInStock, setShowInStock] = useState(false);
  
  // Filter products by category
  const filteredProducts = mockProducts.filter(product => {
    // Filter by category
    if (categoryId && product.category !== categoryId) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by selected brands
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
    }
    
    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    // Filter by stock status
    if (showInStock && !product.inStock) {
      return false;
    }
    
    return true;
  });
  
  // Extract all unique brands from the filtered products
  const allBrands = Array.from(new Set(mockProducts
    .filter(product => categoryId ? product.category === categoryId : true)
    .map(product => product.brand)
  )).sort();
  
  // Get category info
  const category = categoryInfo[categoryId] || { title: "All Products", description: "Browse our entire collection of quality products." };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Category Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold mb-4">{category.title}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {category.description}
          </p>
        </motion.div>
        
        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search products..."
              className="pl-10 rounded-full h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Mobile Filter Button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <FilterPanel 
                  brands={allBrands}
                  selectedBrands={selectedBrands}
                  setSelectedBrands={setSelectedBrands}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  showInStock={showInStock}
                  setShowInStock={setShowInStock}
                  className="pt-8"
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Filter Panel */}
          <div className="hidden md:block w-64 shrink-0">
            <FilterPanel
              brands={allBrands}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              showInStock={showInStock}
              setShowInStock={setShowInStock}
            />
          </div>
          
          {/* Products Grid */}
          <div className="flex-grow">
            {filteredProducts.length > 0 ? (
              <>
                <div className="text-sm text-muted-foreground mb-4">
                  Showing {filteredProducts.length} products
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
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
              </>
            ) : (
              <div className="text-center py-16 bg-muted/20 rounded-lg">
                <Search className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="text-xl font-semibold mt-4 mb-2">No Products Found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <Button onClick={() => {
                  setSearchQuery("");
                  setSelectedBrands([]);
                  setPriceRange([0, 300000]);
                  setShowInStock(false);
                }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCategoryList;
