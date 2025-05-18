
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, CreditCard, Smartphone, Calendar } from "lucide-react";

const PaymentPage = () => {
  const nepaliBanks = [
    "Nepal Investment Bank",
    "Nabil Bank",
    "Nepal Bank Limited",
    "Rastriya Banijya Bank",
    "NIC Asia Bank",
    "Everest Bank",
    "Himalayan Bank",
    "Machhapuchhre Bank",
    "Global IME Bank",
    "Kumari Bank",
    "Laxmi Bank",
    "Siddhartha Bank",
    "Citizens Bank International",
    "Prime Commercial Bank",
    "Sunrise Bank"
  ];

  const digitalWallets = [
    { name: "eSewa", description: "Nepal's leading digital wallet service" },
    { name: "Khalti", description: "Digital wallet and payment gateway" },
    { name: "IME Pay", description: "Mobile wallet for payments and remittances" },
    { name: "ConnectIPS", description: "National Payment Gateway by Nepal Clearing House" }
  ];

  const emiOptions = [
    { months: 3, interest: "0%" },
    { months: 6, interest: "0%" },
    { months: 9, interest: "3%" },
    { months: 12, interest: "5%" },
    { months: 18, interest: "7%" },
    { months: 24, interest: "9%" }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold mb-4">Payment Options</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer various secure payment methods to make your shopping experience convenient and hassle-free.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="banks" className="max-w-4xl mx-auto">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="banks" className="text-lg">
                <CreditCard className="h-4 w-4 mr-2" />
                Bank Payment
              </TabsTrigger>
              <TabsTrigger value="digital" className="text-lg">
                <Smartphone className="h-4 w-4 mr-2" />
                Digital Wallets
              </TabsTrigger>
              <TabsTrigger value="emi" className="text-lg">
                <Calendar className="h-4 w-4 mr-2" />
                EMI Options
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="banks" className="mt-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Supported Banks in Nepal</h2>
                <p className="mb-6 text-muted-foreground">
                  We accept card payments from all major banks in Nepal. You can pay securely using your debit or credit card from any of the following banks:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {nepaliBanks.map((bank, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 border border-border rounded-md">
                      <Check className="h-4 w-4 text-[#ad4328]" />
                      <span>{bank}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="digital" className="mt-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Digital Payment Methods</h2>
                <p className="mb-6 text-muted-foreground">
                  For quick and easy payments, you can use any of these popular digital wallets:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {digitalWallets.map((wallet, index) => (
                    <div key={index} className="flex flex-col p-4 border border-border rounded-md">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ad4328] to-[#b65741] flex items-center justify-center text-white font-bold text-lg">
                          {wallet.name.charAt(0)}
                        </div>
                        <h3 className="font-semibold">{wallet.name}</h3>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{wallet.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="emi" className="mt-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">EMI Payment Options</h2>
                <p className="mb-6 text-muted-foreground">
                  Split your payment into easy monthly installments with our EMI options:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {emiOptions.map((option, index) => (
                    <div 
                      key={index} 
                      className={`p-4 border rounded-md ${
                        option.interest === "0%" 
                          ? "border-[#ad4328] bg-[#ad4328]/5" 
                          : "border-border"
                      }`}
                    >
                      <h3 className="text-lg font-semibold">{option.months} Months</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-medium">Interest:</span>
                        <span className={option.interest === "0%" ? "text-[#ad4328] font-semibold" : ""}>
                          {option.interest}
                        </span>
                      </div>
                      {option.interest === "0%" && (
                        <span className="block mt-2 text-xs bg-[#ad4328] text-white rounded-full px-2 py-1 w-fit">
                          Interest Free
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm text-muted-foreground">
                  * EMI options are available on select bank credit cards. Eligibility may vary based on your bank's policies.
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default PaymentPage;
