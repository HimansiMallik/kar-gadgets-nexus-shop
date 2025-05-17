
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { RefreshCw, Calendar, AlertCircle, CheckCircle } from "lucide-react";

const ReturnPolicyPage = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Return Policy</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We want you to be completely satisfied with your purchase. Please read our return policy below.
            </p>
          </div>
          
          {/* Policy Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="p-6 text-center h-full border-2">
                <RefreshCw className="h-12 w-12 mx-auto text-shop-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">7-Day Return</h3>
                <p className="text-muted-foreground">
                  Return any product within 7 days of purchase for a full refund or exchange.
                </p>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-6 text-center h-full border-2">
                <Calendar className="h-12 w-12 mx-auto text-shop-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">1-Year Warranty</h3>
                <p className="text-muted-foreground">
                  All brand new products come with a 1-year warranty against manufacturing defects.
                </p>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6 text-center h-full border-2">
                <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
                <p className="text-muted-foreground">
                  All used products are thoroughly tested and certified for quality assurance.
                </p>
              </Card>
            </motion.div>
          </div>
          
          {/* Detailed Return Policy */}
          <div className="bg-white rounded-lg shadow-sm p-8 border">
            <h2 className="text-2xl font-bold mb-6">Detailed Return Policy</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-medium">
                  Return Eligibility
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Products must be returned within 7 days of the purchase date.</li>
                    <li>Items must be in their original packaging with all accessories and documentation.</li>
                    <li>Products must be in unused condition with no signs of physical damage.</li>
                    <li>Original proof of purchase (receipt or invoice) must be provided.</li>
                    <li>Software products, SIM cards, memory cards, and headphones are not eligible for return once the packaging is opened due to hygiene and security concerns.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-medium">
                  Return Process
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Contact our customer service team at +977 9828323425 or email us at mallikkrish73@gmail.com to initiate a return request.</li>
                    <li>Our team will provide you with a return authorization and instructions.</li>
                    <li>Package the item securely in its original packaging.</li>
                    <li>Return the product to our store or through our designated shipping method.</li>
                    <li>Once we receive and inspect the product, we will process your refund or exchange.</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-medium">
                  Refunds
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p className="mb-4">Refunds will be processed within 7 business days after we receive and inspect the returned item.</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>For credit/debit card purchases, refunds will be issued to the original payment method.</li>
                    <li>For cash purchases, refunds will be provided in cash or via bank transfer as per customer preference.</li>
                    <li>Original shipping charges and any payment processing fees are non-refundable.</li>
                    <li>If a product is returned due to our error or a defective product, we will refund the full amount including shipping charges.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-medium">
                  Exchanges
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Exchanges are subject to product availability.</li>
                    <li>If you wish to exchange for a higher-priced item, you will need to pay the difference.</li>
                    <li>If you exchange for a lower-priced item, we will refund the difference.</li>
                    <li>Only one exchange is permitted per original purchase.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg font-medium">
                  Warranty Claims
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>All brand new products come with a 1-year warranty against manufacturing defects.</li>
                    <li>Used products come with a 3-month warranty unless otherwise specified.</li>
                    <li>Accessories have a warranty period of 30 days.</li>
                    <li>Warranty does not cover damage caused by accidents, misuse, unauthorized repairs, or normal wear and tear.</li>
                    <li>For warranty claims, please bring the product along with the original purchase receipt to our store.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-lg font-medium">
                  Special Cases
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Dead on Arrival (DOA):</strong> If a product is found to be defective within 48 hours of purchase, we will replace it immediately with the same model.</li>
                    <li><strong>Bulk Purchases:</strong> For bulk purchases, special return policies may apply. Please contact our customer service for details.</li>
                    <li><strong>Sale Items:</strong> Products purchased during special sales or promotions may have modified return policies as specified at the time of purchase.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700/50 rounded-lg">
              <div className="flex">
                <AlertCircle className="h-6 w-6 text-amber-500 mr-3 flex-shrink-0" />
                <p className="text-amber-800 dark:text-amber-200">
                  This policy is subject to change without prior notice. The return policy applicable to your purchase is the one in effect at the time of your purchase.
                </p>
              </div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold mb-3">Need Help?</h3>
            <p className="text-muted-foreground mb-4">
              For any questions or concerns regarding our return policy, please contact our customer service team:
            </p>
            <p className="font-medium">
              Phone: +977 9828323425<br />
              Email: mallikkrish73@gmail.com
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReturnPolicyPage;
