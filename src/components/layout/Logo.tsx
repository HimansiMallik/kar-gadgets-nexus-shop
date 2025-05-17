
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <motion.div
        initial={{ rotate: -10 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-8 h-8"
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{ y: [0, -2, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-xl font-bold text-white">K</span>
        </motion.div>
      </motion.div>
      <div>
        <span className="text-xl font-bold">KAR-Gadgets</span>
      </div>
    </Link>
  );
};

export default Logo;
