import React from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/Skeleton";

interface ProductDetailImageProps {
  src?: string;
  alt?: string;
  isLoading?: boolean;
}

export function ProductDetailImage({
  src,
  alt,
  isLoading,
}: ProductDetailImageProps) {
  return (
    <div className="space-y-4">
      {isLoading ? (
        <Skeleton className="aspect-square w-full rounded-lg" />
      ) : (
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white">
          {src && (
            <Image
              src={src}
              alt={alt || "Product image"}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          )}
        </div>
      )}
    </div>
  );
}
