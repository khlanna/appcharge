import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";

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
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      // Optionally handle error
    }
  };

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
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary">{category}</Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyLink}
              type="button"
              aria-label="Copy product link"
              className="text-gray-900 px-2"
            >
              {copied ? "Link Copied!" : "Copy Link"}
            </Button>
          </div>
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
