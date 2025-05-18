
import { motion } from "framer-motion";
import { Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const HelpPage = () => {
  const defaultMessage = "Hello there! I am getting some problem. Hope for the fast response";
  const encodedMessage = encodeURIComponent(defaultMessage);
  const mailtoLink = `mailto:mallikkrish73@gmail.com?subject=Help%20Request&body=${encodedMessage}`;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold mb-4">Help Center</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Need assistance? We're here to help you with any questions or issues you might have.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-8 shadow-lg max-w-2xl mx-auto border-[#ad4328]/20">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#ad4328] to-[#b65741] flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Contact Support</h2>
              <p className="text-muted-foreground">
                Our support team is ready to assist you. Click the button below to send us an email.
              </p>
            </div>

            <Button 
              className="w-full py-6 text-lg bg-gradient-to-r from-[#ad4328] to-[#b65741] hover:from-[#ad4328]/90 hover:to-[#b65741]/90 flex items-center justify-center gap-2"
              onClick={() => window.location.href = mailtoLink}
              asChild
            >
              <a href={mailtoLink}>
                <Mail className="h-5 w-5 mr-2" />
                Email Support
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>

            <div className="mt-6 text-sm text-muted-foreground">
              <p className="mb-2">Default message:</p>
              <div className="bg-muted p-3 rounded-md italic">
                "{defaultMessage}"
              </div>
              <p className="mt-4">
                You can modify this message when your email client opens to provide more details about your issue.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default HelpPage;
