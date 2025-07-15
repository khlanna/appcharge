import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
      {/* Image Section */}
      <div className="p-4 pb-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-4 pt-2">
        <div className="space-y-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
          <h3 className="font-semibold text-sm line-clamp-2 text-gray-900">
            {product.title}
          </h3>
          <Rating
            rate={product.rating.rate}
            count={product.rating.count}
            size="sm"
          />
          <p className="text-lg font-bold text-green-600">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Button Section */}
      <div className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/products/${product.id}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
}
