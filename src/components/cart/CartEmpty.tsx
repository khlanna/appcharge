import React from "react";
import { ShoppingCart } from "lucide-react";

export function CartEmpty() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Your cart is empty</p>
        <p className="text-sm text-gray-400">
          Add some products to get started
        </p>
      </div>
    </div>
  );
}
