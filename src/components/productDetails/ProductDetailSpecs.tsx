import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface ProductDetailSpecsProps {
  category?: string;
  rate?: number;
  count?: number;
  isLoading?: boolean;
}

export function ProductDetailSpecs({
  category,
  rate,
  count,
  isLoading,
}: ProductDetailSpecsProps) {
  return (
    <div className="bg-white rounded-lg border p-6">
      {isLoading ? (
        <>
          <Skeleton className="h-6 w-32 mb-3" />
          <div className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-8" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold mb-3  text-gray-900">
            Product Details
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-700">Category:</span>
              <span className="font-medium capitalize text-gray-900">
                {category}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Rating:</span>
              <span className="font-medium text-gray-900">{rate}/5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Reviews:</span>
              <span className="font-medium text-gray-900">{count}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
