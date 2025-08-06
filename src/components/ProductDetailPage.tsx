import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Product } from "@/types/product";
import { Header } from "@/components/layout";
import {
  ProductDetailImage,
  ProductDetailInfo,
  ProductDetailDescription,
  ProductDetailActions,
} from "@/components/productDetails";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetailPage({ product }: ProductDetailProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header>
        <div className="flex items-center">
          <Button
            variant="ghost"
            asChild
            className="mr-4 text-gray-700 hover:text-gray-900"
          >
            <Link href="/">← Back to Products</Link>
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
        </div>
      </Header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProductDetailImage src={product.image} alt={product.title} />
          <div className="space-y-6">
            <ProductDetailInfo
              category={product.category}
              title={product.title}
              rate={product.rating.rate}
              count={product.rating.count}
              price={product.price}
            />
            <ProductDetailDescription description={product.description} />
            <ProductDetailActions
              product={{
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
