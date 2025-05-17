
import { useState } from "react";
import { Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const FloatingButtons = () => {
  const [isCallHovered, setIsCallHovered] = useState(false);
  const [isWhatsAppHovered, setIsWhatsAppHovered] = useState(false);

  const openWhatsApp = () => {
    const phone = "+9779828323425";
    const message = encodeURIComponent("Can I get more info.?");
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  const call = () => {
    window.location.href = "tel:+9779828323425";
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      {/* Call Button */}
      <div className="relative">
        <motion.button
          className="floating-btn bg-green-600 text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setIsCallHovered(true)}
          onHoverEnd={() => setIsCallHovered(false)}
          onClick={call}
        >
          <Phone className="h-6 w-6" />
        </motion.button>
        
        <AnimatePresence>
          {isCallHovered && (
            <motion.div
              className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 bg-black/80 text-white px-4 py-2 rounded-lg whitespace-nowrap"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              Call us now
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* WhatsApp Button */}
      <div className="relative">
        <motion.button
          className="floating-btn bg-[#25D366] text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setIsWhatsAppHovered(true)}
          onHoverEnd={() => setIsWhatsAppHovered(false)}
          onClick={openWhatsApp}
        >
          <MessageSquare className="h-6 w-6" />
        </motion.button>
        
        <AnimatePresence>
          {isWhatsAppHovered && (
            <motion.div
              className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 bg-black/80 text-white px-4 py-2 rounded-lg whitespace-nowrap"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              Chat on WhatsApp
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FloatingButtons;
