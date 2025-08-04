import React from "react";
import { Button } from "@/components/ui/Button";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { CartItem as CartItemType } from "@/types/cart";
import Image from "next/image";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { incrementQuantity, decrementQuantity, removeItem } = useCartStore();

  return (
    <div className="flex items-center space-x-4 p-4 border rounded-lg">
      <div className="relative w-16 h-16 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain rounded"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 truncate">
          {item.title}
        </h3>
        <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => decrementQuantity(item.id)}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="text-sm font-medium w-8 text-center">
          {item.quantity}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => incrementQuantity(item.id)}
        >
          <Plus className="h-3 w-3" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => removeItem(item.id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
