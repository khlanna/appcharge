import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export function CartTrigger() {
  const { getTotalItems, setIsOpen } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative"
      onClick={handleClick}
    >
      <ShoppingCart className="h-4 w-4" />
      {mounted && getTotalItems() > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center z-10">
          {getTotalItems()}
        </span>
      )}
    </Button>
  );
}
