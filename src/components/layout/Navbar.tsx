
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingBag, User, Search, Smartphone, Laptop, Grid } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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

  const categories = [
    { name: "Brand New", path: "/category/brand-new", icon: <Smartphone className="h-5 w-5 mr-2" /> },
    { name: "Used", path: "/category/used", icon: <Smartphone className="h-5 w-5 mr-2" /> },
    { name: "Accessories", path: "/category/accessories", icon: <Grid className="h-5 w-5 mr-2" /> },
    { name: "Laptops", path: "/category/laptops", icon: <Laptop className="h-5 w-5 mr-2" /> },
  ];

  return (
    <header 
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled 
          ? "bg-teal-900/90 dark:bg-teal-950/90 backdrop-blur-md shadow-md py-2" 
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
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center text-white font-bold text-xl">
              K
            </div>
            <span className="text-2xl font-bold ml-2 text-white">KAR-Gadgets</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link 
              to="/"
              className="relative text-white/80 hover:text-white font-medium transition-colors duration-200 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-emerald-400 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
            >
              Home
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="z-50"
          >
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white/80 hover:text-white font-medium bg-transparent hover:bg-teal-800/50">Categories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      {categories.map((category) => (
                        <li key={category.path}>
                          <Link
                            to={category.path}
                            className="flex items-center rounded-md p-3 hover:bg-teal-100 dark:hover:bg-teal-800 transition-colors"
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-teal-100 dark:bg-teal-900">
                              {category.icon}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium">{category.name}</p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Link 
              to="/emi-calculator"
              className="relative text-white/80 hover:text-white font-medium transition-colors duration-200 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-emerald-400 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
            >
              EMI Calculator
            </Link>
          </motion.div>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button size="icon" variant="ghost" className="rounded-full text-white">
            <Search className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="ghost" className="rounded-full text-white" asChild>
            <Link to="/cart">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
          <Button size="icon" variant="ghost" className="rounded-full text-white" asChild>
            <Link to="/profile">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Link>
          </Button>
          <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-white">
            <Link to="/login">Login</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={toggleMenu}>
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
              className="absolute top-full left-0 w-full bg-teal-900 dark:bg-teal-950 shadow-lg md:hidden overflow-hidden"
            >
              <div className="flex flex-col p-4">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to="/"
                    className="block py-3 px-4 hover:bg-teal-800/50 rounded-md transition-colors duration-200 text-white"
                    onClick={toggleMenu}
                  >
                    Home
                  </Link>
                </motion.div>
                
                <div className="py-2 px-4 text-white font-medium">Categories</div>
                
                {categories.map((category, index) => (
                  <motion.div
                    key={category.path}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      to={category.path}
                      className="block py-3 px-4 hover:bg-teal-800/50 rounded-md transition-colors duration-200 pl-8 text-white/80"
                      onClick={toggleMenu}
                    >
                      <div className="flex items-center">
                        {category.icon}
                        {category.name}
                      </div>
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <Link
                    to="/emi-calculator"
                    className="block py-3 px-4 hover:bg-teal-800/50 rounded-md transition-colors duration-200 text-white"
                    onClick={toggleMenu}
                  >
                    EMI Calculator
                  </Link>
                </motion.div>
                
                <div className="flex justify-between mt-4 pt-4 border-t border-teal-700">
                  <Button asChild variant="outline" className="flex-1 mr-2 bg-transparent border-white text-white hover:bg-teal-800">
                    <Link to="/login" onClick={toggleMenu}>Login</Link>
                  </Button>
                  <Button asChild className="flex-1 ml-2 bg-emerald-500 hover:bg-emerald-600 text-white">
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
