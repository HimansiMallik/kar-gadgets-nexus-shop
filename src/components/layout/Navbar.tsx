
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { 
  User, 
  ShoppingCart,
  ChevronDown,
  Menu,
  X,
  Smartphone,
  RefreshCw,
  Headphones,
  Laptop
} from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";

// Import dropdown component
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categories = [
  {
    id: "brand-new",
    name: "Brand New Phones",
    icon: Smartphone,
  },
  {
    id: "used",
    name: "Used Phones",
    icon: RefreshCw,
  },
  {
    id: "accessories",
    name: "Accessories",
    icon: Headphones,
  },
  {
    id: "laptops",
    name: "Laptops",
    icon: Laptop,
  }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`
              }
            >
              Home
            </NavLink>

            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="flex items-center px-3 py-2 text-sm font-medium"
                >
                  Categories
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {categories.map((category) => (
                  <DropdownMenuItem key={category.id} asChild>
                    <Link 
                      to={`/category/${category.id}`}
                      className="flex items-center gap-2"
                    >
                      <category.icon className="h-4 w-4" />
                      <span>{category.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <NavLink
              to="/emi-calculator"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`
              }
            >
              EMI Calculator
            </NavLink>
            
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`
              }
            >
              About
            </NavLink>
            
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`
              }
            >
              Contact
            </NavLink>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {!isMobile && (
              <>
                {/* Shopping Cart */}
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/cart">
                    <ShoppingCart className="h-5 w-5" />
                  </Link>
                </Button>
                
                {/* User Profile / Login */}
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/login">
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
              </>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-background border-t dark:border-gray-800"
          >
            <div className="container mx-auto px-4 py-3 space-y-2">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted"
                onClick={toggleMenu}
              >
                Home
              </Link>
              
              {/* Categories in mobile menu */}
              <div className="space-y-1 pl-3">
                <div className="px-3 py-2 text-sm font-semibold text-muted-foreground">
                  Categories
                </div>
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.id}`}
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-muted"
                    onClick={toggleMenu}
                  >
                    <category.icon className="h-4 w-4 mr-2" />
                    <span>{category.name}</span>
                  </Link>
                ))}
              </div>
              
              <Link
                to="/emi-calculator"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted"
                onClick={toggleMenu}
              >
                EMI Calculator
              </Link>
              
              <Link
                to="/about"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted"
                onClick={toggleMenu}
              >
                About
              </Link>
              
              <Link
                to="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              
              <div className="flex items-center space-x-2 px-3 py-2">
                <Link 
                  to="/cart" 
                  className="flex items-center"
                  onClick={toggleMenu}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Cart
                </Link>
                
                <span className="text-muted-foreground">|</span>
                
                <Link 
                  to="/login" 
                  className="flex items-center"
                  onClick={toggleMenu}
                >
                  <User className="h-5 w-5 mr-2" />
                  Login
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
