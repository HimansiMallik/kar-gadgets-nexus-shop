
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Smartphone, RefreshCw, Headphones, Laptop } from "lucide-react";

const categories = [
  {
    id: "brand-new",
    title: "Brand New Phones",
    description: "Latest models with full warranty",
    icon: Smartphone,
    color: "from-teal-500 to-emerald-600",
    link: "/category/brand-new"
  },
  {
    id: "used",
    title: "Used Phones",
    description: "Quality certified pre-owned devices",
    icon: RefreshCw,
    color: "from-emerald-500 to-green-600",
    link: "/category/used"
  },
  {
    id: "accessories",
    title: "Accessories",
    description: "Enhance your device experience",
    icon: Headphones,
    color: "from-cyan-500 to-teal-600",
    link: "/category/accessories"
  },
  {
    id: "laptops",
    title: "Laptops",
    description: "For work, gaming and creativity",
    icon: Laptop,
    color: "from-green-500 to-emerald-600",
    link: "/category/laptops"
  }
];

const CategoryGrid = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of products across various categories to find the perfect device for your needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Link 
                to={category.link}
                className="block h-full group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden h-full shadow-sm border border-gray-100 dark:border-gray-800 transition-all duration-300 group-hover:shadow-xl group-hover:border-teal-500/50">
                  <div className={`bg-gradient-to-r ${category.color} p-8 flex justify-center`}>
                    <category.icon className="h-12 w-12 text-white" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
