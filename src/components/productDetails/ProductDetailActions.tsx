import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useCartStore } from "@/store";

interface ProductDetailActionsProps {
  isLoading?: boolean;
  product?: {
    id: number;
    title: string;
    price: number;
    image: string;
  };
}

export function ProductDetailActions({
  isLoading,
  product,
}: ProductDetailActionsProps) {
  const { addItem, setIsOpen } = useCartStore();

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      });
      setIsOpen(true);
    }
  };

  return (
    <div className="flex gap-4">
      {isLoading ? (
        <>
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 w-40" />
        </>
      ) : (
        <>
          <Button
            size="lg"
            className="flex-1"
            onClick={handleAddToCart}
            disabled={!product}
          >
            Add to Cart
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </>
      )}
    </div>
  );
}
