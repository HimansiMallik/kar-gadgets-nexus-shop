
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const ProductNotFound = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <div className="mb-6 p-6 bg-muted/30 rounded-full inline-block">
            <Search className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The product you are looking for might have been removed or is temporarily unavailable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/products">Browse All Products</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductNotFound;
