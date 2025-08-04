import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import Link from "next/link";
import React from "react";
import { Cart } from "@/components/cart/Cart";

interface ProductDetailHeaderProps {
  title?: string;
  isLoading?: boolean;
}

export function ProductDetailHeader({
  title,
  isLoading,
}: ProductDetailHeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center">
            <Button
              variant="ghost"
              asChild
              className={
                isLoading
                  ? "mr-4 text-gray-400"
                  : "mr-4 text-gray-700 hover:text-gray-900"
              }
              disabled={isLoading}
            >
              <Link href="/">← Back to Products</Link>
            </Button>
            {isLoading ? (
              <Skeleton className="h-8 w-48" />
            ) : (
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            )}
          </div>
          <Cart />
        </div>
      </div>
    </header>
  );
}
