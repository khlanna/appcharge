import React from "react";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cart-store";

export function CartSummary() {
  const { getTotalPrice } = useCartStore();

  return (
    <div className="border-t border-gray-200 pt-4">
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold text-gray-900">Total:</span>
        <span className="text-lg font-semibold text-gray-900">
          ${getTotalPrice().toFixed(2)}
        </span>
      </div>
      <Button className="w-full" size="lg">
        Checkout
      </Button>
    </div>
  );
}
