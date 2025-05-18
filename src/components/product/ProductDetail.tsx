
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Heart, Share2, Shield, Calendar, Truck, RefreshCw, MessageSquare, Check } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
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
  "2": {
    id: 2,
    name: "Samsung Galaxy S23 Ultra",
    price: 165000,
    originalPrice: 175000,
    discount: 6,
    category: "brand-new",
    images: [
      "https://images.unsplash.com/photo-1678911820864-e5f2c588851f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1697279965874-32db429642a6?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1695048133142-1a20484429be?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["Phantom Black", "Cream", "Green", "Lavender"],
    storage: ["128GB", "256GB", "512GB", "1TB"],
    availability: true,
    rating: 4.7,
    reviewCount: 98,
    description: "The Samsung Galaxy S23 Ultra sets a new standard with its 200MP camera, embedded S Pen, and powerful Snapdragon 8 Gen 2 processor, all packaged in a sleek design with a stunning Dynamic AMOLED 2X display.",
    highlights: [
      "200MP wide camera for incredible detail",
      "S Pen functionality built-in",
      "Snapdragon 8 Gen 2 for lightning-fast performance",
      "6.8-inch QHD+ Dynamic AMOLED 2X display",
      "5000mAh battery with fast charging",
      "Enhanced nightography features"
    ],
    specifications: {
      display: "6.8-inch QHD+ Dynamic AMOLED 2X, 120Hz",
      processor: "Snapdragon 8 Gen 2 for Galaxy",
      camera: "200MP wide, 12MP ultrawide, 10MP 3x telephoto, 10MP 10x telephoto",
      battery: "5000mAh with 45W fast charging",
      storage: "128GB/256GB/512GB/1TB options",
      connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3, NFC",
      dimensions: "163.4 x 78.1 x 8.9mm, 234g",
      os: "Android 13 with One UI 5.1"
    }
  },
  "3": {
    id: 3,
    name: "Google Pixel 8 Pro",
    price: 120000,
    originalPrice: 130000,
    discount: 8,
    category: "brand-new",
    images: [
      "https://images.unsplash.com/photo-1696348045798-288db4d4bd18?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1678911820864-e5f2c588851f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1697279965874-32db429642a6?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["Obsidian", "Porcelain", "Bay"],
    storage: ["128GB", "256GB", "512GB"],
    availability: true,
    rating: 4.7,
    reviewCount: 82,
    description: "Meet Google Pixel 8 Pro, the best photo-taking Pixel phone yet. Powered by Google's newest chip, Google Tensor G3, it brings you better performance and improved battery life in a sleek design with a polished aluminum frame.",
    highlights: [
      "7.2-inch Super Actua display, Google's brightest display ever",
      "Advanced camera system with Super Res Zoom",
      "Google Tensor G3 for advanced AI features",
      "Live Translate for conversations, chats, and captions",
      "Best in photo and video editing with Magic Editor",
      "Up to 72-hour battery life with Extreme Battery Saver"
    ],
    specifications: {
      display: "7.2-inch LTPO OLED display with 120Hz refresh rate",
      processor: "Google Tensor G3 with Titan M2 security",
      camera: "50MP wide, 48MP ultrawide, 48MP telephoto with Super Res Zoom",
      battery: "Up to 24 hours (or 72 with Extreme Battery Saver)",
      storage: "128GB, 256GB, or 512GB",
      connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3, NFC",
      dimensions: "162.6 x 76.5 x 8.8mm, 213g",
      os: "Android 14"
    }
  },
  "4": {
    id: 4,
    name: "OnePlus 12",
    price: 100000,
    originalPrice: 110000,
    discount: 9,
    category: "brand-new",
    images: [
      "https://images.unsplash.com/photo-1676455981746-2146e00edf99?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1678911820864-e5f2c588851f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1696348045798-288db4d4bd18?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["Flowy Emerald", "Silky Black"],
    storage: ["128GB", "256GB", "512GB"],
    availability: false,
    rating: 4.6,
    reviewCount: 64,
    description: "The OnePlus 12 sets a new standard with the Snapdragon 8 Gen 3 processor, Hasselblad camera system, and industry-leading 100W SUPERVOOC charging. Experience premium performance and cutting-edge technology in one sleek device.",
    highlights: [
      "Snapdragon 8 Gen 3 for ultimate performance",
      "Hasselblad camera system with 50MP main sensor",
      "6.82-inch 2K 120Hz ProXDR display",
      "100W SUPERVOOC fast charging",
      "5400 mAh dual-cell battery",
      "OxygenOS based on Android 14"
    ],
    specifications: {
      display: "6.82-inch 2K 120Hz ProXDR display",
      processor: "Snapdragon 8 Gen 3",
      camera: "50MP main, 48MP ultrawide, 64MP telephoto with 3x optical zoom",
      battery: "5400 mAh with 100W SUPERVOOC charging",
      storage: "128GB/256GB/512GB UFS 4.0",
      connectivity: "5G, Wi-Fi 7, Bluetooth 5.4, NFC",
      dimensions: "164.3 x 75.8 x 9.15 mm, 220g",
      os: "OxygenOS based on Android 14"
    }
  },
  "5": {
    id: 5,
    name: "iPhone 13 (Used)",
    price: 80000,
    originalPrice: 90000,
    discount: 11,
    category: "used",
    images: [
      "https://images.unsplash.com/photo-1632633173522-47456de71b76?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1678911820864-e5f2c588851f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1695048133142-1a20484429be?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["Midnight", "Blue", "Pink", "Starlight"],
    storage: ["128GB", "256GB", "512GB"],
    availability: true,
    rating: 4.5,
    reviewCount: 128,
    description: "This certified pre-owned iPhone 13 offers exceptional value with its A15 Bionic chip, amazing camera system, and Super Retina XDR display. Each device has been thoroughly inspected and certified to meet our quality standards.",
    highlights: [
      "A15 Bionic chip for smooth performance",
      "Advanced dual-camera system",
      "6.1-inch Super Retina XDR display",
      "Certified pre-owned with 6-month warranty",
      "Face ID for secure authentication",
      "Compatible with iOS 17"
    ],
    specifications: {
      display: "6.1-inch Super Retina XDR display",
      processor: "A15 Bionic chip",
      camera: "12MP dual camera system with Night mode",
      battery: "Up to 19 hours video playback",
      storage: "128GB, 256GB, or 512GB",
      connectivity: "5G, Wi-Fi 6, Bluetooth 5.0, NFC",
      dimensions: "146.7 x 71.5 x 7.65 mm, 174g",
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
  },
  "14": {
    id: 14,
    name: "Dell XPS 15",
    price: 180000,
    originalPrice: 195000,
    discount: 8,
    category: "laptops",
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588702547919-26089e690ecc?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["Platinum Silver", "Frost White"],
    storage: ["512GB", "1TB", "2TB"],
    availability: true,
    rating: 4.7,
    reviewCount: 92,
    description: "Experience premium craftsmanship and performance with the Dell XPS 15. Featuring a stunning edge-to-edge display, powerful Intel processors, and dedicated NVIDIA graphics, this laptop delivers exceptional performance for creative professionals and demanding users.",
    highlights: [
      "11th Gen Intel Core i7/i9 processors",
      "NVIDIA GeForce RTX 3050/3050 Ti graphics",
      "15.6-inch InfinityEdge display with up to 4K+ resolution",
      "Premium CNC aluminum and carbon fiber construction",
      "Up to 12 hours of battery life",
      "Immersive Waves MaxxAudio Pro audio"
    ],
    specifications: {
      display: "15.6-inch FHD+/4K+ InfinityEdge display",
      processor: "11th Gen Intel Core i7/i9",
      memory: "16GB to 64GB DDR4 RAM",
      storage: "512GB to 2TB PCIe SSD",
      battery: "Up to 12 hours",
      connectivity: "Thunderbolt 4, USB-C, WiFi 6, Bluetooth 5.1",
      dimensions: "344.72 x 230.14 x 18 mm, 1.8 kg",
      os: "Windows 11 Pro"
    }
  },
  "15": {
    id: 15,
    name: "ASUS ROG Strix G15",
    price: 195000,
    originalPrice: 210000,
    discount: 7,
    category: "laptops",
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588702547919-26089e690ecc?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["Eclipse Gray", "Electro Punk"],
    storage: ["512GB", "1TB"],
    availability: true,
    rating: 4.6,
    reviewCount: 78,
    description: "Dominate the gaming arena with the ASUS ROG Strix G15. Featuring cutting-edge AMD Ryzen processors, powerful NVIDIA graphics, and a high-refresh-rate display, this gaming laptop delivers exceptional performance for the most demanding games and applications.",
    highlights: [
      "AMD Ryzen 9 processors for exceptional gaming performance",
      "NVIDIA GeForce RTX 3060/3070 graphics",
      "15.6-inch FHD display with 300Hz refresh rate",
      "RGB keyboard with per-key lighting",
      "Advanced cooling system with liquid metal compound",
      "Immersive DTS:X Ultra audio"
    ],
    specifications: {
      display: "15.6-inch FHD IPS display, 300Hz refresh rate",
      processor: "AMD Ryzen 9 5900HX",
      memory: "16GB to 32GB DDR4 RAM",
      storage: "512GB or 1TB PCIe SSD",
      battery: "Up to 8 hours",
      connectivity: "USB 3.2 Type-C, USB 3.2 Type-A, HDMI 2.0b, WiFi 6, Bluetooth 5.1",
      dimensions: "354.9 x 259.9 x 27.2 mm, 2.3 kg",
      os: "Windows 10 Home"
    }
  },
  "16": {
    id: 16,
    name: "Lenovo ThinkPad X1 Carbon",
    price: 170000,
    originalPrice: 185000,
    discount: 8,
    category: "laptops",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["Black"],
    storage: ["256GB", "512GB", "1TB"],
    availability: true,
    rating: 4.8,
    reviewCount: 112,
    description: "Experience premium business performance with the Lenovo ThinkPad X1 Carbon. Engineered for professionals, this ultralight laptop combines military-grade durability with enterprise-class security and productivity features in a sleek, portable design.",
    highlights: [
      "11th Gen Intel Core processors for exceptional business performance",
      "Ultralight carbon-fiber chassis at just 1.13 kg",
      "14-inch UHD display with Dolby Vision HDR",
      "Military-grade durability (MIL-STD-810H certified)",
      "Up to 19.5 hours of battery life",
      "Advanced security features including ThinkShield"
    ],
    specifications: {
      display: "14-inch FHD+ or UHD display with Dolby Vision",
      processor: "11th Gen Intel Core i5/i7 vPro",
      memory: "8GB to 32GB LPDDR4x RAM",
      storage: "256GB to 1TB PCIe SSD",
      battery: "Up to 19.5 hours",
      connectivity: "Thunderbolt 4, USB-A, HDMI 2.0, WiFi 6, Bluetooth 5.2",
      dimensions: "314.5 x 221.6 x 14.9 mm, 1.13 kg",
      os: "Windows 10 Pro"
    }
  },
  "9": {
    id: 9,
    name: "Sony WH-1000XM4",
    price: 45000,
    originalPrice: 48000,
    discount: 6,
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["Black", "Silver", "Blue"],
    storage: ["N/A"],
    availability: true,
    rating: 4.8,
    reviewCount: 156,
    description: "Experience industry-leading noise cancellation with the Sony WH-1000XM4 wireless headphones. With exceptional sound quality, smart features, and long battery life, these premium headphones are perfect for music lovers and frequent travelers.",
    highlights: [
      "Industry-leading noise cancellation",
      "Up to 30 hours of battery life",
      "DSEE Extreme upscaling for compressed audio",
      "Multipoint connection for simultaneous pairing",
      "Speak-to-chat technology automatically pauses playback",
      "Wearing detection for smart playback"
    ],
    specifications: {
      driver: "40mm, dome type (CCAW Voice coil)",
      frequency: "4Hz-40,000Hz",
      battery: "Up to 30 hours with NC on",
      charging: "USB-C, 5 hours playback with 10 min quick charge",
      features: "Active Noise Cancellation, Touch Sensor, 360 Reality Audio",
      connectivity: "Bluetooth 5.0, NFC, 3.5mm audio cable",
      weight: "254g",
      included: "Carrying case, charging cable, audio cable"
    }
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch product data based on ID
  useEffect(() => {
    // Simulate API fetch with timeout
    setLoading(true);
    const timer = setTimeout(() => {
      if (id && productData[id as keyof typeof productData]) {
        setProduct(productData[id as keyof typeof productData]);
      }
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  if (loading) {
    return (
      <div className="py-16 container mx-auto flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b65741]"></div>
      </div>
    );
  }
  
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

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[selectedImage],
      },
      quantity,
      product.colors[selectedColor],
      product.storage[selectedStorage]
    );
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
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
              {product.images.map((image: string, idx: number) => (
                <motion.button
                  key={idx}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleImageClick(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === idx 
                      ? "border-[#ad4328] shadow-md" 
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
                  className={`h-4 w-4 mr-2 ${isFavorited ? "fill-[#ad4328] text-[#ad4328]" : ""}`} 
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
                  {product.availability ? "In Stock" : "Out of Stock"}
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
                    <Badge className="bg-[#ad4328]">
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
                {product.colors.map((color: string, idx: number) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className={`relative px-5 border-2 ${
                      selectedColor === idx 
                        ? "border-[#ad4328]" 
                        : "border-border/50"
                    }`}
                    onClick={() => setSelectedColor(idx)}
                  >
                    {color}
                    {selectedColor === idx && (
                      <motion.div
                        layoutId="selectedColor"
                        className="absolute inset-0 border-2 border-[#ad4328] rounded-md"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Storage Selection */}
            {product.storage[0] !== "N/A" && (
              <div>
                <h3 className="text-sm font-medium mb-2">Storage</h3>
                <div className="flex flex-wrap gap-3">
                  {product.storage.map((size: string, idx: number) => (
                    <Button
                      key={idx}
                      variant="outline"
                      className={`relative px-5 border-2 ${
                        selectedStorage === idx 
                          ? "border-[#ad4328]" 
                          : "border-border/50"
                      }`}
                      onClick={() => setSelectedStorage(idx)}
                    >
                      {size}
                      {selectedStorage === idx && (
                        <motion.div
                          layoutId="selectedStorage"
                          className="absolute inset-0 border-2 border-[#ad4328] rounded-md"
                          initial={false}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selection */}
            <div>
              <h3 className="text-sm font-medium mb-2">Quantity</h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 pt-4">
              <Button 
                className="flex-1 py-6 text-lg bg-gradient-to-r from-[#ad4328] to-[#b65741] hover:from-[#ad4328]/90 hover:to-[#b65741]/90"
                onClick={handleAddToCart}
                disabled={!product.availability}
              >
                Add to Cart
              </Button>
              
              <Button 
                variant="secondary" 
                className="flex-1 py-6 text-lg bg-gradient-to-r from-[#ad4328] to-[#b65741] text-white hover:from-[#ad4328]/90 hover:to-[#b65741]/90"
                onClick={handleBuyNow}
                disabled={!product.availability}
              >
                Buy Now
              </Button>
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
                    {product.highlights.map((highlight: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#ad4328] mt-0.5 shrink-0" />
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
                <Button className="bg-gradient-to-r from-[#ad4328] to-[#b65741] hover:from-[#ad4328]/90 hover:to-[#b65741]/90">Login to View Reviews</Button>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductDetail;
