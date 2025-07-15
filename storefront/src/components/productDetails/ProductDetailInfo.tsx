import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface ProductDetailInfoProps {
  category?: string;
  title?: string;
  rate?: number;
  count?: number;
  price?: number;
  isLoading?: boolean;
}

export function ProductDetailInfo({
  category,
  title,
  rate,
  count,
  price,
  isLoading,
}: ProductDetailInfoProps) {
  return (
    <div>
      {isLoading ? (
        <>
          <Skeleton className="h-6 w-20 mb-2" />
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-32 mb-6" />
        </>
      ) : (
        <>
          <Badge variant="secondary" className="mb-2">
            {category}
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <div className="mb-4">
            <Rating rate={rate || 0} count={count || 0} size="lg" />
          </div>
          <p className="text-3xl font-bold text-green-600 mb-6">
            ${price?.toFixed(2)}
          </p>
        </>
      )}
    </div>
  );
}
