import React from "react";
import { Product } from "@/types/product";
import { ProductDetailHeader } from "@/components/productDetails/ProductDetailHeader";
import { ProductDetailImage } from "@/components/productDetails/ProductDetailImage";
import { ProductDetailInfo } from "@/components/productDetails/ProductDetailInfo";
import { ProductDetailDescription } from "@/components/productDetails/ProductDetailDescription";
import { ProductDetailActions } from "@/components/productDetails/ProductDetailActions";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetailPage({ product }: ProductDetailProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProductDetailHeader title="Product Details" />
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
            <ProductDetailActions />
          </div>
        </div>
      </main>
    </div>
  );
}
