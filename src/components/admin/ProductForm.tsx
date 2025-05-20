import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { X, Image as ImageIcon, Upload } from "lucide-react";

interface ProductFormProps {
  onSubmit: (product: any) => void;
  onCancel: () => void;
  initialData?: any;
}

const ProductForm = ({ onSubmit, onCancel, initialData }: ProductFormProps) => {
  const [name, setName] = useState(initialData?.name || "");
  const [price, setPrice] = useState(initialData?.price?.toString() || "");
  const [category, setCategory] = useState(initialData?.category || "brand-new");
  const [stock, setStock] = useState(initialData?.stock?.toString() || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initialData?.image || "");
  const { toast } = useToast();
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !price || !category || !stock) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    let image = imagePreview;
    if (imageFile) {
      // Convert image file to base64
      const reader = new FileReader();
      const base64Promise = new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(imageFile);
      });
      image = await base64Promise as string;
    }
    
    const productData = {
      id: initialData?.id || Math.floor(Math.random() * 1000),
      name,
      price: parseFloat(price),
      category,
      stock: parseInt(stock),
      description,
      image,
    };
    
    onSubmit(productData);
  };
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-card border rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">
            {initialData ? "Edit Product" : "Add New Product"}
          </h3>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select 
              value={category} 
              onValueChange={setCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brand-new">Brand New</SelectItem>
                <SelectItem value="used">Used</SelectItem>
                <SelectItem value="laptops">Laptops</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Product Image</Label>
            <div className="flex items-center gap-2">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("image")?.click()}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                {imageFile ? "Change Image" : "Upload Image"}
              </Button>
            </div>
          </div>
          
          {imagePreview && (
            <div className="relative overflow-hidden rounded-md border h-48 flex items-center justify-center">
              <img
                src={imagePreview}
                alt="Product preview"
                className="object-contain w-full h-full"
              />
            </div>
          )}
          
          <div className="flex items-center justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? "Update Product" : "Add Product"}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ProductForm;