
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingBag, User, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Brand New", path: "/category/brand-new" },
    { name: "Used", path: "/category/used" },
    { name: "Accessories", path: "/category/accessories" },
    { name: "Laptops", path: "/category/laptops" },
    { name: "EMI Calculator", path: "/emi-calculator" },
  ];

  return (
    <header 
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md py-2" 
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-shop-primary to-shop-accent flex items-center justify-center text-white font-bold text-xl">
              K
            </div>
            <span className="text-2xl font-bold ml-2 gradient-text">KAR-Gadgets</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link 
                to={link.path}
                className="relative text-foreground/80 hover:text-foreground font-medium transition-colors duration-200 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-shop-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button size="icon" variant="ghost" className="rounded-full">
            <Search className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="ghost" className="rounded-full" asChild>
            <Link to="/cart">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
          <Button size="icon" variant="ghost" className="rounded-full" asChild>
            <Link to="/profile">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Link>
          </Button>
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg md:hidden overflow-hidden"
            >
              <div className="flex flex-col p-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className="block py-3 px-4 hover:bg-muted/50 rounded-md transition-colors duration-200"
                      onClick={toggleMenu}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <div className="flex justify-between mt-4 pt-4 border-t">
                  <Button asChild variant="outline" className="flex-1 mr-2">
                    <Link to="/login" onClick={toggleMenu}>Login</Link>
                  </Button>
                  <Button asChild className="flex-1 ml-2">
                    <Link to="/register" onClick={toggleMenu}>Register</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
