
import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { 
  User, 
  ChevronDown,
  Menu,
  X,
  Smartphone,
  RefreshCw,
  Headphones,
  Laptop,
  LogOut,
  UserRound,
  Settings,
  Heart
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import CartButton from "@/components/cart/CartButton";
import { useAuth } from "@/contexts/AuthContext";

// Import dropdown component
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const isMobile = useIsMobile();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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

  const toggleCategories = () => {
    setCategoriesOpen(!categoriesOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
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

            {/* Categories Navigation Menu */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      {categories.map((category) => (
                        <li key={category.id}>
                          <NavigationMenuLink asChild>
                            <Link
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              to={`/category/${category.id}`}
                            >
                              <category.icon className="h-6 w-6 mb-2" />
                              <div className="mb-2 mt-2 text-lg font-medium">
                                {category.name}
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

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
                <CartButton />
                
                {/* User Profile / Login */}
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative">
                        <UserRound className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="flex items-center justify-start gap-2 p-2">
                        <div className="rounded-full bg-primary/10 p-1">
                          <UserRound className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex flex-col space-y-0.5">
                          <span className="text-sm font-medium">{user.name}</span>
                          <span className="text-xs text-muted-foreground">{user.email}</span>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="cursor-pointer">
                          <Heart className="mr-2 h-4 w-4" />
                          <span>Favorites</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="cursor-pointer">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button variant="ghost" size="icon" asChild>
                    <Link to="/login">
                      <User className="h-5 w-5" />
                    </Link>
                  </Button>
                )}
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
                  <CartButton showLabel={true} />
                </Link>
                
                <span className="text-muted-foreground">|</span>
                
                {user ? (
                  <Link 
                    to="/profile" 
                    className="flex items-center"
                    onClick={toggleMenu}
                  >
                    <User className="h-5 w-5 mr-2" />
                    My Profile
                  </Link>
                ) : (
                  <Link 
                    to="/login" 
                    className="flex items-center"
                    onClick={toggleMenu}
                  >
                    <User className="h-5 w-5 mr-2" />
                    Login
                  </Link>
                )}
              </div>
              
              {user && (
                <Button 
                  variant="ghost" 
                  className="w-full flex justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
