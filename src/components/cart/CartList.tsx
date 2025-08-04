import React from "react";
import { useCartStore } from "@/store/cart-store";
import { CartItem } from "./CartItem";

export function CartList() {
  const { items } = useCartStore();

  return (
    <div className="flex-1 overflow-y-auto py-4">
      <div className="space-y-4">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
