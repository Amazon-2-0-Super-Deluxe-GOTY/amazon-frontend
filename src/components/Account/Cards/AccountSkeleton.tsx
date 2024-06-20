import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function WishlistCardSkeleton() {
  return (
    <Card className="w-full rounded-lg p-3 space-y-2">
      <Skeleton className="aspect-square rounded-sm" />
      <Skeleton className="w-full h-6 rounded-lg" />
      <Skeleton className="w-3/4 h-6 rounded-lg" />
    </Card>
  );
}

export function OrderCardSkeleton() {
  return (
    <Card className="w-full rounded-lg p-3 space-y-2 flex justify-between gap-3">
      <div className="w-full max-w-xs flex flex-col gap-2">
        <Skeleton className="w-full h-6 rounded-lg" />
        <Skeleton className="w-3/4 h-6 rounded-lg" />
      </div>
      <div className="w-full max-w-20 flex flex-col items-end gap-2">
        <Skeleton className="w-3/4 h-6 rounded-lg" />
        <Skeleton className="w-full h-6 rounded-lg" />
      </div>
    </Card>
  );
}
