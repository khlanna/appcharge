import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductDetailDescriptionProps {
  description?: string;
  isLoading?: boolean;
}

export function ProductDetailDescription({
  description,
  isLoading,
}: ProductDetailDescriptionProps) {
  return (
    <div className="bg-white rounded-lg border p-6">
      {isLoading ? (
        <>
          <Skeleton className="h-6 w-32 mb-3" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold mb-3  text-gray-900">
            Description
          </h3>
          <p className="text-gray-800 leading-relaxed">{description}</p>
        </>
      )}
    </div>
  );
}
