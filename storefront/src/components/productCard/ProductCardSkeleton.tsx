import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function ProductCardSkeleton() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="p-4 pb-2">
        <Skeleton className="aspect-square w-full rounded-lg" />
      </CardHeader>
      <CardContent className="flex-1 p-4 pt-2">
        <div className="space-y-2">
          <Skeleton className="h-5 w-16" /> {/* Category badge */}
          <Skeleton className="h-4 w-full" /> {/* Title line 1 */}
          <Skeleton className="h-4 w-3/4" /> {/* Title line 2 */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-4" />
              ))}
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-6 w-20" /> {/* Price */}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-10 w-full" /> {/* Button */}
      </CardFooter>
    </Card>
  );
}
