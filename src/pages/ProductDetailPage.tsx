
import ProductDetail from "@/components/product/ProductDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate(-1); // Go back one step in history
  };

  return (
    <div className="container mx-auto px-4">
      <Button 
        variant="ghost" 
        onClick={handleGoBack} 
        className="mt-4 flex items-center"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back
      </Button>
      <ProductDetail />
    </div>
  );
};

export default ProductDetailPage;
