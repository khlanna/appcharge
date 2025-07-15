import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import React from "react";

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
        <div className="flex items-center py-6">
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
      </div>
    </header>
  );
}
