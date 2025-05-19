
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";

const LoginForm = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const { login, loginWithGoogle, isAdmin: userIsAdmin } = useAuth();
  const navigate = useNavigate();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await login(email, password);
      
      toast({
        title: "Success",
        description: `You have successfully logged in as ${isAdmin ? "admin" : "user"}`,
      });
      
      // Navigate based on user role
      if (isAdmin && userIsAdmin) {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };
  
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      
      toast({
        title: "Success",
        description: "You have successfully logged in with Google",
      });
      
      navigate("/profile");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to login with Google",
        variant: "destructive",
      });
    }
  };
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <div className="relative max-w-md w-full mx-auto">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Card className="border-2 overflow-hidden">
          <motion.div
            initial={{ backgroundColor: "#ffffff" }}
            animate={{ 
              backgroundColor: isAdmin 
                ? "rgba(155, 135, 245, 0.05)" 
                : "rgba(255, 255, 255, 1)" 
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-0"
          />
          
          <CardHeader className="relative z-10">
            <motion.div
              animate={{ 
                y: [0, -5, 0],
                transition: { duration: 1, repeat: Infinity, repeatDelay: 3 }
              }}
            >
              <CardTitle className="text-2xl font-bold text-center">
                {isAdmin ? "Admin Login" : "Login"}
              </CardTitle>
            </motion.div>
            <CardDescription className="text-center">
              {isAdmin 
                ? "Access your admin dashboard to manage products and users" 
                : "Sign in to your account to manage orders and wishlist"}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                <LogIn className="mr-2 h-4 w-4" />
                {isAdmin ? "Login as Admin" : "Login"}
              </Button>

              {!isAdmin && (
                <>
                  <div className="relative flex items-center justify-center">
                    <Separator className="absolute w-full" />
                    <span className="relative px-2 bg-background text-xs text-muted-foreground">
                      OR CONTINUE WITH
                    </span>
                  </div>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={handleGoogleLogin}
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Continue with Google
                  </Button>
                </>
              )}
              
              <div className="text-center">
                <Button 
                  variant="link" 
                  type="button"
                  onClick={() => setIsAdmin(!isAdmin)}
                  className="text-sm"
                >
                  {isAdmin ? "Switch to Customer Login" : "Admin Login"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center relative z-10">
            {!isAdmin && (
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            )}
          </CardFooter>
        </Card>
      </motion.div>
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-primary opacity-20"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-accent opacity-20" 
        animate={{ 
          scale: [1, 1.3, 1], 
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      />
    </div>
  );
};

export default LoginForm;
