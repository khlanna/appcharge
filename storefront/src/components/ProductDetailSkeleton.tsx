import { ProductDetailHeader } from "@/components/productDetails/ProductDetailHeader";
import { ProductDetailImage } from "@/components/productDetails/ProductDetailImage";
import { ProductDetailInfo } from "@/components/productDetails/ProductDetailInfo";
import { ProductDetailDescription } from "@/components/productDetails/ProductDetailDescription";
import { ProductDetailSpecs } from "@/components/productDetails/ProductDetailSpecs";
import { ProductDetailActions } from "@/components/productDetails/ProductDetailActions";

export default function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProductDetailHeader isLoading />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProductDetailImage isLoading />
          <div className="space-y-6">
            <ProductDetailInfo isLoading />
            <ProductDetailDescription isLoading />
            <ProductDetailSpecs isLoading />
            <ProductDetailActions isLoading />
          </div>
        </div>
      </main>
    </div>
  );
}
