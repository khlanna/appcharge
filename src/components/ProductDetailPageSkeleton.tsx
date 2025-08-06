import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { Header } from "@/components/layout";
import {
  ProductDetailImage,
  ProductDetailInfo,
  ProductDetailDescription,
  ProductDetailActions,
} from "@/components/productDetails";

export default function ProductDetailPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header>
        <div className="flex items-center">
          <Button
            variant="ghost"
            asChild
            className="mr-4 text-gray-400"
            disabled
          >
            <Link href="/">← Back to Products</Link>
          </Button>
          <Skeleton className="h-8 w-48" />
        </div>
      </Header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProductDetailImage isLoading />
          <div className="space-y-6">
            <ProductDetailInfo isLoading />
            <ProductDetailDescription isLoading />
            <ProductDetailActions isLoading />
          </div>
        </div>
      </main>
    </div>
  );
}
