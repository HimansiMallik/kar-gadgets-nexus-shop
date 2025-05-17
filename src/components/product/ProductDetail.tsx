
import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Heart, Share2, Shield, Calendar, Truck, RefreshCw, MessageSquare, Check } from "lucide-react";
import EMIOptions from "./EMIOptions";
import ProductNotFound from "./ProductNotFound";

// Mock product data (this would come from an API in a real app)
const productData = {
  "1": {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 175000,
    originalPrice: 190000,
    discount: 8,
    category: "brand-new",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484429be?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1678911820864-e5f2c588851f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1697279965874-32db429642a6?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["Natural Titanium", "Blue Titanium", "Black Titanium"],
    storage: ["128GB", "256GB", "512GB", "1TB"],
    availability: true,
    rating: 4.8,
    reviewCount: 124,
    description: "Experience the iPhone 15 Pro Max with its powerful A17 Pro chip, a stunning display, and exceptional camera system. This premium device offers our most advanced features in a sleek, durable design.",
    highlights: [
      "A17 Pro chip for extraordinary performance",
      "48MP main camera with 5x optical zoom",
      "6.7-inch Super Retina XDR display",
      "Titanium design, tougher and lighter than ever",
      "All-day battery life with up to 29 hours video playback",
      "iOS 17 with new customization options"
    ],
    specifications: {
      display: "6.7-inch Super Retina XDR display with ProMotion",
      processor: "A17 Pro chip with 6-core CPU and 5-core GPU",
      camera: "48MP main, 12MP ultra wide, 12MP telephoto with 5x optical zoom",
      battery: "Up to 29 hours video playback",
      storage: "Available in 128GB, 256GB, 512GB, and 1TB",
      connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3, NFC",
      dimensions: "159.9 x 76.7 x 8.25 mm, 221g",
      os: "iOS 17"
    }
  },
  "13": {
    id: 13,
    name: "MacBook Pro M2",
    price: 250000,
    originalPrice: 265000,
    discount: 5,
    category: "laptops",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588702547919-26089e690ecc?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["Space Gray", "Silver"],
    storage: ["256GB", "512GB", "1TB", "2TB"],
    availability: true,
    rating: 4.9,
    reviewCount: 87,
    description: "The MacBook Pro with M2 chip delivers extraordinary performance and battery life in a portable design. Featuring a stunning Retina display, magic keyboard, and powerful processors, it's designed for professionals who demand the best.",
    highlights: [
      "Apple M2 chip for breakthrough performance",
      "Up to 20 hours of battery life",
      "Stunning 13-inch Retina display with True Tone",
      "Backlit Magic Keyboard and Touch ID",
      "Studio-quality three-microphone array",
      "Thunderbolt ports for high-speed connectivity"
    ],
    specifications: {
      display: "13.3-inch Retina display with True Tone",
      processor: "8-core CPU, 10-core GPU Apple M2 chip",
      memory: "Up to 24GB unified memory",
      storage: "Up to 2TB SSD storage",
      battery: "Up to 20 hours of battery life",
      connectivity: "Thunderbolt/USB 4 ports, Wi-Fi 6, Bluetooth 5.0",
      dimensions: "30.41 x 21.24 x 1.56 cm, 1.4 kg",
      os: "macOS Ventura"
    }
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  
  // In a real app, you would fetch the product data based on the ID
  // For this example, we'll check if the ID exists in our mockup data
  const product = id && productData[id as keyof typeof productData];
  
  if (!product) {
    return <ProductNotFound />;
  }
  
  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };
  
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };
  
  // Image zoom functionality
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  };
  
  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div 
              className={`relative overflow-hidden rounded-xl aspect-square border border-border/50 ${
                isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
              }`}
              onClick={handleZoomToggle}
              onMouseMove={handleMouseMove}
            >
              {isZoomed ? (
                <div 
                  className="absolute inset-0 bg-cover bg-no-repeat"
                  style={{
                    backgroundImage: `url(${product.images[selectedImage]})`,
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    transform: "scale(1.5)"
                  }}
                />
              ) : (
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name} 
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex justify-center gap-3 mt-4">
              {product.images.map((image, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleImageClick(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === idx 
                      ? "border-primary shadow-md" 
                      : "border-border/50"
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - View ${idx + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>

            <div className="flex justify-center gap-3 mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-sm"
                onClick={toggleFavorite}
              >
                <Heart 
                  className={`h-4 w-4 mr-2 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} 
                />
                {isFavorited ? "Favorited" : "Add to Favorites"}
              </Button>
              <Button variant="outline" size="sm" className="text-sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </motion.div>

          {/* Product Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Basic Info */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="rounded-full bg-green-50 text-green-600 border-green-200 dark:bg-green-950 dark:border-green-800 dark:text-green-400">
                  {product.category === "brand-new" ? "Brand New" : product.category}
                </Badge>
                <Badge variant="outline" className="rounded-full bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-400">
                  In Stock
                </Badge>
              </div>
              
              <h1 className="text-3xl font-bold">{product.name}</h1>
              
              <div className="flex items-center gap-2 mt-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">
                  NPR {product.price.toLocaleString()}
                </span>
                {product.discount > 0 && (
                  <>
                    <s className="text-muted-foreground">
                      NPR {product.originalPrice.toLocaleString()}
                    </s>
                    <Badge className="bg-red-500">
                      {product.discount}% OFF
                    </Badge>
                  </>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Price inclusive of all taxes
              </p>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium mb-2">Color</h3>
              <div className="flex gap-3">
                {product.colors.map((color, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className={`relative px-5 border-2 ${
                      selectedColor === idx 
                        ? "border-primary" 
                        : "border-border/50"
                    }`}
                    onClick={() => setSelectedColor(idx)}
                  >
                    {color}
                    {selectedColor === idx && (
                      <motion.div
                        layoutId="selectedColor"
                        className="absolute inset-0 border-2 border-primary rounded-md"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Storage Selection */}
            <div>
              <h3 className="text-sm font-medium mb-2">Storage</h3>
              <div className="flex flex-wrap gap-3">
                {product.storage.map((size, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className={`relative px-5 border-2 ${
                      selectedStorage === idx 
                        ? "border-primary" 
                        : "border-border/50"
                    }`}
                    onClick={() => setSelectedStorage(idx)}
                  >
                    {size}
                    {selectedStorage === idx && (
                      <motion.div
                        layoutId="selectedStorage"
                        className="absolute inset-0 border-2 border-primary rounded-md"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 pt-4">
              <Button className="flex-1 py-6 text-lg">Add to Cart</Button>
              <Button variant="secondary" className="flex-1 py-6 text-lg">Buy Now</Button>
            </div>

            {/* EMI Options */}
            <EMIOptions price={product.price} />

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="text-sm">1 Year Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                <span className="text-sm">7 Days Replacement</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-orange-500" />
                <span className="text-sm">Free Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-purple-500" />
                <span className="text-sm">Genuine Product</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start mb-6 bg-transparent border-b">
              <TabsTrigger value="description" className="text-lg">Description</TabsTrigger>
              <TabsTrigger value="specifications" className="text-lg">Specifications</TabsTrigger>
              <TabsTrigger value="reviews" className="text-lg">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="pt-4">
              <div className="space-y-6">
                <p className="text-lg">{product.description}</p>
                
                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Key Highlights</h3>
                  <ul className="space-y-2">
                    {product.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="pt-4">
              <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="border-b pb-3">
                      <h4 className="text-muted-foreground capitalize">{key}</h4>
                      <p className="font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="pt-4">
              <div className="text-center py-10">
                <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <h3 className="text-2xl font-semibold mb-2">Customer Reviews</h3>
                <p className="text-muted-foreground mb-6">
                  Reviews are available for logged in customers only.
                </p>
                <Button>Login to View Reviews</Button>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductDetail;
