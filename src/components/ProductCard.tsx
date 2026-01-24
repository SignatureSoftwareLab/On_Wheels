import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product, formatPrice } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    // Check if user is logged in (placeholder - in real app, check auth state)
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    if (!isLoggedIn) {
      // Store product to buy after login
      localStorage.setItem("pendingProduct", product.id);
      navigate("/login?redirect=checkout");
    } else {
      navigate(`/checkout?product=${product.id}`);
    }
  };

  return (
    <Card className="group overflow-hidden gradient-card border-border hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <CardContent className="p-4 md:p-5">
        <div className="mb-2">
          <span className="text-xs font-medium text-primary bg-secondary px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        <h3 className="font-semibold text-foreground mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">{formatPrice(product.price)}</span>
          <Button onClick={handleBuyNow} size="sm" className="gap-2">
            <ShoppingCart className="w-4 h-4" />
            Buy Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
