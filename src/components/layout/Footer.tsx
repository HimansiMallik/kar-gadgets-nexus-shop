
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Return Policy", path: "/return-policy" },
        { name: "Terms & Conditions", path: "/terms" },
        { name: "EMI Calculator", path: "/emi-calculator" },
        { name: "Contact", path: "/contact" },
      ],
    },
    {
      title: "Categories",
      links: [
        { name: "Brand New Phones", path: "/category/brand-new" },
        { name: "Used Phones", path: "/category/used" },
        { name: "Accessories", path: "/category/accessories" },
        { name: "Laptops", path: "/category/laptops" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { name: "Help Center", path: "/help" },
        { name: "Payment Options", path: "/payment" },
      ],
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#ad4328] to-[#b65741] flex items-center justify-center text-white font-bold text-xl">
                K
              </div>
              <span className="text-2xl font-bold">KAR-Gadgets</span>
            </div>
            <p className="text-gray-300 max-w-xs">
              Your premier destination for quality phones, laptops, and accessories in Nepal.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#b65741]" />
                <a href="tel:+9779828323425" className="text-gray-300 hover:text-white transition-colors">
                  +977 9828323425
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#b65741]" />
                <a href="mailto:mallikkrish73@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                  mallikkrish73@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[#b65741]" />
                <span className="text-gray-300">Kathmandu, Nepal</span>
              </div>
            </div>
          </motion.div>

          {/* Footer Sections */}
          {footerSections.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold relative after:content-[''] after:absolute after:w-12 after:h-1 after:bg-[#b65741] after:bottom-0 after:left-0 after:rounded-full pb-2">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-4 mb-4 md:mb-0">
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#ad4328] transition-colors duration-300 flex items-center justify-center">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#ad4328] transition-colors duration-300 flex items-center justify-center">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#ad4328] transition-colors duration-300 flex items-center justify-center">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} KAR-Gadgets. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
