import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const heroSlides = [
  {
    title: "Latest Smartphones",
    description: "Discover cutting-edge technology with our newest collection of smartphones.",
    image: "https://www.gadgetsinnepal.com.np/wp-content/uploads/2024/05/Samsung-Galaxy-S25-Ultra-Price-in-Nepal.webp",
    backgroundPosition: "center",
    link: "/category/brand-new",
  },
  {
    title: "Quality Used Phones",
    description: "Premium pre-owned devices, thoroughly tested and guaranteed to work like new.",
    image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?q=80&w=1200&auto=format&fit=crop",
    backgroundPosition: "center",
    link: "/category/used",
  },
  {
    title: "Powerful Laptops",
    description: "Experience unmatched performance with our selection of premium laptops.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1200&auto=format&fit=crop",
    backgroundPosition: "center",
    link: "/category/laptops",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[90vh] overflow-hidden">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroSlides[current].image})`,
              backgroundPosition: heroSlides[current].backgroundPosition,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full container mx-auto px-4 flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg text-white"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="text-5xl font-bold mb-4">
                {heroSlides[current].title}
              </h1>
              <p className="text-xl mb-8 text-gray-200">
                {heroSlides[current].description}
              </p>
              <Button asChild size="lg" className="group bg-primary hover:bg-primary/90">
                <Link to={heroSlides[current].link}>
                  Explore Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === current ? "bg-primary w-10" : "bg-white/50"
              }`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
