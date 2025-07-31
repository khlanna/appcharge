import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface ProductDetailActionsProps {
  isLoading?: boolean;
}

export function ProductDetailActions({ isLoading }: ProductDetailActionsProps) {
  return (
    <div className="flex gap-4">
      {isLoading ? (
        <>
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 w-40" />
        </>
      ) : (
        <>
          <Button size="lg" className="flex-1">
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
