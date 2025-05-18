
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";

interface CartButtonProps {
  variant?: "ghost" | "default";
  showLabel?: boolean;
}

const CartButton = ({ variant = "ghost", showLabel = false }: CartButtonProps) => {
  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  return (
    <Button variant={variant} size={showLabel ? "default" : "icon"} asChild>
      <Link to="/cart" className="relative">
        <ShoppingCart className="h-5 w-5" />
        {showLabel && <span className="ml-2">Cart</span>}
        {itemCount > 0 && (
          <Badge 
            className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-primary text-white text-xs rounded-full"
          >
            {itemCount}
          </Badge>
        )}
      </Link>
    </Button>
  );
};

export default CartButton;
