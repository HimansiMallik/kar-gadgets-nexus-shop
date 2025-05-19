
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { User, Settings, Heart, Camera, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Mock favorite products data
const favoritesData = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 175000,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484429be?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "iPhone 13 (Used)",
    price: 80000,
    image: "https://images.unsplash.com/photo-1632633173522-47456de71b76?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 13,
    name: "MacBook Pro M2",
    price: 250000,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop",
  },
];

const UserProfileForm = () => {
  const { user, logout } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("+977 9812345678"); // Default value
  const [address, setAddress] = useState("Kathmandu, Nepal"); // Default value
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(user?.avatar || null);
  const [favorites] = useState(favoritesData);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSaveChanges = () => {
    // Basic validation
    if (!name || !email) {
      toast({
        title: "Error",
        description: "Name and email are required fields",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would update the user data in the database
    // For now, we'll just simulate a successful update with a toast
    toast({
      title: "Success",
      description: "Your profile has been updated",
    });
    
    setIsEditing(false);
  };
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logging out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload this to your server
      // For now, we'll just create a local URL for preview
      const url = URL.createObjectURL(file);
      setAvatar(url);
    }
  };
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar and Actions */}
            <div className="w-full md:w-64 space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-border/50 text-center">
                <div className="relative mx-auto w-24 h-24 mb-4">
                  <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-800 shadow-md">
                    <AvatarImage src={avatar || ""} alt={name} />
                    <AvatarFallback className="text-2xl">{name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <label 
                    htmlFor="avatar-upload" 
                    className="absolute -right-2 -bottom-2 bg-primary text-white p-1.5 rounded-full cursor-pointer hover:bg-primary/80 transition-colors"
                  >
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">Upload avatar</span>
                    <input 
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden" 
                      onChange={handleAvatarChange}
                    />
                  </label>
                </div>
                
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-muted-foreground text-sm">{email}</p>
                
                <div className="flex justify-center mt-4">
                  <Badge variant="outline" className="bg-muted/50">Customer</Badge>
                </div>
                
                <hr className="my-4" />
                
                <Button variant="destructive" className="w-full" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
            
            {/* Tabs Content */}
            <div className="flex-grow">
              <Card>
                <Tabs defaultValue="profile">
                  <CardHeader>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="profile" className="text-base">
                        <User className="h-4 w-4 mr-2" /> Profile
                      </TabsTrigger>
                      <TabsTrigger value="favorites" className="text-base">
                        <Heart className="h-4 w-4 mr-2" /> Favorites
                      </TabsTrigger>
                    </TabsList>
                  </CardHeader>
                  
                  <TabsContent value="profile" className="m-0">
                    <CardContent className="p-6">
                      <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input 
                              id="name" 
                              value={name} 
                              onChange={(e) => setName(e.target.value)} 
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              type="email" 
                              value={email} 
                              onChange={(e) => setEmail(e.target.value)} 
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input 
                              id="phone" 
                              value={phone} 
                              onChange={(e) => setPhone(e.target.value)} 
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input 
                              id="address" 
                              value={address} 
                              onChange={(e) => setAddress(e.target.value)} 
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                        
                        {!isEditing ? (
                          <Button 
                            type="button"
                            variant="outline"
                            onClick={() => setIsEditing(true)}
                          >
                            <Settings className="h-4 w-4 mr-2" />
                            Edit Profile
                          </Button>
                        ) : (
                          <div className="flex gap-2">
                            <Button type="button" onClick={handleSaveChanges}>
                              Save Changes
                            </Button>
                            <Button 
                              type="button"
                              variant="outline"
                              onClick={() => {
                                setIsEditing(false);
                                setName(user?.name || "");
                                setEmail(user?.email || "");
                                setPhone("+977 9812345678"); // Reset to default
                                setAddress("Kathmandu, Nepal"); // Reset to default
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
                      </form>
                    </CardContent>
                  </TabsContent>
                  
                  <TabsContent value="favorites" className="m-0">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold">Your Favorite Products</h3>
                        
                        {favorites.length > 0 ? (
                          <div className="space-y-4">
                            {favorites.map((product) => (
                              <motion.div
                                key={product.id}
                                className="flex bg-muted/30 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                                whileHover={{ x: 3 }}
                              >
                                <img 
                                  src={product.image} 
                                  alt={product.name}
                                  className="w-16 h-16 rounded-md object-cover"
                                />
                                <div className="ml-3 flex-grow">
                                  <p className="font-medium">{product.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    NPR {product.price.toLocaleString()}
                                  </p>
                                </div>
                                <div className="flex items-center">
                                  <Button size="sm" asChild>
                                    <a href={`/product/${product.id}`}>View</a>
                                  </Button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                            <p>You don't have any favorite products yet</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UserProfileForm;
