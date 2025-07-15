import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <Button variant="ghost" disabled className="mr-4 text-gray-400">
              ← Back to Products
            </Button>
            <Skeleton className="h-8 w-48" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image Skeleton */}
          <div className="space-y-4">
            <Skeleton className="aspect-square w-full rounded-lg" />
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-6">
            <div>
              <Skeleton className="h-6 w-20 mb-2" /> {/* Category badge */}
              <Skeleton className="h-12 w-full mb-4" /> {/* Title */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-6 w-6" />
                  ))}
                </div>
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-10 w-32 mb-6" /> {/* Price */}
            </div>

            {/* Description Skeleton */}
            <div className="bg-white rounded-lg border p-6">
              <Skeleton className="h-6 w-32 mb-3" /> {/* Description title */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>

            {/* Product Details Skeleton */}
            <div className="bg-white rounded-lg border p-6">
              <Skeleton className="h-6 w-32 mb-3" />{" "}
              {/* Product Details title */}
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
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex gap-4">
              <Skeleton className="h-12 flex-1" />
              <Skeleton className="h-12 w-40" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
