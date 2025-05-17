
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

const TermsPage = () => {
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
            <h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Please read these terms and conditions carefully before using our website or making a purchase.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-8 border space-y-8">
            {/* Introduction */}
            <div>
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground mb-4">
                These terms and conditions govern your use of the KAR-Gadgets website (www.kargadgets.com) and your relationship with KAR-Gadgets. By using our website or making a purchase, you agree to comply with and be bound by these terms and conditions.
              </p>
              <p className="text-muted-foreground">
                If you disagree with any part of these terms and conditions, please do not use our website or make purchases from KAR-Gadgets.
              </p>
            </div>
            
            {/* Definitions */}
            <div>
              <h2 className="text-2xl font-bold mb-4">2. Definitions</h2>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>"KAR-Gadgets", "we", "us", or "our" refers to KAR-Gadgets, a company registered in Nepal.</li>
                <li>"Website" refers to www.kargadgets.com and all its associated pages.</li>
                <li>"User", "you", or "your" refers to any individual accessing or using the website.</li>
                <li>"Products" refers to all goods and services available for purchase on the website.</li>
                <li>"Order" refers to a request placed by you to purchase products from us.</li>
                <li>"Terms" refers to these terms and conditions.</li>
              </ul>
            </div>
            
            {/* Account Registration */}
            <div>
              <h2 className="text-2xl font-bold mb-4">3. Account Registration</h2>
              <p className="text-muted-foreground mb-4">
                To make purchases or access certain features of the website, you may be required to register for an account. You agree to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Provide accurate, current, and complete information during registration.</li>
                <li>Maintain and promptly update your account information.</li>
                <li>Keep your account password confidential and secure.</li>
                <li>Accept responsibility for all activities that occur under your account.</li>
                <li>Notify us immediately of any unauthorized use of your account or any other breach of security.</li>
              </ul>
            </div>
            
            {/* Products & Pricing */}
            <div>
              <h2 className="text-2xl font-bold mb-4">4. Products & Pricing</h2>
              <p className="text-muted-foreground mb-4">
                KAR-Gadgets makes every effort to ensure that product information and pricing is accurate. However:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>All products are subject to availability.</li>
                <li>Images of products are for illustrative purposes only and may not exactly match the actual product.</li>
                <li>We reserve the right to limit the quantities of any products that you may order.</li>
                <li>Prices are in Nepalese Rupees (NPR) and include applicable taxes unless otherwise stated.</li>
                <li>We reserve the right to change prices at any time without prior notice.</li>
                <li>In the event of a pricing error, we reserve the right to cancel any orders placed at the incorrect price.</li>
              </ul>
            </div>
            
            {/* Ordering Process */}
            <div>
              <h2 className="text-2xl font-bold mb-4">5. Ordering Process</h2>
              <p className="text-muted-foreground mb-4">
                By placing an order, you are making an offer to purchase products. The ordering process consists of:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Adding products to your shopping cart.</li>
                <li>Proceeding to checkout and providing required information.</li>
                <li>Reviewing and confirming your order.</li>
                <li>Selecting a payment method and completing payment.</li>
                <li>Receiving an order confirmation via email.</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                An order is not accepted until we send you an order confirmation email. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in pricing or product information, or suspicion of fraudulent activity.
              </p>
            </div>
            
            {/* Payment Terms */}
            <div>
              <h2 className="text-2xl font-bold mb-4">6. Payment Terms</h2>
              <p className="text-muted-foreground mb-4">
                We accept various payment methods as indicated on our website. By providing payment information, you represent and warrant that:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>You have the legal right to use the payment method provided.</li>
                <li>The payment information you provide is true, accurate, and complete.</li>
                <li>You authorize us to charge your payment method for the order placed.</li>
                <li>For EMI payments, additional terms as specified in our EMI Policy apply.</li>
              </ul>
            </div>
            
            {/* EMI Terms */}
            <div>
              <h2 className="text-2xl font-bold mb-4">7. EMI Terms</h2>
              <p className="text-muted-foreground mb-4">
                KAR-Gadgets offers Easy Monthly Installment (EMI) options subject to the following terms:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>EMI availability is subject to eligibility criteria and approval.</li>
                <li>Interest rates and tenures are as specified on our website or at the time of purchase.</li>
                <li>3-month EMI comes with 0% interest.</li>
                <li>6-month EMI comes with 6% interest.</li>
                <li>9-month EMI comes with 4% interest.</li>
                <li>Any other duration will have a 6% interest rate.</li>
                <li>Late payment fees will apply for missed installments as per the EMI agreement.</li>
                <li>Valid ID proof and address proof are required for EMI processing.</li>
                <li>KAR-Gadgets reserves the right to modify EMI terms or discontinue EMI options without prior notice.</li>
              </ul>
            </div>
            
            {/* Delivery */}
            <div>
              <h2 className="text-2xl font-bold mb-4">8. Delivery</h2>
              <p className="text-muted-foreground mb-4">
                KAR-Gadgets will arrange for the delivery of products to the address specified in your order. Please note:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Delivery times are estimates and not guaranteed.</li>
                <li>Delivery is available only within Nepal.</li>
                <li>Shipping costs, if applicable, will be clearly displayed during checkout.</li>
                <li>Risk of loss and title for products pass to you upon delivery.</li>
                <li>You are responsible for inspecting products upon delivery and reporting any issues promptly.</li>
                <li>For certain high-value products, signature confirmation may be required.</li>
              </ul>
            </div>
            
            {/* Returns & Refunds */}
            <div>
              <h2 className="text-2xl font-bold mb-4">9. Returns & Refunds</h2>
              <p className="text-muted-foreground mb-4">
                Our return and refund policy is governed by the separate Return Policy document available on our website, which forms part of these Terms. Key points include:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Products must be returned within 7 days of purchase.</li>
                <li>Products must be in unused condition with original packaging and accessories.</li>
                <li>Proof of purchase is required for all returns.</li>
                <li>Some products are not eligible for return once opened (e.g., software, SIM cards).</li>
                <li>Refunds will be processed within 7 business days after inspection of the returned product.</li>
              </ul>
            </div>
            
            {/* Warranty */}
            <div>
              <h2 className="text-2xl font-bold mb-4">10. Warranty</h2>
              <p className="text-muted-foreground mb-4">
                Products sold by KAR-Gadgets come with the following warranty terms:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Brand new products carry a 1-year warranty against manufacturing defects, unless otherwise specified.</li>
                <li>Used products come with a 3-month warranty unless otherwise stated.</li>
                <li>Accessories have a warranty period of 30 days.</li>
                <li>Warranty does not cover damage from accidents, misuse, unauthorized repairs, or normal wear and tear.</li>
                <li>Manufacturer warranties are handled directly through the respective manufacturer's service centers.</li>
                <li>KAR-Gadgets will assist customers with warranty claims as needed.</li>
              </ul>
            </div>
            
            {/* Intellectual Property */}
            <div>
              <h2 className="text-2xl font-bold mb-4">11. Intellectual Property</h2>
              <p className="text-muted-foreground mb-4">
                All content on the website, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, and software, is the property of KAR-Gadgets or its content suppliers and is protected by Nepalese and international copyright laws.
              </p>
              <p className="text-muted-foreground">
                You may not reproduce, distribute, display, sell, lease, transmit, create derivative works from, translate, modify, reverse-engineer, disassemble, decompile, or otherwise exploit this website or any portion of it without the express written consent of KAR-Gadgets.
              </p>
            </div>
            
            {/* Limitation of Liability */}
            <div>
              <h2 className="text-2xl font-bold mb-4">12. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                To the fullest extent permitted by applicable law, KAR-Gadgets shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Your use or inability to use the website or products.</li>
                <li>Any unauthorized access to or use of our servers and/or any personal information stored therein.</li>
                <li>Any interruption or cessation of transmission to or from the website.</li>
                <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through the website by any third party.</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Our liability is limited to the purchase price of the products you purchased.
              </p>
            </div>
            
            {/* Governing Law */}
            <div>
              <h2 className="text-2xl font-bold mb-4">13. Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms shall be governed by and construed in accordance with the laws of Nepal. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Kathmandu, Nepal.
              </p>
            </div>
            
            {/* Changes to Terms */}
            <div>
              <h2 className="text-2xl font-bold mb-4">14. Changes to Terms</h2>
              <p className="text-muted-foreground">
                KAR-Gadgets reserves the right to modify these Terms at any time without prior notice. Changes will be effective immediately upon posting on the website. Your continued use of the website after any changes indicates your acceptance of the updated Terms.
              </p>
            </div>
            
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-4">15. Contact Information</h2>
              <p className="text-muted-foreground">
                For questions regarding these Terms, please contact us at:<br />
                Email: mallikkrish73@gmail.com<br />
                Phone: +977 9828323425<br />
                Address: New Baneshwor, Kathmandu, Nepal
              </p>
            </div>
            
            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700/50 rounded-lg">
              <div className="flex">
                <AlertCircle className="h-6 w-6 text-amber-500 mr-3 flex-shrink-0" />
                <p className="text-amber-800 dark:text-amber-200">
                  These Terms and Conditions were last updated on May 17, 2023. By using our website or making a purchase, you acknowledge that you have read, understood, and agreed to be bound by these Terms.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TermsPage;
