
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreditCard, ChevronUp, ChevronDown, Percent } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface EMIOptionsProps {
  price: number;
}

const EMIOptions = ({ price }: EMIOptionsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [downPayment, setDownPayment] = useState<number>(0);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(0);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Calculate EMIs for different durations
  const calculateEMI = (duration: number, interestRate: number): number => {
    const loanAmount = price - downPayment;
    
    if (interestRate === 0) {
      return loanAmount / duration;
    } else {
      const monthlyInterestRate = interestRate / 100 / 12;
      return (
        (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, duration)) /
        (Math.pow(1 + monthlyInterestRate, duration) - 1)
      );
    }
  };

  const handleDownPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    const validValue = Math.min(value, price); // Down payment cannot exceed price
    setDownPayment(validValue);
    
    // Update the percentage based on the amount
    const newPercent = price > 0 ? Math.round((validValue / price) * 100) : 0;
    setDownPaymentPercent(newPercent);
  };

  const handleDownPaymentPercentChange = (value: number[]) => {
    const percent = value[0];
    setDownPaymentPercent(percent);
    
    // Calculate the down payment amount based on the percentage
    const amount = Math.round((percent / 100) * price);
    setDownPayment(amount);
  };

  const emiOptions = [
    { duration: 3, interestRate: 0, label: "3 Months (No interest)" },
    { duration: 6, interestRate: 6, label: "6 Months" },
    { duration: 9, interestRate: 4, label: "9 Months" },
    { duration: 12, interestRate: 6, label: "12 Months" },
  ];

  return (
    <div>
      <Button
        variant="outline"
        onClick={toggleExpand}
        className="w-full justify-between group"
      >
        <div className="flex items-center">
          <CreditCard className="h-5 w-5 mr-2 text-shop-accent" />
          <span>EMI Options Available</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 transition-transform group-hover:translate-y-[-2px]" />
        ) : (
          <ChevronDown className="h-5 w-5 transition-transform group-hover:translate-y-[2px]" />
        )}
      </Button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mt-3 overflow-hidden">
              <div className="p-4">
                <h3 className="font-semibold mb-3">Available EMI Plans</h3>
                
                <div className="mb-4 space-y-3">
                  <Label htmlFor="productDownPayment">Down Payment (Optional)</Label>
                  <div className="flex items-center gap-2 mb-1">
                    <Input
                      id="productDownPayment"
                      type="number"
                      value={downPayment}
                      onChange={handleDownPaymentChange}
                      className="w-full"
                      min={0}
                      max={price}
                      placeholder="Enter down payment amount"
                    />
                    <span className="text-sm whitespace-nowrap">NPR {downPayment.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Percent className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {downPaymentPercent}% of total price (NPR {price.toLocaleString()})
                    </span>
                  </div>
                  
                  <Slider
                    id="downPaymentSlider"
                    defaultValue={[0]}
                    max={100}
                    min={0}
                    step={5}
                    value={[downPaymentPercent]}
                    onValueChange={handleDownPaymentPercentChange}
                  />
                </div>
                
                <div className="space-y-3">
                  {emiOptions.map((option) => {
                    const emiAmount = Math.round(calculateEMI(option.duration, option.interestRate));
                    
                    return (
                      <div 
                        key={option.duration}
                        className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div>
                          <p className="font-medium">{option.label}</p>
                          {option.interestRate > 0 && (
                            <p className="text-xs text-muted-foreground">
                              {option.interestRate}% interest
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-bold">NPR {emiAmount.toLocaleString()}/mo</p>
                          <p className="text-xs text-muted-foreground">
                            for {option.duration} months
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-4 text-center">
                  <Button asChild variant="link" className="text-shop-accent">
                    <Link to="/emi-calculator">
                      Calculate for other durations
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EMIOptions;
