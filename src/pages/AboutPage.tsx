
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, Clock, MapPin, ShieldCheck, Package, TrendingUp } from "lucide-react";

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Krishna Mallick",
      role: "Founder & CEO",
      image: "https://i.pravatar.cc/300?u=team1"
    },
    {
      name: "Ankit Sharma",
      role: "Head of Operations",
      image: "https://i.pravatar.cc/300?u=team2"
    },
    {
      name: "Priya Singh",
      role: "Customer Relations",
      image: "https://i.pravatar.cc/300?u=team3"
    }
  ];

  return (
    <section>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-shop-primary to-shop-accent text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About KAR-Gadgets</h1>
            <p className="text-xl text-white/90">
              Your premier destination for quality phones, laptops, and accessories in Nepal.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Our Story */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <motion.img
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  src="https://images.unsplash.com/photo-1581089778245-3ce67677f718?q=80&w=600&auto=format&fit=crop"
                  alt="KAR-Gadgets Store"
                  className="rounded-lg shadow-xl w-full"
                />
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Founded in 2015, KAR-Gadgets began as a small mobile repair shop in Kathmandu. With a passion for technology and commitment to customer satisfaction, we quickly expanded our services to include sales of smartphones, laptops, and accessories.
                </p>
                <p className="text-muted-foreground">
                  Today, we're proud to be one of Nepal's leading technology retailers, offering a wide range of products from top global brands as well as quality certified pre-owned devices at competitive prices.
                </p>
                <p className="text-muted-foreground">
                  Our team of tech enthusiasts is dedicated to helping customers find the perfect device to meet their needs and budget, backed by exceptional after-sales service and support.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Our Values */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              At KAR-Gadgets, we're guided by core principles that shape everything we do.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <ShieldCheck className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
                  <p className="text-muted-foreground">
                    We rigorously test every product to ensure it meets our high standards before it reaches your hands.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Package className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Value for Money</h3>
                  <p className="text-muted-foreground">
                    We believe quality technology should be accessible, offering competitive prices and flexible EMI options.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Customer Satisfaction</h3>
                  <p className="text-muted-foreground">
                    Our success is measured by our customers' satisfaction, which is why we go above and beyond in our service.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the passionate team behind KAR-Gadgets dedicated to bringing you the best technology solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="text-center">
                  <div className="mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Visit Our Store</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.316259724734!2d85.2911356450837!3d27.70896424264019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2sus!4v1714958672110!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-md"
                ></iframe>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <h3 className="font-medium">Our Location</h3>
                    <p className="text-muted-foreground">
                      New Baneshwor, Kathmandu, Nepal
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-muted-foreground">
                      +977 9828323425
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">
                      mallikkrish73@gmail.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <h3 className="font-medium">Business Hours</h3>
                    <p className="text-muted-foreground">
                      Sunday - Friday: 10:00 AM - 7:00 PM<br />
                      Saturday: 11:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
