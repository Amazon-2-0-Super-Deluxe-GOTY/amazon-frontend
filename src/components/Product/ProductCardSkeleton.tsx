import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <Card className="max-w-sm w-full rounded-lg p-3">
      <Skeleton className="aspect-square rounded-sm" />
      <div className="pt-2 space-y-2">
        <Skeleton className="w-full h-6 rounded-lg" />
        <Skeleton className="w-3/4 h-6 rounded-lg" />
      </div>
    </Card>
  );
}
