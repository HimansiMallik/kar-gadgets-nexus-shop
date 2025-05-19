
import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { CalendarIcon, Calculator, Percent } from "lucide-react";

const EMICalculator = () => {
  const [price, setPrice] = useState<number>(50000);
  const [downPayment, setDownPayment] = useState<number>(0);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(0);
  const [duration, setDuration] = useState<number>(3);
  const [emiResult, setEmiResult] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    interestPaid: number;
    interestRate: number;
    loanAmount: number;
  } | null>(null);

  const calculateEMI = () => {
    let interestRate: number;
    
    // Define interest rates based on duration
    if (duration === 3) {
      interestRate = 0; // 0% interest for 3 months
    } else if (duration === 6) {
      interestRate = 6; // 6% interest for 6 months
    } else if (duration === 9) {
      interestRate = 4; // 4% interest for 9 months
    } else {
      interestRate = 6; // 6% interest for any other duration
    }
    
    const loanAmount = price - downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    let monthlyPayment: number;
    
    if (interestRate === 0) {
      // Simple division for zero interest
      monthlyPayment = loanAmount / duration;
    } else {
      // Standard EMI formula
      monthlyPayment = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, duration) / (Math.pow(1 + monthlyInterestRate, duration) - 1);
    }
    
    const totalPayment = monthlyPayment * duration;
    const interestPaid = totalPayment - loanAmount;
    
    setEmiResult({
      monthlyPayment,
      totalPayment,
      interestPaid,
      interestRate,
      loanAmount
    });
  };
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setPrice(value);
    
    // Recalculate down payment amount based on percentage
    const newDownPayment = Math.round((downPaymentPercent / 100) * value);
    setDownPayment(newDownPayment);
    
    setEmiResult(null);
  };

  const handleDownPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    const validValue = Math.min(value, price); // Down payment cannot exceed price
    setDownPayment(validValue);
    
    // Update the percentage based on the amount
    const newPercent = price > 0 ? Math.round((validValue / price) * 100) : 0;
    setDownPaymentPercent(newPercent);
    
    setEmiResult(null);
  };

  const handleDownPaymentPercentChange = (value: number[]) => {
    const percent = value[0];
    setDownPaymentPercent(percent);
    
    // Calculate the down payment amount based on the percentage
    const amount = Math.round((percent / 100) * price);
    setDownPayment(amount);
    
    setEmiResult(null);
  };
  
  const handleSliderChange = (value: number[]) => {
    setDuration(value[0]);
    setEmiResult(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NP', {
      style: 'currency',
      currency: 'NPR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl font-bold mb-4">EMI Calculator</h1>
            <p className="text-muted-foreground">
              Calculate your monthly installment payments with our easy-to-use EMI calculator.
            </p>
          </motion.div>

          <Card className="border-2 border-gray-200 dark:border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                <span>Calculate Your EMI</span>
              </CardTitle>
              <CardDescription>
                Enter product price and select the duration to calculate your monthly payments.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="price">Product Price (NPR)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="price"
                    type="number"
                    value={price}
                    onChange={handlePriceChange}
                    className="text-lg"
                    min={0}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="downPayment">Down Payment (NPR)</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">{formatCurrency(downPayment)}</span>
                    <span className="text-sm text-muted-foreground">({downPaymentPercent}%)</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Input
                    id="downPayment"
                    type="number"
                    value={downPayment}
                    onChange={handleDownPaymentChange}
                    className="w-full"
                    min={0}
                    max={price}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Percent className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Down payment percentage</span>
                </div>
                
                <Slider
                  id="downPaymentPercent"
                  defaultValue={[0]}
                  max={100}
                  min={0}
                  step={5}
                  value={[downPaymentPercent]}
                  onValueChange={handleDownPaymentPercentChange}
                  className="py-4"
                />
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="duration">Duration (Months)</Label>
                  <span className="text-2xl font-bold text-primary">{duration}</span>
                </div>
                
                <Slider
                  id="duration"
                  defaultValue={[3]}
                  max={24}
                  min={1}
                  step={1}
                  value={[duration]}
                  onValueChange={handleSliderChange}
                  className="py-4"
                />
                
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>1 Month</span>
                  <span>12 Months</span>
                  <span>24 Months</span>
                </div>
                
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {[3, 6, 9, 12].map((months) => (
                    <Button
                      key={months}
                      variant={duration === months ? "default" : "outline"}
                      onClick={() => setDuration(months)}
                      className="relative"
                    >
                      {duration === months && (
                        <motion.span
                          layoutId="activeMonthIndicator"
                          className="absolute inset-0 rounded-md bg-primary/10 -z-10"
                        />
                      )}
                      {months} {months === 1 ? 'Month' : 'Months'}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  onClick={calculateEMI} 
                  className="w-full"
                  size="lg"
                >
                  Calculate EMI
                </Button>
              </div>
            </CardContent>
            
            {emiResult && (
              <CardFooter className="flex-col">
                <div className="w-full p-4 bg-muted/50 rounded-lg space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                      <p className="text-muted-foreground mb-1">Monthly Payment</p>
                      <h3 className="text-2xl font-bold text-shop-primary">
                        {formatCurrency(Math.round(emiResult.monthlyPayment))}
                      </h3>
                    </div>
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                      <p className="text-muted-foreground mb-1">Interest Rate</p>
                      <h3 className="text-2xl font-bold text-shop-accent">
                        {emiResult.interestRate}%
                      </h3>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                      <p className="text-muted-foreground mb-1">Loan Amount</p>
                      <h3 className="text-lg font-bold">
                        {formatCurrency(Math.round(emiResult.loanAmount))}
                      </h3>
                    </div>
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                      <p className="text-muted-foreground mb-1">Down Payment</p>
                      <h3 className="text-lg font-bold">
                        {formatCurrency(downPayment)}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                      <p className="text-muted-foreground mb-1">Total Payment</p>
                      <h3 className="text-lg font-bold">
                        {formatCurrency(Math.round(emiResult.totalPayment))}
                      </h3>
                    </div>
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                      <p className="text-muted-foreground mb-1">Interest Paid</p>
                      <h3 className="text-lg font-bold">
                        {formatCurrency(Math.round(emiResult.interestPaid))}
                      </h3>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-1 mt-4 text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" />
                  <span>First payment due 30 days after purchase</span>
                </div>
              </CardFooter>
            )}
          </Card>
          
          <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-border/50">
            <h3 className="text-xl font-semibold mb-4">EMI Terms & Conditions</h3>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>3 months EMI comes with 0% interest</li>
              <li>6 months EMI comes with 6% interest rate</li>
              <li>9 months EMI comes with 4% interest rate</li>
              <li>Any other duration will have a 6% interest rate</li>
              <li>Valid ID proof and address proof are required for EMI processing</li>
              <li>EMI facility is subject to approval based on customer eligibility</li>
              <li>Late payment fees will apply for missed installments</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EMICalculator;
