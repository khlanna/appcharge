import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Rating } from "@/components/ui/rating";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <Button
              variant="ghost"
              asChild
              className="mr-4 text-gray-700 hover:text-gray-900"
            >
              <Link href="/">← Back to Products</Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">
              Product Details
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h2>
              <div className="mb-4">
                <Rating
                  rate={product.rating.rate}
                  count={product.rating.count}
                  size="lg"
                />
              </div>
              <p className="text-3xl font-bold text-green-600 mb-6">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Product Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium capitalize">
                      {product.category}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating:</span>
                    <span className="font-medium">{product.rating.rate}/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reviews:</span>
                    <span className="font-medium">{product.rating.count}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button size="lg" className="flex-1">
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
